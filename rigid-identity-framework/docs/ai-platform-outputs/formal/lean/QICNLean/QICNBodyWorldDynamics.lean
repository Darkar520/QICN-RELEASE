import Mathlib.Data.Real.Basic
import Mathlib.Tactic.Linarith
import Mathlib.Tactic.NormNum
import Mathlib.Tactic.Ring

/-! Coordinate proofs for the body--world fibre. A fixed signed frame is
transported to these coordinates. The row envelope is the declared infinity
operator bound, not an assumed contraction conclusion. -/
namespace QICNBodyWorldDynamics

noncomputable section

structure Fibre where
  b₁ : ℝ
  b₂ : ℝ
  w₁ : ℝ
  w₂ : ℝ

def zeroFibre : Fibre := ⟨0, 0, 0, 0⟩

def Bounded (z : Fibre) (r : ℝ) : Prop :=
  |z.b₁| ≤ r ∧ |z.b₂| ≤ r ∧ |z.w₁| ≤ r ∧ |z.w₂| ≤ r

def Close (x y : Fibre) (r : ℝ) : Prop :=
  |x.b₁-y.b₁| ≤ r ∧ |x.b₂-y.b₂| ≤ r ∧
  |x.w₁-y.w₁| ≤ r ∧ |x.w₂-y.w₂| ≤ r

def lift {X : Type*} (F : X → X) (G : X → Fibre → Fibre)
    (z : X × Fibre) : X × Fibre := (F z.1, G z.1 z.2)

theorem projection_commutes {X : Type*} (F : X → X) (G : X → Fibre → Fibre)
    (z : X × Fibre) : (lift F G z).1 = F z.1 := rfl

theorem zero_section_invariant {X : Type*} (F : X → X) (G : X → Fibre → Fibre)
    (h : ∀ x, G x zeroFibre = zeroFibre) (x : X) :
    lift F G (x, zeroFibre) = (F x, zeroFibre) := by
  simp [lift, h]

private lemma absolute_sum_le (x y : ℝ) : |x+y| ≤ |x|+|y| := by
  simpa only [sub_zero,sub_neg_eq_add,zero_sub,neg_neg,abs_neg,zero_add] using
    (abs_sub_le x 0 (-y))

private lemma row_bound (a b x y r : ℝ) (hr : 0 ≤ r)
    (hx : |x| ≤ r) (hy : |y| ≤ r) :
    |a*x+b*y| ≤ (|a|+|b|)*r := by
  calc
    |a*x+b*y| ≤ |a*x|+|b*y| := absolute_sum_le _ _
    _ = |a| * |x|+|b| * |y| := by rw [abs_mul, abs_mul]
    _ ≤ (|a|+|b|)*r := by nlinarith [abs_nonneg a, abs_nonneg b]

private lemma sum_bound (x y r s : ℝ) (hx : |x| ≤ r) (hy : |y| ≤ s) :
    |x+y| ≤ r+s := le_trans (absolute_sum_le _ _) (add_le_add hx hy)

private lemma difference_bound (x y r : ℝ) (hx : |x| ≤ r) (hy : |y| ≤ r) :
    |x-y| ≤ 2*r := by
  calc
    |x-y| ≤ |x|+|y| := by simpa [sub_eq_add_neg] using absolute_sum_le x (-y)
    _ ≤ 2*r := by linarith

def body (b w g p : ℝ) : ℝ := b/4+w/4+g/8+p
def world (b w μ d : ℝ) : ℝ := w/4+μ*b/4+d

theorem body_envelope (b w g p r : ℝ) (hr : 0 ≤ r)
    (hb : |b| ≤ r) (hw : |w| ≤ r) (hg : |g| ≤ 2*r) :
    |body b w g p-p| ≤ 3*r/4 := by
  have h := row_bound (1/4) (1/4) b w r hr hb hw
  have hg' : |g/8| ≤ r/4 := by
    rw [abs_div]
    norm_num
    linarith
  norm_num at h
  have hs := sum_bound (b/4+w/4) (g/8) (r/2) (r/4) (by convert h using 1 <;> ring) hg'
  dsimp [body]
  convert hs using 1 <;> ring

theorem native_body_envelope (b w p r : ℝ) (hr : 0 ≤ r)
    (hb : |b| ≤ r) (hw : |w| ≤ r) :
    |body b w 0 p-p| ≤ r/2 := by
  have h := row_bound (1/4) (1/4) b w r hr hb hw
  norm_num at h
  dsimp [body]
  convert h using 1 <;> ring

theorem world_envelope (b w μ d r : ℝ) (hr : 0 ≤ r)
    (hb : |b| ≤ r) (hw : |w| ≤ r) (hm : |μ| ≤ 1) :
    |world b w μ d-d| ≤ r/2 := by
  have hmul : |μ*b| ≤ r := by
    rw [abs_mul]
    nlinarith [abs_nonneg μ, abs_nonneg b]
  have h := row_bound (1/4) (1/4) w (μ*b) r hr hw hmul
  norm_num at h
  dsimp [world]
  convert h using 1 <;> ring

/-- Any row with l1 norm at most one sends the error difference to at most 2r. -/
theorem evaluation_row_error (a b db₁ db₂ dw₁ dw₂ r : ℝ) (hr : 0 ≤ r)
    (ha : |a|+|b| ≤ 1) (hb₁ : |db₁| ≤ r) (hb₂ : |db₂| ≤ r)
    (hw₁ : |dw₁| ≤ r) (hw₂ : |dw₂| ≤ r) :
    |a*(dw₁-db₁)+b*(dw₂-db₂)| ≤ 2*r := by
  have h := row_bound a b (dw₁-db₁) (dw₂-db₂) (2*r) (by linarith)
    (difference_bound _ _ _ hw₁ hb₁) (difference_bound _ _ _ hw₂ hb₂)
  nlinarith

def update (z : Fibre) (g₁ g₂ μ p₁ p₂ d₁ d₂ : ℝ) : Fibre :=
  ⟨body z.b₁ z.w₁ g₁ p₁, body z.b₂ z.w₂ g₂ p₂,
   world z.b₁ z.w₁ μ d₁, world z.b₂ z.w₂ μ d₂⟩

theorem intervened_cube (z : Fibre) (g₁ g₂ μ p₁ p₂ d₁ d₂ : ℝ)
    (hz : Bounded z 1) (hg₁ : |g₁| ≤ 2) (hg₂ : |g₂| ≤ 2)
    (hm : |μ| ≤ 1) (hp₁ : |p₁| ≤ 1/4) (hp₂ : |p₂| ≤ 1/4)
    (hd₁ : |d₁| ≤ 1/4) (hd₂ : |d₂| ≤ 1/4) :
    Bounded (update z g₁ g₂ μ p₁ p₂ d₁ d₂) 1 := by
  rcases hz with ⟨h₁,h₂,h₃,h₄⟩
  have b₁ := body_envelope z.b₁ z.w₁ g₁ p₁ 1 (by norm_num) h₁ h₃ (by simpa using hg₁)
  have b₂ := body_envelope z.b₂ z.w₂ g₂ p₂ 1 (by norm_num) h₂ h₄ (by simpa using hg₂)
  have w₁ := world_envelope z.b₁ z.w₁ μ d₁ 1 (by norm_num) h₁ h₃ hm
  have w₂ := world_envelope z.b₂ z.w₂ μ d₂ 1 (by norm_num) h₂ h₄ hm
  have hb₁ := absolute_sum_le (body z.b₁ z.w₁ g₁ p₁-p₁) p₁
  have hb₂ := absolute_sum_le (body z.b₂ z.w₂ g₂ p₂-p₂) p₂
  have hw₁ := absolute_sum_le (world z.b₁ z.w₁ μ d₁-d₁) d₁
  have hw₂ := absolute_sum_le (world z.b₂ z.w₂ μ d₂-d₂) d₂
  dsimp [Bounded,update]
  constructor
  · convert (show |body z.b₁ z.w₁ g₁ p₁| ≤ 1 by simpa using (show |body z.b₁ z.w₁ g₁ p₁-p₁+p₁| ≤ 1 by linarith))
  constructor
  · simpa using (show |body z.b₂ z.w₂ g₂ p₂-p₂+p₂| ≤ 1 by linarith)
  constructor
  · simpa using (show |world z.b₁ z.w₁ μ d₁-d₁+d₁| ≤ 1 by linarith)
  · simpa using (show |world z.b₂ z.w₂ μ d₂-d₂+d₂| ≤ 1 by linarith)

theorem update_zero (μ : ℝ) : update zeroFibre 0 0 μ 0 0 0 0 = zeroFibre := by
  simp [update,zeroFibre,body,world]

theorem body_difference (b w g B W G p r : ℝ) (hr : 0 ≤ r)
    (hb : |b-B| ≤ r) (hw : |w-W| ≤ r) (hg : |g-G| ≤ 2*r) :
    |body b w g p-body B W G p| ≤ 3*r/4 := by
  convert body_envelope (b-B) (w-W) (g-G) 0 r hr hb hw hg using 1 <;> congr 1 <;> (try dsimp [body]) <;> ring

theorem native_body_difference (b w B W p r : ℝ) (hr : 0 ≤ r)
    (hb : |b-B| ≤ r) (hw : |w-W| ≤ r) :
    |body b w 0 p-body B W 0 p| ≤ r/2 := by
  convert native_body_envelope (b-B) (w-W) 0 r hr hb hw using 1 <;> congr 1 <;> (try dsimp [body]) <;> ring

theorem world_difference (b w B W μ d r : ℝ) (hr : 0 ≤ r)
    (hb : |b-B| ≤ r) (hw : |w-W| ≤ r) (hm : |μ| ≤ 1) :
    |world b w μ d-world B W μ d| ≤ r/2 := by
  convert world_envelope (b-B) (w-W) μ 0 r hr hb hw hm using 1 <;> congr 1 <;> (try dsimp [world]) <;> ring

theorem native_contraction (x y : Fibre) (μ p₁ p₂ d₁ d₂ r : ℝ)
    (hr : 0 ≤ r) (hxy : Close x y r) (hm : |μ| ≤ 1) :
    Close (update x 0 0 μ p₁ p₂ d₁ d₂) (update y 0 0 μ p₁ p₂ d₁ d₂) (r/2) := by
  rcases hxy with ⟨h₁,h₂,h₃,h₄⟩
  exact ⟨native_body_difference _ _ _ _ _ _ hr h₁ h₃,
    native_body_difference _ _ _ _ _ _ hr h₂ h₄,
    world_difference _ _ _ _ _ _ _ hr h₁ h₃ hm,
    world_difference _ _ _ _ _ _ _ hr h₂ h₄ hm⟩

theorem intervened_contraction (x y : Fibre) (g₁ g₂ G₁ G₂ μ p₁ p₂ d₁ d₂ r : ℝ)
    (hr : 0 ≤ r) (hxy : Close x y r) (hm : |μ| ≤ 1)
    (hg₁ : |g₁-G₁| ≤ 2*r) (hg₂ : |g₂-G₂| ≤ 2*r) :
    Close (update x g₁ g₂ μ p₁ p₂ d₁ d₂) (update y G₁ G₂ μ p₁ p₂ d₁ d₂) (3*r/4) := by
  rcases hxy with ⟨h₁,h₂,h₃,h₄⟩
  have w₁ := world_difference _ _ _ _ μ d₁ r hr h₁ h₃ hm
  have w₂ := world_difference _ _ _ _ μ d₂ r hr h₂ h₄ hm
  dsimp [Close,update]
  exact ⟨body_difference _ _ _ _ _ _ _ _ hr h₁ h₃ hg₁,
    body_difference _ _ _ _ _ _ _ _ hr h₂ h₄ hg₂, by linarith, by linarith⟩

/-- Product discrepancy is Lipschitz on the entire safe error square. -/
theorem product_difference_bound (x y X Y r : ℝ) (hr : 0 ≤ r)
    (hx : |x| ≤ 2) (hY : |Y| ≤ 2) (hdy : |y-Y| ≤ 2*r) (hdx : |x-X| ≤ 2*r) :
    |x*y-X*Y| ≤ 8*r := by
  have a : |x*(y-Y)| ≤ 4*r := by rw [abs_mul]; nlinarith [abs_nonneg x,abs_nonneg (y-Y)]
  have b : |(x-X)*Y| ≤ 4*r := by rw [abs_mul]; nlinarith [abs_nonneg Y,abs_nonneg (x-X)]
  have h := sum_bound (x*(y-Y)) ((x-X)*Y) (4*r) (4*r) a b
  convert h using 1 <;> congr 1 <;> ring

def nonlinearBody₁ (b₁ b₂ w₁ w₂ p : ℝ) : ℝ :=
  (3*b₁+b₂+5*w₁-w₂)/16+(w₁-b₁)*(w₂-b₂)/64+p

def normalBody₂ (b₁ b₂ w₁ w₂ p : ℝ) : ℝ :=
  (-b₁+3*b₂+w₁+5*w₂)/16+p

private lemma four_row_bound (a b c d x y z w r : ℝ) (hr : 0 ≤ r)
    (hx : |x| ≤ r) (hy : |y| ≤ r) (hz : |z| ≤ r) (hw : |w| ≤ r) :
    |a*x+b*y+c*z+d*w| ≤ (|a|+|b|+|c|+|d|)*r := by
  have h₁ := row_bound a b x y r hr hx hy
  have h₂ := row_bound c d z w r hr hz hw
  have h := sum_bound (a*x+b*y) (c*z+d*w) ((|a|+|b|)*r) ((|c|+|d|)*r) h₁ h₂
  convert h using 1 <;> congr 1 <;> ring

theorem normal_body_difference (b₁ b₂ w₁ w₂ B₁ B₂ W₁ W₂ p r : ℝ)
    (hr : 0 ≤ r) (h₁ : |b₁-B₁| ≤ r) (h₂ : |b₂-B₂| ≤ r)
    (h₃ : |w₁-W₁| ≤ r) (h₄ : |w₂-W₂| ≤ r) :
    |normalBody₂ b₁ b₂ w₁ w₂ p-normalBody₂ B₁ B₂ W₁ W₂ p| ≤ 5*r/8 := by
  have h := four_row_bound (-1/16) (3/16) (1/16) (5/16)
    (b₁-B₁) (b₂-B₂) (w₁-W₁) (w₂-W₂) r hr h₁ h₂ h₃ h₄
  norm_num at h
  convert h using 1 <;> congr 1 <;> (try dsimp [normalBody₂]) <;> ring

theorem nonlinear_body_difference (b₁ b₂ w₁ w₂ B₁ B₂ W₁ W₂ p r : ℝ)
    (hr : 0 ≤ r) (h₁ : |b₁-B₁| ≤ r) (h₂ : |b₂-B₂| ≤ r)
    (h₃ : |w₁-W₁| ≤ r) (h₄ : |w₂-W₂| ≤ r)
    (he : |w₁-b₁| ≤ 2) (hE : |W₂-B₂| ≤ 2) :
    |nonlinearBody₁ b₁ b₂ w₁ w₂ p-nonlinearBody₁ B₁ B₂ W₁ W₂ p| ≤ 3*r/4 := by
  have hl := four_row_bound (3/16) (1/16) (5/16) (-1/16)
    (b₁-B₁) (b₂-B₂) (w₁-W₁) (w₂-W₂) r hr h₁ h₂ h₃ h₄
  norm_num at hl
  have hd₁ : |(w₁-b₁)-(W₁-B₁)| ≤ 2*r := by
    convert difference_bound (w₁-W₁) (b₁-B₁) r h₃ h₁ using 1 <;> congr 1 <;> ring
  have hd₂ : |(w₂-b₂)-(W₂-B₂)| ≤ 2*r := by
    convert difference_bound (w₂-W₂) (b₂-B₂) r h₄ h₂ using 1 <;> congr 1 <;> ring
  have hp := product_difference_bound (w₁-b₁) (w₂-b₂) (W₁-B₁) (W₂-B₂) r hr he hE hd₂ hd₁
  have hp' : |((w₁-b₁)*(w₂-b₂)-(W₁-B₁)*(W₂-B₂))/64| ≤ r/8 := by
    rw [abs_div]
    norm_num
    linarith
  have h := sum_bound ((3/16)*(b₁-B₁)+(1/16)*(b₂-B₂)+(5/16)*(w₁-W₁)+(-1/16)*(w₂-W₂))
    (((w₁-b₁)*(w₂-b₂)-(W₁-B₁)*(W₂-B₂))/64) (5*r/8) (r/8) (by convert hl using 1 <;> ring) hp'
  convert h using 1 <;> congr 1 <;> (try dsimp [nonlinearBody₁]) <;> ring

theorem nonlinear_body_cube (b₁ b₂ w₁ w₂ p : ℝ)
    (h₁ : |b₁| ≤ 1) (h₂ : |b₂| ≤ 1) (h₃ : |w₁| ≤ 1) (h₄ : |w₂| ≤ 1)
    (hp : |p| ≤ 1/4) : |nonlinearBody₁ b₁ b₂ w₁ w₂ p| ≤ 15/16 := by
  have hl := four_row_bound (3/16) (1/16) (5/16) (-1/16) b₁ b₂ w₁ w₂ 1 (by norm_num) h₁ h₂ h₃ h₄
  norm_num at hl
  have he₁ : |w₁-b₁| ≤ 2 := by simpa using difference_bound w₁ b₁ 1 h₃ h₁
  have he₂ : |w₂-b₂| ≤ 2 := by simpa using difference_bound w₂ b₂ 1 h₄ h₂
  have hprod : |(w₁-b₁)*(w₂-b₂)| ≤ 4 := by rw [abs_mul]; nlinarith [abs_nonneg (w₁-b₁),abs_nonneg (w₂-b₂)]
  rw [abs_mul] at hprod
  have hn : |(w₁-b₁)*(w₂-b₂)/64| ≤ 1/16 := by
    rw [abs_div]
    norm_num
    linarith
  have hh := sum_bound ((3/16)*b₁+(1/16)*b₂+(5/16)*w₁+(-1/16)*w₂)
    ((w₁-b₁)*(w₂-b₂)/64) (5/8) (1/16) (by convert hl using 1 <;> ring) hn
  have hf := sum_bound (((3/16)*b₁+(1/16)*b₂+(5/16)*w₁+(-1/16)*w₂)+((w₁-b₁)*(w₂-b₂)/64)) p
    (5/8+1/16) (1/4) hh hp
  convert hf using 1 <;> congr 1 <;> (try dsimp [nonlinearBody₁]) <;> ring

theorem normal_body_cube (b₁ b₂ w₁ w₂ p : ℝ)
    (h₁ : |b₁| ≤ 1) (h₂ : |b₂| ≤ 1) (h₃ : |w₁| ≤ 1) (h₄ : |w₂| ≤ 1)
    (hp : |p| ≤ 1/4) : |normalBody₂ b₁ b₂ w₁ w₂ p| ≤ 7/8 := by
  have hl := four_row_bound (-1/16) (3/16) (1/16) (5/16) b₁ b₂ w₁ w₂ 1 (by norm_num) h₁ h₂ h₃ h₄
  norm_num at hl
  have h := sum_bound ((-1/16)*b₁+(3/16)*b₂+(1/16)*w₁+(5/16)*w₂) p (5/8) (1/4)
    (by convert hl using 1 <;> ring) hp
  convert h using 1 <;> congr 1 <;> (try dsimp [normalBody₂]) <;> ring

def nonlinearUpdate (z : Fibre) (μ p₁ p₂ d₁ d₂ : ℝ) : Fibre :=
  ⟨nonlinearBody₁ z.b₁ z.b₂ z.w₁ z.w₂ p₁,
   normalBody₂ z.b₁ z.b₂ z.w₁ z.w₂ p₂,
   world z.b₁ z.w₁ μ d₁, world z.b₂ z.w₂ μ d₂⟩

theorem nonlinear_cube (z : Fibre) (μ p₁ p₂ d₁ d₂ : ℝ)
    (hz : Bounded z 1) (hm : |μ| ≤ 1)
    (hp₁ : |p₁| ≤ 1/4) (hp₂ : |p₂| ≤ 1/4)
    (hd₁ : |d₁| ≤ 1/4) (hd₂ : |d₂| ≤ 1/4) :
    Bounded (nonlinearUpdate z μ p₁ p₂ d₁ d₂) 1 := by
  rcases hz with ⟨h₁,h₂,h₃,h₄⟩
  have a := nonlinear_body_cube _ _ _ _ _ h₁ h₂ h₃ h₄ hp₁
  have b := normal_body_cube _ _ _ _ _ h₁ h₂ h₃ h₄ hp₂
  have c := world_envelope _ _ μ d₁ 1 (by norm_num) h₁ h₃ hm
  have d := world_envelope _ _ μ d₂ 1 (by norm_num) h₂ h₄ hm
  have c' := sum_bound (world z.b₁ z.w₁ μ d₁-d₁) d₁ (1/2) (1/4) (by simpa using c) hd₁
  have d' := sum_bound (world z.b₂ z.w₂ μ d₂-d₂) d₂ (1/2) (1/4) (by simpa using d) hd₂
  dsimp [Bounded,nonlinearUpdate]
  exact ⟨by linarith,by linarith,by simpa using (show |world z.b₁ z.w₁ μ d₁-d₁+d₁| ≤ 1 by linarith),
    by simpa using (show |world z.b₂ z.w₂ μ d₂-d₂+d₂| ≤ 1 by linarith)⟩

theorem nonlinear_contraction (x y : Fibre) (μ p₁ p₂ d₁ d₂ r : ℝ)
    (hr : 0 ≤ r) (hx : Bounded x 1) (hy : Bounded y 1)
    (hxy : Close x y r) (hm : |μ| ≤ 1) :
    Close (nonlinearUpdate x μ p₁ p₂ d₁ d₂) (nonlinearUpdate y μ p₁ p₂ d₁ d₂) (3*r/4) := by
  rcases hxy with ⟨h₁,h₂,h₃,h₄⟩
  have he : |x.w₁-x.b₁| ≤ 2 := by simpa using difference_bound x.w₁ x.b₁ 1 hx.2.2.1 hx.1
  have hE : |y.w₂-y.b₂| ≤ 2 := by simpa using difference_bound y.w₂ y.b₂ 1 hy.2.2.2 hy.2.1
  have a := nonlinear_body_difference x.b₁ x.b₂ x.w₁ x.w₂ y.b₁ y.b₂ y.w₁ y.w₂ p₁ r hr h₁ h₂ h₃ h₄ he hE
  have b := normal_body_difference x.b₁ x.b₂ x.w₁ x.w₂ y.b₁ y.b₂ y.w₁ y.w₂ p₂ r hr h₁ h₂ h₃ h₄
  have c := world_difference _ _ _ _ μ d₁ r hr h₁ h₃ hm
  have d := world_difference _ _ _ _ μ d₂ r hr h₂ h₄ hm
  dsimp [Close,nonlinearUpdate]
  exact ⟨a,by linarith,by linarith,by linarith⟩


/-- The row parameters are applied to the actual discrepancy, rather than
an externally supplied evaluation increment. -/
def evaluatedUpdate (z : Fibre) (a₁ a₂ c₁ c₂ μ p₁ p₂ d₁ d₂ : ℝ) : Fibre :=
  update z (a₁*(z.w₁-z.b₁)+a₂*(z.w₂-z.b₂))
    (c₁*(z.w₁-z.b₁)+c₂*(z.w₂-z.b₂)) μ p₁ p₂ d₁ d₂

theorem evaluated_cube (z : Fibre) (a₁ a₂ c₁ c₂ μ p₁ p₂ d₁ d₂ : ℝ)
    (hz : Bounded z 1) (ha : |a₁|+|a₂| ≤ 1) (hc : |c₁|+|c₂| ≤ 1)
    (hm : |μ| ≤ 1) (hp₁ : |p₁| ≤ 1/4) (hp₂ : |p₂| ≤ 1/4)
    (hd₁ : |d₁| ≤ 1/4) (hd₂ : |d₂| ≤ 1/4) :
    Bounded (evaluatedUpdate z a₁ a₂ c₁ c₂ μ p₁ p₂ d₁ d₂) 1 := by
  apply intervened_cube
  · exact hz
  · simpa using evaluation_row_error a₁ a₂ z.b₁ z.b₂ z.w₁ z.w₂ 1
      (by norm_num) ha hz.1 hz.2.1 hz.2.2.1 hz.2.2.2
  · simpa using evaluation_row_error c₁ c₂ z.b₁ z.b₂ z.w₁ z.w₂ 1
      (by norm_num) hc hz.1 hz.2.1 hz.2.2.1 hz.2.2.2
  · exact hm
  · exact hp₁
  · exact hp₂
  · exact hd₁
  · exact hd₂

theorem evaluated_contraction (x y : Fibre) (a₁ a₂ c₁ c₂ μ p₁ p₂ d₁ d₂ r : ℝ)
    (hr : 0 ≤ r) (hxy : Close x y r) (ha : |a₁|+|a₂| ≤ 1)
    (hc : |c₁|+|c₂| ≤ 1) (hm : |μ| ≤ 1) :
    Close (evaluatedUpdate x a₁ a₂ c₁ c₂ μ p₁ p₂ d₁ d₂)
      (evaluatedUpdate y a₁ a₂ c₁ c₂ μ p₁ p₂ d₁ d₂) (3*r/4) := by
  apply intervened_contraction
  · exact hr
  · exact hxy
  · exact hm
  · have bound := evaluation_row_error a₁ a₂ (x.b₁-y.b₁) (x.b₂-y.b₂)
      (x.w₁-y.w₁) (x.w₂-y.w₂) r hr ha hxy.1 hxy.2.1 hxy.2.2.1 hxy.2.2.2
    convert bound using 1 <;> congr 1 <;> ring
  · have bound := evaluation_row_error c₁ c₂ (x.b₁-y.b₁) (x.b₂-y.b₂)
      (x.w₁-y.w₁) (x.w₂-y.w₂) r hr hc hxy.1 hxy.2.1 hxy.2.2.1 hxy.2.2.2
    convert bound using 1 <;> congr 1 <;> ring

theorem evaluated_update_zero (a₁ a₂ c₁ c₂ μ : ℝ) :
    evaluatedUpdate zeroFibre a₁ a₂ c₁ c₂ μ 0 0 0 0 = zeroFibre := by
  simp [evaluatedUpdate,zeroFibre,update,body,world]

theorem nonlinear_update_zero (μ : ℝ) :
    nonlinearUpdate zeroFibre μ 0 0 0 0 = zeroFibre := by
  simp [nonlinearUpdate,nonlinearBody₁,normalBody₂,zeroFibre,world]

end
end QICNBodyWorldDynamics
