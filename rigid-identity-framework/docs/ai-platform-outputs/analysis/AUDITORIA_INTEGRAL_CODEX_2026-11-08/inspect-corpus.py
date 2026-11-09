from pathlib import Path
import json,re,subprocess,hashlib,collections,difflib
OUT=Path(__file__).resolve().parent; ROOT=OUT.parents[4]; INNER=ROOT/'rigid-identity-framework'
PDFTEXT=Path(r'C:/Users/irisp/AppData/Local/Programs/MiKTeX/miktex/bin/x64/pdftotext.exe')
PDFINFO=Path(r'C:/Users/irisp/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/Library/bin/pdfinfo.exe')
rows=json.loads((OUT/'EXTENDED_INVENTORY.json').read_text(encoding='utf-8')); reports=[];cache={}; texts=OUT/'pdf_text';texts.mkdir(exist_ok=True)
for row in rows:
 if not row['path'].endswith('.pdf'):continue
 p=ROOT/row['path']; digest=row['sha256']; target=texts/(digest[:20]+'.txt')
 if digest not in cache:
  info=subprocess.run([str(PDFINFO),str(p)],capture_output=True,text=True,encoding='utf-8',errors='replace')
  ext=subprocess.run([str(PDFTEXT),'-enc','UTF-8',str(p),str(target)],capture_output=True,text=True,encoding='utf-8',errors='replace')
  content=target.read_text(encoding='utf-8',errors='replace') if target.exists() else ''
  cache[digest]={'info':info.stdout,'extract_exit':ext.returncode,'text_file':str(target.relative_to(OUT)),'text_sha256':hashlib.sha256(content.encode()).hexdigest(),'words':len(content.split())}
 reports.append({**row,**cache[digest]})
(OUT/'PDF_INSPECTION.json').write_text(json.dumps(reports,indent=2),encoding='utf-8')
for r in reports:
 pages=re.search(r'^Pages:\s*(\d+)',r['info'],re.M);title=re.search(r'^Title:\s*(.*)',r['info'],re.M)
 print(r['path'],'PAGES',pages.group(1) if pages else '?','WORDS',r['words'],'TITLE',title.group(1) if title else '?')
# Full source reference and registry integrity, with no extraction mutation.
theorems=[json.loads(x) for x in (INNER/'registry/theorems.jsonl').read_text(encoding='utf-8-sig').splitlines() if x.strip()]
issues=[];lookup={x['id']:x for x in theorems}
for x in theorems:
 loc=x['location'];p=INNER/loc['file']
 if not p.exists():issues.append({'id':x['id'],'issue':'missing_source','file':loc['file']});continue
 lines=p.read_text(encoding='utf-8-sig').splitlines();s='\n'.join(lines[loc['line_start']-1:loc['line_end']]);s0=x.get('statement_tex','')
 if re.sub(r'\s+','',s)!=re.sub(r'\s+','',s0):issues.append({'id':x['id'],'issue':'source_statement_drift','location':loc})
 for dep in x.get('depends_on',[]):
  if dep not in lookup:issues.append({'id':x['id'],'issue':'unresolved_dependency','dependency':dep})
report={'entries':len(theorems),'type_counts':dict(collections.Counter(x['type'] for x in theorems)),'epistemic_counts':dict(collections.Counter(x['epistemic_status'] for x in theorems)),'proof_counts':dict(collections.Counter(x['proof_status'] for x in theorems)),'curation_counts':dict(collections.Counter(x['curation_status'] for x in theorems)),'issues':issues}
(OUT/'REGISTRY_INSPECTION.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print('REGISTRY',json.dumps({k:v for k,v in report.items() if k!='issues'}),'ISSUES',len(issues))
# Bibliography: inspect every source file; list missing cite keys, duplicate keys and path bindings.
bibs=[]
for row in rows:
 if not row['path'].endswith('.bib'):continue
 p=ROOT/row['path']; t=p.read_text(encoding='utf-8-sig');keys=re.findall(r'@\w+\s*\{\s*([^,]+)',t)
 bibs.append({'file':row['path'],'keys':keys,'duplicates':[k for k,c in collections.Counter(keys).items() if c>1]})
bindings=[]
for p in [INNER/'basecore/BASECORE.tex',*INNER.glob('paper*/main.tex'),INNER/'monolithic/preamble/setup.tex']:
 t=p.read_text(encoding='utf-8-sig');resources=[];keys=set()
 for name in re.findall(r'\\addbibresource(?:\[[^\]]*\])?\{([^}]+)\}',t):
  q=(p.parent/name).resolve();resources.append({'declared':name,'resolved':str(q),'exists':q.exists()})
  if q.exists():keys.update(re.findall(r'@\w+\s*\{\s*([^,]+)',q.read_text(encoding='utf-8-sig')))
 if 'monolithic' in p.parts:
  q=INNER/'release/references.bib';resources=[{'declared':'../release/references.bib from monolithic cwd','resolved':str(q),'exists':q.exists()}];keys=set(re.findall(r'@\w+\s*\{\s*([^,]+)',q.read_text(encoding='utf-8-sig')))
 if p.name=='BASECORE.tex':t+='\n'.join(x.read_text(encoding='utf-8-sig') for x in (p.parent/'core/sections').glob('*.tex'))
 cited=set()
 for c in re.findall(r'\\(?:cite|parencite|textcite|autocite|citep|citet)\*?(?:\[[^\]]*\])*\{([^}]+)\}',t):cited.update(k.strip() for k in c.split(','))
 bindings.append({'source':str(p.relative_to(ROOT)),'resources':resources,'cited_keys':sorted(cited),'missing_keys':sorted(cited-keys)})
(OUT/'BIBLIOGRAPHY_INSPECTION.json').write_text(json.dumps({'bibs':bibs,'bindings':bindings},indent=2),encoding='utf-8')
print('BIB_BINDINGS',json.dumps(bindings))
