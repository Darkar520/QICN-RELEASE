"""Check Route 6 coverage bookkeeping, not semantic equivalence or proof validity.

The Lean verifier separately compiles and audits theorem dependencies. EXACT_MATCH
is a reviewed mathematical annotation, never inferred merely from a symbol name.
"""
from pathlib import Path
from collections import Counter
import hashlib, json, re

ROOT = Path(__file__).resolve().parents[1]
PLAN = ROOT / 'docs/ai-platform-outputs/repair-plans/RUTA6_PAQUETE_LEAN_Y_MECANIZACION_2026-11-14'
REGISTRY = ROOT / 'registry/theorems.jsonl'
# 436 source targets remain fixed in Etapa 3A. Classification counts are checked
# dynamically; compilation and semantic fidelity are independent obligations.
TYPES = {'proposition': 215, 'theorem': 156, 'lemma': 24, 'corollary': 41}
PAPERS = {'basecore': 94, 'bridge': 40, 'paper1': 49, 'paper10': 11, 'paper2': 35, 'paper3': 34, 'paper4': 7, 'paper5': 65, 'paper6': 14, 'paper7': 25, 'paper8': 26, 'paper9': 36}
STATES = {'EXACT_MATCH', 'FINITE_OR_PARTIAL_KERNEL', 'PENDING_MATHLIB',
          'EMPIRICAL_OR_PROTOCOL_BOUNDED'}


def check():
    records = [json.loads(line) for line in REGISTRY.read_text(encoding='utf8').splitlines()]
    targets = {r['id']: r for r in records if r['type'] in TYPES}
    matrix = json.loads((PLAN / 'COVERAGE_MATRIX_419.json').read_text(encoding='utf8'))
    assert len(targets) == sum(TYPES.values()) == 436
    assert matrix['registry_sha256'] == hashlib.sha256(REGISTRY.read_bytes()).hexdigest()
    rows = matrix['rows']
    assert matrix['baseline_target_count'] == 419 and matrix['target_count'] == 436
    assert len(rows) == 436 and {r['registry_id'] for r in rows} == targets.keys()
    assert Counter(r['type'] for r in rows) == TYPES
    assert Counter(r['paper'] for r in rows) == PAPERS
    assert Counter(r['classification'] for r in rows) == matrix['counts']
    assert matrix['external_support_certified'] is False
    declarations = {}
    for file in sorted((ROOT / 'lean/QICNLean').glob('*.lean')):
        code = file.read_text(encoding='utf-8-sig')
        # These sources use non-nested doc comments. This inventory parser is not
        # the admission/axiom checker; verify-lean.py implements that contract.
        code = re.sub(r'/\-.*?\-/', '', code, flags=re.S)
        code = re.sub(r'--[^\n]*', '', code)
        ns = set(re.findall(r'^namespace\s+([\w.]+)', code, re.M))
        assert len(ns) == 1, file
        for name in re.findall(r'^(?:(?:@\[[^\]]*\]|protected|noncomputable)\s+)*'
                               r'(?:theorem|lemma)\s+([^\s(:{]+)', code, re.M):
            declarations[next(iter(ns)) + '.' + name] = 'QICNLean.' + file.stem
    for row in rows:
        source = targets[row['registry_id']]
        assert row['classification'] in STATES
        assert row['source_statement_tex'] == source['statement_tex'], row['registry_id']
        assert row['source_statement_sha256'] == hashlib.sha256(source['statement_tex'].encode()).hexdigest()
        assert row['source'] == source['location']
        assert row['fidelity_notes'] and row['priority'] in {0, 1, 2}
        for witness in row['lean_witnesses']:
            assert declarations.get(witness['symbol']) == witness['module'], witness
        for dependency in row['target_dependency_ids']:
            assert dependency in targets
        if row['classification'] == 'EXACT_MATCH':
            assert row['lean_witnesses'] and not row['remaining_obligations']
        else:
            assert row['remaining_obligations']
    md = (PLAN / 'COVERAGE_MATRIX_419.md').read_text(encoding='utf8')
    for rid in targets:
        assert md.count('`' + rid + '`') == 1, rid
    print(json.dumps({'passed': True, 'targets': len(rows), 'counts': matrix['counts'],
                      'public_lean_declarations': len(declarations),
                      'scope': 'ID/hash/symbol bookkeeping; semantic fidelity requires mathematical review',
                      'external_support_certified': False}, indent=2))


if __name__ == '__main__':
    check()
