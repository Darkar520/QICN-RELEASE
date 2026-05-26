const fs = require("fs");
const path = require("path");
const { sha256, writeJson } = require("./lib/pred-ext-01-evaluator");
const {
  classLabel,
  invariantVector,
  maxAbsDelta,
  perturbVector,
  rmsDelta
} = require("./lib/synthetic-prediction-simulators");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-04c_freeze_v3.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_04C_INTERNAL_EXECUTION_DECISION_RECORD.json");

function scoreScenario(scenario, freeze) {
  const latent = invariantVector(`${freeze.seed}:${scenario.id}:latent`);
  const profinite = perturbVector(latent, `${freeze.seed}:${scenario.id}:profinite`, scenario.left_noise);
  const sft = perturbVector(latent, `${freeze.seed}:${scenario.id}:sft`, scenario.right_noise);
  const equivDistance = rmsDelta(profinite, sft);
  const invariantDelta = maxAbsDelta(profinite, sft);
  const leftLabel = classLabel(profinite);
  const rightLabel = scenario.force_class_disagreement ? `${leftLabel}_forced_rival` : classLabel(sft);
  const classAgreement = leftLabel === rightLabel;
  const support = equivDistance < freeze.eps_equiv && invariantDelta < freeze.eps_invariant && classAgreement;
  const destruction = !classAgreement && equivDistance < freeze.eps_equiv && invariantDelta < freeze.eps_invariant;
  return {
    scenario: scenario.id,
    equiv_distance: equivDistance,
    invariant_delta: invariantDelta,
    class_agreement: classAgreement,
    class_labels: { profinite: leftLabel, sft: rightLabel },
    substrate_label_rival_prediction: "divergence_by_substrate_label",
    verdict: support ? "support_rule_satisfied" : destruction ? "destruction_candidate" : "no_support",
    support_rule_satisfied: support,
    invariant_vectors: { profinite, sft }
  };
}

function buildRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const scenarioResults = Object.fromEntries(
    freeze.scenario_manifest.map((scenario) => [scenario.id, scoreScenario(scenario, freeze)])
  );
  const positive = scenarioResults.cross_substrate_positive;
  const controls = Object.entries(scenarioResults).filter(([id]) => id !== "cross_substrate_positive");
  const controlsPassed = controls.filter(([, result]) => !result.support_rule_satisfied).length;
  const verdict =
    positive.support_rule_satisfied && controlsPassed === controls.length
      ? "internal_synthetic_support_with_negative_controls_passed"
      : positive.support_rule_satisfied
        ? "internal_synthetic_support_with_control_warning"
        : positive.verdict;
  return {
    schema_version: "1.0.0",
    prediction_id: "PRED-04c",
    run_id: "pred-04c-v3-internal-execution-001",
    date_executed: "2026-05-26",
    execution_class: "internal_synthetic_execution",
    status: "executed_internal_synthetic",
    verdict,
    boundary: "Internal synthetic cross-substrate execution only; no empirical support or external adjudication.",
    freeze,
    result: positive,
    scenario_results: scenarioResults,
    control_summary: {
      positive_scenario: "cross_substrate_positive",
      controls_total: controls.length,
      controls_passed: controlsPassed,
      controls_failed: controls.length - controlsPassed,
      destruction_risk: controlsPassed !== controls.length
    },
    artifact_hashes: {
      freeze_sha256: sha256(freeze),
      result_sha256: sha256(scenarioResults)
    }
  };
}

if (require.main === module) {
  const record = buildRecord();
  writeJson(REPORT_PATH, record);
  console.log(`PRED-04c status=${record.status}`);
  console.log(`PRED-04c verdict=${record.verdict}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
}

module.exports = { buildRecord, scoreScenario };
