# CODEX v33 IMPLEMENTATION PROMPT — ∅_φ CONSISTENCY & FOUNDATION CLOSURE

> **Status:** ULTRATHINK ACTIVE. Maximum depth reasoning required. No surface-level logic.
> **For:** Codex with complex reasoning capabilities.
> **Scope:** Resolve the ∅_φ mathematical inconsistency between Paper 3 and the v31 conditional closure theorem, plus close remaining foundational gaps from the ULTRATHINK v32 plan.

---

## 0. GOVERNANCE BOUNDARY

This prompt addresses internal mathematical hardening only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, peer review, or human mathematical review. All changes must preserve existing verdicts (v25–v31 remain BLOCKED on synthetic fixtures).

---

## 1. THE CENTRAL PROBLEM: ∅_φ INCONSISTENCY

### 1.1 Current State (Post-v32)

After the v32 audit by OpenCode, a **critical mathematical inconsistency** was identified:

**Document A — `CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex` (repaired by v32):**
> "The symbol ∅_φ is a null-assignment marker: it denotes absence of an admissible phenomenological assignment and is **not assumed to be an element of E**."

**Document B — `paper3/main.tex` (NOT repaired by v32):**
- Line 88 (Abstract): "We define a null regime **∅_φ ∈ E**"
- Line 222: "∅_φ := inf E exists and is unique (the null regime)"
- Line 224: Separation axiom uses d_E(e, ∅_φ) for e ≠ ∅_φ
- Line 319–331: Instability Theorem proof uses d_E(∅_φ, ∅_φ) = 0
- Line 363: Defines E⁺ := E \\ {∅_φ}
- Lines 424, 440, 447: Multiple bounds use d_E(e, ∅_φ)

### 1.2 Why This Is a Category Error

If ∅_φ ∉ E, then:
1. **d_E is undefined** for any pair involving ∅_φ, because d_E: E × E → ℝ≥0
2. **inf E = ∅_φ** requires ∅_φ to be in the closure of E, but not necessarily in E. However, if E is a poset with metric, the infimum of a subset need not be in the subset.
3. **E⁺ := E \\ {∅_φ} = E** (set difference of an element not in the set), making the definition vacuous.
4. **The Instability Theorem proof** at line 331 commits a type error: it writes d_E(∅_φ, ∅_φ) = 0, which assumes ∅_φ is in the domain of d_E.

If ∅_φ ∈ E, then:
1. The v31 theorem repair is **unnecessary** (the original proof structure is valid)
2. But then ∅_φ is a legitimate element of the phenomenological space, and "null" is just one regime among others
3. This weakens the philosophical distinction between "absence of assignment" and "presence of null regime"

### 1.3 The Deeper Issue

The QICN corpus uses ∅_φ in **two incompatible ways simultaneously**:
- **As an element of E** (Paper 3, Papers 1–2): The null regime is the bottom element of the poset (E, ⪯), with d_E(e, ∅_φ) > 0 for e ≠ ∅_φ
- **As a typing marker for absence** (v31 repair): When Φ is undefined on some input, we "assign ∅_φ" to mean "no admissible value exists"

These two uses are **not equivalent**:
- If ∅_φ ∈ E, then Φ can map to ∅_φ as a legitimate value. The instability theorem shows two distinct points in E cannot both be ∅_φ (contradiction by separation).
- If ∅_φ ∉ E, then Φ cannot "map to" ∅_φ at all. "Assigning ∅_φ" is a type error. The correct statement is "Φ is undefined on that input."

---

## 2. RESOLUTION APPROACH: THREE OPTIONS ANALYZED

Codex must **choose one** of the following approaches after deep analysis. Do not implement all three. Pick the one that preserves the most mathematical structure while fixing the inconsistency.

### Option A: ∅_φ ∈ E (Minimal Change to Paper 3, Revert v31)

**Strategy:** Treat ∅_φ as the bottom element of (E, ⪯). Keep Paper 3 as-is. Revert the v31 theorem repair to align with Paper 3's definition.

**Pros:**
- Minimal disruption to existing corpus (Papers 1–3, all theorems)
- The instability theorem proof at line 331 becomes valid again
- The separation axiom d_E(e, ∅_φ) > 0 for e ≠ ∅_φ is well-defined

**Cons:**
- "Null" becomes just another regime in E, not "absence of assignment"
- The philosophical distinction between "no assignment" and "null regime" is lost
- The v31 document's conceptual clarification (treating null as absence) is discarded

**Required changes:**
1. Revert `CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex` to treat ∅_φ as bottom element of E
2. Remove the "not an element of E" language from v31
3. Add a remark that ∅_φ ∈ E is the bottom element, distinct from "undefined"

### Option B: ∅_φ ∉ E, Redefine All Theorems (Correct but Destructive)

**Strategy:** Adopt the v31 position. ∅_φ is NOT in E. Redefine Paper 3's phenomenological space, theorems, and proofs to use E_∂ = E ∪ {∅_φ} with an extended metric d̃_E, or avoid referencing ∅_φ inside E entirely.

**Pros:**
- Mathematically rigorous: no type confusion
- Preserves the v31 conceptual distinction between "absence" and "regime"
- Aligns with standard mathematical practice (undefined vs. special value)

**Cons:**
- **Massive rewrite required:** Paper 3's Definition 2.1, Theorem 2 (Instability), Theorem 3 (Minimal), Theorem 4 (Bound), Corollaries, and all proofs need rewriting
- Risk of introducing new errors during rewrite
- Changes the meaning of "null regime" throughout the corpus

**Required changes:**
1. Redefine phenomenological space as (E_∂, ⪯̃, d̃_E, ∅_φ) where E_∂ = E ⊔ {∅_φ} (disjoint union)
2. Define d̃_E to extend d_E with d̃_E(e, ∅_φ) = +∞ or some positive value for e ≠ ∅_φ, and d̃_E(∅_φ, ∅_φ) = 0
3. Rewrite Instability Theorem to say: "Φ cannot be undefined on both endpoints" (not "Φ cannot map both to ∅_φ")
4. Rewrite Minimal and Bound theorems similarly

### Option C: Dual-Role ∅_φ with Explicit Type Discipline (Recommended)

**Strategy:** ∅_φ plays **both roles** but in **different contexts**, explicitly distinguished:

1. **In E (Paper 3 context):** ∅_φ is the bottom element of the poset (E, ⪯). It IS an element of E. d_E(e, ∅_φ) is defined. The instability theorem works as originally written.

2. **In the assignment codomain (v31 context):** We introduce a disjoint union E ⊔ {⊥} where ⊥ is a NEW symbol (not ∅_φ) representing "undefined/absent assignment." The compatibility operator is Φ: I → E ⊔ {⊥}. When Φ(x) = ⊥, it means "no admissible value in E exists for x." When Φ(x) ∈ E, it could equal ∅_φ (the null regime within E).

**Pros:**
- Preserves ALL existing mathematics in Paper 3 (minimal changes)
- Preserves the v31 conceptual clarification (absence vs. regime)
- Introduces explicit type discipline: ⊥ ≠ ∅_φ, and ⊥ ∉ E
- The instability theorem in Paper 3 remains valid (it's about two points in E both being ∅_φ, which is impossible by separation)
- The v31 theorem can be reframed: if Φ(I) = ⊥ and Φ(Ĩ) = ⊥, this means Φ is undefined on both. The witness hypothesis requires Φ to be defined on both, so this case is excluded.

**Cons:**
- Requires introducing a new symbol ⊥ (or similar) into the framework
- Need to update terminology: "null regime" (∅_φ ∈ E) vs. "null assignment" (⊥ ∉ E)
- Some prose in Paper 3 conflates these two concepts and needs clarification

**Required changes:**
1. In Paper 3, add a remark clarifying that ∅_φ ∈ E is the bottom regime, distinct from "undefined assignment"
2. In v31, replace ∅_φ with ⊥ (or keep ∅_φ but explicitly state it denotes the ⊥ role when used as assignment output)
3. Update the v31 theorem to use the ⊥ symbol for "absent assignment"
4. Add a cross-reference note in Paper 3 pointing to v31's ⊥/∅_φ distinction

**RECOMMENDATION:** Option C. It is the only approach that:
- Preserves the existing mathematical structure of Paper 3
- Maintains the conceptual clarity of v31
- Introduces rigorous type discipline without massive rewrites
- Allows both documents to coexist consistently

---

## 3. DETAILED TASK LIST (Option C Implementation)

Execute in this exact order. Each task must be verified before proceeding.

### Task 0: Pre-Implementation Verification Gate

**Before touching any file, Codex must:**

1. Read `paper3/main.tex` lines 85–100 (abstract + scope note) and lines 218–235 (Definition 2.1)
2. Read `docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex` in full
3. Read `paper2/main.tex` lines 570–584 (Hypothesis Hϕ + nonclaim)
4. Confirm: ∅_φ is treated as element of E in Paper 3, and as non-element in v31
5. Report back: "Confirmed inconsistency. Proceeding with Option C (dual-role with ⊥)."

**Do NOT proceed to Task 1 until this gate is passed.**

---

### Task 1: Paper 3 — Clarify ∅_φ Role in Abstract and Definition

**File:** `paper3/main.tex`

**Step 1a:** Modify the abstract (line 88) from:
```latex
We define a null regime $
ullphi \in \E$ and prove a 	extbf{Phenomenological Instability Theorem}
```
To:
```latex
We define a phenomenological space $\E$ with a bottom element $
ullphi$ (the 	extbf{null regime}) and prove a 	extbf{Phenomenological Instability Theorem}. We distinguish $
ullphi rom 
ullphi_{
otin}$: the former is the bottom element of $\E$; the latter (denoted $ot$) marks absence of an admissible assignment.
```

Wait — **DO NOT** change the abstract to introduce ⊥ if it breaks the flow. Instead, add the distinction as a remark after Definition 2.1.

**Better approach (Step 1a revised):**

Keep the abstract as-is for now (it says ∅_φ ∈ E, which is correct in the Paper 3 context). Instead, add a clarifying remark immediately after Definition 2.1.

**Step 1a (revised):** After line 229 (the remark "Interpretive Neutrality"), add:

```latex
\begin{remark}[Null regime versus undefined assignment]\label{rem:null-vs-undefined}
The symbol $\nullphi$ serves two distinct roles in this framework, and conflating them creates a category error:
\begin{enumerate}
\item \textbf{Null regime ($\nullphi \in \E$):} In Definition~\ref{def:phenom}, $\nullphi$ is the bottom element of the phenomenological poset $(\E,\preceq)$. It is a legitimate element of $\E$, comparable to all other regimes via $\preceq$ and separated from them by $d_{\E}$.
\item \textbf{Undefined assignment ($\bot \notin \E$):} When a compatibility operator $\Phi$ is not defined on some input $x \in \I$, we write $\Phi(x)=\bot$ (pronounced ``bottom''). The symbol $\bot$ is disjoint from $\E$; it lives in the codomain $\E_\bot := \E \sqcup \{\bot\}$.
\end{enumerate}
The instability theorem (Theorem~\ref{thm:instability}) concerns two points in $\E$ both equaling $\nullphi$; the separation axiom forbids this because $d_{\E}(\nullphi,\nullphi)=0$ but $d_{\E}(e,\nullphi)>0$ for $e\neq\nullphi$, so two \emph{distinct} points cannot both be $\nullphi$. The v31 conditional closure theorem (see external document) concerns the case where $\Phi$ is undefined on both witness endpoints ($\Phi(\I)=\bot$ and $\Phi(\tilde{\I})=\bot$); this is excluded by the witness hypothesis, which requires $\Phi$ to be defined on both endpoints.
\end{remark}
```

**Step 1b:** Add the new command for ⊥ in the preamble. Find where \nullphi is defined (around line 62) and add after it:
```latex
\newcommand{\botmark}{\bot}
```

Wait — \bot is already a standard LaTeX symbol. No need to define a command. Just use \bot directly.

**Step 1c:** Verify that `paper3/main.tex` still compiles after these changes. Run `pdflatex` + `biber` + `pdflatex` twice. Expect 0 errors, 0 undefined references.

---

### Task 2: v31 Document — Replace ∅_φ with ⊥ for Assignment Context

**File:** `docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex`

**Step 2a:** Update the null marker definition (line 34) from:
```latex
The symbol $\nullphi$ is a null-assignment marker: it denotes absence of an admissible phenomenological assignment and is not assumed to be an element of $\E$.
```
To:
```latex
The symbol $\bot$ (``bottom'') denotes absence of an admissible phenomenological assignment. It is disjoint from $\E$; that is, $\bot \notin \E$. This is distinct from the null regime $\nullphi \in \E$, which is the bottom element of the phenomenological poset $(\E,\preceq)$ as defined in Paper~3, Definition~\ref{def:phenom}.
```

**Step 2b:** Update the theorem statement (lines 42–47) from:
```latex
Then $
  
eg(
\Phi(\I(S))=\nullphi \wedge \Phi(\tilde{\I})=\nullphi).
$
```
To:
```latex
Then $
  \neg(\Phi(\I(S))=\bot \wedge \Phi(\tilde{\I})=\bot).
$
```

**Step 2c:** Update the proof (lines 50–63) to use \bot instead of \nullphi throughout. The proof structure remains valid: if both are ⊥, then Φ is undefined on both, contradicting the witness hypothesis that requires Φ defined on both endpoints.

**Step 2d:** Update the remark (lines 65–67) to reference the distinction:
```latex
\begin{remark}[Non-claim]
CCR alone does not produce a witness, does not prove that a compatibility operator exists, and does not imply consciousness or experience. The theorem is conditional on a typed external witness and a checked lower Lipschitz bound. In particular, $\bot$ is not a point in $\E$; it marks absence of assignment. The null regime $\nullphi \in \E$ is a separate concept: it is the bottom element of the phenomenological poset, not the absence of a value.
\end{remark}
```

**Step 2e:** Compile and verify: `pdflatex CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex` twice. Expect 0 errors.

---

### Task 3: Paper 3 — Add ⊥ to the Compatibility Operator Definition

**File:** `paper3/main.tex`

**Step 3a:** Locate the Compatibility Operator definition (around line 245). Modify the signature from:
```latex
A map $\Phi: \I \to \E$ is a \textbf{compatibility operator} if it satisfies:
```
To:
```latex
A map $\Phi: \I \to \E_\bot$ where $\E_\bot := \E \sqcup \{\bot\}$ is a \textbf{compatibility operator} if it satisfies:
```

Wait — this might break existing proofs that assume Φ: I → E. The hypotheses (C1)–(C3) in Paper 3 are stated for Φ: I → E. If we change the codomain to E_⊥, we need to verify (C3) still makes sense.

(C3) is the lower Lipschitz bound: d_E(Φ(x), Φ(y)) ≥ C·d_w(x,y). This only applies when both Φ(x) and Φ(y) are in E (not ⊥). If either is ⊥, d_E is undefined.

So we need to add a precondition: the lower Lipschitz bound applies only when Φ(x), Φ(y) ∈ E.

**Better approach (Step 3a revised):**

Keep Φ: I → E in the main definition. Add a note that Φ may be partially defined, and when undefined at x, we say Φ(x) = ⊥. The Lipschitz bound (C3) applies only to pairs where both values are in E.

Modify from:
```latex
A map $\Phi: \I \to \E$ is a \textbf{compatibility operator} if it satisfies:
```
To:
```latex
A map $\Phi: \I \to \E_\bot$ where $\E_\bot := \E \sqcup \{\bot\}$ is a \textbf{compatibility operator} if, on the subset $\Phi^{-1}(\E) \subseteq \I$ where $\Phi$ takes values in $\E$, it satisfies:
```

Actually, this is too disruptive. Let's be more surgical.

**Surgical approach (Step 3a final):**

Add a clarifying sentence AFTER the definition, not changing the definition itself:

After the definition ending at line 251, add:
```latex
\begin{remark}[Partial definedness and the $\bot$ marker]\label{rem:partial-phi}
In what follows, $\Phi$ may be partially defined. If $x \in \I$ is such that no admissible phenomenological assignment exists, we write $\Phi(x)=\bot$. The hypotheses (C1)--(C3) above apply only to inputs where $\Phi(x)\in\E$. The lower Lipschitz bound (C3) in particular requires both $\Phi(x),\Phi(y)\in\E$.
\end{remark}
```

**Step 3b:** Verify no undefined references introduced. Recompile Paper 3.

---

### Task 4: Paper 3 — Fix the Instability Theorem Proof to Explicitly Use Distinctness

**File:** `paper3/main.tex`

**Step 4a:** Read the Instability Theorem proof at lines 319–343.

The current proof says:
```
Assume Φ(I)=∅_φ and Φ(Ĩ)=∅_φ.
By Definition of extension witness, d_w(I,Ĩ)=ε>0.
Applying (C3): d_E(Φ(I), Φ(Ĩ)) ≥ C·d_w(I,Ĩ) = Cε > 0.
But d_E(Φ(I), Φ(Ĩ)) = d_E(∅_φ, ∅_φ) = 0.
Contradiction.
```

**Issue:** If ∅_φ ∈ E, then d_E(∅_φ, ∅_φ) = 0 is valid (reflexivity of metric). The contradiction comes from assuming Φ(I) and Φ(Ĩ) are **distinct points** both equal to ∅_φ. But if Φ(I) = Φ(Ĩ) = ∅_φ, then d_E(∅_φ, ∅_φ) = 0 is consistent with the Lipschitz bound d_E ≥ Cε > 0 **only if** Φ(I) ≠ Φ(Ĩ).

Wait — if Φ(I) = ∅_φ and Φ(Ĩ) = ∅_φ, then Φ(I) = Φ(Ĩ), so d_E(Φ(I), Φ(Ĩ)) = 0. The Lipschitz bound says d_E(Φ(I), Φ(Ĩ)) ≥ C·d_w(I,Ĩ) = Cε > 0. So we have 0 ≥ Cε > 0, contradiction. This proof is actually CORRECT if ∅_φ ∈ E.

But the issue OpenCode identified is that the proof assumes d_E(∅_φ, ∅_φ) = 0. If ∅_φ ∉ E, this is undefined. Since we're adopting Option C (∅_φ ∈ E in Paper 3 context), this proof is VALID and needs NO CHANGES.

**Revised Step 4a:** The Instability Theorem proof in Paper 3 is **mathematically correct** under Option C because ∅_φ ∈ E in the Paper 3 context. No changes needed.

However, we should add a note to the theorem clarifying that it applies to Φ: I → E (not ⊥), and that both witness endpoints must have admissible assignments in E.

**Step 4b (actual change):** After the Instability Theorem statement (line 319), add:
```latex
\begin{remark}[Applicability scope]
This theorem assumes $\Phi(\I),\Phi(\tilde{\I})\in\E$, not $\bot$. If $\Phi$ is undefined on either endpoint (i.e., assigns $\bot$), the witness hypothesis of Definition~\ref{def:extension-witness} is violated and the theorem does not apply.
\end{remark}
```

**Step 4c:** Verify compilation.

---

### Task 5: Update v31 Adjudicator to Use ⊥ Terminology

**File:** `scripts/external-session-zero-adjudicator-v31.js`

The v31 adjudicator's foundation checks currently look at `bridge_certificate` fields. The adjudicator doesn't directly reference ∅_φ or ⊥, so **no code changes are needed** for this task.

However, the v31 report output should be updated to reference the ⊥ distinction in its governance note.

**Step 5a:** Update the `GOVERNANCE` constant (line 19) from:
```javascript
const GOVERNANCE = "This v31 report is a foundation-first internal diagnostic wrapper over v30...";
```
To include:
```javascript
const GOVERNANCE = "This v31 report is a foundation-first internal diagnostic wrapper over v30. It blocks untyped, circular, or under-specified synthetic fixtures. It distinguishes the null regime (∅_φ ∈ E, bottom element) from undefined assignment (⊥ ∉ E). It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human review.";
```

**Step 5b:** Verify `node --check scripts/external-session-zero-adjudicator-v31.js` passes.

---

### Task 6: Close L0-DEFECT-1 (Compact Hausdorff + Polish Consistency)

**File:** `paper1/main.tex`

**Step 6a:** Locate where compact Hausdorff and Polish are first mentioned together (likely in Section 3 or 4). If no explicit consistency statement exists, add an axiom:

```latex
\begin{axiom}[State space regularity]\label{ax:regularity}
Each state space $S_t$ in the projective system is a compact metric space. Consequently, each $S_t$ is both compact Hausdorff (as a topological space) and Polish (as a metric space), and the inverse limit $\mathcal{I}$ inherits a compatible compact metrizable structure.
\end{axiom}

\begin{remark}[Exclusion of non-compact Polish spaces]
Non-compact Polish spaces such as $\mathbb{R}^n$ are not covered by Axiom~\ref{ax:regularity}. Any extension of the CCR framework to non-compact settings requires additional hypotheses and is not automatically valid.
\end{remark}
```

**Step 6b:** Verify Paper 1 still compiles. Check for undefined references.

---

### Task 7: Close L0-DEFECT-2 (Channel-Projection Composition Law)

**File:** `paper1/main.tex`

**Step 7a:** After the observable channel definition (Definition 5.1), add:

```latex
\begin{definition}[Channel--projection composition]\label{def:channel-projection}
Let $\mathcal{C}:\mathcal{U}\to\mathcal{O}$ be the observable channel and let $\pi_{t+1\to t}:S_{t+1}\to S_t$ be the projective projection. The composed observable at level $t$ is defined as:
\begin{equation}
\mathcal{C}_t := \mathcal{C}\circ\iota_t\circ\pi_{\infty\to t} : \mathcal{I} \to \mathcal{O}
\end{equation}
where $\iota_t:S_t\hookrightarrow\mathcal{U}$ is the canonical inclusion and $\pi_{\infty\to t}:\mathcal{I}\to S_t$ is the projection from the inverse limit. The composition $\mathcal{C}_t$ connects the identity object $\mathcal{I}$ to observable outputs through the finite-level projection.
\end{definition}

\begin{nonclaim}[Composition existence]
Definition~\ref{def:channel-projection} assumes that the inclusion $\iota_t$ and the projection $\pi_{\infty\to t}$ exist and are continuous. For a concrete instantiation of the CCR framework, one must verify that these maps are well-defined and that their composition yields a measurable (or continuous) map from $\mathcal{I}$ to $\mathcal{O}$. QICN has not verified this composition for any concrete protocol.
\end{nonclaim}
```

**Step 7b:** Verify compilation.

---

### Task 8: Compile All Modified Documents and Run Verification Suite

**Step 8a:** Compile each modified .tex file:
```bash
# Paper 1
cd paper1 && pdflatex -interaction=nonstopmode main.tex && biber main && pdflatex main.tex && pdflatex main.tex

# Paper 2 (if modified)
cd ../paper2 && pdflatex -interaction=nonstopmode main.tex && biber main && pdflatex main.tex

# Paper 3
cd ../paper3 && pdflatex -interaction=nonstopmode main.tex && biber main && pdflatex main.tex && pdflatex main.tex

# v30 theorem
cd ../docs/theory && pdflatex -interaction=nonstopmode PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex

# v31 closure
cd ../docs/theory && pdflatex -interaction=nonstopmode CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex
```

**Step 8b:** All must produce PDF with 0 errors, 0 undefined references.

**Step 8c:** Run the full verification suite:
```bash
npm run verify:v25
npm run verify:v26
npm run verify:v27
npm run verify:v30
npm run verify:v31
node scripts/negative-control-suite.js
node scripts/validate-promotion-rules.js
```

All must PASS (with expected BLOCKED verdicts for v27–v31).

---

## 4. VERIFICATION GATES (Apply Gateguard Principles)

Before ANY edit to a .tex file with existing theorems/definitions, Codex MUST:

1. **Quote verbatim** the exact lines to be modified (copy-paste from Read tool output)
2. **List all downstream references** to the modified definition/theorem (use Grep for label names)
3. **Confirm** the change does not break any proof that references the modified concept
4. **Show the diff** before and after
5. **Compile** before claiming success

Before ANY edit to a .js file, Codex MUST:

1. Run `node --check <file>` before and after
2. Run the relevant `npm run verify:vXX` command
3. Confirm the verdict is unchanged (still BLOCKED where expected)

---

## 5. EXPLICITLY OUT OF SCOPE (Do NOT Implement)

The following items from the ULTRATHINK plan are NOT addressed in this prompt because they require deeper mathematical work beyond symbol consistency:

1. **L4 (Estimator gaps):** Computing K_i, ω_i, ε_i for QICN invariants — requires mapping invariants to metric spaces
2. **L5 (Factorization):** Proving or disproving C ∈ σ(F₁,...,F₆) — requires defining claim algebra
3. **D_ext,N implementation:** Requires architectural design of external distance computation
4. **OCC negative controls:** Requires defining orthogonal complement class test fixtures
5. **v22 monolithic quality:** 91 LaTeX warnings and overfull boxes — requires layout cleanup, not mathematical fixes

These remain open and documented in `docs/reports/V32_INDEPENDENT_AUDIT_OPENCODE.md`.

---

## 6. EXPECTED DELIVERABLES

1. `paper3/main.tex` — Updated with ∅_φ/⊥ distinction, Remark 2.1, and Instability Theorem scope note
2. `docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex` — Updated to use ⊥ consistently
3. `paper1/main.tex` — Updated with Axiom of State Space Regularity and Channel-Projection Composition
4. `scripts/external-session-zero-adjudicator-v31.js` — Updated governance note referencing ⊥ distinction
5. Compiled PDFs for all modified documents
6. All verification tests PASS
7. A brief report (3–5 bullet points) summarizing what was changed and why

---

## 7. FAILURE MODES TO AVOID

1. **Do NOT** change the Instability Theorem proof in Paper 3. Under Option C (∅_φ ∈ E in Paper 3), the proof is mathematically correct.
2. **Do NOT** introduce ⊥ into Paper 3's Definition 2.1 as an element of E. ⊥ is disjoint from E.
3. **Do NOT** change any existing theorem statement in Paper 3 unless it's explicitly about the assignment codomain.
4. **Do NOT** forget to compile after each .tex change. LaTeX errors compound silently.
5. **Do NOT** change the numerical output of the adjudicators. The verdict must remain BLOCKED.
6. **Do NOT** invent new metrics or implementations not requested.

---

*End of ULTRATHINK v33 Prompt.*
