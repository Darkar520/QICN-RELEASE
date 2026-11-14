import Init.Data.Rat.Basic

namespace QICNLean

/-- The algebraic step after uniqueness from the contraction principle. -/
theorem fixed_point_common_of_unique {α : Type} (sigma control : α → α) (x : α)
    (fixed : sigma x = x) (unique : ∀ y, sigma y = y → y = x)
    (commute : ∀ y, sigma (control y) = control (sigma y)) :
    control x = x := by
  apply unique
  rw [commute, fixed]

/-- Tower bits are indexed from zero. -/
def prependComplement (b : Nat → Bool) : Nat → Bool
  | 0 => false
  | n + 1 => !b n

def alternatingReference : Nat → Bool
  | 0 => false
  | n + 1 => !alternatingReference n

theorem alternating_reference_fixed :
    prependComplement alternatingReference = alternatingReference := by
  funext n
  cases n <;> rfl

def prefixWithTail (m : Nat) (reference b : Nat → Bool) (n : Nat) : Bool :=
  if n < m then b n else reference n

theorem truncation_commutes_away_from_boundary (m : Nat) (hm : 0 < m)
    (reference b : Nat → Bool) (fixed : prependComplement reference = reference)
    (n : Nat) (away : n ≠ m) :
    prefixWithTail m reference (prependComplement b) n =
      prependComplement (prefixWithTail m reference b) n := by
  cases n with
  | zero => simp [prefixWithTail, prependComplement, hm]
  | succ j =>
    by_cases small : j + 1 < m
    · have previous : j < m := by omega
      simp [prefixWithTail, prependComplement, small, previous]
    · have previous : ¬ j < m := by omega
      have href : Bool.not (reference j) = reference (j + 1) := congrFun fixed (j + 1)
      simpa only [prefixWithTail, prependComplement, small, previous, if_false] using href.symm

/-- The common weight of one differing digit, with zero-based indexing. -/
def ternaryDigitWeight (n : Nat) : Rat := 2 / (3 : Rat) ^ (n + 1)

def digitDefect (n : Nat) (left right : Bool) : Rat :=
  if left = right then 0 else ternaryDigitWeight n

/-- The sole possible contribution has the exact rational weight at the cut. -/
theorem truncation_boundary_digit_defect (j : Nat) (reference b : Nat → Bool)
    (fixed : prependComplement reference = reference) :
    digitDefect (j + 1)
      (prefixWithTail (j + 1) reference (prependComplement b) (j + 1))
      (prependComplement (prefixWithTail (j + 1) reference b) (j + 1)) =
      if reference j = b j then 0 else (2 : Rat) / (3 : Rat) ^ (j + 2) := by
  have small : j < j + 1 := Nat.lt_succ_self j
  have href : Bool.not (reference j) = reference (j + 1) := congrFun fixed (j + 1)
  simp only [digitDefect, prefixWithTail, Nat.lt_irrefl, if_false, prependComplement,
    small, if_true, ← href, ternaryDigitWeight]
  cases reference j <;> cases b j <;> rfl

theorem cycle_transport_iff_even (a b c : Bool) :
    (∃ x y z : Bool, y = Bool.xor x a ∧ z = Bool.xor y b ∧ x = Bool.xor z c) ↔
    Bool.xor (Bool.xor a b) c = false := by
  constructor
  · intro ⟨x, y, z, hy, hz, hx⟩
    subst y
    subst z
    cases a <;> cases b <;> cases c <;> cases x <;> simp_all
  · intro even
    refine ⟨false, Bool.xor false a, Bool.xor (Bool.xor false a) b, rfl, rfl, ?_⟩
    cases a <;> cases b <;> cases c <;> simp_all

/-- Clean risk at least one half, cross-multiplied by a common denominator. -/
theorem clean_abstention_risk_scaled (covered abstained gammaNumerator scale : Nat)
    (gammaAtLeastHalf : scale ≤ 2 * gammaNumerator) :
    scale * (covered + abstained) ≤ scale * covered + (2 * gammaNumerator) * abstained := by
  rw [Nat.mul_add]
  exact Nat.add_le_add_left (Nat.mul_le_mul_right abstained gammaAtLeastHalf) _

/-- The algebraic coupling bound, using nonnegative scaled masses. -/
theorem risk_contamination_scaled (total cleanRisk observedRisk leaked : Nat)
    (cleanBound : total ≤ 2 * cleanRisk) (contamination : cleanRisk ≤ observedRisk + leaked) :
    total ≤ 2 * observedRisk + 2 * leaked := by
  omega

end QICNLean
