import Mathlib.Data.Real.Basic
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum

/-! Algebraic and coordinate kernels of Paper I's atomicity certificate.
This file does not formalize topological Cantor continuity, compact Hilbert
cubes, cut-point connectedness, or physical admissibility of retractions.
The certificate hypotheses below must be established separately in a model. -/

namespace QICNLean.EpistemicAtomicity

theorem resistance_threshold_excludes (M K delta : ℝ) (hM : 0 ≤ M)
    (strict : K < M * delta) :
    ¬ ∃ E Delta : ℝ, E ≤ K ∧ delta ≤ Delta ∧ M * Delta ≤ E := by
  rintro ⟨E, Delta, cost, deformation, resistance⟩
  have monotone := mul_le_mul_of_nonneg_left deformation hM
  linarith

theorem positive_deformation_threshold (M K delta E Delta : ℝ)
    (hM : 0 ≤ M) (positive : 0 < delta) (cost : E ≤ K)
    (deformation : delta ≤ Delta) (resistance : M * Delta ≤ E) :
    M * delta ≤ K ∧ 0 < Delta := by
  constructor
  · exact (mul_le_mul_of_nonneg_left deformation hM).trans (resistance.trans cost)
  · linarith

theorem square_equality_witness :
    (1 : ℝ) / 1 = 1 ∧
    (∃ E Delta : ℝ, E ≤ 1 ∧ 1 ≤ Delta ∧ 1 * Delta ≤ E) ∧
    ¬ (1 : ℝ) < 1 * 1 := by
  refine ⟨by norm_num, ⟨1, 1, by norm_num, by norm_num, by norm_num⟩, by norm_num⟩

def xorFlip {ι : Type} (mask word : ι → Bool) : ι → Bool :=
  fun i => Bool.xor (word i) (mask i)

theorem xor_flip_involution {ι : Type} (mask word : ι → Bool) :
    xorFlip mask (xorFlip mask word) = word := by
  funext i
  simp only [xorFlip]
  cases word i <;> cases mask i <;> rfl

/-- Covers finite words by taking `ι = Fin n`, and coordinate sequences as well. -/
theorem xor_flip_bijective {ι : Type} (mask : ι → Bool) :
    Function.Bijective (xorFlip mask) := by
  constructor
  · intro a b h
    have := congrArg (xorFlip mask) h
    simpa only [xor_flip_involution] using this
  · intro b
    exact ⟨xorFlip mask b, xor_flip_involution mask b⟩

def paritySplit {α : Type} (word : Nat → α) : (Nat → α) × (Nat → α) :=
  (fun n => word (2*n), fun n => word (2*n+1))

def parityJoin {α : Type} (pair : (Nat → α) × (Nat → α)) (n : Nat) : α :=
  if n % 2 = 0 then pair.1 (n/2) else pair.2 (n/2)

theorem parity_join_split {α : Type} (word : Nat → α) :
    parityJoin (paritySplit word) = word := by
  funext n
  by_cases even : n % 2 = 0
  · have index : 2*(n/2) = n := by omega
    simp [parityJoin, paritySplit, even, index]
  · have index : 2*(n/2)+1 = n := by omega
    simp [parityJoin, paritySplit, even, index]

theorem parity_split_join {α : Type} (pair : (Nat → α) × (Nat → α)) :
    paritySplit (parityJoin pair) = pair := by
  apply Prod.ext
  · funext n
    simp [paritySplit, parityJoin]
  · funext n
    have quotient : (2*n+1)/2 = n := by omega
    simp [paritySplit, parityJoin, quotient]

theorem parity_split_bijective {α : Type} :
    Function.Bijective (@paritySplit α) := by
  constructor
  · intro a b h
    have := congrArg parityJoin h
    simpa only [parity_join_split] using this
  · intro pair
    exact ⟨parityJoin pair, parity_split_join pair⟩

end QICNLean.EpistemicAtomicity
