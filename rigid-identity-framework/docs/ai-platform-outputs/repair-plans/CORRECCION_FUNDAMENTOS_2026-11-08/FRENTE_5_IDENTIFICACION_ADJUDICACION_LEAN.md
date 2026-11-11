# Frente 5 · Identificación, adjudicación y Lean 4

## Prerregistro · 2026-11-10

Base local `a1ebcf16e68b3e05339910869f6dccbd8b234107`. Frente 4 guardado con árbol limpio. Intervenir Papers IV y X, las formalizaciones Lean nuevas, el registro y los productos derivados. Mantener la cadena científica y los veredictos crudos con `external_support_certified=false`.

1. **Paper IV.** Unidad independiente de inferencia es el bloque emparejado de preparaciones, semilla y exposición comunes, con asignación aleatoria independiente entre bloques. Toda dependencia intra-bloque permanece dentro de él. Declarar como estimandos la media poblacional de diferencia de pérdida y la probabilidad de ventaja en la regla de signo predefinida. Ruido de lectura acotado y correlación interna arbitraria, con guardas de margen para decidir signos. Las exclusiones dependen de integridad, no de resultado ni etiqueta. Fijar antes de generar los controles α=1/20, n=20 bloques independientes y umbral binomial unilateral de al menos 15 éxitos. Verificar tamaño exacto y potencia ≥4/5 a probabilidad de éxito 4/5. Diferenciar la hipótesis nula aguda de aleatorización de la nula estadística de signo. Controles patológicos con rastros de procedencia:
   - Fuga de etiqueta o semilla reutilizada en calibración. En cinco bloques, una salida copiada de etiqueta siempre pasa la regla ingenua de cinco aciertos mientras que el nulo ciego tiene probabilidad 1/32. Detectar el solapamiento de unidades y la dependencia de salida al modificar sólo la etiqueta oculta.
   - Tres signos independientes repetidos cuatro veces como si fueran doce unidades. La regla ingenua rechaza con diez o más éxitos, nominal 79/4096 y tasa real 1/8. La inferencia con tres unidades rechaza con probabilidad cero a α=1/20.
   - Dos ventanas independientes de cinco bloques con regla todos positivos. El análisis preespecificado tiene tasa 1/32 y elegir a posteriori cualquiera eleva a 63/1024. El contraste conjunto o la corrección predeclarada deben impedir la promoción de la selección. Probar fórmula general bajo independencia y cota de unión bajo dependencia.
2. **Paper X.** Una salida incorrecto/correcto/abstención por bloque iid reservado, coste γ=3/4. Definir cobertura C y error condicional e, con riesgo Rγ=γ(1−C)+Ce. Derivar inversión binomial exacta para C y e (cobertura nula da intervalo [0,1] para e), auditoría independiente con indicador dominante de fuga y límite superior, región conjunta multinomial opcional por orden de probabilidad y sus proyecciones. Propagar incertidumbre conjunta hacia riesgo y cobertura, con límites nulos que expliciten balance limpio o contaminación acoplada. Esperar cotas ajustadas a cobertura γ(1−C)+(C−p)_+/2 y γ(1−C)+(C/2−p)_+ bajo sus respectivas hipótesis. Control de abstención selectiva, fuga conocida y dependiente de etiqueta, y permutaciones de etiquetas a nivel de bloque. Casos exactos sugeridos C=1/2, p=1/8 y cuatro bloques con dos decisiones y dos abstenciones. La adjudicación incorpora cobertura mínima y usa la cota inferior apropiada para decidir.
3. **AR(1)/GLS.** Fijar ley gaussiana estacionaria |ρ|<1, varianza de innovación σ²>0, horizonte n y media declarada. Verificar determinante y forma cuadrática de innovaciones con el término inicial (1−ρ²)e₁², logdensidad completa y GLS con la misma covarianza. Contrastar razones de densidad exactas usando residuos racionales y normalizaciones comunes. Esperar inversiones de signo en los dos controles de residuos propuestos. Las cotas geométricas sobre fibras requieren sus propias hipótesis y no fijan una ley temporal de ruido.
4. **Lean 4.31.0.** En E:, usar las dependencias fijadas y reponer sus objetos regenerables desde las copias verificadas. Conservar los siete lemas de QICNFiniteP4.lean. Añadir núcleos con hipótesis explícitas para el módulo de separación positiva en pares compactos no vacíos, la brecha 2·3⁻⁽ʲ⁺ᵗ⁾ y la colisión al tocar bolas, la decisión binaria finita/TV y empate público, y las dos desigualdades de desplazamiento por conmutación aproximada. Incorporarlos al agregado. Compilar las declaraciones sin sorry, inspeccionar #print axioms, mapear cada una al identificador del paper y declarar las partes de cada enunciado que quedan fuera de mecanización.
5. **Verificación y parada.** Fracciones exactas, suite matemática, raíz, release, registro, macros y reconstrucción de IV, X y monolito. Verificar conservación de todos los IDs anteriores y de los doce capítulos fuera del alcance. Sincronizar fuentes, artefactos formales y PDF al Escritorio por huella. Un fallo se diagnostica y se registra antes de repetir. Mantener los juicios de soporte externo crudos.


## Ejecución y alcance

El Frente 4 quedó preservado en el commit local `a1ebcf16e68b3e05339910869f6dccbd8b234107`, con el mensaje solicitado y árbol limpio antes de abrir este frente. Base de trabajo aislada en `E:/QICN-PRESERVACION/2026-11-10-frente5`. Prerregistro congelado SHA-256 `81677f906847f9247df79217b8ee8053b4b3a3680d0d03d85c0608c9148a68cf`; el texto anterior reproduce el prerregistro, sin sustituir sus hipótesis por los resultados.

### Paper IV: campaña y errores de procedimiento

Se incorporaron `thm:campaign-block-sign-test` y `prop:campaign-pathology-inflation`. La unidad es el bloque independiente de preparación; los ticks y las réplicas dependientes permanecen dentro de él. Se separan diferencia media de pérdida y probabilidad de victoria. El margen de lectura `2η+τ` impide atribuir un signo al error instrumental, pero no demuestra por sí solo el nulo probabilístico. Las exclusiones deben ser invariantes a los resultados y quedar registradas antes del desenmascarado.

La regla de al menos 15 victorias entre 20 bloques tiene tamaño `5425/262144 < 1/20` y potencia `76695231004672/95367431640625 > 4/5` en la alternativa iid de probabilidad `4/5`. El nulo admite probabilidades independientes no idénticas de victoria, todas a lo sumo `1/2`. La potencia requiere la alternativa especificada. Un nulo de efecto medio cero no implica el nulo de signos.

Los controles sintéticos demuestran y detectan las patologías declaradas:

| Violación | Análisis admisible o ciego | Análisis contaminado |
|---|---|---|
| Copiar cinco etiquetas ocultas | Probabilidad `1/32` de cinco aciertos | Probabilidad `1`; dependencia contrafactual de la etiqueta y solapamiento de IDs |
| Repetir cuatro veces tres signos | Tres bloques: tamaño `0` a nivel `1/20` | Cola iid declarada `79/4096`, tamaño real `1/8` |
| Elegir una de dos ventanas | Ventana fijada: `1/32` | Selección: `63/1024` |

El auditor necesita procedencia completa. La precisión de las salidas no permite excluir una fuga encubierta; el resultado no es un detector universal de contaminación. La inflación general `1-(1-p)^K` requiere independencia entre oportunidades; la cota de unión `Kp` no la requiere.

### Paper X: riesgo, cobertura y fuga

Se incorporaron cuatro resultados: `thm:coverage-sensitive-leakage`, `thm:independent-block-risk-intervals`, `prop:block-label-permutation` y `thm:stationary-ar1-likelihood-gls`.

A cobertura `C`, coste `γ≥1/2` y fuga acotada por `p`, los pisos exactos son `γ(1-C)+(C-p)_+/2` bajo balance del estrato limpio y `γ(1-C)+(C/2-p)_+` bajo contaminación acoplada. Cada uno es alcanzable en su propia clase. No se pueden intercambiar sus supuestos: el control de ocho átomos con fuga dependiente de etiqueta alcanza `1/2`, por debajo del piso limpio `9/16`, porque rompe el balance condicionado a no fuga.

La inferencia se hace sobre bloques iid elegibles. La inversión binomial exacta para cobertura y error condicionado da una región rectangular simultánea por unión de errores; la inversión multinomial por orden de masa da otra región exacta conjunta. En cobertura observada nula el intervalo del error es `[0,1]`, sin publicar un estimador condicionado indefinido. La función de riesgo es bilineal, por lo que sus extremos en el rectángulo se obtienen en las esquinas. Las decisiones confirmatorias exigen margen positivo, cobertura mínima y presupuesto de error fijados previamente.

La cota de fuga no se inventa: un auditor aleatorio sólo la justifica si su indicador domina el evento real de fuga en la misma población. Esa dominación es un supuesto que necesita evidencia independiente. El resultado no presume que cualquier alarma de seguridad detecte toda fuga. Las permutaciones conservan las abstenciones y operan sobre bloques intercambiables, respetando los grupos del diseño.

### AR(1), GLS y geometría

Se deriva la densidad Gaussiana estacionaria completa, con término inicial `(1-ρ²)e₁²`, determinante `1-ρ²` de la precisión normalizada, escala de innovación y ecuaciones GLS. El modelo temporal requiere `|ρ|<1`, `σ²>0`, parámetros congelados o estimados fuera de reserva, y el rango completo del diseño para unicidad de GLS.

Los controles racionales verifican la matriz inversa de covarianza, los menores principales positivos y los determinantes para horizontes 1–6 y cinco correlaciones racionales. Con `ρ=1/2`, las razones exactas `3/8` y `-1` contrastan con `-3/8` y `1/2` de aproximaciones incorrectas. El ajuste constante GLS da `4/5`, frente a `2/3` del ajuste independiente. Una ley AR(1) dentro de un bloque no crea independencia entre bloques. La geometría de fibras depende de la proyección y del blanco; no se deduce de una razón de verosimilitud ni la determina.

### Controles y preservación documental

`check_campaign_front5.py` y `check_adjudication_front5.py` se incorporaron a `verify:math`, que conserva los controles anteriores. El segundo enumera 112 leyes multinomiales con fracciones exactas y comprueba cobertura por inversión de colas, inversión conjunta, extremos de riesgo, fuga selectiva y seis permutaciones de bloques.

El cotejo comprueba los 848 IDs anteriores, sin cambios de sus campos matemáticos o epistemológicos; sólo se desplazan localizaciones donde se insertaron secciones. Se conservan las 383 macros. Al retirar las nuevas secciones se recuperan íntegramente las fuentes previas de IV y X. Las otras 21 fuentes LaTeX activas y los siete lemas de `QICNFiniteP4.lean` conservan sus bytes. Los doce capítulos se comparan con las transformaciones del ensamblador real.

Los verificadores se ejecutan sobre la extracción aislada porque varios reescriben fixtures e informes. Sus reescrituras no se trasladan indiscriminadamente al árbol activo. Se preservan las áreas congeladas `release/`, `corpus/` y `artifacts/`.

### Incidencias operativas y reproducibilidad

C: llegó a quedarse sin espacio. Se identificó que `.lake` era una unión de directorio hacia E:, de modo que archivar sus objetos generados no liberaba C:. Se repusieron los 479 objetos comprobados de ese intento: 142 restaurados y 337 ya idénticos. Para recuperar espacio se preservó en E: un archivo estático de un instalador incompleto y sin uso de Lean 4.35; después se trasladaron los 14 859 archivos restantes de ese instalador, con inventario SHA-256 anterior al traslado; su comprobación posterior se registra en el cierre. No pertenece al entorno activo 4.31. Los registros de restauración y las huellas permanecen en la carpeta externa de esta fase.

La instalación anterior de 4.31 fallaba al leer un objeto privado de `AppBuilder`. Se reconstruyó una instalación externa desde el archivo oficial ya conservado, SHA-256 `f73208f53dcdc901745cb35fc916c476e0e18ed0856937740e46d07848f57f19`. Un primer arranque superó 300 segundos; una ejecución posterior localizó la falta de objetos IR en la extracción selectiva y éstos se repusieron desde el mismo archivo. La carga del entorno agotó los recursos disponibles en un intento; la preservación se reanudó tras detener únicamente los compiladores de esta fase. Otra ejecución quedó interrumpida antes de emitir veredicto. Se conservan sus registros. Tras recuperarse memoria y espacio, se comprobó por SHA-256 que el compilador original 4.31.0, Init, AppBuilder privado y el IR de Prelude coincidían con el archivo oficial. Se reutilizó ese compilador, con dependencias, objetos y temporales en E:. El verificador conserva sus comprobaciones y resuelve primero la biblioteca estándar del compilador, evitando buscarla en todos los paquetes externos. Esta modificación afecta la localización de las mismas bibliotecas fijadas, sin rebajar la comprobación del núcleo. En Paper X se intentó inicialmente Biber; se descartó ese paso al comprobar que el documento no usa bibliografía Biber y no genera `.bcf`. Sus tres pasadas LaTeX terminaron correctamente. No se modificaron los criterios científicos para evitar ningún fallo.

## Alcance de la mecanización nueva

El mapa `FRENTE_5_LEAN_MAP.json` vincula 26 lemas con cinco identificadores exactos en cuatro papers. Paper I obtiene mínimo positivo alcanzado en los pares compactos admisibles, positividad del ínfimo y su cota para cada par. La realización del canal concreto y cualquier coercividad lineal adicional conservan sus pruebas y supuestos en el paper.

Paper V mecaniza la recurrencia escalar neutra, la brecha `2·3^(-(j+t))`, el horizonte exacto por profundidad y el contacto de dos intervalos cerrados de error. La identificación de esa recurrencia con la planta completa sigue en la demostración LaTeX; no se formaliza toda la implementación Python.

Paper VIII mecaniza la decisión binaria óptima en un espacio finito de señales, la identidad de variación total, la regla que alcanza el mínimo y el empate cuando ambas leyes públicas son iguales. La interpretación probabilística exige masas no negativas y normalizadas; la cota de variación total en `[0,1]` explicita esas hipótesis. La dinámica de los siete estimadores, la familia completa de rivales y las clases heredadas no quedan formalizadas por esta identidad.

El Puente mecaniza las dos desigualdades de desplazamiento para un punto fijo dado y una cota de contracción dada. No sustituye la construcción de ese punto fijo, las realizaciones de fibras ni las seis cargas del puente. Los siete lemas anteriores de P4 se conservan y se revisan junto con los restantes símbolos públicos del agregado.

El primer control del módulo finito detectó definiciones reales que requerían la marca no computable, un factor recíproco que el automatismo lineal no normalizaba y una importación faltante de la distributividad de sumas. Se corrigieron las representaciones de las pruebas, sin añadir hipótesis ni debilitar las conclusiones. El helper de acotación de la regla de verosimilitud omite una hipótesis de finitud que no utiliza.

## Límites científicos que permanecen

Estos resultados fortalecen pruebas, condiciones de inferencia y controles de error internos. No aportan una campaña externa, una cota empírica de fuga, revisión independiente ni replicación. El contraste de decisión finita es relativo al canal permitido; un rival con la misma información puede empatar. La pertenencia a las clases completas de VIII e IX requiere sus obligaciones heredadas y, en IX, las cargas V, W, E y la conjunción BPF siguen separadas de los ensayos ya realizados. Las nociones de experiencia, conciencia o equivalencia humana no se certifican mediante estos controles.

Veredictos crudos: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`; v27/v28/v30 `BLOCKED_MULTIPLE_GATES`; v31 `BLOCKED_FOUNDATION_FIRST_GATES`. En todos los casos `external_support_certified=false`.

## Cierre de ejecución · 2026-11-11

El verificador completo terminó con 24 módulos y 126 teoremas públicos auditados. Incluye 26 lemas nuevos y los siete anteriores de P4. Todos los módulos se elaboraron desde sus fuentes con Lean 4.31.0, las opciones del proyecto y las nueve revisiones de dependencias fijadas. El compilador y su biblioteca estándar existentes permanecen en C:; dependencias, temporales, objetos nuevos y auditoría se alojan en E:. La salida de `#print axioms` sólo contiene `Classical.choice, Quot.sound, propext`; no aparece `sorryAx`. El agregado compila con ambos módulos nuevos importados. Las huellas del recibo se cotejan con cada fuente actual.

| Comprobación | Resultado |
|---|---:|
| Verificadores de raíz | 3/3 |
| `npm run verify:release` | 6/6 |
| `npm run verify:math` | 24/24 |
| Registro formal | 854; se conservan los 848 IDs anteriores |
| Macros | 383; cero bloqueos o advertencias del validador |
| Capítulos del monolito cotejados con su fuente | 12/12 |
| Módulos Lean recompilados | 24 |
| Teoremas públicos con auditoría de axiomas | 126 |
| PDF de IV / X / monolito | 18 / 36 / 388 páginas |

Las seis incorporaciones aparecen en sus PDF y en el monolito. No quedan referencias indefinidas ni etiquetas duplicadas. Los avisos tipográficos de TeX y de estilo de las cabeceras Lean se conservan en los logs; no se presentan como una compilación sin advertencias. El recibo `FRENTE_5_VERIFICACION.json` recoge comandos, salidas de comprobación, hashes de fuentes y objetos, y comparación de capítulos. `FRENTE_5_LEAN_AXIOMS.txt` conserva las dependencias de cada teorema. La evidencia operativa completa queda en `E:/QICN-PRESERVACION/2026-11-10-frente5`.

La preservación del instalador incompleto comprobó 14859 archivos y 2992660345 bytes mediante sus hashes previos al traslado. La ubicación conservada figura en el recibo. Este material es regenerable y ajeno a las fuentes del marco; no se incluye en Git.

Este cierre corresponde a los cinco frentes autorizados de fortalecimiento interno posterior a la torre. La revisión independiente, la recogida externa, la justificación empírica de la cota de fuga y las obligaciones de las clases completas de VIII/IX permanecen abiertas. Los nuevos cambios quedan locales para revisión; el commit solicitado corresponde al Frente 4.
