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


/-- Insert a zero and move every prior bit one place deeper, complementing it. -/
def dissipativeBits (b : Nat → Bool) : Nat → Bool
  | 0 => false
  | n + 1 => !(b n)

def dissipativePrefix (n : Nat) (b : Fin n → Bool) (i : Fin n) : Bool :=
  if i.val = 0 then false
  else !(b ⟨i.val - 1, Nat.lt_of_le_of_lt (Nat.sub_le _ _) i.isLt⟩)

theorem dissipative_prefix_square (n : Nat) (b : Fin (n + 1) → Bool) :
    binaryPrefixBond n (dissipativePrefix (n + 1) b) =
      dissipativePrefix n (binaryPrefixBond n b) := by
  rfl

theorem dissipative_bits_move_first_difference (b c : Nat → Bool) (n : Nat)
    (before : ∀ j < n, b j = c j) (different : b n ≠ c n) :
    (∀ j < n + 1, dissipativeBits b j = dissipativeBits c j) ∧
      dissipativeBits b (n + 1) ≠ dissipativeBits c (n + 1) := by
  constructor
  · intro j hj
    cases j with
    | zero => rfl
    | succ j => exact congrArg Bool.not (before j (Nat.lt_of_succ_lt_succ hj))
  · intro equal
    apply different
    simpa only [dissipativeBits, Bool.not_not] using congrArg Bool.not equal

def alternatingBits : Nat → Bool :=
  Nat.rec false (fun _ bit => !bit)

theorem dissipative_bits_fixed_iff (b : Nat → Bool) :
    dissipativeBits b = b ↔ b = alternatingBits := by
  constructor
  · intro h
    funext n
    induction n with
    | zero => exact (congrFun h 0).symm
    | succ n ih =>
      exact (congrFun h (n + 1)).symm.trans (congrArg Bool.not ih)
  · intro h
    subst b
    funext n
    cases n <;> rfl

theorem commuting_map_transports_fixed_point {A B : Type u}
    (f : A → A) (g : B → B) (h : A → B)
    (commutes : ∀ x, h (f x) = g (h x))
    (x : A) (fixed : f x = x) :
    g (h x) = h x :=
  (commutes x).symm.trans (congrArg h fixed)


/-- A label recovered locally by both factors is constant on a full product. -/
theorem two_factor_fibers_force_constant {X A B L : Type u}
    (left : X → A) (right : X → B) (label : X → L)
    (corner : ∀ x y, ∃ z, left z = left x ∧ right z = right y)
    (left_local : ∀ x y, left x = left y → label x = label y)
    (right_local : ∀ x y, right x = right y → label x = label y)
    (x y : X) : label x = label y := by
  obtain ⟨z, lz, rz⟩ := corner x y
  exact (left_local z x lz).symm.trans (right_local z y rz)



/-- The normalized paired score separates the two error bands on an integer scale. -/
theorem paired_score_separates (score gap noise : Nat)
    (resolved : 2 * noise < gap) :
    (score ≤ 2 * noise → ¬ gap < score) ∧
    (2 * gap ≤ score + 2 * noise → gap < score) := by
  omega



/-- A least right endpoint is a common point when all left endpoints lie below every right endpoint. -/
theorem common_point_of_least_right_endpoint {I A : Type u} [LE A]
    (lo hi : I → A) (j : I)
    (cross : ∀ i j, lo i ≤ hi j) (least : ∀ i, hi j ≤ hi i) :
    ∃ x, ∀ i, lo i ≤ x ∧ x ≤ hi i :=
  ⟨hi j, fun i => ⟨cross i j, least i⟩⟩



/-- Stability along two trajectories transports a later label equality to their starts. -/
theorem stable_labels_agree_before_merge {A : Type u}
    (x y : Nat → A)
    (stableX : ∀ n, x (n + 1) = x n)
    (stableY : ∀ n, y (n + 1) = y n)
    (n : Nat) (merged : x n = y n) : x 0 = y 0 := by
  induction n with
  | zero => exact merged
  | succ n ih => exact ih ((stableX n).symm.trans (merged.trans (stableY n)))


end QICNLean
