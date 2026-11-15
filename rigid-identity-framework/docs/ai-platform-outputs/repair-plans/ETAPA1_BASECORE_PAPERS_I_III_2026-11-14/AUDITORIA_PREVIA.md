# Etapa 1: notas de auditoría, antes de editar las fuentes

Base f7171e7; rama inicial codex/ruta6-lean, limpia, +3 respecto a main05f8e55.
Petición: adjunto6217133e-c77c-4e2a-a56b-d5879c2d087f. Usuario autorizó
completar baseline aunque supere10min. Snapshot E:/QICN-PRESERVACION/
2026-11-14-etapa1-base-papers1-3/baseline,866 archivos, sin junction recorrida.
Runner baseline.py: raíz3, prose,FCR,macros,nonclaims,overlays,math,Lean,cobertura.
Nueve pasos iniciales aprobados; Lean en curso, sesión14170. No editar fuentes
hasta completar los11pasos. WSL diagnóstico read-only90.94s en3 intentos:
PATH sin lean/lake, tampoco binarios en ~/.elan/toolchains/*; systemd user
session falla. Primeros intentos corrigieron transporte quoting/CRLF;
terceroUTF8LF devuelve detección negativa, sin instalaciones ni cambios WSL.
No prometer que no existe ningún binario fuera de las ubicaciones examinadas.

## Lecturas y hallazgos

Leídos AGENTS,5docs canónicos, INSTRUCCIONES, roadmap(capítulos actuales y
estructura histórica); BaseCore02,04,05,07,08,11; targetsP1/P2/P3; schemaFCR,
extractor/registry-lib, scripts de controles/gates. AUDIT_MASTER_v5.md no está
en el checkout (buscaron rg --files raíz/inner); preservar referencias históricas
y no inventar revisión externa. REQUIRED_AUDIT_COVERAGE exige audit_status
en15items, no los4 nulos, pero sí preservar todos los overlays. registry-lib
tiene overrides que reintroducen democión obsoleta de los4nulos: actualizar
estos defaults junto con los4 registros, reteniendo historia/counterexample.
Otros campos curados, IDs y fuentesIV-X intocables.

## Espectral BC02

B=C([0,1],R²), A media, j constante, Q=jA proyección acotada;
B=j(E) direct-sum kerA. Ktilde=.5jA tiene norma EXACTA .5.
Fijo v*=min(2u,1)e1, f*=jv*, u>=0.
u<.5: entrada2u e1 interior, DT=.5jA, espectro complejo {0,.5}, norma=.5.
u>.5: r=u+.5>1, DP(re1)=r^-1(I-e1e1^T), DT=(2r)^-1 jQperp A,
espectro {0,1/(1+2u)}, norma=radio.
u=.5: derivada direccional .5j[Ah-e1 max(<e1,Ah>,0)], no lineal.
Direcciones +/-je1 dan0 y-.5je1. Punto ocurre en U: secuencia010 repetida,
sum phi^-(3k+2)=phi/(phi³-1)=1/2.
No asumir diferenciabilidad de proyección convexa general. Clasificar abierto
regular explícito y frontera. Convergencia global2^-n, en regulares para r>rho
bola local con error<=r error por Frechet y ||DT||=rho. Órbitas globales entran
en bola. Tau en iteraciones:1/ln2 interior,1/ln(1+2u) exterior; frontera sólo
contracción no espectro lineal. Para0<=u<=1 radio>=1/3 (regulares).

## Tipos métricos y resistencia

BC04/P2: definiciónE es set-level; declarar hipótesis completa métrica antes
de limitassign y E1; mover uniquePhi detrás de E1. Mantener etiquetas hyp:H3-metric
(BC),hyp:h3(P2). Hausdorff por métrica; Polish requiere separabilidad adicional.
Corregir comillas históricas rotas. No alterar E1/E2.
P1ontmass debe usar Hausdorff sobre clase de conjuntos no vacíos cerrados en
un MISMO espacio de historiales; componente con distancias Hausdorff finitas.
No confundir d_w(x,y) con d_H(I,J). Ecost∈[0,∞], inf∅=∞, denominador>0 finito,
cost∞/d=∞, no0/0. Fuera componente hace falta contrato distinto.
P3 usar Z_Omega para objetos, separado Z de readout. Canónico objeto-punto
z_S=I(S) en hiperspacio Hausdorff, no punto de historia. RelationRigidity:
Δ<=CA E da M>=1/(CA), testigo finito=>Mfinito, sin testigo=>Minfinito.
No implica invariancia de lectura bajo rotaciones que preservan el conjunto.
P1 missingproofs: SmallDisplacement por supbound del transporte; Universal
Property por j↦(phi_n(j)), unicidad coordenada y continuidad producto-subespacio;
PerfectSimulation elegir t=B+1. Preservar IDs unlabelled históricos sin crear
IDs nuevos por cambio de línea.

## Cuatro teoremas nulos

Inheritance: tipar a:Z'→Z,b:E→E', positivos ca,C,cb y pares mapeados; producto
de cotas. CCR exige pullback de toda deformación finita positiva al sector viejo.
FaithfulImage: inyectividad, inversa1/C, factor u=Psi∘Phi^-1 únicamente en imagen;
no extensión únicaambiental. PrefixBound: tail3^-(N+1), extremos y punto medio
error1/(2*3^(N+1)). Closure: corolario lógico con par,coercividad,ancla/transporte
explícitos; NO prueba nuevos datos. El ejemplo externo común existente ya
realiza sector infinito + par/ancla; no repetir deuda constructiva global que
ese ejemplo ha resuelto; física/sectores generales siguen abiertos. Status
present/conditional/corrected_conditional_proof, historia preservada.

## Siete proposiciones BC08

Añadir proofs reales, alcance condicional de detector, no predicciones empíricas
universales: integrity por decisión A(K) AND evidencia; complexity por ausencia
de soporte común (altoentropía no suple testigos); ablation invalida certificado
fijado, no excluye recertificación; transport exige isomorfismo de datos/gates
y márgenes mayores que errores para versión aproximada. Threshold:
m_i Lipschitz=>signos robustos fuera bandas; estrechez geométrica exige
transversalidad/coercividad en parámetro, no siempre(cero plano contraejemplo).
Legibility: negar L1-L6 invalida certificado específico, no todos los decoders
alternativos. Continuity/non-null: fallo Icont/Idiff necesario; σ_t→0 no es
σ_t=0. Nulo fenomenológico global independiente de nulidad de clases readout.

## Acoplamiento BC11 (mantener thm:realized-nonconstant-bridge intacto)

Nodos midpoint s_i; perfiles Lipschitz e,phi, oscilaciónE0, faseθ0<pi/2;
w(s,t)=exp(-|e(s)-e(t)|/ν)/cos(phi(s)-phi(t)), ν=kT>0.
Graph gen: q_N=|1-alpha beta|+eta LI sqrt(din dout)/(theta cosθ0)+alpha LD.
Completo, Ij=id, alpha=eta=beta=1,D=0,theta=N/kappa:
K_w f=kappa ∫w f, q=kappa secθ0<1, Γ=a(s)+u∈[0,1-q].
KernelLip Lw=secθ0*(Le/ν+tanθ0 Lphi) in |s-s'|+|t-t'|.
K_N midpoint step kernel, a_N=P_Na. Uniform discrepancy onC:
eps_N<=[kappa Lw+La/sqrt12]/N. K_NP_N=K_N; clamp nonexpansive.
Fixed error<=eps_N/(1-q). δkernel=max(1-exp(-E0/ν),secθ0-1).
Distance coupled FP from base <= kappa δkernel/(1-q); continuum gap
d0 - kappaδkernel/(1-q), d0=||a-bar a||. Finite compare to BASEFINITE
directly, gap d0,N - samebound. This can prove allN>=2, not just largeN.
Nonzero realization: ν=1,kappa=1/4,a=s/4,U=[0,1/4],e=phi=s/64.
cosθ>=8191/8192, sec<=8192/8191, q<=2048/8191,
δkernel<=1/64, perturb<=8191/(256*6143).
d0,N>=1/16 forN>=2 (exact linear-profilevariance); gap
γ=1/16-8191/(256*6143)=90097/1572608>0. d0>1/16.
Lw<=C*(1/64+C/4096), C=8192/8191. Positive nonconstant weights:
derivative log(exp(-r)/cos r)=-1+tan r<0 on (0,1/64].
Frozen profiles vary spatially; NOT theorem of coupled time evolution e,phi.
Use Neumann series for FP since clampinactive andq<1. Test rational Taylor
intervals for exp/cos, rational envelope/gaps; numeric checks labelled internal.
Negative controls N=1, phase denominator approachingzero, zero-increment map.

## Paper II strengthening (and generic BaseCore04 copy)

prop:metric-compat addcompact uniform modulus:
ωPhi(r)<=inf_n(2 A_n+ω_gn(r)); compact continuous gn=>ω_gn→0; no commonL needed.
New self-contained thm:readout-loss-stability in BC04/P2 (2newtargets):
Z,X,Theta compact nonempty, h:Theta×X→Z continuous, F:Z→E continuous.
D_F(theta,x)=d(Fx,Fh), R_F=max D, Δ=max d(x,hx), P_F=r0/(r0+R_F).
Declare X⊆Z. ωF uniform modulus; if lowerC on comparedpairs then
CΔ<=R_F<=ωF(Δ). GivenG with sup d(F,G)<=eta onALL commonZ and h' with
sup d(h,h')<=t, |R_F-R_G|<=2eta+ωF(t), |P_F-P_G|<=same/r0.
Proof triangle, sup, exact normalization identity. Does NOT supply scalarM→branch.
For maxR_G requirecontinuousG,h' or use sup; finite either way. Cor protection
and losspossibility currently lackproof: addthem. Keep ethics outside math.

## Paper III additions

Original weightedmetric already NORMALIZED coordinates0<=d_n<=1; preserve.
New compact/Polish theorem stronger true class: countable complete separable
metric stages, continuousbonds, use boundedmetrics min(1,d_n), sum w_n finite.
Weighted sup metrizes product: head finitelycontrolled, tail sup w→0;
complete coordinate argument, separable countablebase/dense-prefix product;
I closed soPolish. If compact stages thenIcompact; nonempty compact stages
give FIP nonempty WITHOUT surjectivity (stronger); evaluationonto needs surj.
NoncompactPolish class also covered under stated hypotheses, but may be empty
without lifting; S_n=[n,∞), inclusion bonds gives emptylimit. No blanket claim
that noncompact always open: say additional hypotheses/uncountable/nonseparable
or RAW metrics outside contract. Raw weightedmetric requires w diam→0;
summableweights alone fails (already P1 example metrics4^n on[0,1], w2^-n).
New commutingchannel theorem: C_n:S_n→Y_n, q_n C_(n+1)=C_n pi_n => C∞ onlimits
and p_n C∞=C_n p_n. Continuous ifeachC_n. Lower stage c_n yields v_n c_n
separation; globalcoercivityC requires v_n c_n>=C w_n ALL stages, not onecut.
ReadoutR afterC∞ needs separatecoercivity ell. Composition yieldspositive
detectabilityconditional, no automaticprotocolidentification.
New robust-noise corollary links nonsim/spectral/cont/instability:
η=A_N+ν, y_i withinη ofPhi(z_i). Iftruepairsep>=Cepsilon:
d(y0,y1)>=Cepsilon-2η, maxdistance null>=Cepsilon/2-η;
η<Cepsilon/4 givespositivepair>Cepsilon/2 andmaxnull>Cepsilon/4.
Anchoredtrueendpoint givesotherdistance>=Cepsilon-η. Finitecode testsetlower
bound δ/2 survives proxy asδ/2-η; linearcoupling C=sigmamin oncomparedpairs.
Update nonthm topology/composition scopes with provedclasses; estimatorgap
must distinguish existing mathematicaltoy constants from missingphysicalcalibration.
Preserve all auditprovenance markers incl formerStep2.

## Synchronization and gates

No blind extractoverwrite. Use extractFormalEnvironments intoEXTERNAL temp JSON
only, merge by(paper,file,label or type/title/ordinal) preservingoldIDs/metadata.
Only BC/P1/P2/P3 locations/statements/proofs/refs/history; newrecordIDs bylabels;
map extracteddeps throughstableID map; do NOT regenerateallcuration. Unchanged
IV-X raw JSON lines unchanged. macros expected383, no newmacros planned.
Maintaincuration overlay required15/ I_INT. Update4defaultsoverrides to avoid
futureextractredemotion. Historyschema{date,action,reason}. curation_status
enum draft_extracted/audit_overlaid/human_curated/deprecated; curation.status
allows under_review. Preserve originalcounterexampleprovenance ratherthanerase.
Proposed6newtargets: BC coupledprop1+loss-thm1; P2loss-thm1; P3compactthm1,
channelthm1,noise-cor1 =>425targets,T145/P215/L24/C41; paperBC94/P2=35/P3=34.
Check actual counts from finalsource, not predeterminedsuccess. Keep matrixfile
names419 historical, declaretargetCount current; explicit validatorcounts update
authorized foradditions (notrelaxingchecks). Preserveold matrixstates unless
signaturechange requiresdowngrade; allnewtargets PENDING_MATHLIB. OldLean35/271
unchanged unless signaturecoveredreallyneedsupdate. User reservesLeanexpansion3.
Compile4touchedunits inisolatedE pdflatex,biber,2pdflatex; monolithic source/PDF
sync ifneeded (allowedoptional), avoideditingIV-X oranyfrozenareas. Reportgenerator
report:corpus-health writes5reports; runisolated, adoptonlynecessaryhealthreport
anddocumentothersunchanged. Frozenmetadata no actual AUDIT_MASTER available.
AfterLASTedit exact ordered gate12 root3,prose,FCR,macros,nonclaims,overlays,
math,Lean,coverage,release inisolatedcopy. Logeverycommand+rawverdict,extfalse.
Addnewrational/negative suite to verify:math withoutloosening32old; expect33.
Commitatomic coherentfullwave afterchecks on dedicatedcodex/etapa1-base-papers1-3,
NOpush. Final branchrelationrelative05f8e55 andf7171e7 exact. Useranswerauthorizes
fullpreflighttime even>10min. Baseline pending means no projectedit yet.
