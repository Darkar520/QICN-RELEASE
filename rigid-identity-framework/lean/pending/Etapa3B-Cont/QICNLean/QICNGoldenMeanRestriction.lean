import QICNLean.QICNGoldenMeanParameter
import QICNLean.QICNTypedRelaxation

/-! Restriction of the full analytic operator results to the encoded source domain. -/
namespace QICNLean.GoldenMeanParameter

noncomputable section

theorem parameter_differentiability (u : ℝ) (hu : u ∈ parameterSet) :
    DifferentiableAt ℝ (TypedBanachWitness.transition u) (TypedBanachWitness.equilibrium u) ↔
      u ≠ 1 / 2 :=
  BoundaryObstruction.differentiable_iff_regular u (parameter_mem_interval u hu).1

theorem parameter_efolding_bounds (u : ℝ) (hu : u ∈ parameterSet) (hne : u ≠ 1 / 2) :
    1 / Real.log 3 ≤ -1 / Real.log
      ‖fderiv ℝ (TypedBanachWitness.transition u) (TypedBanachWitness.equilibrium u)‖ ∧
    -1 / Real.log ‖fderiv ℝ (TypedBanachWitness.transition u)
      (TypedBanachWitness.equilibrium u)‖ ≤ 1 / Real.log 2 :=
  TypedRelaxation.regular_efolding_bounds u (parameter_mem_interval u hu).1
    (parameter_mem_interval u hu).2 hne

end
end QICNLean.GoldenMeanParameter
