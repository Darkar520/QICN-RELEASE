'use strict';

/*
 * inventory-traceability.js  (READ-ONLY)
 * ---------------------------------------------------------------------------
 * Construye un inventario completo del proyecto QICN y un grafo de referencias
 * entre archivos (LaTeX \input/\include/\addbibresource, imports de Lean,
 * require() de Node + targets de package.json, schema/registry, y refs
 * #[[file:...]] de steering). Clasifica cada archivo en buckets de decision
 * (KEEP / REVIEW / AI_OUTPUT / BUILD_ARTIFACT / ORPHAN_CANDIDATE / DUPLICATE)
 * para apoyar una limpieza carpeta-por-carpeta.
 *
 * NO BORRA, NO MUEVE, NO MODIFICA NADA. Solo lee y escribe dos reportes en
 * docs/ai-platform-outputs/reports/.
 *
 * Uso:
 *   node scripts/inventory-traceability.js                # corre y escribe reportes
 *   node scripts/inventory-traceability.js --dry          # imprime resumen, no escribe
 *   node scripts/inventory-traceability.js --self-test    # prueba interna minima
 *   node scripts/inventory-traceability.js --root <dir>   # raiz de proyecto alternativa
 *
 * Dependency-free: solo Node stdlib (fs, path, crypto, child_process).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

// --- directorios que NUNCA se inventarian (ruido estructural / pesados) ---
const EXCLUDE_DIRS = new Set([
  '.git',
  '.git.orphan-jobhunter-remote.bak',
  'node_modules',
  '.lake',
  '.venv-phase7',
  '__pyphi_cache__',
  '_build',
  '.vscode',
  '.kiro',
  '.claude',
  '.kilocode',
  '.playwright-mcp',
  '.pnpm-store',
]);

// --- extensiones de artefacto de build LaTeX (ruido, no fuente) ---
const BUILD_ARTIFACT_EXT = new Set([
  '.aux', '.bbl', '.bcf', '.blg', '.log', '.out', '.toc', '.lof', '.lot',
  '.fls', '.fdb_latexmk', '.synctex', '.gz', '.nav', '.snm', '.vrb', '.idx',
  '.ilg', '.ind', '.xml', // .run.xml; xml general lo refinamos abajo
]);

// --- clasificacion de tipo por extension ---
function classifyType(rel) {
  const ext = path.extname(rel).toLowerCase();
  const base = path.basename(rel).toLowerCase();
  if (base.endsWith('.run.xml')) return 'BUILD_ARTIFACT';
  if (ext === '.tex') return 'LATEX';
  if (ext === '.bib') return 'BIB';
  if (ext === '.lean') return 'LEAN';
  if (ext === '.js' || ext === '.cjs' || ext === '.mjs') return 'NODE';
  if (ext === '.json') return 'JSON';
  if (ext === '.jsonl') return 'JSONL';
  if (ext === '.md') return 'MARKDOWN';
  if (ext === '.txt') return 'TEXT';
  if (ext === '.pdf') return 'PDF';
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.svg') return 'IMAGE';
  if (ext === '.py') return 'PYTHON';
  if (ext === '.ps1' || ext === '.psm1') return 'POWERSHELL';
  if (ext === '.toml' || ext === '.lock' || ext === '.yaml' || ext === '.yml') return 'CONFIG';
  if (BUILD_ARTIFACT_EXT.has(ext)) return 'BUILD_ARTIFACT';
  return 'OTHER';
}

function walk(root, rel = '', acc = []) {
  const abs = path.join(root, rel);
  let entries;
  try {
    entries = fs.readdirSync(abs, { withFileTypes: true });
  } catch (e) {
    return acc;
  }
  for (const ent of entries) {
    if (ent.isDirectory()) {
      if (EXCLUDE_DIRS.has(ent.name)) continue;
      walk(root, path.join(rel, ent.name), acc);
    } else if (ent.isFile()) {
      acc.push(rel ? path.join(rel, ent.name) : ent.name);
    }
  }
  return acc;
}

function sha256(absPath) {
  try {
    const buf = fs.readFileSync(absPath);
    return crypto.createHash('sha256').update(buf).digest('hex');
  } catch (e) {
    return null;
  }
}

// extrae una sinopsis de una linea del contenido (titulo / primer encabezado /
// docstring) para dar visibilidad de "que hay" sin abrir cada archivo.
function synopsis(absPath, type) {
  const TEXT_TYPES = ['MARKDOWN', 'LATEX', 'BIB', 'TEXT', 'NODE', 'JSON', 'JSONL',
    'PYTHON', 'POWERSHELL', 'CONFIG'];
  if (!TEXT_TYPES.includes(type)) return '';
  let head;
  try {
    const fd = fs.openSync(absPath, 'r');
    const buf = Buffer.alloc(4096);
    const n = fs.readSync(fd, buf, 0, 4096, 0);
    fs.closeSync(fd);
    head = buf.slice(0, n).toString('utf8');
  } catch (e) { return ''; }
  const lines = head.split(/\r?\n/);
  const clean = (s) => s.replace(/\s+/g, ' ').trim().slice(0, 160);
  if (type === 'MARKDOWN') {
    for (const l of lines) {
      const m = l.match(/^#{1,6}\s+(.*)/);
      if (m) return clean(m[1]);
    }
    for (const l of lines) if (l.trim()) return clean(l);
  }
  if (type === 'LATEX') {
    for (const l of lines) {
      const m = l.match(/\\title\{([^}]*)\}/) || l.match(/\\section\{([^}]*)\}/)
        || l.match(/^%\s*(.+)/);
      if (m && m[1].trim()) return clean(m[1]);
    }
    for (const l of lines) if (l.trim() && !l.trim().startsWith('\\documentclass')) return clean(l);
  }
  if (type === 'NODE' || type === 'PYTHON' || type === 'POWERSHELL') {
    for (const l of lines) {
      const t = l.trim();
      const m = t.match(/^(?:\/\/|#|\*)\s*(.+)/);
      if (m && m[1].length > 3 && !/^[-=*]+$/.test(m[1])) return clean(m[1]);
    }
  }
  if (type === 'JSON') {
    try {
      const obj = JSON.parse(fs.readFileSync(absPath, 'utf8'));
      if (obj && typeof obj === 'object') {
        if (obj.description) return clean(String(obj.description));
        if (obj.name) return clean(String(obj.name));
        return clean('keys: ' + Object.keys(obj).slice(0, 8).join(', '));
      }
    } catch (e) { /* ignore */ }
  }
  for (const l of lines) if (l.trim()) return clean(l);
  return '';
}

// normaliza separadores a posix para keys de grafo
function norm(p) {
  return p.split(path.sep).join('/');
}

// resuelve un target LaTeX relativo a un archivo fuente, probando extensiones
function resolveTarget(fromRel, target, allSet) {
  const fromDir = path.posix.dirname(norm(fromRel));
  const candidatesRaw = [target, target + '.tex', target + '.bib'];
  for (const c of candidatesRaw) {
    const r1 = path.posix.normalize(path.posix.join(fromDir, c));
    if (allSet.has(r1)) return r1;
  }
  return null;
}

// resuelve un require() de Node: prueba .js/.cjs/.mjs e index.*
function resolveNodeTarget(fromRel, target, allSet) {
  const fromDir = path.posix.dirname(norm(fromRel));
  const exts = ['', '.js', '.cjs', '.mjs', '.json',
    '/index.js', '/index.cjs', '/index.mjs'];
  for (const e of exts) {
    const r = path.posix.normalize(path.posix.join(fromDir, target + e));
    if (allSet.has(r)) return r;
  }
  return null;
}

// --- parsers de referencias ---
function parseLatexRefs(content) {
  const refs = [];
  const re = /\\(?:input|include|subfile|addbibresource|bibliography|includegraphics)\s*(?:\[[^\]]*\])?\s*\{([^}]+)\}/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    // bibliography puede tener multiples separados por coma
    m[1].split(',').forEach((t) => refs.push(t.trim()));
  }
  return refs;
}

function parseLeanImports(content) {
  const refs = [];
  const re = /^\s*import\s+([A-Za-z0-9_.]+)/gm;
  let m;
  while ((m = re.exec(content)) !== null) refs.push(m[1].trim());
  return refs;
}

function parseNodeRequires(content) {
  const refs = [];
  const re = /require\(\s*['"](\.[^'"]+)['"]\s*\)/g;
  let m;
  while ((m = re.exec(content)) !== null) refs.push(m[1].trim());
  return refs;
}

function parseSteeringRefs(content) {
  const refs = [];
  const re = /#\[\[file:([^\]]+)\]\]/g;
  let m;
  while ((m = re.exec(content)) !== null) refs.push(m[1].trim());
  return refs;
}

function main(argv) {
  const args = argv.slice(2);
  if (args.includes('--self-test')) return selfTest();

  const dry = args.includes('--dry');
  const rootIdx = args.indexOf('--root');
  const projectRoot = rootIdx >= 0 && args[rootIdx + 1]
    ? path.resolve(args[rootIdx + 1])
    : process.cwd();

  if (!fs.existsSync(path.join(projectRoot, 'package.json'))) {
    console.error('[WARN] no package.json en', projectRoot, '- ¿raiz correcta? usa --root');
  }

  const files = walk(projectRoot).map(norm).sort();
  const allSet = new Set(files);

  // git tracked set (best-effort; el repo git puede ser el padre)
  let tracked = new Set();
  try {
    const out = execFileSync('git', ['ls-files'], {
      cwd: projectRoot, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
    });
    out.split(/\r?\n/).forEach((l) => { if (l) tracked.add(norm(l)); });
  } catch (e) {
    // si projectRoot es subdir del repo, git ls-files devuelve rutas relativas al subdir: ok
  }

  // --- construir grafo de referencias ---
  const referencedBy = new Map(); // target -> [sources]
  const refOut = new Map();       // source -> [targets resolved]
  function addEdge(src, dst) {
    if (!dst) return;
    if (!referencedBy.has(dst)) referencedBy.set(dst, []);
    referencedBy.get(dst).push(src);
    if (!refOut.has(src)) refOut.set(src, []);
    refOut.get(src).push(dst);
  }

  // index Lean: modulo -> archivo
  const leanModuleToFile = new Map();
  for (const f of files) {
    if (f.endsWith('.lean')) {
      // QICNLean/Foo.lean -> QICNLean.Foo  (relativo al dir lean)
      const idx = f.lastIndexOf('/QICNLean/');
      if (idx >= 0) {
        const after = f.slice(idx + 1, -'.lean'.length); // QICNLean/Foo
        const mod = after.split('/').join('.');
        leanModuleToFile.set(mod, f);
      } else if (path.basename(f) === 'QICNLean.lean') {
        leanModuleToFile.set('QICNLean', f);
      }
    }
  }

  const readErrors = [];
  for (const f of files) {
    const type = classifyType(f);
    if (!['LATEX', 'BIB', 'LEAN', 'NODE'].includes(type)) continue;
    let content;
    try { content = fs.readFileSync(path.join(projectRoot, f), 'utf8'); }
    catch (e) { readErrors.push(f); continue; }

    if (type === 'LATEX') {
      for (const t of parseLatexRefs(content)) addEdge(f, resolveTarget(f, t, allSet));
    } else if (type === 'LEAN') {
      for (const mod of parseLeanImports(content)) {
        if (leanModuleToFile.has(mod)) addEdge(f, leanModuleToFile.get(mod));
      }
    } else if (type === 'NODE') {
      for (const t of parseNodeRequires(content)) addEdge(f, resolveNodeTarget(f, t, allSet));
    }
  }

  // package.json: targets de scripts -> entry node files
  const pkgEntries = new Set();
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
    const scripts = pkg.scripts || {};
    for (const cmd of Object.values(scripts)) {
      const re = /node\s+(scripts\/[A-Za-z0-9_\-./]+\.(?:js|cjs|mjs))/g;
      let m;
      while ((m = re.exec(cmd)) !== null) pkgEntries.add(norm(m[1]));
    }
  } catch (e) { /* ignore */ }

  // steering refs (no canonicos pero validos)
  for (const f of files) {
    if (f.endsWith('.md') && f.includes('.kiro/steering')) {
      try {
        const c = fs.readFileSync(path.join(projectRoot, f), 'utf8');
        for (const t of parseSteeringRefs(c)) addEdge(f, resolveTarget(f, t, allSet));
      } catch (e) { /* ignore */ }
    }
  }

  // --- raices de alcanzabilidad ---
  // LaTeX: cualquier .tex NO incluido por otro .tex = raiz
  const includedTex = new Set();
  for (const [src, dsts] of refOut) {
    if (src.endsWith('.tex')) dsts.forEach((d) => { if (d.endsWith('.tex')) includedTex.add(d); });
  }
  const texRoots = files.filter((f) => f.endsWith('.tex') && !includedTex.has(f));

  // Lean: el agregador QICNLean.lean (si existe) + lakefile como raices
  const leanRoots = files.filter((f) =>
    path.basename(f) === 'QICNLean.lean' || path.basename(f).startsWith('lakefile'));

  // Node: entries de package.json
  const nodeRoots = files.filter((f) => pkgEntries.has(f));

  // BFS reachability sobre refOut desde todas las raices
  const reachable = new Set();
  const queue = [...texRoots, ...leanRoots, ...nodeRoots];
  queue.forEach((r) => reachable.add(r));
  while (queue.length) {
    const cur = queue.shift();
    const outs = refOut.get(cur) || [];
    for (const d of outs) if (!reachable.has(d)) { reachable.add(d); queue.push(d); }
  }

  // --- gobernanza: nombres siempre-KEEP ---
  const GOVERNANCE_FILES = new Set([
    'package.json', 'README.md', 'INSTRUCCIONES.md', 'ROADMAP.md', 'VERSION.md',
    'LICENSE', 'CHANGELOG.md', '.gitignore',
  ]);

  // --- construir inventario + clasificacion ---
  const inv = [];
  const byHash = new Map();
  for (const f of files) {
    const abs = path.join(projectRoot, f);
    let stat; try { stat = fs.statSync(abs); } catch (e) { continue; }
    const type = classifyType(f);
    const hash = stat.size <= 25 * 1024 * 1024 ? sha256(abs) : 'SKIPPED_LARGE';
    if (hash && hash !== 'SKIPPED_LARGE') {
      if (!byHash.has(hash)) byHash.set(hash, []);
      byHash.get(hash).push(f);
    }
    const top = f.split('/')[0];
    const isTracked = tracked.size === 0 ? null : tracked.has(f);
    const syn = stat.size <= 2 * 1024 * 1024 ? synopsis(abs, type) : '';
    inv.push({ rel: f, top, type, size: stat.size, mtime: stat.mtime.toISOString(), hash, tracked: isTracked, synopsis: syn });
  }

  // marcar duplicados (mismo hash, >1 archivo)
  const dupGroups = [...byHash.entries()].filter(([, arr]) => arr.length > 1);
  const dupFiles = new Set();
  dupGroups.forEach(([, arr]) => arr.forEach((f) => dupFiles.add(f)));

  // version pattern (v22..v35) en el nombre
  const versionRe = /\bv(2[2-9]|3[0-5])\b/i;

  for (const it of inv) {
    const base = path.basename(it.rel);
    const isAiOutput = it.rel.includes('docs/ai-platform-outputs/');
    const isReferenced = reachable.has(it.rel) || referencedBy.has(it.rel);
    let bucket;
    let note = '';

    if (GOVERNANCE_FILES.has(base) && it.top !== 'docs') {
      bucket = 'KEEP'; note = 'governance/root';
    } else if (it.type === 'BUILD_ARTIFACT' || it.type === 'PDF') {
      bucket = 'BUILD_ARTIFACT'; note = 'artefacto de compilacion (reproducible)';
    } else if (['LATEX', 'BIB', 'LEAN', 'NODE'].includes(it.type)) {
      if (isReferenced) { bucket = 'KEEP'; note = 'alcanzable desde entry-point'; }
      else { bucket = 'ORPHAN_CANDIDATE'; note = 'fuente no alcanzable por ningun root'; }
    } else if (it.top === 'registry') {
      bucket = 'KEEP'; note = 'registry (FCR)';
    } else if (isAiOutput) {
      bucket = 'AI_OUTPUT';
      note = 'output de IA: revisar valor vs ruido';
      if (versionRe.test(base)) note += '; versionado';
    } else {
      bucket = 'REVIEW'; note = 'sin clasificar';
    }

    if (dupFiles.has(it.rel)) note += ' [DUPLICADO-HASH]';
    if (it.tracked === false) note += ' [UNTRACKED]';
    it.bucket = bucket;
    it.referenced = isReferenced;
    it.note = note;
  }

  // --- agregados ---
  const byFolder = new Map();
  for (const it of inv) {
    if (!byFolder.has(it.top)) byFolder.set(it.top, []);
    byFolder.get(it.top).push(it);
  }
  const bucketCount = {};
  for (const it of inv) bucketCount[it.bucket] = (bucketCount[it.bucket] || 0) + 1;

  const result = {
    projectRoot: norm(projectRoot),
    generatedAt: new Date().toISOString(),
    totalFiles: inv.length,
    bucketCount,
    duplicateGroups: dupGroups.length,
    texRoots, leanRoots, nodeRoots: [...nodeRoots],
    readErrors,
    inventory: inv,
    duplicates: dupGroups.map(([h, arr]) => ({ hash: h, files: arr })),
  };

  if (dry) {
    printSummary(result, byFolder);
    return 0;
  }

  // --- escribir reportes (read-only sobre fuente; solo crea docs) ---
  const outRootIdx = args.indexOf('--outRoot');
  const outBase = outRootIdx >= 0 && args[outRootIdx + 1]
    ? path.resolve(args[outRootIdx + 1])
    : projectRoot;
  const outDir = path.join(outBase, 'docs', 'ai-platform-outputs', 'reports');
  fs.mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const tag = norm(projectRoot).split('/').pop();
  const jsonPath = path.join(outDir, `INVENTORY_TRACEABILITY_${tag}_${stamp}.json`);
  const mdPath = path.join(outDir, `INVENTORY_TRACEABILITY_${tag}_${stamp}.md`);
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), 'utf8');
  fs.writeFileSync(mdPath, renderMarkdown(result, byFolder), 'utf8');

  printSummary(result, byFolder);
  console.log('\nReportes escritos:');
  console.log('  ' + norm(path.relative(projectRoot, mdPath)));
  console.log('  ' + norm(path.relative(projectRoot, jsonPath)));
  console.log('\n[NON-DESTRUCTIVE] No se borro, movio ni modifico ningun archivo de fuente.');
  return 0;
}

function printSummary(result, byFolder) {
  console.log('=== QICN Inventory & Traceability (READ-ONLY) ===');
  console.log('Raiz:', result.projectRoot);
  console.log('Archivos inventariados:', result.totalFiles);
  console.log('Buckets:', JSON.stringify(result.bucketCount));
  console.log('Grupos duplicados (mismo hash):', result.duplicateGroups);
  console.log('\nPor carpeta de primer nivel:');
  const rows = [...byFolder.entries()].sort((a, b) => b[1].length - a[1].length);
  for (const [folder, items] of rows) {
    const bc = {};
    items.forEach((it) => { bc[it.bucket] = (bc[it.bucket] || 0) + 1; });
    console.log(`  ${folder.padEnd(34)} ${String(items.length).padStart(5)}  ${JSON.stringify(bc)}`);
  }
}

function renderMarkdown(result, byFolder) {
  const L = [];
  L.push('# QICN — Inventario y Trazabilidad de Archivos');
  L.push('');
  L.push('Status: `NON_CANONICAL_AI_OUTPUT` · Human review: `REQUIRED`');
  L.push('`external_support_certified = false` · read-only, no destructivo');
  L.push('');
  L.push(`Generado: ${result.generatedAt}`);
  L.push(`Raiz de proyecto: \`${result.projectRoot}\``);
  L.push('');
  L.push('> Este reporte NO borra ni mueve nada. Propone buckets de decision para');
  L.push('> una limpieza carpeta-por-carpeta que tu apruebas manualmente. Los');
  L.push('> scripts versionados (v22..v35) y el registry estan protegidos por');
  L.push('> gobernanza: no son ruido. El ruido candidato vive sobre todo en');
  L.push('> `docs/ai-platform-outputs/` (bucket AI_OUTPUT).');
  L.push('');
  L.push('## Leyenda de buckets');
  L.push('');
  L.push('- **KEEP** — fuente alcanzable desde un entry-point, registry, o gobernanza.');
  L.push('- **BUILD_ARTIFACT** — artefacto de compilacion / PDF (reproducible, ruido estructural).');
  L.push('- **AI_OUTPUT** — salida de IA bajo `docs/ai-platform-outputs/`: revisar valor vs ruido.');
  L.push('- **ORPHAN_CANDIDATE** — fuente (.tex/.lean/.js/.bib) no alcanzable por ningun root.');
  L.push('- **REVIEW** — sin clasificar automaticamente; requiere ojo humano.');
  L.push('- Sufijos: `[DUPLICADO-HASH]` mismo contenido en >1 ruta; `[UNTRACKED]` no esta en git.');
  L.push('');
  L.push('## Resumen global');
  L.push('');
  L.push('| Metrica | Valor |');
  L.push('|---|---|');
  L.push(`| Archivos inventariados | ${result.totalFiles} |`);
  L.push(`| Grupos duplicados (mismo hash) | ${result.duplicateGroups} |`);
  for (const [b, n] of Object.entries(result.bucketCount).sort((a, b2) => b2[1] - a[1])) {
    L.push(`| bucket ${b} | ${n} |`);
  }
  L.push('');
  L.push('## Por carpeta de primer nivel');
  L.push('');
  L.push('| Carpeta | Archivos | Buckets |');
  L.push('|---|---|---|');
  const rows = [...byFolder.entries()].sort((a, b) => b[1].length - a[1].length);
  for (const [folder, items] of rows) {
    const bc = {};
    items.forEach((it) => { bc[it.bucket] = (bc[it.bucket] || 0) + 1; });
    L.push(`| \`${folder}\` | ${items.length} | ${JSON.stringify(bc)} |`);
  }
  L.push('');
  L.push('## Entry-points detectados');
  L.push('');
  L.push(`- Raices LaTeX (.tex no incluidos por otro): ${result.texRoots.length}`);
  result.texRoots.slice(0, 60).forEach((r) => L.push(`  - \`${r}\``));
  L.push(`- Raices Lean: ${result.leanRoots.length}`);
  result.leanRoots.forEach((r) => L.push(`  - \`${r}\``));
  L.push(`- Entry-points Node (package.json): ${result.nodeRoots.length}`);
  L.push('');
  L.push('## ORPHAN_CANDIDATE (fuente no alcanzable — revisar primero)');
  L.push('');
  const orphans = result.inventory.filter((i) => i.bucket === 'ORPHAN_CANDIDATE');
  if (!orphans.length) L.push('_(ninguno)_');
  else {
    L.push('| Archivo | Tipo | Tamaño | Tracked | Nota |');
    L.push('|---|---|---|---|---|');
    orphans.forEach((i) => L.push(`| \`${i.rel}\` | ${i.type} | ${i.size} | ${i.tracked} | ${i.note} |`));
  }
  L.push('');
  L.push('## Duplicados por hash (mismo contenido en varias rutas)');
  L.push('');
  if (!result.duplicates.length) L.push('_(ninguno)_');
  else {
    result.duplicates.slice(0, 200).forEach((d) => {
      L.push(`- \`${d.hash.slice(0, 12)}\``);
      d.files.forEach((f) => L.push(`  - \`${f}\``));
    });
  }
  L.push('');
  L.push('## AI_OUTPUT (candidatos a ruido — decision carpeta-por-carpeta)');
  L.push('');
  const ai = result.inventory.filter((i) => i.bucket === 'AI_OUTPUT');
  L.push(`Total AI_OUTPUT: ${ai.length}. Detalle completo en el JSON adjunto.`);
  L.push('');
  L.push('Subcarpetas bajo `docs/ai-platform-outputs/`:');
  const aiSub = new Map();
  ai.forEach((i) => {
    const parts = i.rel.split('/');
    const idx = parts.indexOf('ai-platform-outputs');
    const sub = idx >= 0 && parts[idx + 1] ? parts.slice(0, idx + 2).join('/') : i.rel;
    aiSub.set(sub, (aiSub.get(sub) || 0) + 1);
  });
  L.push('');
  L.push('| Subcarpeta | Archivos |');
  L.push('|---|---|');
  [...aiSub.entries()].sort((a, b) => b[1] - a[1]).forEach(([s, n]) => L.push(`| \`${s}\` | ${n} |`));
  L.push('');
  L.push('## Detalle por carpeta (no-artefactos, con sinopsis)');
  L.push('');
  L.push('Excluye BUILD_ARTIFACT/PDF para reducir ruido. Sinopsis = titulo/');
  L.push('primer encabezado/docstring extraido automaticamente.');
  L.push('');
  const detail = result.inventory
    .filter((i) => i.bucket !== 'BUILD_ARTIFACT')
    .sort((a, b) => a.rel.localeCompare(b.rel));
  // agrupar por carpeta contenedora (dirname)
  const byDir = new Map();
  for (const it of detail) {
    const d = it.rel.includes('/') ? it.rel.slice(0, it.rel.lastIndexOf('/')) : '(raiz)';
    if (!byDir.has(d)) byDir.set(d, []);
    byDir.get(d).push(it);
  }
  for (const d of [...byDir.keys()].sort()) {
    L.push(`### \`${d}/\``);
    L.push('');
    L.push('| Archivo | Bucket | Ref | Sinopsis |');
    L.push('|---|---|---|---|');
    for (const it of byDir.get(d)) {
      const name = it.rel.split('/').pop();
      const syn = (it.synopsis || '').replace(/\|/g, '\\|');
      const ref = it.referenced ? 'si' : 'no';
      let tags = '';
      if ((it.note || '').includes('DUPLICADO')) tags += ' [DUP]';
      if (it.tracked === false) tags += ' [UNTRACKED]';
      L.push(`| \`${name}\`${tags} | ${it.bucket} | ${ref} | ${syn} |`);
    }
    L.push('');
  }
  L.push('---');
  L.push('');
  L.push('Reporte machine-readable completo (todos los campos por archivo) en el');
  L.push('`.json` adjunto del mismo nombre. Decision de remover/archivar: humana,');
  L.push('con inventario + hashes previos, sin `git add -A`.');
  L.push('');
  return L.join('\n');
}

function selfTest() {
  const assert = (c, m) => { if (!c) { console.error('FAIL:', m); process.exit(1); } };
  // parsers
  assert(JSON.stringify(parseLatexRefs('\\input{a/b}\n\\addbibresource{r.bib}')) ===
    JSON.stringify(['a/b', 'r.bib']), 'latex refs');
  assert(parseLatexRefs('\\includegraphics[width=2cm]{img/x.png}')[0] === 'img/x.png', 'graphics ref');
  assert(JSON.stringify(parseLeanImports('import QICNLean.Foo\nimport QICNLean.Bar')) ===
    JSON.stringify(['QICNLean.Foo', 'QICNLean.Bar']), 'lean imports');
  assert(parseNodeRequires("require('./lib/x')")[0] === './lib/x', 'node require');
  assert(parseSteeringRefs('#[[file:openapi.yaml]]')[0] === 'openapi.yaml', 'steering ref');
  assert(classifyType('a/main.tex') === 'LATEX', 'type tex');
  assert(classifyType('a/main.run.xml') === 'BUILD_ARTIFACT', 'type runxml');
  assert(classifyType('a/x.jsonl') === 'JSONL', 'type jsonl');
  // resolveTarget
  const set = new Set(['core/sections/01_a.tex', 'core/refs.bib']);
  assert(resolveTarget('BASECORE.tex', 'core/sections/01_a', set) === 'core/sections/01_a.tex', 'resolve tex');
  assert(resolveTarget('BASECORE.tex', 'core/refs.bib', set) === 'core/refs.bib', 'resolve bib');
  const nset = new Set(['scripts/registry-lib.js', 'scripts/lib/x.js']);
  assert(resolveNodeTarget('scripts/validate.js', './registry-lib', nset) === 'scripts/registry-lib.js', 'resolve node no-ext');
  assert(resolveNodeTarget('scripts/validate.js', './lib/x', nset) === 'scripts/lib/x.js', 'resolve node subdir');
  console.log('SELF-TEST OK');
  return 0;
}

if (require.main === module) {
  process.exit(main(process.argv));
}

module.exports = {
  classifyType, parseLatexRefs, parseLeanImports, parseNodeRequires,
  parseSteeringRefs, resolveTarget, resolveNodeTarget,
};
