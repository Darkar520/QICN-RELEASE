# Prerregistro congelado: separador estructural y acoplamiento ampliado
Fecha: 2026-11-17. Rama: codex/fase-cientifica-atomic-puente, base 5769ecf.

## Alcance y orden
Se preserva la fase A en su propia rama. Esta fase no importa su Lean experimental; no modifica main, release/, corpus/, artifacts/, paquetes históricos ni QICN-SYSTEM. No push ni merge.
Primero se fijan las hipótesis, después las fuentes y controles exactos, finalmente compilación y puertas en E:. Este archivo no se cambia tras ejecutar los controles; cualquier desviación se documenta en EJECUCION.md.

## Hipótesis y resultados esperados
1. En X=F_p^d, d>=2, una transición A con polinomio mínimo irreducible de grado d implica observabilidad desde todo funcional lineal no nulo con palabras A^k, 0<=k<d. No se asume que los puertos separan. Lecturas normalizadas tienen separación >=1/(p-1); el error de producto independiente es >=1/[2(p-1)], y delta_int=1/[4(p-1)]. Un cociente operacional fiel no identifica estados distintos. La irreducibilidad es necesaria para la garantía uniforme sobre todos los funcionales, no para cada sistema observable particular. Control: A=Id con puertos coordenados admite producto exacto. Se conserva hold/swap y su empate con comunicación.
2. Se acoplará la respuesta cuártica existente a un bit escribible retenido leído por truncamiento T_d, antes de la consecuencia observable. Se calculará un contraste balanceado de cinco raíces. Se espera margen positivo sólo contra clases de ancestría propia de cinco raíces y réplicas parciales sin la arista de acoplamiento; híbridos con comunicación capaces de reconstruir toda la interacción deben empatar. Mismo presupuesto global, lenguaje y pérdida para ambas partes; no se penaliza el nombre del rival. No se afirma derrotar todo híbrido de estado compartido.
3. Los prerrequisitos del puente separarán definiciones operacionales, hipótesis puente falsables, teoremas internos y adjudicación externa. H1 usará imagen compacta Y, no sobreyección desde compacto a todo R^n; H3 no se deduce de nombres de invariantes. El fallo H4 histórico (-0.45) se conserva.

## Métricas, población y controles
Separación: máximo error absoluto sobre estados/palabras finitos, lecturas adimensionales normalizadas. Prueba general algebraica más enumeración exacta p=2,d=2. Acoplamiento: 32 preparaciones equiprobables, ruido acotado explícito, coste de grafo compartido, margen rival-candidato. Fracciones exactas; no estadística inferencial ni evidencia externa.
Controles obligatorios: identidad/producto, comunicación hold/swap, sham, corte T_d, réplica parcial cuatro raíces, híbrido con ramas de ancestría propia, réplica total al mismo coste. Se espera cero contraste en sham/corte, error positivo restringido y empate total. El estado retenido debe cambiar una consecuencia de la planta; una lectura paralela en crudo no satisface el objetivo.

## Parada y aceptación
Parar ante contradicción matemática, invasión de áreas congeladas o fallo de una puerta; no relajar verificadores para producir PASS. Si una construcción no preserva una cota heredada, declarar el dominio nuevo y probar su propia cota, sin transferir certificados por nombre. Lean serial y con protección de recursos; no repetir intentos tras OOM. Registrar cualquier reproducción pendiente separada del resultado matemático.
Compilar unidades modificadas y monolito, preservar IDs/metadatos, ampliar coverage sin nuevos EXACT_MATCH no mecanizados. Evidencia interna exclusivamente: external_support_certified=false. Un fallo o deuda no se convertirá en cierre científico.
