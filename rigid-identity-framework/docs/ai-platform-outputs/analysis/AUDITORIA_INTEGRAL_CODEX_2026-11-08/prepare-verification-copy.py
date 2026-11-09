from pathlib import Path
import tempfile,shutil,json,os,hashlib
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[4]
DEST=Path(tempfile.mkdtemp(prefix='qicn-theory-audit-'))
print('Preparing isolated copy',DEST,flush=True)
excluded=[];copied=[]
def copytree(src,dst):
 for folder,dirs,files in os.walk(src):
  dirs[:]=[d for d in dirs if d not in {'.git','node_modules','.venv','.venv-phase7','__pyphi_cache__','__pycache__','.lake','_build','.pnpm-store','AUDITORIA_INTEGRAL_CODEX_2026-11-08'}]
  for f in files:
   p=Path(folder)/f
   if p.suffix in {'.log','.aux','.bbl','.blg','.bcf','.toc','.out','.run.xml'} or p.stat().st_size>20*1048576:
    excluded.append(str(p.relative_to(ROOT)));continue
   q=dst/p.relative_to(src);q.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,q)
   copied.append(str(p.relative_to(ROOT)))
for d in ('scripts','docs','release','corpus'):copytree(ROOT/d,DEST/d)
for p in ROOT.iterdir():
 if p.is_file() and p.suffix in {'.md','.json','.cjs','.js'}:shutil.copy2(p,DEST/p.name)
inner=ROOT/'rigid-identity-framework';target=DEST/'rigid-identity-framework';target.mkdir()
for p in inner.iterdir():
 if p.is_dir() and (p.name in {'scripts','docs','registry','release','basecore','canonical_core_legacy','monolithic'} or p.name.startswith('paper')):copytree(p,target/p.name)
 elif p.is_file() and p.suffix in {'.md','.json','.js','.cjs','.tex'}:shutil.copy2(p,target/p.name)
info={'copy_root':str(DEST),'original_root':str(ROOT),'purpose':'Execute mandatory output-writing verifiers without mutating original reports, fixtures, release, or corpus','copied_files':len(copied),'exclusions':excluded,'source_worktree_changes_preserved':True}
(OUT/'VERIFICATION_COPY.json').write_text(json.dumps(info,indent=2),encoding='utf-8');print(json.dumps(info,indent=2))
