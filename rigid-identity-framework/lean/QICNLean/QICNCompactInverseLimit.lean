import QICNLean.QICNInverseLimitTopology
import Mathlib.Topology.Compactness.Compact

/-!
Compact successor towers: a finite-intersection proof of nonemptiness WITHOUT
surjective bonds. Every prescribed top stage extends to a finite coherent
prefix. No metric-SUM construction enters this result.
-/
namespace QICNLean.CompactInverseLimit

open Set
universe u
variable {S : ℕ → Type u} (p : (n : ℕ) → S (n + 1) → S n)

noncomputable section

def prefixSet (N : ℕ) : Set ((n : ℕ) → S n) :=
  {x | ∀ i, i < N → p i (x (i + 1)) = x i}

theorem finite_prefix_extension [∀ n, Nonempty (S n)] (N : ℕ) (z : S N) :
    ∃ x : (n : ℕ) → S n, x N = z ∧ x ∈ prefixSet p N := by
  classical
  induction N with
  | zero =>
    refine ⟨Function.update (fun n => Classical.choice (inferInstance : Nonempty (S n))) 0 z,
      by simp, ?_⟩
    intro i hi
    omega
  | succ N ih =>
    obtain ⟨x, hx, hprefix⟩ := ih (p N z)
    refine ⟨Function.update x (N + 1) z, by simp, ?_⟩
    intro i hi
    by_cases heq : i = N
    · subst i
      simpa using hx.symm
    · have hiN : i < N := by omega
      have h0 : i ≠ N + 1 := by omega
      have h1 : i + 1 ≠ N + 1 := by omega
      rw [Function.update_of_ne h1, Function.update_of_ne h0]
      exact hprefix i hiN

theorem prefix_nonempty [∀ n, Nonempty (S n)] (N : ℕ) :
    (prefixSet p N).Nonempty := by
  obtain ⟨x, _, hx⟩ := finite_prefix_extension p N (Classical.choice inferInstance)
  exact ⟨x, hx⟩

theorem prefix_closed [∀ n, TopologicalSpace (S n)] [∀ n, T2Space (S n)]
    (hp : ∀ n, Continuous (p n)) (N : ℕ) : IsClosed (prefixSet p N) := by
  simp only [prefixSet, setOf_forall]
  exact isClosed_iInter (fun i => isClosed_iInter (fun _ =>
    isClosed_eq ((hp i).comp (continuous_apply (i + 1))) (continuous_apply i)))

theorem prefix_antitone : Antitone (prefixSet p) := by
  intro a b hab x hx i hi
  exact hx i (lt_of_lt_of_le hi hab)

theorem inverse_limit_nonempty_without_surjectivity
    [∀ n, TopologicalSpace (S n)] [∀ n, T2Space (S n)]
    [∀ n, CompactSpace (S n)] [∀ n, Nonempty (S n)]
    (hp : ∀ n, Continuous (p n)) : Nonempty (QICNLean.ProjectiveHistories p) := by
  have hfip : (⋂ N, prefixSet p N).Nonempty :=
    IsCompact.nonempty_iInter_of_sequence_nonempty_isCompact_isClosed (prefixSet p)
      (fun n => prefix_antitone p (Nat.le_succ n)) (prefix_nonempty p)
      ((prefix_closed p hp 0).isCompact) (prefix_closed p hp)
  obtain ⟨x, hx⟩ := hfip
  refine ⟨⟨x, fun n => ?_⟩⟩
  exact (mem_iInter.mp hx (n + 1)) n (Nat.lt_succ_self n)

theorem canonical_projection_surjective [∀ n, Nonempty (S n)]
    (hsurj : ∀ n, Function.Surjective (p n)) (N : ℕ) :
    Function.Surjective (fun x : QICNLean.ProjectiveHistories p => x.val N) := by
  classical
  intro z
  obtain ⟨basepoint, hN, hprefix⟩ := finite_prefix_extension p N z
  let r : (n : ℕ) → S n → S (n + 1) := fun n a => Classical.choose (hsurj n a)
  have hr (n : ℕ) (a : S n) : p n (r n a) = a := Classical.choose_spec (hsurj n a)
  let lift : (n : ℕ) → S n → S (n + 1) := fun n =>
    if n < N then Function.update (r n) (basepoint n) (basepoint (n + 1)) else r n
  have hlift (n : ℕ) (a : S n) : p n (lift n a) = a := by
    by_cases hn : n < N
    · by_cases ha : a = basepoint n
      · subst a
        simpa [lift, hn] using hprefix n hn
      · simpa [lift, hn, ha] using hr n a
    · simpa [lift, hn] using hr n a
  let hist : (n : ℕ) → S n := Nat.rec (basepoint 0) (fun n a => lift n a)
  have hmatch : ∀ m, m ≤ N → hist m = basepoint m := by
    intro m
    induction m with
    | zero => intro _; rfl
    | succ m ih =>
      intro hm
      have hmn : m < N := by omega
      have hi := ih (by omega)
      change lift m (hist m) = basepoint (m + 1)
      rw [hi]
      simp [lift, hmn]
  refine ⟨⟨hist, fun n => hlift n (hist n)⟩, ?_⟩
  exact (hmatch N le_rfl).trans hN

end
end QICNLean.CompactInverseLimit
