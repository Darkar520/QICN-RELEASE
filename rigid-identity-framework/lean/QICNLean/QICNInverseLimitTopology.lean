import QICNLean.QICNProjectiveTransport
import Mathlib.Topology.Constructions
import Mathlib.Topology.Compactness.Compact
import Mathlib.Topology.Separation.Hausdorff

/-!
# Full successor inverse limits with the product-subspace topology

All stages are indexed by Nat, not bounded prefixes. The closed/compact result
requires Hausdorff coordinates and continuous bonds; nonemptiness is proved
separately from an initial state and surjective bonds. No weighted-metric
completeness, metrizability or quantitative tail bound is inferred from this.
Registry anchors: paper1:theorem:thm-minimal; the endomorphism propositions in
BaseCore/Paper II; weighted inverse-limit claims only as partial components.
-/
namespace QICNLean.InverseLimitTopology

universe u v
variable {S : ℕ → Type u} (p : (n : ℕ) → S (n + 1) → S n)

/-- Exactly the subtype topology inherited from the full coordinate product. -/
instance projectiveTopology [∀ n, TopologicalSpace (S n)] :
    TopologicalSpace (QICNLean.ProjectiveHistories p) := by
  unfold QICNLean.ProjectiveHistories
  infer_instance

theorem coherent_set_closed [∀ n, TopologicalSpace (S n)] [∀ n, T2Space (S n)]
    (hp : ∀ n, Continuous (p n)) :
    IsClosed {x : (n : ℕ) → S n | ∀ n, p n (x (n + 1)) = x n} := by
  simp only [Set.setOf_forall]
  exact isClosed_iInter (fun n => isClosed_eq
    ((hp n).comp (continuous_apply (n + 1))) (continuous_apply n))

theorem coherent_set_compact [∀ n, TopologicalSpace (S n)] [∀ n, T2Space (S n)]
    [∀ n, CompactSpace (S n)] (hp : ∀ n, Continuous (p n)) :
    IsCompact {x : (n : ℕ) → S n | ∀ n, p n (x (n + 1)) = x n} :=
  (coherent_set_closed p hp).isCompact

theorem inverse_limit_nonempty [Nonempty (S 0)] (hp : ∀ n, Function.Surjective (p n)) :
    Nonempty (QICNLean.ProjectiveHistories p) := by
  classical
  let stages : (n : ℕ) → S n := Nat.rec (Classical.choice inferInstance)
    (fun n x => Classical.choose (hp n x))
  exact ⟨⟨stages, fun n => Classical.choose_spec (hp n (stages n))⟩⟩

theorem projections_separate (x y : QICNLean.ProjectiveHistories p)
    (h : ∀ n, x.val n = y.val n) : x = y :=
  Subtype.ext (funext h)

theorem projections_fix_endomorphism (F : QICNLean.ProjectiveHistories p →
    QICNLean.ProjectiveHistories p) (hF : ∀ x n, (F x).val n = x.val n) :
    F = id := by
  funext x
  exact projections_separate p (F x) x (hF x)

def coneLift {J : Type v} (q : (n : ℕ) → J → S n)
    (hq : ∀ n j, p n (q (n + 1) j) = q n j) (j : J) :
    QICNLean.ProjectiveHistories p := ⟨fun n => q n j, fun n => hq n j⟩

theorem compatible_cone_unique_lift {J : Type v} (q : (n : ℕ) → J → S n)
    (hq : ∀ n j, p n (q (n + 1) j) = q n j) :
    ∃! f : J → QICNLean.ProjectiveHistories p, ∀ j n, (f j).val n = q n j := by
  refine ⟨coneLift p q hq, fun _ _ => rfl, ?_⟩
  intro f hf
  funext j
  exact projections_separate p (f j) (coneLift p q hq j) (hf j)

theorem coneLift_continuous {J : Type v} [TopologicalSpace J]
    [∀ n, TopologicalSpace (S n)] (q : (n : ℕ) → J → S n)
    (hq : ∀ n j, p n (q (n + 1) j) = q n j) (hc : ∀ n, Continuous (q n)) :
    Continuous (coneLift p q hq) :=
  (continuous_pi hc).subtype_mk _

end QICNLean.InverseLimitTopology
