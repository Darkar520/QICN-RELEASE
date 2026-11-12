const fs=require('fs'),path=require('path'),vm=require('vm'),crypto=require('crypto');
const root=path.resolve(__dirname,'../../../..');
const f=path.join(root,'scripts/build-monolithic-volume.js');
const ctx={require,module:{},__dirname:path.dirname(f),process,console};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(f,'utf8')+'\nglobalThis.audit={SOURCES,bodyOf,expandLocalInputs,stripEncodingNoise,rewriteAppendixForMonolithic,namespaceLabelsAndRefs,applyMonolithicLayoutTransforms,wrapSection};',ctx);
const a=ctx.audit, hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const results=a.SOURCES.map(s=>{
 const src=fs.readFileSync(path.join(root,s.relPath),'utf8');
 const body=a.rewriteAppendixForMonolithic(a.expandLocalInputs(a.stripEncodingNoise(a.bodyOf(src)),s.relPath));
 const expected=a.wrapSection(s,a.applyMonolithicLayoutTransforms(a.namespaceLabelsAndRefs(body,s),s.relPath))+'\n';
 const disk=fs.readFileSync(path.join(root,'monolithic/build/sections',s.sectionName),'utf8');
 const normalize=t=>t.replace(/\r\n/g,'\n');
 if(normalize(expected)!==normalize(disk)){
  fs.writeFileSync(path.join(__dirname,'EXPECTED_'+s.sectionName),expected);
 }
 return {source:s.relPath,chapter:s.sectionName,expected_sha256:hash(normalize(expected)),actual_sha256:hash(normalize(disk)),equal:normalize(expected)===normalize(disk),source_bytes:src.length,chapter_bytes:disk.length};
});
fs.writeFileSync(path.join(__dirname,'MONOLITH_COMPARISON.json'),JSON.stringify({method:'Pure assembler transforms evaluated in memory; original build() and main() never executed; equality after CRLF normalization',results},null,2));
console.log(JSON.stringify(results,null,2));
if(results.some(result=>!result.equal)) process.exitCode=1;
