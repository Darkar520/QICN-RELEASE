# Decisión de ubicación y frontera del paquete QICNLean

## Comparación

| Candidato | Visibilidad | Frontera y riesgo | Decisión |
|---|---|---|---|
| lean/ en raíz | Alta | Mezcla el tier de gobierno/publicación con fuentes matemáticas que AGENTS sitúa en el paquete interior | Descartado |
| QICNLean/ en raíz | Alta | Mismo conflicto de tier; el nombre también se confundiría con el directorio de módulos de Lake | Descartado |
| rigid-identity-framework/formal/ | Buena con enlace raíz | Válido, pero nombre ambiguo para un paquete Lake frente a otras formalizaciones futuras | Alternativa válida |
| rigid-identity-framework/lean/ | Alta mediante enlace prominente raíz | Paquete Lake autocontenido en el tier matemático, claramente distinguido de BaseCore y de los papers | Elegido |

La elección respeta AGENTS y las seis capas de layer_boundaries.v1.json:
formalización acompañante bajo hipótesis, sin sustituir BaseCore ni promover
la revisión de kernel a validación externa. No se modifica ese contrato congelado.
README raíz enlazará directamente al paquete, configuración, cobertura y comandos.
El Dockerfile y CI actuales verifican gobierno/release; no ejecutan Lean y no se
presentarán como CI formal. La reproducción Lean queda explícita y fijada.

## Integridad y transición

- Mover sólo los 32 archivos Lean y configuración/documentación inventariados,
  conservando bytes e historial; Git debe detectar renombres, no duplicación.
- Una sola ubicación contiene fuentes activas. La ruta vieja tendrá como máximo
  una nota de transición, sin Lean duplicado ni un segundo lakefile activo.
- Ignorar globalmente .lake/ y mantener .cache/ ignorado. Dependencias y objetos
  se conservan en E:, no se copian al repositorio ni se recorren al inventariar.
- .lake es una junction hacia E:/QICN-LEAN/v4.31.0-desktop: verificar tipo y
  destino antes de separar el enlace, sin copiar/eliminar recursivamente su
  contenido. Crear el enlace de almacenamiento en la ubicación nueva.
- verify-lean.py resolverá la ubicación nueva; inventory-traceability reconocerá
  el agregado y clasificará paquete/configuración como fuente técnica activa.
- Los recibos históricos conservan rutas y hashes originales. reproduce_p5.py
  extrae un CHECKPOINT Git fijado: su ruta antigua sigue siendo correcta dentro
  de esa instantánea y NO debe sustituirse por la ruta moderna. Se documentará
  esta diferencia; el script y las recetas por checkpoint permanecen intactos.

## Fidelidad

La biblioteca existente ya contiene proyección convexa Hilbert real general,
Banach abstracto y continuidad/compacidad del atractor afín. El bloque nuevo
reutilizará esos resultados; añadirá la interfaz cerrada real/compleja,
familias contractivas generales y topología del límite inverso infinito.
La matriz distingue componentes analíticas, núcleos finitos y equivalencia
completa por ID. Un total de 250 teoremas Lean no significa 250/419 claims
completos del manuscrito. Las obligaciones empíricas conservan su estado.
