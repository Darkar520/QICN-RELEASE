const fs = require("fs");
const path = require("path");
const { generateTracePanel } = require("./lib/external-trace-generator");
const {
  evaluateScenario,
  sha256,
  summarizeControls,
  writeJson
} = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-EXT-01_freeze_v2.json");
const OUTPUT_DIR = path.join(ROOT, "artifacts", "pred-ext-01", "v2_cleanroom_synthetic_001");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "decision_record.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_EXT_01_CLEANROOM_DECISION_RECORD.json");
const SEED = "cleanroom_seed_001";

function buildCleanRoomRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  if (!freeze.required_seeds.includes(SEED)) {
    throw new Error(`Seed ${SEED} is not declared in freeze.required_seeds.`);
  }

  const tracePanel = {};
  freeze.scenario_manifest.forEach((scenario) => {
    tracePanel[scenario.id] = generateTracePanel({
      seed: SEED,
      traceLength: freeze.trace_length,
      stateAlphabet: freeze.state_alphabet,
      scenarioSpec: { kind: scenario.id }
    });
  });

  const scenarioResults = Object.fromEntries(
    Object.entries(tracePanel).map(([name, traces]) => [name, evaluateScenario(name, traces, freeze)])
  );
  const controlSummary = summarizeControls(scenarioResults, "qicn_seeded_positive");
  const positive = scenarioResults.qicn_seeded_positive;
  const overallVerdict =
    positive.support_rule_satisfied && !controlSummary.destruction_risk
      ? "clean_room_synthetic_support_with_negative_controls_passed"
      : controlSummary.destruction_risk
        ? "destruction_candidate_negative_control_passed_support_rule"
        : "clean_room_synthetic_no_support";

  const traceBundle = {
    freeze_id: freeze.freeze_id,
    seed: SEED,
    state_alphabet: freeze.state_alphabet,
    trace_length: freeze.trace_length,
    scenario_manifest: freeze.scenario_manifest,
    trace_panel: tracePanel
  };

  return {
    schema_version: "1.0.0",
    prediction_id: "PRED-EXT-01",
    run_id: "pred-ext-01-v2-cleanroom-synthetic-001",
    date_executed: "2026-05-26",
    execution_class: "clean_room_synthetic_execution",
    status: "executed_clean_room_synthetic",
    verdict: overallVerdict,
    boundary: "This is a clean-room synthetic execution using a seeded trace generator separated from the evaluator. It is not empirical support, not external adjudication, not validation of consciousness, phenomenality, identity transfer, agency, moral status, or the full QICN framework.",
    reviewer_blinding: {
      scenario_labels_declared_in_freeze: true,
      evaluator_uses_freeze_only: true,
      seed_declared_before_execution: true
    },
    freeze,
    seed: SEED,
    scenario_results: scenarioResults,
    control_summary: controlSummary,
    quarantine_required: controlSummary.destruction_risk,
    artifact_hashes: {
      freeze_sha256: sha256(freeze),
      trace_bundle_sha256: sha256(traceBundle),
      scenario_results_sha256: sha256(scenarioResults)
    }
  };
}

function run() {
  const record = buildCleanRoomRecord();
  writeJson(OUTPUT_PATH, record);
  writeJson(REPORT_PATH, record);
  console.log("====================================================");
  console.log("QICN PRED-EXT-01 Clean-Room Synthetic Runner");
  console.log("====================================================");
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(`Status: ${record.status}`);
  console.log(`Verdict: ${record.verdict}`);
  console.log(`Controls: ${record.control_summary.controls_passed}/${record.control_summary.controls_total} passed`);
  console.log("Boundary: clean-room synthetic execution only; no empirical support or external adjudication.");
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[FATAL] PRED-EXT-01 clean-room synthetic run failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { buildCleanRoomRecord };
