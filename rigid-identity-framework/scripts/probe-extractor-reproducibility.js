#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  ensureDir,
  extractFormalEnvironments,
  extractMacroDefinitions,
  readJsonl,
} = require("./registry-lib");

function countBy(records, field) {
  const counts = new Map();
  for (const record of records) {
    const key = record[field] || "unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

function registryPathSet(records) {
  return new Set(records.map((record) => (record.location?.file || "").replace(/\\/g, "/")).filter(Boolean));
}

function mdTable(rows, headers) {
  const lines = [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
  ];
  for (const row of rows) {
    lines.push(`| ${row.map((value) => String(value).replace(/\|/g, "\\|")).join(" | ")} |`);
  }
  return lines.join("\n");
}

function main() {
  const root = path.resolve(__dirname, "..");
  const reportPath = path.join(root, "docs", "reports", "EXTRACTOR_REPRODUCIBILITY_AUDIT.md");
  const theoremRegistry = readJsonl(path.join(root, "registry", "theorems.jsonl")).records;
  const macroRegistry = readJsonl(path.join(root, "registry", "macros.jsonl")).records;
  const extractedFormal = extractFormalEnvironments(root);
  const extractedMacros = extractMacroDefinitions(root);

  const registryFormalPaths = registryPathSet(theoremRegistry);
  const registryMacroPaths = registryPathSet(macroRegistry);
  const filesystemMissingPaths = Array.from(new Set([...registryFormalPaths, ...registryMacroPaths]))
    .filter((relative) => !fs.existsSync(path.join(root, relative)))
    .sort();

  const status =
    theoremRegistry.length === extractedFormal.length && macroRegistry.length === extractedMacros.length
      ? "REPRODUCIBLE"
      : "NOT_REPRODUCIBLE_FROM_CURRENT_PRIMARY_TEX_SET";

  const summaryRows = [
    ["Formal registry entries", theoremRegistry.length, extractedFormal.length, theoremRegistry.length - extractedFormal.length],
    ["Macro registry entries", macroRegistry.length, extractedMacros.length, macroRegistry.length - extractedMacros.length],
  ];
  const ownerRows = [];
  const owners = new Set([
    ...countBy(macroRegistry, "owner").map(([owner]) => owner),
    ...countBy(extractedMacros, "owner").map(([owner]) => owner),
  ]);
  const registryMacroOwnerCounts = new Map(countBy(macroRegistry, "owner"));
  const extractedMacroOwnerCounts = new Map(countBy(extractedMacros, "owner"));
  for (const owner of Array.from(owners).sort()) {
    ownerRows.push([
      owner,
      registryMacroOwnerCounts.get(owner) || 0,
      extractedMacroOwnerCounts.get(owner) || 0,
      (registryMacroOwnerCounts.get(owner) || 0) - (extractedMacroOwnerCounts.get(owner) || 0),
    ]);
  }

  const lines = [
    "# Extractor Reproducibility Audit v1",
    "",
    `Status: ${status}`,
    "",
    "## Boundary",
    "",
    "This audit checks whether the current global extractor can reproduce the committed FCR registries from the primary `.tex` files currently present in this checkout. It does not certify theorem truth, empirical validation, consciousness, phenomenality, or monolithic LaTeX compilation.",
    "",
    "## Command",
    "",
    "```powershell",
    "npm run audit:extractor-reproducibility",
    "```",
    "",
    "## Count Comparison",
    "",
    mdTable(summaryRows, ["Surface", "Committed registry", "Fresh global extraction", "Registry minus extraction"]),
    "",
    "## Macro Owner Comparison",
    "",
    mdTable(ownerRows, ["Owner", "Committed macros", "Fresh extracted macros", "Delta"]),
    "",
    "## Registry Paths Missing From Current Checkout",
    "",
  ];

  if (filesystemMissingPaths.length === 0) {
    lines.push("None.");
  } else {
    for (const relative of filesystemMissingPaths) lines.push(`- ${relative}`);
  }

  lines.push(
    "",
    "## Interpretation",
    "",
    status === "REPRODUCIBLE"
      ? "The current extractor reproduces the committed registry counts from present primary sources."
      : "The current extractor is not a safe whole-registry regeneration gate in this checkout. Source-scoped derived-artifact resync is allowed only when the changed primary files are present, the intended diff is explicit, and corpus/macro gates remain clean afterward.",
    "",
  );

  ensureDir(path.dirname(reportPath));
  fs.writeFileSync(reportPath, `${lines.join("\n").trim()}\n`, "utf8");
  console.log(`Wrote ${path.relative(root, reportPath).replace(/\\/g, "/")}`);
  console.log(`status=${status}`);
  console.log(`formal_registry=${theoremRegistry.length}`);
  console.log(`formal_extracted=${extractedFormal.length}`);
  console.log(`macro_registry=${macroRegistry.length}`);
  console.log(`macro_extracted=${extractedMacros.length}`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`Extractor reproducibility audit failed: ${error.message}`);
    process.exit(1);
  }
}
