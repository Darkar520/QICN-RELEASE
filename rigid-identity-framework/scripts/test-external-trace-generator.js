const assert = require("assert");
const {
  generateTracePanel,
  validateGeneratorDeterminism
} = require("./lib/external-trace-generator");

function assertPanel(panel, alphabet, traceLength) {
  const allowed = new Set(alphabet);
  ["baseline", "targeted_post", "sham_post", "off_target_post"].forEach((key) => {
    assert.ok(Array.isArray(panel[key]), `${key} must be an array`);
    assert.strictEqual(panel[key].length, traceLength, `${key} length mismatch`);
    panel[key].forEach((state) => assert.ok(allowed.has(state), `${key} has state outside alphabet: ${state}`));
  });
}

function run() {
  const alphabet = ["A", "B", "C", "D"];
  const traceLength = 240;
  assert.ok(validateGeneratorDeterminism("cleanroom_seed_001", traceLength, alphabet));
  const panel = generateTracePanel({
    seed: "cleanroom_seed_001",
    traceLength,
    stateAlphabet: alphabet,
    scenarioSpec: { kind: "qicn_seeded_positive" }
  });
  assertPanel(panel, alphabet, traceLength);
  const rerun = generateTracePanel({
    seed: "cleanroom_seed_001",
    traceLength,
    stateAlphabet: alphabet,
    scenarioSpec: { kind: "qicn_seeded_positive" }
  });
  assert.deepStrictEqual(panel, rerun);

  console.log("====================================================");
  console.log("QICN External Trace Generator Tests");
  console.log("====================================================");
  console.log("[PASS] external trace generator tests passed.");
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[FAIL] ${error.message}`);
    process.exit(1);
  }
}
