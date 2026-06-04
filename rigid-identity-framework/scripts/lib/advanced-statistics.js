/*
 * Shared small-n statistical diagnostics for QICN synthetic adjudicators.
 *
 * Governance boundary: these helpers implement local model-comparison
 * diagnostics only. They do not certify external support, consciousness,
 * phenomenality, identity transfer, bridge-burden closure, or human review.
 */

const EPSILON = 1e-12;

function mean(xs) {
  return xs.reduce((sum, value) => sum + value, 0) / xs.length;
}

function clamp(value, lower, upper) {
  return Math.max(lower, Math.min(upper, value));
}

function residualsFor(points, field) {
  return points.map((point) => point.observed_delta - point[field]);
}

function aicAiccFromNll(nll, n, k, penaltyFactor = 1) {
  const aic = 2 * k * penaltyFactor + 2 * nll;
  const denominator = n - k - 1;
  const overparameterized = denominator <= 0;
  const aicc = overparameterized ? Number.POSITIVE_INFINITY : aic + (2 * k * (k + 1)) / denominator;
  return {
    aic,
    aicc,
    overparameterized,
    aicc_correction: overparameterized ? null : aicc - aic
  };
}

/**
 * Yule-Walker lag-1 autocorrelation estimator.
 *
 * Small-sample bias: E[rho_hat] is approximately
 * rho - (1 + 3*rho)/(n + 1) under the classical Kendall expansion.
 * For n=8 and rho=0.375, this is a large downward bias. The estimator is
 * intentionally not bias-corrected because this runner uses it as a
 * conservative diagnostic gate, not as a publication-grade time-series model.
 * Centering removes bias from a nonzero residual mean, but not the
 * small-sample Yule-Walker bias.
 */
function estimateRho(residuals, options = {}) {
  if (!Array.isArray(residuals) || residuals.length < 2) return 0;
  const centered = options.centered !== false;
  const center = centered ? mean(residuals) : 0;
  let numerator = 0;
  let denominator = 0;
  for (let i = 1; i < residuals.length; i += 1) {
    numerator += (residuals[i] - center) * (residuals[i - 1] - center);
  }
  for (const residual of residuals) {
    denominator += (residual - center) ** 2;
  }
  if (denominator <= EPSILON) return 0;
  const bound = options.bound ?? 0.98;
  return clamp(numerator / denominator, -bound, bound);
}

function praisWinstenInnovations(residuals, rho) {
  if (!Array.isArray(residuals) || residuals.length === 0) return [];
  const safeRho = clamp(rho, -0.98, 0.98);
  const firstScale = Math.sqrt(Math.max(EPSILON, 1 - safeRho ** 2));
  const innovations = [firstScale * residuals[0]];
  for (let i = 1; i < residuals.length; i += 1) {
    innovations.push(residuals[i] - safeRho * residuals[i - 1]);
  }
  return innovations;
}

function profileGaussianNll(values) {
  const n = values.length;
  const sse = values.reduce((sum, value) => sum + value ** 2, 0);
  const sigma2 = Math.max(EPSILON, sse / Math.max(1, n));
  return {
    nll: 0.5 * n * (Math.log(2 * Math.PI * sigma2) + 1),
    sse,
    sigma2
  };
}

function correctedGaussianInformation(points, field, k, penaltyFactor = 1) {
  const rawResiduals = residualsFor(points, field);
  const rho = estimateRho(rawResiduals, { centered: true });
  const innovations = praisWinstenInnovations(rawResiduals, rho);
  const profile = profileGaussianNll(innovations);
  const jacobianCorrection = -0.5 * Math.log(Math.max(EPSILON, 1 - (rho * rho)));
  const correctedNll = profile.nll + jacobianCorrection;
  const penalties = aicAiccFromNll(correctedNll, innovations.length, k, penaltyFactor);
  return {
    ...penalties,
    nll: correctedNll,
    sse: profile.sse,
    sigma2_profile: profile.sigma2,
    residuals: innovations,
    raw_residuals: rawResiduals,
    raw_sse: rawResiduals.reduce((sum, value) => sum + value ** 2, 0),
    jacobian_correction: jacobianCorrection,
    rho,
    rho_estimator: "centered_yule_walker_lag1_clamped",
    correction_method: "prais_winsten_profile_gaussian_with_jacobian",
    governance_note: "rho is centered; uncentered rho diagnostics are not used as autocorrelation evidence. The Prais-Winsten Jacobian correction is included for consistency with the GLS diagnostic path."
  };
}

function entropyFromCounts(counts, n) {
  let entropy = 0;
  let occupied = 0;
  for (const count of counts) {
    if (count <= 0) continue;
    occupied += 1;
    const p = count / n;
    entropy -= p * Math.log(p);
  }
  return { entropy, occupied };
}

function equalWidthBin(value, min, max, bins) {
  if (max === min) return 0;
  const raw = Math.floor(((value - min) / (max - min)) * bins);
  return Math.max(0, Math.min(bins - 1, raw));
}

function mutualInformationMillerMadow(x, y, binCount = Math.ceil(Math.sqrt(x.length))) {
  if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length || x.length < 2) return 0;
  const n = x.length;
  const bins = Math.max(2, binCount);
  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  const yMin = Math.min(...y);
  const yMax = Math.max(...y);
  if (xMin === xMax || yMin === yMax) return 0;

  const xCounts = Array.from({ length: bins }, () => 0);
  const yCounts = Array.from({ length: bins }, () => 0);
  const jointCounts = Array.from({ length: bins * bins }, () => 0);
  for (let i = 0; i < n; i += 1) {
    const bx = equalWidthBin(x[i], xMin, xMax, bins);
    const by = equalWidthBin(y[i], yMin, yMax, bins);
    xCounts[bx] += 1;
    yCounts[by] += 1;
    jointCounts[(bx * bins) + by] += 1;
  }

  const hx = entropyFromCounts(xCounts, n);
  const hy = entropyFromCounts(yCounts, n);
  const hxy = entropyFromCounts(jointCounts, n);
  const plugin = hx.entropy + hy.entropy - hxy.entropy;
  const millerMadowCorrection = (hx.occupied + hy.occupied - hxy.occupied - 1) / (2 * n);
  return Math.max(0, plugin + millerMadowCorrection);
}

module.exports = {
  EPSILON,
  mean,
  clamp,
  residualsFor,
  aicAiccFromNll,
  estimateRho,
  praisWinstenInnovations,
  profileGaussianNll,
  correctedGaussianInformation,
  mutualInformationMillerMadow
};
