#!/usr/bin/env node
/*
 * QICN v26 null-threshold calibration simulator.
 * This produces an internal engineering calibration record only. It does not
 * certify external support, consciousness, phenomenality, identity transfer,
 * bridge-burden closure, or human mathematical review.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ROOT = path.resolve(__dirname, "..");
const MANIFEST = path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json");
const OUT = path.join(ROOT, "docs", "reports", "THRESHOLD_NULL_CALIBRATION_v26.json");
const GOVERNANCE = "This calibration record is an internal synthetic engineering calibration only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";
function repoPath(filePath){ return path.relative(ROOT,filePath).split(path.sep).join("/"); }
function stableJson(value){ if(Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`; if(value&&typeof value==="object") return `{${Object.keys(value).sort().map(k=>`${JSON.stringify(k)}:${stableJson(value[k])}`).join(",")}}`; return JSON.stringify(value); }
function sha256(value){ return crypto.createHash("sha256").update(typeof value==="string"||Buffer.isBuffer(value)?value:stableJson(value)).digest("hex"); }
function fileSha256(filePath){ return sha256(fs.readFileSync(filePath)); }
function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
function randn(rng){ let u=0,v=0; while(u===0) u=rng(); while(v===0) v=rng(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }
function gaussianAic(points, field, k, penalty){ let nll=0; for(const pt of points){ const r=pt.observed_delta-pt[field]; const s2=pt.measurement_sigma**2; nll+=0.5*(Math.log(2*Math.PI*s2)+(r*r)/s2); } return 2*k*penalty+2*nll; }
function percentile(xs,p){ const s=[...xs].sort((a,b)=>a-b); const idx=(s.length-1)*p; const lo=Math.floor(idx), hi=Math.ceil(idx); if(lo===hi) return s[lo]; return s[lo]*(hi-idx)+s[hi]*(idx-lo); }
function main(){
  const manifest=JSON.parse(fs.readFileSync(MANIFEST,"utf8"));
  const excluded=new Set((manifest.exclusion_log||[]).map(x=>x.point_id));
  const base=manifest.measurement_points.filter(pt=>!excluded.has(pt.id));
  const qK=manifest.model_parameters.qicn_free_parameters.length;
  const rK=manifest.model_parameters.rival_free_parameters.length;
  const penalty=manifest.model_parameters.complexity_penalty_factor;
  const rng=mulberry32(0x51A7E26);
  const gains=[];
  const iterations=2000;
  for(let i=0;i<iterations;i++){
    const pts=base.map(pt=>{
      const observed=pt.rival_prediction+randn(rng)*pt.measurement_sigma;
      // Null calibration deliberately keeps the preregistered QICN predictions fixed.
      return {...pt, observed_delta: observed};
    });
    const q=gaussianAic(pts,"qicn_prediction",qK,penalty);
    const r=gaussianAic(pts,"rival_prediction",rK,penalty);
    gains.push(r-q);
  }
  const q95=percentile(gains,0.95);
  const q99=percentile(gains,0.99);
  const recommended=Math.max(5.0, Math.ceil(q99*10)/10);
  const reportBase={
    schema_version:"1.0.0",
    generated_at:"2026-05-27",
    governance_boundary:GOVERNANCE,
    manifest:repoPath(MANIFEST),
    manifest_canonical_sha256_excluding_threshold_report_hash:sha256((()=>{ const m=JSON.parse(fs.readFileSync(MANIFEST,"utf8")); if(m.decision_thresholds) delete m.decision_thresholds.threshold_calibration_report_sha256; return stableJson(m); })()),
    null_model:"rival_prediction_plus_declared_gaussian_measurement_noise",
    iterations,
    seed:"0x51A7E26",
    qicn_free_parameter_count:qK,
    rival_free_parameter_count:rK,
    gain_quantiles:{ p50:percentile(gains,0.5), p90:percentile(gains,0.9), p95:q95, p99:q99 },
    recommended_support_gain_aic:recommended,
    status:"internal_null_calibrated_synthetic_engineering_gate_not_external",
    external_support_allowed:false
  };
  const report={...reportBase, report_sha256:sha256(reportBase)};
  fs.mkdirSync(path.dirname(OUT),{recursive:true});
  fs.writeFileSync(OUT,JSON.stringify(report,null,2)+"\n");
  fs.writeFileSync(OUT.replace(/\.json$/,'.md'),`# Threshold Null Calibration v26\n\n${GOVERNANCE}\n\n- Result: PASS\n- Iterations: ${iterations}\n- p99 null gain: ${q99}\n- Recommended support_gain_aic: ${recommended}\n- External support allowed: false\n`);
  manifest.decision_thresholds.threshold_calibration_report_sha256 = fileSha256(OUT);
  fs.writeFileSync(MANIFEST,JSON.stringify(manifest,null,2)+"\n");
  console.log(`Threshold calibration v26: PASS; recommended_support_gain_aic=${recommended}; threshold_report_sha256=${manifest.decision_thresholds.threshold_calibration_report_sha256}`);
}
if(require.main===module) main();
module.exports={sha256,stableJson};
