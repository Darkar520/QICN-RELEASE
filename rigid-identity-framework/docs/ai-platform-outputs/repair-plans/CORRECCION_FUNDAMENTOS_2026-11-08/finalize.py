from pathlib import Path
import hashlib,json,subprocess

OUT=Path(__file__).resolve().parent;INNER=OUT.parents[3];ROOT=INNER.parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
verification=json.loads((OUT/'VERIFICATION.json').read_text(encoding='utf-8'))
assert len(verification['steps'])==13 and all(x['exit']==0 for x in verification['steps'])
copy_inner=Path(verification['copy']['copy_root'])/'rigid-identity-framework'
meta={name:json.loads((OUT/(name+'-pdf.json')).read_text(encoding='utf-8')) for name in ('basecore','monolithic')}
for name,stem in [('basecore','BASECORE'),('monolithic','QICN_MONOLITHIC')]:
    assert not meta[name]['undefined_reference_warning'] and not meta[name]['multiply_defined_warning']
    assert sha(INNER/name/(stem+'.pdf'))==meta[name]['pdf_sha256']

audit=INNER/'docs/ai-platform-outputs/analysis/AUDITORIA_INTEGRAL_CODEX_2026-11-08'
inventory=json.loads((audit/'INVENTARIO_INICIAL.json').read_text(encoding='utf-8-sig'))['files']
allowed={'rigid-identity-framework/basecore/core/sections/'+f for f in
         ('01_foundation_from_core.tex','10_appendix_counterexamples.tex','11_discrete_bridge.tex')}
allowed.update({'rigid-identity-framework/basecore/BASECORE.pdf','rigid-identity-framework/monolithic/QICN_MONOLITHIC.pdf',
                'rigid-identity-framework/monolithic/build/sections/01-basecore.tex'})
rows=[]
for row in inventory:
    current=sha(ROOT/row['path'])
    rows.append(dict(path=row['path'],before=row['sha256'],after=current,unchanged=current==row['sha256']))
unexpected=[r for r in rows if not r['unchanged'] and r['path'] not in allowed]
assert not unexpected,unexpected
assert sha(INNER/'registry/macros.jsonl')==sha(OUT/'baseline/registry/macros.jsonl')

compiled_sources=[]
for p in [INNER/'basecore/BASECORE.tex',*sorted((INNER/'basecore/core').rglob('*.tex')),
          INNER/'basecore/core/canonical_core_references.bib',INNER/'monolithic/QICN_MONOLITHIC.tex',
          *sorted((INNER/'monolithic/build/sections').glob('*.tex')),
          *sorted((INNER/'monolithic/preamble').glob('*.tex')),INNER/'release/references.bib']:
    rel=p.relative_to(INNER);q=copy_inner/rel
    assert p.read_bytes()==q.read_bytes(),str(rel)
    compiled_sources.append(dict(path=str(rel),sha256=sha(p)))
preservation=dict(audited_files=len(rows),unchanged=sum(r['unchanged'] for r in rows),
                  changed=[r for r in rows if not r['unchanged']],unexpected_changes=unexpected,
                  macro_registry_unchanged=True,compiled_sources_match_verification_copy=True,
                  runtime_modified_by_this_phase=False,commit_created=False,push_performed=False)
(OUT/'PRESERVATION.json').write_text(json.dumps(preservation,indent=2),encoding='utf-8')
(OUT/'COMPILED_SOURCE_HASHES.json').write_text(json.dumps(dict(sources=compiled_sources,pdfs=meta),indent=2),encoding='utf-8')

report=OUT/'INFORME_DE_FASE.md';text=report.read_text(encoding='utf-8')
text=text.replace('Estado: correcciones locales y controles matemáticos realizados; compilación final en curso al crear este informe.',
                  'Estado: primera fase local terminada y verificada, pendiente de revisión matemática externa.')
text=text.replace('Pendiente de completar al terminar las cadenas de compilación: resultados, páginas, hashes y advertencias se conservarán en `basecore-pdf.json`, `monolithic-pdf.json` y sus logs. Los PDF derivados locales se actualizan sólo tras completar la cadena de cada documento. El freeze histórico no se modifica.',
    'Ambas cadenas completas (pdflatex, biber, pdflatex, pdflatex) terminaron con exit 0. BaseCore: '+str(meta['basecore']['pages'])+' páginas; monolito: '+str(meta['monolithic']['pages'])+' páginas. No hay advertencias de referencias/citas indefinidas ni labels multiplicados en los logs finales. Los PDF derivados locales se actualizaron con esas compilaciones. Hashes y logs: `basecore-pdf.json`, `monolithic-pdf.json`, `COMPILED_SOURCE_HASHES.json` y archivos de log. El freeze histórico no se modificó.\n\n'
    'BaseCore conserva '+str(meta['basecore']['overfull_boxes'])+' avisos overfull (el log anterior tenía 6); el monolito registra '+str(meta['monolithic']['overfull_boxes'])+' (el anterior tenía 3). Son deuda tipográfica explícita, no errores de las demostraciones. MiKTeX también advierte sobre la versión de Windows del entorno. No se afirma una reconstrucción binaria idéntica entre máquinas. Los auxiliares antiguos de la carpeta original no se usaron como evidencia: los logs de esta compilación están aquí.\n\n'
    'Conservación: '+str(preservation['unchanged'])+'/'+str(len(rows))+' archivos del inventario teórico auditado permanecen idénticos; los cambios restantes pertenecen al alcance declarado y están enumerados en `PRESERVATION.json`. Registro de macros intacto. Fuentes compiladas idénticas a las fuentes locales, comprobadas por hash/contenido. Los temporales de verificación quedan identificados en `VERIFICATION_COPY.json`; no son una segunda fuente activa.')
report.write_text(text,encoding='utf-8')

ledger=INNER/'docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md'
entry='''

---

## 2026-11-08 — Codex: primera corrección local de fundamentos, runtime excluido

- Solicitud: conservar el programa teórico completo, respaldar las propuestas y corregir contradicciones/afirmaciones incorrectas. Se prioriza matemática frente a trabajo del runtime; no se inicia reorganización.
- Prerregistro y entrega: `docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/PLAN_DE_FASE.md`, `INFORME_DE_FASE.md`, `CONTINUIDAD_DEL_PROGRAMA.md`.
- Lecturas: AGENTS raíz; cinco políticas de autoridad en orden; INSTRUCCIONES y roadmap activo; informe integral y BaseCore/Papers I-IV; fuentes BaseCore 01, 02, 10, 11; ensamblador, extractor, registry-lib, validadores y scripts de verificación inspeccionados. Auditoría anterior conservada como snapshot pre-corrección.
- Fuentes modificadas: BaseCore 01 (completitud, sensibilidad de equilibrio, independencia H5), 10 (contraejemplos correctos), 11 (dominio, disipación, norma de grafo dirigido, discrepancia uniforme, error dinámico/fijo, realización no constante con tasa derivada). Se preserva la transición propuesta. Nuevos resultados relativos a una clase explícita; no atribución de conciencia, Cop, CCR completo ni novedad mundial.
- Sincronización: capítulo generado BaseCore; `registry/theorems.jsonl` de 755 a 763 entradas, IDs previos conservados y fuentes ajenas intactas. Cero labels retirados, 14 pruebas frente a 10 en las tres fuentes (adiciones intencionales). Registro de macros intacto. PDF locales de BaseCore y monolito actualizados tras compilación completa.
- Herramientas: apply_patch, Python estándar, Node con funciones puras del ensamblador y biblioteca existente de extracción, Git en lectura, pdflatex/biber. No limpieza general del árbol ni cambios en corpus/release/fixtures originales.
- Comandos: `python .../check_math.py` 64/64 controles sintéticos; `node .../synchronize.cjs` 12/12 capítulos, cero discrepancias; `git diff --check` exit 0. No se presentan checks finitos como demostración universal.
- Gates ejecutados en copia aislada: tres root gates exit 0; inner `npm run verify:release` exit 0, 6/6 cadenas; `validate-corpus.js --json` exit 0, sin blockers/warnings. Raw v31: `BLOCKED_FOUNDATION_FIRST_GATES`, `external_support_certified=false`. v34 presente en copia es snapshot histórico, no nueva ejecución.
- Compilación: cuatro pasos completos por documento, exit 0; sin referencias/citas indefinidas ni labels multiplicados al final. Páginas/hashes y deuda tipográfica en `*-pdf.json`; fuentes de la copia compilada cotejadas con originales en `COMPILED_SOURCE_HASHES.json`.
- Regresiones buscadas: falsa contracción de identidad, expansión sin disipación, cota incorrecta de grafo dirigido, ausencia de consistencia uniforme general, circularidad de H5, pérdida de fuentes/labels o entradas curadas. Controles y sincronización sin fallos. La condición disipativa restringe la generalidad de un enunciado anterior falso; esto se declara, no se presenta como conservación de aquella conclusión inválida.
- Riesgos/deuda: revisión matemática externa y novedad pendientes; pruebas nuevas no mecanizadas en Lean. Persisten problemas E1/E2, rigidez, nulo, integración, métricas, adjudicación y anexos, enumerados en continuidad. No cierre global ni apoyo externo inferido.
- Conservación: `PRESERVATION.json` enumera todos los cambios del inventario auditado; fuentes ajenas, macros, freezes, runtime y cambios preexistentes preservados. Temporales usados registrados, sin autoridad teórica. No commit ni push. La siguiente obligación fundacional es resolver compatibilidad E1/E2 con una realización no vacía y reprobar sus consecuencias.
'''
with ledger.open('a',encoding='utf-8') as f:f.write(entry)
status=subprocess.run(['git','status','--short'],cwd=ROOT,capture_output=True,text=True,encoding='utf-8',errors='replace')
(OUT/'GIT_STATUS_AFTER.txt').write_text(status.stdout,encoding='utf-8')
print(json.dumps(dict(phase='local_first_phase_verified',pages={k:v['pages'] for k,v in meta.items()},preservation=preservation),indent=2))
