#!/usr/bin/env node
/*
 * QICN Monolithic Build Quality Gate
 *
 * This validator checks the generated monolithic LaTeX log and monolithic .tex
 * sources for regressions that should block a release-quality PDF. It is a
 * build-quality gate only: it does not certify theorem truth, empirical support,
 * consciousness, phenomenality, identity transfer, or bridge-burden closure.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MONO_DIR = path.join(ROOT, "monolithic");
const LOG_PATH = path.join(MONO_DIR, "QICN_MONOLITHIC.log");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "MONOLITHIC_BUILD_QUALITY_GATE_v20.json");

const BADNESS_MASK_PATTERNS = [
  /\\hbadness\s*=\s*10000/g,
  /\\vbadness\s*=\s*10000/g,
  /\\hfuzz\s*=\s*(?:130pt|[1-9]\d+pt)/g,
  /\\tolerance\s*=\s*4000/g
];

function walkFiles(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(fullPath, predicate, out);
    else if (predicate(fullPath)) out.push(fullPath);
  }
  return out;
}

function countLinesMatching(lines, predicate) {
  const hits = [];
  lines.forEach((line, index) => {
    if (predicate(line)) hits.push({ line: index + 1, text: line });
  });
  return hits;
}

function scanLog() {
  if (!fs.existsSync(LOG_PATH)) {
    return { missing: true, error: `Missing log file: ${path.relative(ROOT, LOG_PATH)}` };
  }
  const text = fs.readFileSync(LOG_PATH, "utf8");
  const lines = text.split(/\r?\n/);
  const pagesMatch = text.match(/Output written on .*?\((\d+) pages?,/);
  return {
    missing: false,
    line_count: lines.length,
    pages: pagesMatch ? Number(pagesMatch[1]) : null,
    latex_warnings: countLinesMatching(lines, (line) => /(?:LaTeX|Package|Class).*Warning:/.test(line)),
    overfull_hbox: countLinesMatching(lines, (line) => line.includes("Overfull \\hbox")),
    overfull_vbox: countLinesMatching(lines, (line) => line.includes("Overfull \\vbox")),
    underfull_vbox: countLinesMatching(lines, (line) => line.includes("Underfull \\vbox")),
    undefined_references: countLinesMatching(lines, (line) => /undefined references|Reference .* undefined|Citation .* undefined/i.test(line)),
    hyperref_pdfstring: countLinesMatching(lines, (line) => line.includes("Package hyperref Warning:") && line.includes("PDF string")),
    question_mark_tokens: countLinesMatching(lines, (line) => line.includes("??"))
  };
}

function scanBadnessMasking() {
  const texFiles = walkFiles(MONO_DIR, (file) => file.endsWith(".tex"));
  const hits = [];
  for (const file of texFiles) {
    const text = fs.readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (BADNESS_MASK_PATTERNS.some((pattern) => {
        pattern.lastIndex = 0;
        return pattern.test(line);
      })) {
        hits.push({ file: path.relative(ROOT, file), line: index + 1, text: line.trim() });
      }
    });
  }
  return { tex_files_scanned: texFiles.length, hits };
}

function failCount(logResult, badnessResult) {
  if (logResult.missing) return 1;
  return [
    logResult.latex_warnings,
    logResult.overfull_hbox,
    logResult.overfull_vbox,
    logResult.underfull_vbox,
    logResult.undefined_references,
    logResult.hyperref_pdfstring,
    logResult.question_mark_tokens,
    badnessResult.hits
  ].reduce((sum, list) => sum + list.length, 0);
}

function main() {
  const log = scanLog();
  const badness_masking = scanBadnessMasking();
  const failures = failCount(log, badness_masking);
  const report = {
    schema_version: "1.0.0",
    generated_at: "2026-05-26",
    gate: "qicn-monolithic-build-quality-v20",
    governance_boundary: "This is a build-quality gate only. It does not certify theorem truth, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.",
    log_path: path.relative(ROOT, LOG_PATH),
    checks: {
      log_present: !log.missing,
      pages_detected: log.missing ? null : log.pages,
      latex_warnings: log.missing ? null : log.latex_warnings.length,
      overfull_hbox: log.missing ? null : log.overfull_hbox.length,
      overfull_vbox: log.missing ? null : log.overfull_vbox.length,
      underfull_vbox: log.missing ? null : log.underfull_vbox.length,
      undefined_references: log.missing ? null : log.undefined_references.length,
      hyperref_pdfstring_warnings: log.missing ? null : log.hyperref_pdfstring.length,
      question_mark_tokens_in_log: log.missing ? null : log.question_mark_tokens.length,
      badness_masking_hits: badness_masking.hits.length
    },
    detail: { log, badness_masking },
    result: failures === 0 ? "PASS" : "FAIL"
  };
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(`QICN monolithic build quality gate: ${report.result}`);
  console.log(`Report: ${path.relative(ROOT, REPORT_PATH)}`);
  for (const [key, value] of Object.entries(report.checks)) console.log(`${key}: ${value}`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();
