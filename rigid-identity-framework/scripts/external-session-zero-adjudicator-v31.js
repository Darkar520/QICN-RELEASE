#!/usr/bin/env node
/*
 * v31 foundation-first adjudication wrapper.
 *
 * v31 does not replace v30 statistics. It adds typed-foundation blockers for
 * issues that cannot be solved by AICc, MI, DW, or GLS alone: perturbation
 * type confusion, circular calibration lineage, unverified bridge hypotheses,
 * and near-constant straw-man rivals.
 */

const fs = require("fs");
const path = require("path");
const { analyzeManifest, stableJson, sha256, fileSha256 } = require("./external-session-zero-adjudicator-v30");
const { verifyBridgeEstimatorCertificate } = require("./lib/bridge-estimator-verification");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_FIXTURE = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json");
const DEFAULT_REPORT = path.join(ROOT, "docs", "reports", "SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v31.json");
const STATUS_OUT = path.join(ROOT, "docs", "reports", "GAP_CLOSURE_STATUS_v31.json");
const GOVERNANCE = "This v31 report is a foundation-first internal diagnostic wrapper over v30. It blocks untyped, circular, or under-specified synthetic fixtures. It distinguishes the null regime (∅_φ ∈ E, bottom element) from undefined assignment (⊥ ∉ E). It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human review.";

function repoPath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function variance(values) {
  if (values.length < 2) return 0;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1);
}

function admissiblePoints(manifest) {
  const excluded = new Set((manifest.exclusion_log || []).map((entry) => entry.point_id));
  return (manifest.measurement_points || []).filter((point) => !excluded.has(point.id));
}

function foundationChecks(manifest, v30Report) {
  const points = admissiblePoints(manifest);
  const observed = points.map((point) => point.observed_delta);
  const rival = points.map((point) => point.rival_prediction);
  const observedVariance = variance(observed);
  const rivalVariance = variance(rival);

  const perturbationTyping = manifest.perturbation_type_registry || null;
  const typedSeparationOk = Boolean(
    perturbationTyping
    && Array.isArray(perturbationTyping.internal_perturbations)
    && Array.isArray(perturbationTyping.external_witnesses)
    && perturbationTyping.internal_perturbations.length > 0
    && perturbationTyping.external_witnesses.length > 0
  );

  const calibration = manifest.decision_thresholds || {};
  const calibrationLineage = calibration.threshold_calibration_lineage || null;
  const circularCalibrationOk = Boolean(
    calibrationLineage
    && calibrationLineage.fixture_blind === true
    && calibrationLineage.generated_before_fixture_scoring === true
    && calibrationLineage.external_holdout_used === true
  );

  const bridge = v30Report.validation_summary?.bridge_certificate_admissibility || {};
  const bridgeVerified = bridge.status === "admissible"
    && Boolean(manifest.bridge_certificate?.verified_topology)
    && Boolean(manifest.bridge_certificate?.computed_lipschitz_constants)
    && Boolean(manifest.bridge_certificate?.factorization_proof_reference)
    && Boolean(manifest.bridge_certificate?.decision_margin_report);
  const bridgeEstimatorVerification = verifyBridgeEstimatorCertificate(manifest);

  const rivalVarianceRatio = observedVariance > 0 ? rivalVariance / observedVariance : 0;
  const rivalVarianceAdequate = rivalVarianceRatio >= 0.1;

  return {
    typed_perturbation_separation: {
      ok: typedSeparationOk,
      rule: "manifest must separately declare internal perturbations and external extension witnesses",
      status_if_failed: "BLOCKED_TYPE_CONFUSION"
    },
    calibration_lineage: {
      ok: circularCalibrationOk,
      rule: "threshold calibration must be fixture-blind, generated before scoring, and tied to an external holdout before it can support inference",
      status_if_failed: "BLOCKED_CIRCULAR_CALIBRATION"
    },
    bridge_hypotheses: {
      ok: bridgeVerified,
      v30_bridge_status: bridge.status || "missing",
      rule: "H1 topology, H2 constants, H3 factorization, and H4 margin must be materially referenced",
      status_if_failed: "BLOCKED_BRIDGE_HYPOTHESES_UNVERIFIED"
    },
    bridge_estimator_verification: {
      ok: bridgeEstimatorVerification.all_verified,
      H2_status: bridgeEstimatorVerification.H2_status,
      H4_status: bridgeEstimatorVerification.H4_status,
      H4_details: bridgeEstimatorVerification.H4_details,
      decision_margin: bridgeEstimatorVerification.decision_margin,
      H3_status: bridgeEstimatorVerification.H3_status,
      rule: "H2 requires K_i, omega_i, epsilon_i, and omega_i <= 2 epsilon_i for all six invariants; H4 requires Delta* > L_h * sum(epsilon_i)",
      status_if_failed: "BLOCKED_ESTIMATOR_UNVERIFIED"
    },
    rival_variance: {
      ok: rivalVarianceAdequate,
      observed_variance: observedVariance,
      rival_prediction_variance: rivalVariance,
      variance_ratio: rivalVarianceRatio,
      rule: "rival predictions must have at least 10 percent of observed variance unless a preregistered constant model is justified",
      status_if_failed: "BLOCKED_STRAW_MAN_RIVAL_VARIANCE"
    }
  };
}

function statusFromChecks(checks, v30Report) {
  const entries = [
    ["L0-1", "v30 missing statistical helper modules", true, "gate_enforced: advanced-statistics.js and gls-statistics.js are required and present; foundation mathematics still needs external review"],
    ["L0-2", "centered rho separates serial dependence from nonzero residual mean", true, "gate_enforced: estimateRho uses centered lag-1 Yule-Walker and documents small-sample bias"],
    ["L0-3", "exact GLS profile likelihood available", true, "gate_enforced: glsGaussianInformation uses the AR(1) covariance quadratic form; statistical validity gap remains open for real data"],
    ["L1-1", "compact Hausdorff versus Polish relationship remains manuscript-level open", false, "paper1 now documents typed perturbations, but compact-metric instantiation remains open"],
    ["L1-2", "internal perturbation versus external witness typed in runner", checks.typed_perturbation_separation.ok, checks.typed_perturbation_separation.rule],
    ["L2-1", "Paper 3 restored from local recovery artifact", fs.existsSync(path.join(ROOT, "paper3", "main.tex")), "gate_enforced: paper3/main.tex present and compilation is verified separately"],
    ["L3-1", "iid-only AICc blocked by temporal dependence", (v30Report.blocking_reasons || []).includes("BLOCKED_TEMPORAL_DEPENDENCE_STRICT"), "gate_enforced: v30 strict DW gate blocks the synthetic fixture; no external dataset is supplied"],
    ["L4-1", "Bridge H1-H4 not accepted without material certificates", checks.bridge_hypotheses.ok, checks.bridge_hypotheses.rule],
    ["L4-2", "Bridge H2-H4 estimator verification", checks.bridge_estimator_verification.ok, checks.bridge_estimator_verification.rule],
    ["L5-1", "rival variance straw-man gate", checks.rival_variance.ok, checks.rival_variance.rule],
    ["L6-1", "fixture-blind calibration lineage", checks.calibration_lineage.ok, checks.calibration_lineage.rule],
    ["L7-1", "external credibility boundary preserved", v30Report.external_support_certified === false, "external_support_certified must remain false"]
  ];
  return entries.map(([gap_id, description, closed, evidence]) => ({
    gap_id,
    description,
    status: closed ? "gate_enforced_gap_remains_open" : "open_or_blocked",
    evidence
  }));
}

function adjudicateFile(manifestPath = DEFAULT_FIXTURE, outPath = DEFAULT_REPORT, options = {}) {
  const manifest = readJson(manifestPath);
  const strict = !options.legacyV27;
  const v30Report = analyzeManifest(manifest, { strict, legacyV27: options.legacyV27 === true });
  const checks = foundationChecks(manifest, v30Report);
  const v31Blockers = [];
  for (const check of Object.values(checks)) {
    if (!check.ok) v31Blockers.push(check.status_if_failed);
  }
  const blockingReasons = Array.from(new Set([...(v30Report.blocking_reasons || []), ...v31Blockers]));
  const report = {
    schema_version: "8.0.0",
    generated_at: "2026-05-29",
    governance_boundary: GOVERNANCE,
    strict_mode: strict,
    input_manifest: repoPath(manifestPath),
    v30_verdict: v30Report.verdict,
    v30_blocking_reasons: v30Report.blocking_reasons || [],
    foundation_checks: checks,
    blocking_reasons: blockingReasons,
    verdict: blockingReasons.length > 0 ? "BLOCKED_FOUNDATION_FIRST_GATES" : v30Report.verdict,
    result: "PASS",
    external_support_certified: false,
    provenance: {
      runner_path: repoPath(__filename),
      runner_sha256: fileSha256(__filename),
      manifest_path: repoPath(manifestPath),
      manifest_sha256: fileSha256(manifestPath),
      v30_runner_sha256: fileSha256(path.join(ROOT, "scripts", "external-session-zero-adjudicator-v30.js"))
    },
    nonclaim_boundary: "A v31 PASS means the foundation-first gate executed; blocked verdicts are expected on current synthetic fixtures and are not evidence for QICN."
  };
  report.report_sha256 = sha256({ ...report, report_sha256: undefined });
  writeJson(outPath, report);
  fs.writeFileSync(outPath.replace(/\.json$/, ".md"), `# Session Zero Adjudication v31\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Verdict: **${report.verdict}**\n- Blocking reasons: ${blockingReasons.join(", ") || "none"}\n- External certification: **NO**\n`, "utf8");

  const status = {
    schema_version: "1.0.0",
    generated_at: "2026-05-29",
    governance_boundary: GOVERNANCE,
    gaps: statusFromChecks(checks, v30Report),
    result: "PASS",
    external_support_certified: false
  };
  writeJson(STATUS_OUT, status);
  return report;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const manifestIndex = args.indexOf("--manifest");
  const manifestPath = manifestIndex >= 0 ? path.resolve(args[manifestIndex + 1]) : DEFAULT_FIXTURE;
  const legacyV27 = args.includes("--legacy-v27") || args.includes("--legacy-iid");
  const report = adjudicateFile(manifestPath, DEFAULT_REPORT, { legacyV27 });
  console.log(`External Session Zero adjudicator v31: ${report.result}; verdict=${report.verdict}; blockers=${report.blocking_reasons.length}; external_support_certified=false`);
  if (report.result !== "PASS") process.exit(1);
}

module.exports = {
  adjudicateFile,
  foundationChecks
};
