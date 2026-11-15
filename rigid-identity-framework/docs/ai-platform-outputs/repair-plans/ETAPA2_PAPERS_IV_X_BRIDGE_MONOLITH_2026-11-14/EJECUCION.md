# Etapa 2 — contratos descendentes y edición conjunta

Trabajo local en `codex/etapa2-papers4-10-bridge-monolith`, desde
`f98547041971d9ea52ac81270b6eeaaa97c53bc8`. Sin publicación. `main` debe seguir
en `05f8e55`. La aceptación efectiva se determina por los catorce pasos ordenados
de `VERIFICACION_FINAL.json`, la conservación y el commit local; este texto no
sustituye esos recibos. `external_support_certified=false`.

## Conservación, contexto y baseline

Se leyeron AGENTS, las cinco fuentes de verdad en el orden solicitado,
INSTRUCCIONES, cierre de Ruta 5B/Ruta 6/Etapa 1, su ejecución, salud del corpus
y overlay I_int. Se contrastaron BaseCore, I–III y los ocho descendentes, sus
registros, formalizaciones referidas y herramientas de extracción/compilación.
Las áreas congeladas, BaseCore/I–III y todos los `.lean` quedan preservados.
En III sólo cambia la etiqueta del registro de la proposición profinita.

El arranque contenía tres resultados generados por autopruebas criptográficas y
dos directorios pycache. Se copiaron/verificaron antes de restaurar únicamente
esos resultados generados y trasladar los cachés a `preserved-start/`. Las
modificaciones no se perdieron ni se confundieron con nuevos secretos del usuario.
Inventario inicial: 881 archivos versionados; registro 912, macros 383, cobertura
425, Lean 35 fuentes/271 declaraciones. Baseline: 11 pasos, sin fallos, 224.89 s;
33 suites matemáticas, raíz 3/3 y release 6/6. Véanse BASELINE y CONSERVACION.

Temporales y salidas literales:
`E:/QICN-PRESERVACION/2026-11-14-etapa2-papers4-10-bridge-monolith/`.
El prerregistro original quedó congelado antes de editar. El suplemento previo
a los controles completos de IX explicita los efectos cruzados descubiertos
al calcular las lesiones; su hash SHA-256 es
`509a17acbf06f0f3be7e2a9854b332241214e3061603bf5f9d5df757e177ab9f`.

## Resultados, hipótesis y controles

| Superficie | Resultado demostrado o contrato corregido | Control negativo / límite |
|---|---|---|
| III, registro | Cota profinita condicional: aplicar C3 al par testigo con un extremo nulo y constante inferior certificada. Se corrige el overlay, no la prueba. | Una cota superior Lipschitz no da coercividad; no se deriva la constante para toda lectura profinita. |
| V, factorización | Categoría Moore tipada, productos sobreyectivos, puertos locales y respuestas a palabras de intervención. Atomicidad del separador implica factor trivial; el separador cuantitativo fuerza error al menos sigma/2. | Sistema hold/product exacto cuando falla la atomicidad; mensajes entre factores permiten reproducir swap. Atomicidad universal no se deriva de rigidez sola. |
| V, realización | Cuatro estados, dos puertos y hold/swap. Todos los 24 productos 2×2 tienen error minimax 1/2, alcanzado por punto medio. | No se presupone que el ínfimo se alcance; aquí se construye su minimizador. |
| VIII, índice | Mínimo compacto de diferencias de pérdidas; margen positivo normalizado con escala s_I>0. Continuidad y cotas 2 eta / 2 eta/s_I; ganador persiste si 2 eta<gap. | Empate da puntuación cero; sin regularidad de las pérdidas no se afirma continuidad. |
| VIII, procedencia | Isomorfismo de DAG causal, preparación, pesos, puertos y pérdidas implica transporte de sumas de caminos y atribución normalizada. No se define el morfismo por el valor del estimador. | Cambiar el progenitor manteniendo referencias cambia atribución 1→0; renombrar toda la estructura conserva su valor transportado. Denominador cero es indefinido. |
| VIII, reducción | Cinco coordenadas reconstruyen las dos derivadas bajo factorización de respuestas y pérdidas por la proyección. Criterio necesario y suficiente: constancia sobre fibras. | Misma lectura primaria y distinta intervención: error inevitable ≥1/2. Indicadores de umbral sólo son estables con holgura estricta o contrato estructural equivalente. |
| IX, soporte conjunto | Extensión cuártica de cuatro puertos sobre S8 nativo; soporte compacto invariante, contracción de fibra ≤13/16, cuerpo ≤61/64 y mundo ≤3/4. | No se afirma contracción entre ramas de índice distintas ni que una proyección herede automáticamente integración global. |
| IX, integración global | Todos los productos sobreyectivos del soporte ampliado: error ≥min(1/384,3^-9/2,1/128)=1/39366; certificado estricto 1/78732. Sector comparador no vacío. | Sector intrínseco sin mensajes distinto de la predicción B9, donde ambos modelos reciben todos los cables e índice. |
| IX, vida e índice | Geometría de núcleo con margen adicional 3/256; protocolos nativos en sección cero preservan el siete-vector (1,1/2,1/2,1/3,64/266529,1,179/464). | Extensión de horizonte declara tiempos de consulta y padding con peso cero; no se deduce monotonía para cualquier horizonte. |
| IX, contraste reservado | Cuatro raíces frescas, preparación corporal/mundial y consecuencia física. Frente a toda suma de funciones de subconjuntos propios: error exacto 4 xi4=1/262144. Mismo acceso a cuatro raíces y retención; gramática causal explícita. | Réplica con unión conjunta de cuatro raíces reproduce exactamente y anula margen; no se la excluye por el nombre de su arquitectura. |
| IX, controles de memoria | Cuatro signos retenidos en coordenadas Hilbert nativas 6–9; consulta tardía y salida del propio mundo. Reset de un payload elimina la interacción de cuarto orden. | La prueba anterior de uno frente a dos bits queda sólo como control de capacidad; no fundamenta A ni B9. |
| IX, lesiones | Seis tareas y plantillas calculadas; V deja A=3/4, W deja A=1/2 y E deja A=0. Se conservan efectos cruzados, escala fija, matriz de caídas de rango seis. | Tolerancia cero sólo sin ruido; no se infiere robustez de un indicador por nombrarlo continuo. Umbral del nuevo binding 1/8, caída mínima 1/4. |
| IX, independencia | Las 64 configuraciones de ganancias de cabezas de medición producen transcripciones y pérdidas diferentes; familia semántica instrumental declarada, interfaz primitiva fija. | Vincular dos ganancias destruye los patrones discordantes. No se afirma independencia de B1–B10 ni del gate conjuntivo. |
| IX, registro | Codificar payloads completos con evaluación local conserva patrones; digest verificable sin asumir inyectividad matemática del hash. | Restricción conjuntiva o comparación compartida acopla filas; no hay independencia de todo el registro BPF. |
| IX, existencia | Realización no degenerada del binding operacional completado; transporte en tres modos, seis tareas, ocho factores positivos y coste común acotado. Margen penalizado >3 xi4. | Sintético matemático; no prueba fenomenalidad, superioridad frente a todo controlador ni evidencia externa. Ampliar rivales a réplica exacta elimina el resultado estricto. |
| IV/VI/VII/X | Se separan historia/estado/profundidad, objeto Hausdorff, métricas acotadas, canales conmutativos y coercividad. Contratos estadísticos no reciben compacidad por decreto. | Iteraciones no son tiempo físico; frontera del disco no recibe Jacobiano global; energía/fase auxiliares siguen congeladas por iteración. |
| X | Se conserva la prueba de riesgo con abstención gamma≥1/2, balance e hipótesis de fuga exactas. | always-tie ya no tiene riesgo cero; (1-p)/2 requiere independencia fuera de fuga, max(0,1/2-p) permite fuga selectiva. |
| Bridge | Se conserva como unidad independiente; continuidad/nulidad de asignación requieren sus propias hipótesis. Contramodelo con sector de objetos independiente: coste 1 y distancia 1/16 dan masa finita 16. | No se confunde ausencia de certificado con predicado falso; cambiar un objeto no es cambiar un punto de una trayectoria. |

Los resultados nuevos son condicionales en sus dominios explícitos. Las etiquetas
filosóficas de B3–B8 y su interpretación experiencial siguen siendo propuestas,
no consecuencias de las cotas. La extensión prueba un binding operacional
concreto; no adjudica entre un sistema y otro causalmente idéntico.

## Registro y cobertura

Extracción estructural externa, comparación contra extracción baseline y fusión
por etiqueta/ocurrencia. Se traducen dependencias a los IDs curados preservados,
incluidos los IDs históricos `criterion`/`conjecture` cuyo tipo activo ahora es
`theorem`. No se regeneró sobrescribiendo el registro curado. Los campos no
intervenidos y el prefijo íntegro de sus historias se conservan.

- 912 IDs anteriores +9 nuevos =921. Macros: 383, archivo idéntico byte a byte.
- 436 objetivos: 10 EXACT_MATCH, 51 FINITE_OR_PARTIAL_KERNEL,
  359 PENDING_MATHLIB y 16 EMPIRICAL_OR_PROTOCOL_BOUNDED.
- Lean permanece 35/271. No se eleva una correspondencia por tener una prueba
  Python o un nuevo título de teorema.
- Los 15 controles REQUIRED_AUDIT_COVERAGE siguen presentes. Los ocho overlays
  intervenidos conservan la crítica histórica y el estado de revisión pendiente.

FCR_SYNC y COVERAGE_REVIEW detallan cada cambio. CORPUS_HEALTH_REPORT es el
informe regenerado, no una revisión matemática independiente.

## Reconstrucción y verificación

Se reconstruyen los ocho documentos y el monolito en E:, con las fuentes
identificadas por hash. PDF y fuentes generadas se adoptan sólo después de
verificar referencias, estructura, personalizaciones del preámbulo y logs.
Paper X no contiene bibliografía ni citas: no genera main.bcf; Biber es
inaplicable en esa unidad. Se conserva el intento fallido y se ejecutan los
tres pases de LaTeX necesarios, sin añadir un sistema bibliográfico artificial.
COMPILACION contiene recetas, tiempos, incidencias y hashes de nueve PDF.

La suite nueva tiene 31 controles agrupados; se mantienen las 33 suites
anteriores y la batería pasa a 34. VERIFICACION_FINAL registra la ejecución
secuencial final de las catorce puertas; Lean fresco usa Windows nativo, un
proceso y paquetes fijados en E:. Los controles que reescriben fixtures e
informes se aíslan: no se adoptan claves de autoprueba ni adjudicaciones
aleatorias como nuevos datos del corpus.

## Deuda que permanece

1. Etapa 3: mecanizar los 11 objetivos adicionales de esta etapa y las firmas
   estabilizadas de Etapa 1. Mantener traducción exacta de productos, topología,
   cuantificadores, continuidad, causalidad y familias de comparación. Los
   controles finitos y el núcleo Lean existente no prueban esos teoremas nuevos.
2. Etapa 4: ampliar familias rivales de igual acceso/coste, contrastar con
   realizaciones alternativas, instrumentar ruido/fronteras, medir calibración
   física y recoger datos independientes. Derivar atomicidad donde se pretenda
   generalidad. La réplica irrestricta y su obstrucción son parte del programa.
3. Etapa 5: revisión matemática externa, auditoría metodológica y replicación
   antes de cualquier promoción pública de soporte. No se publica en esta fase.

Los veredictos crudos se conservan en RELEASE_GATES; superar la ingeniería
interna no convierte BLOCKED_MULTIPLE_GATES o BLOCKED_FOUNDATION_FIRST_GATES en
aprobaciones. Siempre `external_support_certified=false`.
