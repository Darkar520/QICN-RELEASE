const crypto = require("crypto");

const TAMPER_TYPES = new Set([
  "hash_corruption",
  "malformed_json",
  "protocol_violation_missing_field"
]);

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function createBaselineRun(seed = 42) {
  return {
    run_summary: {
      prediction_id: "PRED-06",
      seed,
      protocol_version: "PRED-06_prereg_v1",
      verdict_hash: sha256(`verdict:${seed}`),
      payload: {
        admissible: true,
        metric: 1
      }
    },
    run_verdict: {
      prediction_id: "PRED-06",
      accepted: true,
      quarantine: false,
      reason: "baseline"
    }
  };
}

function injectTamper(baseline, type) {
  if (!TAMPER_TYPES.has(type)) {
    throw new Error(`Unknown tamper type: ${type}`);
  }
  const copy = JSON.parse(JSON.stringify(baseline));
  if (type === "hash_corruption") {
    copy.run_summary.verdict_hash = `tampered-${copy.run_summary.verdict_hash}`;
  }
  if (type === "malformed_json") {
    copy.malformed_json = "{not-valid-json";
  }
  if (type === "protocol_violation_missing_field") {
    delete copy.run_summary.protocol_version;
  }
  return copy;
}

function injectSham(baseline) {
  const copy = JSON.parse(JSON.stringify(baseline));
  copy.run_summary.note = "non-semantic whitespace-only control ";
  return copy;
}

function adjudicateInjectedRun(run) {
  if (run.malformed_json) {
    return { accepted: false, quarantine: true, reason: "malformed_json" };
  }
  if (!run.run_summary || !run.run_verdict) {
    return { accepted: false, quarantine: true, reason: "missing_required_artifact" };
  }
  if (!run.run_summary.protocol_version) {
    return { accepted: false, quarantine: true, reason: "protocol_violation_missing_field" };
  }
  if (!/^([a-f0-9]{64})$/.test(run.run_summary.verdict_hash || "")) {
    return { accepted: false, quarantine: true, reason: "hash_corruption" };
  }
  return { accepted: true, quarantine: false, reason: "admissible" };
}

function selfTest() {
  const seeds = Array.from({ length: 30 }, (_, i) => 1000 + i);
  const tamperResults = [];
  TAMPER_TYPES.forEach((type) => {
    seeds.forEach((seed) => {
      tamperResults.push(adjudicateInjectedRun(injectTamper(createBaselineRun(seed), type)));
    });
  });
  const shamResults = seeds.map((seed) => adjudicateInjectedRun(injectSham(createBaselineRun(seed))));
  const rejectedTamper = tamperResults.filter((r) => !r.accepted && r.quarantine).length;
  const acceptedSham = shamResults.filter((r) => r.accepted && !r.quarantine).length;
  const summary = {
    tamper_runs: tamperResults.length,
    tamper_rejected_or_quarantined: rejectedTamper,
    sham_runs: shamResults.length,
    sham_accepted: acceptedSham,
    decision: rejectedTamper === tamperResults.length && acceptedSham === shamResults.length ? "self_test_pass" : "self_test_fail",
    boundary: "This is a preregistration harness self-test, not empirical validation."
  };
  console.log(JSON.stringify(summary, null, 2));
  return summary.decision === "self_test_pass" ? 0 : 1;
}

if (require.main === module) {
  if (process.argv.includes("--self-test")) {
    process.exit(selfTest());
  }
  console.log("Usage: node scripts/tamper-inject.js --self-test");
}

module.exports = {
  TAMPER_TYPES,
  createBaselineRun,
  injectTamper,
  injectSham,
  adjudicateInjectedRun
};
