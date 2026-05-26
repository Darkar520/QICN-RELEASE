#!/usr/bin/env node

const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const THEOREMS_JSONL_PATH = path.join(ROOT, "registry", "theorems.jsonl");
const MACROS_JSONL_PATH = path.join(ROOT, "registry", "macros.jsonl");
const EXTRACTOR_AUDIT_PATH = path.join(ROOT, "docs", "reports", "EXTRACTOR_REPRODUCIBILITY_AUDIT.md");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "EXTRACTOR_REPRODUCIBILITY_DIAGNOSTIC.md");
const BACKUP_REF = "codex-backup-pre-cleanup-20260523-framework";

function readJsonl(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, "utf8").trim();
  if (!text) return [];
  return text.split(/\r?\n/).map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      throw new Error(`${path.relative(ROOT, filePath)}:${index + 1}: ${error.message}`);
    }
  });
}

function parseExtractorAudit() {
  if (!fs.existsSync(EXTRACTOR_AUDIT_PATH)) {
    return null;
  }
  const text = fs.readFileSync(EXTRACTOR_AUDIT_PATH, "utf8");
  const fields = {};
  ["formal_registry", "formal_extracted", "macro_registry", "macro_extracted"].forEach((key) => {
    const match = text.match(new RegExp(`${key}=([0-9]+)`));
    if (match) fields[key] = Number(match[1]);
  });
  const formalRow = text.match(/\|\s*Formal registry entries\s*\|\s*([0-9]+)\s*\|\s*([0-9]+)\s*\|\s*([0-9]+)\s*\|/);
  if (formalRow) {
    fields.formal_registry = Number(formalRow[1]);
    fields.formal_extracted = Number(formalRow[2]);
  }
  const macroRow = text.match(/\|\s*Macro registry entries\s*\|\s*([0-9]+)\s*\|\s*([0-9]+)\s*\|\s*([0-9]+)\s*\|/);
  if (macroRow) {
    fields.macro_registry = Number(macroRow[1]);
    fields.macro_extracted = Number(macroRow[2]);
  }
  if (Object.keys(fields).length !== 4) {
    return null;
  }
  return fields;
}

function getGitRoot() {
  try {
    return childProcess.execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch (_error) {
    return null;
  }
}

function gitPathExists(gitRoot, ref, absolutePath) {
  if (!gitRoot) return false;
  const relative = path.relative(gitRoot, absolutePath).replace(/\\/g, "/");
  try {
    childProcess.execFileSync("git", ["cat-file", "-e", `${ref}:${relative}`], {
      cwd: gitRoot,
      stdio: "ignore"
    });
    return true;
  } catch (_error) {
    return false;
  }
}

function collectMissingSourceStats(entries, kind) {
  const byFile = new Map();
  entries.forEach((entry) => {
    const relativeFile = entry.location && entry.location.file;
    if (!relativeFile) return;
    const fullPath = path.join(ROOT, relativeFile);
    if (!fs.existsSync(fullPath)) {
      if (!byFile.has(relativeFile)) {
        byFile.set(relativeFile, { file: relativeFile, formal: 0, macros: 0 });
      }
      byFile.get(relativeFile)[kind] += 1;
    }
  });
  return byFile;
}

function mergeStats(left, right) {
  const merged = new Map();
  [left, right].forEach((source) => {
    source.forEach((value, key) => {
      if (!merged.has(key)) {
        merged.set(key, { file: key, formal: 0, macros: 0 });
      }
      merged.get(key).formal += value.formal || 0;
      merged.get(key).macros += value.macros || 0;
    });
  });
  return Array.from(merged.values()).sort((a, b) => a.file.localeCompare(b.file));
}

function runDiagnostic() {
  const theorems = readJsonl(THEOREMS_JSONL_PATH);
  const macros = readJsonl(MACROS_JSONL_PATH);
  const extractorAudit = parseExtractorAudit();
  const gitRoot = getGitRoot();

  const missingFormal = collectMissingSourceStats(theorems, "formal");
  const missingMacros = collectMissingSourceStats(macros, "macros");
  const missingRows = mergeStats(missingFormal, missingMacros);

  const missingFormalTotal = missingRows.reduce((sum, row) => sum + row.formal, 0);
  const missingMacroTotal = missingRows.reduce((sum, row) => sum + row.macros, 0);

  const formalDelta = extractorAudit ? extractorAudit.formal_registry - extractorAudit.formal_extracted : null;
  const macroDelta = extractorAudit ? extractorAudit.macro_registry - extractorAudit.macro_extracted : null;
  const residualFormal = formalDelta === null ? null : formalDelta - missingFormalTotal;
  const residualMacros = macroDelta === null ? null : macroDelta - missingMacroTotal;

  const lines = [
    "# Extractor Reproducibility Diagnostic",
    "",
    "Status: ACTIVE_DIAGNOSTIC_COMPLETED",
    "Date: 2026-05-26",
    "",
    "## Boundary",
    "",
    "This diagnostic explains registry reproducibility drift. It does not edit",
    "`registry/theorems.jsonl`, does not edit `registry/macros.jsonl`, does not",
    "certify theorem truth, and does not validate consciousness, phenomenality,",
    "identity transfer, agency, moral status, or external adjudication.",
    "",
    "## Delta Accounting",
    "",
    "| Quantity | Count |",
    "|---|---:|",
    `| Registry formal entries | ${theorems.length} |`,
    `| Registry macro entries | ${macros.length} |`,
    `| Formal entries whose source file is missing | ${missingFormalTotal} |`,
    `| Macro entries whose source file is missing | ${missingMacroTotal} |`
  ];

  if (extractorAudit) {
    lines.push(
      `| Fresh-extraction formal delta | ${formalDelta} |`,
      `| Fresh-extraction macro delta | ${macroDelta} |`,
      `| Residual formal delta not explained by missing source files | ${residualFormal} |`,
      `| Residual macro delta not explained by missing source files | ${residualMacros} |`
    );
  } else {
    lines.push("| Fresh-extraction delta | unavailable; run `npm run audit:extractor-reproducibility` first |");
  }

  lines.push(
    "",
    "## Missing Source Inventory",
    "",
    "| Missing source file | Formal entries | Macro entries | Exists in backup ref |",
    "|---|---:|---:|---|"
  );

  missingRows.forEach((row) => {
    const existsInBackup = gitPathExists(gitRoot, BACKUP_REF, path.join(ROOT, row.file));
    lines.push(`| \`${row.file}\` | ${row.formal} | ${row.macros} | ${existsInBackup ? "yes" : "not_verified"} |`);
  });

  const isResolved =
    extractorAudit &&
    missingFormalTotal === 0 &&
    missingMacroTotal === 0 &&
    formalDelta === 0 &&
    macroDelta === 0 &&
    residualFormal === 0 &&
    residualMacros === 0;

  lines.push("", "## Interpretation", "");

  if (isResolved) {
    lines.push(
      "The active checkout has no missing-source delta and no residual extractor",
      "delta. The current FCR registry is reproducible from the primary `.tex`",
      "files present in this tree.",
      "",
      "This closes the infrastructure mismatch identified by the v14-final-prep",
      "audits, but it does not certify theorem truth, external adjudication,",
      "monolithic LaTeX compilation, or human mathematical curation. It only",
      "establishes that the current registry is synchronized with the current",
      "source corpus under the current extractor.",
      "",
      "## Required v14 Action",
      "",
      "1. Keep `npm run audit:extractor-reproducibility` in the release gate.",
      "2. Do not treat registry reproducibility as proof correctness.",
      "3. Track restored or retired sources through explicit decision records.",
      "4. Keep macro-collision and monolithic-compile risk separate from extractor",
      "   reproducibility."
    );
  } else {
    lines.push(
      "The missing-source files explain a large part of the extractor mismatch, but",
      "they do not explain the entire mismatch when compared with the latest",
      "`audit:extractor-reproducibility` counts. The residual delta must remain an",
      "open infrastructure burden until it is traced to extractor behavior, source",
      "changes, intentionally curated registry entries, or another documented cause.",
      "",
      "## Required v14 Action",
      "",
      "1. Restore or formally retire each missing source file.",
      "2. Re-run `npm run audit:extractor-reproducibility`.",
      "3. Re-run this diagnostic.",
      "4. Treat the extractor as authoritative only when both missing-source and",
      "   residual deltas are zero, or every residual entry has a curated reason."
    );
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, `${lines.join("\n")}\n`, "utf8");

  console.log("====================================================");
  console.log("QICN Extractor Reproducibility Diagnostic");
  console.log("====================================================");
  console.log(`Missing-source formal entries: ${missingFormalTotal}`);
  console.log(`Missing-source macro entries: ${missingMacroTotal}`);
  if (extractorAudit) {
    console.log(`Residual formal delta: ${residualFormal}`);
    console.log(`Residual macro delta: ${residualMacros}`);
  }
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
}

if (require.main === module) {
  try {
    runDiagnostic();
  } catch (error) {
    console.error(`[FATAL] Registry reproducibility diagnostic failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { runDiagnostic };
