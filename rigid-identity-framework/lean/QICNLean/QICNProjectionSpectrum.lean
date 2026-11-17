import Mathlib.Tactic.Abel
import Mathlib.FieldTheory.IsAlgClosed.Spectrum
import Mathlib.Analysis.Normed.Algebra.Spectrum

/-!
Exact spectrum of a nontrivial idempotent in an arbitrary algebra, including
infinite-dimensional operator algebras. No finite matrix replacement is used.
The concrete Banach/complexification realization is a separate obligation.
-/
namespace QICNLean.ProjectionSpectrum

open Set
open scoped Pointwise
noncomputable section

lemma idempotent_unit_eq_one {A : Type*} [Monoid A] {p : A}
    (hp : IsIdempotentElem p) (hu : IsUnit p) : p = 1 := by
  rcases hu with ⟨v, rfl⟩
  have hh := congrArg (fun z : A => z * (↑v⁻¹ : A)) hp.eq
  simpa [mul_assoc] using hh

lemma complement_idempotent {A : Type*} [Ring A] {p : A}
    (hp : IsIdempotentElem p) : IsIdempotentElem (1 - p) := by
  change (1 - p) * (1 - p) = 1 - p
  simp only [mul_sub, sub_mul, one_mul, mul_one, hp.eq]
  abel

theorem idempotent_spectrum {𝕜 A : Type*} [Field 𝕜] [Ring A] [Algebra 𝕜 A]
    (p : A) (hp : IsIdempotentElem p) (hp0 : p ≠ 0) (hp1 : p ≠ 1) :
    spectrum 𝕜 p = {0, 1} := by
  apply Set.Subset.antisymm (hp.spectrum_subset 𝕜)
  intro z hz
  rcases hz with (rfl | rfl)
  · rw [spectrum.zero_mem_iff]
    exact fun h => hp1 (idempotent_unit_eq_one hp h)
  · rw [spectrum.mem_iff, map_one]
    intro h
    have hh := idempotent_unit_eq_one (complement_idempotent hp) h
    exact hp0 (sub_eq_self.mp hh)

theorem scaled_idempotent_spectrum {𝕜 A : Type*} [Field 𝕜] [Ring A] [Nontrivial A]
    [Algebra 𝕜 A] (p : A) (hp : IsIdempotentElem p) (hp0 : p ≠ 0) (hp1 : p ≠ 1)
    (c : 𝕜) : spectrum 𝕜 (c • p) = {0, c} := by
  have hs := idempotent_spectrum (𝕜 := 𝕜) p hp hp0 hp1
  have hn : (spectrum 𝕜 p).Nonempty := by rw [hs]; exact ⟨0, by simp⟩
  rw [spectrum.smul_eq_smul c p hn, hs, Set.smul_set_insert, Set.smul_set_singleton]
  simp

theorem scaled_idempotent_radius {𝕜 A : Type*} [NormedField 𝕜] [Ring A] [Nontrivial A]
    [Algebra 𝕜 A] (p : A) (hp : IsIdempotentElem p) (hp0 : p ≠ 0) (hp1 : p ≠ 1)
    (c : 𝕜) : spectralRadius 𝕜 (c • p) = ENNReal.ofReal ‖c‖ := by
  rw [spectralRadius, scaled_idempotent_spectrum p hp hp0 hp1, iSup_pair]
  simp only [nnnorm_zero, ENNReal.coe_zero]
  rw [max_eq_right (by positivity : (0 : ENNReal) ≤ (‖c‖₊ : ENNReal))]
  exact (ofReal_norm c).symm

end
end QICNLean.ProjectionSpectrum
