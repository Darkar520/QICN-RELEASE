# Micro-cierre de Etapa 2 y publicación autorizada

Base: cdad4dd5f3a84d44a93f9ef6cbc98b5aef88c173; main inicial 05f8e55.
La solicitud del usuario audita dos ambigüedades y autoriza su corrección,
merge y push tras comprobar el cierre. Es autorización de esta edición,
no certificación científica ni sustitución de la revisión independiente.

## Intervención puntual

Se modifica únicamente la demostración de
`thm:bridge-quartic-global-certificate` en Paper IX:

1. La contracción 13/16 se refiere al soporte invariante ampliado, con
   puertos en [-1,1]^4 y |e_i|≤2. Sobre el ambiente [-2,2]^4 se afirma
   totalidad con cota 7/4<2, sin extender esa cota de contracción.
2. Washout t=1–4, pulso t=5, propagación y lectura t=6: seis transiciones.
   No son dos pasos adicionales después del pulso.

Todos los 921 enunciados, IDs, tipos y etiquetas permanecen. Macros 383 y
clasificaciones de cobertura 436 intactas (10 exactos, 51 parciales,
359 pendientes, 16 de protocolo). Se sincronizan sólo la prueba y sus
ubicaciones, y la huella del registro/ubicaciones en cobertura. Las 35
fuentes Lean, incluido el agregado, se comparan byte a byte con sus recibos.

## Auditoría y verificación

La auditoría reproducible comprueba la secuencia theorem/proof/label,
la aparición completa de ambas aclaraciones en fuente y sección monolítica,
la batería aislada, los pendientes y el alcance de un solo paper.
`AUDITORIA_MICRO.json`, `FCR_SYNC.json` y `LEAN_CONSERVATION.json` registran
esas comprobaciones. La edición no cambia hipótesis ni constantes.

Se reconstruyen IX y el volumen, preservando el preámbulo y la estructura
de tres partes, capítulo 8 Bridge y apéndices de X. El reporte de calidad
vigente debe detectar 435 páginas y cero errores críticos. Recetas y hashes
en COMPILACION. Los avisos Underfull hbox históricos no son desbordamientos.

La aceptación exige VERIFICACION_FINAL: raíz 3, prosa, corpus, macros,
nonclaims, overlays, riesgo/calidad, math 34, cobertura 436 y release 6,
en copia externa con entradas congeladas. Las fixtures aleatorias no se
adoptan en el árbol activo. Los comandos y salidas se conservan en
E:/QICN-PRESERVACION/2026-11-15-etapa2-microcierre-publicacion/logs/.

Tras esa puerta: commit local de cierre, merge preservando historia y push
autorizado a origin main. El intento de gitlab es no interactivo; un fallo
de autenticación/red se registra literalmente, sin force ni reparaciones
improvisadas, y permite continuar Etapa 3. PUBLICACION.json conserva el
resultado exacto y la identidad del main publicado; su recibo se incorpora
con la apertura local de Etapa 3 para no modificar main después de abrirla.

## Pendientes

Etapa 3 mecaniza las firmas estables. Etapa 4 amplía realizaciones,
comparadores y calibración; Etapa 5 revisa/replica independientemente.
La presente intervención sólo cierra dos ambigüedades de una demostración.
Los veredictos sintéticos/bloqueados se conservan crudos en RELEASE_GATES.
`external_support_certified=false`.
