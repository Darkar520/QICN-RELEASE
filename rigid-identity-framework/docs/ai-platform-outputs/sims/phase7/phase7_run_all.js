#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { buildBank } = require("../qicn_phase7_neutral_systems_bank_v2.js");
const { run: runGnw } = require("./qicn_phase7_gnw_principles_detector.js");
const { run: runQicnCandidate } = require("./qicn_phase7_qicn_candidate_noncircularity.js");

const RUNNER_ID = "phase7-deterministic-run-all-v1";
const REPO_ROOT = path.resolve(__dirname, "../../../../..");
const DEFAULT_OUT_DIR = path.resolve(__dirname, "results", "latest");
const PYPHI_WRAPPER = path.resolve(__dirname, "../qicn_phase7_pyphi_wrapper.py");

function phase7Python() {
  if (process.env.PHASE7_PYTHON) return process.env.PHASE7_PYTHON;
  const windowsPath = path.join(REPO_ROOT, ".venv-phase7", "Scripts", "python.exe");
  if (fs.existsSync(windowsPath)) return windowsPath;
  return path.join(REPO_ROOT, ".venv-phase7", "bin", "python");
}

function stringifyJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function sha256Text(text) {
  return crypto.createHash("sha256").update(text, "utf8").digest("hex").toUpperCase();
}

function writeJson(filePath, value) {
  const text = stringifyJson(value);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text, { encoding: "utf8" });
  return {
    path: normalizePath(path.relative(REPO_ROOT, filePath)),
    sha256: sha256Text(text),
    bytes: Buffer.byteLength(text, "utf8"),
  };
}

function normalizePath(value) {
  return value.split(path.sep).join("/");
}

function runPyPhi(bankPath) {
  const python = phase7Python();
  const proc = spawnSync(python, [PYPHI_WRAPPER, "--input", bankPath, "--max-n", "3"], {
    cwd: REPO_ROOT,
    encoding: "utf8",
    windowsHide: true,
    maxBuffer: 1024 * 1024 * 64,
  });
  if (proc.error) {
    throw new Error(`PyPhi wrapper failed to start: ${proc.error.message}`);
  }
  if (proc.status !== 0) {
    throw new Error(`PyPhi wrapper exited ${proc.status}: ${proc.stderr || proc.stdout}`);
  }
  try {
    return JSON.parse(proc.stdout);
  } catch (error) {
    throw new Error(`PyPhi wrapper emitted invalid JSON: ${error.message}`);
  }
}

function runAll(outDir = DEFAULT_OUT_DIR) {
  const resolvedOut = path.resolve(outDir);
  const bank = buildBank();
  const artifacts = {};
  const bankPath = path.join(resolvedOut, "phase7_bank_v2.json");
  artifacts.bank = writeJson(bankPath, bank);

  const pyphiRun = runPyPhi(bankPath);
  artifacts.pyphi = writeJson(path.join(resolvedOut, "phase7_pyphi_results.json"), pyphiRun);

  const gnwRun = runGnw(bank);
  artifacts.gnw_principles = writeJson(path.join(resolvedOut, "phase7_gnw_principles_results.json"), gnwRun);

  const qicnRun = runQicnCandidate(bank, { pyphiRun, gnwRun });
  artifacts.qicn_candidate_noncircularity = writeJson(path.join(resolvedOut, "phase7_qicn_candidate_noncircularity.json"), qicnRun);

  const digestInput = {
    runner_id: RUNNER_ID,
    bank_sha256: artifacts.bank.sha256,
    pyphi_sha256: artifacts.pyphi.sha256,
    gnw_principles_sha256: artifacts.gnw_principles.sha256,
    qicn_candidate_noncircularity_sha256: artifacts.qicn_candidate_noncircularity.sha256,
  };
  const runDigest = sha256Text(stringifyJson(digestInput));
  const manifest = {
    artifact: "phase7_run_all_manifest",
    status: "PASS",
    runner_id: RUNNER_ID,
    deterministic_run_digest: runDigest,
    cwd: normalizePath(REPO_ROOT),
    python: normalizePath(path.relative(REPO_ROOT, phase7Python())),
    output_dir: normalizePath(path.relative(REPO_ROOT, resolvedOut)),
    artifacts,
    digest_input: digestInput,
    no_claims: [
      "No QICN gap closure is certified.",
      "No superiority, validation, external adjudication, consciousness, agency, or subjectivity claim is made.",
      "A preliminary comparison is emitted only if connected incidence recovers computed atomicity at the declared threshold.",
    ],
  };
  artifacts.manifest = writeJson(path.join(resolvedOut, "phase7_run_manifest.json"), manifest);
  return manifest;
}

function selfTest() {
  const base = path.join(REPO_ROOT, ".venv-phase7", "phase7-runner-selftest");
  const first = runAll(path.join(base, "first"));
  const second = runAll(path.join(base, "second"));
  const failures = [];
  if (first.deterministic_run_digest !== second.deterministic_run_digest) {
    failures.push("second deterministic run produced a different digest");
  }
  return {
    artifact: "phase7_run_all_self_test",
    status: failures.length ? "FAIL" : "PASS",
    runner_id: RUNNER_ID,
    first_digest: first.deterministic_run_digest,
    second_digest: second.deterministic_run_digest,
    output_base: normalizePath(path.relative(REPO_ROOT, base)),
    failures,
  };
}

function parseOutDir(argv) {
  const index = argv.indexOf("--out-dir");
  return index >= 0 ? argv[index + 1] : DEFAULT_OUT_DIR;
}

function main() {
  try {
    if (process.argv.includes("--self-test")) {
      const result = selfTest();
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.status === "PASS" ? 0 : 1);
    }
    const manifest = runAll(parseOutDir(process.argv));
    console.log(JSON.stringify(manifest, null, 2));
  } catch (error) {
    console.error(`Phase 7 runner error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = {
  RUNNER_ID,
  runAll,
  selfTest,
};
