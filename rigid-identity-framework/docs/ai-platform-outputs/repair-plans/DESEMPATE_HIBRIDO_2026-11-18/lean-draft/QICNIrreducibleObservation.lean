import Mathlib.Algebra.Polynomial.FieldDivision
import Mathlib.LinearAlgebra.FiniteDimensional.Lemmas
import Mathlib.LinearAlgebra.Span.Basic
import Mathlib.FieldTheory.Minpoly.Basic
import QICNLean.QICNHybridBoundary

namespace QICNLean.IrreducibleObservation

open scoped BigOperators
open Polynomial

theorem cyclic_independent {K V : Type*} [Field K] [AddCommGroup V] [Module K V]
    (A : Module.End K V) (p : K[X]) (hp : Irreducible p)
    (hA : aeval A p = 0) {v : V} (hv : v ≠ 0) :
    LinearIndependent K (fun i : Fin p.natDegree => (A ^ (i : ℕ)) v) := by
  classical
  rw [Fintype.linearIndependent_iff]
  intro c hc i
  let q : K[X] := ∑ j : Fin p.natDegree, monomial (j : ℕ) (c j)
  have coef (j : Fin p.natDegree) : q.coeff j = c j := by
    simp only [q, finsetSum_coeff, coeff_monomial]
    rw [Finset.sum_eq_single j]
    · simp
    · intro k _ hk
      exact if_neg (fun h => hk (Fin.ext h))
    · simp
  by_contra hi
  have hq : q ≠ 0 := by
    intro h
    exact hi (by rw [← coef i, h, coeff_zero])
  have hd : q.natDegree < p.natDegree := by
    apply lt_of_le_of_lt (natDegree_le_iff_coeff_eq_zero.mpr ?_) (Nat.sub_lt (Nat.zero_lt_of_lt i.isLt) (by decide : 0 < 1))
    intro n hn
    simp only [q, finsetSum_coeff, coeff_monomial]
    apply Finset.sum_eq_zero
    intro j _
    exact if_neg (by have := j.isLt; omega)
  have hcop : IsCoprime p q :=
    ((irreducible_iff_prime.mp hp).coprime_iff_not_dvd).mpr
      (fun h => (not_le_of_gt hd) (natDegree_le_of_dvd h hq))
  have hqv : aeval A q v = 0 := by
    simpa [q, aeval_monomial, LinearMap.sum_apply, Module.End.mul_apply,
      Algebra.algebraMap_eq_smul_one] using hc
  obtain ⟨r,s,hrs⟩ := hcop
  have hz := congrArg (fun w : K[X] => aeval A w v) hrs
  have : (0 : V) = v := by
    simpa [map_add, map_mul, hA, LinearMap.add_apply, Module.End.mul_apply, hqv] using hz
  exact hv this.symm

theorem irreducible_observation_injective {K V : Type*} [Field K]
    [AddCommGroup V] [Module K V] [FiniteDimensional K V]
    (A : Module.End K V) (ell : V →ₗ[K] K) (hell : ell ≠ 0)
    (hp : Irreducible (minpoly K A))
    (hd : (minpoly K A).natDegree = Module.finrank K V) :
    Function.Injective (fun x (i : Fin (minpoly K A).natDegree) => ell ((A ^ (i : ℕ)) x)) := by
  classical
  intro x y h
  by_contra hn
  have hv : x-y ≠ 0 := sub_ne_zero.mpr hn
  have hlin := cyclic_independent A (minpoly K A) hp (minpoly.aeval K A) hv
  have hspan := hlin.span_eq_top_of_card_eq_finrank' (by simpa using hd)
  apply hell
  apply LinearMap.ext
  intro w
  simp only [LinearMap.zero_apply]
  have hw : w ∈ Submodule.span K (Set.range fun i : Fin (minpoly K A).natDegree => (A ^ (i : ℕ)) (x-y)) := by
    rw [hspan]
    trivial
  refine Submodule.span_induction (p := fun z _ => ell z = 0) ?_ (by simp) ?_ ?_ hw
  · rintro _ ⟨i,rfl⟩
    dsimp only
    rw [map_sub, map_sub, sub_eq_zero]
    exact congrFun h i
  · intro a b _ _ ha hb
    simp [ha,hb]
  · intro a b _ hb
    simp [hb]


theorem irreducible_product_bound {K V L R : Type*} [Field K]
    [AddCommGroup V] [Module K V] [FiniteDimensional K V]
    [Nonempty L] [Nontrivial R] (A : Module.End K V) (ell : V →ₗ[K] K)
    (hell : ell ≠ 0) (hp : Irreducible (minpoly K A))
    (hd : (minpoly K A).natDegree = Module.finrank K V)
    (encode : V → L × R) (honto : Function.Surjective encode)
    (symbol : K → ℝ) (forecast : L → Fin (minpoly K A).natDegree → ℝ)
    (σ ε : ℝ) (hsep : ∀ x y : K, x ≠ y → σ ≤ |symbol x - symbol y|)
    (herr : ∀ x (i : Fin (minpoly K A).natDegree), |symbol (ell ((A ^ (i : ℕ)) x)) - forecast (encode x).1 i| ≤ ε) :
    σ / 2 ≤ ε := by
  classical
  let l : L := Classical.choice inferInstance
  obtain ⟨r,s,hrs⟩ := exists_pair_ne R
  obtain ⟨x,hx⟩ := honto (l,r)
  obtain ⟨y,hy⟩ := honto (l,s)
  have hxy : x ≠ y := by
    intro h
    exact hrs (by simpa [hx, hy] using congrArg (fun v => (encode v).2) h)
  have hall : ¬ ∀ i : Fin (minpoly K A).natDegree, ell ((A ^ (i : ℕ)) x) = ell ((A ^ (i : ℕ)) y) :=
    fun h => hxy (irreducible_observation_injective A ell hell hp hd (funext h))
  push Not at hall
  obtain ⟨i,hi⟩ := hall
  exact QICNLean.HybridBoundary.certified_separator_survives σ ε _ _ (forecast l i)
    (hsep _ _ hi) (by simpa [hx] using herr x i) (by simpa [hy] using herr y i)

end QICNLean.IrreducibleObservation
