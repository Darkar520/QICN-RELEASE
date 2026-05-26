const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-EXT-01_freeze_v3.json");
const GENERATOR_PATH = path.join(ROOT, "scripts", "lib", "external-trace-generator.js");

function audit() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const source = fs.readFileSync(GENERATOR_PATH, "utf8");
  const scenarioIds = freeze.scenario_manifest.map((scenario) => scenario.id);
  const leakedScenarioIds = scenarioIds.filter((id) => source.includes(id));
  const roleModelFailures = freeze.scenario_manifest.filter((scenario) => {
    const roleModels = scenario.role_models || {};
    return !["baseline", "targeted_post", "sham_post", "off_target_post"].every((role) => roleModels[role]?.weights);
  });
  const result = {
    status:
      leakedScenarioIds.length === 0 && roleModelFailures.length === 0
        ? "generator_independence_pass"
        : "generator_independence_fail",
    freeze: path.relative(ROOT, FREEZE_PATH),
    generator: path.relative(ROOT, GENERATOR_PATH),
    checked_scenario_ids: scenarioIds.length,
    leaked_scenario_ids: leakedScenarioIds,
    missing_role_models: roleModelFailures.map((scenario) => scenario.id),
    boundary:
      "This audit checks code-level scenario-label separation only. It does not prove epistemic blinding or empirical independence."
  };
  return result;
}

if (require.main === module) {
  const result = audit();
  console.log(JSON.stringify(result, null, 2));
  if (result.status !== "generator_independence_pass") process.exit(1);
}

module.exports = { audit };
