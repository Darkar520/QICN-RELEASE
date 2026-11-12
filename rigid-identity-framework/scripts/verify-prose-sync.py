"""Structural/editorial checks; these do not certify semantic coherence."""
from pathlib import Path
import re,json,sys
ROOT=Path(__file__).resolve().parents[1]
def errors(text,file):
    issues=[]
    for n,line in enumerate(text.splitlines(),1):
        if any(c in line for c in ('\ufffd','\u00c3','\u00c2')):issues.append((file,n,'encoding'))
        retired=['The prompt version says','any polynomially bounded weight sequence','necessary and sufficient technical condition','therefore they cannot instantiate CCR identities']
        if any(s in line for s in retired) and not re.search(r'former|counterexample|withdrawn',line,re.I):issues.append((file,n,'retired assertion'))
    return issues
if '--self-test' in sys.argv:
    assert errors('P\u00c3\u00a9rez','sample')
    assert errors('The prompt version says X','sample')
    assert not errors('The former any polynomially bounded weight sequence claim is withdrawn.','sample')
    print('Prose checker negative controls: PASS; external_support_certified=false');raise SystemExit(0)
sources=[ROOT/'basecore/BASECORE.tex',*sorted(ROOT.glob('paper*/main.tex'))]
issues=[];warnings=[];units=[]
for source in sources:
    files=[source]
    if source.parent.name=='basecore':files+=sorted((ROOT/'basecore/core/sections').glob('*.tex'))
    labels=set();references=[]
    for file in files:
        text=file.read_text(encoding='utf-8-sig');rel=file.relative_to(ROOT).as_posix();issues+=errors(text,rel)
        for n,line in enumerate(text.splitlines(),1):
            if line.lstrip().startswith('%'):continue
            for label in re.findall(r'\\label\{([^}]+)\}',line):
                if label in labels:issues.append((rel,n,'duplicate label '+label))
                labels.add(label)
            references += [(ref,rel,n) for ref in re.findall(r'\\(?:ref|eqref|autoref|nameref)\{([^}]+)\}',line)]
            if re.search(r'\b(?:Section|Proposition|Definition|Theorem|Corollary|Lemma)\s*~?\s*\d+(?:\.\d+)+',line):warnings.append((rel,n,'review handwritten numeric reference',line.strip()))
    for ref,rel,n in references:
        if ref not in labels:issues.append((rel,n,'unresolved reference '+ref))
    final=source.read_text(encoding='utf-8-sig')
    if final.count(r'\section{Interpretation and Open Research Links}')!=1:issues.append((source.name,0,'interpretation section must occur once'))
    units.append({'source':source.relative_to(ROOT).as_posix(),'labels':len(labels)})
out={'passed':not issues,'units':units,'errors':issues,'manual_reference_review':warnings,'scope':'Encoding, stale assertion snippets, local refs and interpretation sections only; mathematical review remains required.','external_support_certified':False}
cache=ROOT.parent/'.cache/qicn-prose';cache.mkdir(parents=True,exist_ok=True);(cache/'summary.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(out,ensure_ascii=False,indent=2));raise SystemExit(1 if issues else 0)
