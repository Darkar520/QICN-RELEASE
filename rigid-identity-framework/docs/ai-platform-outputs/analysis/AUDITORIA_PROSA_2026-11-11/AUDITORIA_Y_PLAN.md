# Auditoría de concordancia entre resultados, lenguaje y documentos

Fecha: 2026-11-11 (Costa Rica). Base inspeccionada: `cc54d71318f7156e3f486e0b74b23696637b03ed`. Estado: **auditoría documental y plan de corrección; fuentes teóricas sin modificar**.

## Alcance y evidencia

Se leyó íntegramente la interacción adjunta `728cc5c1-5a60-4cf4-a7db-ef7240a04048/Texto pegado.txt`. No se recibió el archivo original `auditoria_sincronizacion_marco.md`; no se atribuye lectura de sus secciones no compartidas. Se consultaron las cinco autoridades de raíz, AGENTS, INSTRUCCIONES y roadmap. Se inventariaron las doce unidades activas: BaseCore, I–X y Puente, incluidos los once inputs directos de BaseCore. El monolito es su producto ensamblado, no una teoría número trece independiente.

La revisión combina inventario íntegro de etiquetas/referencias y huellas, lectura semántica dirigida de enunciados, contexto, resúmenes, predicciones y conclusiones, contraste con correcciones registradas y extracción del texto de los doce PDF y del monolito. **No equivale a demostrar de nuevo todos los teoremas ni a certificar ausencia de otros errores.** Tampoco es una lectura visual de cada página. Los37 hallazgos siguientes son adjudicaciones concretas; los337 candidatos de búsqueda no se cuentan como errores. Los números de línea identifican esta versión y deben acompañarse de etiqueta/cita en la reparación.

## Diagnóstico

La sospecha del usuario se confirma. Igualdad fuente–capítulo no implica coherencia entre dos párrafos de esa misma fuente. Un ensamblador puede reproducir perfectamente un párrafo obsoleto. El paso previo verificó conservación de resultados constructivos y propagación de cambios escogidos, pero no toda la propagación semántica a abstracts, tablas, otras definiciones y predicciones. Esa limitación debe corregirse en el proceso, sin transformar el éxito de software en apoyo científico.

La auditoría también corrige excesos de Antigravity: (a)20 bloques es un diseño específico, no un mínimo universal; (b)VII dice que no reporta valores **observados**, compatible con testigos racionales; (c)un modelo constructivo sigue siendo formal, así que formal only no contradice por sí solo los nuevos teoremas; (d)la redundancia de un umbral no vuelve vacía la clase; (e)bibliografía sin claves no citadas no prueba citas rotas; (f)un abstract no tiene obligación de enumerar todas sus partes; (g)conservar premisas redundantes no hace falso un condicional. Los problemas reales correspondientes se delimitan abajo.

## Hallazgos y reparaciones

P1: error matemático/contractual o afirmación sustantiva sin las hipótesis necesarias. P2: propagación, referencia o inferencia editorial importante. P3: precisión documental. La prioridad no es una certificación de verdad de los demás pasajes.

### A01 · P1 · Autor corrupto en metadatos y portada (también línea39).

Fuente: `paper5_operational_consciousness/main.tex:33`.

**Contraste:** En 426ee6b el nombre era correcto; en 1fd5938 está recodificado con mojibake. El texto extraído del PDF confirma la corrupción.

**Vía concreta:** Restaurar UTF-8 a partir de la versión fiable; comprobar portada y PDF metadata, sin recodificar indiscriminadamente todo el archivo.

### A02 · P1 · Sumabilidad anunciada como necesaria y suficiente.

Fuente: `paper1/main.tex:486`.

**Contraste:** thm:spectral-coupling necesita además levantamiento y amplificación controlada y prueba una cota de Hausdorff, no deformación cero. La necesidad sigue abierta en774.

**Vía concreta:** Expresar la cota y todas sus hipótesis; conservar una caracterización más fuerte como problema a demostrar.

### A03 · P1 · Exclusión general de arquitecturas finito-dimensionales.

Fuente: `paper1/main.tex:490`.

**Contraste:** thm:lml y su control en474–481 permiten costes finitos sin deformación positiva; la dimensión sola no suministra el testigo.

**Vía concreta:** Reemplazar la exclusión por el resultado condicionado al sector, observables, fidelidad y testigo de deformación.

### A04 · P1 · Decaimiento t^-alpha y cualquier peso polinomial.

Fuente: `paper1/main.tex:1201`.

**Contraste:** Con alpha=2, epsilon_t=t^-2 y w_t=t aparece la serie armónica. Las definiciones permiten pesos positivos; no hay una restricción universal que salve este enunciado.

**Vía concreta:** Si w_t<=K t^p, exigir alpha>p+1; distinguir suficiencia para toda familia dominada de necesidad para una familia particular.

### A05 · P1 · Unicidad por mero canal observable, indivisibilidad y no transferencia en el resumen.

Fuente: `paper1/main.tex:71`.

**Contraste:** def:coexist y thm:uniqueness ahora requieren conexión energética en el mismo sector. thm:non-transferability transporta clase de resistencia bajo datos emparejados.

**Vía concreta:** Propagar esas hipótesis a abstract, introducción, resúmenes y conclusión800; no confundir transporte de clase con transferencia física de una persona.

### A06 · P1 · Inyectividad canal→identidad.

Fuente: `paper1/main.tex:689`.

**Contraste:** La unicidad dentro de cada canal no separa dos canales. Dos canales distintos pueden tener el mismo objeto asignado.

**Vía concreta:** Afirmar aplicación bien definida y cota de la imagen; para inyectividad añadir y justificar separación entre canales.

### A07 · P1 · Indivisibilidad sin prueba de atomicidad.

Fuente: `paper1/main.tex:677`.

**Contraste:** Unicidad de asignación no excluye productos no triviales; Cantor admite separación de bits pares/impares y es homeomorfo a su cuadrado.

**Vía concreta:** Definir factorizaciones admisibles, estructura preservada y una obstrucción independiente; mantener la atomicidad como propuesta hasta resolverlo.

### A08 · P1 · La frase introductoria proclama un único atractor estable.

Fuente: `paper1/main.tex:988`.

**Contraste:** El lema995–998 distingue reconstrucción de prefijos y atracción, y necesita contracción adicional para esta última. Aparece también en el monolito, página física102.

**Vía concreta:** Reescribir la frase con los tres resultados separados y sus hipótesis.

### A09 · P1 · Cero margen tratado como ruptura automática.

Fuente: `paper5_operational_consciousness/main.tex:1502`.

**Contraste:** prop:rupt-ri, prop:rupt-int y prop:rupt-leg distinguen radio cero, ínfimo no alcanzado y fallo del predicado. Cero radio puede coexistir con éxito en el punto.

**Vía concreta:** Separar pérdida de robustez certificada, falta de evidencia y refutación de pertenencia. Actualizar pred:breakclass y las tablas además del párrafo.

### A10 · P1 · thm:rupture exige exactamente una de tres alternativas.

Fuente: `paper5_operational_consciousness/main.tex:941`.

**Contraste:** No pertenencia, cociente indefinido y no legibilidad pueden ocurrir conjuntamente. La prueba enumera causas y no establece exclusión mutua.

**Vía concreta:** Dar implicaciones y casos que pueden solaparse; una taxonomía exclusiva exige particiones de casos explícitas.

### A11 · P1 · La prueba de existencia añade cociente no trivial desde diferenciación.

Fuente: `paper5_operational_consciousness/main.tex:899`.

**Contraste:** prop:rupt-diff declara que separación de lecturas no determina el número de celdas de un cociente independiente. El puente exige aparte separación visible por decodificador.

**Vía concreta:** Relacionar formalmente la pareja separada con decodificadores/celdas certificados, o retirar sólo ese paso adicional de la prueba; conservar la obligación.

Se señala una obligación de enlace explícito, no un contramodelo completo a todas las cláusulas de `Cop`: la lectura de «nontrivial class structure» en L6 podría aportar parte de esa condición si se formaliza su relación con el cociente efectivo.

### A12 · P2 · Predicción de transporte presupone conservación de seis invariantes.

Fuente: `paper5_operational_consciousness/main.tex:1425`.

**Contraste:** La condición es redundante y debilita el contenido de contraste; no vuelve falso al condicional. En aproximación falta precisar dominio y radio calibrado. Se repite en1447 y1543.

**Vía concreta:** Prerregistrar datos primitivos, sector de rivales, métrica, radios y salida predicha; conservar controles que violen una hipótesis.

### A13 · P2 · Referencia manual a Section10.

Fuente: `paper5_operational_consciousness/main.tex:1502`.

**Contraste:** La estructura actual tiene sección de taxonomía posterior; números escritos a mano no se validan como refs.

**Vía concreta:** Añadir label estable al destino verificado y usar ref, sin renumeraciones manuales.

### A14 · P1 · PRED-07 usa presupuesto bruto delta_ast.

Fuente: `paper6_predictions_falsation/main.tex:468`.

**Contraste:** thm:stability de V usa delta_star^cal, operador completo y sectores fijos. La equivalencia entre ambos presupuestos no está demostrada; P5-03 repite el problema.

**Vía concreta:** Actualizar condición, observable y criterio de destrucción; preservar resultados históricos de los jueces como evidencia de su contrato anterior, no del nuevo teorema.

### A15 · P1 · Atribución resumida de no nulidad forzada a PaperIII.

Fuente: `paper6_predictions_falsation/main.tex:81`.

**Contraste:** PaperIII admite un extremo nulo y no excluye estabilidad dinámica de un estado nulo. VII91 dice más explícitamente que III excluye estructura nula estable.

**Vía concreta:** Propagar exclusión conjunta en un par separado con lectura coerciva; separar el criterio dinámico adicional de V.

### A16 · P2 · Canon doctrinalmente congelado sin versión en una fuente que ahora contiene nuevas construcciones.

Fuente: `paper6_predictions_falsation/main.tex:95`.

**Contraste:** Hay memoria, realimentación, sondeo e interacción en230–327. Un ensayo puede tener protocolo congelado aunque la investigación posterior cambie.

**Vía concreta:** Fijar commit/fecha/contrato por campaña; actualizar contribuciones y distinguir modelos nuevos de resultados antiguos. No reescribir retrospectivamente los ensayos.

### A17 · P1 · Idiff(S,tau)>lambda_diff sin tipado compatible.

Fuente: `paper7_operational_life_subjecthood/main.tex:331`.

**Contraste:** V define un predicado binario; VII lo introduce en un vector de puntuación con argumento temporal. Falta una identificación formal o un nuevo símbolo para el margen continuo.

**Vía concreta:** Separar I_diff booleano, delta_diff con unidades y estimador normalizado con horizonte; mapearlos mediante una regla de decisión.

### A18 · P2 · Encuadre de resultados no distingue bien testigos racionales de medición.

Fuente: `paper7_operational_life_subjecthood/main.tex:627`.

**Contraste:** La frase exacta dice observed numerical values. Los testigos matemáticos no son observaciones empíricas: no hay contradicción literal, pero el abstract/conclusión omiten la nueva realización.

**Vía concreta:** Añadir resultados exactos con modelo, horizonte y comparador, conservando que no son datos observados.

### A19 · P2 · Proposition7.5 escrita a mano.

Fuente: `paper8_first_person_subjectivity/main.tex:512`.

**Contraste:** El resultado local prop:localrobust está en la sección5 del propio fuente. PDF y monolito conservan la referencia textual.

**Vía concreta:** Usar ref{prop:localrobust}; resolver por label y verificar el PDF recompilado.

### A20 · P2 · Corollary10.3 y Definitions6.1--6.6.

Fuente: `paper8_first_person_subjectivity/main.tex:758`.

**Contraste:** El corolario de irreducibilidad está en la sección8; las cinco definiciones primarias se presentan en4. La tabla1599 conserva la numeración antigua.

**Vía concreta:** Añadir/reusar etiquetas por objeto, no reemplazar números de sección globalmente.

### A21 · P1 · Normalización de exponentes sólo habitual, pero obligatoria en prop:localrobust.

Fuente: `paper8_first_person_subjectivity/main.tex:367`.

**Contraste:** La prueba508 usa suma de exponentes=1. Si cada exponente es2/7, todas las coordenadas pasan de1/2 a3/4 y epsilon=1/4<m=1/2: Phi pasa de1/4 a9/16, superando la cota3/8.

**Vía concreta:** Exigir suma=1 en definición/hipótesis o formular factores (1±epsilon/m)^s para suma s. La rama normalizada sí es correcta.

### A22 · P2 · Umbral lambda_Phi>=lambda_G^7.

Fuente: `paper8_first_person_subjectivity/main.tex:388`.

**Contraste:** Con suma=1, Phi>=Gate. Si lambda_Phi<=lambda_G, la cláusula escalar es redundante; el requisito lambda_G^7 no evita esa zona. No vuelve falsa ni vacía a la clase.

**Vía concreta:** Declarar si se desea redundancia; para una restricción escalar adicional estudiar lambda_Phi>lambda_G y realizabilidad conjunta.

### A23 · P1 · Infimo sin mejora presentado como un rival que alcanza el empate.

Fuente: `paper8_first_person_subjectivity/main.tex:717`.

**Contraste:** Con pérdida candidata c y pérdidas rivales c+1/n, el margen óptimo es cero sin rival que empate o gane. La decisión de no escalar puede mantenerse, pero esa prueba de existencia no vale.

**Vía concreta:** Distinguir empate de ínfimos, derrota y evidencia insuficiente; exigir compacidad/semicontinuidad o un testigo de attainment si se afirma mínimo alcanzado.

### A24 · P2 · Strict strengthening sólo prueba inclusión.

Fuente: `paper8_first_person_subjectivity/main.tex:399`.

**Contraste:** La prueba usa la cláusula upstream y dice que el recíproco no está garantizado. Eso no demuestra inclusión propia en la clase completa. El certificado local positivo no satisface automáticamente todas las obligaciones upstream.

**Vía concreta:** Probar un miembro upstream fuera de Subfp completo o titular resultado de inclusión y mantener estrictitud como obligación.

### A25 · P2 · Tabla de cierre omite los nuevos límites de realizabilidad y rivales.

Fuente: `paper8_first_person_subjectivity/main.tex:1599`.

**Contraste:** Los apéndices contienen obstrucción por fibras, lesiones nativas y empate público frente a señales privadas. No certifican sin más la clase completa.

**Vía concreta:** Actualizar abstract, resultados y tabla con realizaciones locales, clase de rival y obligaciones abiertas; separar necesidad por definición de necesidad demostrada.

### A26 · P1 · Fidelidad 1-delta_leg atribuida a L4 de V.

Fuente: `paper_bridge_operational_subjecthood/main.tex:335`.

**Contraste:** L4 controla p_miss, no un radio de distancia ni un certificado arbitrario delta_leg. Acuerdo en distribución tampoco es equivalente a probabilidad de acierto sin especificar métrica/acoplamiento.

**Vía concreta:** Tipar pérdida de clasificación y distancia de distribuciones por separado; usar1-p_miss sólo donde la ley y población de L4 lo permitan.

### A27 · P1 · Cociente descrito por cercanía beyond the legibility margin.

Fuente: `paper_bridge_operational_subjecthood/main.tex:360`.

**Contraste:** Cercanía por epsilon no es transitiva; BaseCore07 da un contraejemplo explícito con0,3/4,3/2 y radio1.

**Vía concreta:** Usar igualdad de celdas/mapas certificados de respuesta y demostrar correspondencia del cociente.

### A28 · P2 · Prompt filtrado en remark formal.

Fuente: `paper_bridge_operational_subjecthood/main.tex:392`.

**Contraste:** La frase literal The prompt version aparece también en el PDF monolítico, página física381.

**Vía concreta:** Sustituir metadiscurso por la hipótesis de separación visible y la implicación que sí se prueba.

### A29 · P2 · Tabla heredada sobre no transferencia y unicidad.

Fuente: `paper_bridge_operational_subjecthood/main.tex:1019`.

**Contraste:** Reimporta el lenguaje antiguo de I; el resumen no refleja todas las nuevas obstrucciones de autorreferencia.

**Vía concreta:** Propagar canal conectado, comparación sectorial, piso global y variante por fibras con métricas/profundidades declaradas.

### A30 · P2 · Resumen de contribuciones anterior a las realizaciones.

Fuente: `paper9_phenomenal_bridge_organization/main.tex:1373`.

**Contraste:** El cuerpo contiene extensiones de cuatro estados, márgenes racionales, ciclo y no aditividad; conclusión1379 y candidatos1675 no distinguen lo probado localmente del transporte general abierto.

**Vía concreta:** Añadir esos resultados y sus rivales. Formal only es compatible con construcciones matemáticas: no confundir su actualización con anunciar BPF completo.

### A31 · P2 · Planificación n=1 por grupo con efecto sintético10.737.

Fuente: `paper4/main.tex:658`.

**Contraste:** No se especifica en esa tabla el test ni la ley que justifica potencia con una observación. El teorema con n=20 es un ejemplo Bernoulli pareado, no un mínimo universal ni la misma planificación.

**Vía concreta:** Recalcular bajo población, unidad, incertidumbre, pérdidas y test fijados. Conservar tabla sólo como cálculo histórico descriptivo con procedencia explícita.

### A32 · P2 · Preambulo se genera sólo si no existe.

Fuente: `scripts/build-monolithic-volume.js:524`.

**Contraste:** Guardas existsSync confirmadas para packages y setup. Esto permite deriva en builds incrementales; no demuestra que toda macro actual falte o que el PDF actual no compile.

**Vía concreta:** Comparar preámbulo esperado/actual y probar build limpio e incremental aislados; preservar personalizaciones identificadas en vez de sobrescribir ciegamente.

### A33 · P3 · Non-result-bearing ambiguo ante nuevos resultados analíticos.

Fuente: `paper10_external_adjudication/main.tex:45`.

**Contraste:** La ausencia de campañas externas sigue siendo correcta. Existen teoremas de riesgo, cobertura y GLS en el mismo manuscrito.

**Vía concreta:** Separar resultados matemáticos de protocolo de resultados de campañas aún no ejecutadas; no borrar blocked_until_execution de ensayos.

### A34 · P3 · BaseCore ya tiene un resumen condicional actualizado; se deben revisar sus contratos con downstream.

Fuente: `basecore/BASECORE.tex:117`.

**Contraste:** No mencionar cada parte en un abstract no es contradicción. BaseCore07 ya separa equivalencia de celdas y tolerancia cruda; Puente no la hereda correctamente.

**Vía concreta:** Mantener propiedad de resultados en BaseCore; actualizar vínculos downstream y añadir una matriz de notación sin duplicar pruebas.

### A35 · P2 · Preguntas abiertas y remisiones manuales sobreviven a resultados parciales.

Fuente: `paper2/main.tex:841`.

**Contraste:** El propio paper tiene realización ternaria y cotas; el problema de caracterizar C debe distinguir los límites disponibles del óptimo/generalidad aún abiertos. PaperIII128 conserva una organización por secciones manual.

**Vía concreta:** Reformular problema residual preciso, convertir referencias relevantes a labels y no rebajar las cotas ya demostradas.

### A36 · P2 · Fallo de persistencia identificado con ausencia de soporte estable.

Fuente: `paper5_operational_consciousness/main.tex:293`.

**Contraste:** I_per es una conjunción de invariancia, distancia positiva a colapso y condición de atractor. Su negación no identifica cuál cláusula falla; prop:rupt-per posterior es más preciso.

**Vía concreta:** Propagar negación tipada de cada cláusula; no inferir inexistencia de todo soporte desde fallo de un certificado.

### A37 · P2 · La prueba de cor:onemetric generaliza todo criterio escalar a un subconjunto de invariantes.

Fuente: `paper5_operational_consciousness/main.tex:1069`.

**Contraste:** El enunciado enumera criterios de una coordenada, pero el argumento dice Every one-metric criterion. El escalar min_j I_j codifica toda la conjunción, sin suprimir ninguna coordenada.

**Vía concreta:** Limitar comparación a sustitutos que sólo dependen de una coordenada; no proclamar imposibilidad general de una codificación escalar.

## Propagación hasta el PDF y referencias

Las frases problemáticas no están sólo en fuentes abandonadas. En el monolito extraído se localizaron en páginas físicas92 (necesidad/suficiencia),102 (atractor),106 (cualquier peso polinomial) y381 (prompt). El texto de portada del PDF V también contiene mojibake. Las páginas son índices físicos de extracción, no necesariamente la numeración impresa.

El inventario no encontró etiquetas duplicadas ni refs locales no resueltos en las doce unidades con los inputs directos de BaseCore. Eso no valida referencias numéricas escritas a mano, destinos semánticamente equivocados ni fórmulas citadas con nombres viejos. No se certifica aquí la resolubilidad de todas las macros o de todos los cite mediante un nuevo build. Las referencias defectuosas de VIII muestran exactamente esa diferencia.

## Decisión de lenguaje solicitada por el usuario

Se conserva el programa completo de investigación. No se elimina una propuesta por no estar demostrada. Se organizan cinco niveles: objetos y resultados matemáticos; modelos y controles; implementación; lenguaje técnico; interpretación y propuestas abiertas. La interpretación final debe señalar a los resultados concretos que la motivan y a las premisas adicionales que faltan, sin convertir la nomenclatura en evidencia.

| Alias histórico/interpretativo | Nombre técnico propuesto | Frontera que debe conservarse |
|---|---|---|
| masa ontológica | cociente de resistencia a deformación en un sector declarado | coste/unidad, métrica y sector; infinito puede resultar de ausencia de testigos |
| identidad rígida | objeto de historias compatibles con resistencia sectorial | asignación a un objeto, no persona ni experiencia demostrada |
| retroinducción | compatibilidad proyectiva y reconstrucción por cortes | no causalidad física hacia atrás |
| régimen fenomenológico | asignación estructural a un codominio métrico | PaperII ya incluye este alias técnico; no duplicarlo |
| inestabilidad del nulo | exclusión conjunta del valor nulo en un par testigo separado | no inestabilidad temporal universal |
| conciencia operacional | criterio operacional conjuntivo de seis predicados | pertenencia definida, sin equivalencia con conciencia humana |
| qualia operacionales | clases de equivalencia de respuestas certificadas | igualdad de celdas, sin identificación con qualia experienciales |
| subjetividad en primera persona | certificado operacional indexado de siete coordenadas | estimadores, selección de rivales y obligaciones upstream |
| puente fenomenal | programa de transporte y comparación entre modos con obligaciones adicionales | realizaciones locales no cierran la clase completa ni BPF |
| juicio de ownership | atribución causal operacional al índice declarado | invariancia, trasplantes, información del comparador y controles |

Estos son candidatos para decisión editorial, no renombrados ya aplicados. Cambiar títulos o nombres visibles no exige borrar etiquetas LaTeX, IDs del registro ni historia. Mantener aliases en una tabla de correspondencia permite leer la bibliografía histórica. La interpretación puede conservar una sección final propia; no debe reaparecer como premisa tácita en una demostración. La fuerza matemática se aumenta mediante pruebas, hipótesis justificadas y realizaciones; cambiar un nombre no la aumenta por sí mismo.

## Plan ordenado de corrección, sin reescritura global

1. **Congelar alcance y contratos.** Partir de este commit; preservar corpus histórico/áreas congeladas. Para cada hallazgo, registrar objeto/etiqueta, hipótesis, conclusión real, unidad y dominio, todas sus menciones activas y estado de la interpretación. Reutilizar registro/ledger/roadmap, sin otro registro canónico paralelo. No mover resultados downstream al BaseCore por simple coincidencia temática.
2. **Resolver primero los fallos que cambian la verdad.** A04, A10, A11, A21, A23, A26–27 y obligaciones A06–07. Pruebas exactas y controles negativos; no maquillar con lenguaje técnico. A02–03 y A08–09 requieren propagar el alcance ya corregido. Preservar las afirmaciones fuertes como objetivos tipados cuando aún falte prueba. Congelar prospectivamente cualquier control nuevo antes de ejecutarlo.
3. **Fijar nomenclatura técnica y capa interpretativa.** Revisar la tabla anterior por dominio, sin sustituciones globales. Añadir a la sección interpretativa lo que se propone y qué resultado/experimento permitiría conectarlo con la capa formal. Conservar IDs/labels y aliases históricos. Ninguna conciencia, agencia, causalidad o identidad humana se obtiene sólo por etiqueta.
4. **Propagar por dependencia.** BaseCore↔I–III; V; VI y VII; VIII y Puente; IX; IV/X para protocolos. En cada unidad revisar portada/metadata, abstract, introducción, supuestos, pruebas, resúmenes, tablas, predicciones, conclusiones y anexos. Revisar todas las menciones cruzadas. Las campañas antiguas conservan su contrato y procedencia; los resultados del contrato viejo no se adjudican automáticamente al nuevo. Marcar falta de implementación verificable sin inventar estado actual del runtime, fuera de esta tarea.
5. **Regla de mantenimiento y controles limitados.** Proponer una regla en README(s)/INSTRUCCIONES: toda modificación matemática debe declarar su impacto documental y demostrar propagación o justificar no aplicación. Un control puede detectar mojibake, refs manuales, labels inexistentes y frases retiradas en contexto activo. No puede garantizar coherencia semántica universal. Mantener contextos históricos/citas/contraejemplos para evitar falsos positivos. La revisión humana/matemática sigue siendo necesaria. No añadir un verificador que sólo busque frases de aprobación.
6. **Reconstrucción reproducible.** Comparar preámbulos esperados y actuales, build limpio e incremental aislados; recompilar documentos afectados, registro y monolito. Revisar números manuales y tablas como objetos semánticos, no sólo compilación. Verificar autor/metadata con extracción y muestra visual. Mantener hashes de fuentes,12capítulos e inputs de BaseCore. Aislar informes mutables y no alterar release/corpus/artifacts.
7. **Aceptación y publicación separadas.** Cada Axx debe acabar corregido con evidencia o abierto con razón, hipótesis y siguiente acción. Ninguna discrepancia activa de prioridad alta se considera resuelta por pasar tests. Ejecutar raíz3, release, suite matemática pertinente/completa según alcance, registro/macros y Lean si cambian formalizaciones. Revisión independiente conforme al protocolo y después commit/push de alcance explícito. No se ha solicitado publicar esta auditoría.

## Veredicto y límites

Hay avances reales: torres realizadas, controles racionales, separación por interacción y verificaciones formales acotadas. Su conservación importa. La prosa puede sobreprometer y también omitir resultados nuevos; ambas cosas impiden evaluar qué se alcanzó realmente. Esta auditoría confirma ese problema y encuentra errores adicionales que requieren trabajo matemático, no sólo edición.

No se cambiaron fuentes, PDFs, registro, README, instrucciones, compilador ni nombres canónicos. Sólo se añadieron este informe, su inventario y una fila al ledger existente. No se ejecutaron campañas, nuevas suites científicas, recompilación ni Lean; no era necesario repetirlos para observar estas discrepancias. Los verificadores de raíz se ejecutan para controlar las fronteras documentales tras registrar el informe; su resultado se conserva en la evidencia auxiliar. Los mensajes de MiKTeX durante extracción no impidieron generar texto (exit0); no se interpretan como una compilación del corpus.

Se mantienen los veredictos registrados: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`; v27/v28/v30 `BLOCKED_MULTIPLE_GATES`; v31 `BLOCKED_FOUNDATION_FIRST_GATES`; `external_support_certified=false`. No es una certificación externa ni una prueba de que el resto del marco esté libre de errores.

Comprobación de cierre de esta auditoría: raíz3/3, `git diff --check` sin errores y `V35 all legacy verification: PASS; passed=6/6` en copia aislada con las mismas fuentes de partida. La comparación SHA-256 confirma doce fuentes y sus PDF, once inputs de BaseCore y76superficies congeladas sin cambios. Sólo quedan locales este informe, el inventario y el asiento de ledger; no se realizó commit ni push.
