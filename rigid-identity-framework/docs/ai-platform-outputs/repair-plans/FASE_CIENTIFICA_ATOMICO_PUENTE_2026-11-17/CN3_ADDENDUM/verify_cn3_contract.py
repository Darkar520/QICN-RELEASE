"""CN-3 contract preservation and boundary checks, not a runtime experiment."""
from pathlib import Path
import json,re,sys,hashlib
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[4]
snap=json.loads((HERE/'CN3_SOURCE_CONTRACT.json').read_text(encoding='utf8'))
h=snap['historical_v1'];observed=h['stage0_memory_reproduction']
assert h['seeds']==[11,23,37,41,53]
assert (h['warmup_ticks'],h['evaluation_ticks'],h['nodes'])==(420,180,250)
rule='count(deltaMaturedMinusErased >= 0.03) >= 4 AND count(erasedActionDivergenceVsMatured >= 0.20) >= 4 AND every(erasedVsNaiveZeroProbeDivergence === 0)'
assert h['cn3_rule']==rule
assert observed['cn3_seeds_meeting_advantage']==observed['cn3_seeds_meeting_action_divergence']==3
assert observed['cn3_erased_history'] is False and observed['allPreregisteredCriteriaPass'] is False
accept=lambda a,d,p:a>=4 and d>=4 and p
# Hypothetical count combinations: no invented per-seed observations.
cases=[(3,3,True,False),(4,3,True,False),(3,4,True,False),(4,4,False,False),(4,4,True,True),(5,5,True,True)]
assert all(accept(a,d,p)==expected for a,d,p,expected in cases)
md=(ROOT/'docs/BRIDGE_TO_PHENOMENALITY_PREREQUISITES.md').read_text(encoding='utf8')
tex=(ROOT/'paper9_phenomenal_bridge_organization/main.tex').read_text(encoding='utf8')
plain=tex.replace(r'\allowbreak{}','').replace(r'\_','_')
assert rule in md
for token in ['[11, 23, 37, 41, 53]','420','180','250','12','--restore-from=capMatured','--erase-history=true','--plasticity=false','historical_v1','paired_intervention','erase_declared_history','cn3_erased_history = false','allPreregisteredCriteriaPass = false','bridge_cn3_extension_v1','Z_op','delta_drop','intervalos']:
 assert token in md,token
for token in ['(11,23,37,41,53)','420','180','250','12-tick','--restore-from=capMatured','--erase-history=true','--plasticity=false','historical_v1','paired_intervention','erase_declared_history','cn3_erased_history=false','allPreregisteredCriteriaPass=false','3/5','bridge_cn3_extension_v1']:
 assert token in plain,token
assert 'subsequent learning' in plain and 'different' in plain
assert 'not 180 independent' in plain
assert 'external_support_certified=false' in plain and 'external_support_certified=false' in md
assert 'donante' in md and 'trasplante' in md and 'historia' in md and 'rivales' in md
# Check every formal environment/proof/label from the pre-addendum source survives.
old=Path(sys.argv[1]) if len(sys.argv)>1 else None
formal_counts={}
if old:
 before=old.read_text(encoding='utf8')
 for kind in ['theorem','lemma','proposition','corollary','definition','proof']:
  pattern=r'\\begin\{'+kind+r'\}'
  a,b=len(re.findall(pattern,before)),len(re.findall(pattern,tex));assert a==b,(kind,a,b);formal_counts[kind]=b
 oldlabels=re.findall(r'\\label\{([^}]+)\}',before);newlabels=re.findall(r'\\label\{([^}]+)\}',tex)
 assert set(oldlabels)<=set(newlabels)
 assert set(newlabels)-set(oldlabels)=={'sec:bridge-cn3-contract'}
report={'passed':True,'historical_observed_cn3':False,'historical_observed_counts':{'advantage':3,'action_divergence':3,'total':5},'synthetic_boundary_cases':len(cases),'formal_counts':formal_counts,'runtime_campaign_executed':False,'scope':'Frozen historical contract, reporting and prospective-protocol source checks; not scientific support','external_support_certified':False}
print(json.dumps(report,indent=2))
