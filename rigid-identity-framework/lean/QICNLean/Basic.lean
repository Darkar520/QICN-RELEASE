import Mathlib.Topology.MetricSpace.Basic

/-!
# QICN Lean smoke test

This non-canonical file only verifies that the Lean/mathlib toolchain can build
a minimal metric-space theorem.
-/

namespace QICNLean

theorem mathlib_metric_smoke
    {X : Type*} [PseudoMetricSpace X] (x : X) : dist x x = 0 := by
  simp

end QICNLean
