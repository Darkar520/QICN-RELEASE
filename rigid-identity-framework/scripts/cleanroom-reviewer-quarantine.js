const fs = require("fs");
const path = require("path");
const { validateGeneratorDeterminism } = require("./lib/external-trace-generator");
const { sha256 } = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-EXT-01_freeze_v3.json");
const RECORD_PATH = path.join(ROOT, "docs", "reports", "PRED_EXT_01_CLEANROOM_DECISION_RECORD.json");

function fail(reason) {
  return { status: "quarantine", reason };
}

function review() {
  if (!fs.existsSync(RECORD_PATH)) return fail("Decision record is missing.");
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const record = JSON.parse(fs.readFileSync(RECORD_PATH, "utf8"));
  if (record.artifact_hashes.freeze_sha256 !== sha256(freeze)) return fail("Freeze hash mismatch.");
  const seeds = record.seeds || [record.seed].filter(Boolean);
  if (seeds.length < 2) return fail("Primary and holdout seeds were not both recorded.");
  for (const seed of seeds) {
    if (!freeze.required_seeds.includes(seed)) return fail(`Record seed was not declared in freeze: ${seed}`);
    for (const scenario of freeze.scenario_manifest) {
      if (!validateGeneratorDeterminism(seed, freeze.trace_length, freeze.state_alphabet, scenario)) {
        return fail(`Trace generator is not deterministic for declared seed/scenario: ${seed}/${scenario.id}`);
      }
    }
  }
  const source = fs.readFileSync(path.join(ROOT, "scripts", "lib", "external-trace-generator.js"), "utf8");
  const leakedScenarioIds = freeze.scenario_manifest
    .map((scenario) => scenario.id)
    .filter((id) => source.includes(id));
  if (leakedScenarioIds.length > 0) {
    return fail(`Generator source contains scenario-specific id(s): ${leakedScenarioIds.join(", ")}`);
  }
  if (!record.control_summary || record.control_summary.controls_total < 4) {
    return fail("Fewer than four negative controls were evaluated.");
  }
  const seedResults = record.seed_results || {};
  for (const [seed, result] of Object.entries(seedResults)) {
    if (!result.control_summary || result.control_summary.controls_total < 4) {
      return fail(`Seed ${seed} evaluated fewer than four negative controls.`);
    }
    if (result.control_summary.destruction_risk) {
      return fail(`At least one negative control satisfied the support rule for seed ${seed}.`);
    }
  }
  if (!String(record.boundary || "").includes("not external adjudication")) {
    return fail("Boundary does not block external-adjudication overclaim.");
  }
  return {
    status: "review_pass",
    freeze_sha256: record.artifact_hashes.freeze_sha256,
    controls_total: record.control_summary.controls_total,
    controls_passed: record.control_summary.controls_passed,
    seeds_reviewed: seeds
  };
}

if (require.main === module) {
  const result = review();
  console.log(JSON.stringify(result, null, 2));
  if (result.status !== "review_pass") process.exit(1);
}

module.exports = { review };
