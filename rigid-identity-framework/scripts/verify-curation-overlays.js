const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const THEOREMS_JSONL_PATH = path.join(ROOT, "registry", "theorems.jsonl");
const OVERLAY_PATHS = [
  path.join(ROOT, "docs", "reports", "I_INT_CURATION_OVERLAY_v1.json")
];

function readJsonl(filePath) {
  return fs.readFileSync(filePath, "utf8")
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function validateOverlay(overlayPath, entryMap) {
  const errors = [];
  if (!fs.existsSync(overlayPath)) {
    return [`Missing overlay file: ${path.relative(ROOT, overlayPath)}`];
  }

  const overlay = JSON.parse(fs.readFileSync(overlayPath, "utf8"));
  if (!Array.isArray(overlay.overlays) || overlay.overlays.length === 0) {
    errors.push(`${path.relative(ROOT, overlayPath)}: overlays must be a non-empty array.`);
    return errors;
  }

  overlay.overlays.forEach((item, index) => {
    const base = `${path.relative(ROOT, overlayPath)}.overlays[${index}]`;
    if (!item.target_id || !entryMap.has(item.target_id)) {
      errors.push(`${base}.target_id: missing from registry/theorems.jsonl (${item.target_id || "empty"}).`);
      return;
    }

    const registryEntry = entryMap.get(item.target_id);
    if (item.current_registry_epistemic_status !== registryEntry.epistemic_status) {
      errors.push(`${base}.current_registry_epistemic_status: expected ${registryEntry.epistemic_status}, got ${item.current_registry_epistemic_status}.`);
    }
    if (!item.recommended_epistemic_status || item.recommended_epistemic_status === registryEntry.epistemic_status) {
      errors.push(`${base}.recommended_epistemic_status: must be present and differ from current status.`);
    }
    if (!Array.isArray(item.required_for_reupgrade) || item.required_for_reupgrade.length === 0) {
      errors.push(`${base}.required_for_reupgrade: must list concrete re-upgrade requirements.`);
    }
    if (!Array.isArray(item.blocked_actions) || item.blocked_actions.length === 0) {
      errors.push(`${base}.blocked_actions: must list blocked inflation actions.`);
    }
  });

  return errors;
}

function run() {
  const entries = readJsonl(THEOREMS_JSONL_PATH);
  const entryMap = new Map(entries.map((entry) => [entry.id, entry]));
  const errors = OVERLAY_PATHS.flatMap((overlayPath) => validateOverlay(overlayPath, entryMap));

  console.log("====================================================");
  console.log("QICN Registry Curation Overlay Gate");
  console.log("====================================================");

  if (errors.length > 0) {
    console.error(`[FAIL] ${errors.length} overlay error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log(`[PASS] Validated ${OVERLAY_PATHS.length} curation overlay file(s).`);
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[FATAL] Curation overlay validation failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { run };
