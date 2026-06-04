#!/usr/bin/env node
/*
 * Phase 0.5 parity check requested for v35 centralization.
 *
 * Runs v30 directly and v31 wrapper, then compares report hashes and verdicts.
 * The reports are expected to have different hashes because v31 adds
 * foundation-first blockers and a different schema.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(ROOT, "docs", "reports", "V35_V30_V31_PARITY_CHECK.json");
const V30 = path.join(ROOT, "docs", "reports", "SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v30.json");
const V31 = path.join(ROOT, "docs", "reports", "SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v31.json");

function runNode(script) {
  const result = spawnSync(process.execPath, [script], { cwd: ROOT, encoding: "utf8" });
  return {
    command: `node ${path.relative(ROOT, script).split(path.sep).join("/")}`,
    status: result.status,
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim()
  };
}

function sha256File(filePath) {
  return fs.existsSync(filePath)
    ? crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex")
    : null;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function main() {
  const runs = [
    runNode(path.join(ROOT, "scripts", "external-session-zero-adjudicator-v30.js")),
    runNode(path.join(ROOT, "scripts", "external-session-zero-adjudicator-v31.js"))
  ];
  const v30Report = fs.existsSync(V30) ? readJson(V30) : null;
  const v31Report = fs.existsSync(V31) ? readJson(V31) : null;
  const report = {
    schema_version: "1.0.0",
    generated_at: new Date().toISOString(),
    governance_boundary: "This v35 parity check compares internal synthetic reports only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, peer review, or human mathematical review.",
    runs,
    v30: {
      report_path: path.relative(ROOT, V30).split(path.sep).join("/"),
      sha256: sha256File(V30),
      result: v30Report?.result || null,
      verdict: v30Report?.verdict || null,
      blocking_reasons: v30Report?.blocking_reasons || []
    },
    v31: {
      report_path: path.relative(ROOT, V31).split(path.sep).join("/"),
      sha256: sha256File(V31),
      result: v31Report?.result || null,
      verdict: v31Report?.verdict || null,
      blocking_reasons: v31Report?.blocking_reasons || []
    },
    sha256_equal: sha256File(V30) === sha256File(V31),
    verdict_equal: v30Report?.verdict === v31Report?.verdict,
    interpretation: "Different report hashes are expected if v31 adds foundation-first wrapping over v30. For centralization, v31 must be treated as current strict behavior rather than as a byte-identical v30 alias.",
    result: runs.every((run) => run.status === 0) && v30Report && v31Report ? "PASS" : "FAIL",
    external_support_certified: false
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`V35 v30/v31 parity check: ${report.result}; sha256_equal=${report.sha256_equal}; verdict_equal=${report.verdict_equal}; v30=${report.v30.verdict}; v31=${report.v31.verdict}`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();
