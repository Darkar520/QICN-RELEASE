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
