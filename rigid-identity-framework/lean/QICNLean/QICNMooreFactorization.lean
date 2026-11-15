import QICNLean.QICNFiniteFronts
import Mathlib.Topology.MetricSpace.Basic
import Mathlib.Data.Finset.Prod
import Mathlib.Tactic.FinCases
import Mathlib.Data.Finset.Lattice.Fold

/-!
Controlled Moore systems, word-compatible morphisms and all surjective product
forecasts. The separation proof is universal in the state/readout functions;
it does not enumerate a preferred list of products. The finite maximum below
is the manuscript's actual uniform error, with no assumption of an attained
infimum over the comparison family.
-/
namespace QICNLean.MooreFactorization

universe u v
noncomputable section

structure Moore (X U J : Type u) (V : J → Type v) where
  step : U → X → X
  read : (j : J) → X → V j

def run {X U : Type u} (F : U → X → X) : List U → X → X
  | [], x => x
  | a::w, x => run F w (F a x)

structure Hom {X Y U J : Type u} {V W : J → Type v}
    (M : Moore X U J V) (N : Moore Y U J W) where
  state : X → Y
  value : (j : J) → V j → W j
  step_comm : ∀ a x, state (M.step a x) = N.step a (state x)
  read_comm : ∀ j x, value j (M.read j x) = N.read j (state x)

def identityHom {X U J : Type u} {V : J → Type v} (M : Moore X U J V) : Hom M M :=
  ⟨id, fun _ => id, fun _ _ => rfl, fun _ _ => rfl⟩

def composeHom {X Y Z U J : Type u} {V W R : J → Type v}
    {M : Moore X U J V} {N : Moore Y U J W} {O : Moore Z U J R}
    (g : Hom N O) (f : Hom M N) : Hom M O where
  state := g.state ∘ f.state
  value j := g.value j ∘ f.value j
  step_comm a x := by simp only [Function.comp_apply, f.step_comm, g.step_comm]
  read_comm j x := by simp only [Function.comp_apply, f.read_comm, g.read_comm]

theorem morphism_word_commutes {X Y U J : Type u} {V W : J → Type v}
    {M : Moore X U J V} {N : Moore Y U J W} (f : Hom M N)
    (w : List U) (x : X) :
    f.state (run M.step w x) = run N.step w (f.state x) := by
  induction w generalizing x with
  | nil => rfl
  | cons a w ih => simp only [run, ih, f.step_comm]

theorem identity_left {X Y U J : Type u} {V W : J → Type v}
    {M : Moore X U J V} {N : Moore Y U J W} (f : Hom M N) :
    composeHom (identityHom N) f = f := by cases f; rfl

theorem morphism_word_read_commutes {X Y U J : Type u} {V W : J → Type v}
    {M : Moore X U J V} {N : Moore Y U J W} (f : Hom M N)
    (w : List U) (x : X) (j : J) :
    f.value j (M.read j (run M.step w x)) = N.read j (run N.step w (f.state x)) := by
  rw [f.read_comm, morphism_word_commutes]

theorem identity_right {X Y U J : Type u} {V W : J → Type v}
    {M : Moore X U J V} {N : Moore Y U J W} (f : Hom M N) :
    composeHom f (identityHom M) = f := by cases f; rfl

theorem composition_associative {X Y Z T U J : Type u} {V W R S : J → Type v}
    {M : Moore X U J V} {N : Moore Y U J W} {O : Moore Z U J R} {P : Moore T U J S}
    (h : Hom O P) (g : Hom N O) (f : Hom M N) :
    composeHom h (composeHom g f) = composeHom (composeHom h g) f := by
  cases h; cases g; cases f; rfl

structure ProductForecast (X U J A B : Type u) (V : J → Type v) where
  encode : X → A × B
  onto : Function.Surjective encode
  left : A → List U → (j : J) → V j
  right : B → List U → (j : J) → V j

def forecast {X U J A B : Type u} {V : J → Type v}
    (P : ProductForecast X U J A B V) (K : Finset J)
    [DecidableEq J] (x : X) (w : List U) (j : J) : V j :=
  if j ∈ K then P.left (P.encode x).1 w j else P.right (P.encode x).2 w j

theorem response_error_bound {X U J A B : Type u} {V : J → Type v}
    [∀ j, MetricSpace (V j)] [DecidableEq J] [Nonempty A] [Nontrivial B]
    (M : Moore X U J V) (P : ProductForecast X U J A B V)
    (K : Finset J) (W : Finset (List U)) (σ ε : ℝ) (_hσ : 0 < σ)
    (hsep : ∀ x y, x ≠ y → ∃ j ∈ K, ∃ w ∈ W,
      σ ≤ dist (M.read j (run M.step w x)) (M.read j (run M.step w y)))
    (herr : ∀ x j, j ∈ K → ∀ w ∈ W,
      dist (M.read j (run M.step w x)) (forecast P K x w j) ≤ ε) :
    σ / 2 ≤ ε := by
  classical
  obtain ⟨b₀, b₁, hb⟩ := exists_pair_ne B
  let a : A := Classical.choice inferInstance
  obtain ⟨x, hx⟩ := P.onto (a, b₀)
  obtain ⟨y, hy⟩ := P.onto (a, b₁)
  have hxy : x ≠ y := by
    intro h
    have h' : (a, b₀) = (a, b₁) := hx.symm.trans (congrArg P.encode h |>.trans hy)
    exact hb (congrArg Prod.snd h')
  obtain ⟨j, hj, w, hw, hd⟩ := hsep x y hxy
  have hs : forecast P K x w j = forecast P K y w j := by
    simp [forecast, hj, hx, hy]
  have hxerr := herr x j hj w hw
  rw [hs] at hxerr
  have hyerr := herr y j hj w hw
  have ht := dist_triangle (M.read j (run M.step w x))
    (forecast P K x w j) (M.read j (run M.step w y))
  rw [hs, dist_comm (forecast P K y w j)] at ht
  linarith

def samples {X U J : Type u} [Fintype X] [Fintype J]
    (W : Finset (List U)) : Finset ((X × J) × List U) :=
  (Finset.univ.product Finset.univ).product W

theorem samples_nonempty {X U J : Type u} [Fintype X] [Fintype J]
    [Nonempty X] [Nonempty J] (W : Finset (List U)) (hW : W.Nonempty) :
    (samples (X := X) (J := J) W).Nonempty := by
  classical
  obtain ⟨w, hw⟩ := hW
  exact ⟨((Classical.choice inferInstance, Classical.choice inferInstance), w),
    by simp [samples, hw]⟩

def uniformError {X U J A B : Type u} {V : J → Type v}
    [Fintype X] [Fintype J] [Nonempty X] [Nonempty J] [DecidableEq J]
    [∀ j, MetricSpace (V j)] (M : Moore X U J V)
    (P : ProductForecast X U J A B V) (K : Finset J)
    (W : Finset (List U)) (hW : W.Nonempty) : ℝ :=
  (samples (X := X) (J := J) W).sup' (samples_nonempty W hW)
    (fun z => dist (M.read z.1.2 (run M.step z.2 z.1.1))
      (forecast P K z.1.1 z.2 z.1.2))

theorem uniform_error_lower {X U J A B : Type u} {V : J → Type v}
    [Fintype X] [Fintype J] [Nonempty X] [Nonempty J] [DecidableEq J]
    [∀ j, MetricSpace (V j)] [Nonempty A] [Nontrivial B]
    (M : Moore X U J V) (P : ProductForecast X U J A B V)
    (K : Finset J) (W : Finset (List U)) (hW : W.Nonempty)
    (σ : ℝ) (hσ : 0 < σ)
    (hsep : ∀ x y, x ≠ y → ∃ j ∈ K, ∃ w ∈ W,
      σ ≤ dist (M.read j (run M.step w x)) (M.read j (run M.step w y))) :
    σ / 2 ≤ uniformError M P K W hW := by
  classical
  apply response_error_bound M P K W σ _ hσ hsep
  intro x j _ w hw
  unfold uniformError
  exact Finset.le_sup'
    (fun z : (X × J) × List U => dist (M.read z.1.2 (run M.step z.2 z.1.1))
      (forecast P K z.1.1 z.2 z.1.2))
    (show ((x, j), w) ∈ samples W from by simp [samples, hw])

theorem nonempty_family_infimum_lower {Γ X U J : Type u} {V : J → Type v}
    [Nonempty Γ] [Fintype X] [Fintype J] [Nonempty X] [Nonempty J] [DecidableEq J]
    [∀ j, MetricSpace (V j)] (A B : Γ → Type u)
    [∀ g, Nonempty (A g)] [∀ g, Nontrivial (B g)]
    (M : Moore X U J V) (family : (g : Γ) → ProductForecast X U J (A g) (B g) V)
    (K : Γ → Finset J) (W : Finset (List U)) (hW : W.Nonempty)
    (σ : ℝ) (hσ : 0 < σ)
    (hsep : ∀ g x y, x ≠ y → ∃ j ∈ K g, ∃ w ∈ W,
      σ ≤ dist (M.read j (run M.step w x)) (M.read j (run M.step w y))) :
    σ / 2 ≤ sInf (Set.range (fun g => uniformError M (family g) (K g) W hW)) := by
  apply le_csInf (Set.range_nonempty _)
  rintro _ ⟨g, rfl⟩
  exact uniform_error_lower M (family g) (K g) W hW σ hσ (hsep g)

/-- Arbitrary nonempty subfamilies, including identity-preserving restrictions. -/
theorem atomic_response_factorization {Γ X U J : Type u} {V : J → Type v}
    [Nonempty Γ] [Fintype X] [Finite U] [Fintype J]
    [Nonempty X] [Nonempty U] [Nonempty J] [DecidableEq J]
    [∀ j, MetricSpace (V j)] (A B : Γ → Type u)
    [∀ g, Nontrivial (A g)] [∀ g, Nontrivial (B g)]
    (M : Moore X U J V) (family : (g : Γ) → ProductForecast X U J (A g) (B g) V)
    (K : Γ → Finset J) (W : Finset (List U)) (hW : W.Nonempty)
    (σ : ℝ) (hσ : 0 < σ)
    (hsep : ∀ g x y, x ≠ y → ∃ j ∈ K g, ∃ w ∈ W,
      σ ≤ dist (M.read j (run M.step w x)) (M.read j (run M.step w y))) :
    (∀ g, σ / 2 ≤ uniformError M (family g) (K g) W hW) ∧
    σ / 2 ≤ sInf (Set.range (fun g => uniformError M (family g) (K g) W hW)) ∧
    ∀ δ : ℝ, 0<δ → δ<σ / 2 →
      δ<sInf (Set.range (fun g => uniformError M (family g) (K g) W hW)) := by
  have hi := nonempty_family_infimum_lower A B M family K W hW σ hσ hsep
  exact ⟨fun g => uniform_error_lower M (family g) (K g) W hW σ hσ (hsep g),
    hi, fun _ _ hδ => hδ.trans_le hi⟩

theorem exact_product_excluded {X U J A B : Type u} {V : J → Type v}
    [∀ j, MetricSpace (V j)] [DecidableEq J] [Nonempty A] [Nontrivial B]
    (M : Moore X U J V) (P : ProductForecast X U J A B V)
    (K : Finset J) (W : Finset (List U)) (σ : ℝ) (hσ : 0 < σ)
    (hsep : ∀ x y, x ≠ y → ∃ j ∈ K, ∃ w ∈ W,
      σ ≤ dist (M.read j (run M.step w x)) (M.read j (run M.step w y))) :
    ¬ (∀ x j, j ∈ K → ∀ w ∈ W,
      M.read j (run M.step w x) = forecast P K x w j) := by
  intro h
  have bound := response_error_bound M P K W σ 0 hσ hsep
    (fun x j hj w hw => by rw [h x j hj w hw]; simp)
  linarith

def bit (b : Bool) : ℝ := if b then 1 else 0

def holdMoore : Moore (Bool × Bool) Bool Bool (fun _ => ℝ) where
  step _ x := x
  read j x := bit (if j then x.2 else x.1)

def holdProduct : ProductForecast (Bool × Bool) Bool Bool Bool Bool (fun _ => ℝ) where
  encode := id
  onto := Function.surjective_id
  left a _ _ := bit a
  right b _ _ := bit b

theorem hold_word (w : List Bool) (x : Bool × Bool) : run holdMoore.step w x = x := by
  induction w generalizing x with
  | nil => rfl
  | cons a w ih => exact ih x

theorem hold_product_exact (x : Bool × Bool) (w : List Bool) (j : Bool) :
    holdMoore.read j (run holdMoore.step w x) = forecast holdProduct {false} x w j := by
  rw [hold_word]
  cases j <;> simp [forecast, holdMoore, holdProduct]

theorem hold_separator_fails :
    (false, false) ≠ (false, true) ∧ ∀ w : List Bool,
      holdMoore.read false (run holdMoore.step w (false, false)) =
        holdMoore.read false (run holdMoore.step w (false, true)) := by
  refine ⟨by decide, fun w => ?_⟩
  rw [hold_word, hold_word]
  rfl

def swapMoore : Moore (Bool × Bool) Bool Bool (fun _ => ℝ) where
  step a x := if a then (x.2, x.1) else x
  read j x := bit (if j then x.2 else x.1)

theorem swap_every_port_separates (j : Bool) (x y : Bool × Bool) (hxy : x ≠ y) :
    ∃ w ∈ ({[], [true]} : Finset (List Bool)),
      (1:ℝ) ≤ dist (swapMoore.read j (run swapMoore.step w x))
        (swapMoore.read j (run swapMoore.step w y)) := by
  rcases x with ⟨a, b⟩
  rcases y with ⟨c, d⟩
  cases j <;> cases a <;> cases b <;> cases c <;> cases d
  all_goals first
    | exact False.elim (hxy rfl)
    | (solve | refine ⟨[], by simp, ?_⟩; norm_num [swapMoore, run, bit, Real.dist_eq])
    | (solve | refine ⟨[true], by simp, ?_⟩; norm_num [swapMoore, run, bit, Real.dist_eq])

end
end QICNLean.MooreFactorization
