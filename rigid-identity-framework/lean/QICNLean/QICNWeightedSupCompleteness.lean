import QICNLean.QICNWeightedSupMetric
import Mathlib.Topology.MetricSpace.Cauchy

/-!
Coordinate continuity and completeness for the actual infinite weighted SUP
extended metric. No summation metric is introduced.
-/
namespace QICNLean.WeightedSupCompleteness

open QICNLean.WeightedSupMetric Filter
open scoped Topology ENNReal
noncomputable section
universe u

variable {w : Weights} {S : ℕ → Type u} [∀ n, EMetricSpace (S n)]

theorem coordinate_lipschitz (n : ℕ) :
    LipschitzWith (w.value n)⁻¹ (fun x : Carrier w S => x.coord n) := by
  intro x y
  rw [ENNReal.coe_inv (w.positive n).ne']
  apply (ENNReal.mul_le_iff_le_inv (by exact_mod_cast (w.positive n).ne')
    ENNReal.coe_ne_top).mp
  exact coordinate_le_rho x y n

theorem coordinate_cauchy (f : ℕ → Carrier w S) (hf : CauchySeq f) (n : ℕ) :
    CauchySeq (fun k => (f k).coord n) :=
  (coordinate_lipschitz n).uniformContinuous.comp_cauchySeq hf

theorem carrier_complete [∀ n, CompleteSpace (S n)] : CompleteSpace (Carrier w S) := by
  apply EMetric.complete_of_cauchySeq_tendsto
  intro f hf
  have hex (n : ℕ) : ∃ a : S n, Tendsto (fun k => (f k).coord n) atTop (𝓝 a) :=
    cauchySeq_tendsto_of_complete (coordinate_cauchy f hf n)
  choose a ha using hex
  refine ⟨⟨a⟩, EMetric.tendsto_atTop.mpr ?_⟩
  intro ε hε
  obtain ⟨δ, hδ0, hδε⟩ := exists_between hε
  obtain ⟨N, hN⟩ := EMetric.cauchySeq_iff.mp hf δ hδ0
  refine ⟨N, fun k hk => lt_of_le_of_lt ?_ hδε⟩
  change rho (f k) ⟨a⟩ ≤ δ
  apply iSup_le
  intro n
  have hed : Tendsto (fun l => edist ((f k).coord n) ((f l).coord n)) atTop
      (𝓝 (edist ((f k).coord n) (a n))) :=
    tendsto_const_nhds.edist (ha n)
  have hw : Tendsto
      (fun l => (w.value n : ℝ≥0∞) * edist ((f k).coord n) ((f l).coord n)) atTop
      (𝓝 ((w.value n : ℝ≥0∞) * edist ((f k).coord n) (a n))) :=
    ENNReal.Tendsto.const_mul hed (Or.inr ENNReal.coe_ne_top)
  apply le_of_tendsto hw
  filter_upwards [eventually_ge_atTop N] with l hl
  exact (coordinate_le_rho (f k) (f l) n).trans (hN k hk l hl).le

instance [∀ n, CompleteSpace (S n)] : CompleteSpace (Carrier w S) := carrier_complete

theorem sector_complete [∀ n, CompleteSpace (S n)] (b : Carrier w S) :
    CompleteSpace (Sector b) :=
  (sector_closed b).isComplete.completeSpace_coe

/-- Coordinate convergence plus a common vanishing weighted tail implies SUP
convergence. The tail is a hypothesis, not inferred from summability alone. -/
theorem sup_tendsto_of_coordinates_and_tail {ι : Type*} {l : Filter ι}
    (f : ι → Carrier w S) (a : Carrier w S)
    (hc : ∀ n, Tendsto (fun k => (f k).coord n) l (𝓝 (a.coord n)))
    (ht : ∀ ε : ℝ≥0∞, 0 < ε → ∃ N : ℕ, ∀ n ≥ N, ∀ k,
      (w.value n : ℝ≥0∞) * edist ((f k).coord n) (a.coord n) ≤ ε) :
    Tendsto f l (𝓝 a) := by
  apply EMetric.tendsto_nhds.mpr
  intro ε hε
  obtain ⟨δ, hδ0, hδε⟩ := exists_between hε
  obtain ⟨N, hN⟩ := ht δ hδ0
  have hp (n : Fin N) : ∀ᶠ k in l,
      (w.value n : ℝ≥0∞) * edist ((f k).coord n) (a.coord n) < δ := by
    have hed : Tendsto (fun k => edist ((f k).coord n) (a.coord n)) l (𝓝 0) := by
      simpa using (hc n).edist
        (tendsto_const_nhds : Tendsto (fun _ : ι => a.coord n) l (𝓝 (a.coord n)))
    have hw : Tendsto
        (fun k => (w.value n : ℝ≥0∞) * edist ((f k).coord n) (a.coord n)) l (𝓝 0) := by
      simpa using ENNReal.Tendsto.const_mul hed (Or.inr ENNReal.coe_ne_top)
    exact hw.eventually (gt_mem_nhds hδ0)
  have hall : ∀ᶠ k in l, ∀ n : Fin N,
      (w.value n : ℝ≥0∞) * edist ((f k).coord n) (a.coord n) < δ :=
    Filter.eventually_all.mpr hp
  filter_upwards [hall] with k hk
  apply lt_of_le_of_lt _ hδε
  change rho (f k) a ≤ δ
  apply iSup_le
  intro n
  by_cases hn : n < N
  · exact (hk ⟨n, hn⟩).le
  · exact hN n (Nat.le_of_not_gt hn) k

end
end QICNLean.WeightedSupCompleteness
