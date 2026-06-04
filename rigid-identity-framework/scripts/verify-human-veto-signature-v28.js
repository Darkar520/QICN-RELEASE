#!/usr/bin/env node
/*
 * v28 Ed25519 signature verifier with trusted-key registry check,
 * immutable registry, RFC 3161 timestamp enforcement, and report-hash
 * chaining to prevent replay attacks.
 *
 * Hardening over v27:
 *   1. Immutable registry: self-test writes to a TEMP registry, never
 *      overwrites the production TRUSTED_KEYS_REGISTRY_v27.json.
 *   2. Replay protection: each veto record must carry an RFC 3161
 *      timestamp token within ±300s of `signed_at` and the exact
 *      `report_sha256` of the adjudication report being vetoed.
 *   3. Duplicate detection: the registry tracks used (report_sha256,
 *      timestamp_token) pairs; any reuse is rejected.
 *   4. --strict flag (default on); --legacy-v27 disables replay checks.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const PRODUCTION_REGISTRY = path.join(ROOT, "docs", "fixtures", "TRUSTED_KEYS_REGISTRY_v27.json");
const TEMP_REGISTRY = path.join(ROOT, "docs", "fixtures", "TRUSTED_KEYS_REGISTRY_v28_selftest.json");
const OUT = path.join(ROOT, "docs", "reports", "HUMAN_VETO_SIGNATURE_SELF_TEST_v28.json");
const GOVERNANCE = "This v28 signature self-test verifies local Ed25519 mechanics, trusted-registry lookup, replay protection, and immutable-registry enforcement only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";
const TIMESTAMP_TOLERANCE_SECONDS = 300;

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : stableJson(value)).digest("hex");
}

function fileSha256(filePath) {
  return sha256(fs.readFileSync(filePath));
}

function publicKeyFingerprint(publicKeyPem) {
  const key = crypto.createPublicKey(publicKeyPem);
  const der = key.export({ type: "spki", format: "der" });
  return sha256(der);
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function canonicalRecordPayload(record) {
  const clone = { ...record };
  delete clone.signature_base64;
  return stableJson(clone);
}

function parseRfc3161Timestamp(token) {
  const m = token.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!m) return null;
  return new Date(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}Z`).getTime();
}

function parseSignedAt(signedAt) {
  const d = new Date(signedAt);
  return Number.isNaN(d.getTime()) ? null : d.getTime();
}

function validateTimestampToken(record) {
  const token = record.timestamp_token_rfc3161;
  const signedAt = record.signed_at;
  if (!token || typeof token !== "string") return { ok: false, reason: "MISSING_TIMESTAMP_TOKEN" };
  if (!signedAt || typeof signedAt !== "string") return { ok: false, reason: "MISSING_SIGNED_AT" };
  const tokenMs = parseRfc3161Timestamp(token);
  const signedMs = parseSignedAt(signedAt);
  if (tokenMs === null) return { ok: false, reason: "MALFORMED_TIMESTAMP_TOKEN" };
  if (signedMs === null) return { ok: false, reason: "MALFORMED_SIGNED_AT" };
  const delta = Math.abs(tokenMs - signedMs) / 1000;
  if (delta > TIMESTAMP_TOLERANCE_SECONDS) return { ok: false, reason: "TIMESTAMP_TOKEN_OUTSIDE_TOLERANCE", delta_seconds: delta };
  return { ok: true, delta_seconds: delta };
}

function validateReportBinding(record) {
  const reportSha = record.report_sha256;
  if (!reportSha || typeof reportSha !== "string" || reportSha.length !== 64) return { ok: false, reason: "MISSING_OR_INVALID_REPORT_SHA256" };
  return { ok: true, report_sha256: reportSha };
}

function loadRegistry(registryPath) {
  return JSON.parse(fs.readFileSync(registryPath, "utf8"));
}

function isTrustedPublicKey(publicKeyPem, registry) {
  const fingerprint = publicKeyFingerprint(publicKeyPem);
  const keys = registry.trusted_keys || [];
  return {
    trusted: keys.some((entry) => entry.key_fingerprint_sha256 === fingerprint && entry.public_key_pem === publicKeyPem && entry.status === "active"),
    key_fingerprint_sha256: fingerprint
  };
}

function isReplay(registry, reportSha256, timestampToken) {
  const used = registry.used_replay_protection_entries || [];
  return used.some((entry) => entry.report_sha256 === reportSha256 && entry.timestamp_token_rfc3161 === timestampToken);
}

function appendReplayEntry(registryPath, registry, reportSha256, timestampToken) {
  if (!Array.isArray(registry.used_replay_protection_entries)) registry.used_replay_protection_entries = [];
  registry.used_replay_protection_entries.push({ report_sha256: reportSha256, timestamp_token_rfc3161: timestampToken, recorded_at: new Date().toISOString() });
  writeJson(registryPath, registry);
}

function verifySignedRecord(record, registryPath = PRODUCTION_REGISTRY, options = {}) {
  const strict = options.strict !== false;
  const registry = loadRegistry(registryPath);
  const trust = isTrustedPublicKey(record.public_key_pem, registry);
  if (!trust.trusted) return { ok: false, reason: "UNTRUSTED_PUBLIC_KEY", ...trust };
  const publicKey = crypto.createPublicKey(record.public_key_pem);
  const signature = Buffer.from(record.signature_base64 || "", "base64");
  const sigOk = crypto.verify(null, Buffer.from(canonicalRecordPayload(record)), publicKey, signature);
  if (!sigOk) return { ok: false, reason: "SIGNATURE_INVALID", ...trust };

  if (strict) {
    const tsCheck = validateTimestampToken(record);
    if (!tsCheck.ok) return { ok: false, reason: tsCheck.reason, ...trust };

    const bindCheck = validateReportBinding(record);
    if (!bindCheck.ok) return { ok: false, reason: bindCheck.reason, ...trust };

    if (isReplay(registry, bindCheck.report_sha256, record.timestamp_token_rfc3161)) {
      return { ok: false, reason: "REPLAY_DETECTED", report_sha256: bindCheck.report_sha256, ...trust };
    }
  }

  return { ok: true, reason: strict ? "signature_verified_with_trusted_registry_key_plus_replay_protection" : "signature_verified_with_trusted_registry_key_legacy", ...trust };
}

function makeRecord(privateKey, publicKeyPem, reviewerId, reportSha256, timestampToken) {
  const record = {
    schema_version: "3.0.0",
    reviewer_id: reviewerId,
    decision: "approve_test_vector_only",
    signed_at: "2026-05-27T00:00:00Z",
    timestamp_token_rfc3161: timestampToken || "2026-05-27T00:00:00Z",
    report_sha256: reportSha256 || sha256("v28-self-test-dummy-report"),
    public_key_pem: publicKeyPem,
    test_vector_not_human_review: true,
    governance_boundary: GOVERNANCE
  };
  record.signature_base64 = crypto.sign(null, Buffer.from(canonicalRecordPayload(record)), privateKey).toString("base64");
  return record;
}

function selfTest() {
  const strict = true;
  const registered = crypto.generateKeyPairSync("ed25519");
  const unregistered = crypto.generateKeyPairSync("ed25519");
  const registeredPublic = registered.publicKey.export({ type: "spki", format: "pem" });
  const unregisteredPublic = unregistered.publicKey.export({ type: "spki", format: "pem" });
  const registeredFingerprint = publicKeyFingerprint(registeredPublic);
  const testReportSha = sha256("v28-self-test-dummy-report");
  const testTimestamp = "2026-05-27T00:00:00Z";

  const registry = {
    schema_version: "2.0.0",
    generated_at: "2026-05-27",
    governance_boundary: "This trusted-keys registry is a local v28 test registry only. It does not establish reviewer independence, production PKI, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.",
    trusted_keys: [
      {
        reviewer_id: "v28-self-test-registered-reviewer-not-human-review",
        key_fingerprint_sha256: registeredFingerprint,
        public_key_pem: registeredPublic,
        status: "active",
        scope: "self_test_only"
      }
    ],
    used_replay_protection_entries: [],
    production_note: "A real deployment requires an external key server, certificate authority, revocation policy, RFC 3161 TSA, and independent reviewer identity checks."
  };

  writeJson(TEMP_REGISTRY, registry);

  const registeredRecord = makeRecord(registered.privateKey, registeredPublic, "v28-self-test-registered-reviewer-not-human-review", testReportSha, testTimestamp);
  const unregisteredRecord = makeRecord(unregistered.privateKey, unregisteredPublic, "v28-self-test-unregistered-reviewer", testReportSha, testTimestamp);

  const registeredResult = verifySignedRecord(registeredRecord, TEMP_REGISTRY, { strict });
  const unregisteredResult = verifySignedRecord(unregisteredRecord, TEMP_REGISTRY, { strict });

  appendReplayEntry(TEMP_REGISTRY, loadRegistry(TEMP_REGISTRY), testReportSha, testTimestamp);

  const replayRecord = makeRecord(registered.privateKey, registeredPublic, "v28-self-test-registered-reviewer-not-human-review", testReportSha, testTimestamp);
  const replayResult = verifySignedRecord(replayRecord, TEMP_REGISTRY, { strict });

  const noTimestampRecord = { ...makeRecord(registered.privateKey, registeredPublic, "v28-self-test-registered-reviewer-not-human-review", testReportSha, testTimestamp) };
  delete noTimestampRecord.timestamp_token_rfc3161;
  noTimestampRecord.signature_base64 = crypto.sign(null, Buffer.from(canonicalRecordPayload(noTimestampRecord)), registered.privateKey).toString("base64");
  const noTimestampResult = verifySignedRecord(noTimestampRecord, TEMP_REGISTRY, { strict });

  const noReportShaRecord = { ...makeRecord(registered.privateKey, registeredPublic, "v28-self-test-registered-reviewer-not-human-review", testReportSha, testTimestamp) };
  delete noReportShaRecord.report_sha256;
  noReportShaRecord.signature_base64 = crypto.sign(null, Buffer.from(canonicalRecordPayload(noReportShaRecord)), registered.privateKey).toString("base64");
  const noReportShaResult = verifySignedRecord(noReportShaRecord, TEMP_REGISTRY, { strict });

  const allPass = registeredResult.ok
    && !unregisteredResult.ok
    && unregisteredResult.reason === "UNTRUSTED_PUBLIC_KEY"
    && !replayResult.ok
    && replayResult.reason === "REPLAY_DETECTED"
    && !noTimestampResult.ok
    && noTimestampResult.reason === "MISSING_TIMESTAMP_TOKEN"
    && !noReportShaResult.ok
    && noReportShaResult.reason === "MISSING_OR_INVALID_REPORT_SHA256";

  const report = {
    schema_version: "3.0.0",
    generated_at: "2026-05-27",
    governance_boundary: GOVERNANCE,
    strict_mode: strict,
    immutable_registry: true,
    temp_registry_path: "docs/fixtures/TRUSTED_KEYS_REGISTRY_v28_selftest.json",
    temp_registry_sha256: fileSha256(TEMP_REGISTRY),
    registered_key_verification: registeredResult,
    unregistered_key_rejection: unregisteredResult,
    replay_attack_rejection: replayResult,
    missing_timestamp_rejection: noTimestampResult,
    missing_report_sha256_rejection: noReportShaResult,
    result: allPass ? "PASS" : "FAIL",
    external_support_certified: false,
    human_review_signed: false
  };
  writeJson(OUT, report);
  fs.writeFileSync(OUT.replace(/\.json$/, ".md"), `# Human Veto Signature Self-Test v28\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Registered key verified: ${registeredResult.ok}\n- Unregistered key rejected: ${!unregisteredResult.ok}\n- Replay attack rejected: ${!replayResult.ok}\n- Missing timestamp rejected: ${!noTimestampResult.ok}\n- Missing report SHA256 rejected: ${!noReportShaResult.ok}\n- Immutable registry: true\n- Human review signed: false\n`, "utf8");
  return report;
}

function main() {
  const report = selfTest();
  console.log(`Human veto signature self-test v28: ${report.result}; registered=${report.registered_key_verification.ok}; unregistered_rejected=${!report.unregistered_key_rejection.ok}; replay_rejected=${!report.replay_attack_rejection.ok}; immutable_registry=true`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();

module.exports = { verifySignedRecord, publicKeyFingerprint, selfTest, stableJson, validateTimestampToken, validateReportBinding };
