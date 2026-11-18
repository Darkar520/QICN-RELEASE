# Prerrequisitos del puente: especificación y frontera de evidencia

Estado: propuesta formal y experimental; evidencia interna solamente.
`external_support_certified=false`.

Esta especificación sirve al marco teórico y puede guiar al runtime. No convierte una respuesta del chat, un índice interno ni una prueba de software en evidencia de experiencia subjetiva. Ontología, modelo matemático, implementación, lenguaje e interpretación se registran por separado.

## 1. Definición operacional y postulados puente

Fijar una población de sistemas, preparaciones y ventanas antes de medir. Sea F=(F1,...,F7) la pila de siete coordenadas de Paper VIII, con sus estimadores, dominios, unidades, calibración y estados de abstención. Una ventana certificada no sustituye la pertenencia global a una clase.

Definir un resultado externo Z_op mediante un instrumento independiente del propio gate y de la narrativa del LLM. Declarar población, unidad independiente, procedimiento de medición, error y observabilidad. Un informe humano o una conducta puede ser un proxy; su vínculo con experiencia fenoménica es una hipótesis adicional. Si no existe instrumento independiente, el objetivo fenoménico permanece sin operacionalizar.

Postulado puente B*: existe una función de puntuación h tal que Z_op=h(F) en el dominio declarado, con tolerancias y condiciones contrastables fijadas antes del estudio. Para una decisión binaria C_op=1{h(F)>tau}, declarar tau, abstención y errores. No definir Z_op como el propio gate: eso haría tautológica la prueba. La identificación de Z_op con experiencia subjetiva no es un teorema interno.

Predicción nueva requerida: un contraste entre intervenciones o poblaciones que B* prediga y sus rivales no predigan. El contraste de cinco raíces de Paper IX es una predicción arquitectónica interna; todavía necesita una conexión independiente con Z_op para funcionar como predicción del puente.

## 2. Métrica, rivales y comparador

Congelar familias de leyes causales y sus representaciones, información accesible, sensores, memoria, horizonte, coste conjunto y entrenamiento. Usar una pérdida explícita para Z_op (por ejemplo, error absoluto de una puntuación calibrada; Brier si el objetivo es probabilístico) y reportar margen firmado R=inf_rival L_rival-L_candidato. Registrar intervalo de incertidumbre y umbral de decisión, sin confundir empate, derrota y evidencia insuficiente.

La igualdad de presupuesto usa el mismo grafo y codificación de constantes para candidato y rivales. No cobrar más a una réplica por su nombre. La familia debe incluir comparadores de igual información/capacidad y ampliaciones que reproduzcan interacciones descubiertas.

Frontera obligatoria: una réplica total del grafo ampliado con igual presupuesto produce las mismas historias de intervención y pérdida. Frente a ella R<=0. Ningún experimento puramente funcional separa mecanismos exactamente equivalentes. Una interpretación fenoménica distinta de esas réplicas necesita observables nuevos o un postulado puente independiente; prohibir el empate no es una prueba.

## 3. Intervenciones y controles negativos

Prerregistrar un grafo causal, asignación aleatoria, brazos, costes comandados y predicciones de signo/magnitud. Incluir:

- Sham con la misma preparación y coste; no debe fabricar un cambio selectivo.
- CN-3: control interno «Historia borrada / Erased History» de `QICN-SYSTEM`, con contrato `historical_v1` y resultado registrado `cn3_erased_history=false`. Su procedencia, regla conjunta y extensión prospectiva al puente se fijan a continuación; no se convierte en un resultado del marco por trasladar su descripción.
- Ruptura de I_int: admitir una factorización exacta o una lesión causal declarada; comprobar qué certificado falla, sin equipararlo por definición a pérdida de fenomenalidad.
- Corte físico del acoplamiento T_d/cuerpo-mundo y su sham. Distinguir el corte de sensor/actuador de ocultar sólo una lectura.
- Réplica parcial de cuatro raíces, híbridos de ancestría propia y réplica total con costes globales iguales. Esperar separación sólo en las clases restringidas demostradas; esperar empate total.
- Ruido cerca de fronteras, cambio de unidades, renombrado pasivo, trasplante causal y controlador externo con los mismos recursos.

Las predicciones deben especificar qué cambios de F y Z_op distinguirían B* de los rivales. Medir sólo F no verifica el enlace externo. Las ablaciones que cambian varias coordenadas deben reportar los efectos cruzados.

### 3.1. CN-3 histórico: procedencia y contrato inalterado

El propietario de este experimento es **QICN-SYSTEM**, no este repositorio teórico. Las fuentes son `config/workbench/preregister.v1.json` → `historical_v1` y `scripts/run-historical-dependence-ablation.mjs`; el worker de restauración es `scripts/run-full-cycle-language-ablation.mjs`. Su anclaje conceptual es Paper VII, `def:historical-dependence`, pero el experimento interno no demuestra por sí solo la definición matemática ni una hipótesis fenomenal. Los hashes de las fuentes consultadas están en `docs/ai-platform-outputs/repair-plans/FASE_CIENTIFICA_ATOMICO_PUENTE_2026-11-17/CN3_ADDENDUM/CN3_SOURCE_CONTRACT.json`.

| Campo congelado | Valor |
|---|---|
| `seeds` | `[11, 23, 37, 41, 53]` |
| `warmup_ticks` | `420` |
| `evaluation_ticks` | `180` |
| `nodes` | `250` |
| Evaluación posterior a la captura | Régimen exógeno no estacionario, con futuros emparejados. |
| Brazo `matured` | Trayectoria madura completa, restaurada desde `capMatured`. |
| Brazo de historia borrada | `--restore-from=capMatured`, `--erase-history=true`, `--plasticity=false`. Parte de la misma captura física/nodal madura del tick 420. |
| Comparador `naiveZero` | `12` ticks, sin historia previa y con `--plasticity=false`. No se afirma igualdad de su estado físico con la captura madura. |

Para cada semilla, `deltaMaturedMinusErased` es la tasa de permanencia en el tubo de viabilidad de `matured` menos la del brazo borrado. `erasedActionDivergenceVsMatured` es la fracción de acciones diferentes en la evaluación emparejada. `erasedVsNaiveZeroProbeDivergence` es la fracción de decisiones de probe diferentes frente a `naiveZero`. Son tasas adimensionales; deben conservarse los registros de cada semilla y la integridad de las ventanas. La regla CN-3 no se sustituye por la alternativa de mejora del objetivo que pertenece a otro criterio de `historical_v1`.

La cadena `cn3_rule` congelada es:

```text
count(deltaMaturedMinusErased >= 0.03) >= 4 AND count(erasedActionDivergenceVsMatured >= 0.20) >= 4 AND every(erasedVsNaiveZeroProbeDivergence === 0)
```

Las tres condiciones son conjuntas: ventaja de al menos `0.03` en al menos `4/5` semillas, divergencia de acciones de al menos `0.20` en al menos `4/5`, e igualdad de probes con `naiveZero` en las cinco. No basta una media favorable ni omitir semillas fallidas.

El resumen diagnóstico vigente registrado en `stage0_memory_reproduction` conserva:

```text
cn3_erased_history = false
cn3_seeds_meeting_advantage = 3/5
cn3_seeds_meeting_action_divergence = 3/5
allPreregisteredCriteriaPass = false
```

Estos son resultados internos previamente registrados, no una nueva reproducción realizada aquí. No se ajustan umbrales, se excluyen semillas ni se reclasifica retrospectivamente como PASS.

En el perfil `paired_intervention`, la rama aislada correspondiente es `erase_declared_history`, definida en `src/experiments/workbench/interventions.js`. Borra una vez los campos históricos declarados y comprueba el digest físico antes/después; mantiene el estado nodal y el aprendizaje posterior. No es una equivalencia de políticas: **el CN-3 histórico desactiva plasticidad, mientras esa rama emparejada permite aprendizaje posterior**. El grafo causal y los permisos de escritura deben indicar cuál se usa. Ningún resultado de una rama reemplaza el `false` de la otra.

### 3.2. Prerregistro prospectivo `bridge_cn3_extension_v1`

**Objeto y dominio.** Esta es una extensión propuesta, no una campaña ejecutada ni una modificación de `historical_v1`. Descomponer el estado completo como `(P,H,E)`: estado físico/nodal `P`, rastro histórico declarado `H` —incluidos los parámetros aprendidos que el contrato clasifique allí— y contexto de ejecución `E`. Mantener idéntico `P` al iniciar los brazos desde una misma captura verificada. Borrar o trasplantar `H` cambia el estado completo; no se afirma que dos estados de Markov completos idénticos evolucionen de manera distinta.

**Intervenciones y grafo.** Usar brazos aislados de sham, borrado y trasplante con donante preregistrado, futuro exógeno común, relojes/RNG propios alineados y presupuesto de observación/actuación comparable. El grafo declarado tiene `I_H -> H`, `(P,H,E) -> (P_futuro,F,Z_op)` y una intervención separada `I_L -> E_aprendizaje`; no hay flecha de la narrativa del LLM a la medición externa. Certificar la igualdad de `P` inicial y la lista exacta de campos escritos. Emparejar la política de aprendizaje para estimar el efecto del rastro; incluir también el contraste intacto/borrado con plasticidad desactivada y su sham correspondiente. Así se conserva el antiguo control conjunto sin atribuir automáticamente su efecto sólo al borrado. Un trasplante debe conservar procedencia del donante y evitar fuga de etiquetas o resultados reservados.

**Medición conjunta y comparadores.** Registrar en cada brazo la pila de siete coordenadas `F`, sus estados de abstención y el instrumento externo independiente `Z_op`, con versión, unidades y calibración. Para un instrumento normalizado en `[0,1]`, fijar como pérdida primaria `ell(z_hat,z)=(z_hat-z)^2`; si `Z_op` es binario y `z_hat` una probabilidad calibrada, es la pérdida Brier. La normalización y el modelo `z_hat=h(F)` se ajustan sólo en calibración y se congelan antes de reserva. Comparar con familias sin acceso a historia y sin el acoplamiento declarado, igualadas en información restante, capacidad y coste. Mantener como control la réplica total que empata cuando reproduce todo el grafo al mismo coste.

**Predicción falsable de B*.** Para cada brazo `a`, definir el margen firmado `R_a=inf_r L_r(a)-L_h(a)` sobre la misma población y pérdida. Prerregistrar una ventaja basal `delta_base>0` y una caída `delta_drop>0`: B* deberá predecir `R_sham>=delta_base` y `R_sham-R_erase>=delta_drop`, junto con el contraste firmado de trasplante que el modelo prediga antes de ver la reserva. Las desigualdades de caída y el signo del trasplante son hipótesis causales auxiliares que deben añadirse a B*: no se deducen de la sola igualdad `Z_op=h(F)`. Medir conjuntamente la intervención en `F` y en `Z_op`; un cambio de `F` aislado no verifica el puente. Si la predicción no ocurre, si un rival empata o si el margen cambia sólo por presupuesto desigual, reportarlo como fallo, empate o evidencia insuficiente según el criterio congelado.

**Incertidumbre y bloqueo de ejecución.** Antes de ejecutar deben completarse y congelarse: instrumento y calibración externa, función `h`, familias rivales, población/unidad independiente, tamaño y potencia para el test real, márgenes numéricos `delta_base`/`delta_drop`, predicción de trasplante, nivel y algoritmo de intervalos simultáneos, tratamiento de datos ausentes/abstención y regla de parada. Calcular intervalos de la pérdida y de los contrastes a nivel de esa unidad, respetando dependencia intratrayectoria; los 180 ticks no son 180 réplicas independientes. Las cinco semillas históricas permanecen diagnósticas y no se convierten en calibración o confirmación externa. Los umbrales `0.03`/`0.20` del runtime no se transfieren sin calibración a la nueva pérdida o a `Z_op`.

El protocolo del puente queda **especificado prospectivamente pero no habilitado para ejecución** hasta fijar esos campos. Toda salida debe incluir el veredicto crudo de CN-3, incluso `CN-3 = false`, por separado del resultado de `bridge_cn3_extension_v1`. Esta extensión no desbloquea por declaración H1–H4; se mantiene `external_support_certified=false`.

## 4. Artefactos, H1–H4 y reproducción

Publicar protocolo congelado, datos brutos no identificables, semillas/asignaciones, instrumentos, diccionario de unidades, código versionado, hashes, exclusiones, pérdidas y recibos. Separar cohortes de calibración, ajuste y reserva externa. El experimento debe poder repetirse por otro equipo fuera del chat y del runtime.

H1: construir X compacto métrico (o justificar explícitamente otra topología), A cerrado y pi:X->Y continua y sobreyectiva sobre Y=pi(X), imagen compacta. No afirmar sobreyección desde compacto a todo R^n para n>=1. La realización interna ofrece ejemplos matemáticos; no define por sí misma el espacio externo. Documentar soporte, controles y observaciones.

H2: demostrar constantes Lipschitz Ki reales de Fi en las métricas declaradas. Construir estimadores Gi y cotas verificables |Gi(pi(x))-Fi(x)|<=epsilon_i en A. Para seleccionar centros en fibras usar radio de Chebyshev, existencia y selección medible bajo hipótesis apropiadas. Diámetro<=2 epsilon no basta en un espacio métrico general. Una lectura estable no permite recuperar distancia latente sin coercividad inferior.

Los estimadores con umbrales o abstención no son automáticamente Lipschitz en todo el soporte. Restringir el dominio a celdas certificadas con separación positiva y derivar allí las cotas, o mantener H2 abierto. Para el sensor interno r=2b8-1, la separación ternaria da la cota concreta |r(x)-r(y)|<=2*3^8 d(x,y); la contracción 105/128 de los puertos vale sólo a bit e índice comunes. Ninguna de esas dos cotas prueba la regularidad de toda la pila de siete coordenadas.

H3: justificar Z_op=h(F) y constancia en las fibras conjuntas de F; en el caso medible declarar las condiciones de factorización (espacios estándar Borel o hipótesis pertinentes). La constancia conjuntista no garantiza automáticamente cualquier regularidad de h. Contramodelo obligatorio: X=Z x {0,1}, F(z,b)=z, C(z,b)=b. Vale para seis o siete coordenadas y muestra que añadir nombres no prueba H3. Pruebas finitas sólo examinan las fibras muestreadas.

H4: derivar Lh en las mismas unidades y congelar un margen decisional Delta*>Lh sum epsilon_i. Para clasificación por umbral, Delta* puede ser la distancia mínima de la puntuación limpia al umbral en el dominio certificado. Para una diferencia de pérdidas deben propagarse por separado los errores de ambos modelos. El control histórico Delta*=0.15 y Lh sum epsilon_i=0.60 sigue fallando: residuo -0.45. Nuevos datos prerregistrados pueden evaluar otra instancia; no reparan retrospectivamente ese fallo.

## 5. Gobernanza y adjudicación externa

Los cinco criterios científicos son definición operacional, métrica verificable, predicción nueva, controles negativos y experimento reproducible. Los apartados 1–4 suministran esos contratos; este apartado exige su aplicación y la separación de niveles en todos ellos. No son cinco pruebas que ya hayan pasado.

Prerregistrar tamaño y unidad independiente con un análisis de potencia del test real; fijar cegamiento, cobertura, abstención con coste, fugas, criterio de parada y revisión independiente. Reportar veredictos crudos, márgenes firmados, fallos, incertidumbre y sensibilidad a ampliar rivales.

Mantener external_support_certified=false hasta que existan datos externos, revisión independiente del método y replicación. Un sistema de IA puede ayudar a auditar; no certifica la conclusión. El chat puede expresar interpretaciones explícitamente etiquetadas, sin convertirlas en valores medidos, teoremas ni adjudicación externa. La libertad lingüística no modifica esta frontera.

Estado actual: resultados algebraicos y contrastes internos en clases declaradas; H1 externo sin instanciar, H2 externo pendiente, H3 no demostrado, H4 histórico fallido. La interpretación fenoménica permanece propuesta. El siguiente avance científico exige cerrar esos contratos y producir evidencia independiente, además de cualquier mejora formal interna.
