import Mathlib.LinearAlgebra.Matrix.Determinant.Basic
import Mathlib.Data.Real.Basic
import Mathlib.Tactic.FinCases
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Ring
import Mathlib.Tactic.FieldSimp
import Mathlib.Tactic.Linarith

open scoped Matrix BigOperators

noncomputable section

namespace QICNLean

/-- Paper IX: indexed coordinates can permute this identity-role Hankel. -/
def bodyWorldHankel (t a : ℝ) : Matrix (Fin 4) (Fin 4) ℝ :=
  !![0, 0, t, 0; 0, 0, 0, t; t, 0, 2*a*t, 0; 0, t, 0, 2*a*t]

/-- Explicit inverse, valid for every nonzero impulse scale. -/
def bodyWorldHankelInverse (t a : ℝ) : Matrix (Fin 4) (Fin 4) ℝ :=
  !![-2*a/t, 0, 1/t, 0; 0, -2*a/t, 0, 1/t; 1/t, 0, 0, 0; 0, 1/t, 0, 0]

theorem body_world_hankel_det (t a : ℝ) :
    (bodyWorldHankel t a).det = t^4 := by
  simp [bodyWorldHankel, Matrix.det_succ_row_zero, Fin.sum_univ_succ,
    Matrix.submatrix, Fin.succAbove]
  <;> ring

theorem body_world_hankel_inverse_left (t a : ℝ) (ht : t ≠ 0) :
    bodyWorldHankelInverse t a * bodyWorldHankel t a = 1 := by
  ext i j
  fin_cases i <;> fin_cases j <;>
    simp [bodyWorldHankelInverse, bodyWorldHankel, Matrix.mul_apply,
      Fin.sum_univ_succ, Matrix.one_apply, ht] <;> field_simp <;> ring

theorem body_world_hankel_inverse_right (t a : ℝ) (ht : t ≠ 0) :
    bodyWorldHankel t a * bodyWorldHankelInverse t a = 1 := by
  ext i j
  fin_cases i <;> fin_cases j <;>
    simp [bodyWorldHankelInverse, bodyWorldHankel, Matrix.mul_apply,
      Fin.sum_univ_succ, Matrix.one_apply, ht] <;> field_simp <;> ring

theorem body_world_hankel_det_nonzero (t a : ℝ) (ht : t ≠ 0) :
    (bodyWorldHankel t a).det ≠ 0 := by
  rw [body_world_hankel_det]
  exact pow_ne_zero 4 ht

theorem body_world_hankel_columns_independent (t a : ℝ) (ht : t ≠ 0) :
    LinearIndependent ℝ (Matrix.col (bodyWorldHankel t a)) :=
  Matrix.linearIndependent_cols_of_det_ne_zero (body_world_hankel_det_nonzero t a ht)

theorem body_world_hankel_det_at_scale :
    (bodyWorldHankel (1/16) (1/4)).det = 1/65536 := by
  rw [body_world_hankel_det]
  norm_num

/-- The alternate prepared role swaps both sensory coordinates. -/
def bodyWorldIndexedHankel (t a : ℝ) (swap : Bool) : Matrix (Fin 4) (Fin 4) ℝ :=
  if swap then
    !![0,0,0,t; 0,0,t,0; 0,t,0,2*a*t; t,0,2*a*t,0]
  else bodyWorldHankel t a

theorem body_world_indexed_hankel_det (t a : ℝ) (swap : Bool) :
    (bodyWorldIndexedHankel t a swap).det = t^4 := by
  cases swap
  · simpa [bodyWorldIndexedHankel] using body_world_hankel_det t a
  · simp [bodyWorldIndexedHankel, Matrix.det_succ_row_zero, Fin.sum_univ_succ,
      Matrix.submatrix, Fin.succAbove]
    <;> ring

theorem body_world_indexed_hankel_columns_independent (t a : ℝ)
    (ht : t ≠ 0) (swap : Bool) :
    LinearIndependent ℝ (Matrix.col (bodyWorldIndexedHankel t a swap)) := by
  apply Matrix.linearIndependent_cols_of_det_ne_zero
  rw [body_world_indexed_hankel_det]
  exact pow_ne_zero 4 ht

theorem body_world_hankel_inverse_row_bound (i : Fin 4) :
    (∑ j : Fin 4, |bodyWorldHankelInverse (1/16) (1/4) i j|) ≤ 24 := by
  fin_cases i <;>
    norm_num [bodyWorldHankelInverse, Fin.sum_univ_succ]

theorem body_world_hankel_inverse_row_sharp :
    (∑ j : Fin 4, |bodyWorldHankelInverse (1/16) (1/4) 0 j|) = 24 := by
  norm_num [bodyWorldHankelInverse, Fin.sum_univ_succ]

/-- The only order-three return term in the fourth body reading. -/
def bodyWorldMotorFourth (h a beta mu : ℝ) : ℝ := h*(3*a^2*beta + mu*beta^3)

def bodyWorldMotorThird (h a beta : ℝ) : ℝ := 2*h*a*beta

theorem body_world_motor_residual (h a beta mu : ℝ) :
    bodyWorldMotorFourth h a beta mu - (3*a/2)*bodyWorldMotorThird h a beta =
      mu*h*beta^3 := by
  unfold bodyWorldMotorFourth bodyWorldMotorThird
  ring

theorem body_world_motor_signed_residual (mu : ℝ) :
    bodyWorldMotorFourth (1/4) (1/4) (1/4) mu -
      (3*(1/4)/2)*bodyWorldMotorThird (1/4) (1/4) (1/4) = mu/256 := by
  rw [body_world_motor_residual]
  ring

theorem body_world_motor_sign_gap :
    bodyWorldMotorFourth (1/4) (1/4) (1/4) 1 -
      bodyWorldMotorFourth (1/4) (1/4) (1/4) (-1) = 2/256 := by
  norm_num [bodyWorldMotorFourth]

theorem body_world_motor_cut_residual :
    bodyWorldMotorFourth (1/4) (1/4) (1/4) 0 -
      (3*(1/4)/2)*bodyWorldMotorThird (1/4) (1/4) (1/4) = 0 := by
  rw [body_world_motor_signed_residual]
  norm_num

/-- Loss of local certificate presence after the six declared physical lesions.
Rows and columns are D,V,W,A,E,T. Non-diagonal entries express mediation. -/
def bodyWorldLesionLoss : Matrix (Fin 6) (Fin 6) ℝ :=
  !![1,0,1,0,0,0; 0,1,0,0,0,0; 0,1,1,0,0,0;
     0,0,0,1,0,0; 0,1,0,0,1,0; 0,0,0,0,0,1]

def bodyWorldLesionInverse : Matrix (Fin 6) (Fin 6) ℝ :=
  !![1,1,-1,0,0,0; 0,1,0,0,0,0; 0,-1,1,0,0,0;
     0,0,0,1,0,0; 0,-1,0,0,1,0; 0,0,0,0,0,1]

theorem body_world_lesion_inverse_left :
    bodyWorldLesionInverse * bodyWorldLesionLoss = 1 := by
  ext i j
  fin_cases i <;> fin_cases j <;>
    norm_num [bodyWorldLesionInverse, bodyWorldLesionLoss, Matrix.mul_apply,
      Fin.sum_univ_succ, Matrix.one_apply]

theorem body_world_lesion_inverse_right :
    bodyWorldLesionLoss * bodyWorldLesionInverse = 1 := by
  ext i j
  fin_cases i <;> fin_cases j <;>
    norm_num [bodyWorldLesionInverse, bodyWorldLesionLoss, Matrix.mul_apply,
      Fin.sum_univ_succ, Matrix.one_apply]

theorem body_world_lesion_det_nonzero : bodyWorldLesionLoss.det ≠ 0 := by
  have h := congrArg Matrix.det body_world_lesion_inverse_left
  rw [Matrix.det_mul, Matrix.det_one] at h
  intro hz
  rw [hz, mul_zero] at h
  norm_num at h

theorem body_world_lesion_columns_independent :
    LinearIndependent ℝ (Matrix.col bodyWorldLesionLoss) :=
  Matrix.linearIndependent_cols_of_det_ne_zero body_world_lesion_det_nonzero

end QICNLean
