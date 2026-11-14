namespace QICNLean

private def dropCode {n : Nat} (pivot x : Fin (n + 1)) (different : x ≠ pivot) : Fin n :=
  if before : x.val < pivot.val then
    ⟨x.val, by have limit := pivot.isLt; omega⟩
  else
    ⟨x.val - 1, by
      have limit := x.isLt
      have distinctValues : x.val ≠ pivot.val := fun h => different (Fin.ext h)
      omega⟩

private theorem dropCode_injective {n : Nat} (pivot x y : Fin (n + 1))
    (hx : x ≠ pivot) (hy : y ≠ pivot) (equal : dropCode pivot x hx = dropCode pivot y hy) :
    x = y := by
  have values := congrArg (fun z : Fin n => z.val) equal
  have xDistinct : x.val ≠ pivot.val := fun h => hx (Fin.ext h)
  have yDistinct : y.val ≠ pivot.val := fun h => hy (Fin.ext h)
  apply Fin.ext
  by_cases xb : x.val < pivot.val <;> by_cases yb : y.val < pivot.val <;>
    simp [dropCode, xb, yb] at values <;> omega

theorem no_injective_fin_successor_code (n : Nat) (code : Fin (n + 1) → Fin n) :
    ¬ (∀ ⦃i j⦄, code i = code j → i = j) := by
  induction n with
  | zero =>
    intro _
    exact Fin.elim0 (code ⟨0, by decide⟩)
  | succ n ih =>
    intro injective
    let last : Fin (n + 2) := ⟨n + 1, by omega⟩
    let extend (i : Fin (n + 1)) : Fin (n + 2) := ⟨i.val, by have limit := i.isLt; omega⟩
    have distinct (i : Fin (n + 1)) : code (extend i) ≠ code last := by
      intro same
      have values := congrArg (fun z : Fin (n + 2) => z.val) (injective same)
      have limit := i.isLt
      change i.val = n + 1 at values
      omega
    let smaller (i : Fin (n + 1)) : Fin n :=
      dropCode (code last) (code (extend i)) (distinct i)
    apply ih smaller
    intro i j same
    have equal := dropCode_injective (code last) (code (extend i)) (code (extend j))
      (distinct i) (distinct j) same
    exact Fin.ext (congrArg (fun z : Fin (n + 2) => z.val) (injective equal))

theorem code_collision_of_binary_budget {B n : Nat} (large : 2 ^ B < n)
    (code : Fin n → Fin (2 ^ B)) : ∃ i j, i ≠ j ∧ code i = code j := by
  classical
  by_cases collision : ∃ i j, i ≠ j ∧ code i = code j
  · exact collision
  · exfalso
    let includePrefix (i : Fin (2 ^ B + 1)) : Fin n :=
      ⟨i.val, Nat.lt_of_lt_of_le i.isLt large⟩
    apply no_injective_fin_successor_code (2 ^ B) (fun i => code (includePrefix i))
    intro i j equal
    by_cases same : i = j
    · exact same
    · have distinct : includePrefix i ≠ includePrefix j := by
        intro h
        exact same (Fin.ext (congrArg (fun z : Fin n => z.val) h))
      exact False.elim (collision ⟨includePrefix i, includePrefix j, distinct, equal⟩)

theorem exact_response_obstruction {B n : Nat} {Query : Type} {Response : Query → Type}
    (large : 2 ^ B < n) (response : (q : Query) → Fin n → Response q)
    (separated : ∀ i j, i ≠ j → ∃ q, response q i ≠ response q j)
    (code : Fin n → Fin (2 ^ B)) (decode : (q : Query) → Fin (2 ^ B) → Response q) :
    ¬ (∀ q i, decode q (code i) = response q i) := by
  intro exactDecode
  obtain ⟨i, j, different, same⟩ := code_collision_of_binary_budget large code
  obtain ⟨q, differs⟩ := separated i j different
  exact differs ((exactDecode q i).symm.trans ((congrArg (decode q) same).trans (exactDecode q j)))

end QICNLean
