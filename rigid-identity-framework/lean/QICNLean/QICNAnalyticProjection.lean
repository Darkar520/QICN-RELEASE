import QICNLean.QICNConvexProjection

/-!
# Closed convex projection over real or complex Hilbert spaces

Real convexity is essential, including for complex Hilbert spaces. No finite
dimension is assumed. Registry anchors: basecore:theorem:thm-projection and
basecore:lemma:lem-nonexp. This reuses the existing general real proof.
-/
namespace QICNLean.AnalyticProjection

noncomputable section

variable {𝕜 H : Type*} [RCLike 𝕜] [NormedAddCommGroup H]
  [InnerProductSpace 𝕜 H] [CompleteSpace H]

local instance : InnerProductSpace ℝ H := InnerProductSpace.rclikeToReal 𝕜 H

/-- The metric projection, with closedness converted to completeness explicitly. -/
def projection (s : Set H) (hne : s.Nonempty) (hs : IsClosed s)
    (hc : Convex ℝ s) (x : H) : H :=
  QICNLean.convexProjection s hne hs.isComplete hc x

theorem projection_mem (s : Set H) (hne : s.Nonempty) (hs : IsClosed s)
    (hc : Convex ℝ s) (x : H) : projection (𝕜 := 𝕜) s hne hs hc x ∈ s :=
  QICNLean.convexProjection_mem hne hs.isComplete hc x

/-- Existence AND uniqueness of the minimizer, for the full Hilbert space. -/
theorem closed_convex_unique_minimizer (s : Set H) (hne : s.Nonempty)
    (hs : IsClosed s) (hc : Convex ℝ s) (x : H) :
    ∃! y : H, y ∈ s ∧ ‖x - y‖ = ⨅ z : s, ‖x - (z : H)‖ := by
  refine ⟨projection (𝕜 := 𝕜) s hne hs hc x, ⟨projection_mem (𝕜 := 𝕜) s hne hs hc x,
    QICNLean.convexProjection_minimizes hne hs.isComplete hc x⟩, ?_⟩
  intro y hy
  exact QICNLean.convex_minimizer_unique hc hy.1
    (projection_mem (𝕜 := 𝕜) s hne hs hc x) hy.2
    (QICNLean.convexProjection_minimizes hne hs.isComplete hc x)

theorem projection_lipschitz (s : Set H) (hne : s.Nonempty)
    (hs : IsClosed s) (hc : Convex ℝ s) :
    LipschitzWith 1 (projection (𝕜 := 𝕜) s hne hs hc) :=
  QICNLean.convexProjection_lipschitz s hne hs.isComplete hc

theorem projection_nonexpansive (s : Set H) (hne : s.Nonempty)
    (hs : IsClosed s) (hc : Convex ℝ s) (x y : H) :
    ‖projection (𝕜 := 𝕜) s hne hs hc x - projection (𝕜 := 𝕜) s hne hs hc y‖ ≤
      ‖x - y‖ := by
  simpa only [NNReal.coe_one, one_mul, dist_eq_norm] using
    (projection_lipschitz (𝕜 := 𝕜) s hne hs hc).dist_le_mul x y

theorem projection_continuous (s : Set H) (hne : s.Nonempty)
    (hs : IsClosed s) (hc : Convex ℝ s) :
    Continuous (projection (𝕜 := 𝕜) s hne hs hc) :=
  (projection_lipschitz (𝕜 := 𝕜) s hne hs hc).continuous

end
end QICNLean.AnalyticProjection
