"use strict";

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : 0));
}

function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

function featureVector(window) {
  return [1, window.report_signal || 0, window.confidence || 0, window.state_monitoring || 0];
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function trainLogistic(rows, steps = 160, learningRate = 0.18) {
  const weights = [0, 0, 0, 0];
  for (let step = 0; step < steps; step += 1) {
    const grad = [0, 0, 0, 0];
    for (const row of rows) {
      const x = featureVector(row);
      const y = row.awareness_target ? 1 : 0;
      const p = sigmoid(dot(weights, x));
      for (let i = 0; i < weights.length; i += 1) grad[i] += (p - y) * x[i];
    }
    for (let i = 0; i < weights.length; i += 1) weights[i] -= learningRate * grad[i] / Math.max(1, rows.length);
  }
  return weights;
}

function auc(predictions) {
  const positives = predictions.filter((item) => item.y === 1);
  const negatives = predictions.filter((item) => item.y === 0);
  if (positives.length === 0 || negatives.length === 0) return 0.5;
  let wins = 0;
  for (const pos of positives) {
    for (const neg of negatives) {
      if (pos.p > neg.p) wins += 1;
      else if (pos.p === neg.p) wins += 0.5;
    }
  }
  return wins / (positives.length * negatives.length);
}

function calibrationError(predictions, bins = 5) {
  let total = 0;
  for (let b = 0; b < bins; b += 1) {
    const lo = b / bins;
    const hi = (b + 1) / bins;
    const bucket = predictions.filter((item) => item.p >= lo && (b === bins - 1 ? item.p <= hi : item.p < hi));
    if (bucket.length === 0) continue;
    const meanP = bucket.reduce((sum, item) => sum + item.p, 0) / bucket.length;
    const meanY = bucket.reduce((sum, item) => sum + item.y, 0) / bucket.length;
    total += (bucket.length / predictions.length) * Math.abs(meanP - meanY);
  }
  return total;
}

function foldFor(index, folds) {
  return index % folds;
}

function computeHotHoa(trace, options = {}) {
  const rows = trace.windows || [];
  const folds = Math.max(2, Math.min(options.folds || 5, rows.length));
  const predictions = [];
  for (let fold = 0; fold < folds; fold += 1) {
    const train = rows.filter((_, index) => foldFor(index, folds) !== fold);
    const test = rows.filter((_, index) => foldFor(index, folds) === fold);
    const weights = trainLogistic(train);
    for (const row of test) {
      predictions.push({
        y: row.awareness_target ? 1 : 0,
        p: clamp(sigmoid(dot(weights, featureVector(row))))
      });
    }
  }
  const score = {
    HOT_HOA_AUC: auc(predictions),
    HOT_HOA_ECE: calibrationError(predictions),
    HOT_HOA_PASS: false,
    predictions,
    feature_budget: 3,
    boundary: "Minimal operational HOT arm only. This is not the full HOT literature and not consciousness evidence."
  };
  score.HOT_HOA_PASS = score.HOT_HOA_AUC >= 0.75 && score.HOT_HOA_ECE <= 0.10;
  return score;
}

module.exports = {
  computeHotHoa,
  trainLogistic,
  auc,
  calibrationError
};
