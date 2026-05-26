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
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-EXT-01_freeze_v3.json");
const OUTPUT_DIR = path.join(ROOT, "artifacts", "pred-ext-01", "v3_cleanroom_synthetic_001");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "decision_record.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_EXT_01_CLEANROOM_DECISION_RECORD.json");

function evaluateSeed(freeze, seed) {
  const tracePanel = {};
  freeze.scenario_manifest.forEach((scenario) => {
    tracePanel[scenario.id] = generateTracePanel({
      seed,
      traceLength: freeze.trace_length,
      stateAlphabet: freeze.state_alphabet,
      scenarioSpec: scenario
    });
  });

  const scenarioResults = Object.fromEntries(
    Object.entries(tracePanel).map(([name, traces]) => [name, evaluateScenario(name, traces, freeze)])
  );
  const positiveScenario = freeze.scenario_manifest.find((scenario) => scenario.role === "positive")?.id;
  if (!positiveScenario) throw new Error("Freeze scenario_manifest must declare one positive scenario.");
  const controlSummary = summarizeControls(scenarioResults, positiveScenario);
  const positive = scenarioResults[positiveScenario];
  const overallVerdict =
    positive.support_rule_satisfied && !controlSummary.destruction_risk
      ? "clean_room_synthetic_support_with_negative_controls_passed"
      : controlSummary.destruction_risk
        ? "destruction_candidate_negative_control_passed_support_rule"
        : "clean_room_synthetic_no_support";

  const traceBundle = {
    freeze_id: freeze.freeze_id,
    seed,
    state_alphabet: freeze.state_alphabet,
    trace_length: freeze.trace_length,
    scenario_manifest: freeze.scenario_manifest,
    trace_panel: tracePanel
  };

  return {
    seed,
    verdict: overallVerdict,
    scenario_results: scenarioResults,
    control_summary: controlSummary,
    trace_bundle_sha256: sha256(traceBundle)
  };
}

function buildCleanRoomRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const seeds = [freeze.primary_seed, freeze.holdout_seed].filter(Boolean);
  seeds.forEach((seed) => {
    if (!freeze.required_seeds.includes(seed)) {
      throw new Error(`Seed ${seed} is not declared in freeze.required_seeds.`);
    }
  });

  const seedResults = Object.fromEntries(seeds.map((seed) => [seed, evaluateSeed(freeze, seed)]));
  const allSeedsSupport = Object.values(seedResults).every((result) =>
    result.verdict === "clean_room_synthetic_support_with_negative_controls_passed"
  );
  const anyDestructionRisk = Object.values(seedResults).some((result) => result.control_summary.destruction_risk);
  const overallVerdict = allSeedsSupport
    ? "clean_room_synthetic_support_with_holdout_controls_passed"
    : anyDestructionRisk
      ? "destruction_candidate_negative_control_passed_support_rule"
      : "clean_room_synthetic_no_support";

  return {
    schema_version: "2.0.0",
    prediction_id: "PRED-EXT-01",
    run_id: "pred-ext-01-v3-cleanroom-synthetic-001",
    date_executed: "2026-05-26",
    execution_class: "clean_room_synthetic_execution",
    status: "executed_clean_room_synthetic",
    verdict: overallVerdict,
    boundary: "This is a clean-room synthetic execution using freeze-declared scenario models interpreted by a generic seeded trace generator separated from the evaluator. It is not empirical support, not external adjudication, not validation of consciousness, phenomenality, identity transfer, agency, moral status, or the full QICN framework.",
    reviewer_blinding: {
      scenario_labels_declared_in_freeze: true,
      evaluator_uses_freeze_only: true,
      seed_declared_before_execution: true,
      holdout_seed_declared_before_execution: true,
      generator_has_no_scenario_specific_distribution_table: true
    },
    freeze,
    seeds,
    primary_seed: freeze.primary_seed,
    holdout_seed: freeze.holdout_seed,
    seed_results: seedResults,
    scenario_results: seedResults[freeze.primary_seed].scenario_results,
    control_summary: seedResults[freeze.primary_seed].control_summary,
    quarantine_required: anyDestructionRisk,
    artifact_hashes: {
      freeze_sha256: sha256(freeze),
      seed_results_sha256: sha256(seedResults),
      primary_trace_bundle_sha256: seedResults[freeze.primary_seed].trace_bundle_sha256,
      holdout_trace_bundle_sha256: seedResults[freeze.holdout_seed].trace_bundle_sha256
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
  console.log(`Primary controls: ${record.control_summary.controls_passed}/${record.control_summary.controls_total} passed`);
  console.log(`Holdout controls: ${record.seed_results[record.holdout_seed].control_summary.controls_passed}/${record.seed_results[record.holdout_seed].control_summary.controls_total} passed`);
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
