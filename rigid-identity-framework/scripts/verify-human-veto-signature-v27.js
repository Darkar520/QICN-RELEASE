#!/usr/bin/env node
/*
 * v27 Ed25519 signature verifier with trusted-key registry check.
 *
 * The self-test generates a test key and writes a local trusted registry so the
 * verifier can check that an embedded public key alone is insufficient. This is
 * still not human review and not a production PKI.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const REGISTRY = path.join(ROOT, "docs", "fixtures", "TRUSTED_KEYS_REGISTRY_v27.json");
const OUT = path.join(ROOT, "docs", "reports", "HUMAN_VETO_SIGNATURE_SELF_TEST_v27.json");
const GOVERNANCE = "This v27 signature self-test verifies local Ed25519 mechanics and trusted-registry lookup only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";

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

function loadRegistry(registryPath = REGISTRY) {
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

function verifySignedRecord(record, registryPath = REGISTRY) {
  const registry = loadRegistry(registryPath);
  const trust = isTrustedPublicKey(record.public_key_pem, registry);
  if (!trust.trusted) return { ok: false, reason: "UNTRUSTED_PUBLIC_KEY", ...trust };
  const publicKey = crypto.createPublicKey(record.public_key_pem);
  const signature = Buffer.from(record.signature_base64 || "", "base64");
  const ok = crypto.verify(null, Buffer.from(canonicalRecordPayload(record)), publicKey, signature);
  return { ok, reason: ok ? "signature_verified_with_trusted_registry_key" : "SIGNATURE_INVALID", ...trust };
}

function makeRecord(privateKey, publicKeyPem, reviewerId) {
  const record = {
    schema_version: "2.0.0",
    reviewer_id: reviewerId,
    decision: "approve_test_vector_only",
    signed_at: "2026-05-27T00:00:00Z",
    public_key_pem: publicKeyPem,
    test_vector_not_human_review: true,
    governance_boundary: GOVERNANCE
  };
  record.signature_base64 = crypto.sign(null, Buffer.from(canonicalRecordPayload(record)), privateKey).toString("base64");
  return record;
}

function selfTest() {
  const registered = crypto.generateKeyPairSync("ed25519");
  const unregistered = crypto.generateKeyPairSync("ed25519");
  const registeredPublic = registered.publicKey.export({ type: "spki", format: "pem" });
  const unregisteredPublic = unregistered.publicKey.export({ type: "spki", format: "pem" });
  const registeredFingerprint = publicKeyFingerprint(registeredPublic);
  const registry = {
    schema_version: "1.0.0",
    generated_at: "2026-05-27",
    governance_boundary: "This trusted-keys registry is a local v27 test registry only. It does not establish reviewer independence, production PKI, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.",
    trusted_keys: [
      {
        reviewer_id: "v27-self-test-registered-reviewer-not-human-review",
        key_fingerprint_sha256: registeredFingerprint,
        public_key_pem: registeredPublic,
        status: "active",
        scope: "self_test_only"
      }
    ],
    production_note: "A real deployment requires an external key server, certificate authority, revocation policy, and independent reviewer identity checks."
  };
  writeJson(REGISTRY, registry);
  const registeredRecord = makeRecord(registered.privateKey, registeredPublic, "v27-self-test-registered-reviewer-not-human-review");
  const unregisteredRecord = makeRecord(unregistered.privateKey, unregisteredPublic, "v27-self-test-unregistered-reviewer");
  const registeredResult = verifySignedRecord(registeredRecord);
  const unregisteredResult = verifySignedRecord(unregisteredRecord);
  const report = {
    schema_version: "2.0.0",
    generated_at: "2026-05-27",
    governance_boundary: GOVERNANCE,
    trusted_keys_registry_path: "docs/fixtures/TRUSTED_KEYS_REGISTRY_v27.json",
    trusted_keys_registry_sha256: fileSha256(REGISTRY),
    registered_key_verification: registeredResult,
    unregistered_key_rejection: unregisteredResult,
    result: registeredResult.ok && !unregisteredResult.ok && unregisteredResult.reason === "UNTRUSTED_PUBLIC_KEY" ? "PASS" : "FAIL",
    external_support_certified: false,
    human_review_signed: false
  };
  writeJson(OUT, report);
  fs.writeFileSync(OUT.replace(/\.json$/, ".md"), `# Human Veto Signature Self-Test v27\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Registered key verified: ${registeredResult.ok}\n- Unregistered key rejected: ${!unregisteredResult.ok}\n- Human review signed: false\n`, "utf8");
  return report;
}

function main() {
  const report = selfTest();
  console.log(`Human veto signature self-test v27: ${report.result}; registered=${report.registered_key_verification.ok}; unregistered_rejected=${!report.unregistered_key_rejection.ok}`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();

module.exports = { verifySignedRecord, publicKeyFingerprint, selfTest, stableJson };
