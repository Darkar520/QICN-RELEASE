#!/usr/bin/env node
/*
 * Non-destructive legacy regression runner for v35 centralization.
 *
 * Starts with v25, the simplest legacy verification chain, then escalates
 * through the newer chains. This runner does not move files.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(ROOT, "docs", "reports", "V35_ALL_LEGACY_VERIFICATION.json");
const STEPS = [
  ["verify:v25", ["run", "verify:v25"]],
  ["verify:v26", ["run", "verify:v26"]],
  ["verify:v27", ["run", "verify:v27"]],
  ["adjudicate:v28", ["run", "adjudicate:external-session-zero-v28"]],
  ["verify:v30", ["run", "verify:v30"]],
  ["verify:v31", ["run", "verify:v31"]]
];

function runNpm(args) {
  if (process.platform === "win32") {
    return spawnSync("cmd.exe", ["/d", "/s", "/c", ["npm", ...args].join(" ")], { cwd: ROOT, encoding: "utf8" });
  }
  return spawnSync("npm", args, { cwd: ROOT, encoding: "utf8" });
}

function runStep([name, args]) {
  const started = new Date().toISOString();
  const result = runNpm(args);
  const stdout = result.stdout || "";
  const stderr = result.stderr || "";
  return {
    name,
    command: `npm ${args.join(" ")}`,
    started_at: started,
    finished_at: new Date().toISOString(),
    status: result.status,
    error: result.error ? result.error.message : null,
    pass: result.status === 0,
    stdout_tail: stdout.split(/\r?\n/).filter(Boolean).slice(-12),
    stderr_tail: stderr.split(/\r?\n/).filter(Boolean).slice(-12)
  };
}

function main() {
  const steps = [];
  for (const step of STEPS) {
    const result = runStep(step);
    steps.push(result);
    if (!result.pass) break;
  }
  const report = {
    schema_version: "1.0.0",
    generated_at: new Date().toISOString(),
    governance_boundary: "This v35 legacy verification runner checks backward-compatible internal gates only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, peer review, or human mathematical review.",
    steps,
    result: steps.length === STEPS.length && steps.every((step) => step.pass) ? "PASS" : "FAIL",
    external_support_certified: false
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`V35 all legacy verification: ${report.result}; passed=${steps.filter((step) => step.pass).length}/${STEPS.length}`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();
