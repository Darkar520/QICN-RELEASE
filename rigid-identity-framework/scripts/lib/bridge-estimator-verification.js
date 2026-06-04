/*
 * Operational bridge hypothesis verification for QICN synthetic fixtures.
 *
 * Governance: this module computes finite-fixture diagnostics only. It does
 * not certify external systems, topological invariants, phenomenological
 * assignments, consciousness, identity transfer, or bridge-burden closure.
 */

const EXPECTED_INVARIANTS = [
  "identity_channel_lock",
  "history_alignment",
  "response_phase",
  "gauge_stability",
  "intervention_fidelity",
  "factorization_gap"
];

function admissiblePoints(manifest) {
  const excluded = new Set((manifest.exclusion_log || []).map((entry) => entry.point_id));
  return (manifest.measurement_points || []).filter((point) => !excluded.has(point.id));
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function computeDecisionMargin(manifest) {
  const points = admissiblePoints(manifest);
  if (points.length === 0) {
    return {
      delta_star: 0,
      L_h: 2.0,
      points_evaluated: 0,
      points_favoring_qicn: 0,
      margins: [],
      margin_computation: "no admissible points",
      operational_note: "This is a finite operational computation, not a topological invariant."
    };
  }

  const margins = points.map((point) => {
    const rivalDist = Math.abs(point.observed_delta - point.rival_prediction);
    const qicnDist = Math.abs(point.observed_delta - point.qicn_prediction);
    return {
      point_id: point.id,
      rival_distance: rivalDist,
      qicn_distance: qicnDist,
      margin: rivalDist - qicnDist
    };
  });

  const qicnWins = margins.filter((entry) => entry.margin > 0);
  const deltaStar = qicnWins.length > 0
    ? Math.min(...qicnWins.map((entry) => entry.margin))
    : 0;

  return {
    delta_star: deltaStar,
    L_h: 2.0,
    margin_computation: "rivalDist - qicnDist; L_h = 2 for a difference of two absolute-value distance terms",
    points_evaluated: points.length,
    points_favoring_qicn: qicnWins.length,
    margins,
    operational_note: "This is a finite operational computation, not a topological invariant."
  };
}

function verifyH4(deltaStar, L_h, epsilonSum) {
  const robustness = finiteNumber(deltaStar)
    && finiteNumber(L_h)
    && finiteNumber(epsilonSum)
    && deltaStar > L_h * epsilonSum;
  return {
    robustness_condition: robustness,
    delta_star: deltaStar,
    L_h,
    epsilon_sum: epsilonSum,
    L_h_epsilon_sum: L_h * epsilonSum,
    margin_excess: deltaStar - L_h * epsilonSum,
    note: robustness
      ? "H4 satisfied operationally for this fixture."
      : "H4 fails: the finite decision margin is too small for the declared estimator-error budget."
  };
}

function verifyBridgeEstimatorCertificate(manifest) {
  const bridge = manifest.bridge_certificate || {};
  const definitions = bridge.latent_invariant_definitions || [];
  const ids = new Set(definitions.map((definition) => definition.invariant_id));
  const expectedPresent = EXPECTED_INVARIANTS.every((invariant) => ids.has(invariant));
  const hasDefinitions = definitions.length === EXPECTED_INVARIANTS.length && expectedPresent;

  const perInvariant = definitions.map((definition) => {
    const kOk = finiteNumber(definition.theoretical_K_i_upper_bound)
      && definition.theoretical_K_i_upper_bound > 0;
    const omegaOk = finiteNumber(definition.theoretical_omega_i_max)
      && definition.theoretical_omega_i_max >= 0;
    const epsilonOk = finiteNumber(definition.declared_epsilon_i)
      && definition.declared_epsilon_i > 0;
    const omegaBoundOk = omegaOk
      && epsilonOk
      && definition.theoretical_omega_i_max <= 2 * definition.declared_epsilon_i + Number.EPSILON;
    return {
      invariant_id: definition.invariant_id || "missing",
      K_i_present: kOk,
      omega_i_present: omegaOk,
      epsilon_i_present: epsilonOk,
      omega_bound_verified: omegaBoundOk
    };
  });

  const hasKI = hasDefinitions && perInvariant.every((entry) => entry.K_i_present);
  const hasOmega = hasDefinitions && perInvariant.every((entry) => entry.omega_i_present);
  const hasEpsilon = hasDefinitions && perInvariant.every((entry) => entry.epsilon_i_present);
  const omegaBoundsVerified = hasDefinitions && perInvariant.every((entry) => entry.omega_bound_verified);
  const epsilonSum = hasEpsilon
    ? definitions.reduce((sum, definition) => sum + definition.declared_epsilon_i, 0)
    : 0;
  const margin = computeDecisionMargin(manifest);
  const h4 = hasEpsilon
    ? verifyH4(margin.delta_star, margin.L_h, epsilonSum)
    : {
      robustness_condition: false,
      delta_star: margin.delta_star,
      L_h: margin.L_h,
      epsilon_sum: 0,
      L_h_epsilon_sum: null,
      margin_excess: null,
      note: "H4 is not evaluable because declared epsilon_i values are missing or invalid."
    };

  return {
    definitions_present: hasDefinitions,
    expected_invariants: EXPECTED_INVARIANTS,
    present_invariants: Array.from(ids),
    K_i_present: hasKI,
    omega_i_present: hasOmega,
    epsilon_i_present: hasEpsilon,
    omega_bounds_verified: omegaBoundsVerified,
    H2_status: hasKI && hasOmega && hasEpsilon && omegaBoundsVerified ? "bounded_operationally" : "missing_or_invalid",
    H4_status: hasEpsilon ? (h4.robustness_condition ? "verified_operationally" : "failed_operationally") : "not_evaluable",
    H4_details: h4,
    decision_margin: margin,
    H3_factorization_claim: bridge.factorization_claim || null,
    H3_status: "not_proved_by_this_gate",
    all_verified: hasDefinitions && hasKI && hasOmega && hasEpsilon && omegaBoundsVerified && h4.robustness_condition,
    governance_boundary: "Operational H2/H4 fixture gate only; H3 and external topological bridge applicability remain unverified."
  };
}

module.exports = {
  EXPECTED_INVARIANTS,
  computeDecisionMargin,
  verifyH4,
  verifyBridgeEstimatorCertificate
};
