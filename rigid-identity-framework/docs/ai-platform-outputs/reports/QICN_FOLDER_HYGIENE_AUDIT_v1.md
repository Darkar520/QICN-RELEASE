# QICN Folder Hygiene Audit v1

Fecha: 2026-06-03.
Alcance: `rigid-identity-framework`.
Modo: auditoria de higiene y preservacion. No se movio, borro ni renombro ningun archivo.

## 1. Criterio rector

El objetivo no es "limpiar" por reduccion mecanica. El objetivo es separar:

- canon teorico;
- fuente LaTeX recompilable;
- PDF compilado;
- snapshot historico;
- output de IA;
- artefacto de build;
- evidencia experimental o fixture;
- archivo legacy;
- candidato a recuperacion.

Una carpeta limpia no es una carpeta corta. Una carpeta limpia es una carpeta donde cada archivo tiene funcion, procedencia y relacion verificable con el marco teorico.

## 2. Regla nueva creada

Se creo:

`rigid-identity-framework/INSTRUCCIONES.md`

La regla formaliza:

- todo reporte, prompt, resumen, analisis o plan generado por IA debe guardarse en `docs/ai-platform-outputs/`;
- los papers deben iterarse sobre el mismo LaTeX que genera el PDF vigente;
- no se deben regenerar PDFs completamente distintos para explicar lo mismo;
- si hay PDF sin fuente sincronica, el estado correcto es `SOURCE_RECOVERY_REQUIRED`;
- no se debe borrar nada sin hashes, inventario y aprobacion explicita.

## 3. Inventario por carpeta

| Carpeta | Archivos | PDF | TeX | MD | JSON | Clasificacion |
|---|---:|---:|---:|---:|---:|---|
| `artifacts` | 0 | 0 | 0 | 0 | 0 | Artefactos experimentales; ahora casi vacio |
| `basecore` | 29 | 1 | 12 | 15 | 0 | Canon/base + metadocumentacion interna |
| `canonical_core_legacy` | 6 | 1 | 1 | 1 | 0 | Legacy preservable |
| `docs` | 246 | 4 | 6 | 148 | 77 | Documentacion, reportes, teoria, prompts |
| `monolithic` | 27 | 2 | 15 | 0 | 0 | Ensamblaje + discrepancia de PDFs + build artifacts |
| `paper1` | 10 | 1 | 1 | 0 | 0 | Paper con fuente y PDF, pero con auxiliares de build |
| `paper2` | 10 | 1 | 1 | 0 | 0 | Paper con fuente y PDF, requiere verificacion contra version extensa esperada |
| `paper3` | 11 | 2 | 1 | 0 | 0 | Bifurcacion critica: dos PDFs para el mismo paper |
| `paper4` | 2 | 1 | 1 | 0 | 0 | Paper limpio, fuente y PDF |
| `paper5_operational_consciousness` | 2 | 1 | 1 | 0 | 0 | Paper limpio, fuente y PDF |
| `paper6_predictions_falsation` | 2 | 1 | 1 | 0 | 0 | Paper limpio, fuente y PDF |
| `paper7_operational_life_subjecthood` | 2 | 1 | 1 | 0 | 0 | Paper limpio, fuente y PDF |
| `paper8_first_person_subjectivity` | 2 | 1 | 1 | 0 | 0 | Paper limpio, fuente y PDF |
| `paper9_phenomenal_bridge_organization` | 4 | 1 | 1 | 0 | 0 | Paper con bibliografia local adicional |
| `paper10_external_adjudication` | 2 | 1 | 1 | 0 | 0 | Paper limpio, fuente y PDF |
| `registry` | 6 | 0 | 0 | 0 | 4 | Registro canonico, no ruido |
| `release` | 1 | 0 | 0 | 0 | 0 | Bibliografia de release |
| `scripts` | 75 | 0 | 0 | 1 | 0 | Herramientas; no usar para reportes narrativos |

Nota: `artifacts` contiene la subcarpeta `pred-ext-01`, pero no archivos detectados en esta pasada.

## 4. Evidencia PDF y discrepancias

Las paginas se estimaron por lectura local de objetos `/Type /Page` dentro de los PDFs. `pdfinfo` no pudo usarse sin escalacion porque MiKTeX intento terminar configuracion escribiendo en `AppData`.

| Ruta | Paginas estimadas | Bytes | SHA256 |
|---|---:|---:|---|
| `monolithic/QICN_MONOLITHIC.pdf` | 329 | 2594106 | `1F056F61B101766998968DA347606E9EB5D806F7FBFF69F00ACA3F0300483AFB` |
| `monolithic/QICN_MONOLITHIC_v26.pdf` | no estimado | 1842540 | `8B3BE374F8D32F0D5BF724D4C240E7E65C4C93B68521F361FE33635E451CED6F` |
| `paper1/main.pdf` | 26 | 464438 | `312023656AB79965B63182DA60EB17A0F05E8E784AD12119ADF39DA6E1DF5620` |
| `paper2/main.pdf` | 17 | 380904 | `8C697985B3F5131C322F58E9243C43BD50B2BB7C9A5ABFAC1E6718D4595A52F3` |
| `paper3/main-3.pdf` | 28 | 404105 | `4B375C90853F5074B2396FB87E0FB3E63C8BE5CF735D95E6EDA9ED2B8276EA8B` |
| `paper3/main.pdf` | 14 | 401773 | `D854953CD1066121DB4398201AC855F0B987A5B5E21281D0353C111FEB2684C0` |
| `paper4/main.pdf` | 14 | 347955 | `97A724DF0AB8AFA7F4CF0400AD3BB005152CD427753C0AAC59CD86B9807E18A2` |
| `paper5_operational_consciousness/main.pdf` | 25 | 469650 | `97769050EB1F180804E9F202EC9A4E6F9A8FECDEED4CBD5F319A89C7EE015076` |
| `paper6_predictions_falsation/main.pdf` | 19 | 414149 | `20CF3C1EB76B85926E3D333B98558F7D0C751D8ACA5050C9120A499FFE728EFD` |
| `paper7_operational_life_subjecthood/main.pdf` | 28 | 401115 | `B4FAD95E7A43611556BA89ADA8AD31E6D4258412AAA8CC8DA6B7CE9C5D8B706F` |
| `paper8_first_person_subjectivity/main.pdf` | 42 | 542401 | `754E421C96CB30F40FC74F07FFBBFC265B98F71F27A07A40026F094A5141835F` |
| `paper9_phenomenal_bridge_organization/main.pdf` | 42 | 520468 | `EFC3A8FFB6620AF5FFD7BBD13BECDC3EB2848A2B49F1DBB3B8028D25FC9713E6` |
| `paper10_external_adjudication/main.pdf` | 30 | 403045 | `3E0EA9EACFB1F6F2E42A1BE62708F6426C2929DA87C8337753B6DD397DCA119C` |
| `basecore/BASECORE.pdf` | 40 | 638613 | `4E3AE62300371F63A3D1C292CBC247946F6F68528A55224A92764DCEA91700A2` |
| `canonical_core_legacy/CANONICAL_CORE.pdf` | 64 | 829165 | `8DAA7BC939086CB429CB566BF70F4515BC773151B5246D672E4A42D7C5544FFB` |

## 5. Hallazgos principales

### H1 - `paper3` tiene bifurcacion critica

`paper3/main-3.pdf` tiene 28 paginas estimadas y fecha 2026-05-29. `paper3/main.pdf` tiene 14 paginas estimadas y fecha 2026-05-31. Esto confirma una bifurcacion de contenido: dos PDFs parecen intentar representar el mismo paper, pero no contienen la misma extension.

Decision recomendada:

- declarar `paper3/main-3.pdf` como candidato base de preservacion, por preferencia explicita del usuario y por mayor extension;
- declarar `paper3/main.pdf` como variante reciente corta;
- no borrar ninguno;
- crear una fase de recuperacion `paper3_SOURCE_RECOVERY_REQUIRED` para reconstruir o alinear `main.tex` con la version extensa.

### H2 - `monolithic` contiene dos PDFs activos

`monolithic/QICN_MONOLITHIC.pdf` y `monolithic/QICN_MONOLITHIC_v26.pdf` conviven en la misma carpeta. El primero parece el candidato activo por fecha, nombre y mayor tamano. El segundo debe tratarse como snapshot versionado, no como canon paralelo.

Decision recomendada:

- mantener `QICN_MONOLITHIC.pdf` como candidato canonico activo;
- marcar `QICN_MONOLITHIC_v26.pdf` como snapshot historico;
- crear un manifiesto de monolito con version, hash, fecha, fuente y estado.

### H3 - Archivos auxiliares de compilacion ensucian carpetas de papers

`paper1`, `paper2`, `paper3` y `monolithic` contienen auxiliares como `.aux`, `.bbl`, `.bcf`, `.blg`, `.log`, `.out`, `.run.xml` y `.toc`.

Esto no es ruido teorico, pero si ruido estructural. Puede dificultar distinguir fuente canonica, PDF y basura de build.

Decision recomendada:

- no borrar todavia;
- definir una politica de build artifacts;
- en una fase posterior, mover o regenerar auxiliares dentro de una carpeta de build, si el proceso de compilacion lo permite.

### H4 - `docs/reports` ya concentra muchos outputs narrativos

`docs/reports` contiene reportes, auditorias, prompts historicos y JSONs de evidencia. No se recomienda moverlos masivamente ahora porque pueden ser referencias de fases previas.

Decision recomendada:

- mantener historial existente;
- para todo output futuro de IA, usar `docs/ai-platform-outputs/`;
- solo migrar reportes historicos despues de crear un manifiesto de redireccion.

### H5 - `basecore` mezcla canon con metadocumentacion interna

`basecore` contiene `BASECORE.tex`, `BASECORE.pdf`, secciones LaTeX y multiples documentos de `core_meta`. Esto no es necesariamente ruido: parece una arquitectura deliberada de fuente + auditoria interna.

Decision recomendada:

- preservar;
- no mover `core_meta` sin revisar referencias;
- si se limpia visualmente, hacerlo mediante README/manifiesto, no por borrado.

### H6 - `canonical_core_legacy` esta correctamente marcado como legado

Contiene `CANONICAL_CORE.tex`, `CANONICAL_CORE.pdf`, README y snapshots. La carpeta ya comunica que no es canon activo.

Decision recomendada:

- preservar como archivo historico;
- no mezclar con `basecore`;
- no usar para editar canon activo salvo recuperacion documentada.

### H7 - `paper4` a `paper10` tienen fuente y PDF, pero necesitan proteccion procedimental

Cada una de estas carpetas tiene al menos `main.tex` y `main.pdf`. El riesgo no es ausencia inmediata de fuente, sino que futuras ediciones regeneren PDFs desde otro contenido.

Decision recomendada:

- declarar sus `main.tex` como fuentes operativas actuales;
- antes de editar, calcular hash pre-edicion de `.tex` y `.pdf`;
- cualquier ampliacion debe ser aditiva o tener diff formal de eliminaciones.

## 6. Tamano de fuentes LaTeX

| Carpeta | Bytes `.tex` | Lineas `.tex` |
|---|---:|---:|
| `paper1` | 84883 | 1184 |
| `paper2` | 52954 | 801 |
| `paper3` | 42163 | 650 |
| `paper4` | 30433 | 532 |
| `paper5_operational_consciousness` | 96939 | 1202 |
| `paper6_predictions_falsation` | 50765 | 473 |
| `paper7_operational_life_subjecthood` | 82184 | 970 |
| `paper8_first_person_subjectivity` | 133563 | 1288 |
| `paper9_phenomenal_bridge_organization` | 125173 | 1267 |
| `paper10_external_adjudication` | 67822 | 1246 |

La longitud no prueba calidad, pero si permite detectar riesgos de perdida cuando una version PDF extensa queda emparejada con fuente corta o no sincronica.

## 7. Clasificacion de limpieza propuesta

### Canon o candidato canonico

- `basecore/BASECORE.tex`
- `basecore/BASECORE.pdf`
- `paper*/main.tex`
- `paper*/main.pdf`, salvo `paper3/main.pdf`, que debe revisarse contra `paper3/main-3.pdf`
- `monolithic/QICN_MONOLITHIC.tex`
- `monolithic/QICN_MONOLITHIC.pdf`
- `registry/*.json`, `registry/*.jsonl`

### Variante o snapshot

- `paper3/main-3.pdf`: candidato base de preservacion para Paper 3, pendiente de fuente sincronica.
- `paper3/main.pdf`: variante reciente corta, no debe borrar la version extensa.
- `monolithic/QICN_MONOLITHIC_v26.pdf`: snapshot historico.
- `canonical_core_legacy/*`: legacy preservable.

### Build artifact

- `*.aux`
- `*.bbl`
- `*.bcf`
- `*.blg`
- `*.log`
- `*.out`
- `*.run.xml`
- `*.toc`

### Output de IA o reporte narrativo

- Nuevos outputs: `docs/ai-platform-outputs/`.
- Historicos existentes: mantener temporalmente en `docs/reports` y `docs/prompts` hasta una migracion con manifiesto.

## 8. Riesgos epistemicos detectados

1. La regeneracion corta de un paper puede producir falsa continuidad documental.
2. Un PDF compilado sin fuente sincronica no debe tratarse como reproducible.
3. Un monolito puede ocultar perdida de informacion si reemplaza papers individuales.
4. Una carpeta con multiples PDFs del mismo paper puede crear ambiguedad de canon.
5. Un reporte de IA colocado junto a fuente teorica puede confundirse con canon.

## 9. Recomendacion de siguiente fase

Fase segura recomendada:

1. crear manifiesto `docs/ai-platform-outputs/reports/QICN_PAPER_CANON_MANIFEST_v1.md`;
2. declarar por paper: PDF canonico, fuente canonica, hash PDF, hash TeX, paginas, estado de sincronizacion;
3. abrir `paper3` como primer caso de recuperacion;
4. comparar `paper3/main-3.pdf` contra `paper3/main.tex`;
5. decidir si se reconstruye `main.tex` desde la version extensa o si se conserva `main-3.pdf` como snapshot externo;
6. despues repetir para `paper2` si se confirma que existe una version previa mas extensa fuera de la carpeta actual.

No se recomienda borrar archivos en esta fase.

