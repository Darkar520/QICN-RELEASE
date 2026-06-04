#!/usr/bin/env node
/*
 * Unified superior-gap audit entry point for v35 centralization.
 *
 * This preserves existing versioned audits and runs the currently active
 * superior-gap chain without changing their internal logic.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs", "reports", "SUPERIOR_GAP_AUDIT_CURRENT.json");

const SCRIPTS = [
  "scripts/audit-v25-superior-gaps.js",
  "scripts/audit-v26-superior-gaps.js",
  "scripts/audit-v27-superior-gaps.js"
];

function runScript(script) {
  const result = spawnSync(process.execPath, [script], { cwd: ROOT, encoding: "utf8" });
  return {
    script,
    status: result.status,
    pass: result.status === 0,
    stdout_tail: result.stdout.split(/\r?\n/).filter(Boolean).slice(-8),
    stderr_tail: result.stderr.split(/\r?\n/).filter(Boolean).slice(-8)
  };
}

function main() {
  const checks = SCRIPTS.map(runScript);
  const report = {
    schema_version: "1.0.0",
    generated_at: new Date().toISOString(),
    governance_boundary: "This unified superior-gap audit only orchestrates existing internal gap audits. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, peer review, or human mathematical review.",
    checks,
    result: checks.every((check) => check.pass) ? "PASS" : "FAIL",
    external_support_certified: false
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Unified superior-gap audit: ${report.result}; checks=${checks.filter((check) => check.pass).length}/${checks.length}`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();
