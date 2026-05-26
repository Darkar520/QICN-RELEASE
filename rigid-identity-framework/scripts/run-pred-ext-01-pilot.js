const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {
  fitTraceMemoryRival,
  totalVariation,
  transitionDistribution
} = require("./lib/trace-memory-rival");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-EXT-01_freeze_v1.json");
const OUTPUT_DIR = path.join(ROOT, "artifacts", "pred-ext-01", "v1_internal_pilot_001");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "decision_record.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_EXT_01_INTERNAL_PILOT_DECISION_RECORD.json");

function stableJson(value, seen = new WeakSet()) {
  if (Array.isArray(value)) return `[${value.map((item) => stableJson(item, seen)).join(",")}]`;
  if (value && typeof value === "object") {
    if (seen.has(value)) throw new Error("Cannot hash circular object.");
    seen.add(value);
    const body = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key], seen)}`)
      .join(",");
    seen.delete(value);
    return `{${body}}`;
  }
  if (typeof value === "undefined" || typeof value === "function" || typeof value === "symbol") {
    throw new Error(`Unsupported value in stable JSON hash: ${typeof value}`);
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash("sha256").update(stableJson(value)).digest("hex");
}

function repeatPattern(pattern, length) {
  const trace = [];
  for (let index = 0; index < length; index += 1) {
    trace.push(pattern[index % pattern.length]);
  }
  return trace;
}

function buildTracePanel(length) {
  const baseline = repeatPattern(["A", "B", "A", "C", "A", "B", "D", "B"], length);
  return {
    qicn_synthetic_positive: {
      baseline,
      targeted_post: repeatPattern(["A", "C", "C", "B", "C", "D", "C", "B"], length),
      sham_post: baseline,
      off_target_post: repeatPattern(["A", "B", "A", "C", "A", "D", "D", "B"], length)
    },
    memory_only_negative_control: {
      baseline,
      targeted_post: baseline,
      sham_post: baseline,
      off_target_post: baseline
    }
  };
}

function scoreScenario(name, traces, freeze) {
  const rivalPolicy = {
    memoryDepth: freeze.trace_memory_rival_policy.memory_depth,
    minTraceLength: freeze.trace_memory_rival_policy.minimum_trace_length,
    laplaceSmoothing: freeze.trace_memory_rival_policy.laplace_smoothing,
    alphabet: freeze.state_alphabet
  };
  const rival = fitTraceMemoryRival(traces.baseline, rivalPolicy);
  const distributions = {
    baseline: transitionDistribution(traces.baseline, rivalPolicy),
    targeted_post: transitionDistribution(traces.targeted_post, rivalPolicy),
    sham_post: transitionDistribution(traces.sham_post, rivalPolicy),
    off_target_post: transitionDistribution(traces.off_target_post, rivalPolicy),
    trace_memory_rival_prediction: rival.predictAggregateDistribution(traces.targeted_post)
  };

  const tvTargeted = totalVariation(distributions.baseline, distributions.targeted_post);
  const tvSham = totalVariation(distributions.baseline, distributions.sham_post);
  const tvOffTarget = totalVariation(distributions.baseline, distributions.off_target_post);
  const controlMax = Math.max(tvSham, tvOffTarget, freeze.epsilon_floor);
  const rhoSelective = tvTargeted / controlMax;
  const rivalTvLoss = totalVariation(distributions.targeted_post, distributions.trace_memory_rival_prediction);
  const complexityPenalty =
    freeze.penalized_loss_alpha *
    (rival.parameterCount / (freeze.trace_length * freeze.state_alphabet.length));
  const penalizedRivalLoss = rivalTvLoss + complexityPenalty;
  const supportRuleSatisfied =
    rhoSelective >= freeze.rho_selective_threshold &&
    tvTargeted > controlMax &&
    penalizedRivalLoss >= freeze.rival_loss_floor;

  return {
    scenario: name,
    verdict: supportRuleSatisfied ? "support_rule_satisfied" : "support_rule_not_satisfied",
    support_rule_satisfied: supportRuleSatisfied,
    metrics: {
      tv_targeted: tvTargeted,
      tv_sham: tvSham,
      tv_off_target: tvOffTarget,
      control_max: controlMax,
      rho_selective: rhoSelective,
      rival_tv_loss: rivalTvLoss,
      complexity_penalty: complexityPenalty,
      penalized_rival_loss: penalizedRivalLoss,
      rival_parameter_count: rival.parameterCount,
      rival_training_entropy_bits: rival.trainingEntropy
    },
    distributions
  };
}

function buildPilotRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const tracePanel = buildTracePanel(freeze.trace_length);
  const scenarioResults = Object.fromEntries(
    Object.entries(tracePanel).map(([name, traces]) => [name, scoreScenario(name, traces, freeze)])
  );

  const positive = scenarioResults.qicn_synthetic_positive;
  const negative = scenarioResults.memory_only_negative_control;
  const negativeControlPassed = !negative.support_rule_satisfied;
  let overallVerdict = "internal_synthetic_inconclusive";
  if (positive.support_rule_satisfied && negativeControlPassed) {
    overallVerdict = "internal_synthetic_support_with_negative_control_passed";
  } else if (!positive.support_rule_satisfied) {
    overallVerdict = "internal_synthetic_no_support";
  } else if (!negativeControlPassed) {
    overallVerdict = "destruction_candidate_negative_control_passed_support_rule";
  }

  const traceBundle = {
    freeze_id: freeze.freeze_id,
    state_alphabet: freeze.state_alphabet,
    trace_length: freeze.trace_length,
    seed_policy: freeze.seed_policy,
    trace_panel: tracePanel
  };

  return {
    schema_version: "1.0.0",
    prediction_id: "PRED-EXT-01",
    run_id: "pred-ext-01-v1-internal-pilot-001",
    date_executed: "2026-05-26",
    execution_class: "internal_synthetic_pilot",
    status: "executed_internal_synthetic_pilot",
    verdict: overallVerdict,
    boundary: "This is an internal synthetic pilot only. It is not empirical support, not external adjudication, not validation of consciousness, phenomenality, identity transfer, agency, moral status, or the full QICN framework.",
    freeze,
    scenario_results: scenarioResults,
    negative_control: {
      id: "memory_only_negative_control",
      passed: negativeControlPassed,
      rule: freeze.negative_control_rule
    },
    claim_ledger_update_required:
      overallVerdict === "internal_synthetic_support_with_negative_control_passed"
        ? "Record as internal_synthetic_support only; do not promote to external evidence."
        : "Record as no_support_or_destruction_candidate according to scenario verdict.",
    artifact_hashes: {
      freeze_sha256: sha256(freeze),
      trace_bundle_sha256: sha256(traceBundle),
      scenario_results_sha256: sha256(scenarioResults)
    }
  };
}

function run() {
  const record = buildPilotRecord();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(record, null, 2)}\n`, "utf8");
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(record, null, 2)}\n`, "utf8");

  console.log("====================================================");
  console.log("QICN PRED-EXT-01 Internal Synthetic Pilot");
  console.log("====================================================");
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(`Status: ${record.status}`);
  console.log(`Verdict: ${record.verdict}`);
  console.log("Boundary: internal synthetic pilot only; no empirical support or external adjudication.");
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[FATAL] PRED-EXT-01 pilot failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { buildPilotRecord, scoreScenario };
