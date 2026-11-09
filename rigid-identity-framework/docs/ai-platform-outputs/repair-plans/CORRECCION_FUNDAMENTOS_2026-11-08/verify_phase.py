from pathlib import Path
import hashlib,json,os,shutil,subprocess,tempfile,time,re

OUT=Path(__file__).resolve().parent
INNER=OUT.parents[3]
ROOT=INNER.parent
COPY=Path(tempfile.mkdtemp(prefix='qicn-foundation-repair-'))
CI=COPY/'rigid-identity-framework'
steps=[];files=[];exclusions=[]
skip={'.git','node_modules','.venv','.venv-phase7','__pyphi_cache__','__pycache__','.lake','_build','.pnpm-store',
      'AUDITORIA_INTEGRAL_CODEX_2026-11-08','CORRECCION_FUNDAMENTOS_2026-11-08'}
def copytree(src,dst):
    for folder,dirs,names in os.walk(src):
        dirs[:]=[d for d in dirs if d not in skip]
        for name in names:
            p=Path(folder)/name
            if p.suffix in {'.log','.aux','.bbl','.blg','.bcf','.toc','.out'} or p.stat().st_size>20*1048576:
                exclusions.append(str(p.relative_to(ROOT)));continue
            q=dst/p.relative_to(src);q.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,q)
            files.append(str(p.relative_to(ROOT)))
for folder in ('scripts','docs','release','corpus'):copytree(ROOT/folder,COPY/folder)
for p in ROOT.iterdir():
    if p.is_file() and p.suffix in {'.md','.json','.cjs','.js'}:shutil.copy2(p,COPY/p.name)
CI.mkdir()
for p in INNER.iterdir():
    if p.is_dir() and (p.name in {'scripts','docs','registry','release','basecore','canonical_core_legacy','monolithic'} or p.name.startswith('paper')):copytree(p,CI/p.name)
    elif p.is_file() and p.suffix in {'.md','.json','.js','.cjs','.tex'}:shutil.copy2(p,CI/p.name)
info=dict(original_root=str(ROOT),copy_root=str(COPY),copied_files=len(files),exclusions=exclusions,
          note='Verification copy excludes caches and this phase outputs. No original fixtures/frozen release/corpus are rewritten.')
(OUT/'VERIFICATION_COPY.json').write_text(json.dumps(info,indent=2),encoding='utf-8')
print('COPY',COPY,'FILES',len(files),flush=True)

def run(name,cwd,command,timeout=300,extra_env=None):
    start=time.monotonic();env=os.environ.copy()
    if extra_env:env.update(extra_env)
    try:
        r=subprocess.run(command,cwd=cwd,env=env,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=timeout)
        exit_code=r.returncode;stdout=r.stdout;stderr=r.stderr
    except subprocess.TimeoutExpired as e:
        exit_code=124;stdout=(e.stdout or b'');stderr=(e.stderr or b'')
        if isinstance(stdout,bytes):stdout=stdout.decode('utf-8','replace')
        if isinstance(stderr,bytes):stderr=stderr.decode('utf-8','replace')
        stderr+='\nTimed out; chain stopped.'
    (OUT/(name+'.log')).write_text(stdout+'\nSTDERR\n'+stderr,encoding='utf-8')
    steps.append(dict(name=name,cwd=str(cwd),command=command,exit=exit_code,seconds=round(time.monotonic()-start,2),log=name+'.log'))
    (OUT/'VERIFICATION.json').write_text(json.dumps(dict(copy=info,steps=steps),indent=2),encoding='utf-8')
    print(name,'EXIT',exit_code,flush=True)
    if exit_code:raise SystemExit(exit_code)

for name,cwd,cmd in [
    ('root-integrity',COPY,['node','scripts/verify-canonical-integrity.cjs']),
    ('root-claims',COPY,['node','scripts/verify-claim-registry.cjs']),
    ('root-release',COPY,['node','scripts/verify-canonical-release.cjs']),
    ('inner-release',CI,['cmd.exe','/d','/s','/c','npm run verify:release']),
    ('corpus-registry',CI,['node','scripts/validate-corpus.js','--json'])]:run(name,cwd,cmd)

target=OUT/'verification_reports';target.mkdir(exist_ok=True)
for p in (CI/'docs/reports').glob('*.json'):
    if p.name.startswith(('SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION','V35_ALL_LEGACY_VERIFICATION','GAP_CLOSURE_STATUS_v31')):shutil.copy2(p,target/p.name)
for p in target.glob('SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION*.json'):
    r=json.loads(p.read_text(encoding='utf-8-sig'));print(p.name,r.get('verdict'),r.get('external_support_certified'),flush=True)

for folder,stem in [('basecore','BASECORE'),('monolithic','QICN_MONOLITHIC')]:
    cwd=CI/folder
    for suffix,cmd in [('latex-1',['pdflatex','-interaction=nonstopmode','-halt-on-error',stem+'.tex']),
                       ('biber',['biber',stem]),
                       ('latex-2',['pdflatex','-interaction=nonstopmode','-halt-on-error',stem+'.tex']),
                       ('latex-3',['pdflatex','-interaction=nonstopmode','-halt-on-error',stem+'.tex'])]:
        run(folder+'-'+suffix,cwd,cmd,timeout=300,extra_env={'MIKTEX_ENABLE_INSTALLER':'0'})
    log=(cwd/(stem+'.log')).read_text(encoding='utf-8',errors='replace')
    pdf=cwd/(stem+'.pdf');digest=hashlib.sha256(pdf.read_bytes()).hexdigest()
    meta=dict(source=str((INNER/folder/(stem+'.tex')).relative_to(ROOT)),pdf_sha256=digest,
              pages=re.findall(r'Output written on .*?\((\d+) pages?',log),
              undefined_reference_warning=bool(re.search(r'undefined references|Reference .* undefined|Citation .* undefined',log)),
              multiply_defined_warning='multiply defined' in log,
              overfull_boxes=len(re.findall('Overfull',log)),underfull_boxes=len(re.findall('Underfull',log)))
    (OUT/(folder+'-pdf.json')).write_text(json.dumps(meta,indent=2),encoding='utf-8')
    # Publish the matching derived local PDF after the complete compile chain.
    shutil.copy2(pdf,INNER/folder/(stem+'.pdf'))
    shutil.copy2(cwd/(stem+'.log'),OUT/(folder+'-final-tex.log'))
    print('LOCAL_PDF_UPDATED',folder,json.dumps(meta),flush=True)
print('PHASE_VERIFICATION_COMPLETE',flush=True)
