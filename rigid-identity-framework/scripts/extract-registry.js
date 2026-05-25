#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  extractFormalEnvironments,
  extractMacroDefinitions,
  readJsonl,
  writeJsonl,
} = require("./registry-lib");

function parseArgs(argv) {
  const args = {
    includeLegacy: false,
    theoremOutput: "registry/theorems.jsonl",
    macroOutput: "registry/macros.jsonl",
    compare: null,
    version: new Date().toISOString().slice(0, 10),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--include-legacy") args.includeLegacy = true;
    if (arg === "--theorems") args.theoremOutput = argv[++index];
    if (arg === "--macros") args.macroOutput = argv[++index];
    if (arg === "--compare") args.compare = argv[++index];
    if (arg === "--version") args.version = argv[++index];
  }
  return args;
}

function computeDelta(oldRecords, newRecords) {
  const oldById = new Map(oldRecords.map((record) => [record.id, record]));
  const newById = new Map(newRecords.map((record) => [record.id, record]));
  const added = [];
  const removed = [];
  const changed = [];
  const significantFields = [
    "type",
    "epistemic_status",
    "proof_status",
    "label",
    "statement_tex",
    "depends_on",
    "counterexample",
  ];

  for (const [id, record] of newById.entries()) {
    if (!oldById.has(id)) {
      added.push(id);
      continue;
    }
    const oldRecord = oldById.get(id);
    const changedFields = significantFields.filter(
      (field) => JSON.stringify(oldRecord[field]) !== JSON.stringify(record[field])
    );
    if (changedFields.length > 0) {
      changed.push({ id, fields: changedFields });
    }
  }

  for (const id of oldById.keys()) {
    if (!newById.has(id)) removed.push(id);
  }

  return {
    added: added.sort(),
    removed: removed.sort(),
    changed: changed.sort((a, b) => a.id.localeCompare(b.id)),
  };
}

function main() {
  const frameworkRoot = path.resolve(__dirname, "..");
  const args = parseArgs(process.argv.slice(2));
  const theoremPath = path.resolve(frameworkRoot, args.theoremOutput);
  const macroPath = path.resolve(frameworkRoot, args.macroOutput);
  const comparePath = args.compare ? path.resolve(frameworkRoot, args.compare) : null;
  const oldCompareRecords = comparePath && fs.existsSync(comparePath)
    ? readJsonl(comparePath).records
    : null;

  const entries = extractFormalEnvironments(frameworkRoot, {
    includeLegacy: args.includeLegacy,
  });
  const macros = extractMacroDefinitions(frameworkRoot, {
    includeLegacy: args.includeLegacy,
  });

  for (const entry of entries) {
    entry.registry_version = args.version;
  }
  for (const macro of macros) {
    macro.registry_version = args.version;
  }

  writeJsonl(theoremPath, entries);
  writeJsonl(macroPath, macros);

  console.log(
    [
      "FCR extraction complete.",
      `version=${args.version}`,
      `formal_entries=${entries.length}`,
      `macro_entries=${macros.length}`,
      `theorems=${theoremPath}`,
      `macros=${macroPath}`,
      "mode=overwrite",
      "note=This is a structural draft. Epistemic statuses come from environment type plus AUDIT_MASTER_v5 overlays; human mathematical curation is still required.",
    ].join("\n")
  );

  if (comparePath) {
    if (!oldCompareRecords) {
      console.log(`\nCompare target missing before extraction: ${comparePath}`);
      return;
    }
    const delta = computeDelta(oldCompareRecords, entries);
    const deltaPath = comparePath.replace(/\.jsonl$/i, ".delta.json");
    fs.writeFileSync(deltaPath, JSON.stringify(delta, null, 2), "utf8");
    console.log(`\nDelta report: ${deltaPath}`);
    console.log(`  Added: ${delta.added.length}`);
    console.log(`  Removed: ${delta.removed.length}`);
    console.log(`  Changed: ${delta.changed.length}`);
    if (delta.removed.length > 0) {
      console.log("  WARNING: Entries were removed. Review before treating as canonical.");
    }
  }
}

if (require.main === module) {
  main();
}
