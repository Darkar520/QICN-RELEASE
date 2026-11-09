"""Build the pinned Lean project and audit public theorem dependencies.

This checks the formal statements in this project, not the entire manuscript.
Use --fetch-cache on a fresh installation to obtain their Mathlib dependencies.
"""
from pathlib import Path
import argparse,hashlib,json,os,re,subprocess,tempfile,time,tomllib

FRAMEWORK=Path(__file__).resolve().parents[1]
PROJECT=FRAMEWORK/'docs/ai-platform-outputs/formal/lean'
CACHE=FRAMEWORK.parent/'.cache/qicn-lean';CACHE.mkdir(parents=True,exist_ok=True)
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--fetch-cache',action='store_true')
parser.add_argument('--kernel-only',action='store_true',help='Fresh, serial elaboration of every project module without Lake build graph or C generation')
parser.add_argument('--packages-dir',type=Path,help='Pinned Mathlib package directory for kernel-only verification')
args=parser.parse_args()
if args.packages_dir and (not args.kernel_only or args.fetch_cache):
    parser.error('--packages-dir is for an existing cache in --kernel-only mode')
env=os.environ.copy()
lean=env.get('QICN_LEAN_EXE','lean')
manifest=json.loads((PROJECT/'lake-manifest.json').read_text())
package_dir=args.packages_dir or PROJECT/'.lake/packages'
trusted=[]
for package in manifest['packages']:
    p=package_dir/package['name']
    trusted.extend([str(p),str(p.resolve())])
count=int(env.get('GIT_CONFIG_COUNT','0'))
for value in sorted(set(trusted)):
    env['GIT_CONFIG_KEY_'+str(count)]='safe.directory'
    env['GIT_CONFIG_VALUE_'+str(count)]=value
    count+=1
env['GIT_CONFIG_COUNT']=str(count)
storage=(PROJECT/'.lake').resolve()
if storage!=(PROJECT/'.lake').absolute():
    version=(PROJECT/'lean-toolchain').read_text().strip().split(':')[-1]
    env.setdefault('MATHLIB_CACHE_DIR',str(storage.parent/('cache-'+version)))
summary={'passed':False,'external_support_certified':False,'steps':[]}
def save():
    (CACHE/'summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
def run(name,command):
    start=time.monotonic()
    with (CACHE/(name+'.log')).open('w',encoding='utf-8') as log:
        result=subprocess.run(command,cwd=PROJECT,env=env,stdout=log,stderr=subprocess.STDOUT,timeout=1800)
    summary['steps'].append({'name':name,'command':command,'exit':result.returncode,'seconds':round(time.monotonic()-start,2)})
    save();print(name+': '+('PASS' if result.returncode==0 else 'FAIL'),flush=True)
    if result.returncode:
        print((CACHE/(name+'.log')).read_text(encoding='utf-8',errors='replace')[-7000:])
        raise SystemExit(result.returncode)
    return (CACHE/(name+'.log')).read_text(encoding='utf-8',errors='replace')

def without_comments(text):
    output=[];i=0;depth=0
    while i<len(text):
        if text[i:i+2]=='/-':depth+=1;i+=2;continue
        if depth:
            if text[i:i+2]=='-/':depth-=1;i+=2
            else:
                if text[i]=='\n':output.append('\n')
                i+=1
            continue
        if text[i:i+2]=='--':
            end=text.find('\n',i)
            i=len(text) if end<0 else end
            continue
        output.append(text[i]);i+=1
    return ''.join(output)

save()
sources=sorted((PROJECT/'QICNLean').glob('*.lean'))
symbols=[];modules=[]
for source in sources:
    code=without_comments(source.read_text(encoding='utf-8-sig'))
    if re.search(r'\b(sorry|admit)\b|^\s*axiom\s',code,re.M):
        raise SystemExit('Unproved admission or added axiom in '+str(source))
    spaces=set(re.findall(r'^namespace\s+([\w.]+)',code,re.M))
    if len(spaces)!=1:raise SystemExit('Review namespace mapping in '+str(source))
    namespace=next(iter(spaces))
    declarations=re.findall(r'^(?:(?:@\[[^\]]*\]|protected|noncomputable)\s+)*(?:theorem|lemma)\s+([^\s(:{]+)',code,re.M)
    symbols.extend(namespace+'.'+name for name in declarations)
    modules.append({'source':source.relative_to(PROJECT).as_posix(),'sha256':hashlib.sha256(source.read_bytes()).hexdigest()})
version=run('version',[lean,'--version']).strip()
expected=(PROJECT/'lean-toolchain').read_text().strip().split(':')[-1].removeprefix('v')
if 'version '+expected+',' not in version:raise SystemExit('Unexpected Lean toolchain: '+version)
if args.fetch_cache:
    imports=sorted({name for p in sources for name in re.findall(r'^import\s+(Mathlib\.[\w.]+)',p.read_text(encoding='utf-8-sig'),re.M)})
    run('cache',['lake','exe','cache','get',*imports])
aggregate=PROJECT/'QICNLean.lean'
all_sources={p.relative_to(PROJECT).with_suffix('').as_posix().replace('/','.'):p for p in [*sources,aggregate]}
if args.kernel_only:
    env['LEAN_NUM_THREADS']='1'
    object_root=Path(tempfile.mkdtemp(prefix='kernel-objects-',dir=CACHE))
    dependency_libs=[package_dir/p['name']/'.lake/build/lib/lean' for p in manifest['packages']]
    if not (package_dir/'mathlib/.lake/build/lib/lean/Mathlib').is_dir():raise SystemExit('Mathlib artifacts missing; use --fetch-cache')
    for p in manifest['packages']:
        revision=run('pin-'+p['name'],['git','-C',str(package_dir/p['name']),'rev-parse','HEAD']).strip()
        if revision!=p['rev']:raise SystemExit('Dependency revision mismatch: '+p['name'])
    # The targeted cache need not materialize packages that no source imports.
    # Lean still rejects every genuinely missing import during elaboration.
    env['LEAN_PATH']=os.pathsep.join(str(p) for p in [object_root,*dependency_libs] if p.is_dir())
    options=tomllib.loads((PROJECT/'lakefile.toml').read_text())['leanOptions']
    def flags(values,prefix=''):
        for name,value in values.items():
            if isinstance(value,dict):yield from flags(value,prefix+name+'.')
            else:yield '-D'+prefix+name+'='+(str(value).lower() if isinstance(value,bool) else str(value))
    checked=set()
    def build_module(name):
        if name in checked:return
        source=all_sources[name]
        for dependency in re.findall(r'^import\s+([\w.]+)',source.read_text(encoding='utf-8-sig'),re.M):
            if dependency in all_sources:build_module(dependency)
        obj=object_root/source.relative_to(PROJECT).with_suffix('.olean');obj.parent.mkdir(parents=True,exist_ok=True)
        run('kernel-'+name,[lean,'-j','1',*flags(options),'-o',str(obj),str(source.relative_to(PROJECT))])
        checked.add(name)
    build_module('QICNLean')
    if checked!=set(all_sources):raise SystemExit('A Lean source is not reachable from QICNLean.lean')
    audit_command=[lean,'-j','1']
else:
    run('build',['lake','build'])
    object_root=PROJECT/'.lake/build/lib/lean'
    audit_command=['lake','env','lean']
modules.append({'source':'QICNLean.lean','sha256':hashlib.sha256(aggregate.read_bytes()).hexdigest()})
for module in modules:
    obj=object_root/Path(module['source']).with_suffix('.olean')
    if not obj.is_file():raise SystemExit('Module was not built: '+module['source'])
    module['olean_sha256']=hashlib.sha256(obj.read_bytes()).hexdigest()
audit=CACHE/'AuditAxioms.lean'
audit.write_text('import QICNLean\n'+'\n'.join('#print axioms '+name for name in sorted(set(symbols)))+'\n',encoding='utf-8')
output=run('axioms',[*audit_command,str(audit)])
reports=re.findall(r"^'([^']+)' (?:does not depend on any axioms|depends on axioms:\s*\[([^\]]*)\])",output,re.M)
if len(reports)!=len(set(symbols)) or {name for name,_ in reports}!=set(symbols):
    raise SystemExit('The compiler did not report the axiom dependencies of every requested theorem')
axioms={item.strip() for _,group in reports for item in group.split(',') if item.strip()}
allowed={'propext','Classical.choice','Quot.sound'}
if axioms-allowed:raise SystemExit('Nonstandard axiom dependencies: '+str(sorted(axioms-allowed)))
summary.update(passed=True,lean=version,mode='kernel-only' if args.kernel_only else 'lake-build',modules=modules,source_modules=len(modules),public_theorems_audited=len(set(symbols)),axioms=sorted(axioms),
    scope='Kernel build of the declared project and public theorem dependency audit. Private lemmas are compiled and checked through their sources/dependents. This does not formalize every manuscript claim, certify novelty, or supply external empirical validation.')
save()
print(json.dumps({k:summary[k] for k in ['passed','source_modules','public_theorems_audited','axioms','external_support_certified']}),flush=True)
