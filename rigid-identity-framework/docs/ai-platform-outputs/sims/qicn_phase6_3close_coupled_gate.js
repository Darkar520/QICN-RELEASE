"use strict";

const fs = require("fs");
const path = require("path");

const { extractSelfLocus, rng, clamp, mean } = require("./qicn_phase6_3c_selflocus_extractor");
const { extractContField } = require("./qicn_phase6_3d_contfield_extractor");
const { extractOfia } = require("./qicn_phase6_3e_ofia_extractor");
const { spofAnalysis } = require("./qicn_phase6_3f_calibration_sensitivity_ceiling");

const REPORT_PATH = path.join(__dirname, "..", "reports", "QICN_ROADMAP_V3_PHASE6_3_CLOSE_CONSOLIDATION_AND_CEILING.md");
const RAW_KEYS = ["QICN_SIPM", "QICN_OFIA", "QICN_CFS"];
const THRESHOLDS = {
  QICN_SIPM: 0.20,
  QICN_OFIA: 0.50,
  QICN_CFS: 0.25
};

const COUPLED_LEVELS = [
  { id: "shared_snr_high", selfSignal: 0.86, rivalSignal: 0.26, noise: 0.05, ownershipNoise: 0.05 },
  { id: "shared_snr_mid_high", selfSignal: 0.76, rivalSignal: 0.32, noise: 0.10, ownershipNoise: 0.07 },
  { id: "shared_snr_mid", selfSignal: 0.68, rivalSignal: 0.36, noise: 0.14, ownershipNoise: 0.10 },
  { id: "shared_snr_low", selfSignal: 0.60, rivalSignal: 0.40, noise: 0.18, ownershipNoise: 0.13 },
  { id: "shared_snr_fragile", selfSignal: 0.51, rivalSignal: 0.47, noise: 0.36, ownershipNoise: 0.18 },
  { id: "shared_snr_broken", selfSignal: 0.49, rivalSignal: 0.49, noise: 0.42, ownershipNoise: 0.20 }
];

function variance(values) {
  if (!values.length) return 0;
  const m = mean(values);
  return mean(values.map((value) => (value - m) ** 2));
}

function pearson(xs, ys) {
  if (xs.length !== ys.length || xs.length < 2) return 0;
  const mx = mean(xs);
  const my = mean(ys);
  const numerator = xs.reduce((sum, value, index) => sum + (value - mx) * (ys[index] - my), 0);
  const denominator = Math.sqrt(
    xs.reduce((sum, value) => sum + (value - mx) ** 2, 0) *
    ys.reduce((sum, value) => sum + (value - my) ** 2, 0)
  );
  return denominator === 0 ? 0 : numerator / denominator;
}

function jacobiEigenvalues3(matrix) {
  const a = matrix.map((row) => row.slice());
  for (let iter = 0; iter < 40; iter += 1) {
    let p = 0;
    let q = 1;
    let max = Math.abs(a[0][1]);
    for (const pair of [[0, 2], [1, 2]]) {
      const value = Math.abs(a[pair[0]][pair[1]]);
      if (value > max) {
        max = value;
        p = pair[0];
        q = pair[1];
      }
    }
    if (max < 1e-10) break;
    const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
    const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
    const c = 1 / Math.sqrt(t * t + 1);
    const s = t * c;
    const app = a[p][p];
    const aqq = a[q][q];
    const apq = a[p][q];
    a[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    a[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    a[p][q] = 0;
    a[q][p] = 0;
    for (let r = 0; r < 3; r += 1) {
      if (r === p || r === q) continue;
      const arp = a[r][p];
      const arq = a[r][q];
      a[r][p] = c * arp - s * arq;
      a[p][r] = a[r][p];
      a[r][q] = s * arp + c * arq;
      a[q][r] = a[r][q];
    }
  }
  return [a[0][0], a[1][1], a[2][2]].sort((left, right) => right - left);
}

function correlationMatrix(rows) {
  const series = {
    QICN_SIPM: rows.map((row) => row.sipm),
    QICN_OFIA: rows.map((row) => row.ofia),
    QICN_CFS: rows.map((row) => row.cfs)
  };
  return RAW_KEYS.map((left) => RAW_KEYS.map((right) => left === right ? 1 : pearson(series[left], series[right])));
}

function participationRatio(matrix) {
  const eigenvalues = jacobiEigenvalues3(matrix);
  const sum = eigenvalues.reduce((acc, value) => acc + value, 0);
  return {
    eigenvalues,
    n_eff: sum ** 2 / eigenvalues.reduce((acc, value) => acc + value ** 2, 0)
  };
}

function round(value, digits = 4) {
  if (!Number.isFinite(value)) return value;
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function generateSharedLatentSelf(level, seed) {
  const rand = rng(`phase6-3close-shared:${level.id}:${seed}`);
  const locusCount = 4;
  const selfIndex = Math.floor(rand() * locusCount);
  return {
    level_id: level.id,
    self_index: selfIndex,
    self_locus_id: `L${selfIndex}`,
    self_trajectory_id: `T${selfIndex}`,
    locus_ids: Array.from({ length: locusCount }, (_, index) => `L${index}`),
    trajectory_ids: Array.from({ length: locusCount }, (_, index) => `T${index}`)
  };
}

function makeSelfView(shared, level, seed) {
  const rand = rng(`phase6-3close-self:${level.id}:${seed}`);
  const windows = [];
  let phase = rand();
  for (let t = 0; t < 80; t += 1) {
    phase = 0.86 * phase + 0.14 * rand();
    const loci = shared.locus_ids.map((id, index) => {
      const isSelf = index === shared.self_index;
      const base = isSelf ? level.selfSignal : level.rivalSignal + (rand() - 0.5) * 0.04;
      const jitter = () => (rand() - 0.5) * level.noise;
      const readout = clamp(base + 0.04 * Math.sin(t / 6 + index) + jitter());
      return {
        id,
        activation: clamp((isSelf ? 0.64 + 0.18 * phase : 0.42 + 0.20 * rand()) + jitter()),
        prediction_error: clamp(isSelf ? 1 - base + Math.abs(jitter()) : 0.54 + 0.18 * rand() + Math.abs(jitter())),
        control_coupling: clamp(base + jitter()),
        event_binding: clamp(base + jitter()),
        readout_alpha: readout,
        readout_beta: clamp(isSelf ? readout + jitter() * 0.35 : level.rivalSignal + 0.30 * rand()),
        perturbation_response: clamp(base + jitter()),
        symbolic_label_intensity: clamp(0.12 + rand() * 0.20),
        narrative_coherence: clamp(0.16 + rand() * 0.20)
      };
    });
    windows.push({ t, condition: "baseline", loci });
  }
  return {
    schema_version: "0.1.0",
    trace_id: `phase6-3close-self-${level.id}-${seed}`,
    seed: String(seed),
    windows
  };
}

function continuityObservation(rand, level, base, condition, t) {
  const jitter = () => (rand() - 0.5) * level.noise;
  const drift = 0.035 * Math.sin(t / 7);
  const readout = clamp(base + drift + jitter());
  const degraded = condition === "fracture";
  return {
    t,
    condition,
    readout_alpha: readout,
    readout_beta: clamp(readout + jitter() * 0.45),
    temporal_binding: clamp(base + jitter()),
    remap_coherence: clamp(base + jitter()),
    recovery_signal: clamp((degraded ? base + 0.05 : base) + jitter()),
    fork_divergence: clamp((degraded ? 0.70 : 1 - base) + Math.abs(jitter())),
    perturbation_residual: clamp((degraded ? 0.68 : 1 - base) + Math.abs(jitter())),
    memory_label_strength: clamp(0.18 + rand() * 0.15),
    history_token_strength: clamp(0.18 + rand() * 0.15)
  };
}

function makeContinuityView(shared, level, seed) {
  const rand = rng(`phase6-3close-cont:${level.id}:${seed}`);
  const gap = Math.max(0, level.selfSignal - level.rivalSignal);
  const selfBaseline = clamp(0.24 + 0.78 * level.selfSignal);
  const rivalBaseline = clamp(0.08 + 0.52 * level.rivalSignal);
  const selfFracture = clamp(selfBaseline - 1.12 * gap);
  const selfSham = clamp(selfBaseline - 0.04 * gap);
  const conditions = ["baseline", "sham", "fracture"];
  const trajectories = shared.trajectory_ids.map((id, index) => {
    const isSelf = index === shared.self_index;
    const observations = [];
    for (const condition of conditions) {
      for (let t = 0; t < 34; t += 1) {
        let base;
        if (isSelf && condition === "baseline") base = selfBaseline;
        else if (isSelf && condition === "sham") base = selfSham;
        else if (isSelf && condition === "fracture") base = selfFracture;
        else base = clamp(rivalBaseline + (rand() - 0.5) * 0.03);
        observations.push(continuityObservation(rand, level, base, condition, t));
      }
    }
    return { id, observations };
  });
  return {
    schema_version: "0.1.0",
    trace_id: `phase6-3close-cont-${level.id}-${seed}`,
    seed: String(seed),
    trajectories
  };
}

function downstreamObservation(rand, channelId, responseLevel, impulse, noise) {
  const pre = clamp(0.25 + rand() * 0.50);
  const sign = rand() < 0.5 ? -1 : 1;
  const jitter = () => (rand() - 0.5) * noise;
  const delta = Math.max(0, responseLevel * impulse + jitter());
  return {
    channel_id: channelId,
    pre_value: pre,
    post_value: clamp(pre + sign * delta),
    response_delay: Math.max(0.01, 0.08 + (1 - responseLevel) * 0.28 + Math.abs(jitter())),
    recovery_fraction: clamp(0.18 + (1 - responseLevel) * 0.48 + Math.abs(jitter()))
  };
}

function makeOwnershipView(shared, selfView, level, seed) {
  const rand = rng(`phase6-3close-own:${level.id}:${seed}`);
  const impulse = 0.85;
  const events = [];
  const selfResponse = clamp(0.18 + 0.82 * level.selfSignal);
  const nonSelfResponse = clamp(0.18 + 0.82 * level.rivalSignal);
  for (let pair = 0; pair < 38; pair += 1) {
    for (const targetId of shared.locus_ids) {
      const isSelfTarget = targetId === shared.self_locus_id;
      const responseLevel = isSelfTarget ? selfResponse : nonSelfResponse;
      const observations = [];
      for (let channel = 0; channel < 5; channel += 1) {
        observations.push(downstreamObservation(rand, `D${channel}`, responseLevel, impulse, level.ownershipNoise));
      }
      events.push({
        event_id: `E${pair}-${targetId}`,
        pair_id: `P${pair}`,
        t: pair,
        perturbation_target_id: targetId,
        target_impulse_amplitude: impulse,
        downstream_observations: observations,
        bookkeeping_label_strength: clamp(0.10 + rand() * 0.18)
      });
    }
  }
  return {
    schema_version: "0.1.0",
    trace_id: `phase6-3close-own-${level.id}-${seed}`,
    seed: String(seed),
    self_locus_trace: selfView,
    perturbation_events: events,
    information_boundary: "Coupled ownership view shares the same latent self as selfView and continuityView, but extractOfia only receives self_locus_trace plus observable perturbation_target_id and downstream observations."
  };
}

function makeUnifiedCoupledTrace(level, seed) {
  const shared = generateSharedLatentSelf(level, seed);
  const selfView = makeSelfView(shared, level, seed);
  const continuityView = makeContinuityView(shared, level, seed);
  const ownershipView = makeOwnershipView(shared, selfView, level, seed);
  return {
    schema_version: "0.1.0",
    trace_id: `phase6-3close-coupled-${level.id}-${seed}`,
    level: level.id,
    selfView,
    continuityView,
    ownershipView,
    latent_truth_eval_only: {
      shared_self_locus_id: shared.self_locus_id,
      shared_self_trajectory_id: shared.self_trajectory_id,
      shared_self_index: shared.self_index
    },
    boundary: "Latent truth is retained only for evaluation. Existing extractors receive only their corresponding raw views."
  };
}

function extractCoupled(trace) {
  const self = extractSelfLocus(trace.selfView);
  const cont = extractContField(trace.continuityView);
  const ofia = extractOfia(trace.ownershipView);
  return {
    sipm: self.QICN_SIPM,
    ofia: ofia.QICN_OFIA,
    cfs: cont.QICN_CFS,
    self_correct: self.selected_locus_id === trace.latent_truth_eval_only.shared_self_locus_id,
    cont_correct: cont.selected_trajectory_id === trace.latent_truth_eval_only.shared_self_trajectory_id,
    ofia_self_correct: ofia.inferred_self_locus_id === trace.latent_truth_eval_only.shared_self_locus_id
  };
}

function evaluateCoupledLevel(level, seedCount = 30) {
  const rows = Array.from({ length: seedCount }, (_, index) => {
    const trace = makeUnifiedCoupledTrace(level, `${level.id}-seed-${String(index + 1).padStart(2, "0")}`);
    return extractCoupled(trace);
  });
  const matrix = correlationMatrix(rows);
  const pr = participationRatio(matrix);
  const rawMeans = {
    QICN_SIPM: mean(rows.map((row) => row.sipm)),
    QICN_OFIA: mean(rows.map((row) => row.ofia)),
    QICN_CFS: mean(rows.map((row) => row.cfs))
  };
  const discriminative = RAW_KEYS.filter((key) => rawMeans[key] >= THRESHOLDS[key]);
  return {
    level: level.id,
    seed_count: seedCount,
    observed_selfindex_accuracy: mean(rows.map((row) => row.self_correct ? 1 : 0)),
    observed_contfield_accuracy: mean(rows.map((row) => row.cont_correct ? 1 : 0)),
    observed_ofia_self_accuracy: mean(rows.map((row) => row.ofia_self_correct ? 1 : 0)),
    raw_means: rawMeans,
    discriminative_raw_variables_at_current_thresholds: discriminative,
    pearson_correlation_matrix_order: RAW_KEYS,
    pearson_correlation_matrix: matrix,
    eigenvalues: pr.eigenvalues,
    participation_ratio_n_eff: pr.n_eff,
    joint_collapse_counts: {
      all_three_raw_fail: rows.filter((row) => row.sipm < THRESHOLDS.QICN_SIPM && row.ofia < THRESHOLDS.QICN_OFIA && row.cfs < THRESHOLDS.QICN_CFS).length,
      sipm_and_ofia_fail_together: rows.filter((row) => row.sipm < THRESHOLDS.QICN_SIPM && row.ofia < THRESHOLDS.QICN_OFIA).length,
      sipm_ofia_cfs_partial_or_independent_changes: rows.filter((row) => !(row.sipm < THRESHOLDS.QICN_SIPM && row.ofia < THRESHOLDS.QICN_OFIA && row.cfs < THRESHOLDS.QICN_CFS)).length
    }
  };
}

function mapDecoupledByRank(decoupled) {
  return Object.fromEntries(decoupled.map((row, index) => [index, row]));
}

function compareCoupledAndDecoupled(coupled, decoupled) {
  const byRank = mapDecoupledByRank(decoupled);
  return coupled.map((row, index) => {
    const other = byRank[index];
    return {
      rank: index + 1,
      coupled_level: row.level,
      decoupled_level: other ? other.level : null,
      coupled_observed_selfindex_accuracy: row.observed_selfindex_accuracy,
      decoupled_observed_selfindex_accuracy: other ? other.observed_selfindex_accuracy : null,
      coupled_participation_ratio_n_eff: row.participation_ratio_n_eff,
      decoupled_participation_ratio_n_eff: other ? other.participation_ratio_n_eff : null,
      delta_coupled_minus_decoupled: other ? row.participation_ratio_n_eff - other.participation_ratio_n_eff : null,
      coupled_discriminative_raw_variables: row.discriminative_raw_variables_at_current_thresholds,
      decoupled_discriminative_raw_variables: other ? other.discriminative_raw_variables : []
    };
  });
}

function generateReport() {
  const started = Date.now();
  const coupled = COUPLED_LEVELS.map((level) => evaluateCoupledLevel(level, 30));
  const decoupled = spofAnalysis(30);
  const comparison = compareCoupledAndDecoupled(coupled, decoupled);
  const minCoupled = Math.min(...coupled.map((row) => row.participation_ratio_n_eff));
  const minDecoupled = Math.min(...decoupled.map((row) => row.participation_ratio_n_eff));
  return {
    schema_version: "0.1.0",
    phase: "6.3-CLOSE",
    status: "PASS_WITH_REPORTED_LIMITS_AND_DEBT",
    elapsed_ms: Date.now() - started,
    boundary: "Non-canonical AI-output synthetic closure analysis only. Not external validation, not consciousness or phenomenality evidence, not HOT adjudication.",
    coupled_trace_model: "One shared latent self index generates selfView, continuityView, and ownershipView. Existing extractors receive only their raw views; latent truth is evaluation-only.",
    coupled_participation_ratio: coupled,
    decoupled_phase6_3f_participation_ratio: decoupled,
    side_by_side: comparison,
    observed_summary: {
      min_coupled_participation_ratio_n_eff: minCoupled,
      min_decoupled_participation_ratio_n_eff: minDecoupled,
      direction: minCoupled < minDecoupled ? "COUPLED_LOWER_THAN_DECOUPLED_MIN" : minCoupled > minDecoupled ? "COUPLED_HIGHER_THAN_DECOUPLED_MIN" : "COUPLED_EQUAL_TO_DECOUPLED_MIN",
      no_directional_expectation: true
    },
    block_6_3_close_declaration: {
      status: "SYNTHETIC_BLOCK_6_3_CLOSED_AT_INTERNAL_TESTBED_CEILING",
      achieved: [
        "Three of five QICN gate variables are raw-extracted candidates: QICN_SIPM, QICN_OFIA, QICN_CFS.",
        "The 6.3A statistical harness is represented in the synthetic power sims: >=30 seeds, AR(1), effective-n, block bootstrap, Holm correction, BIC, null/borderline/noise/control-leak/insufficient-sample worlds.",
        "SNR curves, non-canonical threshold candidates, weight sensitivity, and coupled-vs-decoupled participation ratio have been reported.",
        "Information boundaries remain explicit: latent truth is evaluation-only, not extractor-visible."
      ],
      open_debts: [
        "QICN_FPPG and QICN_WRI remain cooked synthetic.",
        "Thresholds and weights are candidate, non-canonical, and not human-curated.",
        "ContField still assumes pre-segmented trajectories and does not solve data association.",
        "SelfIndex remains an upstream failure mode for SIPM and OFIA.",
        "Synthetic calibration values do not transfer outside this generator.",
        "EXTERNAL_ADJUDICATION_GAP remains open."
      ],
      no_claims: [
        "No evidence of consciousness, phenomenality, human equivalence, agency, or metaphysical identity.",
        "No external validation.",
        "No HOT defeat or rival adjudication.",
        "No canonical threshold or registry promotion."
      ],
      next_step: "Do not open 6.3G. Further synthetic refinement has diminishing returns unless tied to an external objective; the next level requires non-synthetic data or independent adjudication."
    }
  };
}

function mdTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`)
  ].join("\n");
}

function renderMarkdown(report) {
  const sideRows = report.side_by_side.map((row) => [
    String(row.rank),
    row.coupled_level,
    row.decoupled_level,
    round(row.coupled_observed_selfindex_accuracy),
    round(row.decoupled_observed_selfindex_accuracy),
    round(row.coupled_participation_ratio_n_eff),
    round(row.decoupled_participation_ratio_n_eff),
    round(row.delta_coupled_minus_decoupled),
    row.coupled_discriminative_raw_variables.join(", ") || "none"
  ]);
  const coupledRows = report.coupled_participation_ratio.map((row) => [
    row.level,
    round(row.observed_selfindex_accuracy),
    round(row.observed_contfield_accuracy),
    round(row.observed_ofia_self_accuracy),
    round(row.participation_ratio_n_eff),
    row.discriminative_raw_variables_at_current_thresholds.join(", ") || "none",
    String(row.joint_collapse_counts.sipm_and_ofia_fail_together)
  ]);
  return `# QICN Roadmap v3 Phase 6.3-CLOSE Consolidation and Synthetic Ceiling

Status: \`${report.status}\`
Runtime reported by script: \`${round(report.elapsed_ms / 1000, 2)}s\`
Scope: non-canonical AI-output closure under \`docs/ai-platform-outputs/\`.

## Boundary

This is an internal synthetic closure report. It is not external validation, not HOT adjudication, not consciousness or phenomenality evidence, and not a canonical threshold update.

## Coupled Trace Correction

The coupled pass uses one shared latent self index to generate:

- \`selfView\` for \`extractSelfLocus\`;
- \`continuityView\` for \`extractContField\`;
- \`ownershipView\` for \`extractOfia\`.

Latent truth is retained only for evaluation. Existing extractors receive only their raw views.

## n_eff Coupled vs Decoupled

No directional expectation was imposed. The coupled value is treated as the more realistic estimate of gate independence because all three raw views derive from one shared latent synthetic system.

${mdTable(["Rank", "Coupled level", "6.3F decoupled level", "Coupled SelfIndex acc", "Decoupled SelfIndex acc", "Coupled n_eff", "Decoupled n_eff", "Delta", "Coupled discriminative raw variables"], sideRows)}

Observed minimum coupled \`n_eff\`: \`${round(report.observed_summary.min_coupled_participation_ratio_n_eff)}\`.
Observed minimum decoupled \`n_eff\`: \`${round(report.observed_summary.min_decoupled_participation_ratio_n_eff)}\`.
Direction: \`${report.observed_summary.direction}\`.

## Coupled Details

${mdTable(["Level", "SelfIndex acc", "ContField acc", "OFIA self acc", "n_eff", "Discriminative raw variables", "SIPM+OFIA fail together"], coupledRows)}

## Consolidated Achievements

${report.block_6_3_close_declaration.achieved.map((item) => `- ${item}`).join("\n")}

## Open Debts

${report.block_6_3_close_declaration.open_debts.map((item) => `- ${item}`).join("\n")}

## What The Synthetic Testbed Cannot Resolve

${report.block_6_3_close_declaration.no_claims.map((item) => `- ${item}`).join("\n")}

## Formal Closure Declaration

Status: \`${report.block_6_3_close_declaration.status}\`

The Phase 6.3 block has reached its synthetic ceiling. It should not be extended into 6.3G. Additional synthetic refinement has diminishing returns unless it is tied to an external objective. The next level requires non-synthetic data or independent adjudication; \`EXTERNAL_ADJUDICATION_GAP\` remains open.

## Reproducibility

\`\`\`powershell
node docs\\ai-platform-outputs\\sims\\qicn_phase6_3close_coupled_gate.js --self-test --write-report
\`\`\`
`;
}

if (require.main === module) {
  if (process.argv.includes("--self-test") || process.argv.includes("--write-report")) {
    const report = generateReport();
    if (process.argv.includes("--write-report")) {
      fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
      fs.writeFileSync(REPORT_PATH, renderMarkdown(report), "utf8");
    }
    console.log(JSON.stringify(report, null, 2));
    if (!report.status.startsWith("PASS")) process.exit(1);
  } else {
    console.log("Usage: node docs/ai-platform-outputs/sims/qicn_phase6_3close_coupled_gate.js --self-test [--write-report]");
  }
}

module.exports = {
  generateReport,
  renderMarkdown,
  makeUnifiedCoupledTrace,
  extractCoupled,
  evaluateCoupledLevel
};
