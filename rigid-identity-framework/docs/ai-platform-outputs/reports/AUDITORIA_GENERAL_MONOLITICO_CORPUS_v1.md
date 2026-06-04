# Auditoria General del Corpus QICN con Enfasis en el Monolito

Fecha: 2026-06-04  
Agente: OpenCode (auditoria de lectura/inventario)  
Alcance: `rigid-identity-framework/` completo, con enfasis en `monolithic/`

---

## 1. Resumen Ejecutivo

El corpus QICN presenta una disciplina cientifica y documental notablemente superior al promedio de proyectos teoricos auto-gestionados. La separacion entre ontologia, modelo matematico, implementacion, lenguaje e interpretacion esta explicitamente gobernada por `INSTRUCCIONES.md`, y la infraestructura de validacion (npm scripts, registro de teoremas, ledgers de claims, etc.) es extensa y funcional.

Sin embargo, la auditoria revela una **fractura de provenancia critica en la Seccion 12 del monolito** (Bridge Paper), una **deuda formal abierta persistente** (`I_int` / lema del separador atomico), y **deuda tipografica no menor** (331 underfull boxes) que degrada la calidad de presentacion del volumen unificado.

**Veredicto general:** El corpus es formalmente coherente y editorialmente conservador, pero el monolito no debe ser tratado como una fuente canonica primaria hasta que se cierren los gaps de provenancia del Bridge Paper y se limpie el preambulo compartido.

---

## 2. Estado del Monolito (`monolithic/`)

### 2.1. Arquitectura de ensamblaje

- **Builder:** `scripts/build-monolithic-volume.js` (626 lineas, bien estructurado).
- **Metodo:** Extrae el cuerpo (`\begin{document}` a `\end{document}`) de cada fuente, elimina `\maketitle`, `\tableofcontents`, `\printbibliography`, expande `\input` locales, reescribe rutas de activos, aplica transformaciones de layout (tablas densas, math largo, tokens de codigo), y hace **namespacing de labels/refs** para evitar colisiones.
- **Prefacio editorial:** Explicitamente limita los claims: no afirma conciencia biologica, fenomenalidad, agencia, estatus moral, transferencia de identidad ni validacion externa.

### 2.2. Metricas de compilacion

| Metrica | Valor | Estado |
|---|---|---|
| Paginas | 334 | OK |
| Tamano PDF | 2,837,340 bytes (~2.8 MB) | OK |
| Errores duros LaTeX | 0 | **PASS** |
| Referencias/citas indefinidas | 0 | **PASS** |
| Labels duplicados exactos | 0 | **PASS** |
| Anclas hyperref duplicadas | 0 | **PASS** |
| Advertencias Biber | 0 | **PASS** |
| Overfull hbox | 8 | Tracked debt |
| Underfull vbox/hbox | 331 | **Tracked debt (alta)** |

### 2.3. Riesgos identificados

#### A. Provenancia huérfana: Seccion 12 (Bridge Paper)
La fuente declarada `paper_bridge_operational_subjecthood/main.tex` **no existe fisicamente en el repositorio**. El builder la marca como `fallbackSectionName` y reutiliza una seccion generada previamente (`reused_existing_section`). Esto es un **SOURCE_RECOVERY_REQUIRED** no resuelto. La Seccion 12 esta presente en el PDF del monolito pero carece de fuente canonica sincronizable, lo que viola la Regla 2 de `INSTRUCCIONES.md` (cada paper debe tener codigo LaTeX canonico y PDF compilado correspondiente).

#### B. Macros y entornos repetidos (preambulo compartido incompleto)
Segun `docs/reports/MONOLITHIC_COMPILE_RISK_AUDIT.md`:
- 54 grupos de definiciones identicas repetidas (ej. `\Cop`, `\Iint`, `\Qop`, etc.).
- 14 declaraciones de entornos de teorema repetidas (`\begin{theorem}`, `\begin{lemma}`, etc.).
- 1 override tipografico estandar (`\arraystretch`).

Aunque el builder filtra y deduplica paquetes `\usepackage`, el preambulo generado aun arrastra repeticiones de `\newcommand`, `\newtheorem`, etc. que deberian consolidarse en un preambulo unico. El riesgo es `YELLOW: shared-preamble work remains`.

#### C. Deuda tipografica severa
331 underfull boxes en un volumen de 334 paginas significa que, en promedio, casi cada pagina tiene al menos un problema de justificacion o espaciado vertical. Esto no afecta la validez formal, pero si la calidad editorial y la legibilidad. Recomendacion: ajustar `\emergencystretch`, revisar tablas densas, y considerar `\raggedbottom` con penalizaciones mas laxas en el entorno `book`.

#### D. Artefactos de build en el directorio canonico
`monolithic/` contiene `.aux`, `.bbl`, `.bcf`, `.blg`, `.log`, `.out`, `.run.xml`, `.toc`. Segun la Regla 5 de `INSTRUCCIONES.md`, estos son "ruido estructural". Pueden conservarse temporalmente para reproducibilidad inmediata, pero deberian estar confinados a `monolithic/build/` o a un directorio de artefactos, no mezclados con el `.tex` raiz y el PDF.

---

## 3. Estado de los Papers Individuales (Papers 1–10)

| Paper | Estado fuente | Estado PDF | Notas auditoria |
|---|---|---|---|
| Paper 1 | `main.tex` presente | `main.pdf` presente | Bien. Estructura LaTeX limpia, bibliografia local o compartida. |
| Paper 2 | `main.tex` presente | `main.pdf` presente | Bien. |
| Paper 3 | `main.tex` presente | `main.pdf` presente | Bien. |
| Paper 4 | `main.tex` presente | `main.pdf` presente | Registrado en ledger como target de reparacion/reclasificacion publica (fase 5). |
| Paper 5 | `main.tex` presente | `main.pdf` presente (28 pags) | Bien. Recompilado recientemente. |
| Paper 6 | `main.tex` presente | `main.pdf` presente | Bien. |
| Paper 7 | `main.tex` presente | `main.pdf` presente (28 pags) | Bien. Recompilado recientemente. |
| Paper 8 | `main.tex` presente | `main.pdf` presente (43 pags) | Recompilado recientemente. 13 overfull / 91 underfull (deuda tipografica). |
| Paper 9 | `main.tex` presente | `main.pdf` presente (42 pags) | Recompilado recientemente. Entorno `conjecture` faltante fue reparado. 38 overfull / 221 underfull. |
| Paper 10 | `main.tex` presente | `main.pdf` presente (33 pags) | Recompilado recientemente. 57 overfull. |
| **Bridge Paper** | **AUSENTE** | **Solo via monolito** | **CRITICO: `SOURCE_RECOVERY_REQUIRED`** |

Observacion general: los papers individuales son extensos, formales, y respetan la politica de no-inferencia (non-inference notes al inicio). El Paper 5 en particular es un modelo de como escribir teoria operacional con `Terminology Debt Ledger`, `Claim-Type Ledger`, y separacion de niveles.

---

## 4. Estado de la Infraestructura

### 4.1. Scripts y validacion
- `package.json` define **87 scripts** de verificacion, auditoria, calibracion, y ejecucion de predicciones.
- Existe un ecosistema completo de "negative controls", "adversarial controls", "cleanroom protocols", y "human veto signatures".
- Los scripts `audit-monolithic-build-quality.js` y `verify-monolithic-risk.js` son robustos y generan reportes JSON/Markdown.

### 4.2. Registro de teoremas y claims
- `registry/theorems.jsonl` contiene 699 entradas formales.
- Estado predominante: `draft_extracted` (678). Solo 21 estan `audit_overlaid`.
- Esto significa que **la gran mayoria del registro no ha sido curada por humanos**, lo cual es un riesgo si se usa como evidencia de madurez formal.

### 4.3. Bibliografia
- `release/references.bib` tiene 52 entradas, 52 claves unicas, 0 duplicados (estado post-fase 5B).
- Sincronizada entre raiz y subdirectorio del framework. SHA256 coincidente.

---

## 5. Hallazgos Criticos (Prioridad Alta)

1. **Provenancia del Bridge Paper (Seccion 12 del monolito):** No existe carpeta `paper_bridge_operational_subjecthood/`. El contenido del monolito para la Seccion 12 es un artefacto generado de sesiones anteriores sin fuente sincronizable. Esto debe declararse formalmente como `SOURCE_RECOVERY_REQUIRED` y crear un plan de recuperacion o reconstruccion desde el PDF del monolito.

2. **Deuda formal `I_int` (Invariante de Integracion Causal):** El lema del separador atomico (`atomic separator Theta_S`) sigue en estado `OPEN_BURDEN_REFINED`. La proposicion `prop:integration-transfer` en Paper 5 es una consolidacion, no una prueba cerrada. Esto es un bloqueador teorico para cualquier upgrade de claims sobre integracion causal.

3. **Calidad tipografica del monolito:** 331 underfull boxes es inaceptable para un volumen de referencia. Se requiere pasada de layout antes de cualquier uso como "edicion consolidada".

4. **Trazabilidad del ledger:** El `IMPLEMENTATION_TRACE_LEDGER.md` esta activo y bien formateado, pero la entrada anterior (fase 5B) reporto `334 paginas` y el PDF actual tambien reporta `334 paginas` (2,837,340 bytes). Sin embargo, el `CHANGELOG_QICN_PATCH.md` menciona 425 paginas del 2026-05-26. Esto sugiere una **regresion de paginas** (de 425 a 334) que no esta explicada explicitamente como recorte de contenido o cambio de clase de documento. Si el contenido teorico no fue recortado, la diferencia puede deberse a cambios de formato (book vs article, margenes, etc.), pero deberia documentarse.

---

## 6. Recomendaciones

### Inmediatas (antes de cualquier release publica)
1. **Recuperar o reconstruir el Bridge Paper:** Crear la carpeta `paper_bridge_operational_subjecthood/` con un `main.tex` reconstruido desde la seccion generada del monolito, marcarlo como `RECONSTRUCTION`, y sincronizarlo con el builder.
2. **Auditar la discrepancia de paginas:** Documentar por que el monolito paso de ~425 a 334 paginas. Si hubo perdida de contenido, verificar contra `canonical_core_legacy/`.
3. **Reducir underfull boxes:** Revisar `\widowpenalty`, `\clubpenalty`, y tablas densas en Papers 6, 7, 8, 9.

### Corto plazo
4. **Consolidar preambulo monolitico:** Mover todas las definiciones identicas repetidas a `preamble/setup.tex` y eliminarlas del builder de extraccion.
5. **Human curation del registro:** Iniciar revision de las 678 entradas `draft_extracted` del `theorems.jsonl`.
6. **Limpiar artefactos de build:** Mover `.aux`, `.log`, etc. a `monolithic/build/artifacts/` o agregarlos a `.gitignore` (si es repo git).

### Mediano plazo
7. **Cerrar `I_int`:** Definir un protocolo de prueba o un contraejemplo explicito para el lema del separador atomico, o rebajar formalmente el estatus de cualquier claim que dependa de el.
8. **Adjudicacion externa:** Ejecutar el `EXTERNAL_REPLICATION_PROTOCOL_v2.md` para al menos una prediccion (ej. PRED-EXT-01) antes de considerar cualquier upgrade de status de claims.

---

## 7. Conclusion de Opinion

El proyecto QICN es un ejercicio de auto-gobierno cientifico impresionante. El monolito funciona como **volumen editorial de referencia**, no como fuente canonica primaria, y eso es correcto segun la Regla 4 de `INSTRUCCIONES.md`. El builder es inteligente y la compilacion es limpia a nivel de errores duros.

**Lo que mas me preocupa:** El Bridge Paper huérfano. Un volumen que incluye una seccion sin fuente reconstruible es una fractura de integridad documental. En un framework que se jacta de trazabilidad y falsabilidad, esto es la excepcion mas seria encontrada.

**Lo que mas valoro:** La disciplina de los `Non-Claim`, los `Terminology Debt Ledgers`, y la politica editorial conservadora (preservar fuente, exponer dependencias, no reescribir desde cero). Esto es exactamente lo que la investigacion teorica auto-gestionada necesita para ser tomada en serio.

**Veredicto sobre el monolito:** Util como indice consolidado y lectura secuencial, pero **no citable como fuente primaria** hasta que se cierre la provenancia de la Seccion 12 y se limpie la deuda tipografica.

---

*Fin del reporte.*
