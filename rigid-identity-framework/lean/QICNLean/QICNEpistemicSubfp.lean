import Mathlib.Data.Real.Basic
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Ring

/-! Finite/ordered kernels for the explicitly typed indexed-routing protocol.
The universal pair-function inequality below covers the entire finite sign
cube, not fitted coefficients. Ancestry closure, randomized kernels, complete
infinite compactness, all six global predicates, experimental admissibility,
and real seventh-root interpretation of the product remain TeX arguments.
The binary-tree lemma is not a theorem about arbitrary shared-circuit cost.
No declaration certifies subjectivity, physical calibration or external support.
-/

namespace QICNLean.EpistemicSubfp

structure CubeValues where
  v0 : ℝ
  v1 : ℝ
  v2 : ℝ
  v3 : ℝ
  v4 : ℝ
  v5 : ℝ
  v6 : ℝ
  v7 : ℝ

def energy (v : CubeValues) : ℝ :=
  v.v0^2+v.v1^2+v.v2^2+v.v3^2+v.v4^2+v.v5^2+v.v6^2+v.v7^2

def parityMoment (v : CubeValues) : ℝ :=
  v.v0-v.v1-v.v2+v.v3-v.v4+v.v5+v.v6-v.v7

def errorSum (v : CubeValues) : ℝ :=
  (1-v.v0)^2+(-1-v.v1)^2+(-1-v.v2)^2+(1-v.v3)^2+
  (-1-v.v4)^2+(1-v.v5)^2+(1-v.v6)^2+(-1-v.v7)^2

theorem energy_nonnegative (v : CubeValues) : 0 ≤ energy v := by
  unfold energy
  nlinarith only [sq_nonneg v.v0,sq_nonneg v.v1,sq_nonneg v.v2,sq_nonneg v.v3,
    sq_nonneg v.v4,sq_nonneg v.v5,sq_nonneg v.v6,sq_nonneg v.v7]

theorem parity_error_identity (v : CubeValues) :
    errorSum v = 8+energy v-2*parityMoment v := by
  dsimp [errorSum,energy,parityMoment]
  ring

def pairValues (p q r : Bool → Bool → ℝ) : CubeValues :=
  ⟨p false false+q false false+r false false,
   p false false+q false true+r false true,
   p false true+q false false+r true false,
   p false true+q false true+r true true,
   p true false+q true false+r false false,
   p true false+q true true+r false true,
   p true true+q true false+r true false,
   p true true+q true true+r true true⟩

theorem all_pair_functions_orthogonal (p q r : Bool → Bool → ℝ) :
    parityMoment (pairValues p q r) = 0 := by
  dsimp [parityMoment,pairValues]
  ring

theorem all_pair_functions_loss (p q r : Bool → Bool → ℝ) :
    1 ≤ errorSum (pairValues p q r)/8 := by
  rw [parity_error_identity,all_pair_functions_orthogonal]
  have nonneg := energy_nonnegative (pairValues p q r)
  linarith

theorem weak_three_term_bound (base intervention contrast cost : ℝ)
    (hb : 1 ≤ base) (hi : 4/5 ≤ intervention) (hc : 1 ≤ contrast)
    (nonnegative : 0 ≤ cost) :
    (14/15 : ℝ) ≤ (base+intervention+contrast)/3+cost/16 := by
  linarith

theorem strict_budget_margin :
    ((1+(8 : ℚ)/10+1)/3 = 14/15) ∧
    (14/15-3/16 : ℚ) = 179/240 ∧
    ((14/15-3/16)/(1+14/15) : ℚ) = 179/464 ∧
    ((14/15-3/16)/(313/240+14/15) : ℚ) = 1/3 := by
  norm_num

theorem fewer_gate_contrast_excludes_optimality (error cost : ℝ)
    (contrast : 1/3 ≤ error) (nonnegative : 0 ≤ cost) :
    (3/16 : ℝ) < error+cost/16 := by
  linarith

def nativeProduct : ℚ :=
  1*(1/2)*(1/2)*(1/3)*(64/266529)*1*(179/464)

theorem native_coordinates_and_gate :
    (0 : ℚ) < 64/266529 ∧ (64/266529 : ℚ) ≤ 1 ∧
    min 1 (min (1/2) (min (1/2) (min (1/3)
      (min (64/266529) (min 1 (179/464)))))) = (64/266529 : ℚ) ∧
    (1/8192 : ℚ) < 64/266529 := by
  norm_num

theorem positive_scalar_polynomial_certificate :
    nativeProduct = (179/5568 : ℚ)*(64/266529) ∧
    (1/8 : ℚ)^7 < nativeProduct ∧
    (1/16 : ℚ)^7 < (1/8 : ℚ)^7 ∧
    (1/8192 : ℚ) < 1/16 ∧ (7 : ℚ)*(1/7)=1 := by
  norm_num [nativeProduct]

theorem realized_scalar_independence_kernel :
    (1/8192 : ℚ) < 1/4096 ∧
    (1/4096 : ℚ)^6 < (1/16 : ℚ)^7 ∧
    (1/16384 : ℚ) < 1/4096 ∧
    (0 : ℚ) < (179/240)/(1/4096)-14/15 ∧
    (0 : ℚ) < 1-4385/262144 := by
  norm_num

def response (r : ℚ) : ℚ := (1+r^2)/64

theorem valuation_exact_and_symmetric :
    response (17/64) = 4385/262144 ∧
    response (15/64) = 4321/262144 ∧
    (response (17/64)-response (15/64))/(1+response (17/64))=64/266529 ∧
    response (1/4)-response (1/4)=0 ∧
    (response (15/64)-response (17/64))/(1+response (15/64))=-64/266465 := by
  norm_num [response]

theorem feedback_returns_exactly (r target error : ℝ) :
    r*(target+error)+4*(target-r*(target+error))/4 = target := by
  ring

theorem active_passive_gain (r : ℝ) (hr : r ≤ 1) :
    min 1 (1-(1-r)) = r := by
  have : 1-(1-r)=r := by ring
  rw [this,min_eq_right hr]

theorem operational_margins :
    (1/47 : ℚ) = (1/2)/(32*(1-17/64)) ∧
    (1/2-1/47 : ℚ) = 45/94 ∧
    (1/4 : ℚ) < 45/94 ∧ (1/8 : ℚ) < 17/64 ∧
    (1/256 : ℚ) < 1/128 ∧ (3/4096 : ℚ) < 3/2048 := by
  norm_num

theorem ownership_zero_after_collapse :
    (1/2-1/2 : ℚ)=0 ∧ (1/2-1 : ℚ)=-1/2 ∧
    max 0 (1/2-1 : ℚ)=0 := by
  norm_num

theorem emulator_forces_nonpositive_margin (weak full : ℝ)
    (emulator : weak ≤ full) : weak-full ≤ 0 := by
  linarith

theorem same_cost_emulator_exact : (3/16-3/16 : ℚ)=0 := by norm_num

inductive BinaryTree where
  | leaf
  | node (left right : BinaryTree)

def operationCount : BinaryTree → ℕ
  | .leaf => 0
  | .node l r => operationCount l+operationCount r+1

def leafCount : BinaryTree → ℕ
  | .leaf => 1
  | .node l r => leafCount l+leafCount r

theorem binary_expression_leaf_identity (tree : BinaryTree) :
    leafCount tree = operationCount tree+1 := by
  induction tree with
  | leaf => rfl
  | node l r hl hr => simp only [leafCount,operationCount,hl,hr]; omega

theorem four_input_expression_cost (tree : BinaryTree) (distinct_inputs : 4 ≤ leafCount tree) :
    3 ≤ operationCount tree := by
  rw [binary_expression_leaf_identity] at distinct_inputs
  omega

end QICNLean.EpistemicSubfp
