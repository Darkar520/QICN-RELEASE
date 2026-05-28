#!/usr/bin/env node
/*
 * QICN Operational Term Promotion Audit v26
 * Sentence-aware deterministic lexical gate.
 * Governance boundary: this audit does not certify external support,
 * consciousness, phenomenality, identity transfer, or bridge-burden closure.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const RULES = path.join(ROOT, "docs", "OPERATIONAL_TERM_PROMOTION_RULES.md");
const OUT_JSON = path.join(ROOT, "docs", "reports", "OPERATIONAL_TERM_PROMOTION_AUDIT_v26.json");
const OUT_MD = path.join(ROOT, "docs", "reports", "OPERATIONAL_TERM_PROMOTION_AUDIT_v26.md");
const GOVERNANCE = "This audit flags unsafe language only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.";

const TERM_SYNONYMS = {
  consciousness: ["consciousness", "conscious", "awareness", "inner awareness", "subjective awareness", "what it is like", "what-it-is-like", "phenomenal character", "phenomenal feel", "subjective feel", "felt character", "first-person experience", "first person experience"],
  phenomenality: ["phenomenality", "phenomenal", "qualia", "qualitative feel", "phenomenal experience", "phenomenal consciousness", "phenomenal character", "what it is like", "what-it-is-like"],
  subjecthood: ["subjecthood", "subjectivity", "first-person", "first person", "first-person subjectivity", "subjective point of view", "point of view"],
  "identity transfer": ["identity transfer", "transfer of identity", "mind upload", "uploading", "substrate transfer", "personal continuity transfer"],
  "external support": ["external support", "empirical validation", "external validation", "validated empirically", "real-world support", "experimentally supported", "corroborated externally"],
  "bridge-burden closure": ["bridge-burden closure", "bridge burden closure", "bridge closure", "phenomenal bridge closed", "hard problem solved", "bridge is solved"]
};
const PROMOTION_VERBS = /\b(proves?|proved|certif(?:y|ies|ied)|demonstrates?|establishes?|validates?|confirms?|guarantees?|settles?|solves?|shows?|corroborates?|verified|supported|conclusive|definitive|stunning|emerges?)\b/i;
const LOCAL_BOUNDARY = /\b(does not|do not|cannot|not yet|no external|synthetic only|internal diagnostic|not certify|not certified|conditional|open burden|scaffold|requires external|does not prove|does not validate|not a proof|not evidence)\b/i;
function readText(p){ try { return fs.readFileSync(p,"utf8"); } catch { return ""; } }
function listFiles(dir){ if(!fs.existsSync(dir)) return []; const out=[]; for(const e of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,e.name); if(e.isDirectory()) out.push(...listFiles(p)); else if(/\.(md|json|tex)$/i.test(e.name)) out.push(p); } return out; }
function escapeRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); }
function termRegex(term){ const variants=TERM_SYNONYMS[term]||[term]; return new RegExp(`\\b(?:${variants.map(escapeRe).join("|")})\\b`,"i"); }
function lineNumberAt(text,index){ return text.slice(0,index).split(/\n/).length; }
function splitParagraphs(text){ return text.split(/\n\s*\n/g).map((body,idx)=>({body,idx})); }
function splitSentences(paragraph){
  const sentences=[]; const re=/[^.!?\n]+(?:[.!?]+|$)/g; let m;
  while((m=re.exec(paragraph.body))!==null){ const raw=m[0]; const text=raw.trim(); if(!text) continue; sentences.push({text, startInParagraph:m.index, endInParagraph:m.index+raw.length}); }
  if(sentences.length===0 && paragraph.body.trim()) sentences.push({text:paragraph.body.trim(), startInParagraph:0, endInParagraph:paragraph.body.length});
  return sentences;
}
function loadRules(){
  // Keep the rule source human-readable; use this hard-coded blocked set as the executable gate.
  return ["consciousness","phenomenality","subjecthood","identity transfer","external support","bridge-burden closure"].map((term)=>({term}));
}
function currentTargets(){
  const specific=[
    "docs/THEORY_CLAIM_LEDGER.md",
    "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
    "docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md",
    "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
    "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.md",
    "docs/protocols/AIC_PARAMETER_DERIVATION_PROTOCOL_v25.md",
    "docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md",
    "docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md",
    "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
    "docs/PREDICTION_REGISTRY_v1.json",
    "docs/FALSIFIER_MATRIX.md",
    "docs/ABLATION_MATRIX.md",
    "docs/ablation_matrix.v1.json",
    "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
    "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
    "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
    "docs/reports/HYBRID_V26_AUDIT_IMPLEMENTATION_REPORT.md"
  ].map((p)=>path.join(ROOT,p));
  const reports=listFiles(path.join(ROOT,"docs","reports")).filter((p)=>/V26|v26|SESSION_ZERO|DOWNGRADE|THRESHOLD_NULL/.test(path.basename(p)) && !/^(FULL_MODIFIED|OPERATIONAL_TERM_PROMOTION_AUDIT|HYBRID_V26_VERIFICATION)/.test(path.basename(p)));
  return [...new Set([...specific,...reports])];
}
function scanFile(file,rules){
  const text=readText(file); if(!text) return [];
  const findings=[];
  const paragraphs=splitParagraphs(text);
  for(const paragraph of paragraphs){
    const paraStart=text.indexOf(paragraph.body);
    const sentences=splitSentences(paragraph);
    const windows=[];
    sentences.forEach((s,i)=>windows.push({kind:"sentence",sentence_index:i,text:s.text,start:s.startInParagraph}));
    for(let i=0;i<sentences.length-1;i++) windows.push({kind:"adjacent_sentence_pair",sentence_index:i,text:`${sentences[i].text} ${sentences[i+1].text}`,start:sentences[i].startInParagraph});
    for(const rule of rules){
      const re=termRegex(rule.term);
      for(const w of windows){
        const match=re.exec(w.text); if(!match) continue;
        const promotion=PROMOTION_VERBS.test(w.text);
        const localBoundary=LOCAL_BOUNDARY.test(w.text);
        const suspicious=promotion && !localBoundary;
        if(match || suspicious){
          findings.push({ file:path.relative(ROOT,file), line: paraStart>=0?lineNumberAt(text, paraStart+w.start):null, term:rule.term, matched_variant:match[0], scope:w.kind, sentence_index:w.sentence_index, local_boundary_present:localBoundary, promotion_language_present:promotion, suspicious_promotion:suspicious, excerpt:w.text.slice(0,260) });
        }
      }
    }
  }
  return findings;
}
function main(){
  const rules=loadRules();
  const targets=currentTargets().filter((p)=>fs.existsSync(p) && path.resolve(p)!==path.resolve(OUT_JSON) && path.resolve(p)!==path.resolve(OUT_MD));
  const findings=[]; for(const file of targets) findings.push(...scanFile(file,rules));
  const failures=findings.filter((f)=>f.suspicious_promotion).map((f)=>`${f.file}:${f.line}: possible unbounded ${f.term} promotion via ${f.matched_variant} (${f.scope})`);
  const report={ schema_version:"4.0.0", generated_at:"2026-05-27", governance_boundary:GOVERNANCE, rules_file:path.relative(ROOT,RULES), semantic_gate:"sentence_level_and_adjacent_sentence_pair_synonym_lexicon_plus_promotion_verb_scan_v26", scanned_files:targets.length, findings, failures, result:failures.length===0?"PASS":"FAIL" };
  fs.mkdirSync(path.dirname(OUT_JSON),{recursive:true}); fs.writeFileSync(OUT_JSON,JSON.stringify(report,null,2)+"\n"); fs.writeFileSync(OUT_MD,`# Operational Term Promotion Audit v26\n\n## Governance boundary\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Semantic gate: ${report.semantic_gate}\n- Scanned files: ${report.scanned_files}\n- Findings: ${findings.length}\n- Failures: ${failures.length}\n\n`,"utf8");
  console.log(`Operational term promotion audit v26: ${report.result}; failures=${failures.length}`);
  if(report.result!=="PASS") process.exit(1);
}
if(require.main===module) main();
module.exports={splitSentences,scanFile,termRegex};
