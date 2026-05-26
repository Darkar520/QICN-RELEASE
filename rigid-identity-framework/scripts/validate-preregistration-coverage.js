const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REGISTRY_PATH = path.join(ROOT, "docs", "PREDICTION_REGISTRY_v1.json");
const CANON_MAP_PATH = path.join(ROOT, "registry", "prediction-canon-map.json");

function main() {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
  const canonMap = JSON.parse(fs.readFileSync(CANON_MAP_PATH, "utf8"));
  const preregById = new Map(canonMap.preregistration_files.map((entry) => [entry.prediction_id, entry]));
  const errors = [];
  registry.predictions.forEach((prediction) => {
    const prereg = preregById.get(prediction.id);
    if (!prereg) {
      errors.push(`${prediction.id}: missing preregistration map entry`);
      return;
    }
    const preregPath = path.join(ROOT, prereg.path);
    if (!fs.existsSync(preregPath)) {
      errors.push(`${prediction.id}: preregistration file not found at ${prereg.path}`);
    }
  });
  if (errors.length > 0) {
    console.error(`[FAIL] preregistration coverage has ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(`[PASS] ${registry.predictions.length}/${registry.predictions.length} predictions have preregistration coverage.`);
}

if (require.main === module) main();
