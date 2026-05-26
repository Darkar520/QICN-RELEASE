const fs = require("fs");
const path = require("path");
const { sha256, writeJson } = require("./lib/pred-ext-01-evaluator");
const {
  applyInvariantAblation,
  invariantVector,
  weightedCertification
} = require("./lib/synthetic-prediction-simulators");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-02_freeze_v2.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_02_INTERNAL_EXECUTION_DECISION_RECORD.json");

function scorePanel(panel, freeze) {
  const certificationDrop = panel.certification_pre - panel.certification_post;
  const relativeRupture =
    panel.target_invariant_drop / Math.max(panel.pre_invariant_vector[freeze.target_invariant], freeze.delta_amb);
  const support =
    panel.invariant_loss_verified &&
    certificationDrop > freeze.delta_amb &&
    panel.pre_ablation_headroom > freeze.delta_amb &&
    relativeRupture >= freeze.rho_rupture;
  const destruction = panel.invariant_loss_verified && panel.certification_post >= panel.certification_pre;
  const weakening = !support && certificationDrop > 0 && !destruction;
  return {
    ...panel,
    certification_drop: certificationDrop,
    relative_rupture: relativeRupture,
    verdict: support ? "support_rule_satisfied" : destruction ? "destruction_candidate" : weakening ? "weakening_or_boundary_ambiguous" : "no_support",
    support_rule_satisfied: support
  };
}

function buildPanelFromScenario(scenario, freeze) {
  const preVector = invariantVector(`${freeze.seed}:${scenario.id}:pre`);
  const postVector = applyInvariantAblation(
    preVector,
    freeze.target_invariant,
    scenario.ablation_severity,
    `${freeze.seed}:${scenario.id}:post`
  );
  return {
    pre_invariant_vector: preVector,
    post_invariant_vector: postVector,
    certification_pre: weightedCertification(preVector, freeze.certification_weights),
    certification_post: weightedCertification(postVector, freeze.certification_weights),
    pre_ablation_headroom: preVector[freeze.target_invariant] - freeze.delta_amb,
    target_invariant_drop: preVector[freeze.target_invariant] - postVector[freeze.target_invariant],
    invariant_loss_verified: scenario.invariant_loss_verified,
    ablation_severity: scenario.ablation_severity,
    target_invariant: freeze.target_invariant
  };
}

function buildRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const panels = Object.fromEntries(
    freeze.scenario_manifest.map((scenario) => [scenario.id, buildPanelFromScenario(scenario, freeze)])
  );
  const results = Object.fromEntries(Object.entries(panels).map(([id, panel]) => [id, scorePanel(panel, freeze)]));
  const positive = results.invariant_loss_positive;
  const controls = Object.entries(results).filter(([id]) => id !== "invariant_loss_positive");
  const controlsPassed = controls.filter(([, result]) => !result.support_rule_satisfied).length;
  const verdict =
    positive.support_rule_satisfied && controlsPassed === controls.length
      ? "internal_synthetic_support_with_negative_controls_passed"
      : positive.support_rule_satisfied
        ? "internal_synthetic_support_with_control_warning"
        : "internal_synthetic_no_support";
  return {
    schema_version: "1.0.0",
    prediction_id: "PRED-02",
    run_id: "pred-02-v1-internal-execution-001",
    date_executed: "2026-05-26",
    execution_class: "internal_synthetic_execution",
    status: "executed_internal_synthetic",
    verdict,
    boundary: "Internal synthetic invariant-ablation execution only; no empirical support or external adjudication.",
    freeze,
    panel_results: results,
    control_summary: {
      positive_scenario: "invariant_loss_positive",
      controls_total: controls.length,
      controls_passed: controlsPassed,
      controls_failed: controls.length - controlsPassed,
      destruction_risk: controlsPassed !== controls.length
    },
    artifact_hashes: {
      freeze_sha256: sha256(freeze),
      panel_results_sha256: sha256(results)
    }
  };
}

if (require.main === module) {
  const record = buildRecord();
  writeJson(REPORT_PATH, record);
  console.log(`PRED-02 status=${record.status}`);
  console.log(`PRED-02 verdict=${record.verdict}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
}

module.exports = { buildRecord, scorePanel };
