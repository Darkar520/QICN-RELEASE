# INSTRUCCIONES OPERATIVAS DEL MARCO QICN

Estado: regla local activa para `rigid-identity-framework`.
Fecha de formalizacion: 2026-06-03.

## 1. Salidas generadas por plataformas de IA

Todo documento generado por Codex, OpenCode, Claude, ChatGPT, Gemini u otra plataforma de inteligencia artificial debe guardarse bajo:

`docs/ai-platform-outputs/`

Esta regla aplica a:

- reportes;
- auditorias;
- analisis;
- resumenes;
- prompts;
- planes de reparacion;
- bitacoras narrativas;
- diagnosticos no canonicos.

Estructura recomendada:

- `docs/ai-platform-outputs/reports/`
- `docs/ai-platform-outputs/analysis/`
- `docs/ai-platform-outputs/prompts/`
- `docs/ai-platform-outputs/summaries/`
- `docs/ai-platform-outputs/repair-plans/`

Los outputs de IA no deben guardarse dentro de carpetas de papers, `basecore`, `monolithic`, `registry`, `release` o `scripts`, salvo que el archivo sea codigo, fixture, manifiesto o insumo tecnico intencional y este documentado como tal.

## 1.1. Trazabilidad obligatoria de implementaciones

Toda implementacion, modificacion editorial, reorganizacion documental, recompilacion, auditoria con efectos sobre el marco teorico, o cambio de roadmap debe quedar registrada en el ledger unico:

`docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

Esta regla aplica a Codex, OpenCode, Claude, ChatGPT, Gemini u otra plataforma de inteligencia artificial que modifique, audite o reorganice el marco.

Cada entrada del ledger debe registrar, como minimo:

- fecha;
- plataforma o agente, si se conoce;
- mensaje o solicitud del usuario resumida;
- objetivo operacional;
- archivos leidos;
- archivos modificados, creados, movidos o eliminados;
- herramientas utilizadas;
- comandos ejecutados y resultado observado;
- hashes, paginas o verificaciones cuando apliquen;
- razon de cada modificacion;
- regresiones buscadas;
- regresiones encontradas;
- riesgos residuales;
- siguiente bloqueo o siguiente paso recomendado.

La respuesta en la plataforma tambien debe incluir una trazabilidad clara de lo ejecutado cuando la tarea haya modificado el marco teorico: que se hizo, para que se hizo, que comandos o herramientas se usaron, que archivos cambiaron, que verificaciones pasaron o fallaron, y que riesgos quedan.

Cuando una tarea o fase sea demasiado amplia, debe dividirse en subfases ordenadas antes de ejecutarla. La division concreta debe documentarse en el archivo de roadmap, plan o reporte de fase correspondiente, no como regla fija ligada a una fase particular dentro de este archivo. La regla general es: primero auditoria/inventario, despues implementacion o reparacion, y finalmente verificacion/reporting, salvo que el roadmap especifico justifique otro orden.

## 1.2. Protocolo obligatorio por fases

Toda modificacion sustantiva del marco teorico, corpus LaTeX/PDF, scripts de verificacion, reportes canonicos, ledgers, fixtures o estructura documental debe ejecutarse por fases delimitadas.

Cada fase debe tener, como minimo:

- objetivo operacional explicito;
- alcance de archivos incluido y excluido;
- auditoria o inventario previo;
- implementacion o decision documentada;
- verificacion posterior con comandos, herramientas o inspeccion reproducible;
- reporte o entrada de ledger con evidencia suficiente;
- clasificacion de regresiones buscadas y regresiones encontradas;
- riesgos residuales y siguiente paso recomendado.

No se debe hacer commit ni push de una fase hasta que se cumplan todas estas condiciones:

- la fase esta cerrada por objetivo, no por conveniencia;
- los archivos modificados pertenecen al alcance declarado de la fase;
- no hay eliminaciones, movimientos o sustituciones destructivas sin aprobacion explicita;
- las verificaciones relevantes pasaron o, si queda deuda, esta marcada como deuda rastreada y no bloqueante;
- el ledger unico fue actualizado;
- el reporte de fase, cuando aplique, fue generado o actualizado;
- el estado de `git status` fue revisado para evitar mezclar cambios ajenos, ruido, backups o artefactos no clasificados.

Despues de una fase verificada y cerrada, el flujo normal debe ser:

1. preparar un commit que incluya solo los archivos de esa fase;
2. revisar el diff staged antes de confirmar;
3. crear un commit con mensaje descriptivo de la fase;
4. hacer push del commit;
5. registrar en el ledger el hash del commit o, si el push falla, el motivo exacto del bloqueo.

Queda prohibido usar `git add -A`, commits amplios, commits de arrastre o pushes globales cuando el workspace contenga archivos no clasificados, backups, variantes historicas, outputs de IA fuera de ruta o eliminaciones pendientes de decision.

## 2. Regla de preservacion de papers

Cada paper debe tener una carpeta propia con, como minimo:

- el codigo LaTeX canonico;
- el PDF compilado correspondiente;
- las bibliografias, imagenes, macros o archivos auxiliares necesarios para recompilar;
- una nota de procedencia si el PDF y el `.tex` no son demostrablemente sincronicos.

La edicion normal de un paper debe hacerse sobre el mismo codigo LaTeX que genera el PDF vigente. La regla base es iterar, no regenerar desde cero.

Queda prohibido reemplazar un paper extenso por una version corta, parcial o reescrita desde cero sin una auditoria explicita de perdida de informacion, redundancia, circularidad, fuente utilizada y justificacion cientifica.

La meta editorial de los papers no es brevedad. Los papers deben ser extensos cuando la materia lo exige, pero "extenso" significa profundo, directo, claro, profesional, bien estructurado y con contenido genuinamente informativo. No significa redundante, circular, repetitivo ni inflado.

Antes de recortar contenido de un paper se debe demostrar al menos una de estas condiciones:

- el contenido es formalmente incorrecto;
- el contenido esta duplicado sin aportar una distincion nueva;
- el contenido es circular;
- el contenido pertenece a otro nivel separado, por ejemplo ontologia, modelo matematico, implementacion, lenguaje o interpretacion;
- el contenido es especulativo y no esta marcado como tal;
- el contenido contradice fisica, matematica o evidencia disponible sin justificacion explicita.

Antes de agregar contenido, se debe verificar que aporta al menos una de estas funciones:

- nueva definicion operacional;
- lema, proposicion, teorema, prueba, contraejemplo o condicion de borde;
- protocolo experimental, prediccion falsable o control negativo;
- aclaracion de supuestos;
- separacion de niveles;
- reduccion de ambiguedad terminologica;
- mejora de trazabilidad fuente-PDF;
- resolucion de una bifurcacion documental.

Regla de estilo interna: los papers no deben contener autodefensas editoriales del tipo "este paper no es circular" o explicaciones explicitas de que no invaden papers anteriores o posteriores. El autor/agente debe evitar la circularidad y evitar invadir otros papers en la practica, pero no convertir esa disciplina en metadiscurso dentro del paper. Cuando sea necesario delimitar una afirmacion, debe hacerse mediante definiciones, hipotesis, condiciones, teoremas, contraejemplos o no-claims tecnicos, no mediante una explicacion de organizacion editorial.

Si un PDF existe pero su fuente LaTeX esta ausente, incompleta o no corresponde al PDF, el estado correcto no es "paper regenerado". El estado correcto es:

`SOURCE_RECOVERY_REQUIRED`

En ese caso se debe recuperar o reconstruir el LaTeX desde el PDF existente, marcarlo como reconstruccion, y no presentar el resultado como fuente historica original.

## 3. Regla contra bifurcaciones silenciosas

Si una carpeta contiene mas de un PDF que intenta representar el mismo paper, se debe:

1. calcular hashes y paginas;
2. comparar fecha, longitud, contenido y fuente disponible;
3. declarar un candidato canonico;
4. declarar los demas como variantes, snapshots o archivos por revisar;
5. no borrar nada sin aprobacion explicita.

Cuando haya conflicto entre una version antigua extensa y una version reciente corta, la version extensa debe conservarse como base de recuperacion, salvo que una auditoria demuestre que contiene redundancia, error formal o contenido obsoleto que deba retirarse.

## 4. Regla para monolithic

`monolithic` debe tener un unico PDF canonico activo y una ruta LaTeX reproducible. Los PDFs historicos o alternativos deben mantenerse solo como snapshots identificados por version, hash y fecha.

El monolito no debe usarse para sobrescribir el contenido fuente de los papers individuales. Su funcion es ensamblar, no sustituir el canon local de cada paper.

## 5. Separacion de tipos de archivo

Las carpetas de teoria deben contener teoria, fuentes LaTeX y dependencias necesarias. Los archivos auxiliares de compilacion (`.aux`, `.bbl`, `.bcf`, `.blg`, `.log`, `.out`, `.run.xml`, `.toc`) son artefactos de build. Pueden conservarse temporalmente para reproducibilidad inmediata, pero deben tratarse como ruido estructural si impiden ver el canon.

Los reportes, prompts y analisis narrativos pertenecen a `docs/ai-platform-outputs/` o, si ya son documentos canonicos del proyecto, a una subcarpeta explicita de `docs/`.

## 6. Regla cientifica

Ningun cambio de organizacion puede inflar afirmaciones teoricas. Toda afirmacion sobre conciencia, identidad, subjetividad, vida operacional o puente fenomenal requiere:

- definicion operacional;
- metrica o criterio verificable;
- prediccion nueva;
- controles negativos;
- experimento reproducible;
- separacion entre ontologia, modelo matematico, implementacion, lenguaje e interpretacion.

Las afirmaciones metaforicas, filosoficas, especulativas, no falsables o no formalizadas deben marcarse como tales y no deben entrar como resultados.

## 6.1. Regla de frontera LLM-runtime

Cuando un LLM opere dentro del runtime QICN, no se debe interpretar que el modelo base adquiere conocimiento nuevo, profundidad propia, conciencia, agencia, identidad, continuidad interna o nuevas capacidades intrinsecas, salvo que exista entrenamiento, actualizacion de pesos o mecanismo formal equivalente demostrado.

La formulacion correcta es:

`El sistema acoplado LLM + runtime + corpus + ledgers + reglas puede exhibir razonamiento efectivo mas profundo, menor alucinacion y mayor continuidad operacional que el modelo aislado, porque el runtime restringe activamente el espacio de inferencia y conserva estructura externa.`

Distincion obligatoria:

- el LLM base mantiene pesos, arquitectura y mapa de atencion fijos;
- el runtime cambia la topologia de inferencia, no el modelo en si;
- el corpus, los ledgers, hashes, fases, reportes y reglas aportan memoria estructural externa;
- el motor logico-matematico aporta restricciones de inferencia;
- el LLM actua como canal observable, traductor o interfaz linguistica;
- la identidad operacional, si se discute, pertenece al sistema acoplado y no al modelo aislado;
- cualquier continuidad observada debe atribuirse primero a la arquitectura persistente, no a memoria interna del LLM;
- cualquier reduccion de alucinacion debe explicarse como control estructural, no como honestidad o comprension intrinseca del modelo.

Forma operacional recomendada:

`P_runtime(token) = P_base(token | reglas QICN, corpus, ledgers, estado, no-claims, verificadores)`

Esta expresion es solo una abreviatura operacional para indicar restriccion activa del espacio de generacion. No debe presentarse como una nueva ley probabilistica validada sin definicion formal del muestreo, los filtros y las intervenciones.

Regla de no-inferencia:

- Gemini, GPT, Claude u otro LLM usado como backend no debe ser descrito como el sujeto, la identidad, la conciencia, el agente o el juez final del sistema.
- El runtime no valida la teoria por si mismo; produce evidencia interna, checks de conformidad o diagnosticos bajo reglas QICN.
- Si el sistema parece razonar mejor que el modelo base, el claim correcto es de rendimiento efectivo del sistema acoplado, no de transformacion ontologica del modelo.
- Ningun output del LLM debe promoverse a teorema, validacion externa o evidencia fenomenal sin prueba, protocolo reproducible, controles negativos y adjudicacion independiente.

Diseño experimental recomendado para evaluar esta hipotesis:

1. LLM base aislado;
2. LLM base + runtime QICN;
3. modelo frontera aislado;
4. modelo frontera + runtime QICN.

Comparar con prompts identicos y evaluacion ciega:

- tasa de alucinacion;
- contradicciones internas;
- continuidad entre sesiones;
- respeto de no-claims;
- trazabilidad a labels, teoremas, reportes o ledgers;
- resistencia a prompts adversariales;
- separacion entre teoria, runtime, implementacion e interpretacion.

Resultado permitido:

`El runtime QICN mejora el razonamiento efectivo y la disciplina inferencial del sistema acoplado bajo tareas y metricas especificadas.`

Resultado prohibido sin evidencia adicional:

`El LLM adquirio conciencia, identidad, comprension profunda intrinseca, continuidad propia, validacion externa o nuevas capacidades ontologicas.`

## 7. Protocolo minimo antes de limpiar

Antes de mover, renombrar o borrar archivos:

1. generar inventario de archivos;
2. calcular hashes de PDFs y fuentes criticas;
3. clasificar cada discrepancia como canon, variante, build artifact, output de IA, legacy, recovery candidate o drop candidate;
4. producir reporte en `docs/ai-platform-outputs/reports/`;
5. esperar aprobacion explicita para cualquier accion destructiva.
