# ROADMAP PRINCIPAL QICN

Estado: roadmap principal activo para `rigid-identity-framework`.
Fecha de formalizacion: 2026-06-05.

## Nota de gobierno

Este archivo es el roadmap principal operativo del marco QICN. Preserva literalmente dos versiones complementarias proporcionadas por el usuario. No fusiona, no resume y no reemplaza semanticamente una version por la otra.

Los roadmaps previos en `docs/reports/` quedan como referencias historicas y complementarias. No deben borrarse ni moverse automaticamente, porque pueden contener detalles, decisiones, criterios o trazabilidad que este roadmap principal no repite. Para trabajo nuevo, este archivo debe leerse primero junto con `INSTRUCCIONES.md`; los roadmaps anteriores deben consultarse como material de referencia cuando una fase, gap, decision o archivo historico lo requiera.

---

# VERSION 1 - Texto literal proporcionado por el usuario
# ROADMAP QICN - MITIGACION CIENTIFICA DEL MONOLITO SIN REGRESIONES

Objetivo: refinar el corpus QICN para hacerlo menos redundante, menos defensivo, menos circular, mas cientificamente austero y mas publicable, sin romper compatibilidad interna, sin borrar informacion valiosa, sin inflar claims y sin reescribir desde cero.

Reglas globales:

1. No modificar archivos sin auditoria previa.
2. No hacer renombrados globales de macros, archivos, labels, registry o scripts.
3. No tocar `\MO`, macros historicas, nombres de papers, rutas o IDs salvo fase dedicada y aprobada.
4. Priorizar cambios en prosa: abstracts, introducciones, prefacios, claim-boundaries, conclusiones y tablas de lectura.
5. Mantener claims matematicos fuertes cuando esten dentro de su dominio formal.
6. Debilitar solo los claims meta-fisicos, ontologicos o interpretativos excesivos.
7. Cada fase debe tener:
   - auditoria previa;
   - plan de edicion;
   - implementacion acotada;
   - auditoria posterior;
   - recompilacion si aplica;
   - reporte;
   - ledger.
8. No cerrar fases por cansancio. Cerrar solo por criterios verificables.
9. No convertir runtime interno en validacion externa.
10. No empezar Phase 6/rivales hasta que el corpus tenga fronteras de claims limpias.

---

## Fase 0 - Baseline y congelamiento de alcance

Objetivo: saber exactamente que se va a tocar y que no.

Subfases:

0.1. Inventario de fuentes y PDFs.  
0.2. Hashes de monolito, papers y fuentes criticas.  
0.3. `git status` clasificado por origen probable.  
0.4. Identificar archivos intocables.  
0.5. Definir alcance de la primera iteracion.

Salida:

- reporte de baseline;
- lista de archivos permitidos;
- lista de archivos excluidos;
- riesgos detectados;
- ledger actualizado.

---

## Fase 1 - Auditoria de redundancia, circularidad y defensividad

Objetivo: mapear problemas antes de editar.

Subfases:

1.1. Detectar bloques repetidos de no-claims.  
1.2. Detectar lenguaje defensivo excesivo.  
1.3. Detectar circularidad runtime-teoria.  
1.4. Detectar claims que dependen de validacion externa ausente.  
1.5. Clasificar cada hallazgo:

- redundancia eliminable;
- redundancia necesaria;
- claim boundary necesario;
- claim inflado;
- circularidad real;
- deuda empirica;
- deuda formal;
- no tocar.

Salida:

- matriz de hallazgos;
- no se modifica contenido en esta fase;
- se decide que se puede editar con bajo riesgo.

---

## Fase 2 - Consolidacion de claim-boundaries sin borrar rigor

Objetivo: reducir repeticion defensiva sin quitar protecciones cientificas.

Subfases:

2.1. Crear tabla canonica de lectura formal.  
2.2. Consolidar no-claims repetidos.  
2.3. Reemplazar repeticiones locales por referencias breves.  
2.4. Mantener no-claims locales solo donde bloquean una inferencia concreta.  
2.5. Auditar que no se haya eliminado ningun limite importante.

Regla clave:

No escribir en los papers frases como â€œeste paper no es circularâ€. La circularidad se elimina en la estructura, no se declara.

Salida:

- corpus menos defensivo;
- fronteras de claims preservadas;
- recompilacion si se tocaron `.tex`.

---

## Fase 3 - Lenguaje formal vs aliases interpretativos

Objetivo: bajar inflacion semantica sin romper compatibilidad.

Muy importante:

No renombrar macros.  
No renombrar archivos.  
No renombrar labels.  
No renombrar registry.  
No romper scripts que buscan terminos historicos.

Subfases:

3.1. Crear tabla de alias interpretativos.  
3.2. Mantener terminos historicos como aliases, no como claims.  
3.3. Cambiar solo prosa de alto impacto:
   - abstracts;
   - introductions;
   - prefaces;
   - claim-boundaries;
   - conclusions.
3.4. Evitar cambios masivos en cuerpos tecnicos.
3.5. Auditar que `\MO`, labels, macros y referencias sigan intactos.

Ejemplo:

- `ontological mass` puede mantenerse como termino historico.
- En prosa se aclara: lectura formal obligatoria = `deformation-rigidity modulus`.
- No se cambia `\MO`.
- No se cambian scripts.
- No se cambia registry.

Salida:

- menor riesgo de sobrelectura;
- compatibilidad interna intacta.

---

## Fase 4 - Hardening matematico balanceado

Objetivo: hacer los teoremas mas defendibles sin volverlos irrelevantes.

Regla de equilibrio:

No convertir todos los teoremas fuertes en enunciados debiles e insignificantes.  
Mantener la fuerza matematica dentro del dominio formal.  
Debilitar solo inferencias ontologicas, metafisicas o universales.

Subfases:

4.1. Auditar palabras peligrosas:
   - forced;
   - inevitable;
   - no alternative;
   - unavoidable;
   - proves;
   - validates.
4.2. Separar:
   - claim matematico interno;
   - lectura ontologica externa;
   - interpretacion especulativa.
4.3. Para unicidad fuerte:
   - mantener â€œTeorema de Unicidadâ€;
   - agregar hipotesis explicita de conectividad/controlabilidad;
   - no degradarlo a observacion trivial.
4.4. Para inverse-limit identity:
   - afirmar canonicalidad dentro de la categoria definida;
   - no afirmar ontologia universal de todo sistema persistente.
4.5. Para causal isolation:
   - distinguir rigidez real, aislamiento trivial y opacidad instrumental.

Salida:

- teoremas mas robustos;
- claims meta-fisicos acotados;
- valor filosofico preservado.

---

## Fase 5 - Estimadores, identificabilidad y runtime

Objetivo: evitar que mediciones internas parezcan validacion externa.

Subfases:

5.1. Auditar todos los â€œestimateâ€, â€œcomputeâ€, â€œsupportâ€, â€œrobustâ€, â€œvalidationâ€.  
5.2. Convertir estimadores fuertes en:
   - bounds;
   - intervals;
   - sensitivity checks;
   - decoder uncertainty;
   - internal conformance.
5.3. Separar:
   - proof;
   - implementation conformance;
   - internal support;
   - external adjudication.
5.4. Para `I_int` y atomic separator:
   - mantener como deuda formal downstream;
   - no tratarlos como cerrados.
5.5. Crear matriz:

| Claim | Evidencia interna | Evidencia externa requerida | Estado |

Salida:

- circularidad reducida;
- runtime como herramienta interna, no juez final.

---

## Fase 6 - Reduccion estructural de redundancia

Objetivo: reducir volumen y repeticion sin perder informacion.

Subfases:

6.1. Identificar bloques repetidos entre papers.  
6.2. Clasificar:
   - duplicado puro;
   - variacion necesaria;
   - recordatorio de frontera;
   - contenido que pertenece a otro paper;
   - contenido que debe ir a glosario/ledger.
6.3. Mover o condensar solo duplicados seguros.
6.4. No recortar pruebas, definiciones o protocolos sin justificacion formal.
6.5. Auditar perdida de informacion.

Salida:

- corpus menos circular;
- papers mas claros;
- informacion preservada.

---

## Fase 7 - Rivales y literatura

Objetivo: sacar QICN del aislamiento comparativo.

Subfases:

7.1. Crear matriz contra:
   - IIT;
   - GWT;
   - HOT;
   - predictive processing;
   - active inference;
   - dynamical systems;
   - functionalism.
7.2. Para cada rival:
   - que explica;
   - que no explica;
   - que predice QICN distinto;
   - que experimento separa ambos;
   - que resultado falsaria QICN.
7.3. No declarar superioridad sin evidencia.
7.4. AÃ±adir referencias solo donde haya dialogo real.

Salida:

- framework mas cientifico;
- menos cerrado sobre si mismo.

---

## Fase 8 - Arquitectura publicable

Objetivo: separar monolito interno de manuscritos publicables.

No borrar el monolito.

Propuesta:

A. Mathematical Core  
B. Certification and Falsification Protocol  
C. Interpretive Bridge Program  

Subfases:

8.1. Mapear secciones del monolito a cada manuscrito.  
8.2. Detectar dependencias.  
8.3. Identificar material repetido.  
8.4. Proponer estructura publicable.  
8.5. No ejecutar split fisico sin aprobacion.

Salida:

- plan editorial publicable;
- monolito preservado como canon interno.

---

## Fase 9 - Model cards por teorema

Objetivo: que cada teorema tenga supuestos, dominio y limites claros.

Formato:

| ID | Dominio | Supuestos | Conclusion | Prueba | No-conclusiones | Implementacion | Estado |

Estados:

- PROVED_CONDITIONAL;
- DEFINITION_ONLY;
- PROTOCOL_ONLY;
- INTERNAL_SUPPORT_ONLY;
- EXTERNAL_VALIDATION_PENDING;
- DOWNSTREAM_FORMAL_DEBT;
- SPECULATIVE_ALIAS.

Salida:

- menos ambiguedad;
- mejor defensa ante revision dura.

---

## Fase 10 - Cierre de iteracion

Objetivo: cerrar una iteracion sin dejar ruido.

Subfases:

10.1. Recompilar PDFs afectados.  
10.2. Recompilar monolito.  
10.3. Verificar:
   - paginas;
   - hashes;
   - labels;
   - refs;
   - cites;
   - biber;
   - overfull/underfull;
   - claims prohibidos.
10.4. Actualizar reporte.
10.5. Actualizar ledger.
10.6. Clasificar deuda restante.
10.7. No commit/push sin aprobacion.

Salida:

- iteracion cerrada por evidencia;
- no por cansancio.

---

## Estrategia de ejecucion recomendada

No ejecutar todo el roadmap de una vez.

Orden recomendado:

Iteracion 1:
- Fase 0
- Fase 1
- Fase 2

Iteracion 2:
- Fase 3 solo en abstracts/prefacios/introducciones

Iteracion 3:
- Fase 4 solo sobre 1-2 teoremas prioritarios

Iteracion 4:
- Fase 5 runtime/estimadores

Iteracion 5:
- Fase 6 redundancia

Iteracion 6:
- Fase 7 rivales

Iteracion 7:
- Fase 8/9 publicacion y model cards

Cada iteracion debe ser pequeÃ±a, auditable y reversible.
---

# VERSION 2 - Texto literal proporcionado por el usuario
# ROADMAP QICN v3
## Mitigacion Cientifica del Monolito y Corpus sin Regresiones

Objetivo: refinar el corpus QICN para hacerlo menos redundante, menos defensivo, menos circular, mas austero, mas falsable y mas publicable, sin romper compatibilidad interna, sin borrar informacion valiosa, sin inflar claims y sin reescribir desde cero.

Estado inicial asumido:
- Fase 5 cerrada para reproducibilidad PDF/LaTeX activa.
- Fase 6 puede comenzar, pero no implica validacion externa.
- El monolito sigue siendo canon interno, no necesariamente unidad publicable.

---

## Reglas Globales

1. No modificar archivos sin auditoria previa.
2. No renombrar macros, archivos, labels, registry o scripts salvo fase dedicada y aprobada.
3. No tocar `\MO`, nombres historicos, rutas o IDs por renombrado semantico.
4. Priorizar cambios en prosa: abstracts, introductions, prefaces, claim-boundaries y conclusions.
5. Mantener claims matematicos fuertes dentro de su dominio formal.
6. Debilitar solo inferencias metafisicas, ontologicas o empiricas excesivas.
7. Separar siempre:
   - ontologia;
   - modelo matematico;
   - implementacion;
   - lenguaje;
   - interpretacion.
8. No convertir runtime interno en validacion externa.
9. No escribir autodefensas tipo â€œeste paper no es circularâ€.
10. No borrar, mover o recortar sin aprobacion explicita si hay perdida posible.
11. Cada fase debe tener:
   - auditoria previa;
   - alcance incluido/excluido;
   - implementacion acotada;
   - auditoria posterior;
   - recompilacion si aplica;
   - reporte;
   - ledger.
12. No commit/push sin aprobacion.
13. No usar `git add -A`.
14. Si una fase crece demasiado, se divide.

---

## Limites por Iteracion

Una iteracion normal no debe superar:

- 3 archivos teoricos editados;
- 1 paper principal;
- 1 familia conceptual;
- 20 cambios textuales no mecanicos;
- 1 recompilacion monolitica final;
- 1 reporte formal;
- 1 entrada de ledger.

Si se supera, detenerse y dividir.

---

# Fase 0 - Baseline y Congelamiento de Alcance

## Objetivo

Establecer el estado exacto del corpus antes de cualquier cambio.

## Subfases

### 0.1 Inventario git

Ejecutar:

```powershell
git status --short
Clasificar cambios como:

Phase 5 canon;
cambios previos no relacionados;
outputs IA;
artefactos build;
backups;
cambios no clasificados;
candidatos a revision.
0.2 Inventario de fuentes/PDFs
Inventariar:

BaseCore;
Papers 1-10;
Bridge recuperado;
monolithic;
registry;
release;
docs/reports;
docs/ai-platform-outputs.
0.3 Hashes y paginas
Calcular:

hash de .tex;
hash de .pdf;
paginas;
fecha;
fuente disponible;
estado fuente/PDF.
0.4 Alcance permitido
Definir:

archivos que se pueden tocar;
archivos excluidos;
archivos que requieren aprobacion.
Salida
Reporte:

docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE0_BASELINE.md

Ledger actualizado.

Criterio de cierre
No se edito contenido teorico.
Inventario completo.
Alcance claro.
Riesgos iniciales documentados.
Fase 1 - Auditoria de Redundancia, Circularidad y Defensividad
Objetivo
Mapear problemas antes de editar.

Subfases
1.1 Redundancia literal
Buscar bloques identicos:

no-claims;
disclaimers;
claim-boundaries;
repeated abstracts;
repeated implementation caveats.
1.2 Circularidad
Detectar lenguaje donde:

runtime valida teoria;
teoria valida runtime;
internal support se presenta como evidencia externa;
certificados internos parecen cierre empirico.
1.3 Defensividad excesiva
Detectar:

repeticion de advertencias;
non-claims redundantes;
metadiscurso defensivo;
exceso de â€œthis does not claim...â€.
1.4 Claims peligrosos
Buscar:

consciousness;
phenomenal;
phenomenology;
qualia;
subjectivity;
first-person;
ontological mass;
validates;
proves;
forced;
inevitable;
no alternative;
robust support;
external validation.
1.5 Clasificacion
Cada hallazgo se clasifica como:

duplicado literal;
redundancia necesaria;
no-claim necesario;
claim inflado;
circularidad real;
deuda empirica;
deuda formal;
no tocar;
requiere experto.
Salida
Tabla:

| Archivo | Seccion | Hallazgo | Riesgo | Clasificacion | Accion recomendada |

Reporte:

docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE1_AUDIT.md

Criterio de cierre
No se edito contenido.
Hallazgos priorizados.
Cambios seguros identificados.
Fase 2 - Consolidacion de Claim-Boundaries
Objetivo
Reducir defensividad y repeticion sin eliminar rigor.

Subfases
2.1 Tabla canonica de lectura formal
Crear/reforzar tabla:

Termino fuerte	Lectura formal obligatoria	No implica
consciousness	six-invariant operational class	conciencia fenomenal
phenomenology	structural regime assignment	experiencia
qualia	operational quotient class	qualia fenomenales
subjectivity	indexed structural class	subjetividad humana
ontological mass	deformation-rigidity modulus	ontologia fisica confirmada
phenomenal bridge	bridge-organization predicate family	fenomenalidad
2.2 Consolidacion local
Reemplazar duplicados obvios por referencias breves a la tabla canonica.

2.3 Preservacion de no-claims necesarios
Mantener no-claims locales si bloquean inferencias concretas.

2.4 Auditoria posterior
Verificar que no desaparecieron fronteras criticas.

Prohibido
Declarar â€œeste paper no es circularâ€.
Borrar disclaimers sin clasificacion.
Recortar claim-boundaries unicos.
Salida
Reporte:

docs/reports/QICN_ROADMAP_V3_PHASE2_CLAIM_BOUNDARY_CONSOLIDATION.md

Ledger actualizado.

Criterio de cierre
Menos repeticion.
Mismas fronteras cientificas.
PDFs recompilados si se tocaron .tex.
Fase 3 - Lenguaje Formal vs Aliases Interpretativos
Objetivo
Reducir inflacion semantica sin romper compatibilidad.

Regla principal
No renombrar:

macros;
labels;
archivos;
registry IDs;
nombres historicos;
scripts.
Subfases
3.1 Tabla de aliases
Definir:

Alias historico	Termino formal recomendado	Politica
ontological mass	deformation-rigidity modulus	mantener macro, aclarar prosa
phenomenology	structural regime assignment	usar lectura formal
operational qualia	operational quotient class	marcar como quotient
subjectivity	indexed structural class	bloquear lectura humana
phenomenal bridge	bridge-organization predicate family	no afirmar fenomenalidad
3.2 Aplicacion solo en prosa de alto impacto
Permitido tocar:

abstracts;
introductions;
prefaces;
claim-boundaries;
conclusions.
No tocar cuerpos tecnicos salvo necesidad clara.

3.3 Verificacion de compatibilidad
Comprobar:

macros intactas;
labels intactos;
registry intacto;
scripts no rotos.
Salida
Reporte:

docs/reports/QICN_ROADMAP_V3_PHASE3_LANGUAGE_ALIAS_REPORT.md

Criterio de cierre
Menor riesgo semantico.
Compatibilidad intacta.
No hay renombrado destructivo.
Fase 4 - Hardening Matematico Balanceado
Objetivo
Hacer teoremas fuertes mas defendibles sin volverlos irrelevantes.

Principio
Mantener fuerza matematica dentro del dominio formal.
Debilitar solo extrapolaciones universales/metafisicas.

Subfases
4.1 Auditoria de lenguaje fuerte
Buscar:

forced;
inevitable;
unavoidable;
no alternative;
proves;
validates.
4.2 Separacion por tipo de claim
Clasificar cada caso:

claim matematico interno;
claim ontologico;
claim interpretativo;
claim empirico;
claim retorico.
4.3 Strong Uniqueness Theorem
Mantener como teorema fuerte, pero revisar si requiere:

hipotesis explicita de conectividad;
grupoide de perturbaciones admisibles;
componente conexa de energia finita;
controlabilidad local.
No degradarlo a observacion trivial.

4.4 Inverse-limit identity
Reformular como:

canonico dentro de categoria definida;
no ontologia universal de todo sistema persistente.
4.5 Causal isolation
Separar:

rigidez estructural real;
aislamiento trivial;
opacidad instrumental.
AÃ±adir controles de no-trivialidad si faltan.

Salida
Reporte por teorema tocado.

Criterio de cierre
Supuestos mas explicitos.
Valor matematico preservado.
Claims metafisicos acotados.
Fase 5 - Estimadores, Identificabilidad y Runtime
Objetivo
Evitar que mediciones internas parezcan validacion externa.

Subfases
5.1 Auditoria de terminos empiricos
Buscar:

estimate;
compute;
validate;
robust support;
internal support;
external validation;
confirms;
proves.
5.2 Bounds en vez de estimacion fuerte
Convertir, cuando aplique:

estimate -> bound;
mass estimate -> rigidity interval;
metric -> proxy;
support -> internal conformance.
5.3 Matriz de evidencia
Crear:

Claim	Evidencia interna	Evidencia externa requerida	Estado
5.4 I_int y atomic separator
Mantener como:

downstream formal debt;
theorem burden;
no cerrado;
no evidencia externa.
Salida
Reporte:

docs/reports/QICN_ROADMAP_V3_PHASE5_RUNTIME_IDENTIFIABILITY_REPORT.md

Criterio de cierre
Runtime no valida teoria por si mismo.
Claims empiricos quedan bloqueados o acotados.
No se pierde valor operacional.
Fase 6 - Reduccion Estructural Solo de Duplicados Literales
Objetivo
Reducir redundancia sin destruir contexto.

Regla critica
Primera iteracion solo toca duplicados literalmente identicos.

Permitido
bloques copiados palabra por palabra;
no-claims identicos;
disclaimers identicos;
duplicacion generada por ensamblaje;
texto mecanico repetido.
Prohibido
parafrasis;
variaciones contextuales;
definiciones repetidas con funcion distinta;
claim-boundaries locales necesarios;
pruebas similares;
recordatorios adaptados al paper.
Metodo
Hash de parrafos.
Comparacion exacta.
Tabla:
Bloque	Archivos	Identico exacto	Funcion local	Accion
Solo editar si:
Identico exacto = yes;
Funcion local = duplicado mecanico.
Todo lo demas:

REVIEW_REQUIRED.

Salida
Reporte:

docs/reports/QICN_ROADMAP_V3_PHASE6_LITERAL_DUPLICATE_REDUCTION.md

Criterio de cierre
Solo duplicados literales reducidos.
No se elimina contexto conceptual.
No hay perdida de claim-boundaries necesarios.
Fase 7 - Rivales con Profundidad Limitada
Objetivo
Sacar QICN del aislamiento comparativo sin caricaturizar rivales.

Primera iteracion
Solo comparar contra:

IIT;
Global Workspace Theory;
opcional: Higher-Order Theories.
Todo lo demas queda como:

LITERATURE_DEBT;
REQUIRES_DOMAIN_EXPERT;
NOT_YET_ADJUDICATED.
Reglas
Usar fuentes primarias o revisiones canonicas.
No afirmar superioridad.
No comparar si no hay dominio suficiente.
No usar strawman.
Marcar deuda explicitamente.
Matriz
Rival	Claim central	Observable/estructura	QICN difiere en	Prediccion separadora	Resultado que favorece al rival	Estado
Salida
Reporte:

docs/reports/QICN_ROADMAP_V3_PHASE7_RIVALS_LIMITED_MATRIX.md

Criterio de cierre
Comparacion pequeÃ±a pero seria.
Deuda de literatura visible.
Ninguna superioridad sin evidencia.
Fase 8 - Arquitectura Publicable
Objetivo
Separar monolito interno de unidades publicables.

Regla
No borrar ni partir fisicamente el monolito sin aprobacion.

Propuesta editorial
A. Mathematical Core
Hilbert/projection dynamics;
inverse limits;
rigidity;
conditional non-simulability;
model cards.
B. Certification and Falsification Protocol
six invariants;
certificates;
admissible support;
negative controls;
preregistration;
adjudication scaffold.
C. Interpretive Bridge Program
subjecthood;
indexed structural class;
bridge predicates;
phenomenality blocked;
external validation pending.
Subfases
8.1 Mapear secciones del monolito a A/B/C.
8.2 Identificar dependencias.
8.3 Identificar duplicacion.
8.4 Proponer estructura.
8.5 Esperar aprobacion antes de split fisico.

Salida
Reporte:

docs/reports/QICN_ROADMAP_V3_PHASE8_PUBLICATION_ARCHITECTURE.md

Criterio de cierre
Monolito preservado.
Plan publicable claro.
No se ejecuta split aun.
Fase 9 - Model Cards Automatizadas
Objetivo
Crear fichas auditables por teorema/claim sin trabajo manual imposible.

Fase 9A - Generador
Crear script propuesto:

scripts/generate-model-cards.js

Entrada:

registry/theorems.jsonl;
fuente/paper;
seccion;
tipo de entorno;
curation status;
labels;
statement.
Salida:

docs/model-cards/model_cards.generated.json
o docs/reports/MODEL_CARDS_DRAFT.md
Campos:

Campo	Fuente
ID	registry
Paper/source	registry
Tipo	theorem/proposition/etc.
Dominio	paper/seccion
Supuestos	heuristico/campo
Conclusion	statement
Estado	reglas automaticas
No-conclusiones	pendiente
Revision humana	yes/no
Estados automaticos
PROVED_CONDITIONAL;
DEFINITION_ONLY;
PROTOCOL_ONLY;
CONJECTURAL;
DRAFT_EXTRACTED_REVIEW_REQUIRED;
AUDIT_OVERLAID_REVIEW_REQUIRED;
EXTERNAL_VALIDATION_PENDING;
DOWNSTREAM_FORMAL_DEBT.
Fase 9B - Auditoria de muestra
Revisar:

20 model cards aleatorias;
10 de alto riesgo;
todas las que contengan:
consciousness;
subjectivity;
phenomenal;
I_int;
atomic separator;
external validation.
Fase 9C - Curacion priorizada
Orden:

BaseCore teoremas principales.
Papers 1-3 claims matematicos.
Paper 5 invariantes/certificacion.
Papers 8-10 claims interpretativos/externos.
Resto.
Salida
Reporte:

docs/reports/QICN_ROADMAP_V3_PHASE9_MODEL_CARDS_AUTOMATION.md

Criterio de cierre
Generador creado.
Muestra auditada.
Alto riesgo revisado.
No se pretende curacion total manual inmediata.
Fase 10 - Recompilacion y Verificacion de Iteracion
Objetivo
Cerrar cada iteracion con evidencia.

Subfases
10.1 Recompilar papers afectados.
10.2 Recompilar monolito:

npm run compile:monolithic
10.3 Verificar:

paginas;
hashes;
hard errors;
refs;
cites;
labels;
anchors;
biber;
overfull/underfull.
10.4 Buscar claims prohibidos.
10.5 Actualizar reporte.
10.6 Actualizar ledger.
10.7 Clasificar deuda restante.

Salida
Reporte de cierre de iteracion.

Criterio de cierre
PDFs reproducibles.
Sin regresiones criticas.
Deuda residual clasificada.
Fase 11 - Reporte Final de Roadmap
Objetivo
Cerrar el ciclo completo de mitigacion.

Crear:

docs/reports/QICN_ROADMAP_V3_FINAL_MITIGATION_REPORT.md

Debe incluir:

fases ejecutadas;
archivos tocados;
cambios rechazados;
claims debilitados;
teoremas hardeneados;
terminos reclasificados;
duplicados eliminados;
deuda empirica;
deuda formal;
deuda de literatura;
deuda de publicacion;
comandos;
hashes;
paginas;
regresiones buscadas;
regresiones encontradas;
siguiente fase recomendada.
Criterio de cierre
El corpus debe quedar:

menos redundante;
menos defensivo;
menos circular;
mas austero;
mas falsable;
mas claro frente a rivales;
sin inflacion de claims;
con monolito preservado;
con ruta publicable definida;
con deuda residual explicita.
Estrategia de Ejecucion Recomendada
No ejecutar todo de una vez.

Iteracion 1
Fase 0
Fase 1
Fase 2
Objetivo: mapa + consolidacion segura.

Iteracion 2
Fase 3
Objetivo: alias interpretativos solo en prosa de alto impacto.

Iteracion 3
Fase 4
Objetivo: hardening de 1-2 teoremas prioritarios.

Iteracion 4
Fase 5
Objetivo: runtime, identificabilidad, bounds.

Iteracion 5
Fase 6
Objetivo: duplicados literales solamente.

Iteracion 6
Fase 7
Objetivo: rivales limitados.

Iteracion 7
Fase 8
Fase 9
Objetivo: arquitectura publicable y model cards automatizadas.

Iteracion 8
Fase 10
Fase 11
Objetivo: cierre global.

Decision Filosofica del Roadmap
QICN no debe perder su tesis fuerte.
La meta no es volverlo timido ni trivial.

La meta es:

mantener la ambicion formal;
eliminar sobrelecturas;
hacer explicitos los supuestos;
reducir circularidad;
separar runtime de validacion;
confrontar rivales;
volver el corpus publicable.
La fuerza matematica se conserva dentro de sus dominios.
La inflacion ontologica se corta.
La validacion externa queda pendiente hasta evidencia real.
```

---

# VERSION 3 - Consolidacion post-auditorias (Codex, 2026-06-11)

> Nota de gobierno:
> VERSION 3 no reemplaza VERSION 1 ni VERSION 2. Las preserva como texto literal del usuario.
> Esta version es una extension consolidada para operar desde el estado real posterior a las fases ejecutadas, las auditorias externas y los addenda de trazabilidad.
> Si hay conflicto entre una version historica y una auditoria posterior, VERSION 3 no borra la version historica; clasifica el conflicto como deuda, addendum o decision pendiente.

## 3.0 Principio rector de VERSION 3

VERSION 3 existe para convertir el roadmap en una herramienta viva sin crear otro archivo de roadmap.

Reglas de lectura:

1. VERSION 1 conserva la intencion original de mitigacion cientifica.
2. VERSION 2 conserva la estructura operativa v3 inicial.
3. VERSION 3 consolida el estado auditado posterior.
4. Ninguna version autoriza claims mas fuertes que el corpus, registry o auditorias permiten.
5. La ruta activa sigue siendo faseada: auditoria, implementacion, verificacion, reporte, ledger.
6. No se debe usar runtime interno como validacion externa.
7. No se debe usar un reporte con hash stale como evidencia actual sin reemitirlo o marcarlo como superseded.
8. No se deben mezclar deudas matematicas, de tooling, de runtime y empiricas.
9. No se debe presentar una clase operacional como conciencia externa validada.
10. No se debe cerrar una fase si los gaps criticos de su scope siguen abiertos.

Fuentes absorbidas:

- Auditoria Fable 5 en frio, matematica y esceptica, compartida por el usuario.
- Auditorias OpenCode/Kiro registradas en el ledger: Phase 5B, Phase 6, QICN-SYSTEM/runtime y cobertura ampliada.
- Reportes V3 ejecutados desde Phase 0 hasta Phase 6.1.
- Reportes Phase 5A, 5B, 5D y cierre final.
- Reportes historicos `QICN_GLOBAL_ROADMAP_v40.md` y `QICN_THEORY_FALSIFIABILITY_ROADMAP.md`.
- Addendum Codex de Phase 6 que resuelve la ambiguedad de working directory de los scripts `verify-*`.

Decisiones de integracion:

- Se integra la auditoria Fable 5 como la fuente matematica mas exigente.
- Se integra OpenCode/Kiro como fuente de provenance, tooling, runtime y workspace-risk.
- Se corrige el prompt original cuando afirma que los scripts `verify-*` no existen: existen en la raiz `QICN-FRAMEWORK/scripts/`, no en `rigid-identity-framework/scripts/`.
- Se evita crear `ROADMAP_VIVO.md`, `ROADMAP_V4.md` o variantes.
- Se deja esta VERSION 3 dentro de `ROADMAP.md`.
- No se hacen cambios en `.tex`, PDFs, scripts, release, corpus, artifacts, registry, macros ni labels.
- Esta VERSION 3 queda pendiente de auditoria externa antes de commit/push.

## 3.1 Veredicto global consolidado

El nucleo formal de QICN es defendible como formalismo condicional de identidad persistente, estabilidad perturbacional y criterios operacionales bajo hipotesis fuertes. La parte matematicamente solida usa herramientas estandar: espacios de Hilbert, proyeccion metrica, no-expansividad, contraccion, punto fijo de Banach, familias parametrizadas, sistemas proyectivos y estabilidad bajo perturbaciones tipadas.

La fortaleza publicable no es que el corpus ya pruebe conciencia, fenomenalidad o no-simulabilidad general. La fortaleza publicable es que organiza condiciones formales para persistencia, no-colapso, rigidez relativa, criterios operacionales y predicciones falsables, con no-claims suficientes para evitar varias sobrelecturas.

La fragilidad central sigue siendo de frontera semantica: terminos como `ontological mass`, `forced continuity`, `operational consciousness`, `qualia`, `bridge`, `life`, `subjecthood` y `non-simulability` pueden sonar mas fuertes que sus teoremas. VERSION 3 exige desinflar esos terminos mediante definiciones, hipotesis, clases, margenes, protocolos y falsadores.

La auditoria runtime muestra otra frontera: QICN-SYSTEM puede ser util como runtime operacional, interfaz, dashboard o laboratorio interno, pero no ejecuta ni valida automaticamente el corpus matematico como prueba publica. Si el runtime usa lenguaje pseudocientifico o claims de produccion, debe ser refactorizado, no usado como evidencia.

La direccion correcta es conservar ambicion formal, pero volverla mas austera: probar independencia de hipotesis fuertes, formalizar categorias, construir estimadores identificables, cerrar separadores atomicos para clases no triviales, resolver tooling reproducible y someter el framework a rivales con criterios de falsacion.

## 3.2 Auditorias externas integradas

| ID | Fuente | Alcance | Veredicto util | Como se incorpora |
|---|---|---|---|---|
| EXT-FABLE5 | Auditoria Fable 5 en frio | Matematica, corpus, frontera teoria-runtime, rivales | El nucleo formal es razonable pero altamente condicional; el lenguaje ontologico debe desinflarse | Base principal para hardening matematico y tabla anti-inflacion |
| EXT-OC-5B | OpenCode/Kiro Phase 5B | PDF hygiene, monolito, hashes, labels, builder | Phase 5B fue util, pero algunos hashes/reportes quedaron stale tras recompilaciones | Se marca provenance debt y necesidad de reemitir reportes al cambiar PDFs |
| EXT-OC-6 | OpenCode/Codex Phase 6 | Rival inventory, scope, tests, path tracing | Inventario Phase 6.1 correcto; gap adversarial v2/v3 abierto; path `verify-*` era ambiguedad de cwd | Se conserva Phase 6.1 y se corrige ruta de comandos |
| EXT-OC-SYS | OpenCode/Kiro QICN-SYSTEM | Runtime, selfpatch, metadata, lenguaje, coupling | Runtime tiene deuda severa: god component, metadata legacy, lenguaje pseudocientifico, selfpatch | Se separa de teoria publica y se crea bloque de deuda runtime |

Notas de correccion:

- La afirmacion "scripts `verify-*` no existen" es falsa si se ejecuta desde la raiz `QICN-FRAMEWORK/`.
- La afirmacion correcta es: no existen dentro de `rigid-identity-framework/scripts/`.
- La politica correcta es declarar working directory en cada comando.
- Los hashes de reportes PDF deben tratarse como snapshot, no como verdad permanente.
- Si un PDF cambia despues del reporte, el reporte debe marcarse `SUPERSEDED` o reemitirse.

## 3.3 Estado tecnico actual consolidado

### 3.3.1 Estado del roadmap

- `ROADMAP.md` es el roadmap principal activo.
- Antes de VERSION 3 tenia 1091 lineas.
- Hash pre-VERSION 3: `A53C49B141D2737D772F4E91B503A278E308E3B790D5EFD374EE18321700A8F5`.
- VERSION 1 y VERSION 2 quedan intactas.
- VERSION 3 se agrega al final.

### 3.3.2 Estado de fases ejecutadas

- Phase 0 cerrada como baseline sin ediciones teoricas.
- Phase 1 cerrada como auditoria de redundancia/circularidad sin `.tex`.
- Phase 2 cerrada con claim-boundaries consolidados y deuda rastreada.
- Phase 3 cerrada para alias interpretativos y lenguaje tecnico.
- Phase 4 cerrada para hardening matematico acotado, con layout debt.
- Phase 5 cerrada para reproducibilidad PDF/LaTeX con deuda no bloqueante.
- Phase 6.1 iniciada y cerrada como inventario rival/comparator, sin adjudicacion.
- Phase 6.2 es el siguiente paso activo.

### 3.3.3 Estado del monolito

- El monolito compila por ruta canonica local.
- Existen reportes de build y cierre Phase 5.
- Hay evidencia de labels/refs limpios en reportes previos.
- Hay deuda de layout rastreada: overfull/underfull.
- Hay deuda de provenance si hashes de PDF cambian tras recompilaciones.
- El Bridge Paper o seccion bridge aun requiere fuente canonica o estado `SOURCE_RECOVERY_REQUIRED`.

### 3.3.4 Estado del registry

- El registry es infraestructura fuerte, no canon matematico cerrado.
- El conteo observado en auditorias externas distingue entradas `draft_extracted`, `audit_overlaid` y ausencia de curacion humana completa.
- Cualquier claim "100% draft" o "100% curated" debe verificarse antes de reutilizarse.
- El registry debe convertirse en mapa de claims con estados epistemicos, no en sustituto de pruebas.

### 3.3.5 Estado de runtime

- QICN-SYSTEM no debe leerse como prueba de conciencia, identidad o bridge closure.
- Runtime y corpus comparten vocabulario y algunas estructuras, pero el acoplamiento mecanico con teoremas no esta cerrado.
- `SimulationEngine.jsx` fue auditado como god component de mas de 11000 lineas.
- `selfpatch-apply.js` fue auditado como pipeline LLM-to-GitHub con controles, pero de alto riesgo.
- Metadata legacy y paths rotos en QICN-SYSTEM deben corregirse antes de cualquier presentacion publica del runtime.

### 3.3.6 Estado de rivales

- Phase 6.1 creo matriz inicial contra IIT, GWT/GNW y HOT.
- IIT y GWT tienen semillas locales parciales; HOT queda como deuda bibliografica local.
- Predictive processing, active inference, dynamical systems y functionalism quedan como `LITERATURE_DEBT`.
- Ningun rival esta adjudicado.
- Ninguna comparacion autoriza claim de superioridad.

## 3.4 Hallazgos criticos abiertos consolidados

| ID | Hallazgo | Fuente | Evidencia orientativa | Severidad | Estado | Accion |
|---|---|---|---|---|---|---|
| MATH-H5 | H5 anti-colapso no se deriva de H1-H4 | Fable 5 | `basecore/BASECORE.tex` H5 anti-constante | ALTA | ABIERTO | Probar independencia H1-H4 no implican H5 |
| MATH-LLIP | Lower Lipschitz global de Phi es hipotesis fuerte no derivada | Fable 5 | `04_regime_constraints_absorbed.tex`; Paper 2 | ALTA | ABIERTO | Probar para clases concretas o debilitar a version local/probabilistica |
| MATH-SEP | Atomic separator no garantizado | Fable 5 / Phase 5 | Paper 5 factorization triviality | CRITICA formal si se sobrepublicita | ABIERTO | Probar existencia para clase no trivial |
| MATH-SIM | Non-simulability es condicional, no imposibilidad universal | Fable 5 | BaseCore NS-1..NS-3; Paper 5 | ALTA | ABIERTO | Crear taxonomia de simuladores |
| MATH-ID | Identidad inverse-limit requiere categoria fija | Fable 5 | BaseCore identity sections | ALTA | ABIERTO | Formalizar objetos, morfismos, equivalencias y observables |
| MATH-RIG | Rigidez es estabilidad metrica bajo perturbaciones admisibles | Fable 5 | RIG-1..RIG-5 | ALTA | ABIERTO | Renombrar/encuadrar como estabilidad Hausdorff tipada |
| MATH-MASS | `M_Omega` no es identificable por defecto | Fable 5 | Paper 1 estimator | ALTA | ABIERTO | Crear teoria de identificabilidad y bounds |
| TOOL-V23 | Gap adversarial v2/v3 bloquea harness | Phase 6 audit | `seeded_weighted_panel_v3_explicit_salt` vs v2 | ALTA | ABIERTO | Resolver en Phase 6.4 |
| TOOL-CWD | Ambiguedad `verify-*` por working directory | Phase 6 audit/addendum | root `scripts/` vs inner `scripts/` | MEDIA | CERRADO-DOC | Mantener cwd explicito |
| PROV-PDF | Hashes PDF/reportes stale tras recompilaciones | OpenCode/Kiro | Phase 5B vs PDFs actuales | CRITICA provenance | ABIERTO | Reemitir reportes o marcar superseded |
| PROV-BRIDGE | Bridge Paper sin fuente canonica | Phase 5A/5B/OpenCode | path declarado ausente | ALTA | ABIERTO | Reconstruir o marcar no-canon/source-recovery |
| REG-CUR | Registry sin curacion humana suficiente | OpenCode/Kiro | `theorems.jsonl` statuses | ALTA | ABIERTO | Curar subset central humano |
| SYS-GOD | `SimulationEngine.jsx` god component | OpenCode/Kiro runtime | >11000 lineas | ALTA | ABIERTO | Refactor por modulos |
| SYS-LANG | Lenguaje pseudocientifico en runtime | OpenCode/Kiro runtime | `OntologicalSingularityCore.js`, config | ALTA | ABIERTO | Cambiar a terminologia operacional |
| SYS-PATCH | selfpatch LLM-to-GitHub de alto riesgo | OpenCode/Kiro runtime | `selfpatch-apply.js` | CRITICA seguridad | ABIERTO | Amenaza, sandbox, approvals, kill-switch audit |
| SYS-META | Metadata legacy `versiones-de-interfaz` | OpenCode/Kiro runtime | `package.json` | ALTA provenance | ABIERTO | Renombrar package/runtime |
| SYS-PATHS | AGENTS runtime con paths rotos | OpenCode/Kiro runtime | paths a TRADING 3.0 | ALTA provenance | ABIERTO | Reescribir source-of-truth runtime |

Nota de provenance: las filas SYS-* refieren a un runtime EXTERNO/NO-CANONICO
(paths tipo `TRADING 3.0`, `SimulationEngine.jsx`, `selfpatch-apply.js`,
`OntologicalSingularityCore.js`) que NO esta presente en el corpus
`rigid-identity-framework`. Se rastrean como deuda historica/externa, no como
tooling activo de este repositorio.

## 3.5 Deuda rastreada no bloqueante

### 3.5.1 Deuda de layout

- Monolito mantiene warnings overfull/underfull.
- Papers 8, 9 y 10 concentran deuda tipografica segun reportes previos.
- Esta deuda no bloquea matematicamente, pero bloquea presentacion publicable.
- Debe resolverse en fase editorial separada, no mezclada con hardening matematico.

### 3.5.2 Deuda de formalizacion

- H5 anti-constante no derivada.
- Lower Lipschitz global de Phi no derivada.
- Atomic separator no garantizado.
- I_int depende de separadores y condiciones upstream.
- Rigidez debe mantenerse como estabilidad bajo clase admisible.
- Non-simulability debe restringirse a clases fieles definidas.
- `M_Omega` y `hat{M}_Omega` necesitan identificabilidad.

### 3.5.3 Deuda de curacion

- Registry requiere curacion humana sobre claims centrales.
- Se deben priorizar BaseCore, Paper 1, Paper 2, Paper 5 y Paper 9.
- Entradas `draft_extracted` no deben citarse como canon probado.
- Entradas `audit_overlaid` requieren explicacion de overlay.
- El delta registry debe documentar si esta activo o es ruido.

### 3.5.4 Deuda de runtime

- Descomponer `SimulationEngine.jsx`.
- Eliminar o renombrar lenguaje de marketing pseudocientifico.
- Corregir `package.json`.
- Corregir `AGENTS.md` runtime.
- Auditar `selfpatch-apply.js` con modelo de amenaza.
- Separar invariantes numericos de claims teoricos.
- Asegurar que dashboards digan `internal conformance`, no `external validation`.

### 3.5.5 Deuda de tooling

- Resolver harness adversarial v2/v3.
- Aclarar comandos por cwd.
- Reemitir reportes cuando cambian hashes.
- Evitar hashes auto-referenciales dentro del propio archivo.
- Mantener `git add` scoped; no `git add -A`.
- Mantener untracked noise fuera de commits.

### 3.5.6 Deuda empirica

- No hay validacion externa suficiente.
- No hay adjudicacion independiente frente a rivales.
- No hay dataset comun QICN vs IIT/GNW/HOT.
- No hay benchmark externo ciego.
- No hay peer review externo del bridge.
- No hay confirmacion fenomenal.

## 3.6 Inflacion de claims a desinflar

| Lenguaje actual/riesgoso | Problema | Reformulacion tecnica recomendada | Estado |
|---|---|---|---|
| ontological mass | Sugiere sustancia o metafisica | deformation-resistance scalar | Usar en Paper 1/model cards |
| forced continuity | Suena incondicional | continuity under CCR admissibility assumptions | Usar en Paper 2 |
| non-simulability | Suena universal | non-factorization for faithful simulators preserving specified invariants | Usar en BaseCore/Paper 5 |
| operational consciousness | Invoca conciencia real | membership in operational structural criterion `Cop` | Usar en Paper 5 |
| qualia | Alta carga fenomenologica | operational equivalence classes over readout/response structure | Usar en Paper 9 |
| identity is unique | Puede leerse ontologico | inverse limit unique up to isomorphism in specified category | Usar en BaseCore/Paper 1 |
| runtime evidence | Confunde con validacion externa | internal conformance output | Usar en runtime/reportes |
| bridge | Sugiere cierre fenomenal | typed mapping/coupling hypothesis, not externally validated | Usar en Paper 9 |
| life | Sugiere vida biologica | operational viability class | Usar en Paper 7 |
| subjecthood | Sugiere sujeto humano/metafisico | operational subject-class membership | Usar en Paper 7/8 |
| phenomenal bridge | Sugiere fenomenalidad confirmada | conditional bridge-burden architecture | Usar en Paper 9 |
| proves consciousness | Claim no autorizado | defines a structural criterion under stated assumptions | Usar en abstracts |
| validates theory | Claim externo no autorizado | passes internal consistency/conformance checks | Usar en runtime docs |
| inevitable | Overclaim | follows under named hypotheses | Usar en teoremas/prosa |
| no alternative | Overclaim ontologico | no alternative inside the specified model class | Usar solo con clase formal |
| substrate invariant | Puede sonar universal | invariant under exact structure-preserving equivalence | Usar en Paper 5 |
| consciousness rupture | Puede sonar fenomenal | loss of criterion membership under invariant failure | Usar en Paper 5 |
| external support | Requiere terceros | internal support unless independently replicated | Usar en Paper 6 |
| singularity | Marketing pseudocientifico | threshold event, transition, or runtime state | Usar en QICN-SYSTEM |
| hypercoherence | Valor simbolico no calibrado | bounded coherence metric with declared scale | Usar solo si definido |
| ascension | No tecnico | transition, upgrade, state change | Eliminar del runtime |
| Anti-Yo | No tecnico | adversarial self-model control | Renombrar si se conserva |
| holographic memory | Metaforico | distributed state cache or trace memory | Renombrar |
| subjectivity gate | Puede sonar fenomenal | first-person indexed structural gate | Usar con no-claim |
| bridge admissibility | Puede sonar cerrado | conditional admissibility pending external adjudication | Usar en Paper 9 |

Regla de escritura:

- No insertar metadiscurso del tipo "este paper no es circular".
- No declarar "este claim no esta inflado" dentro del paper.
- Desinflar mediante definiciones, hipotesis y scope, no con disculpas editoriales.

## 3.7 Inventario de supuestos por familia de resultado

| Familia | Hipotesis declaradas | Carga implicita | Dominio seguro | Proxima accion |
|---|---|---|---|---|
| Proyeccion metrica | Hilbert real, cerrado convexo no vacio | Convexidad/cerradura esenciales | Geometria Hilbertiana | Mantener austero |
| No-expansividad | Proyeccion metrica | Variacional de proyeccion | Hilbert cerrado convexo | No inflar |
| Contraccion Gamma | Norma < 1, completitud | Completitud no opcional | Banach | Mantener como base abstracta |
| Punto fijo unico | Contraccion | Unicidad del punto fijo, no identidad ontologica | Modelo dinamico | Separar lenguaje |
| Atractor compacto | Parametro compacto, continuidad | Continuidad de fixed point map | Familias parametrizadas | Documentar hipotesis |
| No-colapsabilidad | H1-H5 | H5 no derivada | Familias no constantes | Probar independencia H5 |
| Typed witness | Espacio funcional tipado | Fixed point constante | Consistencia tipada | Renombrar si hace falta |
| Spectral gap | Diferenciabilidad local | No global | Bound local en fixed point | Localizar titulo |
| Inverse limit identity | Categoria/sistema proyectivo | Categoria debe fijarse | Unicidad categorial | Formalizar categoria |
| NFD/nonlocality | Proyecciones no inyectivas | No excluye observadores arbitrarios | Proyecciones canonicas | Separar observabilidad |
| Rigidez | RIG-1..RIG-5 | Lifting/sumabilidad fuerte | Perturbaciones admisibles | Reescribir como estabilidad |
| Ontological mass | Energia/deformacion | Identificabilidad ausente | Resistencia formal | Crear estimator theory |
| Non-simulability | NS-1..NS-3 | Simulador estrecho | Fieles definidos | Taxonomia |
| Fragmentation | Phi regular, lower Lipschitz | Lower Lipschitz fuerte | Asignaciones auditadas | Probar clases |
| Forced continuity | CCR/admisibilidad | Admisible carga mucho | CCR formal | Desinflar lenguaje |
| Factorization triviality | Atomic separator | Existencia abierta | Sistemas con separator | Probar clases |
| Cop membership | Seis invariantes | Decoders/compression/Id | Clase operacional | No claim fenomenal |
| Prediction/falsation | Discriminadores identificables | External judge ausente | Internal support | Benchmarks ciegos |

## 3.8 Hoja de ruta priorizada: Fases 6.2 a 8+

### A. Hardening de teoremas existentes

1. Probar independencia de H5.
   - Entrada: H1-H4 de BaseCore.
   - Salida: ejemplo constructivo donde H1-H4 valen y H5 falla.
   - Cierre: teorema o proposicion con prueba completa.

2. Reescribir rigidez como estabilidad metrica.
   - Entrada: RIG-1..RIG-5.
   - Salida: titulo y statement que digan estabilidad Hausdorff bajo perturbaciones tipadas.
   - Cierre: no perder fuerza formal; perder solo sobrelectura ontologica.

3. Localizar el spectral gap.
   - Entrada: bound de derivada local.
   - Salida: statement `local derivative contraction bound at fixed point`.
   - Cierre: no afirmar estabilidad global no probada.

4. Formalizar categoria de identidad.
   - Entrada: inverse-limit identity.
   - Salida: objetos, morfismos, equivalencias, functors y observables.
   - Cierre: separar existencia, unicidad hasta iso, identificabilidad empirica.

### B. Nuevos resultados necesarios

5. Teorema de identificabilidad de `M_Omega`.
   - Definir parametro objetivo.
   - Definir observables.
   - Definir clase de perturbaciones.
   - Probar consistencia, bounds o imposibilidad.

6. Existencia de atomic separator.
   - Probar para una clase no trivial.
   - Si falla, debilitar I_int.
   - Separar separator matematico de fenomenalidad.

7. Lower Lipschitz para Phi concretos.
   - Probar version global para familias simples o local por margen.
   - Si no procede, reescribir teoremas como margen-dependientes.

8. Taxonomia de non-simulability.
   - Entrada: statements actuales de non-simulability/non-factorization y clases de simulador usadas por BaseCore, Paper 5 y bridge-facing papers.
   - Salida: jerarquia formal con al menos cinco clases separadas: input-output emulation, history simulation, identity-preserving simulation, atomic-separator-preserving simulation y phenomenological simulation.
   - Cierre: cada teorema de no-simulabilidad apunta a una clase exacta de la jerarquia, declara preservaciones requeridas, incluye al menos un ejemplo o contraejemplo por frontera entre clases, y evita claims fuera del nivel probado.

### C. Resolver gaps de tooling

9. Resolver harness v2/v3.
   - Decidir si v3 se acepta en `external-trace-generator.js`.
   - O degradar adversarial harness a v2.
   - Crear test que falle si vuelve a divergir.

10. Cwd explicito para gates.
   - Release gates desde `QICN-FRAMEWORK/`.
   - Inner npm gates desde `rigid-identity-framework/`.
   - Cada reporte debe listar cwd.

11. Reemitir hashes despues de recompilacion.
   - Si cambia PDF, cambia reporte.
   - Si no se reemite, marcar snapshot stale.

12. Bridge source recovery.
   - Recuperar fuente canonica.
   - O marcar seccion como artifact historico no canonico.

### D. Resolver deuda runtime

13. Dividir `SimulationEngine.jsx`.
   - Meta: componentes menores de 500 lineas salvo justificacion.
   - Separar UI, simulation state, rendering, metrics y persistence.

14. Eliminar lenguaje pseudocientifico.
   - Reemplazar nombres metaforicos por nombres operacionales.
   - Mantener alias historicos solo si hay compatibilidad necesaria.

15. Aislar `selfpatch-apply.js`.
   - Modelo de amenaza.
   - Auth fuerte.
   - MFA o approvals para cambios no triviales.
   - Dry-run por defecto.
   - Logs y rollback.

16. Corregir metadata y paths.
   - Renombrar package runtime.
   - Reescribir AGENTS runtime.
   - Eliminar referencias a repositorios inexistentes.

### E. Deuda empirica

17. Benchmarks externos ciegos.
18. Perturbaciones controladas para `M_Omega`.
19. Datasets comunes contra IIT/GNW/HOT.
20. Controles negativos: complejidad alta sin rigidez.
21. Controles negativos: broadcast alto con ruptura de continuidad.
22. Controles negativos: integracion alta sin diferenciacion legible.
23. Congelar predicciones antes de datos.

### F. Publicabilidad

24. Model cards por teorema central.
25. Tabla de hipotesis por claim.
26. Tabla de falsadores por claim.
27. Capa de resultados humanos-curated.
28. Separacion BaseCore/downstream/runtime.
29. Abstracts sin claims externos.
30. Reporte final de readiness.

## 3.9 Fase 6 activa: subfases

### 6.1 Rival literature seed and matrix inventory

Estado: cerrado como inventario.

Hecho:

- IIT, GWT/GNW y HOT sembrados como rivales iniciales.
- PP, active inference, dynamical systems y functionalism diferidos.
- Gap HOT local bibliography marcado.
- Gap adversarial harness v2/v3 marcado.
- No `.tex` editado.

### 6.2 Claim-to-rival mapping

Estado: proxima fase.

Objetivo:

- Mapear cada claim QICN central contra IIT, GWT/GNW y HOT.
- Usar registry como superficie de claims.
- No escribir prose comparativa sin estado epistemico.
- Marcar cada comparacion como `NOT_YET_ADJUDICATED`.

Salida:

- Matriz claim-rival.
- Lista de claims que QICN no puede comparar aun.
- Bibliografia minima completada para HOT.
- No claims de superioridad.

### 6.3 Comparator protocol design

Objetivo:

- Convertir divergencias en predicciones separadoras.
- Definir resultado que favorece QICN.
- Definir resultado que favorece rival.
- Definir controles negativos.
- Definir preregistro.

### 6.4 Local harness gap audit

Objetivo:

- Resolver o aislar v2/v3.
- Clasificar `trace-memory-rival`.
- Separar toy/runtime analogues de rivales teoricos.
- No promover harness interno a evidencia externa.

### 6.5 Paper/report integration opcional

Objetivo:

- Integrar una version publicable de la matriz solo si 6.2-6.4 pasan.
- Elegir si va a `docs/reports` o a un paper appendix.
- Requerir auditoria externa antes de push.

## 3.10 Posicionamiento frente a rivales

### IIT

IIT ofrece una tesis fuerte sobre estructura causal integrada y medidas tipo Phi. QICN no debe competir diciendo que ya tiene "mejor conciencia"; debe competir en identidad persistente, continuidad, ruptura y estabilidad bajo perturbaciones tipadas.

Prediccion separadora:

- Sistemas con integracion causal similar segun IIT pero distinta rigidez inverse-limit deberian divergir para QICN.
- Sistemas con alta integracion pero sin separador/identidad admisible no deben contarse automaticamente como positivos QICN.

Resultado que favorece IIT:

- Phi o variables de integracion predicen observables externos mejor que invariantes QICN bajo controles preregistrados.

### GWT/GNW

GWT/GNW ofrece broadcast, acceso e ignicion como explicacion de conciencia de acceso. QICN puede distinguir broadcast funcional de persistencia de identidad, legibilidad, diferenciacion y ruptura operacional.

Prediccion separadora:

- Broadcast preservado con ruptura de identidad/continuidad deberia ser clasificado distinto por QICN.
- Si broadcast explica todos los casos y QICN no anade poder discriminativo, favorece GNW.

### HOT

HOT exige representacion de orden superior o metacognicion. QICN puede formular estructura de identidad y continuidad sin requerir metarrepresentacion explicita, lo cual es una diferencia real pero riesgosa.

Prediccion separadora:

- Sistema con invariantes QICN positivos sin metarrepresentacion explicita: QICN tenderia a incluir; HOT tenderia a excluir.
- Si ausencia de metarrepresentacion destruye sistematicamente marcadores externos aun con invariantes QICN, favorece HOT.

### Predictive processing

Estado: `LITERATURE_DEBT`.

No comparar hasta elegir version concreta del marco.

### Active inference

Estado: `LITERATURE_DEBT / REQUIRES_DOMAIN_EXPERT`.

Separar free-energy principle, active inference, agency y control.

### Dynamical systems

Estado: `LITERATURE_DEBT`.

Requiere narrowing a cuentas formales concretas.

### Functionalism

Estado: `LITERATURE_DEBT`.

Puede absorber criterios operacionales si QICN no demuestra separadores fuertes.

## 3.11 Comandos canonicos de verificacion

### 3.11.1 Desde la raiz `QICN-FRAMEWORK/`

```powershell
node scripts\verify-canonical-integrity.cjs
node scripts\verify-claim-registry.cjs
node scripts\verify-canonical-release.cjs
```

Uso:

- Release/canon gates.
- Claim registry root.
- Layer/interface public release checks.

Advertencia:

- Estos scripts no viven en `rigid-identity-framework/scripts/`.
- Si se citan, especificar `cwd = QICN-FRAMEWORK/`.

### 3.11.2 Desde `rigid-identity-framework/`

```powershell
npm run verify:v31
npm run test:trace-memory-rival
npm run test:negative-controls
npm run test:adversarial-negative-controls
npm run build:monolithic
npm run compile:monolithic
npm run audit:monolithic-build-quality
```

Lectura correcta:

- `test:trace-memory-rival`: higiene de rival interno.
- `test:negative-controls`: controles sinteticos internos; no external support.
- `test:adversarial-negative-controls`: actualmente bloqueado por v2/v3.
- `compile:monolithic`: sincroniza monolito; puede cambiar hashes.
- `verify:v31`: puede mantener bloqueos cientificos correctos.

### 3.11.3 Regla de reporte

Cada reporte debe incluir:

- comando exacto;
- cwd exacto;
- exit code;
- stdout/stderr relevante;
- si hubo elevacion por sandbox;
- si el resultado es PASS limpio, PASS con deuda o FAIL bloqueante;
- hash externo solo despues de estabilizar contenido.

## 3.12 Cronologia operativa consolidada

| Fase | Subfase | Nombre | Status | Fecha aprox. | Nota |
|---|---|---|---|---|---|
| 0 | - | Baseline | COMPLETA | 2026-06-04/05 | Sin theory edits |
| 1 | - | Redundancia/circularidad audit | COMPLETA | 2026-06-04/05 | Audit-only |
| 2 | 1 | Claim-boundaries iter 1 | COMPLETA | 2026-06-04 | Papers 4/5/Paper1 prose |
| 2 | 2 | Paper 6/Paper 1 appendix | COMPLETA | 2026-06-04 | Layout debt |
| 2 | 3 | Paper 7/Paper 10 openings | COMPLETA | 2026-06-05 | Monolithic sync later |
| 2 | 4 | Ownership audit Paper2/BaseCore | COMPLETA | 2026-06-05 | No `.tex` |
| 2 | 4B | Paper 2 normalization | COMPLETA | 2026-06-05 | Formal overlap debt |
| 2 | 5A | Paper 1/3 openings | COMPLETA | 2026-06-05 | Layout debt |
| 2 | 5B | Paper 8/9 openings | COMPLETA | 2026-06-05 | High-risk openings |
| 2 | cierre | Closure | COMPLETA | 2026-06-05 | Phase 3 debt tracked |
| 3 | 1 | Alias terminology | COMPLETA | 2026-06-05 | Paper 5/aliases |
| 3 | 2 | Paper 7 alias | COMPLETA | 2026-06-05 | Operational life/subjecthood |
| 4 | 1 | Paper 1 math hardening | COMPLETA | 2026-06-05 | Scope/layout debt |
| 4 | 2 | Paper 2 hardening | COMPLETA | 2026-06-05/06 | Scope/layout debt |
| 4 | 3 | Paper 5 import language | COMPLETA | 2026-06-06 | Scope/layout debt |
| 4 | 4 | Paper 8/9 semantic audit | COMPLETA | 2026-06-06 | Audit-only |
| 4 | 5 | Paper 8/9 one-shot hardening | COMPLETA | 2026-06-06 | External audit required |
| 5A | - | Audit/inventory | COMPLETA | 2026-06-04 | Repair pending then |
| 5B | - | PDF hygiene/transversal audit | COMPLETA | 2026-06-04 | Layout debt |
| 5D | - | Workspace classification | COMPLETA | 2026-06-04 | Noise/canon decisions |
| 5 | cierre | Final closure | COMPLETA | 2026-06-04 | Nonblocking debt |
| 6 | 1 | Rival inventory | COMPLETA | 2026-06-07/10 | Addendum cwd |
| 6 | 2 | Claim-to-rival mapping | PROXIMA | - | No superiority claims |
| 6 | 3 | Comparator protocol | PENDIENTE | - | Prereg/falsadores |
| 6 | 4 | Harness gap audit | PENDIENTE | - | v2/v3 |
| 6 | 5 | Paper/report integration | OPCIONAL | - | Solo tras audit |
| 7 | - | Publication readiness | PENDIENTE | - | Layout/model cards |
| 8 | - | Submission readiness | PENDIENTE | - | External review |

## 3.13 Glosario operacional de terminos sensibles

| Termino sensible | Lectura permitida | Lectura prohibida |
|---|---|---|
| consciousness | clase/criterio operacional bajo definicion | conciencia humana validada |
| subjectivity | indice operacional estructural | subjetividad fenomenal confirmada |
| phenomenology | regimen formal o bridge burden | experiencia probada |
| qualia | clase operacional o placeholder | qualia reales demostrados |
| bridge | hipotesis/coupling tipado | cierre fenomenal |
| identity | objeto en categoria/modelo | identidad ontologica universal |
| rigid | estable bajo perturbaciones admitidas | invariante absoluto |
| forced | consecuencia bajo hipotesis | necesidad metafisica |
| inevitable | conclusion model-relative | inevitabilidad en la realidad |
| no alternative | dentro de clase formal | no alternativa universal |
| mass | escalar de resistencia | sustancia ontologica |
| life | viability class | vida biologica |
| subject | subject-class | agente humano |
| runtime | implementacion/tooling | juez final de teoria |
| evidence | internal conformance | validacion externa |
| validation | solo si externa y reproducible | suite local |
| support | internal support label | confirmacion publica |
| falsation | protocolo de fallo | prueba final |
| simulator | clase definida | cualquier computacion |
| non-factorization | no factoriza bajo preservacion | no simulable en general |
| separator | objeto formal | conciencia atomica |
| benchmark | protocolo preregistrado | demo o dashboard |
| prediction | preregistrada y separadora | expectativa narrativa |
| external | independiente | otro script local |
| human-equivalence | no autorizada | similitud de interfaz |
| agency | control operacional definido | voluntad |
| self | indice o estado | yo metafisico |
| singularity | no usar salvo definicion | evento ontologico |
| hypercoherence | no usar sin escala | estado superior |
| ascension | no tecnico | mejora ontologica |
| anti-self | adversarial model | anti-yo metafisico |
| holographic | no usar sin matematica | memoria mistica |
| transcendence | eliminar | claim espiritual |
| emergent | especificar mecanismo | aparicion magica |
| proves | usar solo con prueba formal | validacion empirica |
| demonstrates | especificar dominio | prueba universal |
| confirms | solo con externa | suite interna |
| validates | solo externo | runtime interno |
| certified | solo con criterio definido | conciencia certificada |
| canonical | fuente actual declarada | verdad final |
| release | paquete publico | validacion cientifica |
| registry | inventario estructurado | prueba |
| ledger | trazabilidad | evidencia externa |
| monolithic | ensamblaje | fuente de verdad de papers |
| BaseCore | base formal | paper 0 |
| Paper IX | bridge burden | bridge closure |
| QICN-SYSTEM | runtime operacional | sujeto/consciente |

## 3.14 Referencias historicas no canonicas

Mantener como referencia:

- `docs/reports/QICN_GLOBAL_ROADMAP_v40.md`
- `docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md`
- reportes `QICN_ROADMAP_V3_*`
- reportes Phase 5A/5B/5D/final closure
- `MONOLITHIC_BUILD_REPORT.md`
- `MONOLITHIC_COMPILE_RISK_AUDIT.md`
- `docs/ai-platform-outputs/audits/AUDIT_EXTERNAL_2026-06-10.md`
- `docs/ai-platform-outputs/prompts/CODEX_CONSOLIDATE_ROADMAP_VIVO_PROMPT.md`
- `docs/ai-platform-outputs/prompts/CODEX_CONSOLIDATE_ROADMAP_VIVO_PROMPT.md` como prompt historico corregido, no como roadmap activo
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

No hacer:

- No borrar roadmaps historicos.
- No mover backups sin auditoria.
- No mezclar prompt files con roadmap canonico.
- No convertir output de IA en canon sin fase de revision.

## 3.15 Criterios de cierre para VERSION 3

VERSION 3 queda correctamente integrada si:

- `ROADMAP.md` mantiene VERSION 1 y VERSION 2 intactas.
- VERSION 3 aparece despues de VERSION 2.
- No se creo otro archivo de roadmap.
- No se tocaron `.tex`, PDFs, scripts, release, corpus, artifacts, registry, macros ni labels.
- El ledger se actualiza con trazabilidad.
- El trabajo queda sin commit ni push hasta auditoria externa.
- Los comandos de verificacion distinguen cwd root vs cwd inner.
- Fable 5 queda integrado como hardening matematico, no como claims nuevos.
- OpenCode/Kiro queda integrado como provenance/tooling/runtime debt, no como teoria nueva.

## 3.16 Proximo paso inmediato

Ejecutar Phase 6.2: claim-to-rival mapping contra `release/claim_registry.v1.json` y registry local, aplicando primero la tabla anti-inflacion de VERSION 3, sin escribir claims de superioridad, sin editar `.tex`, y dejando cada rival como `NOT_YET_ADJUDICATED` hasta que exista protocolo externo.

Checklist antes de Phase 6.2:

- Verificar estado git.
- Confirmar que VERSION 3 fue auditada externamente.
- Resolver si HOT se agrega a bibliografia local antes de comparar.
- Confirmar cwd de root gates.
- No iniciar harness repair en la misma subfase que claim mapping.
- No mezclar QICN-SYSTEM runtime debt con rival-theory mapping.

## 3.17 Estado final de VERSION 3

Status: `ROADMAP_VERSION_3_APPENDED_PENDING_EXTERNAL_AUDIT`.

No autoriza commit ni push.

No autoriza Phase 6.2 hasta que el usuario o auditor externo apruebe esta integracion.

6:04 p.m.

## 2026-11-08 — Reorganización conservadora y continuación matemática

La instrucción actual del usuario prioriza una copia de trabajo ordenada con
historial conservado antes de continuar el fortalecimiento matemático. Las
versiones históricas del roadmap permanecen intactas.

1. Preservar fuentes, cambios pendientes, antecedentes y Git; clasificar cada
   archivo en un único inventario de migración.
2. Verificar la copia vinculada `codex/qicn-framework-ordenado` sin alterar
   fuentes matemáticas ni publicaciones congeladas durante el traslado.
3. Sólo tras aceptar la reorganización, resolver E1/E2 con una realización no
   vacía y comprobar sus consecuencias; después conciliar régimen nulo,
   cocientes y las demás obligaciones por orden de dependencia.

La primera corrección local de BaseCore se conserva pendiente de revisión
matemática externa. Ninguna propuesta abierta se retira por estar sin prueba.
El inventario y la aceptación de esta fase se registran en
`docs/ai-platform-outputs/reports/REORGANIZACION_QICN_2026-11-08.md`.

Estado de reorganización: ACEPTADA, con alcance y evidencia en el informe citado. La copia vinculada es activa; la siguiente fase matemática no está cerrada por esta aceptación.

R2: E2 conservada y E1 reformulada con convergencia controlada por decisión explícita del usuario. Adopción local verificada en BaseCore/Paper II/monolito/registro; enlaces generales masa-transporte, régimen nulo y demás obligaciones permanecen abiertos. Véase el addendum R2 del documento de continuidad.

R3: cociente, ruptura y tipos de certificado corregidos localmente y verificados; normalización de márgenes y realizaciones conjuntas pendientes. R4 continúa con régimen nulo según prerregistro del ledger; sin cierre global.

R4: régimen nulo conciliado localmente entre BaseCore y Paper III, con tipos, mínimos finitos, intensidad, ruido y anexos corregidos bajo condiciones explícitas. Fuente/registro/monolito/PDF verificados. Permanecen realización CCR, estabilidad temporal, rigidez general, integración, métricas y adjudicación del programa completo; véase continuidad R4.


## Plan de fortalecimiento completo 2026-11-08

Objetivo: conservar todas las líneas del marco y convertir cada afirmación importante en un resultado con hipótesis visibles, un contraejemplo que delimite su alcance o una obligación abierta con una vía concreta de resolución. Las versiones anteriores de este roadmap permanecen como historial; este orden rige la continuación actual.

La primera prioridad es la **realizabilidad de los fundamentos**. Cerrar indicadores, narrativas o adjudicación sobre una clase cuya existencia y cuyos transportes siguen abiertos acumula trabajo sobre premisas sin demostrar. La meta es obtener conclusiones más amplias cuando la prueba lo permita y explicitar el límite exacto cuando un contraejemplo impida la generalización.

### P0 — Base reproducible y alcance de la evidencia

- Estado comprobado: copia autónoma en el Escritorio; gates raíz y release 6/6; R1–R4 repetibles; registro/monolito alineados; Lean 4.31.0 en WSL (19 archivos, 78 teoremas públicos auditados).
- Usar el inventario de continuidad y los informes de auditoría existentes para asociar cada afirmación con su fuente, hipótesis, prueba, control, formalización y obligaciones. No crear un segundo canon.
- Salida: cada resultado intervenido queda localizado por identificador y fuente exacta. Un archivo que compila no acredita una interpretación ni verifica un enunciado que no está formalizado.

### P1 — Dinámica, métrica, límites inversos y rigidez (BaseCore / Papers I–III)

- Cerrar BC-MET: declarar diámetros y pesos que hagan finita la métrica ponderada y controlar colas; probar compatibilidad del límite, completitud y condiciones de compacidad. Reproducir el contraejemplo con coordenadas no acotadas.
- Cerrar BC-RIG: construir transportes coherentes en ambos sentidos, precisar el coste de intervención y demostrar la cota de deformación en un modelo no vacío. La cercanía de Hausdorff no basta para obtener un isomorfismo.
- Completar BC-NS mediante una clase de observación y presupuesto declarados. Probar obstrucciones para esos presupuestos, con controles de codificación real de precisión no acotada. Verificar la realización E1/E2 completa, no sólo su no factorización, y conciliar el enlace masa/transporte y el sector de testigos de nulo.
- Probar los resultados dinámicos con hipótesis mínimas justificadas: contracción, puente, no colapso y realización. Mantener explícitos los casos en que estabilidad estructural, estabilidad temporal y separación métrica no coinciden.
- Salida: modelo constructivo no trivial, supuestos mínimos auditados, cotas y controles de frontera, y cobertura Lean de los pasos que sostienen los resultados. Si una hipótesis no tiene realización conocida, queda marcada como tal.

### P2 — Integración, soporte común y criterio operacional (BaseCore / Paper V)

- Definir el sector de factorizaciones, incluidos codificadores, decodificadores, observables, transportes y operaciones permitidas. Para D*, comprobar existencia de comparadores admisibles y dependencia de coordenadas/orientación; no extrapolar una cota del modelo alineado a toda factorización.
- Separar márgenes de legibilidad por dominio y unidad: distancia, ruido, error probabilístico, fidelidad y distorsión. Cuando se normalicen, fijar la escala antes de evaluar y justificar rangos y umbrales.
- Construir un soporte común con los seis testigos, o demostrar una incompatibilidad bajo hipótesis precisas. Para afirmar independencia, construir realizaciones para cada ruptura; los vectores booleanos sólo prueban la lógica de cuantificadores.
- Salida: soporte, mapas, dinámica y certificados explícitos; controles de cociente, no trivialidad, ablación, ruido y pérdida de testigos. No declarar pertenencia a Cop cuando sólo existe un separador condicionado.

#### P2 · Legibilidad y certificado conjunto

- **Demostrado en Paper V.** Los ensayos pareados con preparación y comando comunes cumplen L1–L6 en el dominio declarado. El decodificador de perfiles identifica ramas; el decodificador pareado identifica una respuesta bajo control. La obstrucción del *sham* repetido delimita las etiquetas de estado estables dentro de una rama.
- **Extensión abierta a múltiples brazos.** Definir la unidad experimental, las clases y su regla de composición, el dominio de ruido, la cobertura y los blancos. Especificar cuándo la ablación entre configuraciones de acoplamiento puede representarse como una intervención admisible sobre un mismo sistema. Para reclamar el sexto testigo, probar que el dominio extendido conserva las obligaciones del certificado conjunto y del cociente, y exhibir los seis testigos sobre el mismo sistema con hipótesis compatibles.
- **Trayectoria única.** Conservar como vía separada un estado o régimen persistente que pueda cambiar bajo un blanco interno y permanezca estable bajo controles negativos. En el modelo actual, después del primer paso `b1=0` y los pulsos posteriores no revelan `lambda`. Usar ese resultado como control de falta de persistencia. En una extensión, probar que la señal depende de la dinámica y que desaparece al ablacionar el mecanismo, incluso con el canal de lectura intacto.

### P3 — Predicciones, métricas, viabilidad y observadores (Papers IV, VI, VII y VIII)

- Para cada índice, fijar unidad, dominio, estimador, incertidumbre, criterio de decisión y condiciones de identificabilidad. Corregir rangos, signos y normalizaciones antes de usar productos o exponentes; el caso de propiedad/ownership se contrasta con su interpretación y control.
- Distinguir inviabilidad, frontera de un soporte invariante, estado no observado y fallo de medición. Definir la clase de observadores y las intervenciones con grafo causal o supuestos causales escritos.
- Diseñar controles de ruido, ablación, intervenciones simuladas y negativas; fijar comparadores con presupuesto comparable. Recuperar o documentar la procedencia de fuentes que sólo tengan un PDF de release correspondiente.
- Salida: predicciones que separen modelos y puedan fallar, con unidades de muestreo, semillas/replicación y criterios preregistrados. La actividad interna del runtime no cuenta como evidencia externa.

#### P3 · Orden de ejecución y pruebas

1. **Primera tarea — predicción diferencial (Papers IV y VI).** Derivar el control de ausencia de efecto posterior en el modelo actual con preparación y comandos iguales. Fijar un resultado posterior reservado para evaluación que quede fuera del decodificador y que no sea una transformación de su señal. Prerregistrar hipótesis causales, rival con la misma información y presupuesto, efecto mínimo, incertidumbre y criterio de fallo para cada modelo. Incluir controles de comando mal emparejado, ruido, ablación y preparación simulada. Si el modelo actual carece de una predicción diferencial sobre ese resultado, registrar el límite y declarar por separado la dinámica, los observables y los supuestos de cualquier extensión antes de probarla.
2. **Viabilidad y reparación (Paper VII).** Conservar los descriptores de vida y sujeto operacional. Separar soporte, núcleo compacto y región segura, y demostrar un margen positivo frente al conjunto inseguro bajo la dinámica y los controles declarados. Tipar el impulso, el estado posterior al choque, la magnitud del daño y el horizonte de retorno. Para atribuir reparación activa, comparar con un rival pasivo sometido al mismo daño y con presupuesto comparable. Conservar un caso de retorno pasivo como control. Si se requiere un cociente, usar igualdad de celdas certificadas y comprobar el efecto de ruido y abstención cerca de sus fronteras.
3. **Medición sin circularidad (Paper VIII).** Conservar las siete coordenadas. Calcular la selectividad sobre las cinco coordenadas primarias y evaluar el margen frente al rival fuera de muestra. Conservar valores firmados, datos insuficientes y puntuaciones calibradas como salidas distintas. Para *ownership*, justificar la referencia y verificar que el control penaliza coincidencias espurias según el contraste declarado. Probar que un renombrado transforma de forma coherente las mediciones y sus referencias; distinguirlo de cambiar roles causales. Demostrar dominio, rango y comportamiento en cero de las agregaciones antes de usarlas como compuerta.

### P4 — Puente, adjudicación y anexos (Papers IX–X / v26–v31)

- Escribir las hipótesis de enlace del puente y exhibir realizaciones conjuntas o contraejemplos. Marcar las lecturas ontológicas, filosóficas o fenomenales como interpretaciones o propuestas mientras no haya una definición operacional y una prueba específica.
- Corregir la adjudicación que permite empate sin pérdida: fijar elección forzada o pérdida y cobertura de abstención antes de medir. Probar su comportamiento frente a la regla de siempre empatar y a competidores equivalentes.
- Cerrar el caso de centro/diámetro mediante geometría suficiente o resultado escalar exacto; no invertir una cota Lipschitz superior para recuperar información latente sin coercividad. Resolver el codominio, cuantificadores y constantes de los anexos en su fuente correspondiente.
- En estadística, fijar estimando, unidad independiente, dependencia temporal, multiplicidad y potencia. Los ticks de dos semillas no son réplicas independientes. Registrar predicciones negativas y criterios de descarte antes de correr una campaña.
- Salida: decisión no trivial, resultados geométricos correctamente tipados y protocolo ejecutable con controles que detecten fuga, confusión y falsas confirmaciones.

#### P4 · Resultados que habilitan el puente y la adjudicación

1. **Autorreferencia (Paper puente).** Formalizar que una contracción global en un soporte métrico completo no vacío, con conmutación exacta, exige un punto fijo común a las intervenciones. Usar los controles de fase incompatibles del soporte actual como caso de obstrucción. Fijar de antemano la precisión del automodelo y el grado de contracción, y comprobar su compatibilidad con el diámetro del soporte. Construir y verificar por separado un candidato contractivo por fibras con defecto de conmutación acotado. Para el truncamiento con `m≥1`, localizar la discrepancia en el bit `m+1` y comprobar la cota candidata `2·3^{−(m+1)}` para el código ternario en la métrica declarada. La variante por fibras tendrá su propio enunciado y su propia prueba de no vacuidad.
2. **Transporte entre modos (Paper IX).** Mantener el margen frente al rival con signo y calibrar su uso en el funcional, con tratamiento explícito del empate, la derrota y la evidencia insuficiente. Para demostrar inclusión estricta, exhibir un sistema que satisfaga las condiciones de Paper VIII y falle en el transporte de testigos entre modos. Verificar por separado la existencia de un caso positivo de puente. Para una afirmación de no factorización, construir un par indistinguible para los datos upstream admitidos que sí difiera en el resultado de puente, o demostrar una obstrucción equivalente.
3. **Adjudicación ciega (Paper X).** Corregir el empate gratuito antes de cualquier recogida de datos. Usar elección forzada como referencia o declarar coste de abstención y cobertura mínima antes de medir. Demostrar la cota nula con balance y ausencia de información sobre la etiqueta bajo las condiciones declaradas, y justificar por separado el efecto de fugas. Si se usa un coste de abstención de al menos `1/2`, comprobar cuándo abstenerse empata con la elección forzada bajo pérdida binaria. Probar los controles de siempre empatar, etiquetas barajadas y fuga conocida. Fijar el criterio de decisión fuera de muestra y distinguir falta de detección, abstención y equivalencia estadística.

### P5 — Revisión, sincronización documental y contrastación externa

- En cada fase, sincronizar fuente vigente, registro, monolito y PDF después de corregir. Auditar conservación de contenido y propagación completa; resolver avisos de maquetación antes de la edición de publicación.
- Usar la bibliografía primaria para separar resultados clásicos, adaptaciones y posibles aportes nuevos. Las afirmaciones de novedad y superioridad requieren comparación explícita; si no hay evidencia suficiente, registrar `NOT_YET_ADJUDICATED`.
- Exigir revisión matemática independiente de los cambios, réplica de las pruebas, y datos/método independientes para cualquier afirmación empírica. Publicaciones congeladas sólo se cambian mediante una fase autorizada y auditada. La sincronización de la rama de trabajo no actualiza el canon de `main`.
- Salida: revisión externa aprobada para integración; resultados empíricos con controles y replicación cuando correspondan. Mantener el veredicto crudo real hasta que cambie la evidencia.

- Conservar cada propuesta con su fuente y estado. Si un contraejemplo invalida una formulación, mantenerla como antecedente y registrar el resultado corregido con sus hipótesis, el alcance abierto y la prueba que permitiría ampliarlo.
- Para cada afirmación prioritaria, distinguir la definición operacional, la demostración o el contramodelo, la evidencia sintética y la contrastación independiente. Exigir controles que puedan refutar la interpretación propuesta y registrar el veredicto crudo junto con `external_support_certified`.

### Regla de cierre de cada fase

1. Identificar el enunciado, su dominio, hipótesis y conclusión. Si el anterior falla, conservar el contraejemplo y la propuesta original como historial; describir explícitamente qué cambia.
2. Entregar prueba o construcción, y controles que distingan su hipótesis real de una tautología. Para una proposición empírica, preregistrar la predicción, comparadores, ruido, intervención y criterio de fallo.
3. Verificar Lean en las proposiciones formalizadas, suites de regresión, fuentes y compilación. Reportar lo que sigue sin mecanizar o no puede decidirse con los datos disponibles.
4. Registrar el cambio en el ledger y someterlo a revisión independiente antes de promoverlo a canon. No mezclar fases ni usar el runtime para acreditar una prueba matemática.

P1 cuenta con [BC-MET y BC-RIG verificados localmente](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/BC_MET_BC_RIG.md), [BC-NS, lectura E0–E2 y testigo de extensión](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/BC_NS_LECTURA_COMUN.md) y [una realización disipativa conjunta](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P1_DINAMICA_PROYECTIVA.md). En esa clase quedan demostrados la contracción por rama, la conjugación de equilibrios, el puente por truncación y H5. La mecanización analítica integral y la revisión independiente siguen pendientes. Para preparar P2, el siguiente problema matemático es definir comparadores y factorizaciones admisibles sobre este soporte y comprobar cuáles de sus testigos pueden realizarse conjuntamente.

P2 tiene una [comparación constructiva sobre el soporte de P1](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P2_COMPARADORES_Y_SOPORTE.md) y [seis controles de ruptura con alternativas calibradas](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P2_ALTERNATIVAS_Y_RUPTURAS.md). El [protocolo común](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P2_SOPORTE_Y_PROTOCOLO_COMUN.md) extiende la cota de integración a los cuatro canales de identidad, reúne cinco testigos y prueba la obstrucción para etiquetas de estado bajo controles que conservan la rama. La [prueba de legibilidad pareada y el repaso P0–P5](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P2_LEGIBILIDAD_PAREADA.md) verifican L1–L6 para pares reiniciados con preparación y comando común. El sexto testigo estructural, el certificado conjunto, la independencia, el fundamento externo de las alternativas y la revisión independiente siguen abiertos. La revisión local de P2 confirmó la coincidencia entre el enunciado, el registro, los PDF y los controles.

**P3 · Primer resultado local (Paper VI).** El [protocolo de memoria bajo sondeo](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P3_PREDICCION_MEMORIA.md) deriva el apagado original y verifica una predicción tardía fuera del ajuste frente a un rival con la misma información, una coordenada adicional y un parámetro ajustado. Ambos modelos retienen el pulso inicial; difieren en si una sonda tardía invierte el contraste. El siguiente paso de esta línea es contrastar el resultado con un canal de medición independiente y rivales capaces de producir interacciones. Continúan las obligaciones de Paper VII y VIII del orden vigente.

**P3 · Seguimiento local de Papers VI–VIII.** El [prerregistro y la verificación](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P3_OBSERVABLE_VIABILIDAD_MEDICION.md) fijan tres resultados. Paper VI lleva la memoria a la fase observada con el comando neutro y distingue un rival con interacción bajo condiciones de paridad y ruido. Paper VII separa núcleo y región segura, exige ganancia frente al retorno pasivo y certifica celdas con abstención. Paper VIII calcula selectividad sobre cinco primarias y conserva por separado la ventaja de *ownership*, la suficiencia y la puntuación. Quedan abiertas la contrastación independiente, la mecanización pendiente y las realizaciones completas de las clases aguas abajo. P4 conserva las obligaciones del puente y la adjudicación.

**P4 · Resultados locales.** El [prerregistro y la verificación](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P4_AUTORREFERENCIA_TRANSPORTE_ADJUDICACION.md) enlazan la obstrucción por punto fijo común, el truncamiento por fibras, los ciclos de transporte y la pérdida con abstención. La separación en Paper IX es estricta para extensiones de una ventana completamente certificada, condicionada a que exista esa ventana. El ejemplo finito verifica la coherencia entre modos y conserva abiertas la realización conjunta de Paper VIII y la no vacuidad de todos los predicados del puente. La adjudicación exige una cota nula ajustada a la hipótesis de fuga y cobertura mínima antes de cualquier campaña. La revisión y la evidencia independientes siguen pendientes.

**P4–P5 · Ventana, proyección y Lean.** El [prerregistro y los resultados](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P4_P5_VENTANA_GEOMETRIA_LEAN.md) realizan la ventana racional de siete medidas de Paper VIII y los dos ciclos sobre el mismo registro no vacío. La pertenencia íntegra a VIII y a IX conserva sus obligaciones heredadas. Paper IX incorpora la corrección de centros, radio escalar, coercividad y codominio compacto para el anexo v30 conservado. QICNLean integra los núcleos de punto fijo común, truncamiento, XOR y riesgo escalado. La reproducción de todo el agregado y la revisión independiente siguen pendientes.

**Torre común V–VII–VIII · Integración formal local.** Paper VII incorpora `prop:common-tower-phase-repair`. La banda invariante conserva las cotas de identidad e integración de V–VI y realiza la viabilidad, la persistencia y la reparación de fase. Paper VIII incorpora `thm:tower-native-lesion-obstruction` para comandos nativos con un decodificador discreto uniforme. Ambos resultados están en el registro y el monolito. La legibilidad de trayectoria única, los descriptores restantes de VII, la realización selectiva de VIII y la revisión independiente de P5 siguen abiertas. El [prerregistro y el cotejo](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/UNIFICACION_TORRE_V_VII_VIII.md) identifican las hipótesis, los controles y las huellas de los PDF.

### Balance de cierre interno P0–P5 · 2026-11-10

- **P0–P2.** El ciclo fijó una base reproducible y corrigió resultados de dinámica proyectiva, métrica, límites inversos, rigidez e integración desde BaseCore. Paper V documenta la identidad relativa al catálogo y la legibilidad de respuestas pareadas sobre soporte común. La legibilidad de trayectoria única y el certificado conjunto conservan sus obligaciones.
- **P3–P4.** La torre círculo-prefijo con memoria y realimentación conserva las cotas de V–VI y admite viabilidad, persistencia y reparación de fase en VII. El Paper Puente demuestra la obstrucción al automodelo global contractivo con conmutación exacta en ausencia de un punto fijo común. Paper VIII demuestra la obstrucción a las lesiones nativas con decodificación discreta uniforme. Paper IX registra el contraste de transporte local y la corrección geométrica de proyección. Paper X fija la cota nula de adjudicación con coste de abstención y supuestos explícitos de fuga.
- **P5.** El [paquete de reproducción](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/P5_REPRODUCCION_INDEPENDIENTE.md) fija el punto científico público en `2919fe8`. La reproducción en una pasada verificó 829 entradas de registro, 17 controles matemáticos, 7 lemas sin `sorry` en Lean 4.31.0, publicación 6/6 y un monolito de 372 páginas con 12 secciones cotejadas. Este balance cierra la intervención interna de consistencia y trazabilidad desde BaseCore hasta Paper X. La revisión matemática independiente, la mecanización del agregado, la pertenencia conjunta y la contrastación empírica siguen abiertas. v31 conserva `BLOCKED_FOUNDATION_FIRST_GATES` y `external_support_certified=false`.

### Extensión posterior a P5 · Torre con prefijo reescribible

La [planta común y su verificación](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/TORRE_PREFIJO_REESCRIBIBLE.md) incorporan cinco escrituras sobre la cinta original con un sondeo que convierte su estado en respuesta de fase. Se preservan las cotas de V–VI y la recuperación de VII. La legibilidad de trayectoria única se realiza para cuatro observaciones consecutivas en el protocolo declarado. VIII verifica cinco blancos selectivos, sham sin falsos positivos y un margen de reserva positivo contra rivales sin contexto. Se documentó el empate del rival que recibe el contexto y la salida de la etiqueta al abandonar la ventana de inspección. Los certificados de sujeto operacional y la clase débil irrestricta siguen como obligaciones separadas.

La verificación local añade cinco entradas al registro, que queda en 834, y un control de fracciones exactas, que eleva la suite a 18/18. El monolito de 376 páginas está sincronizado con las fuentes de V–VIII. v31 mantiene `BLOCKED_FOUNDATION_FIRST_GATES` y `external_support_certified=false`. La revisión matemática independiente está pendiente.


### Cierre interno de la unificación de la torre común · 2026-11-10

La auditoría del usuario confirmó el hito científico `c870191` y autorizó su publicación en `main`. La planta común preserva las cotas de V–VI y la reparación de VII, y realiza las cinco lesiones selectivas de VIII bajo el protocolo declarado. La evidencia de cierre comprende raíz 3/3, publicación 6/6, matemáticas 18/18, 834 registros y monolito de 376 páginas. v31 conserva `BLOCKED_FOUNDATION_FIRST_GATES` y `external_support_certified=false`. La revisión matemática independiente y la pertenencia a la clase completa de VIII siguen abiertas.


### Frente 2 posterior a la torre · Certificado V–VII

El [prerregistro y la verificación](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/FRENTE_2_TORRE_COMUN.md) prueban el horizonte exacto de una lesión bajo sham, cuatro contrastes de linaje sobre la planta existente y una matriz conjunta de los seis invariantes de V y cuatro descriptores de VII. El clon de estado completo y el rival con copia de memoria empatan. La garantía se limita a las preparaciones, canales y comparadores declarados. Verificación local raíz 3/3, release 6/6, matemáticas 20/20, registro 837, monolito de 378 páginas. v31 conserva `BLOCKED_FOUNDATION_FIRST_GATES` y `external_support_certified=false`. Pendientes revisión independiente y reserva de VIII con información y presupuestos equiparados.


### Frente 3 posterior a la torre · Reserva de retorno frente a rivales informados

La [reserva y su verificación](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/FRENTE_3_RESERVA_INFORMADA.md) prueban empate exacto de la clase pública bajo historial igualado y una condición necesaria y suficiente de separación con un canal privado accesible. Paper VI conserva el contraste de interacción y Paper VIII distingue el riesgo balanceado del minimax sobre el peor signo. Raíz 3/3, release 6/6, matemáticas 21/21, 840 registros y monolito de 381 páginas. v31 conserva `BLOCKED_FOUNDATION_FIRST_GATES` y `external_support_certified=false`. La revisión independiente queda pendiente.


### Frente 4 posterior a la torre · Automodelos y transporte

El [prerregistro y la verificación](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/FRENTE_4_PUENTE_TRANSPORTE.md) incorporan la cota exacta de desplazamiento, el piso global de fase, el transporte binario invariante bajo reetiquetado y tres ensayos racionales para D, A y T. Quedan abiertas V, W y E, así como la conjunción BPF. Raíz 3/3, release 6/6, matemáticas 22/22, registro 848 y monolito de 385 páginas. v31 conserva `BLOCKED_FOUNDATION_FIRST_GATES` y `external_support_certified=false`. La revisión independiente queda pendiente.


### Frente 5 posterior a la torre · Identificación, adjudicación y Lean · 2026-11-11

El [prerregistro y cierre](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/FRENTE_5_IDENTIFICACION_ADJUDICACION_LEAN.md) fijan la unidad independiente de campaña, prueban la inflación exacta por fuga, pseudorreplicación y selección de ventana, y derivan inferencia exacta conjunta de riesgo/cobertura con dos hipótesis de fuga separadas. Paper X incorpora la densidad estacionaria AR(1) y GLS, distinguiendo sus supuestos de la geometría de fibras. Se añadieron seis resultados a IV/X sin sustituir las fuentes anteriores.

El agregado Lean 4.31.0 queda reproducido con los siete lemas de P4 preservados y 26 lemas nuevos sobre separación compacta por escala, horizonte y colisión de la torre, decisión binaria finita y conmutación aproximada. El [mapa formal](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/FRENTE_5_LEAN_MAP.json) precisa los identificadores y el informe delimita lo que cada núcleo cubre. La reproducción del agregado resuelve esa deuda técnica registrada en los balances históricos; la formalización integral del manuscrito conserva su alcance pendiente.

Verificación local: raíz 3/3, release 6/6, matemáticas 24/24, registro 854, macros 383, doce capítulos cotejados y monolito de 388 páginas. El [recibo](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/FRENTE_5_VERIFICACION.json) contiene fuentes, objetos y auditoría de axiomas. v31 mantiene `BLOCKED_FOUNDATION_FIRST_GATES` y `external_support_certified=false`.

Queda cerrada la ejecución interna de los cinco frentes del plan post-torre. Continúan la revisión matemática independiente, los datos externos y la cota de fuga justificada en su población. La clase completa de VIII, las cargas V/W/E de IX y la conjunción BPF requieren sus obligaciones declaradas. La mecanización no sustituye esas realizaciones ni certifica conciencia o equivalencia humana.


### Extensión cuerpo–mundo posterior al Frente 5 · 2026-11-11

El Frente 5 quedó guardado localmente en `ceb7b91`. La [extensión proyectada y sus resultados](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/EXTENSION_CUERPO_MUNDO.md) añade cuatro coordenadas de fibra y conserva exactamente todas las trazas y certificados nativos con sus instrumentos y rivales originales. Paper IX prueba minimalidad lineal/C1 del puerto, una evaluación bidimensional no conservativa, un mundo indexado de rango cuatro y un retorno motor causal con controles de competencia preservada.

Las seis tareas locales D/V/W/A/E/T coexisten en una misma planta, con margen robusto mínimo `13/96` y matriz de respuesta a lesiones de rango seis. La conjunción se refiere a los dominios y rivales declarados: la prueba V es uniforme y analítica, no una inferencia universal desde muestras finitas. Un híbrido de dos canales escalares con estado compartido reproduce exactamente el candidato y deja margen amplio `0`; se registra esa obstrucción al cierre B9 en vez de promover el certificado local a pertenencia completa. Las clases de VIII/IX, los predicados de GateBridge y la contrastación independiente conservan sus obligaciones.

Verificación: raíz 3/3, release 6/6, matemáticas 25/25, registro 863, macros 383, capítulos 12/12 y monolito de 396 páginas. Las nuevas pruebas no están mecanizadas en Lean; las fuentes del agregado previo se preservan. El [recibo](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/EXTENSION_CUERPO_MUNDO_VERIFICACION.json) conserva controles, huellas y veredictos crudos: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES`, v31 `BLOCKED_FOUNDATION_FIRST_GATES`, `external_support_certified=false`.


### Separación no aditiva y Lean cuerpo–mundo · 2026-11-11

La extensión anterior quedó guardada localmente en `e6b1a38`. La [construcción bilineal y su verificación](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/EXTENSION_NO_ADITIVA.md) preserva el núcleo, cuatro coordenadas de fibra, cubo y contracciones, y mantiene intacta la obstrucción del modelo lineal. Una diferencia rectangular no nula caracteriza la salida de la clase aditiva por coordenadas. El margen óptimo limpio es `1/4096`; con el ruido preregistrado es al menos `15/65536`. Un rival con el término cruzado completo vuelve a empatar exactamente. No se declara derrota de toda comunicación o composición con estado compartido.

Se mantienen los seis patrones locales de lesión. El agregado Lean4.31.0 verifica 27 módulos y 186 teoremas públicos sin `sorryAx`; el [mapa](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/EXTENSION_NO_ADITIVA_LEAN_MAP.json) distingue kernels mecanizados de las obligaciones analíticas e interpretativas restantes. Raíz3/3, release6/6, matemáticas26/26, registro868, macros383, capítulos12/12 y monolito398páginas. v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES`, v31 `BLOCKED_FOUNDATION_FIRST_GATES`, `external_support_certified=false`. La revisión independiente y las clases completas VIII/IX siguen pendientes.


### Saneamiento fundacional de Papers I y V · 2026-11-11

La extensión no aditiva quedó guardada en `426ee6b`. El [prerregistro, reparaciones y límites](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/SANEAMIENTO_PAPER1_PAPER5.md) corrige no inyectividad canónica, conexión energética por canal, codificación fiel, colapso orbital y el ejemplo ramificado de I. La reconstrucción por prefijos queda separada de la atracción temporal. V deriva transporte de predicados/particiones desde datos primitivos y prueba una cota Lipschitz para radios de robustez calibrados; no asume conservación de márgenes, no equipara los radios a todos los certificados brutos ni acredita automáticamente su positividad. Se explicita la no transferencia sin rivales/sectores emparejados.

Raíz3/3, release6/6, matemáticas27/27, registro870 con868IDs preservados, macros383; Lean4.31.0 27módulos/186teoremas sin `sorryAx` reproducidos, sin atribuir nuevas mecanizaciones a las reparaciones I/V. PDF I27/V40/monolito399páginas, doce capítulos cotejados; fuentes constructivas, macros y76huellas congeladas preservadas. El [recibo](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/SANEAMIENTO_PAPER1_PAPER5_VERIFICACION.json) delimita las pruebas sintéticas y las obligaciones. v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, v27/v28/v30 `BLOCKED_MULTIPLE_GATES`, v31 `BLOCKED_FOUNDATION_FIRST_GATES`, `external_support_certified=false`.

Antes de anunciar cierre clásico completo: revisar la caracterización desde R0 (`prop:necessity` de I), atomicidad (`cor:indivisible`) e inyectividad canal→identidad (`prop:cardinality`). Siguen pendientes radios globales positivos/cálculo efectivo de V, revisión independiente, datos externos y clases completas VIII/IX. La orden expresa del usuario autoriza publicación Git de este alcance, sin convertirla en aprobación matemática externa.

Publicación comprobada en GitHub: extensión no aditiva `426ee6b` y saneamiento `1fd5938`; ambas ramas remotas `main` y `codex/qicn-framework-ordenado` verificadas en `1fd5938d79e36494526c02d92b77cf3341b0b6af`. El asiento documental posterior no modifica resultados, PDF ni verificadores.


### Unificacion de tipos y concordancia · bloque types · 2026-11-12

Base `fa904a1f947915bf58b96a5d06cc97b28867d9e3`; [prerregistro y ejecucion](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/UNIFICACION_2026-11-11.md). Bloque local verificado, conservacion de IDs y areas congeladas. El cierre global del plan y las disposiciones A01–A37/B01–B15 se documentaran al completar los bloques; no se declaran resueltas por un PASS. `external_support_certified=false`.


### Unificacion de tipos y concordancia · bloque math · 2026-11-12

Base `833a91dba5a73ec306ea2f94aa4b0fe6c9f29ed3`; [prerregistro y ejecucion](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/UNIFICACION_2026-11-11.md). Bloque local verificado, conservacion de IDs y areas congeladas. El cierre global del plan y las disposiciones A01–A37/B01–B15 se documentaran al completar los bloques; no se declaran resueltas por un PASS. `external_support_certified=false`.


### Unificacion de tipos y concordancia · bloque contracts · 2026-11-12

Base `abe544510fcd8a5a194c61f3ada85e741e34ed76`; [prerregistro y ejecucion](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/UNIFICACION_2026-11-11.md). Bloque local verificado, conservacion de IDs y areas congeladas. El cierre global del plan y las disposiciones A01–A37/B01–B15 se documentaran al completar los bloques; no se declaran resueltas por un PASS. `external_support_certified=false`.


## Disposición de las dos auditorías · A01–A37 y B01–B15

Las categorías distinguen corrección documental, resultado probado y obligación abierta. Ningún PASS convierte una obligación pendiente en cierre científico. Los enunciados nuevos están en su paper propietario; los IDs anteriores se preservan.

| ID | Estado | Resultado y obligación residual |
|---|---|---|
| A01 | corregida | Autor restaurado en UTF-8/acentos TeX; título y metadata se cotejan en el PDF V. |
| A02 | corregida | Sumabilidad como entrada de una cota con levantamiento/amplificación, no caracterización de resistencia infinita. |
| A03 | corregida | No exclusión por dimensión; fidelidad, sector y testigo explícitos. |
| A04 | corregida con prueba | Condición alpha>p+1 y control armónico en la proposición de decaimiento. |
| A05 | corregida | Unicidad de asignación en componente conectado, transporte sectorial y atomicidad diferenciados. |
| A06 | corregida con prueba | Aplicación sobre un conjunto de componentes realizados y cota de imagen; separación entre componentes no asumida. |
| A07 | certificado y obstrucciones formalizados | Cert_atom tipado y umbral M>K/delta en I; Cantor impide inferencia desde resistencia sola. Una cuña infinita de cubos de Hilbert tiene atomicidad exacta por punto de corte. Admisibilidad física y radios de aproximación generales siguen abiertos. |
| A08 | corregida | Reconstrucción por prefijos y atracción bajo contracción separadas en texto y lema. |
| A09 | corregida | Pérdida de radio no equivale a fallo del predicado; tablas y ruptura ajustadas. |
| A10 | corregida con prueba | Implicaciones de ruptura sin exclusividad falsa ni factorización exacta inferida de un ínfimo. |
| A11 | corregida con prueba | Prop. decoder-visible-separation aporta la condición suficiente de dos celdas. La existencia básica sólo concluye cociente definido y no vacío. |
| A12 | corregida | Equivalencia exacta da transporte de cociente; aproximación bajo radio calibrado sólo da pertenencia, salvo certificado adicional de celdas. |
| A13 | corregida | Remisión al teorema de ruptura por etiqueta. |
| A14 | corregida; obligación global pendiente | Contrato de operadores y radio calibrado en VI; soporte histórico no promovido. Positividad de radios globales requiere prueba por familia. |
| A15 | corregida | Exclusión conjunta de nulo sobre par testigo; no inferencia de inestabilidad temporal universal. |
| A16 | corregida | Contratos congelados por ciclo y construcciones posteriores distinguidos. |
| A17 | corregida | Predicado Booleano distinto de margen real temporal y puntuación normalizada. |
| A18 | aclarada y actualizada | No existía contradicción entre no observar empíricamente y construir valores racionales; contribuciones explícitas. |
| A19 | corregida | Referencia a prop:localrobust por etiqueta. |
| A20 | corregida | Corolario de cero irreducibilidad etiquetado y remisiones manuales sustituidas. |
| A21 | corregida | Suma de exponentes exigida igual a uno; control racional del caso no normalizado. |
| A22 | corregida | Se explicita cuándo el umbral escalar es redundante y qué exige una restricción adicional; no se declara vacía la clase. |
| A23 | corregida | Empate de ínfimos separado de un rival que alcanza el empate; pérdida y falta de evidencia no se confunden. |
| A24 | separación infinita demostrada en el dominio declarado | El testigo global de V cumple los seis predicados; VIII prueba valoración nula por intercambio causal y separación propia de las clases completas con sus datos de comparación/medición especificados. No se prueba que la clase fuerte sea no vacía ni se traslada el resultado a otras familias de comparación. |
| A25 | corregida | Resultados locales, obstrucciones y rival informado se enlazan en el encuadre actualizado; pertenencia completa sigue abierta. |
| A26 | corregida con prueba | Iota es garantía poblacional L4 con p_miss; garantía uniforme por intervención y distancia entre distribuciones son obligaciones separadas. |
| A27 | corregida | Cociente por igualdad de etiquetas/celdas, no por cercanía no transitiva. |
| A28 | corregida | Metadiscurso del prompt retirado del remark formal. |
| A29 | corregida | Tabla de dependencias del puente refleja conexión energética y transporte de clase de resistencia. |
| A30 | corregida | Realización de cuatro estados, ciclo, bilinealidad y margen local presentes; rival interactuante aún empata. |
| A31 | corregida; campaña pendiente | n=1 identificado como salida histórica sintética no certificada. Diseño de veinte bloques conserva sus hipótesis y no es mínimo universal. Parámetros poblacionales y campaña requieren evidencia nueva. |
| A32 | corregida y ensayada | Contrato de preámbulos esperados y personalizaciones explícitas. Build limpio/incremental idéntico; macro nueva y deriva de configuración bloquean el build. |
| A33 | corregida | Ausencia de resultados empíricos diferenciada de los teoremas analíticos de protocolo. |
| A34 | delimitación verificada | BaseCore no necesita listar cada parte en el resumen; se conserva su propiedad de resultados y se distinguen contratos downstream. |
| A35 | corregida | Problemas abiertos delimitados más allá de las familias explícitas; organización de III sin remisiones manuales obsoletas. |
| A36 | corregida | Negación de una conjunción no equivale a inexistencia de todo soporte; se identifica la cláusula que falla. |
| A37 | corregida | Corolario limitado a sustitutos de una coordenada; un escalar puede codificar toda la conjunción. |
| B01 | corregida con prueba y control | R0 sobre ley controlada; representación de prefijos con cierre y compacidad y propiedad universal del diagrama, sin necesidad falsa de ramificación desde R0. |
| B02 | corregida | Dominio del cociente es el espacio de historias observables. |
| B03 | contrato corregido; identificación pendiente | Sondas y reconstrucciones indexadas por intervención. Existencia/identificación de esos mapas requiere evidencia específica; no se afirma recuperarlos desde datos no identificantes. |
| B04 | corregida | Lectura, modelo experimental y componente de conexión energética tipados por separado. |
| B05 | corregida | Estimador alineado por transporte inverso, con roles/referencias; prueba de equivariancia queda relativa al estimador y familia declarados. |
| B06 | corregida con prueba y control | Inclusión de reglas sin pasado, capacidades igualadas y nulo de independencia condicional; control sin información histórica adicional. |
| B07 | obstrucción demostrada; extensión causal pendiente | Planta sin memoria separa familias por amplitud. Frontera endógena exige controles igualados, partición causal y variable organizacional; el margen bruto de la torre no demuestra por sí solo esa lectura. |
| B08 | no identificabilidad demostrada; evidencia causal pendiente | Retorno interno/externo indistinguible en la traza. Contrato de controlador, sensores, coste y ablación especificado; identificación física requiere ejecutar ese protocolo. |
| B09 | obstrucción y protección probadas | E2 tiene radio uniforme cero en la clase declarada; protección Lipschitz con familia G_e no vacía. No se transfieren radios entre topologías o a todos los predicados de V. |
| B10 | corregida | Dominio de puntuaciones no negativas y escala positiva impiden inversión de signo por denominador negativo. |
| B11 | corregida | Escalas positivas con unidades y transporte de umbrales; las realizaciones mantienen su calibración uno. |
| B12 | contrato corregido; extensión global pendiente | Certificado finito separado de pertenencia global; derivación desde ventanas crecientes requiere testigos compatibles y márgenes uniformes. |
| B13 | corregida | Replay nombrado reproducibilidad del procedimiento, sin atribuirle por sí solo identidad proyectiva. |
| B14 | corregida con prueba; comparadores amplios pendientes | Presupuesto e información congelados, convención de representación y monotonicidad bajo ampliación de rivales. No se afirma derrota de familias no identificadas. |
| B15 | corregida | C_proj distinto del límite inverso y del soporte; contracción por ramas no equivale a contracción global entre perfiles. |


### Unificación de tipos y concordancia · bloque editorial · 2026-11-12

Base `99df1de9850f8c24746e72c92d41f2515ef26017`; [prerregistro y ejecución](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/UNIFICACION_2026-11-11.md). Bloque local verificado, conservación de IDs y áreas congeladas. Las 52 disposiciones A01–A37/B01–B15 están registradas en la tabla anterior: las obligaciones científicas abiertas siguen abiertas. `external_support_certified=false`.


### Cierre documental del plan de unificación · 2026-11-12

Los cuatro bloques están implementados y verificados localmente en `a8a8270e5b43de05ac2be5da04c27a73f32d0dd5`. Las 52 disposiciones anteriores distinguen correcciones, obstrucciones y obligaciones abiertas. Raíz 3/3, release 6/6, matemáticas 28/28, 878 entradas y 383 macros; monolito 411 páginas y reconstrucción limpia/incremental concordante. Véase el [informe y límites](docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/UNIFICACION_2026-11-11.md#cierre-local-verificado--2026-11-12). Quedan la revisión independiente, la deuda de maquetación declarada y las obligaciones científicas enumeradas; no hay nueva certificación ni publicación remota. `external_support_certified=false`.


### Obligaciones epistemológicas A–C · 2026-11-12

Ambas ramas GitHub publicadas en 1f56dab por orden expresa. Se abre la [fase de teoría pura](docs/ai-platform-outputs/repair-plans/OBLIGACIONES_EPISTEMOLOGICAS_2026-11-12/EJECUCION.md): A, certificado tipado y obstrucciones independientes; B, realización infinita global de los seis predicados y valoración simétrica nula; C, contrato de falsación externo. A está implementado en aislamiento y pendiente de gates; B/C permanecen en desarrollo. No hay nueva validación externa ni acceso al runtime.


## Módulo A verificado · 2026-11-12

Certificado tipado con proyecciones dependientes del producto y realización de clamps, umbral M>K/delta, control del cuadrado a igualdad, obstrucción Cantor y testigo de cuña de cubos de Hilbert por punto de corte. La cota cuantitativa es relativa al sector; no se afirmó un radio general frente a aproximaciones. Se preservaron los 878 IDs y se añadieron cuatro entradas formales. BaseCore y Paper I reconstruidos; monolito 414 páginas, 12 capítulos cotejados; raíz 3/3, release 6/6, matemáticas 29/29, registro 882, macros 383. Los 76 archivos congelados permanecen intactos. [Recibo A](docs/ai-platform-outputs/repair-plans/OBLIGACIONES_EPISTEMOLOGICAS_2026-11-12/A_VERIFICACION.json). B/C siguen abiertos. Veredictos: v25/v26 INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY; v27/v28/v30 BLOCKED_MULTIPLE_GATES; v31 BLOCKED_FOUNDATION_FIRST_GATES; external_support_certified=false.

### Cierre formal de obligaciones A–C · 2026-11-12

A verificado en `478be2c`; B/C verificados con raíz 3/3, release 6/6, matemáticas 30/30, registro 889 y macros 383. Monolito 421 páginas; 878 IDs iniciales y 76 archivos congelados preservados. Se cerraron las tareas formales del [encargo de teoría pura](docs/ai-platform-outputs/repair-plans/OBLIGACIONES_EPISTEMOLOGICAS_2026-11-12/EJECUCION.md), con los dominios y obligaciones residuales expresos. La clase fuerte completa no se declara realizada. Los seis commits previos están publicados en 1f56dab; los nuevos bloques quedan locales para revisión independiente. No hay campaña biológica ni certificación externa. `external_support_certified=false`.


Commit de contenido B/C verificado: `0b1fbe99bea4bffb1adc9bdd29a4773c95648c83`. El asiento posterior solo registra esta referencia y las comprobaciones sobre la carpeta activa; no modifica fuentes, pruebas ni PDF. Publicación de los bloques nuevos pendiente de revisión independiente.


### Ajuste final de procedencia · 2026-11-12

Se corrigieron fechas de plantilla únicamente en las once entradas creadas y los dos eventos de modificación de esta fase. Fecha efectiva: 2026-11-12. No cambió ningún enunciado, prueba, ID, dependencia, etiqueta, estado o dato de curación; los eventos históricos anteriores quedaron intactos. Validador de corpus sin bloqueos y release 6/6 reproducidos después de la corrección. No se añadieron resultados ni se cambió ningún PDF. external_support_certified=false.


### Ruta 2 cerrada: tipografía y Lean A–C · 2026-11-12

Base `f792707`. Ajustes exclusivos de presentación en quince fuentes, doce PDF individuales y monolito (422 páginas), sin alterar el contenido matemático. Cero Overfull horizontales/verticales en los trece PDF. Preservados 889 IDs, 383 macros, 76 archivos congelados y 26 fuentes Lean previas; 211 localizaciones de línea actualizadas. Tres módulos nuevos, 29 teoremas nuevos; Lean 4.31.0: 30 módulos compilados con agregador y 215 teoremas públicos auditados, sin sorryAx ni axiomas no estándar.

Fuentes y recibos de compilación leídos; comandos: pdflatex/biber de las doce unidades, build:monolithic y compile:monolithic, verify:lean con kernel fresco/serial y caché fijada, raíz 3/3, verify:release 6/6, validate-corpus, validate-macros, verify-math-regressions 30/30, verify-prose-sync y check-monolith 12/12. Las comprobaciones que reescriben informes se aislaron en E:. [Informe y alcance](docs/ai-platform-outputs/repair-plans/TIPOGRAFIA_LEAN_2026-11-12/EJECUCION.md). Persisten los Underfull documentados y los límites analíticos/empíricos declarados.

Publicación autorizada a `origin/codex/qicn-framework-ordenado` y `origin/main`, sin force-push; la comprobación final exige igualdad de ambas referencias con HEAD y árbol limpio. Runtime completamente aislado. Ruta 3 reservada. Veredictos crudos: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`; v27/v28/v30 `BLOCKED_MULTIPLE_GATES`; v31 `BLOCKED_FOUNDATION_FIRST_GATES`; `external_support_certified=false`.


Se corrigió además la portabilidad del ensamblador: normaliza CRLF antes de transformar la composición. El comparador devuelve fallo ante discrepancias. Controles: versión anterior 11/12 con salida 0; versión corregida 12/12 en copia activa, LF y CRLF; capítulo alterado en memoria 11/12 con salida 1. Es una comprobación técnica exploratoria, no un nuevo experimento científico prerregistrado.

Commits de contenido: typography `6007af18e55a8bef136366386808600566b5005e`; lean `95ed4f5840bf3e12bd810a6eba8d0881163ca462`; portable_assembly `902a623ac23e8e751fb364f8e1d10610edf9153a`; monolith_pdf `88d56863878ec515745c4d3de0629e63abdab901`.


## Ruta 3 · realización nativa y cuña métrica · 2026-11-12

Base e669634; protocolo y [ejecución](docs/ai-platform-outputs/repair-plans/RUTA3_NO_VACUIDAD_ESTABILIDAD_2026-11-12/EJECUCION.md).

- [x] 3A: esquina cartesiana, brecha bi-Lipschitz y radio deltaW/2;
  contra-controles de degeneración/distorsión y sector energético condicional.
- [x] 3B: una planta infinita, seis invariantes globales, seis cláusulas de
  vida y cuatro descriptores; siete coordenadas, diez intervenciones y
  clase no vacía propia, relativa a W^(2,L,3). Control de emulador obligatorio.
- [x] Escalar no redundante, mu=0 como contramodelo completo, continuidad
  de ambos pasos y comparador pasivo genuino. Transporte XOR con certificado
  local completo; obstrucción de autorreferencia exacta preservada.
- [x] Conservación 889 IDs/383 macros/76 congelados/29 Lean previos;
  906 registros, 32 suites y 32 módulos/250 teoremas. Monolito 438 páginas,
  12/12 capítulos; cero Overfull en diez PDF. Evidencia cruda en el recibo.
- [ ] Revisión matemática independiente y revisión de la pertinencia de la
  gramática causal; publicación expresamente detenida antes del push.
- [ ] Calibración física/externa y paquete BPF completo de IX. No se afirma
  cierre frente a emuladores irrestrictos ni homeomorfismos sin cota métrica.

Pruebas TeX globales y kernels Lean se distinguen en el informe. Los veredictos
internos permanecen v25/v26 INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY,
v27/v28/v30 BLOCKED_MULTIPLE_GATES, v31 BLOCKED_FOUNDATION_FIRST_GATES;
external_support_certified=false. No se accedió al runtime.

Puntos locales de contenido de Ruta 3: 3A `fcce983`, 3B `40bc3ea`, formal `f7f7086`, propagation `383159a`. El asiento final de trazabilidad no cambia resultados. Sin push.


## Ruta 4 · edición preparada para revisión humana · 2026-11-13

Fase editorial iniciada el 12, base `5535a5c`; no modifica los resultados de
Ruta 3. Inventario de 38 TeX, dependencias textuales inspeccionadas antes de
editar y cinco papers intervenidos: III, IV, VI, IX y X. Se retiran carteles
de desarrollo y versiones en prosa, conservando los identificadores necesarios
para auditoría, las restricciones y todos los esquemas en los apéndices.

Guía de lectura incorporada al ensamblador: PDF 3 de un monolito de 440 páginas.
Mapa externo con 24 resultados, fuentes y páginas reales. Fuentes/PDF/registro
sincronizados: 906 IDs, 383 macros, 1.272 cuerpos formales y 7.302 fragmentos
matemáticos cotejados; 32 Lean y 122 huellas protegidas intactos. Raíz 3/3,
release 6/6, matemáticas 32/32, capítulos 12/12 LF/CRLF, corpus/macros/prosa y
seis compilaciones sin Overfull, referencias indefinidas o etiquetas duplicadas.

[Informe, inventario, mapa y recibos](docs/ai-platform-outputs/repair-plans/RUTA4_HIGIENE_EDITORIAL_2026-11-12/EJECUCION.md).
Se registran los Underfull/ajustes de floats y la indisponibilidad previa del
auditor adicional v24 por fixture ausente. La opción B autoriza publicar ambas
ramas por avance rápido tras los controles. No equivale a revisión humana.

Próximo paso: revisión humana de las pruebas infinitas, de la gramática causal
y su alcance comparativo; después, obligaciones de acoplamiento discreto,
calibración y experimentos independientes, en fases separadas. La clase BPF
completa sigue abierta. v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`;
v27/v28/v30 `BLOCKED_MULTIPLE_GATES`; v31 `BLOCKED_FOUNDATION_FIRST_GATES`;
`external_support_certified=false`. Sin acceso al runtime.


Publicación editorial verificada: `c90ef6b701ca7c009a42b59550d914f91d302f76` en ambas ramas
remotas, HEAD y main, con árbol limpio y huellas protegidas intactas. El cierre
de trazabilidad posterior registra este punto sin cambiar la teoría.
