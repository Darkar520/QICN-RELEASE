# Capa Lean y ruta concreta de mejora formal

## Alcance leído

Se leyeron las 19 fuentes locales de `docs/ai-platform-outputs/formal/lean/` (18 módulos de `QICNLean/` y su agregador), su configuración y el manifiesto de dependencias. Se distinguen de mathlib instalado y de los papers activos. Son explícitamente no canónicas y no certifican Cop completo. El manifiesto fija Lean/mathlib v4.31.0 y commit mathlib `fabf563a7c95a166b8d7b6efca11c8b4dc9d911f`.

## Avances que sí se reconocen

- El núcleo mecaniza composición de contracción y mapa no expansivo, y su consecuencia de punto fijo/convergencia mediante Banach.
- La instancia Hilbert pasa de subespacios a conjuntos convexos completos no vacíos; desarrolla la desigualdad variacional, unicidad de minimizadores y no expansividad.
- `QICNAttractorConcrete` deriva la continuidad del selector de punto fijo desde el forzamiento con constante (1−||K||)^−1 y la compacidad de su imagen. Mejora respecto del piloto que sólo asumía continuidad.
- `QICNNonCollapse` reconoce expresamente que H5⇒no colapso es un paso lógico, no una derivación de H5. La derivación por forzamiento en subespacios introduce hipótesis geométricas explícitas que sí hacen trabajo adicional.
- Las pruebas adversarias de exclusión convexa reconocen una ruta vacua: exigir admisibilidad de todo N y excluir el candidato que pertenece a N es inconsistente. La exploración posterior reduce el problema a comprobar el movimiento de un candidato lineal, y diferencia ese régimen del que excluye todas las constantes del soporte.
- El contraejemplo de proyección sobre un semiespacio muestra que una proyección convexa puede no descender al cociente por N. Es un resultado matemático negativo concreto, más útil que asumir ese descenso. En el comentario se llama e1 a un vector que el código define como (0,1); el cálculo y la línea elegida corresponden al eje horizontal. Es deuda de nombres, no una refutación del testigo.
- La dicotomía de subespacio ofrece una hipótesis de puente más débil que admisibilidad bilateral y un testigo compatible con exclusión estática. El archivo admite correctamente que excluye el régimen parcial en vez de resolverlo.
- El bloque complejo de rotación/contracción demuestra obstrucción de subespacios invariantes reales no triviales. Eso bloquea una factorización lineal concreta, no todas las representaciones no lineales.
- Los módulos `QICNCoupledSplitMargin*` desarrollan una cota positiva **sqrt(7)/14** para una clase explícita `DStarFactorization`: fibras de cada coordenada, reconstrucción separada y realización de esquinas del producto. El módulo universal sí cuantifica sobre toda esa clase formal y deriva las cotas de fibras de sus campos estructurales. Es un avance formal acotado que merece conservarse.

## Qué no queda cerrado

La clase D* ya exige lectura por coordenadas separadas, sin decodificador conjunto; la amplitud de funciones sobre tipos arbitrarios no elimina esa restricción. El anillo de estados iniciales, las trayectorias afines y su reproducción para todo tiempo no certifican automáticamente soporte invariante del sistema proyectado, seis invariantes de Paper V ni su independencia. No se ha demostrado que ésta sea la única operacionalización fiel del `I_int` canónico.

Conservar la cota como teorema relativo a esa clase. Para promoverla al paper se necesita definir allí D*, justificar científicamente la restricción del observador, mostrar no vacuidad con modelos explícitos y comparar con una clase alternativa que admita decodificador. Si al permitir ese decodificador desaparece el gap, eso informa sobre la dependencia del resultado respecto de la clase de representación; no debe ocultarse redefiniendo integración.

Se revisaron las fuentes locales para marcadores de prueba pendiente (`sorry`, `admit`) y axiomas locales: no aparecieron en esos módulos. La ausencia de esos marcadores es necesaria pero no sustituye una compilación ni auditoría de los axiomas transitivos.

## Resultado de la comprobación mecánica de esta sesión

Se intentó reconstruir los módulos QICN en una carpeta de outputs separada, reutilizando sólo las dependencias mathlib fijadas existentes. No se recompiló ni reparó mathlib, ni se modificaron las fuentes originales.

El primer módulo `QICNLean.Basic` terminó con **exit code 1** tras 177.42 segundos. Error crudo:

```text
QICNLean\Basic.lean:1:0: error: failed to read file '...\.lake\packages\mathlib\.lake\build\lib\lean\Mathlib\Tactic\Widget\LibraryRewrite.olean'
```

Se detuvo esa cadena en el primer fallo. `LEAN_RECHECK.json` conserva comando de compilador, fuente, hash, duración y error completo. **No se obtuvo una nueva confirmación de kernel para los 19 módulos.** La lectura de los argumentos y el intento de reproducción son hechos distintos. No se deduce del error de lectura que las pruebas sean matemáticamente falsas; la reproducibilidad del entorno local quedó bloqueada en esa dependencia. No se intentó descargar, regenerar ni parchear nada para hacer pasar el check.

## Inventario epistemológico operativo

| Objeto | Estado de esta auditoría | Lo que falta |
|---|---|---|
| Proyección convexa y contracción afín | argumento clásico correcto bajo hipótesis; fuente Lean presente | recheck mecánico completo bloqueado por dependencia |
| Compacidad de familia de equilibrios | prueba paramétrica válida | no equivale a soporte común invariante ante switching |
| H5 del BaseCore | supuesto explícito | escoger clase y demostrar condición geométrica aplicable |
| No colapso por exclusión estática | consecuencia válida y fuerte | justificar que el soporte de interés excluye N |
| Reducción al candidato c* | condicional útil | depende del régimen de admisibilidad sobre N |
| Cota D* de factorización | resultado relativo a clase explícita | vínculo con I_int canónico, comparadores más amplios y realización |
| Límite inverso/NFD | construcción/hipótesis | categorías, métricas finitas, realización e identificabilidad |
| Masa infinita CCR | propiedad de una clase de perturbaciones | costo, observables y prueba de imposibilidad/consistencia |
| Regímenes E1/E2 | inconsistencia bajo lectura total habitual | dominio correcto y modelo no vacío |
| Cop, vida, sujeto y bridge | especificaciones internas con cargas abiertas | testigos completos, métricas válidas y predicción diferencial |
| Experiencia, qualia, identidad personal | interpretaciones no derivadas | puente independiente y evidencia externa apropiada |
| Confinamiento lingüístico por “agujero negro” | metáfora | contrato semántico, lenguaje permitido y garantías mensurables |

## Plan priorizado, propuesto y no ejecutado

**Prioridad 0: congelar el objeto revisado.** Decidir qué documento es la versión vigente de cada definición. Tabla por resultado: fuente/hash, hipótesis, conclusión, prueba, contraejemplo, relación con código y versión pública. Propagar la corrección de Paper III y la cláusula transitiva de Paper V sólo tras revisar todas sus dependencias. No convertir la presente auditoría en una reparación automática.

**Prioridad 1: retirar inferencias inválidas antes de añadir módulos.** Corregir el empate gratis de Paper X; el operador discreto que omite la identidad; el puente v30 (compacto→R^n, centros, Lipschitz, h/h0, signos/covarianzas); y definir una asignación de régimen no vacía compatible con su lectura. El criterio de salida es una versión que sobreviva a los 18 contraejemplos adjuntos por cambio explícito de hipótesis o corrección de conclusión, sin desactivar los controles.

**Prioridad 2: construir un sistema completo pequeño.** Elegir estado, dinámica, perturbaciones, costo, soporte, observador y decodificadores. Probar cuáles invariantes satisface y cuáles no. Una construcción 2D con todas las obligaciones explícitas puede revelar más que miles de líneas de afirmaciones sobre capas superiores. Mantener el caso lineal y la clase D* como resultados relativos, sin afirmar Cop entero hasta verificar todas sus cargas.

**Prioridad 3: identificabilidad y sensibilidad.** Para cada métrica declarar objetivo, tipo, unidad, rango, invariancias, estimador, sesgo/error, condición de decisión y dependencia de parámetros. Probar módulo de continuidad o incertidumbre, no asignar constantes decorativas. Separar error de observación, cambio de estado, distancia a frontera y probabilidad de falso positivo. Publicar qué valores están medidos, derivados, fijados, simulados o no disponibles.

**Prioridad 4: experimento que pueda perder QICN.** Escoger una sola predicción estrecha sobre retención/recuperación/estabilidad en una tarea independiente del score. Fijar rivales ejecutables y presupuesto común. Datos de desarrollo para elegir umbrales; datos nuevos congelados para decidir. Registrar exclusiones como resultado de costo/fallo y no borrar los casos desfavorables. No hace falta reclutar humanos para comprobar primero una afirmación algorítmica; un experimento humano sería otra campaña con sus propios requisitos reales.

## Diseño mínimo de comprobaciones futuras

| Prueba | Manipulación y control | Resultado que informaría contra el modelo |
|---|---|---|
| Ablación de historia | borrar/barajar orden manteniendo cantidad de memoria y cómputo | mismo desempeño externo y misma recuperación pese al supuesto papel de historia |
| Intervención causal | forzar estado o conexión definida en un grafo causal explícito; sham de igual costo | efecto igual en target y sham o dependencia explicada por daño genérico |
| Ruido | amplitud y distribución congeladas; varias semillas independientes | ausencia de la cota de robustez prometida o fallo comparable al rival |
| Control negativo de integración | sistema desacoplado de complejidad y rendimiento comparables | pasa el mismo criterio de integración sin información cruzada requerida |
| Control de observador | mismo sistema con clases de decodificadores anidadas | resultado fuerte depende sólo de excluir un decodificador razonable |
| Retiquetado | permutación de nombres con dinámica conjugada; swap causal separado | métrica cambia por nombres, o no distingue cambio causal de mero renombrado |
| Regla de adjudicación | always-tie, constante, aleatoria y detector de filtración | cualquier regla trivial obtiene soporte positivo |
| Reproducibilidad | semillas publicadas, datos y versión fijada; repetición en otra máquina | no se regenera artefacto/resultado bajo tolerancia declarada |
| Canal lingüístico | estado del motor congelado; mismo paquete con/sin LLM y con petición adversaria | hechos, cifras o propiedades nuevas que no proceden del paquete |

No se ejecutó este programa experimental. Se entrega como vía concreta de mejora para los problemas encontrados, no como nuevas métricas, resultados ni funciones implementadas.
