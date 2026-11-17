from pathlib import Path
import ast,re,json
root=Path(__file__).resolve().parents[4]
results=[]
for filename in ['verify-lean.py','verify-lean-coverage.py']:
 tree=ast.parse((root/'scripts'/filename).read_text(encoding='utf8'))
 fn=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='theorem_namespace')
 env={'re':re};exec(compile(ast.Module(body=[fn],type_ignores=[]),filename,'exec'),env)
 check=env['theorem_namespace']
 tests=[('one','namespace QICNLean.Test\ntheorem t : True := True.intro\nend QICNLean.Test',True),
 ('reopen','namespace QICNLean.Test\ntheorem t : True := True.intro\nend QICNLean.Test\nnamespace QICNLean.Test\ntheorem u : True := True.intro\nend QICNLean.Test',True),
 ('aliases','namespace QICNLean.Test\nnamespace R\nabbrev E := Nat\nend R\ntheorem t : True := True.intro\nend QICNLean.Test',True)]
 for declaration in ['theorem t : True := True.intro','lemma t : True := True.intro','def t := 0','axiom t : False','namespace N\nabbrev E := Nat\nend N']:
  tests.append((declaration.split()[0],'namespace QICNLean.Test\nnamespace R\n'+declaration+'\nend R\nend QICNLean.Test',False))
 for name,code,expected in tests:
  try:accepted=check(code)=='QICNLean.Test'
  except (ValueError,AssertionError):accepted=False
  assert accepted==expected,(filename,name)
  results.append({'script':filename,'case':name,'expected_acceptance':expected,'accepted':accepted})
 actual=(root/'lean/QICNLean/QICNComplexificationMaps.lean').read_text(encoding='utf8')
 assert check(actual)=='QICNLean.ComplexificationMaps'
 for file in (root/'lean/QICNLean').glob('*.lean'):
  code=re.sub(r'/\-.*?\-/', '',file.read_text(encoding='utf8'),flags=re.S)
  code=re.sub(r'--[^\n]*','',code)
  check(code)
payload={'passed':True,'controls':results,'external_support_certified':False}
Path(__file__).with_suffix('.json').write_text(json.dumps(payload,indent=2),encoding='utf8')
print('NAMESPACE_CONTRACT_PASS',len(results))
