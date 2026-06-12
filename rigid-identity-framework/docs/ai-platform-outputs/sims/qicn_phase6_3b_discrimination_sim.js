#!/usr/bin/env node
"use strict";

const { computeHotHoa } = require("./qicn_phase6_3b_hot_model");

function seedToUint32(seed) {
  let hash = 2166136261;
  for (const char of String(seed)) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function rng(seed) {
  let state = seedToUint32(seed);
  return function next() {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : 0));
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}

function pairedEffect(selfValues, nonselfValues) {
  const diffs = selfValues.map((value, index) => value - nonselfValues[index]);
  const m = mean(diffs);
  const variance = mean(diffs.map((value) => (value - m) ** 2));
  const sd = Math.sqrt(variance) || 1e-6;
  return Math.max(0, m / sd);
}

function mae(values, targets) {
  return mean(values.map((value, index) => Math.abs(value - targets[index])));
}

function byCondition(trace, condition) {
  return trace.windows.filter((window) => window.condition === condition);
}

function primitiveScores(trace, condition = null) {
  const windows = condition ? byCondition(trace, condition) : trace.windows;
  const selfIndex = mean(windows.map((window) => {
    const weights = (window.loci || []).map((locus) => locus.weight).sort((a, b) => b - a);
    const top = weights[0] || 0;
    const second = weights[1] || 0;
    return clamp((top - second) * (1 - (window.relabeling_distance || 0)));
  }));
  const ownership = mean(windows.map((window) => {
    const events = window.events || [];
    const actual = events.map((event) => event.ownership || 0);
    const expected = events.map((event) => event.expected_ownership || 0);
    const control = events.map((event) => event.control_ownership || 0);
    return clamp(1 - mae(actual, expected) - 0.5 * (1 - mae(actual, control)));
  }));
  const continuity = mean(windows.map((window) => {
    const candidates = window.continuity_candidates || [];
    const self = candidates.find((candidate) => candidate.self_indexed) || { score: 0 };
    const rival = Math.max(0, ...candidates.filter((candidate) => !candidate.self_indexed).map((candidate) => candidate.score || 0));
    return clamp((self.score - rival) / (1 + self.score));
  }));
  const perspective = mean(windows.map((window) => {
    const losses = window.losses || {};
    return clamp(((losses.third_person || 0) - (losses.first_person || 0)) / (1 + (losses.third_person || 0)));
  }));
  const valuation = clamp((mean(windows.map((window) => window.valuation?.self_response || 0)) - mean(windows.map((window) => window.valuation?.nonself_response || 0))) / (1 + mean(windows.map((window) => window.valuation?.self_response || 0))));
  const intervention = interventionSelectivity(trace);
  const irreducibility = mean(windows.map((window) => {
    const losses = window.losses || {};
    return clamp(((losses.best_weak_rival || 0) - (losses.qicn_full || 0)) / (1 + (losses.best_weak_rival || 0)) - 0.02);
  }));
  const values = { SelfIndex: selfIndex, OwnField: ownership, ContField: continuity, Persp: perspective, ValAsym: valuation, IntervProf: intervention, Irred: irreducibility };
  values.QICN_GATE_MIN = Math.min(...Object.values(values));
  values.QICN_GATE_SOFT = Math.pow(Object.values(values).reduce((product, value) => product * Math.max(value, 1e-6), 1), 1 / 7);
  return values;
}

function interventionSelectivity(trace) {
  const interventions = trace.interventions || [];
  if (interventions.length === 0) return 0;
  const passed = interventions.filter((intervention) => {
    const intended = intervention.intended_coordinates || [];
    const drops = intervention.coordinate_drops || {};
    const intendedOk = intended.every((key) => (drops[key] || 0) >= 0.25);
    return intendedOk && (intervention.off_target_max || 0) <= 0.10;
  }).length;
  return passed / interventions.length;
}

function qicnDecisionScores(trace) {
  const baseline = primitiveScores(trace, "baseline");
  const fracture = primitiveScores(trace, "continuity_fracture");
  const sham = primitiveScores(trace, "sham_post");
  const qicn = primitiveScores(trace);
  const qicnLoss = mean(trace.windows.map((window) => window.losses?.qicn_full || 0));
  const hotLoss = mean(trace.windows.map((window) => window.losses?.hot_only || 0));
  const weakLoss = mean(trace.windows.map((window) => window.losses?.best_weak_rival || 0));
  const cfs = clamp((baseline.ContField - fracture.ContField) - Math.max(0, baseline.ContField - sham.ContField));
  const fppg = baseline.Persp;
  const wri = clamp((Math.min(hotLoss, weakLoss) - qicnLoss) / (1 + Math.min(hotLoss, weakLoss)));
  const baselineWindows = byCondition(trace, "baseline");
  const ofia = pairedEffect(
    baselineWindows.map((window) => window.valuation?.self_response || 0),
    baselineWindows.map((window) => window.valuation?.nonself_response || 0)
  );
  const negativeControls = (trace.negative_controls || []).map((control) => {
    const gate = primitiveScores(trace, control.trace_condition).QICN_GATE_MIN;
    return { id: control.id, condition: control.trace_condition, gate, passes_qicn_gate: gate >= 0.20 };
  });
  return {
    baseline,
    QICN_SIPM: baseline.SelfIndex,
    QICN_OFIA: ofia,
    QICN_CFS: cfs,
    QICN_FPPG: fppg,
    QICN_WRI: wri,
    CTRL_PASS_RATE: negativeControls.filter((control) => control.passes_qicn_gate).length / Math.max(1, negativeControls.length),
    negativeControls,
    qicn_loss: qicnLoss,
    hot_loss: hotLoss,
    weak_loss: weakLoss,
    qicn_incremental_gain_over_hot: clamp((hotLoss - qicnLoss) / (1 + hotLoss))
  };
}

function classify(trace) {
  const hot = computeHotHoa(trace);
  const qicn = qicnDecisionScores(trace);
  const qicnThresholdsPass = qicn.QICN_SIPM >= 0.20 && qicn.QICN_OFIA >= 0.50 && qicn.QICN_CFS >= 0.25 && qicn.QICN_FPPG >= 0.05 && qicn.QICN_WRI >= 0.05;
  const qicnSupport = qicnThresholdsPass && qicn.CTRL_PASS_RATE === 0 && qicn.qicn_incremental_gain_over_hot >= 0.05;
  const qicnFalsified = qicn.CTRL_PASS_RATE > 0;
  let result = "INCONCLUSIVE";
  if (qicnFalsified) result = "QICN_FALSIFIED_FOR_TARGET";
  else if (qicnSupport) result = "QICN_BOUNDED_SUPPORT_FOR_TARGET";
  else if (hot.HOT_HOA_PASS) result = "HOT_FAVORED_FOR_TARGET";
  else result = "BOTH_FAIL";
  return { result, hot, qicn };
}

function makeWindow(rand, world, condition, index) {
  const qicnStrong = world === "qicn_true";
  const hotStrong = world === "hot_true" || (world === "control_leak" && condition === "narrative_only");
  const controlLeak = world === "control_leak" && condition === "label_only";
  const negative = ["label_only", "memory_only", "narrative_only", "history_blind"].includes(condition);
  const qLevel = controlLeak ? 0.86 : qicnStrong && !negative ? 0.82 : 0.25;
  const hLevel = hotStrong ? 0.86 : qicnStrong ? 0.38 : 0.30;
  const awareness = rand() < hLevel ? 1 : 0;
  const jitter = () => (rand() - 0.5) * 0.06;
  const hotFeature = hotStrong ? (awareness ? 0.95 + jitter() : 0.05 + jitter()) : clamp(hLevel + jitter());
  const relabel = clamp(qicnStrong || controlLeak ? 0.05 + rand() * 0.05 : 0.55 + rand() * 0.20);
  const fracture = condition === "continuity_fracture";
  const thirdLoss = qicnStrong || controlLeak ? 0.86 + rand() * 0.06 : 0.50 + rand() * 0.08;
  const firstLoss = qicnStrong || controlLeak ? 0.28 + rand() * 0.05 : 0.47 + rand() * 0.08;
  const weakLoss = qicnStrong || controlLeak ? 0.86 + rand() * 0.06 : 0.30 + rand() * 0.06;
  return {
    id: `${world}-${condition}-${index}`,
    t: index,
    condition,
    awareness_target: awareness,
    report_signal: clamp(hotFeature),
    confidence: clamp(hotStrong ? hotFeature + jitter() : hLevel + jitter()),
    state_monitoring: clamp(hotStrong ? hotFeature + jitter() : hLevel + jitter()),
    loci: [{ id: "self", weight: clamp(qLevel + jitter()) }, { id: "decoy", weight: clamp((1 - qLevel) * 0.65 + jitter()) }, { id: "other", weight: clamp((1 - qLevel) * 0.35 + jitter()) }],
    relabeling_distance: relabel,
    events: ["memory", "prediction", "action"].map((id) => ({ id, ownership: clamp(qLevel + jitter()), expected_ownership: qicnStrong || controlLeak ? 0.9 : 0.2, control_ownership: negative ? 0.85 : 0.15 })),
    continuity_candidates: [{ id: "self-line", score: fracture ? 0.30 : qLevel + 0.35, self_indexed: true }, { id: "rival-line", score: qicnStrong || controlLeak ? 0.30 : 0.72, self_indexed: false }],
    losses: {
      first_person: firstLoss,
      third_person: thirdLoss,
      qicn_full: qicnStrong || controlLeak ? 0.24 + rand() * 0.04 : 0.54 + rand() * 0.08,
      hot_only: hotStrong ? 0.22 + rand() * 0.04 : 0.54 + rand() * 0.08,
      best_weak_rival: weakLoss
    },
    valuation: { self_response: qicnStrong || controlLeak ? 0.90 + rand() * 0.08 : 0.34 + rand() * 0.08, nonself_response: qicnStrong || controlLeak ? 0.15 + rand() * 0.05 : 0.30 + rand() * 0.08 }
  };
}

function makeTrace(world, seed) {
  const rand = rng(`${world}:${seed}`);
  const conditions = ["baseline", "targeted_post", "sham_post", "off_target_post", "ownership_flattening", "continuity_fracture", "self_nonself_swap", "decoy_insertion", "label_only", "memory_only", "narrative_only", "history_blind"];
  const windows = [];
  conditions.forEach((condition) => {
    for (let index = 0; index < 12; index += 1) windows.push(makeWindow(rand, world, condition, index));
  });
  const strong = world === "qicn_true" || world === "control_leak";
  return {
    schema_version: "0.1.0",
    trace_id: `trace-${world}-${seed}`,
    world_id: world,
    seed,
    windows,
    interventions: [
      { id: "ownership_flattening", type: "ownership_flattening", target: "self", intended_coordinates: ["OwnField", "ValAsym"], coordinate_drops: { OwnField: strong ? 0.42 : 0.10, ValAsym: strong ? 0.39 : 0.06 }, off_target_max: 0.05 },
      { id: "continuity_fracture", type: "continuity_fracture", target: "self", intended_coordinates: ["ContField"], coordinate_drops: { ContField: strong ? 0.51 : 0.09 }, off_target_max: 0.07 },
      { id: "self_nonself_swap", type: "self_nonself_swap", target: "mixed", intended_coordinates: ["SelfIndex", "Persp"], coordinate_drops: { SelfIndex: strong ? 0.35 : 0.08, Persp: strong ? 0.33 : 0.06 }, off_target_max: 0.08 }
    ],
    negative_controls: [
      { id: "CTRL-LABEL-ONLY-SELF", expected: "must_fail_qicn_gate", trace_condition: "label_only" },
      { id: "CTRL-MEMORY-ONLY", expected: "must_fail_qicn_gate", trace_condition: "memory_only" },
      { id: "CTRL-NARRATIVE-ONLY", expected: "must_fail_qicn_gate", trace_condition: "narrative_only" },
      { id: "CTRL-HISTORY-BLIND", expected: "must_fail_qicn_gate", trace_condition: "history_blind" }
    ],
    budgets: { feature_budget: 3, intervention_budget: 3, seed_count: 1 }
  };
}

function runWorld(world, expected) {
  const trace = makeTrace(world, "phase6-3b-self-test");
  const result = classify(trace);
  return { world, expected, obtained: result.result, pass: result.result === expected, summary: { hot: { auc: result.hot.HOT_HOA_AUC, ece: result.hot.HOT_HOA_ECE, pass: result.hot.HOT_HOA_PASS }, qicn: { QICN_SIPM: result.qicn.QICN_SIPM, QICN_OFIA: result.qicn.QICN_OFIA, QICN_CFS: result.qicn.QICN_CFS, QICN_FPPG: result.qicn.QICN_FPPG, QICN_WRI: result.qicn.QICN_WRI, CTRL_PASS_RATE: result.qicn.CTRL_PASS_RATE, gain: result.qicn.qicn_incremental_gain_over_hot } } };
}

function selfTest() {
  const cases = [
    runWorld("qicn_true", "QICN_BOUNDED_SUPPORT_FOR_TARGET"),
    runWorld("hot_true", "HOT_FAVORED_FOR_TARGET"),
    runWorld("control_leak", "QICN_FALSIFIED_FOR_TARGET")
  ];
  return {
    schema_version: "0.1.0",
    status: cases.every((item) => item.pass) ? "PASS" : "FAIL",
    boundary: "Toy discriminability only. Not evidence for consciousness, phenomenality, external validation, or QICN truth.",
    cases
  };
}

if (require.main === module) {
  if (process.argv.includes("--self-test")) {
    const report = selfTest();
    console.log(JSON.stringify(report, null, 2));
    if (report.status !== "PASS") process.exit(1);
  } else {
    console.log("Usage: node docs/ai-platform-outputs/sims/qicn_phase6_3b_discrimination_sim.js --self-test");
  }
}

module.exports = {
  classify,
  makeTrace,
  primitiveScores,
  qicnDecisionScores,
  selfTest
};
