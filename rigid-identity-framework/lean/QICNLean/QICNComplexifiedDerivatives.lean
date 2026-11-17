import QICNLean.QICNComplexificationMaps
import QICNLean.QICNComplexProjectionSpectrum
import QICNLean.QICNRegularEquilibriumDerivatives

/-! Compatibility of real and complex operators, using actual Bochner
integrals. The complex extension is not stipulated by an axiom. -/
namespace QICNLean.ComplexifiedDerivatives

open QICNLean.ComplexificationMaps
noncomputable section

theorem average_inclusion (f : R.B) :
    ComplexBanachWitness.average (inclusion f) =
      vectorInclusion (TypedBanachWitness.average f) := by
  rw [ComplexBanachWitness.average_apply, TypedBanachWitness.average_apply]
  exact vectorInclusion.integral_comp_comm
    (f.continuous.integrable_of_hasCompactSupport (HasCompactSupport.of_compactSpace f))

theorem inclusion_constant (v : R.E) :
    inclusion (TypedBanachWitness.j v) = ComplexBanachWitness.j (vectorInclusion v) := by
  ext x i
  rfl

theorem perpendicular_inclusion (v : R.E) :
    ComplexBanachWitness.perpendicular (vectorInclusion v) =
      vectorInclusion (RegularEquilibriumDerivatives.perpendicular v) := by
  ext i
  by_cases hi : i = 1 <;>
    simp [ComplexBanachWitness.perpendicular_apply,
      RegularEquilibriumDerivatives.perpendicular_apply, hi]

theorem mean_projection_extension (f : R.B) :
    ComplexBanachWitness.meanProjection (inclusion f) =
      inclusion (TypedBanachWitness.j (TypedBanachWitness.average f)) := by
  simp only [ComplexBanachWitness.meanProjection, ContinuousLinearMap.comp_apply,
    average_inclusion, inclusion_constant]

theorem transverse_projection_extension (f : R.B) :
    ComplexBanachWitness.transverseProjection (inclusion f) =
      inclusion (TypedBanachWitness.j
        (RegularEquilibriumDerivatives.perpendicular (TypedBanachWitness.average f))) := by
  simp only [ComplexBanachWitness.transverseProjection, ContinuousLinearMap.comp_apply,
    average_inclusion, perpendicular_inclusion, inclusion_constant]

end
end QICNLean.ComplexifiedDerivatives
