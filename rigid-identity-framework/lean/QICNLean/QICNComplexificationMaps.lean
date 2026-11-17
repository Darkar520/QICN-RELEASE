import QICNLean.QICNComplexBanachWitness
import Mathlib.MeasureTheory.Integral.Bochner.ContinuousLinearMap

/-! Explicit real inclusion and real/imaginary decomposition of the entire
complex continuous-function space. Extension of derivative operators is a
further obligation, not an axiom of these maps. -/
namespace QICNLean.ComplexificationMaps

namespace R
abbrev E := QICNLean.TypedBanachWitness.E
abbrev B := QICNLean.TypedBanachWitness.B
end R
namespace C
abbrev E := QICNLean.ComplexBanachWitness.E
abbrev B := QICNLean.ComplexBanachWitness.B
end C

open scoped unitInterval
noncomputable section

def vectorInclusion : R.E →L[ℝ] C.E :=
  ((EuclideanSpace.equiv (Fin 2) ℂ).symm.toContinuousLinearMap.restrictScalars ℝ).comp
    ((ContinuousLinearMap.pi (fun i : Fin 2 =>
      Complex.ofRealCLM.comp (ContinuousLinearMap.proj i))).comp
        (EuclideanSpace.equiv (Fin 2) ℝ).toContinuousLinearMap)

def vectorRealPart : C.E →L[ℝ] R.E :=
  (EuclideanSpace.equiv (Fin 2) ℝ).symm.toContinuousLinearMap.comp
    ((ContinuousLinearMap.pi (fun i : Fin 2 =>
      Complex.reCLM.comp (ContinuousLinearMap.proj i))).comp
        ((EuclideanSpace.equiv (Fin 2) ℂ).toContinuousLinearMap.restrictScalars ℝ))

def vectorImagPart : C.E →L[ℝ] R.E :=
  (EuclideanSpace.equiv (Fin 2) ℝ).symm.toContinuousLinearMap.comp
    ((ContinuousLinearMap.pi (fun i : Fin 2 =>
      Complex.imCLM.comp (ContinuousLinearMap.proj i))).comp
        ((EuclideanSpace.equiv (Fin 2) ℂ).toContinuousLinearMap.restrictScalars ℝ))

@[simp] theorem vector_inclusion_apply (v : R.E) (i : Fin 2) :
    vectorInclusion v i = (v i : ℂ) := rfl
@[simp] theorem vector_real_apply (v : C.E) (i : Fin 2) :
    vectorRealPart v i = (v i).re := rfl
@[simp] theorem vector_imag_apply (v : C.E) (i : Fin 2) :
    vectorImagPart v i = (v i).im := rfl

def inclusion : R.B →L[ℝ] C.B := vectorInclusion.compLeftContinuous ℝ unitInterval
def realPart : C.B →L[ℝ] R.B := vectorRealPart.compLeftContinuous ℝ unitInterval
def imagPart : C.B →L[ℝ] R.B := vectorImagPart.compLeftContinuous ℝ unitInterval

@[simp] theorem inclusion_apply (f : R.B) (x : unitInterval) (i : Fin 2) :
    inclusion f x i = (f x i : ℂ) := rfl
@[simp] theorem real_part_apply (f : C.B) (x : unitInterval) (i : Fin 2) :
    realPart f x i = (f x i).re := rfl
@[simp] theorem imag_part_apply (f : C.B) (x : unitInterval) (i : Fin 2) :
    imagPart f x i = (f x i).im := rfl

theorem real_inclusion (f : R.B) : realPart (inclusion f) = f := by
  ext x i
  simp

theorem imag_inclusion (f : R.B) : imagPart (inclusion f) = 0 := by
  ext x i
  simp

theorem inclusion_injective : Function.Injective inclusion := by
  intro f g h
  have hh := congrArg realPart h
  simpa only [real_inclusion] using hh

theorem complex_decomposition (f : C.B) :
    f = inclusion (realPart f) + Complex.I • inclusion (imagPart f) := by
  ext x i
  apply Complex.ext <;> simp

end
end QICNLean.ComplexificationMaps
