const fs=require('fs'),path=require('path'),vm=require('vm'),crypto=require('crypto');
const OUT=__dirname, ROOT=path.resolve(OUT,'../../../..');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const read=p=>fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
const norm=x=>x.replace(/\r\n/g,'\n');
const assembler=path.join(ROOT,'scripts/build-monolithic-volume.js');
const context={require,module:{},__dirname:path.dirname(assembler),process,console};
vm.createContext(context);
vm.runInContext(read(assembler)+'\nglobalThis.phaseApi={SOURCES,bodyOf,expandLocalInputs,stripEncodingNoise,rewriteAppendixForMonolithic,namespaceLabelsAndRefs,applyMonolithicLayoutTransforms,wrapSection};',context);
const api=context.phaseApi;
const source=api.SOURCES.find(s=>s.kind==='basecore');
const body=api.rewriteAppendixForMonolithic(api.expandLocalInputs(api.stripEncodingNoise(api.bodyOf(read(path.join(ROOT,source.relPath)))),source.relPath));
const generated=api.wrapSection(source,api.applyMonolithicLayoutTransforms(api.namespaceLabelsAndRefs(body,source),source.relPath))+'\n';
fs.writeFileSync(path.join(ROOT,'monolithic/build/sections',source.sectionName),generated,'utf8');
const mono=api.SOURCES.map(s=>{
  const t=api.rewriteAppendixForMonolithic(api.expandLocalInputs(api.stripEncodingNoise(api.bodyOf(read(path.join(ROOT,s.relPath)))),s.relPath));
  const expected=api.wrapSection(s,api.applyMonolithicLayoutTransforms(api.namespaceLabelsAndRefs(t,s),s.relPath))+'\n';
  const actual=read(path.join(ROOT,'monolithic/build/sections',s.sectionName));
  return {source:s.relPath,equal:norm(expected)===norm(actual),sha256:hash(norm(actual))};
});
if(mono.some(x=>!x.equal))throw Error('A monolithic chapter differs from its canonical transformation');

const lib=require(path.join(ROOT,'scripts/registry-lib.js'));
const affected=new Set(['basecore/core/sections/01_foundation_from_core.tex','basecore/core/sections/10_appendix_counterexamples.tex','basecore/core/sections/11_discrete_bridge.tex']);
const registryPath=path.join(ROOT,'registry/theorems.jsonl');
const old=read(path.join(OUT,'baseline/registry/theorems.jsonl')).trim().split('\n').map(JSON.parse);
const fresh=lib.extractFormalEnvironments(ROOT).filter(x=>affected.has(x.location.file));
const key=x=>JSON.stringify([x.location.file,x.type,x.label,x.title]);
const previous=new Map(old.filter(x=>affected.has(x.location.file)).map(x=>[key(x),x]));
const changes=[];
const revised=fresh.map(x=>{
  const prior=previous.get(key(x));
  if(!prior){changes.push({action:'added',id:x.id});return {...x,registry_version:'2026-11-08',history:[...x.history,{date:'2026-11-08',action:'source_repair_added',reason:'Constructive mathematical source; draft extraction is not independent proof certification.'}]};}
  const altered=norm(prior.statement_tex)!==norm(x.statement_tex);
  const next={...prior,statement:x.statement,statement_tex:x.statement_tex,location:x.location,proof:x.proof,refs:x.refs};
  if(altered){
    changes.push({action:'statement_corrected',id:prior.id});
    next.history=[...prior.history,{date:'2026-11-08',action:'mathematical_source_repair',reason:'Corrected discrete dynamics/bridge domain and sufficient conditions; see CORRECCION_FUNDAMENTOS_2026-11-08. No external certification.'}];
    next.registry_version='2026-11-08';
  } else if(prior.location.line_start!==x.location.line_start) changes.push({action:'location_refreshed',id:prior.id});
  return next;
});
for(const x of previous.values())if(!fresh.some(y=>key(y)===key(x)))throw Error('Unexpected removed formal entry '+x.id);
const combined=[...old.filter(x=>!affected.has(x.location.file)),...revised].sort((a,b)=>a.location.file.localeCompare(b.location.file)||a.location.line_start-b.location.line_start);
const labels=new Map();for(const x of combined)if(x.label){if(!labels.has(x.label))labels.set(x.label,[]);labels.get(x.label).push(x.id);}
for(const x of combined.filter(x=>affected.has(x.location.file))){
  x.depends_on=[...new Set((x.refs||[]).flatMap(ref=>{
    const options=labels.get(ref)||[];
    const id=options.find(id=>id.startsWith(x.paper+':')&&id!==x.id)||options.find(id=>id!==x.id);
    return id?[id]:[];
  }))].sort();
}
if(new Set(combined.map(x=>x.id)).size!==combined.length)throw Error('Duplicate registry IDs');
const lookup=new Set(combined.map(x=>x.id)),issues=[];
for(const x of combined){
  const lines=norm(read(path.join(ROOT,x.location.file))).split('\n');
  if(lines.slice(x.location.line_start-1,x.location.line_end).join('\n').replace(/\s/g,'')!==x.statement_tex.replace(/\s/g,''))issues.push({id:x.id,issue:'source-drift'});
  for(const id of x.depends_on||[])if(!lookup.has(id))issues.push({id:x.id,issue:'unresolved-dependency',dependency:id});
}
if(issues.length)throw Error(JSON.stringify(issues));
fs.writeFileSync(registryPath,combined.map(x=>JSON.stringify(x)).join('\n')+'\n','utf8');
const count=t=>Object.fromEntries(['theorem','lemma','proposition','corollary','definition','assumption','hypothesis','example','remark','proof'].map(e=>[e,[...t.matchAll(new RegExp('\\\\begin\\{'+e+'\\}','g'))].length]));
const structure=[...affected].map(file=>{
  const before=read(path.join(OUT,'baseline',file+'.snapshot.txt')),after=read(path.join(ROOT,file));
  const oldLabels=[...before.matchAll(/\\label\{([^}]+)\}/g)].map(x=>x[1]);
  const newLabels=[...after.matchAll(/\\label\{([^}]+)\}/g)].map(x=>x[1]);
  return {file,before:count(before),after:count(after),removed_labels:oldLabels.filter(x=>!newLabels.includes(x)),added_labels:newLabels.filter(x=>!oldLabels.includes(x))};
});
const phrases=['Directed Resonance Bound','Realized Contractive Bridge with Nonconstant Equilibria','H5 Is Not Implied by H1--H4','Cell-Average Error for a Lipschitz Profile'];
const beforeText=structure.map(s=>read(path.join(OUT,'baseline',s.file+'.snapshot.txt'))).join('\n');
const afterText=structure.map(s=>read(path.join(ROOT,s.file))).join('\n');
const beforeMono=read(path.join(OUT,'baseline/monolithic/build/sections/01-basecore.tex.snapshot.txt'));
const occurrences=(t,p)=>t.split(p).length-1;
const propagation=phrases.map(p=>({phrase:p,source_before:occurrences(beforeText,p),source_after:occurrences(afterText,p),monolith_before:occurrences(beforeMono,p),monolith_after:occurrences(generated,p)}));
const result={monolithic:mono,registry:{before:old.length,after:combined.length,changes,issues,outside_affected_source_entries_unchanged:true},structure,propagation,note:'Existing formal labels retained; new constructive statements/proofs intentionally added. Registry proof_block_present is structural, not a kernel certificate.'};
fs.writeFileSync(path.join(OUT,'SYNCHRONIZATION.json'),JSON.stringify(result,null,2),'utf8');
console.log(JSON.stringify({chapters_equal:mono.filter(x=>x.equal).length,registry_before:old.length,registry_after:combined.length,source_issues:issues.length,added:changes.filter(x=>x.action==='added').length}));
