# Corrección matemática: primera fase de fundamentos

Estado inicial: preregistro de intervención local, 2026-11-08. No es cierre del programa completo.

## Solicitud y alcance

Conservar todas las propuestas del marco, corregir afirmaciones incorrectas y aportar respaldo matemático. QICN-SYSTEM queda excluido. Esta fase resuelve BC-DISC y BC-BRIDGE y aporta un testigo común, completamente especificado, de dinámica contractiva, aproximación discreta y no colapso paramétrico. También corrige los contraejemplos elementales BC-APP y prueba explícitamente que H1–H4 no implican H5. Las demás cargas de la auditoría integral siguen abiertas y conservadas: no se declaran resueltas ni se eliminan propuestas.

Fuentes incluidas: BaseCore 01 (independencia H5), 10 (contraejemplos), 11 (dinámica discreta/puente), capítulo monolítico generado de BaseCore y entradas del registro formal realmente afectadas. Salidas técnicas y evidencia bajo esta carpeta. Se preservan las modificaciones locales preexistentes.

Excluidos: runtime, corpus histórico, canonical_core_legacy, release, artifacts, versiones congeladas y demás papers. Ninguna modificación de fuentes se presenta como cambio de la publicación congelada. No se inicia reorganización de carpetas.

## Decisiones matemáticas previas

1. Conservar la transición escrita x + eta R(x) + alpha B(x) + Gamma(u). El término identidad debe aparecer en toda estimación.
2. Usar el cubo C_N=[0,1]^N, dominio de las intensidades, con la norma de Hilbert normalizada ya definida. La cota de una matriz dirigida requiere grados de entrada y salida (o su norma espectral), no sólo entrada.
3. Dar condiciones de realimentación disipativa que impliquen contracción, en lugar de suponer que cualquier realimentación Lipschitz la produce.
4. Sustituir la ambigua norma de operador de mapas no lineales por discrepancia uniforme en un conjunto invariante declarado.
5. Separar una hipótesis genérica de consistencia de una clase explícita para la cual se deriva la tasa de aproximación. Construir un ejemplo no constante que satisfaga simultáneamente H1–H5 y las condiciones discretas.
6. No introducir conciencia, fenomenalidad, irreducibilidad ni CCR a partir de ese testigo. Esas propuestas permanecen en su alcance original y con sus cargas propias.

## Evidencia prevista, controles y parada

- Demostraciones completas: cota de la matriz de resonancia, contracción disipativa, error de puntos fijos, tasa de proyección para un perfil Lipschitz y testigo afín exacto.
- Controles negativos: incrementos nulos (identidad), resonancia expansiva sin disipación, grafo estrella dirigido y fallo de aproximación uniforme de identidad por promedios de celdas.
- Controles positivos: familia afín no constante, parámetros de entrada en extremos del intervalo, tamaños N distintos y fórmulas exactas de punto fijo/error.
- Las comprobaciones finitas son regresiones sintéticas; la prueba matemática consta en el texto. No se generan datos empíricos ni evidencia externa.
- Sincronización: comparación completa de los doce capítulos del ensamblador, conteos de entornos/labels antes y después y registro de cambios semánticos.
- Compilación de fuentes y monolito; gates obligatorios en copia aislada porque escriben fixtures/reportes. Ante fallo de gate, parar y comunicar el resultado crudo, sin parche para obtener PASS.
- No commit/push: la auditoría externa previa a publicación sigue pendiente. No se solicita aprobación de un plan sin resultado concreto.

## Estado de la auditoría anterior

La auditoría integral y sus hashes describen el estado anterior a esta reparación. Se conservan íntegros; los nuevos hashes y diferencias se registrarán aquí. Las 18 comprobaciones de contraejemplos originales también se conservarán como evidencia del estado auditado.
