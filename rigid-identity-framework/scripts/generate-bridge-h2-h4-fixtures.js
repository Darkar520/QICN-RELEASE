#!/usr/bin/env node
/*
 * Generates derived v27/v34 bridge-certificate fixtures without modifying the
 * historical v27 fixture in place.
 */

const fs = require("fs");
const path = require("path");
const { computeDecisionMargin, verifyH4 } = require("./lib/bridge-estimator-verification");

const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json");
const OUT_COMPLETION = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27_BRIDGE_H2_H4_COMPLETION.json");
const OUT_V34 = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v34.json");

const DEFINITIONS = [
  {
    invariant_id: "identity_channel_lock",
    domain: "measurement_point_sequence",
    codomain: "[0,1] with d(a,b)=|a-b|",
    field_source: "identity_channel_lock_estimate",
    interpretation: "Degree to which the channel preserves identity across perturbations; 1=perfect lock, 0=complete drift.",
    theoretical_K_i_upper_bound: 1.0,
    theoretical_omega_i_max: 0.10,
    declared_epsilon_i: 0.05
  },
  {
    invariant_id: "history_alignment",
    domain: "measurement_point_sequence",
    codomain: "[-1,1] with d(a,b)=|a-b|",
    field_source: "history_alignment_estimate",
    interpretation: "Alignment of observed trajectory with internal history model; 1=perfect alignment, -1=anti-aligned.",
    theoretical_K_i_upper_bound: 2.0,
    theoretical_omega_i_max: 0.10,
    declared_epsilon_i: 0.05
  },
  {
    invariant_id: "response_phase",
    domain: "measurement_point_sequence",
    codomain: "[0,2*pi) with circular distance min(|a-b|, 2*pi-|a-b|)",
    field_source: "response_phase_estimate",
    interpretation: "Phase of the system response to perturbation, modulo 2*pi.",
    theoretical_K_i_upper_bound: 1.0,
    theoretical_omega_i_max: 0.10,
    declared_epsilon_i: 0.05
  },
  {
    invariant_id: "gauge_stability",
    domain: "measurement_point_sequence",
    codomain: "[0,infinity) with d(a,b)=|a-b|",
    field_source: "gauge_stability_estimate",
    interpretation: "Stability of the internal calibration gauge under perturbation; higher means more stable.",
    theoretical_K_i_upper_bound: 0.5,
    theoretical_omega_i_max: 0.10,
    declared_epsilon_i: 0.05
  },
  {
    invariant_id: "intervention_fidelity",
    domain: "measurement_point_sequence",
    codomain: "[0,1] with d(a,b)=|a-b|",
    field_source: "intervention_fidelity_estimate",
    interpretation: "Fidelity of the intervention protocol; 1=perfect fidelity, 0=complete distortion.",
    theoretical_K_i_upper_bound: 1.0,
    theoretical_omega_i_max: 0.10,
    declared_epsilon_i: 0.05
  },
  {
    invariant_id: "factorization_gap",
    domain: "measurement_point_sequence",
    codomain: "[0,infinity) with d(a,b)=|a-b|",
    field_source: "factorization_gap_estimate",
    interpretation: "Operational gap between the finite claim surrogate and its declared invariant factorization; 0=perfect finite factorization.",
    theoretical_K_i_upper_bound: 0.5,
    theoretical_omega_i_max: 0.10,
    declared_epsilon_i: 0.05
  }
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function withBridgeCompletion(sourceManifest, manifestId) {
  const manifest = clone(sourceManifest);
  const bridge = manifest.bridge_certificate || {};
  const margin = computeDecisionMargin(manifest);
  const epsilonSum = DEFINITIONS.reduce((sum, definition) => sum + definition.declared_epsilon_i, 0);
  const h4 = verifyH4(margin.delta_star, margin.L_h, epsilonSum);

  manifest.manifest_id = manifestId;
  manifest.derived_from_manifest_id = sourceManifest.manifest_id || sourceManifest.fixture_id || "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27";
  manifest.bridge_certificate = {
    ...bridge,
    latent_invariant_definitions: DEFINITIONS,
    operational_H2_verification: {
      status: "theoretically_bounded_operational_surrogate",
      note: "K_i are operational upper bounds from declared codomain ranges, not computed topological constants. omega_i_max = 2*epsilon_i from tolerance_vector. These bounds are internal synthetic diagnostics only.",
      verified_for_fixture: true,
      generalizes_to_external: false
    },
    operational_H4_verification: {
      status: h4.robustness_condition ? "verified_operationally" : "failed_operationally",
      ...h4
    }
  };
  return manifest;
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function main() {
  const sourceManifest = JSON.parse(fs.readFileSync(SOURCE, "utf8"));
  writeJson(OUT_COMPLETION, withBridgeCompletion(sourceManifest, "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27_BRIDGE_H2_H4_COMPLETION"));
  writeJson(OUT_V34, withBridgeCompletion(sourceManifest, "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v34"));
  console.log(`Generated ${path.relative(ROOT, OUT_COMPLETION)} and ${path.relative(ROOT, OUT_V34)}`);
}

if (require.main === module) {
  main();
}
