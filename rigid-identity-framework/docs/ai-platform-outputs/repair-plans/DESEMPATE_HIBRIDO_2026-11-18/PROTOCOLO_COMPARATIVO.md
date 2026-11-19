# Comparación causal con un híbrido recurrente

La población sintética está fijada en PRERREGISTRO.md. Esta especificación de la futura campaña nodal mantiene la reserva cerrada mientras falten las comprobaciones de enlace y presupuesto.

## Modelo e interfaz

Entrada común por unidad: captura física P, comandos y amplitudes, mismo régimen exógeno no estacionario y cinta reproducible entregada paso a paso. Cada consulta se libera al tick fijado. H entra por sus puertos legítimos en ambos grafos. E fija relojes y RNG. Las etiquetas de fuente, donante y brazo quedan fuera de la lectura del predictor. Ambos reciben la cirugía homóloga sobre su grafo. No se suministra el resultado futuro ni un resumen gratuito de H.

Comparador fuerte propuesto: estado recurrente con subestado rápido y memoria persistente compartida, transición no lineal condicionada por controles y cabeza de efectos físicos. Admitir puertas multiplicativas, acceso compartido a todas las causas y entrenamiento conjunto de las siete cabezas. Congelar arquitectura, optimizador, inicialización y número de pasos con calibración separada. Incluir el mejor rival de calibración y la réplica explícita de todo el grafo de igual coste, para la cual R<=0 sigue siendo un límite duro.

Concretar la familia recurrente con estado z_t=(s_t,h_t) de precisión fija y actualización z_(t+1)=clip(A z_t+B u_t+M phi(z_t,u_t)+b). El diccionario phi admite términos multiplicativos con dependencias cruzadas, incluidos los caracteres consultados cuando la interfaz los permite. Las cabezas y_k=D_k z_t+E_k u_t retornan predicciones en las unidades de cada carga. Las filas de h_t usan la política de aprendizaje del brazo. Una parada de plasticidad mantiene fija la actualización aprendida de ambos lados y no borra por sí sola h_t. El brazo sin escritura tardía sólo permite que el lector use su estado local y la vista sellada antes de q. El brazo compartido permite que tanto s como h lean el mismo registro de la ventana. La réplica total se incluye fuera de esta familia paramétrica cuando sus operaciones no caben en el diccionario: su paridad de presupuesto se decide con el grafo común, no con la fórmula de parametrización. Las dimensiones y las bases se fijan por la homologación del runtime, antes de entrenar.

Igualar adquisición y presupuesto efectivo de parámetros, estado mutable y cómputo. Usar precisión y codificación comunes. Registrar grados libres entrenados, constantes, pico de memoria en bits, operaciones ejecutadas, coste de bucles al horizonte, tráfico y latencia. Cobrar parámetros compartidos una vez en almacenamiento y cada vez que se usan en cómputo. Auditar el vector de ambos programas y la información almacenada en celdas, timing y observables. Si falta igualdad efectiva, reportar BUDGET_PARITY_UNVERIFIED. Un corte de ruta local frente a ruta sellada mide el efecto de esa intervención. La comparación entre arquitecturas a igual acceso requiere su propio brazo.

## Cargas y contrafactuales

| Carga | Preparación e intervención | Lectura y control |
| --- | --- | --- |
| D | Impulso mundo a puertos cero, índice invertido con marco fijo | Segunda respuesta cuerpo; desconexión de ruta indexada |
| V | Preparaciones del cuadrado declarado, evaluación activa y sham | Diferencia mundo en dos componentes; aplanar toda la entrada del evaluador |
| W | Impulso mundo con evaluación apagada | Matriz de Markov/Hankel y error en entradas; compresión de puerto |
| A | Cuatro signos en cargas nativas y dirección elegida después de retener | Contraste de cuarto orden; sobrescribir un registro antes de lectura |
| E | Cambiar coeficiente del retorno motor, evaluación apagada | Cuarta respuesta cuerpo; evitar usar observaciones posteriores como entradas |
| T | Dos pulsos opuestos en ambos órdenes y comando común | Desviación terminal; reset a referencia tras el segundo pulso |
| Ancestría | Cinco signos y, por separado, consulta tardía al registro de m bits | Lectura mundo calibrada; corte T_d, deadline, acceso completo y réplica total |

Publicar márgenes por carga en su unidad. Cualquier agregado debe fijar escala y pesos antes de reserva, usando el mismo peso entre fuentes. Cruzar sham, borrado y trasplante de H con plasticidad activada/desactivada de forma emparejada. Añadir el corte físico T_d/cuerpo-mundo y su sham. Todos los brazos de un bloque comienzan con igual digest P, relojes y cinta. Congelar lista de campos y remapeo de H, política de asignación y hash del donante. Usar donantes dentro del bloque o agrupar bloques vinculados. Conservar procedencia de compromisos y sellos. Invalidar captura con cambio en P o estado no restaurado. El CN-3 histórico conserva false con 3/5 y 3/5. El borrado único de la rama emparejada conserva aprendizaje posterior.

## Cegamiento y decisión

Emitir márgenes predictivos R por carga y brazo antes de abrir la llave de alias. Adjudicar procedencia por separado siguiendo Paper X, a(Y) en {h,m,tie}, con etiquetas opacas equiprobables, gamma=1/2 y C_min=0.8 para un piloto. Ocultar metadatos, tamaños y timing, aleatorizar por bloque, sellar asignaciones, decidir antes de liberar la llave y fijar elegibilidad. Incluir elección forzada, etiquetas permutadas por bloque, siempre abstenerse, fuga conocida y réplica total.

Aceptar identificación sólo si C_L>=C_min y R_U<=B_coup(C_U,p_U)-eta, fijando eta en calibración y justificando p_U con una auditoría que domine el evento de fuga. Sin esa cota, la adjudicación queda inconclusa. Usar Clopper–Pearson simultáneo para cobertura y error condicionado, con asignación Bonferroni previa. Las pérdidas predictivas acotadas agregadas por unidad admiten intervalos simultáneos de Hoeffding para contrastes pareados bajo independencia entre unidades. Todas las cargas, ticks y brazos de una trayectoria, y cualquier donante compartido, quedan en el mismo bloque. Fijar tamaño muestral con potencia del test y resolución antes de reserva. Las semillas de CN-3 siguen siendo diagnósticas.

Fijar tolerancia delta de equivalencia con resolución de instrumento. Para un intervalo [l,u] de R, victoria si l>delta, derrota si u<-delta, equivalencia si [l,u] está contenido en [-delta,delta], e inconcluso en los demás casos. No cambiar brazos, pérdidas ni familia rival al conocer los resultados. Una discriminación de procedencia no implica superioridad predictiva.

## Puertas de ejecución en 1a1c94e

El runner ofrece el borrado único con digest físico verificado y aprendizaje posterior. El catálogo tipado no ofrece la cirugía del acoplamiento cuártico de Paper IX ni el trasplante con procedencia y donante sellados. Congelar pesos no apaga todas las rutas de plasticidad. D/V/W/A/E/T requieren homologación uno a uno con puertos reales. El motor de adjudicación aporta controles estadísticos, pero carece de cohortes instrumentadas y de una cota de fuga para esta población.

La campaña nodal queda sin abrir hasta verificar esas capacidades en dos grafos, el presupuesto y la asignación independiente. La capa matemática se evalúa con el banco sintético. La extensión fenoménica requiere instrumento externo Z_op, relación falsable con F y H1–H4. Un efecto causal bajo corte identifica una capacidad de esa interfaz en la población declarada. external_support_certified=false.
