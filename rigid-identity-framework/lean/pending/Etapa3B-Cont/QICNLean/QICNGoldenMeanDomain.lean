import Mathlib.Tactic.Linarith
import Mathlib.Tactic.Ring
import Mathlib.Tactic.Positivity
import Lean.Elab.Tactic.Omega
import Mathlib.Topology.Algebra.InfiniteSum.Real

/-! Infinite Golden Mean streams and the source geometric encoding. -/
namespace QICNLean.GoldenMeanDomain

noncomputable section

def admissible (x : ℕ → Bool) : Prop := ∀ n, x n = true → x (n + 1) = false
def tail (x : ℕ → Bool) (n : ℕ) : Bool := x (n + 1)

theorem tail_admissible (x : ℕ → Bool) (hx : admissible x) : admissible (tail x) := by
  intro n hn
  exact hx (n + 1) hn

def partialValue (r : ℝ) : (ℕ → Bool) → ℕ → ℝ
  | _, 0 => 0
  | x, n + 1 => (if x 0 then r else 0) + r * partialValue r (tail x) n

theorem prefix_eq_sum (r : ℝ) (x : ℕ → Bool) (n : ℕ) :
    partialValue r x n = ∑ k ∈ Finset.range n, if x k then r ^ (k + 1) else 0 := by
  induction n generalizing x with
  | zero => simp [partialValue]
  | succ n ih =>
    rw [partialValue, Finset.sum_range_succ', ih]
    simp [tail, Finset.mul_sum, pow_succ, mul_ite, mul_comm, add_comm]
    apply Finset.sum_congr rfl
    intro k hk
    split_ifs <;> simp [pow_add, pow_succ] <;> ring_nf <;> simp

theorem prefix_le_one (r : ℝ) (hr0 : 0 ≤ r) (hr1 : r ≤ 1)
    (hquad : r + r ^ 2 = 1) (n : ℕ) :
    ∀ x : ℕ → Bool, admissible x → partialValue r x n ≤ 1 := by
  induction n using Nat.strong_induction_on with
  | h n ih =>
    intro x hx
    cases n with
    | zero => simp [partialValue]
    | succ n =>
      cases h0 : x 0 with
      | false =>
        have ht := ih n (by omega) (tail x) (tail_admissible x hx)
        simp only [partialValue, h0, Bool.false_eq_true, if_false, zero_add]
        exact (mul_le_mul_of_nonneg_left ht hr0).trans (by simpa using hr1)
      | true =>
        cases n with
        | zero => simpa [partialValue, h0] using hr1
        | succ m =>
          have h1 : x 1 = false := hx 0 h0
          have ht := ih m (by omega) (tail (tail x))
            (tail_admissible (tail x) (tail_admissible x hx))
          have hb := mul_le_mul_of_nonneg_left ht (sq_nonneg r)
          simp only [partialValue, h0, tail, h1, Bool.false_eq_true,
            if_pos rfl, if_false, zero_add]
          change r + r * (r * partialValue r (tail (tail x)) m) ≤ 1
          nlinarith

def encoding (r : ℝ) (x : ℕ → Bool) : ℝ :=
  ∑' k : ℕ, if x k then r ^ (k + 1) else 0

theorem encoding_mem_unit_interval (r : ℝ) (hr0 : 0 ≤ r) (hr1 : r ≤ 1)
    (hquad : r + r ^ 2 = 1) (x : ℕ → Bool) (hx : admissible x) :
    encoding r x ∈ Set.Icc (0 : ℝ) 1 := by
  have hn (k : ℕ) : 0 ≤ (if x k then r ^ (k + 1) else 0) := by
    split_ifs <;> positivity
  constructor
  · exact tsum_nonneg hn
  · apply Real.tsum_le_of_sum_range_le hn
    intro n
    rw [← prefix_eq_sum]
    exact prefix_le_one r hr0 hr1 hquad n x hx

end
end QICNLean.GoldenMeanDomain
