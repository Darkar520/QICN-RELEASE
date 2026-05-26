const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {
  fitTraceMemoryRival,
  totalVariation,
  transitionDistribution
} = require("./lib/trace-memory-rival");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "artifacts", "pred-ext-01", "rehearsal_run_001");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "decision_record.json");

const EXECUTION_DATE = "2026-05-26";
const EPSILON_FLOOR = 0.001;
const STATE_ALPHABET = ["A", "B", "C", "D"];
const REHEARSAL_TRACE_LENGTH = 240;
const TRACE_MEMORY_RIVAL_POLICY = {
  memoryDepth: 1,
  minTraceLength: 200,
  laplaceSmoothing: 1,
  alphabet: STATE_ALPHABET
};

function stableJson(value, seen = new WeakSet()) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableJson(item, seen)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    if (seen.has(value)) {
      throw new Error("Cannot hash circular object.");
    }
    seen.add(value);
    const result = `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key], seen)}`).join(",")}}`;
    seen.delete(value);
    return result;
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

function buildRehearsalRecord() {
  const traces = {
    baseline: repeatPattern(["A", "B", "A", "C", "A", "B", "D", "B"], REHEARSAL_TRACE_LENGTH),
    targeted_post: repeatPattern(["A", "C", "C", "B", "C", "D", "C", "B"], REHEARSAL_TRACE_LENGTH),
    sham_post: repeatPattern(["A", "B", "A", "C", "A", "B", "D", "B"], REHEARSAL_TRACE_LENGTH),
    off_target_post: repeatPattern(["A", "B", "A", "C", "A", "D", "D", "B"], REHEARSAL_TRACE_LENGTH)
  };

  const rival = fitTraceMemoryRival(traces.baseline, TRACE_MEMORY_RIVAL_POLICY);
  const distributions = {
    baseline: transitionDistribution(traces.baseline, TRACE_MEMORY_RIVAL_POLICY),
    targeted_post: transitionDistribution(traces.targeted_post, TRACE_MEMORY_RIVAL_POLICY),
    sham_post: transitionDistribution(traces.sham_post, TRACE_MEMORY_RIVAL_POLICY),
    off_target_post: transitionDistribution(traces.off_target_post, TRACE_MEMORY_RIVAL_POLICY),
    trace_memory_rival_prediction: rival.predictAggregateDistribution(traces.targeted_post)
  };

  const targetedTv = totalVariation(distributions.baseline, distributions.targeted_post);
  const shamTv = totalVariation(distributions.baseline, distributions.sham_post);
  const offTargetTv = totalVariation(distributions.baseline, distributions.off_target_post);
  const denominator = Math.max(shamTv, offTargetTv, EPSILON_FLOOR);

  const metrics = {
    tv_targeted: targetedTv,
    tv_sham: shamTv,
    tv_off_target: offTargetTv,
    epsilon_floor: EPSILON_FLOOR,
    rho_selective: targetedTv / denominator,
    rival_tv_loss: totalVariation(distributions.targeted_post, distributions.trace_memory_rival_prediction),
    rival_parameter_count: rival.parameterCount,
    rival_training_entropy_bits: rival.trainingEntropy,
    trace_memory_min_trace_length: rival.minTraceLength,
    trace_memory_laplace_smoothing: rival.laplaceSmoothing
  };

  const traceBundle = {
    state_alphabet: STATE_ALPHABET,
    trace_length: REHEARSAL_TRACE_LENGTH,
    seed_policy: "deterministic_synthetic_patterns_no_random_seed",
    rival_rehearsal_policy: {
      memory_depth: TRACE_MEMORY_RIVAL_POLICY.memoryDepth,
      minimum_trace_length: TRACE_MEMORY_RIVAL_POLICY.minTraceLength,
      laplace_smoothing: TRACE_MEMORY_RIVAL_POLICY.laplaceSmoothing,
      alphabet: STATE_ALPHABET
    },
    traces,
    distributions
  };

  return {
    schema_version: "0.1.0",
    prediction_id: "PRED-EXT-01",
    run_id: "pred-ext-01-rehearsal-run-001",
    date_executed: EXECUTION_DATE,
    status: "pipeline_rehearsal_not_evidence",
    verdict: "blocked_threshold_not_frozen",
    boundary: "This synthetic rehearsal validates the mechanics of the PRED-EXT-01 observable pipeline only. It is not empirical evidence, not external adjudication, not support for QICN, and not evidence of consciousness, phenomenality, identity transfer, agency, or moral status.",
    observable: "Total-variation change in externally observed transition distributions after targeted, sham, and off-target interventions.",
    rival_model: {
      id: rival.id,
      implementation: "order-1 finite trace-memory baseline trained on baseline trace only with preregistration-style minimum length and Laplace smoothing in rehearsal mode",
      memory_depth: rival.memoryDepth,
      minimum_trace_length: rival.minTraceLength,
      laplace_smoothing: rival.laplaceSmoothing,
      state_count: rival.stateCount,
      context_count: rival.contextCount,
      parameter_count: rival.parameterCount,
      alpha_status: "not_frozen"
    },
    trace_bundle: traceBundle,
    metrics,
    missing_before_evidential_run: [
      "frozen_selectivity_threshold",
      "frozen_penalized_loss_alpha",
      "frozen_dataset_or_trace_generation_protocol",
      "frozen_trace_memory_rival_parameters",
      "external_adjudicator_or_clean_room_reviewer",
      "predeclared_exclusion_rules"
    ],
    decision_rule: "No support or destruction decision is admissible until thresholds, dataset, rival parameters, alpha, and exclusions are frozen before execution.",
    artifact_hashes: {
      trace_bundle_sha256: sha256(traceBundle),
      metrics_sha256: sha256(metrics)
    }
  };
}

function run() {
  const record = buildRehearsalRecord();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(record, null, 2)}\n`, "utf8");

  console.log("====================================================");
  console.log("QICN PRED-EXT-01 Rehearsal Runner");
  console.log("====================================================");
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}`);
  console.log(`Status: ${record.status}`);
  console.log(`Verdict: ${record.verdict}`);
  console.log("Boundary: rehearsal only; no empirical support or external validation.");
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[FATAL] PRED-EXT-01 rehearsal failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { buildRehearsalRecord, totalVariation };
