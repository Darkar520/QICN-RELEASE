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

6:04 p.m.
