const fs = require("fs");
const path = require("path");
const { sha256, writeJson } = require("./lib/pred-ext-01-evaluator");
const {
  clamp,
  integrationCertification,
  seededNoise
} = require("./lib/synthetic-prediction-simulators");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-11_freeze_v2.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_11_INTERNAL_EXECUTION_DECISION_RECORD.json");

function buildScenarioProfile(scenario, freeze) {
  const noise = seededNoise(`${freeze.seed}:${scenario.id}`, 0.01);
  const pre = {
    integration_margin: clamp(0.76 + noise()),
    complexity_units: 120,
    activity_budget: clamp(0.81 + noise())
  };
  pre.complexity_score = 1;
  pre.certification_score = integrationCertification({
    integrationMargin: pre.integration_margin,
    complexityScore: pre.complexity_score,
    activityBudget: pre.activity_budget
  });
  const post = {
    integration_margin: clamp(pre.integration_margin - scenario.integration_drop + noise()),
    complexity_units: Math.round(pre.complexity_units * (1 + scenario.complexity_delta)),
    activity_budget: clamp(pre.activity_budget - scenario.activity_delta + noise())
  };
  post.complexity_score = clamp(1 - scenario.complexity_delta);
  post.certification_score = integrationCertification({
    integrationMargin: post.integration_margin,
    complexityScore: post.complexity_score,
    activityBudget: post.activity_budget
  });
  const integrationDrop = pre.integration_margin - post.integration_margin;
  const complexityDelta = Math.abs(pre.complexity_units - post.complexity_units) / pre.complexity_units;
  const support =
    integrationDrop >= freeze.integration_loss_boundary &&
    complexityDelta <= freeze.complexity_preservation_epsilon &&
    post.certification_score < freeze.certification_threshold;
  const destruction =
    integrationDrop >= freeze.integration_loss_boundary &&
    complexityDelta <= freeze.complexity_preservation_epsilon &&
    post.certification_score >= freeze.certification_threshold;
  const result = {
    scenario: scenario.id,
    pre,
    post,
    integration_drop: integrationDrop,
    complexity_delta: complexityDelta,
    activity_delta: Math.abs(pre.activity_budget - post.activity_budget),
    verdict: support ? "support_rule_satisfied" : destruction ? "destruction_candidate" : "weakening_or_no_support",
    support_rule_satisfied: support,
    complexity_only_rival_prediction: "certification_persists_when_complexity_is_preserved"
  };
  return result;
}

function buildRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const scenarioResults = Object.fromEntries(
    freeze.scenario_manifest.map((scenario) => [scenario.id, buildScenarioProfile(scenario, freeze)])
  );
  const result = scenarioResults.integration_loss_positive;
  const controls = Object.entries(scenarioResults).filter(([id]) => id !== "integration_loss_positive");
  const controlsPassed = controls.filter(([, entry]) => !entry.support_rule_satisfied).length;
  const verdict =
    result.support_rule_satisfied && controlsPassed === controls.length
      ? "internal_synthetic_support_with_negative_controls_passed"
      : result.support_rule_satisfied
        ? "internal_synthetic_support_with_control_warning"
        : result.verdict;
  return {
    schema_version: "1.0.0",
    prediction_id: "PRED-11",
    run_id: "pred-11-v2-internal-execution-001",
    date_executed: "2026-05-26",
    execution_class: "internal_synthetic_execution",
    status: "executed_internal_synthetic",
    verdict,
    boundary: "Internal synthetic integration-loss execution only; no empirical support or external adjudication.",
    freeze,
    result,
    scenario_results: scenarioResults,
    control_summary: {
      positive_scenario: "integration_loss_positive",
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
  console.log(`PRED-11 status=${record.status}`);
  console.log(`PRED-11 verdict=${record.verdict}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
}

module.exports = { buildRecord, buildScenarioProfile };
