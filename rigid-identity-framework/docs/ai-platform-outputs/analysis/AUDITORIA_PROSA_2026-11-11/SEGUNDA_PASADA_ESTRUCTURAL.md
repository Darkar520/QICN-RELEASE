# Segunda pasada estructural: contratos, inferencia y robustez

2026-11-11, Costa Rica. Base `cc54d71`. Auditoría adicional solicitada; **sin reparación ni renombrado de fuentes**. Complementa `AUDITORIA_Y_PLAN.md` y no reemplaza sus37 observaciones ni las convierte en resueltas.

## Alcance real y método

Se revisaron de nuevo las autoridades de raíz, instrucciones y roadmap, y se siguieron dependencias seleccionadas en BaseCore e I–X/Puente. Esta pasada lee definiciones, pruebas y construcciones concretas; no proclama una revalidación completa ni una inspección visual de todos los PDF. Las fuentes y los PDF tienen las mismas huellas que en la primera pasada, por lo que los hallazgos se refieren al mismo corpus. Los15 puntos de abajo mezclan errores de formulación, contraejemplos a lecturas fuertes y obligaciones de integración. No son15 nuevos teoremas refutados.

Antes de ejecutar las cuentas racionales se dejó en E: un protocolo inmutable de alcance y resultados esperados. SHA-256: `4f2be86b1e5d80094e8cd01127913d657fd4d124ed96cc3b96b3e0f46730c4fa`. Es una auditoría matemática/documental con ejemplos sintéticos, sin campaña empírica ni validación externa. Las enumeraciones finitas comprueban cuentas; los argumentos infinitos se presentan por separado.

## Hallazgos adicionales y vías de fortalecimiento

### B01 · Error de formulación

**R0 confunde dependencia causal de la ley con interpolación de una trayectoria.**

Fuente: `paper1/main.tex:133`.

Para la planta x_next=1-x, sin dependencia de E, una trayectoria con entradas todas distintas siempre admite f(E_t)=x_(t+1). Con entradas repetidas puede no admitirla. La clasificación cambia con el calendario aunque la ley causal sea la misma.

**Fortalecimiento concreto:** Cuantificar la factorización de la ley sobre estados/preparaciones e intervenciones admisibles. Declarar qué variable retiene memoria y demostrar una separación con entradas emparejadas. El control finito no demuestra una afirmación universal: muestra el defecto de identificar una ley desde una trayectoria.

### B02 · Error de tipo

**La equivalencia de historias se aplica al espacio O de valores instantáneos.**

Fuente: `paper1/main.tex:554`.

def:obs-equiv compara secuencias {O_t}; el párrafo siguiente escribe O/~. Para alfabeto binario, tres lecturas forman ocho historias, no dos valores. No hay identificación de dominios declarada.

**Fortalecimiento concreto:** Definir el espacio de historias observables admisibles y tomar allí el cociente. Separar valores, ventanas, trayectorias infinitas y conjuntos inferidos.

### B03 · Obligación formal

**El cuantificador sobre perturbaciones no aparece en los términos de la igualdad.**

Fuente: `paper1/main.tex:547`.

La igualdad d_w(I(O),I(O_prime))=0 no indexa O, O_prime ni el mapa inferido por la perturbación cuantificada. Tal como está, forall_delta no exige una respuesta a cada experimento; además el estimador set-valued I(O) no tiene un contrato de identificación aquí.

**Fortalecimiento concreto:** Introducir historias potenciales O^{delta}, una aplicación de inferencia definida en un espacio métrico común y leyes/controles compartidos. Demostrar equivalencia e identificabilidad relativa a la familia de sondas. Si sólo se quiere una relación estática, retirar el cuantificador experimental sin atribuirle fuerza causal.

### B04 · Obligación de tipado

**Canal observable y componente de conexión energética son objetos distintos.**

Fuente: `paper1/main.tex:522`.

A1 usa un mapa U→O; más adelante C es la terna (E,O,R); def:coexist usa clases de historias conectadas. No existe una equivalencia automática entre los tres. También se reutiliza t para profundidad y evolución física.

**Fortalecimiento concreto:** Usar C_obs para la lectura, M para el modelo experimental y C_alpha para el componente energético. Definir los mapas entre sus dominios. Separar profundidad n, tiempo t y horizonte tau antes de propagar unicidad a otros papers.

### B05 · Incongruencia de simetría

**El estimador general de autoíndice penaliza una permutación pasiva de nombres.**

Fuente: `paper8_first_person_subjectivity/main.tex:1271`.

Si Pi contiene el intercambio de dos candidatos y dist es variación total, q=(1,0) tiene máxima dominancia pero el factor 1-sup dist(pi q,q) es cero. La construcción de lesiones, en cambio, fija roles dentro del ensayo y renombra conjuntamente roles y referencias. No demuestra invariancia bajo cualquier permutación del estimador general.

**Fortalecimiento concreto:** Separar renombrado pasivo, reasignación causal y perturbación. Comparar estimaciones alineadas por el transporte inverso y exigir equivariancia del índice ganador; si se usa un subgrupo que fija roles, declararlo. Probar ambas transformaciones y conservar el trasplante causal como control negativo.

### B06 · Confusión identificativa

**La ganancia HistDep puede medir capacidad de modelo y no información histórica.**

Fuente: `paper7_operational_life_subjecthood/main.tex:280`.

G0 y G_hist no están relacionados formalmente en esta definición. Con c=Y_t binario balanceado, constantes en G0 y el predictor identidad en G_hist, el margen es1/2 aun sin ninguna información pasada adicional.

**Fortalecimiento concreto:** Definir riesgos Bayes respecto de las dos sigma-álgebras, o familias de capacidad igualada y una inclusión que permita ignorar el pasado. Separar ganancia informacional, ganancia de capacidad y dependencia causal. Verificar el control sin memoria con información actual suficiente.

### B07 · Contraejemplo a interpretación fuerte

**La puntuación de frontera no distingue por sí misma organización propia de amplitud de entrada.**

Fuente: `paper7_operational_life_subjecthood/main.tex:213`.

En x_next=u sobre[0,1], sham0, U_in={0}, U_out={1} y lectura identidad, Bound=1 uniformemente. La planta carece de memoria y de frontera endógena; satisface la fórmula de este descriptor aislado, no toda la clase de vida.

**Fortalecimiento concreto:** Emparejar magnitud/coste, soporte y efecto genérico de los controles; declarar la partición causal del sistema y qué estado organizacional se conserva o amenaza. Probar un contraste adicional ante una planta sin memoria. Conservar el descriptor como separación entre familias si no se añade ese contenido.

### B08 · Obligación causal

**Mejorar el retorno frente al brazo pasivo no identifica la procedencia interna del controlador.**

Fuente: `paper7_operational_life_subjecthood/main.tex:275`.

x_next=x/2+v con v=-x/4 produce el mismo lazo cerrado si el controlador se incluye en el sistema o si lo aplica un aparato externo. El contraste3/4 versus1/2 no diferencia esas dos descripciones.

**Fortalecimiento concreto:** Ampliar el estado con controlador, sensores y energía/coste; fijar la frontera causal. Ablacionar los enlaces internos manteniendo intacta la planta y prohibir ayuda externa mediante el contrato. La recuperación activa ya demostrada permanece válida; la lectura de autonomía interna necesita ese paso.

### B09 · Obstrucción y fortalecimiento

**La no determinación por cortes finitos tiene radio cero en la norma uniforme de lecturas de esta realización.**

Fuente: `paper2/main.tex:369`.

F_N usa los bits0..N y satisface ||F-F_N||_infty=3^(-(N+1))→0. Cada F_N es continua pero falla E2. Por tanto, el F exacto no está en el interior de E2 dentro de esta clase uniforme. No se sigue que todos los radios de Cop sean cero: se trata del predicado E2 y de esta clase/perturbación.

**Fortalecimiento concreto:** Probar robustez en una clase/norma que controle incrementos a todas las escalas. Si F tiene cota inferior c y Lip(G-F)<c, entonces |Gx-Gy|≥(c-Lip(G-F))d(x,y), y E2 persiste en cada fibra no trivial. Mantener separadas aproximación de valores y conservación estructural. Estimar o demostrar la cota global tiene obligaciones adicionales.

### B10 · Obligación de dominio

**Una ventaja de continuidad positiva puede cambiar de signo por el denominador.**

Fuente: `paper8_first_person_subjectivity/main.tex:1307`.

No se impone aquí score>=0. Ganador -2 y rival -3 dan gap1 y contraste -1 por el denominador1+score. La advertencia del apéndice excluye denominador cero, pero no asegura denominador positivo.

**Fortalecimiento concreto:** Declarar dominio, escala y positividad; o normalizar con una escala positiva fijada de modo que se conserve el signo del contraste. No elegir la transformación después de observar quién gana. Revisar igualmente la fórmula de valoración si R puede ser firmado.

### B11 · Obligación de calibración

**El1 de varios denominadores fija una escala de pérdida sin declararla.**

Fuente: `paper8_first_person_subjectivity/main.tex:532`.

Pérdidas(2,0) dan2/3; las mismas pérdidas en unidades multiplicadas por100 dan200/201. Un umbral3/4 cambia de decisión sin cambiar el orden ni el modelo. IX ya exige explícitamente s_R en unidades de pérdida para su margen.

**Fortalecimiento concreto:** Especificar una escala positiva con unidad para cada estimador y reglas de transporte de umbrales. Comprobar invariancia ante cambios de unidad. Si se adopta unidad convencional1, declararla y no atribuir invariancia a cambios que no transporten la calibración.

### B12 · Contrato entre papers

**La herencia temporal de Cop necesita distinguir pertenencia global y certificado de ventana.**

Fuente: `paper7_operational_life_subjecthood/main.tex:363`.

V incluye historias/admisibilidad y exclusión de atractor nulo, mientras VII introduce Cop(S,tau) heredado y VIII continúa esa notación. Una ventana finita no establece esas propiedades globales. No se acusa a la torre de fallar: necesita constar qué hipótesis analíticas la hacen válida globalmente.

**Fortalecimiento concreto:** Definir Cop_global y Cert_Cop(S,tau,protocolo) sin identificarlos. Para recuperar un teorema global desde ventanas crecientes, exigir testigos compatibles, márgenes uniformes y un argumento de compacidad/cierre; no basta cada ventana con testigos diferentes.

### B13 · Límite de inferencia

**Replay determinista no es un test suficiente de la identidad proyectiva.**

Fuente: `paper4/main.tex:250`.

Una tabla determinista sin memoria puede repetir exactamente salidas ante la misma entrada/semilla. Eso verifica reproducción de software, no ramificación, resistencia o unicidad energética. El nombre de P4 se presta a importar un alcance que el protocolo no mide.

**Fortalecimiento concreto:** Nombrar la salida como reproducibilidad condicionada y conectar su utilidad a hipótesis concretas del experimento. Añadir contrastes de memoria, familias de sondas y controles de observación insuficiente cuando se ensaye identidad estructural.

### B14 · Obligación comparativa

**La jerarquía de modelos depende de familias y penalizaciones aún no canónicas.**

Fuente: `paper9_phenomenal_bridge_organization/main.tex:902`.

Omega cuenta mecanismos, tamaño de híbrido y slack. Una reparametrización puede cambiar esa cuenta sin cambiar el predictor. La positividad del margen sólo derrota la familia declarada. Para W1⊆W2, el mejor margen frente a W2 no puede ser mayor que frente a W1 bajo la misma pérdida.

**Fortalecimiento concreto:** Prerregistrar familias, acceso a información, código/coste y equivalencias de representación. Probar cotas analíticas contra clases definidas por propiedades, con sensibilidad a su ampliación y controles de igual acceso. No presentar los nombres memory-only/workspace/policy como clases matemáticas sin definirlas.

### B15 · Precisión de objetos

**El conjunto convexo de proyección y el límite inverso comparten notación sin ser el mismo objeto.**

Fuente: `basecore/core/sections/01_foundation_from_core.tex:36`.

H1 usa I cerrado convexo; la parte proyectiva define Id como límite, con realizaciones ramificadas y no convexas. El propio modelo de extensión ya usa embebimientos explícitos. No hay una contradicción por reutilizar un símbolo, pero no se pueden transportar hipótesis de convexidad o contracción entre ambos sin una aplicación.

**Fortalecimiento concreto:** Reservar C_proj para el conjunto convexo, I_inv para el límite y A para el soporte. Especificar embebimiento y operador que preserva A. Separar contracción en cada rama, familia de equilibrios y atractor bajo controles variables.

## Resultado analítico central: robustez de E2

En la realización de PaperII, sean

`F(b)=sum_{j>=0} 2 b_j/3^(j+1)` y `F_N(b)=sum_{j=0}^N 2 b_j/3^(j+1)`.

El máximo error lo alcanza una cola de unos y vale `3^(-(N+1))`. Para cualquier radio uniforme positivo se elige N con error menor que ese radio. Sin embargo, F_N factoriza por el corte N y falla E2. Las aproximaciones mantienen continuidad, codominio y aproximación sumable, pero pierden esa propiedad. En esta clase de lecturas continuas, la distancia de F al conjunto de fallo de E2 es por ello cero.

La conclusión no invalida F ni el teorema de su realización. Tampoco prueba que los seis radios de V sean cero: sus clases y predicados no son idénticos. Identifica una obligación que no puede resolverse cambiando palabras. Para robustez estructural, usar control de incrementos: si `|F(x)-F(y)|>=c d(x,y)` y `Lip(G-F)<c`, la desigualdad triangular inversa da `|G(x)-G(y)|>=(c-Lip(G-F))d(x,y)>0`. Cada fibra canónica que contiene dos puntos sigue separada, de modo que G tampoco factoriza por un corte. En el ejemplo ternario c=1 sirve. F_N no es pequeña en esta seminorma: para dos historias que difieren sólo en el bit N+1, el cociente incremental del error vale2. Así se entiende por qué la aproximación uniforme y la protección multiescala son tareas distintas.

La seminorma controla diferencias y no constantes; añadir un anclaje de valor si se requiere una norma completa. La factibilidad y el codominio de G deben imponerse por separado. No se atribuye a datos finitos una certificación global de esta hipótesis. Su prueba analítica sobre una familia de operadores sería un fortalecimiento sustantivo del marco.

## Cómo conservar el programa y aumentar su fuerza

Conservar una propuesta no exige fingir que su formulación universal anterior está probada. La forma de conservarla es dar un lugar explícito a su objetivo, probar el mayor dominio alcanzable y registrar las hipótesis todavía necesarias. Si aparece una obstrucción, ella también es un resultado del programa y guía una extensión que debe justificarse.

Orden recomendado después de las dos auditorías:

1. **Fijar los tipos y cuantificadores compartidos.** Estado, historia temporal, profundidad de corte, soporte, objeto inverso, candidato y conjunto de intervención. Conservar labels/IDs; modificar nombres visibles sólo mediante una correspondencia documentada.
2. **Resolver primero verdad y demostración.** Incorporar las obligaciones A de la primera pasada y B01–03/B05/B09. Fortalecer la regularidad multiescala y comprobar que las clases de perturbación admitidas no hacen vacíos los enunciados. No reemplazar una afirmación por una definición que asuma su conclusión.
3. **Cerrar los puentes de identificación.** B06–08/B12–14: controles igualados, frontera causal, ley de población, presupuesto de información y realizaciones conjuntas. Conservar los resultados locales de la torre y sus controles negativos; no extenderlos a una clase completa sin los predicados restantes.
4. **Unificar calibración y nomenclatura técnica.** Denominadores positivos, unidades, escalas, métricas y reglas ante dato indefinido. Los nombres deben describir lo medido: componente energético, discriminación entre familias de intervención, ganancia predictiva, control realimentado, clase de respuestas. Las lecturas de identidad, vida o experiencia se conservan como interpretación o como objetivo formal distinto, no se eliminan.
5. **Propagar a todo el documento y a dependencias.** Resúmenes, tablas, predicciones, pruebas, anexos, glosario, registro y PDF. El texto interpretativo final debe enlazar con resultados y obligaciones, sin reintroducir afirmaciones más fuertes como si fueran consecuencias. Separar los protocolos históricos de la versión matemática actual.
6. **Aceptar con evidencia, no con recuento de tests.** Cada punto corregido necesita una cuenta, prueba o cambio editorial justificado y controles de regresión. Compilar y verificar después; revisión independiente antes de la publicación correspondiente. Un detector automático de lenguaje no demuestra concordancia matemática universal.

## Aspectos revisados que no se convierten en errores

- El núcleo de proyección/contracción de BaseCore explicita completitud, convexidad y norma menor que1. No se encontró en esta pasada un contraejemplo a esas demostraciones bajo sus hipótesis.
- PaperX declara gamma en[1/2,1], no sólo gamma>=1/2. La cota de diferencia de pérdidas por fuga sí es compatible con ese rango; sería incorrecto denunciarla omitiendo su definición.
- Las pruebas de lesiones nativas declaran que las permutaciones dentro del ensayo fijan roles y que un renombrado global transporta referencias. B05 pide extender esa precisión al estimador general; no refuta la construcción local.
- El parentesco entre resultados por ramas no da contracción global entre todos los perfiles; los teoremas de la torre especifican por rama. B15 exige conservar esa condición en usos posteriores.
- No se usa la falta de prueba para descartar el programa. Se distingue entre un objeto definido, un resultado condicional probado, una realización y una interpretación.

## Entrega, fronteras y trazabilidad

Sólo se crean este informe y su recibo de verificación, y se añade una entrada al ledger único. Los documentos anteriores se preservan por hash. No se cambian fuentes teóricas, PDF, macros, registro, runtime, README, instrucciones ni áreas congeladas. No se hace commit/push. Temporales, protocolo y cuentas están en `E:/QICN-PRESERVACION/2026-11-11-auditoria-estructural`.

Se conservan los veredictos científicos previos: v25/v26 `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`; v27/v28/v30 `BLOCKED_MULTIPLE_GATES`; v31 `BLOCKED_FOUNDATION_FIRST_GATES`; `external_support_certified=false`. No se ha ejecutado un nuevo adjudicador científico, Lean o una campaña. Las verificaciones documentales de frontera y conservación se registran en el recibo; no deciden las15 observaciones.

Cierre observado: raíz3/3 y `V35 all legacy verification: PASS; passed=6/6` en la copia aislada. Comparación SHA-256: doce fuentes y sus PDF, once inputs de BaseCore,76superficies congeladas y los dos documentos de la primera auditoría sin cambios. Nueve grupos de cuentas exactas sin discrepancias; `git diff --check` sin errores. Sólo informe, recibo y ledger nuevos de esta pasada. No se ha comprobado una propiedad científica por esos resultados de software.
