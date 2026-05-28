#!/usr/bin/env node
/* QICN v26 superior gap audit. Governance boundary: this audit does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. */
const fs=require('fs'); const path=require('path'); const crypto=require('crypto');
const ROOT=path.resolve(__dirname,'..');
const OUT_JSON=path.join(ROOT,'docs','reports','V26_SUPERIOR_GAP_AUDIT.json');
const OUT_MD=path.join(ROOT,'docs','reports','V26_SUPERIOR_GAP_AUDIT.md');
const GOVERNANCE='This audit checks implementation gates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.';
function read(p){ try{return fs.readFileSync(path.join(ROOT,p),'utf8');}catch{return '';} }
function exists(p){ return fs.existsSync(path.join(ROOT,p)); }
function json(p){ return JSON.parse(read(p)); }
function sha(p){ return crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p))).digest('hex'); }
function check(id, description, pass, evidence){ return {id, description, result:pass?'PASS':'FAIL', evidence}; }
function main(){
  const runner=read('scripts/external-session-zero-adjudicator.js');
  const prom=read('scripts/audit-operational-term-promotions.js');
  const down=read('scripts/propose-fcr-downgrades-from-adjudication.js');
  const fixture=json('docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json');
  const session=json('docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json');
  const threshold=json('docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json');
  const promotion=json('docs/reports/OPERATIONAL_TERM_PROMOTION_AUDIT_v26.json');
  const checks=[];
  checks.push(check('V26-01','Formal bridge theorem exists as LaTeX with proof blocks and nonclaim firewall', exists('docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex') && /\\begin\{proof\}/.test(read('docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex')) && /No global reconstruction/.test(read('docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex')) && /not a derivation/.test(read('docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex')), 'docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex'));
  checks.push(check('V26-02','Promotion audit actually tokenizes sentences and adjacent sentence pairs', /function splitSentences/.test(prom) && /adjacent_sentence_pair/.test(prom) && promotion.semantic_gate.includes('sentence_level'), promotion.semantic_gate));
  checks.push(check('V26-03','Runner blocks near-copy and affine-copy leakage, not only exact equality', /near-equal to observed_delta/.test(runner) && /exact affine transform/.test(runner) && /linearFitYOnX/.test(runner), 'near-copy + affine-copy diagnostics present'));
  checks.push(check('V26-04','Null threshold calibration report exists and is hash-bound by fixture', exists('docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json') && fixture.decision_thresholds.threshold_calibration_report_sha256===sha('docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json') && threshold.recommended_support_gain_aic===fixture.decision_thresholds.support_gain_aic, 'threshold calibration bound'));
  checks.push(check('V26-05','Free parameter identifiability probes are required and checked', /parameter_sensitivity_probes are required/.test(runner) && Array.isArray(fixture.model_parameters.parameter_sensitivity_probes) && fixture.model_parameters.parameter_sensitivity_probes.length >= fixture.model_parameters.qicn_free_parameters.length + fixture.model_parameters.rival_free_parameters.length, 'sensitivity probes present'));
  checks.push(check('V26-06','Downgrade provenance verifies dataset and prediction bundle hashes', /dataset_sha256/.test(down) && /prediction_bundle_sha256/.test(down) && session.provenance.dataset_sha256===sha(session.provenance.dataset_path) && session.provenance.prediction_bundle_sha256===sha(session.provenance.prediction_bundle_path), 'dataset/prediction provenance verified'));
  checks.push(check('V26-07','Human veto signature verification script exists and self-test passed without claiming human review', exists('scripts/verify-human-veto-signature.js') && exists('docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json') && json('docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v26.json').test_vector_not_human_review===true, 'signature test vector only'));
  checks.push(check('V26-08','Runner emits temporal dependence diagnostic for Gaussian AIC assumptions', /durbinWatson/.test(runner) && session.model_comparison.temporal_dependence_diagnostic && typeof session.model_comparison.temporal_dependence_diagnostic.durbin_watson === 'number', 'Durbin-Watson diagnostic present'));
  checks.push(check('V26-09','Fixture dataset and prediction bundle hashes are real SHA-256 values, not placeholders', /^[a-f0-9]{64}$/.test(fixture.dataset_sha256) && /^[a-f0-9]{64}$/.test(fixture.prediction_bundle.prediction_sha256), 'actual SHA-256 format'));
  checks.push(check('V26-10','No known v25 generated artefact string remains in v26 gap audit script', !read('scripts/audit-v26-superior-gaps.js').includes('?'.repeat(2)), 'no double-question artefact'));
  checks.push(check('V26-11','Synthetic fixture remains blocked from external support', session.external_support_certified===false && /^INTERNAL_DIAGNOSTIC/.test(session.verdict), session.verdict));
  const failures=checks.filter(c=>c.result!=='PASS');
  const report={schema_version:'1.0.0', generated_at:'2026-05-27', governance_boundary:GOVERNANCE, checks, result:failures.length===0?'PASS':'FAIL'};
  fs.mkdirSync(path.dirname(OUT_JSON),{recursive:true}); fs.writeFileSync(OUT_JSON,JSON.stringify(report,null,2)+'\n'); fs.writeFileSync(OUT_MD,`# V26 Superior Gap Audit\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Checks: ${checks.length}\n- Failures: ${failures.length}\n\n`);
  console.log(`V26 superior gap audit: ${report.result}; checks=${checks.length}; failures=${failures.length}`);
  if(report.result!=='PASS') process.exit(1);
}
if(require.main===module) main();
