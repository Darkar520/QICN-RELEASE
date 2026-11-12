import Mathlib.Analysis.Real.Sqrt
import Mathlib.Algebra.Order.BigOperators.Group.Finset
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Ring

/-! Ordered, rational and inductive kernels of the infinite witness.
This is not the compactness/inverse-limit proof, an infinite-dimensional
integration theorem, a physical realization, or a proof of the whole class.
The box lemma treats the cosine as a scalar with a separately supplied bound.
The gate product below is algebraic; no general real-power analytic theorem is claimed. -/

namespace QICNLean.EpistemicWitness

/-- Finite weighted functional kernel. The manuscript's infinite series,
its geometric majorant and its limit passage remain analytic TeX proofs. -/
theorem finite_functional_bound {ι : Type} (s : Finset ι)
    (w a zL zR : ι → ℝ) (hw : ∀ j ∈ s, 0 ≤ w j)
    (left : ∀ j ∈ s, |zL j| ≤ a j) (right : ∀ j ∈ s, |zR j| ≤ a j)
    (budget : ∑ j ∈ s, 2*w j*a j ≤ 1) :
    |∑ j ∈ s, w j*(zL j+zR j)| ≤ 1 := by
  calc
    |∑ j ∈ s, w j*(zL j+zR j)| ≤ ∑ j ∈ s, |w j*(zL j+zR j)| :=
      Finset.abs_sum_le_sum_abs _ _
    _ ≤ ∑ j ∈ s, 2*w j*a j := by
      apply Finset.sum_le_sum
      intro j hj
      rw [abs_mul,abs_of_nonneg (hw j hj)]
      have triangle := abs_add_le (zL j) (zR j)
      have bound : |zL j+zR j| ≤ 2*a j := by
        linarith [left j hj,right j hj]
      calc
        w j*|zL j+zR j| ≤ w j*(2*a j) :=
          mul_le_mul_of_nonneg_left bound (hw j hj)
        _ = 2*w j*a j := by ring
    _ ≤ 1 := budget

theorem box_interval (a z v c : ℝ) (ha : 0 < a)
    (hz : |z| ≤ a) (hv : |v| ≤ a) (hc : |c| ≤ 1) :
    |(z+v)/4+a*c/32| ≤ 17*a/32 ∧ 17*a/32 < a := by
  obtain ⟨zl,zu⟩ := abs_le.mp hz
  obtain ⟨vl,vu⟩ := abs_le.mp hv
  obtain ⟨cl,cu⟩ := abs_le.mp hc
  have lower := mul_le_mul_of_nonneg_left cl (le_of_lt ha)
  have upper := mul_le_mul_of_nonneg_left cu (le_of_lt ha)
  constructor
  · apply abs_le.mpr
    constructor <;> nlinarith
  · linarith

theorem witness_rational_margins :
    (1/3 : ℝ)*(1/32)/4=1/384 ∧
    (3 : ℝ)*(1/32)/4=3/128 ∧
    (1/512 : ℝ)<1/384 ∧ (1/384 : ℝ)<3/128 ∧
    (1/3 : ℝ)*(1/4)/(1+1/3)=1/16 := by
  norm_num

theorem constant_subspace_separation :
    (1/16 : ℝ)<(Real.sqrt 2-1)/(2*Real.sqrt 3) := by
  have s2 := Real.sq_sqrt (show (0 : ℝ) ≤ 2 by norm_num)
  have s3 := Real.sq_sqrt (show (0 : ℝ) ≤ 3 by norm_num)
  have n2 := Real.sqrt_nonneg (2 : ℝ)
  have n3 := Real.sqrt_nonneg (3 : ℝ)
  have p3 : 0 < Real.sqrt (3 : ℝ) := Real.sqrt_pos.mpr (by norm_num)
  have lo : (7/5 : ℝ)<Real.sqrt 2 := by nlinarith
  have hi : Real.sqrt (3 : ℝ)<2 := by nlinarith
  apply (lt_div_iff₀ (show 0 < 2*Real.sqrt (3 : ℝ) by positivity)).mpr
  nlinarith

noncomputable def prefixCode3 (b1 b2 b3 : Bool) (tail : ℝ) : ℝ :=
  (if b1 then 2/3 else 0)+(if b2 then 2/9 else 0)+(if b3 then 2/27 else 0)+tail

theorem null_prefix_head (b1 b2 b3 : Bool) (tail : ℝ) (ht : 0 ≤ tail)
    (small : prefixCode3 b1 b2 b3 tail < 1/27) : b1=false ∧ b2=false := by
  cases b1 <;> cases b2 <;> cases b3 <;> simp_all [prefixCode3] <;> linarith

theorem null_D_escape (b1 b2 b3 : Bool) (tail nextTail : ℝ)
    (ht : 0 ≤ tail) (hn : 0 ≤ nextTail)
    (small : prefixCode3 b1 b2 b3 tail < 1/27) :
    (2/27 : ℝ) ≤ prefixCode3 b1 false (!b2) nextTail := by
  obtain ⟨h1,h2⟩ := null_prefix_head b1 b2 b3 tail ht small
  simp [prefixCode3,h1,h2]
  linarith

theorem null_W_escape (b1 b2 b3 : Bool) (tail : ℝ) (ht : 0 ≤ tail)
    (small : prefixCode3 b1 b2 b3 tail < 1/27) :
    (2/3 : ℝ) ≤ prefixCode3 (!b1) b2 b3 tail := by
  obtain ⟨h1,h2⟩ := null_prefix_head b1 b2 b3 tail ht small
  cases b3 <;> simp [prefixCode3,h1,h2] <;> linarith

theorem no_eventual_null (code : Nat → ℝ)
    (escape : ∀ n, code n < 1/27 → 2/27 ≤ code (n+1)) :
    ¬ ∃ N, ∀ n, N ≤ n → code n < 1/27 := by
  rintro ⟨N,hN⟩
  have h := escape N (hN N (by omega))
  have h' := hN (N+1) (by omega)
  linarith

def trajectory {X U V : Type} (D : X → U → V → X) (x0 : X)
    (u : Nat → U) (v : Nat → V) : Nat → X
  | 0 => x0
  | n+1 => D (trajectory D x0 u v n) (u n) (v n)

theorem paired_trajectory {X U V : Type} (P : X → X) (Q : V → V)
    (D : X → U → V → X) (x0 : X) (u : Nat → U) (v : Nat → V)
    (preparation : P x0=x0)
    (equivariant : ∀ x a b, P (D x a b)=D (P x) a (Q b)) :
    ∀ n, trajectory D x0 u (fun t => Q (v t)) n=P (trajectory D x0 u v n) := by
  intro n
  induction n with
  | zero => exact preparation.symm
  | succ n ih =>
    simp only [trajectory]
    rw [ih]
    exact (equivariant _ _ _).symm

theorem involution_trajectory {X : Type} (P : X → X)
    (involutive : ∀ x, P (P x)=x) (t : Nat → X) :
    (fun n => P (P (t n)))=t := by
  funext n
  exact involutive _

theorem paired_response {X U V : Type} (P : X → X) (Q : V → V)
    (D : X → U → V → X) (x0 : X) (u : Nat → U) (v : Nat → V)
    (preparation : P x0=x0)
    (equivariant : ∀ x a b, P (D x a b)=D (P x) a (Q b))
    (R : (Nat → X) → ℝ) (invariant : ∀ t, R (fun n => P (t n))=R t) :
    R (trajectory D x0 u (fun t => Q (v t)))=R (trajectory D x0 u v) := by
  have h := funext (paired_trajectory P Q D x0 u v preparation equivariant)
  rw [h]
  exact invariant _

theorem valuation_zero (E1 E2 s : ℝ) (positive : 0<s) (nonnegative : 0≤E1)
    (equal : E1=E2) : 0<s+E1 ∧ (E1-E2)/(s+E1)=0 := by
  constructor
  · linarith
  · rw [equal]
    simp

theorem seven_min_zero (a b c d e f : ℝ) (ha : 0≤a) (hb : 0≤b)
    (hc : 0≤c) (hd : 0≤d) (he : 0≤e) (hf : 0≤f) :
    min (min a b) (min (min c d) (min 0 (min e f)))=0 := by
  rw [min_eq_left (le_min he hf),min_eq_right (le_min hc hd),
    min_eq_right (le_min ha hb)]

theorem seven_product_zero (a b c d e f : ℝ) : a*b*c*d*0*e*f=0 := by ring

theorem positive_gate_excluded (gate threshold : ℝ) (zero : gate=0)
    (positive : 0<threshold) : ¬ threshold≤gate := by linarith

theorem no_common_phase {X Phase : Type} (f g : X → X) (phase : X → Phase)
    (a b : Phase) (different : a≠b) (force_f : ∀ x, phase (f x)=a)
    (force_g : ∀ x, phase (g x)=b) : ¬ ∃ x, f x=x ∧ g x=x := by
  rintro ⟨x,hf,hg⟩
  have ha := force_f x
  have hb := force_g x
  rw [hf] at ha
  rw [hg] at hb
  exact different (ha.symm.trans hb)

end QICNLean.EpistemicWitness
