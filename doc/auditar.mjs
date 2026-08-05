#!/usr/bin/env node
/**
 * Auditoria do curso "Graph Engineering" (formato INEMA v2).
 * Uso: node doc/auditar.mjs   (a partir da raiz do projeto)
 *
 * Checa os erros criticos do formato-curso-v2 que dao pra verificar por texto:
 * #4/#4b INEMA.CLUB + PRO · #10 "Ver Completo" por card · #11 min 6 topicos
 * #12 "Mapa da trilha" · #13 nav completo · #16 h2 simples · #17 SVG inline
 * #18 anti-FOUC antes do Tailwind · #19 data-* estaveis · #25 scroll-margin-top
 * #28 manifesto identico em toda pagina + topics batendo com o DOM
 * #29 legenda que ensina · #30 exemplo copy-run · links e imagens quebrados
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problemas = [];
const avisos = [];
const nota = (arr, f, msg) => arr.push(`${path.relative(ROOT, f)}: ${msg}`);

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return e.name === 'doc' || e.name === '.git' ? [] : walk(p);
    return [p];
  });
}

const paginas = walk(ROOT).filter(f => f.endsWith('.html'));
if (!paginas.length) { console.error('nenhum HTML encontrado'); process.exit(1); }

// manifesto de referencia = o da landing
const landing = path.join(ROOT, 'index.html');
const manifestoRef = extrairManifesto(fs.readFileSync(landing, 'utf8'));
if (!manifestoRef) { console.error('landing sem manifesto — abortando'); process.exit(1); }
const esperado = JSON.parse(manifestoRef);

function extrairManifesto(s) {
  const m = s.match(/<script type="application\/json" data-inema-manifest>([\s\S]*?)<\/script>/);
  return m ? m[1].trim() : null;
}

// mapa id-do-modulo -> topics declarados no manifesto
const topicsDeclarados = {};
for (const t of esperado.tracks) for (const m of t.modules) topicsDeclarados[m.id] = m.topics;

for (const f of paginas) {
  const s = fs.readFileSync(f, 'utf8');
  const rel = path.relative(ROOT, f);
  const ehModulo = /modulo-\d-\d\.html$/.test(f);
  const ehIndexTrilha = /trilha\d\/index\.html$/.test(f);

  // #18 anti-FOUC antes do Tailwind
  const iFouc = s.indexOf("localStorage.getItem('inema.prefs')");
  const iTw = s.indexOf('cdn.tailwindcss.com');
  if (iFouc === -1) nota(problemas, f, 'sem anti-FOUC (#18)');
  else if (iTw !== -1 && iFouc > iTw) nota(problemas, f, 'anti-FOUC DEPOIS do Tailwind (#18)');

  // #28 manifesto presente e identico
  const man = extrairManifesto(s);
  if (!man) nota(problemas, f, 'sem manifesto do curso (#28)');
  else {
    try {
      const j = JSON.stringify(JSON.parse(man));
      if (j !== JSON.stringify(esperado)) nota(problemas, f, 'manifesto DIVERGE da landing (#28)');
    } catch { nota(problemas, f, 'manifesto com JSON invalido (#28)'); }
  }

  // <meta name="inema-course">
  if (!/<meta name="inema-course" content="loopgraph">/.test(s))
    nota(problemas, f, 'sem <meta name="inema-course"> (#19)');

  // #4/#4b INEMA.CLUB + PRO
  if (!s.includes('https://inema.club')) nota(problemas, f, 'sem link INEMA.CLUB (#4)');
  if (!s.includes('https://inema.pro')) nota(problemas, f, 'sem link PRO (#4b)');
  if (!/text-sky-400[^"]*"[^>]*>INEMA\.CLUB|INEMA\.CLUB/.test(s)) avisos.push(`${rel}: conferir cor sky-400 do INEMA.CLUB`);

  // #13 nav completo: as 5 trilhas
  for (const n of [1, 2, 3, 4, 5]) {
    const temLink = s.includes(`trilha${n}/index.html`) || (s.includes('index.html') && new RegExp(`>T${n}<`).test(s));
    if (!temLink) nota(problemas, f, `nav sem a trilha ${n} (#13)`);
  }
  if (!s.includes('id="theme-toggle"')) nota(problemas, f, 'sem theme toggle (#13)');

  // #1 botoes a esquerda: procura justify-center em barra de botoes
  const jcRuim = [...s.matchAll(/<div class="[^"]*flex[^"]*justify-center[^"]*"[^>]*>\s*<(?:a|button)/g)];
  if (jcRuim.length) nota(problemas, f, `${jcRuim.length}x barra de botoes com justify-center (#1)`);

  // #25 scroll-margin-top (via curso.css) — so confere que a folha esta linkada
  if (!s.includes('assets/curso.css')) nota(problemas, f, 'sem curso.css (light mode + scroll-margin-top)');
  if (!s.includes('assets/learn.css')) nota(problemas, f, 'sem learn.css');
  if (!s.includes('assets/learn.js')) nota(problemas, f, 'sem learn.js');
  if (!/INEMA\.init\(\)/.test(s)) nota(problemas, f, 'sem INEMA.init()');

  // #17 SVG inline
  const svgs = (s.match(/role="img"/g) || []).length;
  if ((ehModulo || ehIndexTrilha) && svgs < 1) nota(problemas, f, 'sem SVG inline role="img" (#17)');

  // aria-label em todo SVG role=img
  const svgSemLabel = [...s.matchAll(/<svg[^>]*role="img"(?![^>]*aria-label)/g)];
  if (svgSemLabel.length) nota(problemas, f, `${svgSemLabel.length}x SVG role="img" sem aria-label (#17)`);

  if (ehModulo) {
    const id = f.match(/modulo-(\d-\d)\.html$/)[1];

    // #28 topics do manifesto x DOM
    const topicos = (s.match(/data-inema-topic="/g) || []).length;
    const decl = topicsDeclarados[id];
    if (topicos !== decl) nota(problemas, f, `tem ${topicos} data-inema-topic mas o manifesto declara ${decl} (#28)`);

    // #19 data-inema-topic com o id certo
    const errados = [...s.matchAll(/data-inema-topic="([^"]+)"/g)]
      .map(m => m[1]).filter(v => !v.startsWith(`modulo-${id}#topico-`));
    if (errados.length) nota(problemas, f, `data-inema-topic fora do padrao: ${errados.join(', ')} (#19)`);

    if (!s.includes(`data-inema-module="${id}"`)) nota(problemas, f, `sem data-inema-module="${id}" (#19)`);
    if (!s.includes(`data-inema-meter="modulo:${id}"`)) nota(problemas, f, `sem medidor do modulo ${id}`);

    // marcar-lido: 1 por secao
    const lidos = (s.match(/data-inema-read-toggle/g) || []).length;
    if (lidos < topicos) nota(problemas, f, `${lidos} botoes marcar-lido para ${topicos} topicos (#20)`);
    if (/data-inema-read-toggle(?![^>]*aria-pressed)/.test(s)) nota(problemas, f, 'marcar-lido sem aria-pressed (#20)');

    // #29 legenda que ensina
    const legendas = (s.match(/O que olhar:/g) || []).length;
    if (legendas < svgs) avisos.push(`${rel}: ${svgs} SVG mas so ${legendas} legendas "O que olhar" (#29)`);

    // #30 exemplo copy-run
    if (!s.includes('code-box')) avisos.push(`${rel}: sem code box copy-run (#30)`);
    else if (!/Como verificar/i.test(s)) nota(problemas, f, 'code box sem "Como verificar" (#30)');

    // #26 accordions com aria-expanded (so onde ha topic-item)
    if (s.includes('class="topic-item"') && !/aria-expanded/.test(s))
      nota(problemas, f, 'accordion sem aria-expanded (#26)');

    // TOC coerente
    const totalToc = s.match(/inema-toc-total">(\d+)</);
    if (totalToc && +totalToc[1] !== topicos)
      nota(problemas, f, `TOC diz ${totalToc[1]} secoes mas ha ${topicos} (#25)`);
  }

  if (ehIndexTrilha) {
    // #12 Mapa da trilha
    if (!/>Mapa da trilha</.test(s)) nota(problemas, f, 'sem h2 "Mapa da trilha" (#12)');
    if (/Navega[cç][aã]o R[aá]pida/i.test(s)) nota(problemas, f, 'usa "Navegacao Rapida" em vez de "Mapa da trilha" (#12)');

    // #16 divisor simples
    if (!/<h2 class="text-2xl font-bold mb-6">Conteudo detalhado<\/h2>/.test(s))
      nota(problemas, f, 'sem h2 simples "Conteudo detalhado" (#16)');

    // #10 Ver Completo por card + #11 min 6 topicos
    const cards = (s.match(/data-inema-module="/g) || []).length;
    const verCompleto = (s.match(/>Ver Completo</g) || []).length;
    if (verCompleto < cards) nota(problemas, f, `${cards} cards mas ${verCompleto} botoes "Ver Completo" (#10)`);
    const topicos = (s.match(/class="topic-item"/g) || []).length;
    if (topicos < cards * 6) nota(problemas, f, `${topicos} topicos expansiveis para ${cards} modulos — minimo ${cards * 6} (#11)`);

    // #3 tres secoes por topico
    const oqe = (s.match(/O que e:/g) || []).length;
    const pq = (s.match(/Por que aprender:/g) || []).length;
    const ck = (s.match(/Conceitos-chave:/g) || []).length;
    if (oqe < topicos || pq < topicos || ck < topicos)
      nota(problemas, f, `3 secoes por topico incompletas: ${oqe}/${pq}/${ck} para ${topicos} topicos (#3)`);

    // #2 numero em circulo, nao seta
    if (/>▶</.test(s)) nota(problemas, f, 'usa seta ▶ em vez de numero em circulo (#2)');
  }

  // links e imagens relativos
  const refs = [...s.matchAll(/(?:href|src)="([^"#:?]+\.(?:html|css|js|png|jpg|svg))"/g)].map(m => m[1]);
  for (const r of new Set(refs)) {
    if (!fs.existsSync(path.resolve(path.dirname(f), r))) nota(problemas, f, `link quebrado: ${r}`);
  }

  // <img> precisa de alt
  const semAlt = [...s.matchAll(/<img (?![^>]*\balt=)[^>]*>/g)];
  if (semAlt.length) nota(problemas, f, `${semAlt.length}x <img> sem alt`);
}

// paginas esperadas pelo manifesto existem?
for (const t of esperado.tracks) {
  const idx = path.join(ROOT, 'curso', `trilha${t.n}`, 'index.html');
  if (!fs.existsSync(idx)) problemas.push(`FALTA: curso/trilha${t.n}/index.html`);
  for (const m of t.modules) {
    if (!fs.existsSync(path.join(ROOT, m.href))) problemas.push(`FALTA: ${m.href}`);
  }
}

const totalTopicos = esperado.tracks.flatMap(t => t.modules).reduce((a, m) => a + m.topics, 0);
console.log(`\n=== auditoria: ${paginas.length} paginas · ${totalTopicos} topicos declarados ===\n`);
if (problemas.length) {
  console.log(`PROBLEMAS (${problemas.length}):`);
  problemas.forEach(p => console.log('  ✗ ' + p));
} else console.log('PROBLEMAS: nenhum ✓');
if (avisos.length) {
  console.log(`\nAVISOS (${avisos.length}):`);
  avisos.forEach(a => console.log('  ! ' + a));
}
console.log('');
process.exit(problemas.length ? 1 : 0);
