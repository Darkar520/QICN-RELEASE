const fs = require("fs");
const path = require("path");
const {
  evaluateScenario,
  repeatPattern,
  sha256,
  summarizeControls,
  writeJson
} = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-EXT-01_freeze_v1.json");
const OUTPUT_DIR = path.join(ROOT, "artifacts", "pred-ext-01", "v1_internal_pilot_001");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "decision_record.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_EXT_01_INTERNAL_PILOT_DECISION_RECORD.json");

function mutateEvery(trace, replacementPattern, every) {
  return trace.map((state, index) => (index % every === 0 ? replacementPattern[index % replacementPattern.length] : state));
}

function buildTracePanel(length) {
  const baseline = repeatPattern(["A", "B", "A", "C", "A", "B", "D", "B"], length);
  const nonselectiveDrift = repeatPattern(["A", "C", "B", "C", "A", "D", "D", "B"], length);
  const highOrderBaseline = repeatPattern(["A", "B", "C", "B", "A", "D", "C", "D"], length);
  const highOrderDrift = repeatPattern(["A", "D", "C", "D", "A", "B", "C", "B"], length);
  const narrativeBaseline = repeatPattern(["A", "B", "A", "C"], length);
  const rewardBaseline = repeatPattern(["A", "D", "A", "B", "A", "C"], length);

  return {
    qicn_synthetic_positive: {
      baseline,
      targeted_post: repeatPattern(["A", "C", "C", "B", "C", "D", "C", "B"], length),
      sham_post: baseline,
      off_target_post: repeatPattern(["A", "B", "A", "C", "A", "D", "D", "B"], length)
    },
    memory_perturbed_negative_control: {
      baseline,
      targeted_post: nonselectiveDrift,
      sham_post: nonselectiveDrift,
      off_target_post: nonselectiveDrift
    },
    stochastic_noise_negative_control: {
      baseline,
      targeted_post: mutateEvery(baseline, ["B", "C", "D"], 5),
      sham_post: mutateEvery(baseline, ["B", "C", "D"], 5),
      off_target_post: mutateEvery(baseline, ["B", "C", "D"], 5)
    },
    high_order_markov_drift_negative_control: {
      baseline: highOrderBaseline,
      targeted_post: highOrderDrift,
      sham_post: highOrderDrift,
      off_target_post: highOrderDrift
    },
    complexity_only_negative_control: {
      baseline: repeatPattern(["A", "B", "C", "D"], length),
      targeted_post: repeatPattern(["D", "C", "B", "A"], length),
      sham_post: repeatPattern(["D", "C", "B", "A"], length),
      off_target_post: repeatPattern(["D", "C", "B", "A"], length)
    },
    narrative_only_negative_control: {
      baseline: narrativeBaseline,
      targeted_post: narrativeBaseline,
      sham_post: narrativeBaseline,
      off_target_post: narrativeBaseline
    },
    reward_bookkeeping_negative_control: {
      baseline: rewardBaseline,
      targeted_post: rewardBaseline,
      sham_post: rewardBaseline,
      off_target_post: rewardBaseline
    }
  };
}

function buildPilotRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const tracePanel = buildTracePanel(freeze.trace_length);
  const scenarioResults = Object.fromEntries(
    Object.entries(tracePanel).map(([name, traces]) => [name, evaluateScenario(name, traces, freeze)])
  );

  const positive = scenarioResults.qicn_synthetic_positive;
  const controlSummary = summarizeControls(scenarioResults, "qicn_synthetic_positive");
  let overallVerdict = "internal_synthetic_inconclusive";
  if (positive.support_rule_satisfied && !controlSummary.destruction_risk) {
    overallVerdict = "internal_synthetic_support_with_negative_controls_passed";
  } else if (!positive.support_rule_satisfied) {
    overallVerdict = "internal_synthetic_no_support";
  } else if (controlSummary.destruction_risk) {
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
    schema_version: "2.0.0",
    prediction_id: "PRED-EXT-01",
    run_id: "pred-ext-01-v1-internal-pilot-002",
    date_executed: "2026-05-26",
    execution_class: "internal_synthetic_pilot",
    status: "executed_internal_synthetic_pilot",
    verdict: overallVerdict,
    boundary: "This is an internal synthetic pilot only. It is not empirical support, not external adjudication, not validation of consciousness, phenomenality, identity transfer, agency, moral status, or the full QICN framework.",
    freeze,
    scenario_results: scenarioResults,
    control_summary: controlSummary,
    claim_ledger_update_required:
      overallVerdict === "internal_synthetic_support_with_negative_controls_passed"
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
  writeJson(OUTPUT_PATH, record);
  writeJson(REPORT_PATH, record);

  console.log("====================================================");
  console.log("QICN PRED-EXT-01 Internal Synthetic Pilot");
  console.log("====================================================");
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(`Status: ${record.status}`);
  console.log(`Verdict: ${record.verdict}`);
  console.log(`Controls: ${record.control_summary.controls_passed}/${record.control_summary.controls_total} passed`);
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

module.exports = { buildPilotRecord, buildTracePanel };
