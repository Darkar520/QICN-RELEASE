/*
 * Exact AR(1) GLS profile-likelihood helper.
 *
 * Governance boundary: this file supplies an internal diagnostic likelihood
 * for finite synthetic records. It is not external validation and it does not
 * certify consciousness, phenomenality, identity transfer, bridge closure, or
 * human review.
 */

const {
  EPSILON,
  aicAiccFromNll,
  clamp,
  estimateRho,
  residualsFor
} = require("./advanced-statistics");

function ar1QuadraticForm(residuals, rho) {
  const n = residuals.length;
  if (n === 0) return 0;
  if (n === 1) return residuals[0] ** 2;
  const safeRho = clamp(rho, -0.98, 0.98);
  const denom = Math.max(EPSILON, 1 - safeRho ** 2);
  let numerator = residuals[0] ** 2 + residuals[n - 1] ** 2;
  for (let i = 1; i < n - 1; i += 1) {
    numerator += (1 + safeRho ** 2) * residuals[i] ** 2;
  }
  for (let i = 1; i < n; i += 1) {
    numerator -= 2 * safeRho * residuals[i] * residuals[i - 1];
  }
  return numerator / denom;
}

function exactAr1ProfileNll(residuals, rho) {
  const n = residuals.length;
  const safeRho = clamp(rho, -0.98, 0.98);
  const quadratic = ar1QuadraticForm(residuals, safeRho);
  const sigma2 = Math.max(EPSILON, quadratic / Math.max(1, n));
  const logDetCorrelation = n > 1 ? (n - 1) * Math.log(Math.max(EPSILON, 1 - safeRho ** 2)) : 0;
  const nll = 0.5 * ((n * Math.log(2 * Math.PI * sigma2)) + logDetCorrelation + n);
  return { nll, quadratic, sigma2, logDetCorrelation };
}

function glsGaussianInformation(points, field, k, penaltyFactor = 1) {
  const residuals = residualsFor(points, field);
  const rho = estimateRho(residuals, { centered: true });
  const profile = exactAr1ProfileNll(residuals, rho);
  const penalties = aicAiccFromNll(profile.nll, residuals.length, k, penaltyFactor);
  return {
    ...penalties,
    nll: profile.nll,
    sse: profile.quadratic,
    sigma2_profile: profile.sigma2,
    residuals,
    rho,
    rho_estimator: "centered_yule_walker_lag1_clamped",
    log_determinant_correlation: profile.logDetCorrelation,
    method: "exact_ar1_gls_profile_likelihood",
    governance_note: "GLS is a finite diagnostic model; it does not convert synthetic support into external evidence."
  };
}

module.exports = {
  ar1QuadraticForm,
  exactAr1ProfileNll,
  glsGaussianInformation
};
