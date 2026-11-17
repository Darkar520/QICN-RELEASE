import QICNLean.QICNGoldenMeanBoundary
import Mathlib.Analysis.Real.Sqrt

/-! The literal parameter ratio of the manuscript, without importing the
unrelated Fibonacci or irrationality parts of the golden-ratio library. -/
namespace QICNLean.GoldenMeanParameter

open QICNLean.GoldenMeanDomain
noncomputable section

def phi : ℝ := (1 + Real.sqrt 5) / 2
def ratio : ℝ := phi⁻¹

theorem phi_gt_one : 1 < phi := by
  have hs := Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 5)
  have hp := Real.sqrt_nonneg (5 : ℝ)
  unfold phi
  nlinarith

theorem phi_quadratic : phi ^ 2 = phi + 1 := by
  have hs := Real.sq_sqrt (by norm_num : (0 : ℝ) ≤ 5)
  unfold phi
  nlinarith

theorem ratio_positive : 0 < ratio := inv_pos.mpr (by linarith [phi_gt_one])
theorem ratio_lt_one : ratio < 1 := inv_lt_one_of_one_lt₀ phi_gt_one

theorem ratio_quadratic : ratio + ratio ^ 2 = 1 := by
  have hp : phi ≠ 0 := ne_of_gt (by linarith [phi_gt_one])
  unfold ratio
  field_simp
  nlinarith [phi_quadratic]

def parameterSet : Set ℝ := {u | ∃ x : ℕ → Bool, admissible x ∧ encoding ratio x = u}

theorem parameter_mem_interval (u : ℝ) (hu : u ∈ parameterSet) : u ∈ Set.Icc (0 : ℝ) 1 := by
  obtain ⟨x, hx, rfl⟩ := hu
  exact encoding_mem_unit_interval ratio ratio_positive.le ratio_lt_one.le ratio_quadratic x hx

theorem half_mem_parameter_set : (1 / 2 : ℝ) ∈ parameterSet :=
  ⟨GoldenMeanBoundary.halfStream, GoldenMeanBoundary.half_stream_admissible,
    GoldenMeanBoundary.half_encoding ratio ratio_positive ratio_lt_one ratio_quadratic⟩


end
end QICNLean.GoldenMeanParameter
