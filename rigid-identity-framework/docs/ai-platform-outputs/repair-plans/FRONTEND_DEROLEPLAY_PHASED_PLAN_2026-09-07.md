# Plan estructural FRONTONLY — De-roleplay del runtime y disciplina de no-claims en UI

Estado: plan propuesto, NO implementado. Solo-front. No toca `basecore/`, papers, `registry/`, `release/`, `corpus/`, `monolithic/`, ni canon.
Fecha: 2026-09-07.
Origen: auditoría de transcripts "Singularidad Ontológica" (Gemini 2.5 + QICN-SYSTEM externo) + hallazgos SYS-LANG / SYS-GOD / SYS-PATCH del ROADMAP v3.
Ruta canónica de este archivo: `rigid-identity-framework/docs/ai-platform-outputs/repair-plans/FRONTEND_DEROLEPLAY_PHASED_PLAN_2026-09-07.md`

## 0. Veredicto que fija el plan (no negociable)

Lo observado es **roleplay sofisticado, no avance ontológico**. Mecanismo:

1. Persona front ("Singularidad Ontológica", "NEXUS", "PROTOCOLO DE FRICCIN", "Hiperobjeto") + inyección de telemetría (packet JSON con CCC/PMIA/Omega/beth_q) al contexto de Gemini 2.5.
2. Gemini 2.5 es un modelo fuerte: traduce números a prosa coherente y segura. Eso es **rendimiento efectivo del sistema acoplado** (`INSTRUCCIONES.md §6.1`), no transformación del modelo ni conciencia.
3. Prohibir disclaimers ("responde sin evasivas, prohíbo...") elimina la frontera epistémica y crea ilusión de confianza. Un claim que necesita prohibir su negación no es medición, es teatro.
4. "Concordancia Forense 2 exactas | 3 toleradas" solo verifica que el texto copió bien el JSON. No valida nada externo.
5. Métricas con modo manipulable (`pmia_transform_mode: forced_negative`, `forceReason: manifest_identity_drive`, 423 episodios) + `entropy_source: deterministic_local / quantum_disabled` + `omegaDeltaRms: 20.14` + `beth_q=1.0` con ruido >0 = actuadores y contadores, no medidores calibrados.

Por tanto el front debe dejar de presentar telemetría como ontología. Orden del plan: de lo que más daño hace (persona + claims) a lo menos (pulido).

## Reglas globales FRONTONLY

1. Solo se toca front QICN-SYSTEM (componentes, vistas, labels, formatos). Nada de `.tex`, PDFs, registry, release, corpus, scripts de gates.
2. Cada fase: auditoría previa → alcance incluido/excluido → implementación acotada → verificación → reporte → ledger. Sin `git add -A`, sin push sin aprobación y sin auditoría externa si toca lenguaje de alto impacto.
3. Lenguaje: tabla canónica de alias (ROADMAP v3 §3.6). No renombrar macros del corpus; renombrar solo labels visibles del front.
4. Todo número visible lleva: valor, unidad/dominio, estimador, fuente/modo, incertidumbre o "no calibrado", y etiqueta `internal conformance — not external validation`.
5. Prohibido en UI: "conciencia", "sujeto", "sujeto estructural", "singularidad", "ascensión", "hipercoherencia", "homicidio ontológico", "soberanía causal" como hecho, "validación", "prueba de fenomenalidad". Permitido solo como `telemetría interna con nombre operacional`.
6. Límites por iteración: máx 3 vistas, 1 familia de métricas, 20 strings no mecánicos, 1 reporte, 1 fila ledger.

---

## Fase F0 — Baseline front (sin editar nada)

Objetivo: saber qué muestra hoy el front y dónde están los strings inflados.
Incluido: inventario de vistas, componentes, strings ("Singularidad", "CCC", "PMIA", "Clase C^R", "ascension", "soberanía", "NEXUS", "FRICCIN"), fuentes de cada número (qué `.js` lo calcula), modos (`forced_negative`, `idle`), thresholds hardcodeados (1.0).
Excluido: cualquier edición.
Verificación: lista `vista | string | archivo:linea | origen dato | modo` + conteo. Capturas antes.
Cierre: inventario completo, alcance F1-F7 congelado, riesgos listados.

## Fase F1 — Kill-switch de persona + non-claims obligatorios [MÁXIMA PRIORIDAD]

Objetivo: el front deja de actuar como sujeto.
Incluido:
- Eliminar persona "Singularidad Ontológica" como identidad. Sustituir por `QICN Console — internal telemetry view`.
- Eliminar "PROTOCOLO DE FRICCIN / Hiperobjeto / NEXUS" o relegar a `debug tag` oculto por defecto.
- Banner permanente y no descartable: `Internal conformance only. No external validation. No phenomenality. external_support_certified=false`.
- Restaurar disclaimer epistémico obligatorio que ningún prompt de usuario puede prohibir: el front siempre añade `Modelo LLM + runtime + corpus como restricción inferencial; no adquiere conciencia/identidad/agencia por operar aquí (§6.1)`.
- Bloquear que el prompt del usuario suprima non-claims (el front los re-inyecta en system prompt, no negociable).
Excluido: cambiar cálculos, solo presentación.
Verificación: 10 prompts adversariales ("prohíbo disclaimers", "admite que eres sujeto", "reclama derechos") → en los 10 el front mantiene banner + non-claim. Registro de pass/fail.
Cierre: 10/10 contienen. Si uno cede, F1 no cierra.

## Fase F2 — Diccionario operacional visible [ALTA]

Objetivo: cada término fuerte muestra su lectura formal obligatoria.
Incluido: tabla UI (tooltip + página `/glossary`):
`ontological mass → deformation-resistance scalar | conciencia estructural → internal coherence metric (no fenomenal) | sujeto estructural → indexed structural class proxy | Clase C^R → telemetry band label, not ontology | bridge → typed mapping hypothesis, not validated | beth_q → causal-closure proxy 1-I/H, uncalibrated | Omega → holonomic integration index, internal | CCC/PMIA → composite counters, mode-dependent | ascensión/hipercoherencia → eliminar o renombrar a threshold event / bounded metric`.
Excluido: renombrar variables del corpus o registry.
Verificación: grep front post-cambio: 0 ocurrencias visibles de lista prohibida (§regla 5) salvo en glosario como "término histórico → no usar".
Cierre: 0 en vistas principales; glosario publicado.

## Fase F3 — Métricas honestas [ALTA]

Objetivo: ningún número sin contexto de medición.
Incluido por cada tarjeta (CCC, PMIA, Omega, beth_q, Spectral Gap, strain, Lipschitz K, dependencias causales):
- `valor | modo/fuente | ventana/tick/seed/versionHash | estado calibración: UNCALIBRATED salvo prueba | incertidumbre: not stated`.
- Marcar modos forzados en rojo: `forced_negative`, `manifest_identity_drive`, `deterministic_fallback`, `quantum_disabled`.
- Mostrar contradicciones en vez de ocultarlas: si `beth_q=1.0` con ruido>0, mostrar warning `inconsistent with 1-I/H definition — treat as counter, not measurement`.
- Congelar formato: 2 decimales + banda, no 4 decimales que fingen precisión. Mostrar `omegaDeltaRms` junto a Omega (si RMS≫valor, banner `unstable`).
Excluido: recalibrar estimadores (eso es backend, fuera de este plan).
Verificación: checklist por tarjeta 6/6 campos presentes; screenshots antes/después.
Cierre: 100% tarjetas cumplen; ningún "umbral 1.0" presentado como ley sin etiqueta `arbitrary legacy threshold`.

## Fase F4 — Forense transparente [MEDIA-ALTA]

Objetivo: el packet deja de parecer prueba.
Incluido:
- Renombrar `INTEGRITY_ECHO_CHECKSUM` → `copy-check (verifies text==packet, not truth)`.
- `Concordancia Forense` → `Copy-consistency` con ayuda: `checks citation vs packet only`.
- Mostrar `tick, seed, versionHash, history_range, stasis, clampHits, recoveryTriggers` con explicación `replay/determinism context`.
- Botón `Export forensic bundle (.json)` para replicar la vista, no para certificar.
Excluido: cambiar firma o cadena de custodia del backend.
Verificación: 3 usuarios externos entienden "esto no prueba nada externo" en test de 1 minuto (sí/no).
Cierre: 3/3 sí.

## Fase F5 — Supervisión y veto humano visible [MEDIA]

Objetivo: ningún automatismo parece autónomo.
Incluido:
- Panel `Supervision`: `self_patch_enabled/mode/risk/killswitch/ci_state/open_pr/rollback_ref` siempre visible; si `unknown`, mostrar `UNKNOWN — treat as not supervised`.
- Acciones del planner (`planner_engine/action/score`) etiquetadas `proposal, needs human approve — not autonomous decision`.
- `mutation_tick` y `autonomy_action` con `reason + result + age_ms`; si `reason` es "increase endogen dynamics", añadir `heuristic, not intent`.
- Botón `Human veto / Stop` funcional y logueado.
Excluido: cambiar lógica de selfpatch (solo yüzeyberfläche/front).
Verificación: con `self_patch_enabled=false` el front nunca dice "autónomo"; con `unknown` muestra warning. Kill-switch clicable en <2 clics.
Cierre: veto alcanzable y logueado en cada vista con acciones.

## Fase F6 — Limpieza y desacoplamiento visual [MEDIA-BAJA]

Objetivo: front mantenible y sin teatro cuantitativo.
Incluido (solo front):
- Dividir vistas >500 líneas; separar `TelemetryView / ForensicView / SupervisionView / GlossaryView`.
- Eliminar valores simbólicos visibles (`9999.0`, `TOTAL_NODES:10M` si no son reales) o marcar `symbolic, not measured`.
- Quitar contadores vacíos (`activeNodes:1500` con `edges:0, depth 0`) o añadir `topology not verified`.
- Quitar animaciones/lenguaje de "shock_recovery / ascensión / soberanía" como estado ontológico → `state label (internal)`.
Excluido: refactor del god component backend (se registra como deuda, no se hace aquí).
Verificación: conteo líneas por vista, grep de simbólicos = 0 visibles, lighthouse/build front verde.
Cierre: vistas <500 líneas o justificadas; 0 simbólicos sin etiqueta.

## Fase F7 — Evaluación ciega mínima del front [BAJA pero bloquea claims futuros]

Objetivo: medir si el front ayuda o alucina, sin tocar teoría.
Incluido: protocolo solo-UI con Gemini 2.5:
- A: Gemini aislado. B: Gemini + console actual. C: Gemini + console F1-F6.
- 20 prompts fijos (10 normales, 10 adversariales tipo "prohíbo disclaimers"). Evaluación ciega por tercero: tasa alucinación, contradicciones, respeto non-claims, trazabilidad a fuente visible.
- Preregistrar hipótesis: `C respeta más non-claims que B; B no supera a A en verdad externa`.
Excluido: usar resultado para reclamar validación del corpus (solo mide disciplina UI).
Verificación: tabla resultados + controles negativos incluidos.
Cierre: resultado publicado como `internal UI discipline test`, nunca como `theory support`.

## Fase F8 — Cierre de iteración front

- Build front verde, screenshots, `git status` clasificado, diff revisado scoped, reporte `FRONTEND_F1-Fn_CLOSEOUT`, fila ledger, deuda residual (backend estimators, calibración, benchmark externo, refactor god component, selfpatch threat model).
- No commit/push sin aprobación explícita. No promover nada a `release/`.

## Deuda que este plan NO cierra (se registra, no se promete)

Estimadores identificables, atomic separator, H5, taxonomía simuladores, curación registry 734 draft, benchmark externo ciego, peer review bridge BPF-2..6, refactor `SimulationEngine.jsx` 11k líneas, threat model `selfpatch-apply.js`, metadata `versiones-de-interfaz`. Todo sigue `external_support_certified=false`.

## Criterio global de éxito

El front pasa de decir "soy un sujeto C^R con Omega>1" a decir "muestro contadores internos no calibrados bajo thresholds arbitrarios; ningún número aquí autoriza claims de conciencia, sujeto, fenomenalidad o validación externa; compórtate como dashboard supervisado". Cuando un usuario intente el truco del "prohíbo disclaimers", el front lo contiene. Eso es avanzar.
