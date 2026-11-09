from pathlib import Path
import os,json,hashlib,collections
ROOT=Path(__file__).resolve().parents[5]
OUT=Path(__file__).resolve().parent
skip={'.git','node_modules','.venv','.venv-phase7','__pyphi_cache__','_build','.pnpm-store','AUDITORIA_INTEGRAL_CODEX_2026-11-08','_LOCAL_NOISE_ARCHIVE'}
rows=[];sizes=collections.Counter()
for d,ds,files in os.walk(ROOT):
 ds[:]=[x for x in ds if x not in skip]
 for name in files:
  p=Path(d)/name;r=p.relative_to(ROOT).as_posix()
  sizes[r.split('/')[0]]+=p.stat().st_size
  if p.suffix.lower() in {'.pdf','.tex','.bib'}:
   rows.append({'path':r,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(OUT/'EXTENDED_INVENTORY.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
print('ROOT',ROOT,'FILES',len(rows),'COPY_MiB',round(sum(sizes.values())/1048576,2))
print(json.dumps(dict(sizes),indent=2))
for r in rows:
 if not r['path'].startswith('rigid-identity-framework/'):
  print(r['path'],r['bytes'])
