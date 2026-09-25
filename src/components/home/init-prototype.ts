// @ts-nocheck
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";

export function initPrototype(root: HTMLElement, lenisRef: any) {
  if (!root) return () => {};
  
  // Register plugins if not already registered
  gsap.registerPlugin(ScrollTrigger, Flip);
  
  const d = root;
  let lenis = lenisRef;
  const MOTION = true;

  // Add state classes
  d.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce) d.classList.add('motion');
  if(window.matchMedia('(min-width: 900px) and (hover: hover)').matches && !reduce) d.classList.add('cine');


(function(){
"use strict";
const d = root;
const $ = (s, r=root) => r.querySelector(s);
const $$ = (s, r=root) => [...r.querySelectorAll(s)];
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));

const HAS_G = true;
if (!HAS_G) { d.classList.remove('motion','cine'); }
const MOTION = d.classList.contains('motion');
const CINE = d.classList.contains('cine');
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ------------------------------------------------------------
   MOTION SYSTEM — the single source of truth for timing.
   Level 1 · micro  (hover/press/focus)      0.18s  expo.out
   Level 2 · ui     (state/variant change)    0.42s  expo.out / back.out for snaps
   Level 3 · scene  (theme, camera, stages)   0.9s   power3.inOut, scrub 0.8
   Rules: one scene-level move per viewport; text never moves after it
   becomes readable; scroll drives state, CSS transitions animate it.
   ------------------------------------------------------------ */
const M = { micro:.18, ui:.42, scene:.9, out:'expo.out', inOut:'power3.inOut', snap:'back.out(1.6)', scrub:.8 };

const THEMES = {
  paper:     {'--bg':'#fafaf7','--fg':'#0e0e10','--fg2':'#5f5e5a','--rule':'#e7e5df','--panel':'#ffffff','--panel2':'#f3f2ee','--dot':'rgba(14,14,16,.09)'},
  canvas:    {'--bg':'#0f0f12','--fg':'#f3f2ee','--fg2':'#9b9aa4','--rule':'#26262d','--panel':'#17171c','--panel2':'#1f1f26','--dot':'rgba(255,255,255,.07)'},
  blueprint: {'--bg':'#eef0fb','--fg':'#0e0e10','--fg2':'#525874','--rule':'#d8dcf3','--panel':'#ffffff','--panel2':'#f5f6fd','--dot':'rgba(47,75,255,.12)'},
  accent:    {'--bg':'#2f4bff','--fg':'#ffffff','--fg2':'#cdd4ff','--rule':'rgba(255,255,255,.22)','--panel':'#2438d6','--panel2':'#1f31c0','--dot':'rgba(255,255,255,.12)'}
};
const STAGES = ['Blank Canvas','Wireframe','Components','UI Design','Prototype','Product','Design System','Final Experience'];

/* ---------- Fit boards to their column ---------- */
function fitOne(f){
  const [w,h] = f.dataset.fit.split('x').map(Number);
  const W = f.clientWidth || f.parentElement.clientWidth;
  let s = W / w;
  if (f.dataset.fitVh) s = Math.min(s, innerHeight * parseFloat(f.dataset.fitVh) / h);
  s = Math.min(s, 1.2);
  f.style.setProperty('--s', s.toFixed(4));
  f.style.height = (h*s) + 'px';
  if (f.dataset.fitVh) f.style.width = (w*s) + 'px';
}
function fitAll(){ $$('[data-fit]').forEach(f => { if (f.dataset.fitVh) f.style.width = ''; fitOne(f); }); }
$('#devFit').dataset.fitVh = MOTION ? (innerWidth < 900 ? '0.36' : '0.64') : '2';
const libFit = $('#lib').closest('[data-fit]'); if (CINE) libFit.dataset.fitVh = '0.78';
fitAll();

/* ---------- small helpers ---------- */
const toastEl = $('#toast'); let toastT;
function toast(msg){ toastEl.textContent = msg; toastEl.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(()=>toastEl.classList.remove('show'), 2200); }

/* HR sheet cells */
(function(){ const s = $('#m3sheet'); let h=''; for(let i=0;i<16*16;i++) h+='<i></i>'; s.innerHTML = h; })();

/* Terminal (complete at rest) */
const TERM = [
  ['$ agent run "settings page · save flow"','d'],
  ['<Button variant="primary">','t'],
  ['  // agent-generated scaffolding','d'],
  ['  <Icon name="check" /> Save Settings',''],
  ['</Button>','t'],
  ['Error: Hydration failed at components/layout.tsx:42','e'],
  ['> Auto-fixing via Antigravity…','d'],
  ['✓ Compiled successfully','g'],
  ['→ Review: states, copy and focus order signed off by Aditya','t']
];
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const TERM_LEN = TERM.reduce((a,l)=>a+l[0].length+1,0);
function renderTerm(n){
  let out='', left=n;
  for (const [t,c] of TERM){
    if (left<=0) break;
    const part = t.slice(0, left); left -= t.length+1;
    out += `<span class="${c}">${esc(part)}</span>` + (left>=0?'\n':'');
  }
  $('#termOut').innerHTML = out + (n<TERM_LEN ? '<span class="caret"></span>' : '');
}
renderTerm(TERM_LEN);
$('#termFull').textContent = TERM.map(l=>l[0]).join('\n');

/* Statement words */
const stmt = $('#statement');
stmt.innerHTML = stmt.textContent.trim().split(/\s+/).map(w=>`<span class="w">${esc(w)}</span>`).join(' ');

/* Copy email */
$('#copyMail').addEventListener('click', () => {
  const t = $('#mailA').textContent.trim();
  const fallback = () => { const r = document.createRange(); r.selectNodeContents($('#mailA')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast('Email selected. Press ⌘C / Ctrl+C to copy'); };
  try { navigator.clipboard.writeText(t).then(()=>toast('Email copied'), fallback); } catch(e){ fallback(); }
});

/* Case overlay data */
const CASES = [
  { tag:'01 · Enterprise SaaS & Design Ops', title:'Foundations & Multi-Brand Design System',
    ctx:['Four engineering squads building redundant components','Inconsistent spacing and diverging colour values','No shared accessibility standard'],
    how:['Inventory of existing UI across products','Three-tier tokens: global → semantic → component','State matrix per component with contrast checks','Figma variables kept in sync with code tokens'],
    res:['62 production-ready components','Handoff from 12 days to under 4 (↓ 45%)','100% WCAG AA colour compliance'] },
  { tag:'02 · Healthcare tech & clinical ERP', title:'Healthcare Operations & Doctor Management Platform',
    ctx:['Staff moved across 4 legacy browser tabs','Vitals, charges and invoices lived in separate tools','Billable items were often misattributed'],
    how:['One ward view for vitals, charges and discharge','⌘K patient switcher instead of tab juggling','Tariffs and insurance pre-auth inline in the billing table'],
    res:['Discharge processing 42 → 14 minutes','↓ 38% billing omissions in pilot wards'] },
  { tag:'03 · Enterprise HR tech & talent management', title:'Enterprise Application Management Platform',
    ctx:['80-column spreadsheets for every evaluation','Slow, unresponsive modal forms','Review backlogs of over 3 weeks'],
    how:['Focused one-applicant review replaces the spreadsheet','Structured criteria scoring','Queue-based flow so reviewers never lose their place'],
    res:['250,000+ applications processed','↓ 52% review turnaround','94% positive reviewer satisfaction'] },
  { tag:'04 · Events, hospitality & ticketing SaaS', title:'Global Event & Registration Management Platform',
    ctx:['44% abandonment on registration','Disjointed 6-page forms with irrelevant questions','Confusing ticket pricing tiers'],
    how:['Two steps with conditional questions','Side-by-side tier comparison with a recommended option','Badge printing built into the check-in flow'],
    res:['Completion 56% → 89%','4.2 seconds per on-site check-in'] }
];

/* ============================================================
   INTERACTION LAYER (works with or without GSAP)
   ============================================================ */
let lenis = null;
function scrollToY(y){ if (lenis) lenis.scrollTo(y, {duration:1.4, easing:t=>1-Math.pow(1-t,4)}); else window.scrollTo({top:y, behavior: MOTION?'smooth':'auto'}); }
function scrollToEl(el){ if (!el) return; const y = el.getBoundingClientRect().top + scrollY; scrollToY(y); }
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const id = a.getAttribute('href'); if (id.length<2) { e.preventDefault(); scrollToY(0); return; }
  const el = $("#" + id.slice(1)); if (!el) return;
  e.preventDefault(); scrollToEl(el.parentElement.classList.contains('pin-spacer') ? el.parentElement : el);
});

/* Keyboard: G toggles layout grid */
addEventListener('keydown', e => {
  if (e.target.closest('input,textarea,[contenteditable="true"]')) return;
  if (e.key==='g' || e.key==='G'){ d.classList.toggle('show-grid'); toast(d.classList.contains('show-grid') ? 'Layout grid on · 12 columns' : 'Layout grid off'); }
});

/* Double-click the headline: it's a text layer */
const hTitle = $('#heroTitle');
hTitle.addEventListener('dblclick', () => { hTitle.contentEditable = 'true'; hTitle.focus(); toast('Editing text layer · Esc to finish'); });
hTitle.addEventListener('keydown', e => { if (e.key==='Escape'){ hTitle.contentEditable='false'; hTitle.blur(); } });
hTitle.addEventListener('blur', () => { hTitle.contentEditable='false'; });

/* Design-system inspector (live, clickable) */
const dsb = $('#dsb'), lib = $('#lib');
const DS = { variant:'primary', size:'md', state:'default', theme:'light' };
const PAD = { sm:'8 · 14', md:'12 · 24', lg:'16 · 30' }, PADX = { sm:14, md:22, lg:30 };
function applyDS(p){
  Object.assign(DS, p);
  dsb.dataset.variant = DS.variant; dsb.dataset.size = DS.size; dsb.dataset.state = DS.state;
  lib.dataset.themeMode = DS.theme;
  $$('.seg', lib).forEach(seg => { const k = seg.dataset.prop; $$('button', seg).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v===DS[k]))); });
  const px = PADX[DS.size]; $('#rxL').style.width = $('#rxR').style.width = px+'px';
  $('#rxL').dataset.v = $('#rxR').dataset.v = DS.size==='sm'?'14':DS.size==='lg'?'30':'24';
  $('#insPad').textContent = PAD[DS.size];
  $('#insFill').textContent = DS.state==='disabled' ? 'color.disabled.bg' : DS.variant==='primary' ? (DS.state==='hover'?'color.primary.hover':'color.primary.bg') : DS.variant==='ghost' ? 'transparent' : 'color.surface';
  const dark = DS.theme==='dark';
  $('#libMode').textContent = (dark?'DARK':'LIGHT') + ' · 1920 × 1080';
  $('#tkPrim').textContent = dark ? 'blue.300' : 'blue.500';
  $('#tkSurf').textContent = dark ? 'slate.900' : 'white';
}
$$('.seg button', lib).forEach(b => { b.tabIndex = 0; b.addEventListener('click', () => applyDS({[b.parentElement.dataset.prop]: b.dataset.v})); });

/* Bento reflow (hover / focus grows a card) */
const bento = $('#bento');
function growBx(bx){
  if (bx.classList.contains('big') || innerWidth < 900) return;
  const state = true && MOTION ? Flip.getState($$('.bx', bento)) : null;
  $$('.bx', bento).forEach(b => b.classList.toggle('big', b===bx));
  if (state) Flip.from(state, { duration:.7, ease:'expo.inOut', absolute:false, nested:true });
}
$$('.bx', bento).forEach(bx => { bx.addEventListener('mouseenter', ()=>growBx(bx)); bx.addEventListener('focus', ()=>growBx(bx)); bx.addEventListener('click', ()=>growBx(bx)); });

/* Case study expand / collapse */
const caseEl = $('#case'), sheet = $('#caseSheet'), caseBg = $('#caseBg');
let caseFrom = null, caseBtn = null;
function openCase(i, btn){
  const c = CASES[i]; caseBtn = btn; caseFrom = btn.closest('.fr').querySelector('.fr-body');
  $('#caseTag').textContent = c.tag; $('#caseTitle').textContent = c.title;
  const li = a => '<ul>' + a.map(x=>`<li>${esc(x)}</li>`).join('') + '</ul>';
  $('#caseGrid').innerHTML = `<div><h4>CONTEXT</h4>${li(c.ctx)}</div><div><h4>WHAT CHANGED</h4>${li(c.how)}</div><div><h4>RESULT</h4>${li(c.res)}</div>`;
  const mk = caseFrom.querySelector('.fit.mk').cloneNode(true); mk.removeAttribute('style');
  const wrapMk = $('#caseMk'); wrapMk.innerHTML=''; wrapMk.appendChild(mk);
  const holder = caseFrom.closest('.fr'); // keep active styles in the clone
  wrapMk.className = 'case-mk fr is-active'; wrapMk.style.position='static'; wrapMk.style.width='auto'; wrapMk.style.height='auto';
  caseEl.classList.add('open'); sheet.scrollTop = 0;
  fitOne(mk);
  if (lenis) lenis.stop(); document.body.style.overflow='hidden';
  const r = caseFrom.getBoundingClientRect();
  if (HAS_G && MOTION){
    gsap.set(sheet, {top:r.top, left:r.left, width:r.width, height:r.height, borderRadius:20});
    gsap.set('.case-in', {opacity:0, y:30});
    gsap.to(caseBg, {opacity:1, duration:M.ui});
    gsap.to(sheet, {top:0, left:0, width:innerWidth, height:innerHeight, borderRadius:0, duration:M.scene, ease:'expo.inOut', onComplete:()=>{ sheet.style.width='100%'; sheet.style.height='100%'; }});
    gsap.to('.case-in', {opacity:1, y:0, duration:M.ui*1.5, ease:M.out, delay:M.scene*.6});
  } else { Object.assign(sheet.style,{top:0,left:0,width:'100%',height:'100%',borderRadius:0}); caseBg.style.opacity=1; }
  setTimeout(()=>$('#caseClose').focus({preventScroll:true}), 50);
  cursorLabel('');
}
function closeCase(){
  if (!caseEl.classList.contains('open')) return;
  const done = () => { caseEl.classList.remove('open'); if (lenis) lenis.start(); document.body.style.overflow=''; caseBtn && caseBtn.focus({preventScroll:true}); };
  if (HAS_G && MOTION && caseFrom){
    const r = caseFrom.getBoundingClientRect();
    gsap.to('.case-in', {opacity:0, duration:.2});
    gsap.to(caseBg, {opacity:0, duration:M.ui, delay:.3});
    gsap.to(sheet, {top:r.top, left:r.left, width:r.width, height:r.height, borderRadius:20, duration:.75, ease:'expo.inOut', onComplete:done});
  } else done();
}
$$('[data-open]').forEach(b => b.addEventListener('click', () => openCase(+b.dataset.open, b)));
$('#caseClose').addEventListener('click', closeCase);
caseBg.addEventListener('click', closeCase);
addEventListener('keydown', e => {
  if (!caseEl.classList.contains('open')) return;
  if (e.key==='Escape') closeCase();
  if (e.key==='Tab'){ const f = $$('button,a[href]', sheet); if(!f.length) return; const first=f[0], last=f[f.length-1]; if (e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); } }
});

/* Custom cursor + magnetic buttons + tilt (fine pointers, motion allowed) */
const cur = $('#cur'), curTag = $('#curTag');
function cursorLabel(t){ if (!t){ cur.classList.remove('is-label'); return; } curTag.textContent = t; cur.classList.add('is-label'); }
if (FINE && MOTION && HAS_G){
  d.classList.add('has-cur');
  const qx = gsap.quickTo(cur, 'x', {duration:.18, ease:'power3.out'}), qy = gsap.quickTo(cur, 'y', {duration:.18, ease:'power3.out'});
  addEventListener('pointermove', e => { qx(e.clientX-3); qy(e.clientY-2); }, {passive:true});
  document.addEventListener('pointerover', e => { const t = e.target.closest('[data-cursor]'); cursorLabel(t ? t.dataset.cursor : ''); });
  addEventListener('pointerdown', ()=>cur.classList.add('is-down')); addEventListener('pointerup', ()=>cur.classList.remove('is-down'));
  d.addEventListener('mouseleave', ()=>gsap.to(cur,{opacity:0,duration:.2})); d.addEventListener('mouseenter', ()=>gsap.to(cur,{opacity:1,duration:.2}));

  $$('[data-magnetic]').forEach(el => {
    const mx = gsap.quickTo(el,'x',{duration:.5,ease:'power3.out'}), my = gsap.quickTo(el,'y',{duration:.5,ease:'power3.out'});
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); const x = e.clientX-r.left, y = e.clientY-r.top; mx((x-r.width/2)*.3); my((y-r.height/2)*.35); el.style.setProperty('--mx', x+'px'); el.style.setProperty('--my', y+'px'); });
    el.addEventListener('pointerleave', () => gsap.to(el, {x:0, y:0, duration:.8, ease:'elastic.out(1,.4)'}));
  });
  $$('.cm .bub, .bx, .pf').forEach(el => {
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5; gsap.to(el,{rotateY:px*5, rotateX:-py*5, transformPerspective:900, duration:M.ui, ease:M.out}); });
    el.addEventListener('pointerleave', () => gsap.to(el,{rotateY:0, rotateX:0, duration:.7, ease:M.out}));
  });
  /* hero floats follow the pointer with depth */
  const floats = $$('.float'); const hero = $('#studio');
  hero.addEventListener('pointermove', e => { const cx = e.clientX/innerWidth-.5, cy = e.clientY/innerHeight-.5; floats.forEach(f => { const k = parseFloat(f.dataset.depth)||1; gsap.to(f.firstElementChild, {x:-cx*24*k, y:-cy*18*k, duration:1, ease:M.out}); }); });
}

/* ============================================================
   FLOW TOOLBAR — the progress indicator
   ============================================================ */
const flowBtns = $$('#flowSteps button');
let flowNow = -1;
function setFlow(i){
  if (i===flowNow) return; flowNow = i;
  $('#flowName').textContent = STAGES[i];
  $('#flowIdx').textContent = `Stage ${String(i+1).padStart(2,'0')} / 08`;
  flowBtns.forEach((b,k) => { b.classList.toggle('on', k===i); b.classList.toggle('done', k<i); b.setAttribute('aria-current', k===i ? 'step' : 'false'); });
}
setFlow(0);

if (!HAS_G){ return; }
gsap.registerPlugin(ScrollTrigger); if (true) gsap.registerPlugin(Flip);
gsap.defaults({ ease: M.out, duration: M.ui });

/* Lenis smooth scroll wired to GSAP's ticker */
if (MOTION && true){
  lenis = new Lenis({ lerp:.1, smoothWheel:true, wheelMultiplier:1 });
  
  gsap.ticker.add(t => lenis.raf(t*1000));
  
}

gsap.set(d, THEMES.paper);
ScrollTrigger.create({ start:0, end:'max', onUpdate:s => $('#flowBar').style.setProperty('--p', s.progress.toFixed(4)) });

/* ============================================================
   STUDIO — the portfolio builds itself
   ============================================================ */
const studio = $('#studio');
const STUDIO_LEN = CINE ? 6.2 : 4.4;           // viewport-heights of scroll
const STAGE_AT = [0, .2, .37, .54, .71, .9];   // where flow buttons jump to
let studioST = null, stageNow = -1;
function setStage(s){
  if (s===stageNow) return; stageNow = s;
  studio.dataset.stage = s;
  setFlow(Math.min(s,5));
  if (s===5){
    const o = {v:42}; gsap.to(o, {v:14, duration:1.2, ease:'power2.out', onUpdate:()=>$('#dis').textContent = Math.round(o.v)});
    const due = {v:426}; gsap.to(due, {v:85.2, duration:1.2, ease:'power2.out', onUpdate:()=>$('#due').textContent = '$'+due.v.toFixed(2)});
  }
}
if (MOTION){
  setStage(0);
  const selBox = $('#selBox'), selSize = $('#selSize'), lines = $$('#heroTitle .ln>span');
  /* intro: a selection box is dragged open and the headline is typed into it */
  const intro = gsap.timeline({ delay:.25 });
  const heroSel = $('#heroSel');
  intro.from('.frame-name, .hero .pill', {opacity:0, y:-10, duration:.6, stagger:.08})
       .fromTo(selBox, {scaleX:0, scaleY:0}, {scaleX:1, scaleY:1, duration:1.1, ease:'expo.inOut', onUpdate(){ const p = this.progress(); selSize.textContent = `W ${Math.round(heroSel.offsetWidth*p)} · H ${Math.round(heroSel.offsetHeight*p)}`; }}, '<.1')
       .from(lines, {yPercent:115, duration:1.1, ease:'expo.out', stagger:.12}, '<.35')
       .from('.hero-sub, .hero-cta, .hero-meta', {opacity:0, y:22, duration:.8, stagger:.08}, '-=.7')
       .from('.float > *', {opacity:0, scale:.85, duration:.9, stagger:.07, ease:M.snap}, '-=.7');

  /* hero → build: the canvas zooms out and the frame arrives in perspective */
  const heroOut = gsap.timeline({ scrollTrigger:{ trigger:studio, refreshPriority:10, start:'top top', end:()=>'+='+innerHeight*STUDIO_LEN*.16, scrub:M.scrub, invalidateOnRefresh:true } });
  heroOut.to('#hero', {scale:.84, yPercent:-10, opacity:0, ease:'power2.in', duration:.5}, 0)
         .to('.fl-tokens, .fl-mobile', {xPercent:60, yPercent:-30, opacity:0, duration:1}, 0)
         .to('.fl-steps, .fl-density, .fl-size', {xPercent:-80, yPercent:20, opacity:0, duration:1}, 0)
         .fromTo('#build', {opacity:0}, {opacity:1, duration:.5, ease:'none'}, .45)
         .fromTo('.devwrap', {scale:.72, y:140, rotateX:22, transformPerspective:1400, transformOrigin:'50% 100%'}, {scale:1, y:0, rotateX:0, duration:.6, ease:'power2.out'}, .4);

  studioST = ScrollTrigger.create({
    trigger:studio, start:'top top', end:()=>'+='+innerHeight*STUDIO_LEN, pin:'#studioPin', anticipatePin:1, refreshPriority:10, invalidateOnRefresh:true,
    onUpdate:self => {
      const p = self.progress;
      const s = p < .13 ? 0 : clamp(1 + Math.floor((p-.16)/(.84/5)), 1, 5);
      setStage(s);
      const sub = s===0 ? 0 : clamp(((p-.16) - (s-1)*(.84/5)) / (.84/5), 0, 1);
      studio.style.setProperty('--cp', sub.toFixed(3));
      $$('.cap-bar i').forEach(i=>i.style.setProperty('--cp', sub.toFixed(3)));
    },
    onLeave:() => setFlow(5)
  });
  flowBtns.forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.go;
    if (i<=5 && studioST) scrollToY(studioST.start + (studioST.end-studioST.start)*STAGE_AT[i] + 2);
    else scrollToEl(i===6 ? $('#system') : $('#contact'));
  }));
} else {
  flowBtns.forEach(b => b.addEventListener('click', () => { const i=+b.dataset.go; scrollToEl(i===0?$('#studio'):i<=4?$('#build'):i===5?$('#stats'):i===6?$('#system'):$('#contact')); }));
}

/* ============================================================
   STATS — cards snap into an auto-layout frame
   ============================================================ */
const al = $('#al');
function countUp(){ $$('[data-count]', al).forEach(b => { const n = +b.dataset.count, o={v:0}; gsap.to(o,{v:n,duration:1.4,ease:'power2.out',onUpdate:()=>b.textContent=Math.round(o.v)+'+'}); }); }
if (MOTION && true){
  const sts = $$('.st', al);
  const pile = () => { al.classList.add('pile'); sts.forEach((s,k)=>{ s.style.gridArea='1/1'; s.style.justifySelf='center'; s.style.width='min(320px,100%)'; s.style.transform=`translate(${(k-1.5)*14}px,${(k-1.5)*10}px) rotate(${(k-1.5)*3}deg)`; s.style.zIndex=4-k; }); $('#alDir').textContent='Off · absolute'; $('#alGap').textContent='—'; };
  const lay  = () => { al.classList.remove('pile'); sts.forEach(s=>{ s.style.gridArea=''; s.style.justifySelf=''; s.style.width=''; s.style.transform=''; s.style.zIndex=''; }); $('#alDir').textContent='→ Horizontal'; $('#alGap').textContent='16'; };
  pile();
  ScrollTrigger.create({ trigger:al, start:'top 72%',
    onEnter:() => { const st = Flip.getState(sts); lay(); Flip.from(st, {duration:1, ease:'expo.inOut', stagger:.06}); countUp(); },
    onLeaveBack:() => { const st = Flip.getState(sts); pile(); Flip.from(st, {duration:.7, ease:'power3.inOut'}); }
  });
}

/* Generic reveals — level 2 */
if (MOTION){
  $$('.sec-head, .al-head, .tooling, .br-copy, .ai-grid > div:first-child, .tools-g, .gains, .ab-text, .pr, .ab-card').forEach(el => {
    gsap.from(el, { opacity:0, y:36, duration:1, ease:M.out, scrollTrigger:{ trigger:el, start:'top 86%', once:true } });
  });
  gsap.from('.bx', { opacity:0, y:60, scale:.96, duration:1, stagger:.08, ease:M.out, scrollTrigger:{ trigger:'#bento', start:'top 82%', once:true } });
  $$('.cm').forEach((c,k) => {
    const tl = gsap.timeline({ scrollTrigger:{ trigger:c, start:'top 85%', once:true } });
    tl.from(c.querySelector('.pin'), {scale:0, rotate:-45, duration:.6, ease:M.snap, delay:k*.12})
      .from(c.querySelector('.bub'), {opacity:0, scale:.85, transformOrigin:'0 0', duration:.7, ease:M.out}, '-=.25');
  });
  /* parallax depth on comments */
  $$('.cm').forEach((c,k) => gsap.to(c, { yPercent:-(k+1)*8, ease:'none', scrollTrigger:{ trigger:'#voices', start:'top bottom', end:'bottom top', scrub:true } }));
}

/* ============================================================
   WORK — camera over a Figma canvas
   ============================================================ */
const frames = $$('#world .fr');
function setActiveFrame(i){ frames.forEach((f,k)=>{ const on = k===i; if (on !== f.classList.contains('is-active')){ f.classList.toggle('is-active', on); if (k===3){ const r=$('#ring'); r.style.setProperty('--v', on?89:56); r.querySelector('b').textContent=(on?89:56)+'%'; } } }); }
if (CINE){
  const world = $('#world');
  const POS = [[0,0],[1400,0],[0,940],[1400,940]];
  const fs = () => Math.min(innerWidth*.86/1200, (innerHeight-150)/740);
  const ov = () => Math.min(innerWidth/3300, (innerHeight-340)/1760);
  const cam = { x:1300, y:840, s:.3, oy:0, ox:0 };
  const zoomEl = $('#flowZoom');
  const apply = () => {
    world.style.transform = `translate(${innerWidth/2 + cam.ox}px,${innerHeight/2 + cam.oy}px) scale(${cam.s}) translate(${-cam.x}px,${-cam.y}px)`;
    if (tl.scrollTrigger && tl.scrollTrigger.isActive) zoomEl.textContent = Math.round(cam.s*100) + '%';
    let act = -1; const S = fs();
    POS.forEach(([x,y],k) => { if (Math.abs(cam.x-(x+600))<160 && Math.abs(cam.y-(y+370))<120 && cam.s > S*.8) act = k; });
    setActiveFrame(act);
  };
  const tl = gsap.timeline({ defaults:{ ease:M.inOut }, onUpdate:apply,
    scrollTrigger:{ trigger:'#work', start:'top top', end:()=>'+='+innerHeight*7.5, pin:'#work', scrub:1, refreshPriority:9, invalidateOnRefresh:true,
      onLeave:()=>{ zoomEl.textContent='100%'; }, onLeaveBack:()=>{ zoomEl.textContent='100%'; }, onEnter:apply, onEnterBack:apply } });
  tl.fromTo(cam, {x:1300, y:840, s:()=>ov(), oy:()=>innerHeight*.17, ox:()=>innerWidth*.2}, {x:1300, y:840, s:()=>ov()*1.05, oy:()=>innerHeight*.17, ox:()=>innerWidth*.2, duration:.5, ease:'none'})
    .to('#workHead', {opacity:0, y:-40, duration:.4, ease:'power2.in'}, '>')
    .to(cam, {x:600, y:370, s:()=>fs(), oy:20, ox:0, duration:1}, '<');
  const hold = () => tl.to({}, {duration:.7});
  hold();
  [1,2,3].forEach(i => {
    const [x,y] = POS[i];
    tl.to(cam, {x:(POS[i-1][0]+x)/2+600, y:(POS[i-1][1]+y)/2+370, s:()=>fs()*.5, duration:.55, ease:'power2.inOut'})
      .to(cam, {x:x+600, y:y+370, s:()=>fs(), duration:.55, ease:'power2.inOut'});
    hold();
  });
  tl.to(cam, {x:1300, y:840, s:()=>ov()*1.2, oy:0, ox:0, duration:1});
  cam.s = ov(); cam.oy = innerHeight*.17; cam.ox = innerWidth*.2; apply(); zoomEl.textContent='100%';
  addEventListener('resize', apply);
} else {
  frames.forEach((f,k) => ScrollTrigger.create({ trigger:f, start:'top 65%', end:'bottom 35%', onToggle:s=>{ if (s.isActive) setActiveFrame(k); } }));
  if (!MOTION) frames.forEach(f=>f.classList.add('is-active'));
  if (MOTION) frames.forEach(f => gsap.from(f, {opacity:0, y:80, scale:.94, duration:1.1, ease:M.out, scrollTrigger:{trigger:f, start:'top 88%', once:true}}));
}
/* Canvas section arrives as a dark window opening over the paper */
if (MOTION){
  gsap.fromTo('#work', {clipPath:'inset(8% 6% 0% 6% round 36px)'}, {clipPath:'inset(0% 0% 0% 0% round 0px)', ease:'none', scrollTrigger:{ trigger:'#work', start:'top 95%', end:'top 15%', scrub:true }});
}

/* ============================================================
   DESIGN SYSTEM — scroll assembles and compiles the library
   ============================================================ */
const SEQ3 = [
  {variant:'primary',state:'default',size:'md'},{variant:'primary',state:'hover',size:'md'},{variant:'primary',state:'pressed',size:'md'},{variant:'primary',state:'focus',size:'md'},
  {variant:'secondary',state:'default',size:'md'},{variant:'ghost',state:'hover',size:'md'},{variant:'primary',state:'default',size:'sm'},{variant:'primary',state:'default',size:'lg'},{variant:'primary',state:'disabled',size:'md'}
];
let dsStep = -1, dsSub = -1, sorted = false;
const dg = $('#dg'), dgRows = $$('.dg-r', dg);
function sortDG(on){
  if (on===sorted) return; sorted = on;
  const st = true ? Flip.getState(dgRows) : null;
  const order = on ? [...dgRows].sort((a,b)=>a.dataset.o-b.dataset.o) : dgRows;
  order.forEach(r => dg.appendChild(r));
  if (st) Flip.from(st, {duration:.7, ease:'expo.inOut', stagger:.04});
}
function dsUpdate(p){
  const step = clamp(1 + Math.floor(p*5), 1, 5);
  const sub = (p*5) - (step-1);
  if (step !== dsStep){
    dsStep = step; lib.dataset.step = step;
    $$('#sysSteps li').forEach(li => li.classList.toggle('on', +li.dataset.st===step));
    sortDG(step>=4);
    if (step===5) applyDS({theme:'dark', variant:'primary', state:'default', size:'md'});
    else if (DS.theme==='dark') applyDS({theme:'light'});
    if (step<3) applyDS({variant:'primary', state:'default', size:'md'});
  }
  $$('#sysSteps li').forEach(li => li.style.setProperty('--sp', +li.dataset.st===step ? sub.toFixed(3) : (+li.dataset.st<step?1:0)));
  if (step===3){ const k = clamp(Math.floor(sub*SEQ3.length), 0, SEQ3.length-1); if (k!==dsSub){ dsSub = k; applyDS(SEQ3[k]); } } else dsSub = -1;
}
if (MOTION){
  if (CINE){
    d.classList.add('sys-pin');
    ScrollTrigger.create({ trigger:'#system', start:'top top', end:()=>'+='+innerHeight*3.2, pin:true, anticipatePin:1, refreshPriority:8, onUpdate:s=>dsUpdate(s.progress) });
  } else {
    ScrollTrigger.create({ trigger:'#system', start:'top 60%', end:'bottom 40%', onUpdate:s=>dsUpdate(s.progress) });
  }
  dsUpdate(0);
}

/* ============================================================
   PROCESS — horizontal prototype flow
   ============================================================ */
if (CINE){
  const track = $('#track'), pfs = $$('.pf', track), links = $$('.pf-link path', track);
  const dist = () => Math.max(0, track.scrollWidth - innerWidth);
  gsap.to(track, { x:()=>-dist(), ease:'none', scrollTrigger:{ trigger:'#process', start:'top top', end:()=>'+='+dist(), pin:true, scrub:M.scrub, refreshPriority:7, invalidateOnRefresh:true,
    onUpdate:() => {
      pfs.forEach((pf,k) => { const r = pf.getBoundingClientRect(); pf.classList.toggle('on', r.left < innerWidth*.62 && r.right > innerWidth*.3);
        if (links[k]) links[k].parentElement.style.setProperty('--d', clamp((innerWidth*.9 - r.right)/260, 0, 1).toFixed(3)); });
    } } });
}

/* ============================================================
   BRIDGE — design becomes code under a scanning line
   ============================================================ */
if (MOTION){
  const wipe = $('#wipe');
  gsap.fromTo(wipe, {'--wx':'94%'}, {'--wx':'6%', ease:'none', scrollTrigger:{ trigger:wipe, start:'top 80%', end:'bottom 25%', scrub:M.scrub }});
}

/* ============================================================
   AI — the terminal is typed by your scroll
   ============================================================ */
if (MOTION){
  const ph = $$('#phases span');
  ScrollTrigger.create({ trigger:'.term', start:'top 80%', end:'bottom 35%', scrub:true,
    onUpdate:s => { renderTerm(Math.round(s.progress*TERM_LEN)); const k = Math.min(5, Math.floor(s.progress*6)); ph.forEach((e,i)=>e.classList.toggle('on', i===k)); } });
  renderTerm(0);
}

/* ============================================================
   ABOUT — words ink in as you read
   ============================================================ */
if (MOTION){
  const ws = $$('#statement .w'); const N = ws.length;
  ScrollTrigger.create({ trigger:'#statement', start:'top 85%', end:'bottom 45%', scrub:true,
    onUpdate:s => ws.forEach((w,k) => w.style.setProperty('--f', clamp(s.progress*N*1.15 - k, .16, 1).toFixed(3))) });
  ws.forEach(w => w.style.setProperty('--f', .16));
}

/* ============================================================
   FINAL — pull back to see the whole file
   ============================================================ */
if (MOTION){
  gsap.fromTo('#contact', {clipPath:'inset(10% 5% 0% 5% round 48px)'}, {clipPath:'inset(0% 0% 0% 0% round 0px)', ease:'none', scrollTrigger:{ trigger:'#contact', start:'top bottom', end:'top 20%', scrub:true }});
  gsap.fromTo('#overview', {scale:2.6, opacity:.55}, {scale:1, opacity:.22, ease:'none', scrollTrigger:{ trigger:'#contact', start:'top bottom', end:'top top', scrub:true }});
  gsap.from('#finalTitle .ln>span', { yPercent:115, duration:1.2, ease:M.out, stagger:.1, scrollTrigger:{ trigger:'#finalTitle', start:'top 82%', toggleActions:'play none none reverse' } });
}

const spacer = el => el;
/* Scroll-driven theme */
function applyTheme(name){ d.dataset.zoneNow = name; gsap.to(d, Object.assign({duration: MOTION?M.scene:.2, ease:'power2.inOut', overwrite:'auto'}, THEMES[name])); }
const zones = $$('[data-zone]');
const zStart = sec => sec.id==='contact' ? 'top 12%' : sec.id==='work' ? 'top 35%' : 'top 55%';
zones.forEach((sec,k) => {
  const nx = zones[k+1];
  ScrollTrigger.create({ trigger:sec, start:zStart(sec), endTrigger: nx || undefined, end: nx ? zStart(nx) : 'max', onToggle:s => { if (s.isActive) applyTheme(sec.dataset.zone); } });
});
const flows = $$('[data-flow]');
flows.forEach((sec,k) => {
  if (sec.id==='studio') return;
  const nx = flows[k+1];
  ScrollTrigger.create({ trigger:sec, start:'top 50%', endTrigger: nx || undefined, end: nx ? 'top 50%' : 'max', onToggle:s => { if (s.isActive) setFlow(+sec.dataset.flow); } });
});
/* nav highlight */
const navMap = { work:'#work', system:'#system', process:'#process', about:'#about' };
Object.keys(navMap).forEach(id => { const a = $(`.links a[href="${navMap[id]}"]`); ScrollTrigger.create({ trigger:spacer($('#'+id)), start:'top 50%', end:'bottom 50%', onToggle:s=>a.classList.toggle('on', s.isActive) }); });

ScrollTrigger.sort(); ScrollTrigger.refresh();

/* ---------- resize: refit boards, then recompute triggers ---------- */
let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { $('#devFit').dataset.fitVh = MOTION ? (innerWidth < 900 ? '0.36' : '0.64') : '2'; fitAll(); ScrollTrigger.refresh(); }, 160); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fitAll(); ScrollTrigger.refresh(); });
console.log('%c◆ Aditya Tripathi', 'color:#2f4bff;font:600 14px Inter Tight,sans-serif', '\nYou opened the inspector. Press G for the layout grid, double-click the headline to edit it.');
})();


  return () => {
    if (typeof teardown !== 'undefined') teardown.forEach(f => f && f());
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf('*');
  };
}
