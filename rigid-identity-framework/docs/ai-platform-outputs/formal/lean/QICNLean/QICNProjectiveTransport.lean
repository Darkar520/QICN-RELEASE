namespace QICNLean

universe u

/-- Histories with exact compatibility at every successor stage. -/
def ProjectiveHistories {S : Nat → Type u}
    (p : (n : Nat) → S (n + 1) → S n) :=
  {x : (n : Nat) → S n // ∀ n, p n (x (n + 1)) = x n}

/-- A commuting coordinate family induces an exact map of histories. -/
def projectiveTransport {S : Nat → Type u}
    {p q : (n : Nat) → S (n + 1) → S n}
    (h : (n : Nat) → S n → S n)
    (commute : ∀ n z, q n (h (n + 1) z) = h n (p n z))
    (x : ProjectiveHistories p) : ProjectiveHistories q :=
  ⟨fun n => h n (x.val n), fun n =>
    (commute n (x.val (n + 1))).trans (congrArg (h n) (x.property n))⟩

theorem inverse_projective_square {S : Nat → Type u}
    {p q : (n : Nat) → S (n + 1) → S n}
    {h g : (n : Nat) → S n → S n}
    (commute : ∀ n z, q n (h (n + 1) z) = h n (p n z))
    (left : ∀ n z, g n (h n z) = z)
    (right : ∀ n z, h n (g n z) = z)
    (n : Nat) (z : S (n + 1)) :
    p n (g (n + 1) z) = g n (q n z) := by
  have step := congrArg (g n) (commute n (g (n + 1) z))
  rw [right, left] at step
  exact step.symm

theorem projectiveTransport_leftInverse {S : Nat → Type u}
    {p q : (n : Nat) → S (n + 1) → S n}
    {h g : (n : Nat) → S n → S n}
    (forward : ∀ n z, q n (h (n + 1) z) = h n (p n z))
    (backward : ∀ n z, p n (g (n + 1) z) = g n (q n z))
    (left : ∀ n z, g n (h n z) = z) (x : ProjectiveHistories p) :
    projectiveTransport g backward (projectiveTransport h forward x) = x := by
  apply Subtype.ext
  exact funext (fun n => left n (x.val n))

/-- A local lift of each matching stage extends to a globally compatible history. -/
theorem projective_exact_lift {S : Nat → Type u}
    {q : (n : Nat) → S (n + 1) → S n}
    (admissible : (n : Nat) → S n → Prop)
    (start : {v : S 0 // admissible 0 v})
    (next : ∀ n (v : {v : S n // admissible n v}),
      {u : {u : S (n + 1) // admissible (n + 1) u} // q n u.val = v.val}) :
    ∃ y : ProjectiveHistories q, ∀ n, admissible n (y.val n) := by
  let stages : (n : Nat) → {v : S n // admissible n v} :=
    Nat.rec start (fun n v => (next n v).val)
  exact ⟨⟨fun n => (stages n).val, fun n => (next n (stages n)).property⟩,
    fun n => (stages n).property⟩

def binaryPrefixBond (n : Nat) (b : Fin (n + 1) → Bool) : Fin n → Bool :=
  fun i => b ⟨i.val, Nat.lt_trans i.isLt (Nat.lt_succ_self n)⟩

def binaryHistory (b : Nat → Bool) : ProjectiveHistories (S := fun n => Fin n → Bool) binaryPrefixBond :=
  ⟨fun _ i => b i.val, fun _ => rfl⟩

theorem binary_prefix_has_late_branch (n : Nat) :
    ∃ a b : ProjectiveHistories (S := fun n => Fin n → Bool) binaryPrefixBond, a.val n = b.val n ∧ a ≠ b := by
  refine ⟨binaryHistory (fun _ => false), binaryHistory (fun j => decide (j = n)), ?_, ?_⟩
  · funext i
    simp [binaryHistory, Nat.ne_of_lt i.isLt]
  · intro equal
    have bit := congrArg (fun x : ProjectiveHistories (S := fun n => Fin n → Bool) binaryPrefixBond =>
      x.val (n + 1) ⟨n, Nat.lt_succ_self n⟩) equal
    simp [binaryHistory] at bit

end QICNLean
