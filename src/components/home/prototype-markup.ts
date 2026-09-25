export const PROTOTYPE_HTML = `
<div class="flow" id="flow" role="navigation" aria-label="Design workflow progress">
  <div class="flow-now"><span id="flowIdx">Stage 01 / 08</span><b id="flowName">Blank Canvas</b></div>
  <div class="flow-steps" id="flowSteps">
    <button data-go="0" aria-label="Blank Canvas"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke-dasharray="2 2"/></svg><span class="tip">Blank Canvas</span></button>
    <button data-go="1" aria-label="Wireframe"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5"/><path d="M3 3l10 10M13 3L3 13"/></svg><span class="tip">Wireframe</span></button>
    <button data-go="2" aria-label="Components"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 1.8l2.4 2.4L8 6.6 5.6 4.2zM8 9.4l2.4 2.4L8 14.2l-2.4-2.4zM4.2 5.6L6.6 8l-2.4 2.4L1.8 8zM11.8 5.6L14.2 8l-2.4 2.4L9.4 8z"/></svg><span class="tip">Components</span></button>
    <button data-go="3" aria-label="UI Design"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="5.5"/><path d="M8 2.5v11" /><path d="M8 2.5a5.5 5.5 0 010 11z" fill="currentColor"/></svg><span class="tip">UI Design</span></button>
    <button data-go="4" aria-label="Prototype"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 3.5l7 4.5-7 4.5z"/></svg><span class="tip">Prototype</span></button>
    <button data-go="5" aria-label="Product"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="3" width="12" height="9" rx="1.5"/><path d="M5.5 7.5l1.8 1.8 3.2-3.3M5 14h6"/></svg><span class="tip">Product</span></button>
    <button data-go="6" aria-label="Design System"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="2.25"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1"/><rect x="9" y="9" width="4.5" height="4.5" rx="1"/></svg><span class="tip">Design System</span></button>
    <button data-go="7" aria-label="Final Experience"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 1.5l1.6 4.9 4.9 1.6-4.9 1.6L8 14.5l-1.6-4.9L1.5 8l4.9-1.6z"/></svg><span class="tip">Final Experience</span></button>
  </div>
  <div class="flow-zoom tab" id="flowZoom" aria-label="Canvas zoom">100%</div>
  <div class="flow-kbd"><kbd>G</kbd> grid</div>
  <div class="flow-bar"><i id="flowBar"></i></div>
</div>

<div class="cur" id="cur" aria-hidden="true">
  <svg viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" fill="#2f4bff" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>
  <span class="cur-tag" id="curTag">You</span>
</div>
<div class="lgrid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>

<main id="top">

<!-- ============ 0–5 · STUDIO ============ -->
<section class="studio" id="studio" data-zone="paper" data-flow="0" aria-label="Introduction">
  <div class="studio-pin" id="studioPin">
    <div class="dotgrid"></div>

    <div class="hero" id="hero">
      <div class="frame-name mono"><b>#</b> Frame · Home <span>1440 × 900</span></div>
      <p class="pill"><i class="dot"></i> Senior UI/UX Designer · Product Design</p>
      <div class="sel" id="heroSel">
        <h1 class="hero-title" id="heroTitle">
          <span class="ln"><span>Complex products.</span></span>
          <span class="ln"><span>Clear experiences.</span></span>
          <span class="ln serif"><span>Scalable systems.</span></span>
        </h1>
        <div class="sel-box" id="selBox" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><span class="sel-size tab" id="selSize">W 1120 · H 312</span></div>
      </div>
      <p class="hero-sub">I design SaaS and enterprise products with complex workflows, dashboards, roles and data, then use AI-assisted workflows to move from Figma to working prototypes, design systems, and production-ready implementation faster.</p>
      <div class="hero-cta">
        <a class="btn" href="#work" data-magnetic data-cursor="Jump to work">View selected work <span class="arr">↓</span></a>
        <a class="btn ghost" href="#contact" data-magnetic data-cursor="Say hello">Let's talk <span class="arr">→</span></a>
      </div>
      <p class="hero-meta mono"><span>5+ years</span><span>SaaS &amp; enterprise</span><span>Design systems</span><span>Figma</span><span>AI-assisted implementation</span></p>
    </div>

    <!-- floating design-tool artefacts (parallax depth) -->
    <div class="float fl-size" data-depth="0.6"><div class="pill mono" style="font-size:.64rem">1280 × 720</div></div>
    <div class="float fl-tokens" data-depth="1.2"><div class="fl-card"><div class="row"><b>● Tokens Studio</b></div><div class="row"><span>color.accent</span><b style="color:var(--accent)">#2F4BFF</b></div><div class="row"><span>radius.card</span><b>18px</b></div><div class="row"><span>elevation.soft</span><b>0 12 32</b></div></div></div>
    <div class="float fl-steps" data-depth="0.9"><div class="fl-card fl-dark">Workflow: pruned 38 → 9 steps</div></div>
    <div class="float fl-density" data-depth="1.5"><div class="fl-card" style="min-width:220px"><div class="row"><b style="color:var(--accent)">Data density</b><span>1,000+ rows</span></div><div class="row"><span>#UHID-8910</span><b style="color:#0d9a52">$1,240.00</b></div><div class="row"><span>#UHID-8911</span><b>$480.00</b></div><div class="row"><span>#UHID-8912</span><b style="color:var(--accent)">$920.50</b></div></div></div>
    <div class="float fl-mobile" data-depth="1"><div class="ph"></div></div>

    <div class="build" id="build">
      <div class="caps" aria-live="polite">
        <div class="cap" data-s="1"><span class="n">02 / 08 · WIREFRAME</span><span class="serif">Structure before pixels.</span><h2>Four legacy tabs become one ward view.</h2><p>Every project starts as grey boxes: who uses the screen, what they need next, and what can be removed. Here, clinical staff juggled vitals, charges and invoices across four tabs.</p><div class="cap-bar"><i></i></div></div>
        <div class="cap" data-s="2"><span class="n">03 / 08 · COMPONENTS</span><span class="serif">Components, not screens.</span><h2>Boxes snap into reusable parts.</h2><p>Patient header, navigation, data rows and summary become components with real props, so the same parts work across wards, roles and devices.</p><div class="cap-bar"><i></i></div></div>
        <div class="cap" data-s="3"><span class="n">04 / 08 · UI DESIGN</span><span class="serif">Hierarchy through restraint.</span><h2>Colour only where it carries meaning.</h2><p>One accent for the active task, green for money saved, tabular numbers for tariffs. Tokens decide the look, so it stays consistent at 1,000 rows.</p><div class="cap-bar"><i></i></div></div>
        <div class="cap" data-s="4"><span class="n">05 / 08 · PROTOTYPE</span><span class="serif">Interaction you can click.</span><h2>Flows are tested before they're built.</h2><p>Working prototypes with real states, not static artboards. Stakeholders click through billing, pre-authorisation and discharge before a sprint starts.</p><div class="cap-bar"><i></i></div></div>
        <div class="cap" data-s="5"><span class="n">06 / 08 · PRODUCT</span><span class="serif">Shipped and measured.</span><h2>Discharge in 14 minutes, not 42.</h2><p>Billing omissions fell 38% across the pilot wards. The design is judged by what happens on the floor, not in the file.</p><div class="cap-bar"><i></i></div></div>
      </div>

      <div class="devwrap">
        <div class="fit" data-fit="960x600" id="devFit">
          <div class="board">
            <div class="device" id="device">
              <div class="dv-top">
                <div class="lights"><i></i><i></i><i></i></div>
                <div class="dv-url">Apex Clinical ERP / Inpatient Ward 4B <small>apex-erp.app/ward-4b</small></div>
                <div class="online"><i></i>ONLINE</div>
              </div>
              <div class="dv-body">
                <div class="u pt" data-c="PatientHeader">
                  <div class="av" style="--i:0">JD</div>
                  <div class="pt-name" style="--i:1"><b>John Doe (Anonymized)</b><span>UHID #AP-84920 · 48Y / Male · Bed 12</span></div>
                  <div class="cmdk" style="--i:2">Switch ⌘K</div>
                  <div class="vit" style="--i:3"><small>BP</small><b>120/80</b></div>
                  <div class="vit" style="--i:4"><small>HR</small><b class="g">72 bpm</b></div>
                  <div class="ins" style="--i:5">INSURED</div>
                </div>
                <div class="u side" data-c="WorkflowNav">
                  <h5 style="--i:0">WORKFLOW</h5>
                  <div class="nb" style="--i:1">Clinical Notes</div>
                  <div class="nb" style="--i:2">Medications</div>
                  <div class="nb on hot" style="--i:3" id="nbBill">Billing &amp; Tariff</div>
                  <div class="nb" style="--i:4">Discharge Plan</div>
                </div>
                <div class="u main" data-c="DataTable" id="dvMain">
                  <h4 style="--i:0">Unbilled Procedures &amp; Consumables (3 items)</h4>
                  <div class="tbl tab" style="--i:1">
                    <div class="h"><span>ITEM CODE</span><span>DESCRIPTION</span><span>QTY</span><span>TARIFF</span><span>TOTAL</span></div>
                    <div class="row-in" style="--i:0"><span class="c">#MED-201</span><span><b>Saline Infusion 500ml</b></span><span>2</span><span>$18.00</span><span><b>$36.00</b></span></div>
                    <div class="row-in" style="--i:1"><span class="c">#PRC-819</span><span><b>Echocardiogram Screening</b></span><span>1</span><span>$240.00</span><span><b>$240.00</b></span></div>
                    <div class="row-in" style="--i:2"><span class="c">#CON-104</span><span><b>Cardiology Specialist Visit</b></span><span>1</span><span>$150.00</span><span><b>$150.00</b></span></div>
                  </div>
                  <div class="sum tab" style="--i:2">
                    <div><span>Subtotal</span><b>$426.00</b></div>
                    <div><span>Insurance pre-auth (80%)</span><span class="neg">−$340.80</span></div>
                    <div class="due"><span>Patient due</span><b id="due">$85.20</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg class="noodle" viewBox="0 0 960 600" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" d="M204 302 C 252 302, 244 215, 300 215"/>
            <circle cx="204" cy="302" r="5"/><circle cx="300" cy="215" r="4"/>
            <g class="ix"><rect x="214" y="340" rx="6" width="200" height="24" fill="#2f4bff"/><text x="224" y="356" fill="#fff" font-family="Geist Mono, monospace" font-size="11">On click → Smart animate 300ms</text></g>
          </svg>
          <div class="proto-chip">▶ PROTOTYPE · FLOW 1</div>
          <div class="inspect" aria-hidden="true">
            <h6>DESIGN · NAV/ACTIVE</h6>
            <div class="r"><span>Fill</span><span><i class="sw"></i>color.accent</span></div>
            <div class="r"><span>Text</span><span>Inter Tight 500 / 14</span></div>
            <div class="r"><span>Radius</span><span>radius.sm · 9</span></div>
            <div class="r"><span>Numbers</span><span>tabular-nums</span></div>
            <div class="r"><span>Contrast</span><span style="color:#0d9a52">AA · 7.1:1</span></div>
          </div>
          <div class="outcome" aria-hidden="true">
            <small>DISCHARGE PROCESSING</small>
            <div class="big tab"><s>42</s><span id="dis">14</span> min</div>
            <span class="ok">↓ 38% billing omissions · pilot wards</span>
          </div>
          <div class="mp me" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" stroke="#fff" stroke-width="1.5"/></svg><span>Aditya</span></div>
          <div class="mp pm" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" stroke="#fff" stroke-width="1.5"/></svg><span>PM · "Shipping to ward 5 next"</span></div>
          <div class="mp dev" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" stroke="#fff" stroke-width="1.5"/></svg><span>Dev · "Props match the file"</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ STATS · auto layout ============ -->
<section class="stats wrap" id="stats" data-zone="paper" data-flow="5">
  <div class="al-head">
    <h2>Five years of shipping dense, <span class="serif">operational</span> software.</h2>
    <div class="al-meta" id="alMeta"><span>Direction <b id="alDir">→ Horizontal</b></span><span>Gap <b id="alGap">16</b></span><span>Padding <b>16</b></span></div>
  </div>
  <div class="al" id="al">
    <div class="st"><b class="tab" data-count="5">5+</b><span>Years experience</span><small>SaaS &amp; enterprise focus</small></div>
    <div class="st"><b class="tab" data-count="14">14+</b><span>Products designed</span><small>Healthcare, ERP, fintech</small></div>
    <div class="st"><b class="tab" data-count="480">480+</b><span>Reusable components</span><small>Tokens, states &amp; documentation</small></div>
    <div class="st"><b>Web + Mobile</b><span>Multi-platform delivery</span><small>Responsive &amp; native</small></div>
  </div>
  <div class="marq" aria-label="Product partners">
    <div class="marq-t">
      <span><small>PARTNER</small>OctaNode</span><span><small>PARTNER</small>Apex Health Systems</span><span><small>PARTNER</small>TalentFlow Enterprise</span><span><small>PARTNER</small>OpsPulse Cloud</span><span><small>PARTNER</small>Converge Events</span>
      <span aria-hidden="true"><small>PARTNER</small>OctaNode</span><span aria-hidden="true"><small>PARTNER</small>Apex Health Systems</span><span aria-hidden="true"><small>PARTNER</small>TalentFlow Enterprise</span><span aria-hidden="true"><small>PARTNER</small>OpsPulse Cloud</span><span aria-hidden="true"><small>PARTNER</small>Converge Events</span>
    </div>
  </div>
</section>

<!-- ============ FOCUS · bento ============ -->
<section class="focus wrap" id="focus" data-zone="paper" data-flow="5">
  <div class="sec-head">
    <span class="label">Specialization</span>
    <h2>Deep focus in <span class="serif">enterprise</span> software.</h2>
    <p>I don't design marketing brochures or generic landing pages. I design dense operational software, administrative consoles, and cross-team design systems.</p>
  </div>
  <div class="bento" id="bento">
    <div class="bx big" tabindex="0" data-cursor="Expand"><span class="n">01</span><span class="ic">❖</span><h3>SaaS &amp; Enterprise UX</h3><p>Multi-tenant architectures, deep permission matrices, and high-density data views tailored for high-frequency operators.</p><div class="viz"><i style="--h:40%"></i><i style="--h:72%"></i><i style="--h:55%"></i><i style="--h:90%"></i><i style="--h:64%"></i><i style="--h:80%"></i></div><div class="tags"><span>ROLE-BASED ACCESS</span><span>DATA TABLES</span><span>INFORMATION DENSITY</span></div></div>
    <div class="bx" tabindex="0" data-cursor="Expand"><span class="n">02</span><span class="ic">⬡</span><h3>Design Systems</h3><p>Multi-tier token architecture, accessible Figma component libraries, and synchronized code tokens.</p><div class="viz"><i style="--h:30%"></i><i style="--h:60%"></i><i style="--h:45%"></i><i style="--h:75%"></i></div><div class="tags"><span>TOKEN ARCHITECTURES</span><span>FIGMA VARIABLES</span><span>GOVERNANCE</span></div></div>
    <div class="bx" tabindex="0" data-cursor="Expand"><span class="n">03</span><span class="ic">⇄</span><h3>Complex Workflows</h3><p>Multi-step approval engines, conditional forms, state transitions, and audit-ready data tracking.</p><div class="viz"><i style="--h:50%"></i><i style="--h:35%"></i><i style="--h:80%"></i><i style="--h:60%"></i></div><div class="tags"><span>STATE MACHINES</span><span>CONDITIONAL LOGIC</span><span>PROGRESSIVE DISCLOSURE</span></div></div>
    <div class="bx" tabindex="0" data-cursor="Expand"><span class="n">04</span><span class="ic">↺</span><h3>Product Redesign</h3><p>Auditing legacy enterprise interfaces, eliminating dead paths, consolidating fragmented patterns, and modernizing without retraining friction.</p><div class="viz"><i style="--h:85%"></i><i style="--h:60%"></i><i style="--h:42%"></i><i style="--h:28%"></i></div><div class="tags"><span>UX AUDITS</span><span>INFORMATION ARCHITECTURE</span><span>FRICTION REDUCTION</span></div></div>
  </div>
  <div class="tooling"><b>CORE TOOLING</b><span>Figma</span><span>Design Systems</span><span>Storybook</span><span>Angular</span><span>React / Next.js</span><span>Tailwind CSS</span><span>Claude / ChatGPT</span><span>Cursor / Copilot</span><span>Antigravity</span></div>
</section>

<!-- ============ WORK · canvas camera ============ -->
<section class="work local" id="work" data-zone="canvas" data-flow="5" aria-label="Selected case studies">
  <div class="work-pin" id="workPin">
    <div class="wrap work-head" id="workHead">
      <span class="label">Selected case studies · 4</span>
      <h2>Engineered for utility. <span class="serif">Validated with outcomes.</span></h2>
      <p>Deep dives into enterprise platforms with multi-role permissions, high-frequency workflows, and token-driven design systems.</p>
    </div>
    <div class="wrap" style="position:static">
    <div class="world" id="world">
      <div class="work-dots"></div>

      <article class="fr" data-case="0">
        <div class="fr-name"><b>01 — Foundations &amp; Multi-Brand Design System</b><span>1200 × 740</span></div>
        <div class="fr-body">
          <div class="fr-info">
            <div class="fr-tag"><span class="ix">01</span><span>Enterprise SaaS &amp; Design Ops</span></div>
            <h3>Foundations &amp; Multi-Brand Design System</h3>
            <div class="metric"><b>↓ 45%</b><span>Handoff time</span></div>
            <dl class="po"><dt>PROBLEM</dt><dd>Four engineering squads were building redundant UI components with inconsistent spacing, diverging colour values, and no shared accessibility standards.</dd><dt class="o">OUTCOME</dt><dd class="o">Shipped 62 production-ready components, cut design-to-dev handoff from 12 days to under 4, and reached 100% WCAG AA colour compliance.</dd></dl>
            <button class="btn" data-open="0" data-cursor="Open case">Open case study <span class="arr">↗</span></button>
          </div>
          <div class="fit mk" data-fit="580x520"><div class="board"><div class="mb">
            <div class="win"><div class="win-t"><div class="lights"><i></i><i></i><i></i></div>design-tokens / component-inventory.fig</div>
              <div class="win-b">
                <div class="m1-side"><span class="mono10">Token pipeline</span><div class="tk a"><i></i>global.blue.500</div><div class="tk">semantic.interactive</div><div class="tk">button.bg.primary</div><span class="mono10" style="margin-top:8px">Colour tokens</span><div class="sws"><i style="background:#2f4bff"></i><i style="background:#0e0e10"></i><i style="background:#6b6a76"></i><i style="background:#e3e1db"></i></div></div>
                <div class="m1-mx">
                  <span class="mono10">State</span><span class="mono10">Primary</span><span class="mono10">Secondary</span><span class="mono10">Ghost</span>
                  <span class="mono10">Default</span><span class="mbtn p pulse" style="--i:0">Action</span><span class="mbtn s pulse" style="--i:1">Action</span><span class="mbtn g pulse" style="--i:2">Action</span>
                  <span class="mono10">Hover</span><span class="mbtn p h pulse" style="--i:3">Action</span><span class="mbtn s pulse" style="--i:4">Action</span><span class="mbtn g pulse" style="--i:5">Action</span>
                  <span class="mono10" style="color:var(--accent)">Focus</span><span class="mbtn p f pulse" style="--i:6">Action</span><span class="mbtn s f pulse" style="--i:7">Action</span><span class="mbtn g f pulse" style="--i:8">Action</span>
                  <span class="mono10">Disabled</span><span class="mbtn d">Disabled</span><span class="mbtn d">Disabled</span><span class="mbtn d">Disabled</span>
                </div>
              </div></div>
            <div class="mono10" style="text-align:right">62 components · AA verified</div>
          </div></div></div>
        </div>
      </article>

      <article class="fr" data-case="1">
        <div class="fr-name"><b>02 — Healthcare Operations &amp; Doctor Management</b><span>1200 × 740</span></div>
        <div class="fr-body">
          <div class="fr-info">
            <div class="fr-tag"><span class="ix">02</span><span>Healthcare tech &amp; clinical ERP</span><span>Anonymized</span></div>
            <h3>Healthcare Operations &amp; Doctor Management Platform</h3>
            <div class="metric"><b>↓ 38%</b><span>Billing errors</span></div>
            <dl class="po"><dt>PROBLEM</dt><dd>Clinical and admin staff moved across 4 legacy browser tabs to review vitals, add procedure charges and generate discharge invoices, often misattributing billable items.</dd><dt class="o">OUTCOME</dt><dd class="o">Discharge processing went from 42 minutes to 14, and billing omissions fell 38% across the initial pilot wards.</dd></dl>
            <button class="btn" data-open="1" data-cursor="Open case">Open case study <span class="arr">↗</span></button>
          </div>
          <div class="fit mk" data-fit="580x520"><div class="board"><div class="mb">
            <div class="m2-v"><div><span class="mono10">BP</span><b>120/80</b></div><div><span class="mono10">HR</span><b style="color:#0d9a52">72 bpm</b></div><div><span class="mono10">SpO₂</span><b>98%</b></div></div>
            <div class="win"><div class="win-t">Ward 4B · Bed 12 · Billing</div><div class="win-b" style="flex-direction:column">
              <div class="m2-rows tab">
                <div style="--i:0"><span>#MED-201 Saline Infusion 500ml ×2</span><b>$36.00</b></div>
                <div style="--i:1"><span>#PRC-819 Echocardiogram Screening</span><b>$240.00</b></div>
                <div style="--i:2"><span>#CON-104 Cardiology Specialist Visit</span><b>$150.00</b></div>
                <div style="--i:3"><span>Insurance pre-auth (80%)</span><b style="color:#0d9a52">−$340.80</b></div>
              </div>
              <div class="m2-timer" style="margin-top:auto"><span class="mono10" style="color:#9b9aa4">Discharge time</span><span class="tab"><s>42:00</s><b>14:00</b></span></div>
            </div></div>
          </div></div></div>
        </div>
      </article>

      <article class="fr" data-case="2">
        <div class="fr-name"><b>03 — Enterprise Application Management</b><span>1200 × 740</span></div>
        <div class="fr-body">
          <div class="fr-info">
            <div class="fr-tag"><span class="ix">03</span><span>Enterprise HR tech &amp; talent</span></div>
            <h3>Enterprise Application Management Platform</h3>
            <div class="metric"><b>↓ 52%</b><span>Review latency</span></div>
            <dl class="po"><dt>PROBLEM</dt><dd>Hiring managers were overwhelmed by 80-column spreadsheets and unresponsive modal forms, causing evaluation backlogs of over 3 weeks.</dd><dt class="o">OUTCOME</dt><dd class="o">Processed 250,000+ applications with a 52% faster review turnaround and a 94% positive reviewer satisfaction score.</dd></dl>
            <button class="btn" data-open="2" data-cursor="Open case">Open case study <span class="arr">↗</span></button>
          </div>
          <div class="fit mk" data-fit="580x520"><div class="board"><div class="mb">
            <div class="mono10">80 columns → 1 focused review</div>
            <div class="m3"><div class="m3-sheet" id="m3sheet"></div>
              <div class="m3-card">
                <div style="display:flex;justify-content:space-between;align-items:center"><div><b style="font-size:15px">Applicant #A-20931</b><div class="mono10">Senior Data Analyst · Round 2</div></div><span class="st-b ok">SHORTLIST</span></div>
                <div class="crit"><span>Technical depth</span><u style="--w:82%"></u><b>4.1</b></div>
                <div class="crit"><span>Domain fit</span><u style="--w:70%"></u><b>3.5</b></div>
                <div class="crit"><span>Communication</span><u style="--w:90%"></u><b>4.5</b></div>
                <div class="mono10" style="margin-top:6px">Queue · 1 of 18 today</div>
                <div class="m3-act"><span>Hold</span><span>Reject</span><span class="y">Advance →</span></div>
              </div>
            </div>
          </div></div></div>
        </div>
      </article>

      <article class="fr" data-case="3">
        <div class="fr-name"><b>04 — Global Event Registration</b><span>1200 × 740</span></div>
        <div class="fr-body">
          <div class="fr-info">
            <div class="fr-tag"><span class="ix">04</span><span>Events, hospitality &amp; ticketing SaaS</span></div>
            <h3>Global Event &amp; Registration Management Platform</h3>
            <div class="metric"><b>56 → 89%</b><span>Completion</span></div>
            <dl class="po"><dt>PROBLEM</dt><dd>Enterprise conference attendees abandoned registration at a 44% rate due to disjointed 6-page forms, irrelevant questions and confusing ticket tiers.</dd><dt class="o">OUTCOME</dt><dd class="o">Registration completion rose from 56% to 89%, and on-site badge printing dropped to 4.2 seconds per check-in.</dd></dl>
            <button class="btn" data-open="3" data-cursor="Open case">Open case study <span class="arr">↗</span></button>
          </div>
          <div class="fit mk" data-fit="580x520"><div class="board"><div class="mb">
            <div class="mono10">Registration · 6 pages → 2</div>
            <div class="m4-steps"><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div class="m4-tiers"><div><span class="mono10">Tier</span><b>Delegate</b><small class="muted">All sessions</small></div><div class="on"><span class="mono10" style="color:var(--accent)">Selected</span><b>Delegate + Workshops</b><small class="muted">Recommended</small></div><div><span class="mono10">Tier</span><b>Exhibitor</b><small class="muted">Booth access</small></div></div>
            <div class="win" style="flex:0 0 auto"><div class="win-b" style="flex-direction:column;gap:8px"><div class="mono10">Only what we need</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div style="border:1px solid #e3e1db;border-radius:8px;padding:9px">Work email</div><div style="border:1px solid #e3e1db;border-radius:8px;padding:9px">Company</div></div></div></div>
            <div class="m4-bot"><div class="ring" id="ring"><b class="tab">89%</b></div><div class="badge"><span class="mono10" style="color:#9b9aa4">On-site check-in</span><b class="tab">4.2s</b><small style="color:#9b9aa4">per badge</small></div></div>
          </div></div></div>
        </div>
      </article>
    </div>
    </div>
  </div>
</section>

<div class="case" id="case" role="dialog" aria-modal="true" aria-labelledby="caseTitle">
  <div class="case-bg" id="caseBg"></div>
  <div class="case-sheet" id="caseSheet" tabindex="-1" data-lenis-prevent>
    <div class="case-in">
      <div class="case-top"><span class="label" id="caseTag">Case study</span><button class="case-close" id="caseClose" data-cursor="Collapse">Close <span aria-hidden="true">✕</span></button></div>
      <h2 id="caseTitle">Case</h2>
      <div class="case-mk" id="caseMk"></div>
      <div class="case-grid" id="caseGrid"></div>
      <p class="note">Summary view. Full case study available on request.</p>
    </div>
  </div>
</div>

<!-- ============ DESIGN SYSTEM ============ -->
<section class="sys wrap" id="system" data-zone="blueprint" data-flow="6">
  <div class="sys-grid" id="sysPin">
    <div class="sys-left">
      <span class="label">Featured design system</span>
      <h2>Designing systems, <span class="serif">not just screens.</span></h2>
      <p>Before drawing mockups, I build the token architecture, component states, and handoff contracts that let development teams ship consistently.</p>
      <ol class="steps" id="sysSteps">
        <li data-st="1">01 — Color primitives<i></i></li>
        <li data-st="2">02 — Typography &amp; spacing<i></i></li>
        <li data-st="3">03 — Component assembly<i></i></li>
        <li data-st="4">04 — Complex patterns<i></i></li>
        <li data-st="5">05 — Theme compilation<i></i></li>
      </ol>
      <p class="mono muted" style="font-size:.68rem">Try it: the inspector controls are live.</p>
    </div>
    <div class="fit" data-fit="720x600">
      <div class="board">
        <div class="lib" id="lib">
          <div class="lib-t"><span>FRAME · COMPONENT LIBRARY</span><span id="libMode">LIGHT · 1920 × 1080</span></div>
          <div class="lib-b">
            <div class="zone z1"><span class="mono10">Color primitives</span>
              <div class="prims">
                <div class="prim"><i style="--c:#2f4bff;--i:0"></i><span>blue.500</span></div>
                <div class="prim"><i style="--c:#2438d6;--i:1"></i><span>blue.600</span></div>
                <div class="prim"><i style="--c:#e3e7ff;--i:2"></i><span>blue.100</span></div>
                <div class="prim"><i style="--c:#1e2230;--i:3"></i><span>slate.800</span></div>
                <div class="prim"><i style="--c:#8b8fa3;--i:4"></i><span>slate.400</span></div>
                <div class="prim"><i style="--c:#12a150;--i:5"></i><span>green.500</span></div>
              </div>
              <div class="typescale" aria-hidden="true"><span style="font-size:34px">Aa</span><span style="font-size:24px">Aa</span><span style="font-size:17px">Aa</span><span style="font-size:12px;font-family:var(--mono);font-weight:400">Aa 12</span><span class="mono10" style="margin-left:auto">4 · 8 · 12 · 16 · 24</span></div>
            </div>
            <div class="zone z2"><span class="mono10">Semantic tokens</span>
              <div class="toks">
                <div class="tok" style="--i:0"><span>color.primary.bg</span><em><i style="--c:#2f4bff"></i><b id="tkPrim">blue.500</b></em></div>
                <div class="tok" style="--i:1"><span>color.primary.fg</span><em><i style="--c:#fff;border:1px solid #d8dcf3"></i>white</em></div>
                <div class="tok" style="--i:2"><span>color.surface</span><em><i style="--c:#fff;border:1px solid #d8dcf3"></i><b id="tkSurf">white</b></em></div>
                <div class="tok" style="--i:3"><span>radius.pill</span><em>9999px</em></div>
                <div class="tok" style="--i:4"><span>space.inset.md</span><em>12 · 24</em></div>
                <div class="tok" style="--i:5"><span>type.body</span><em>16 / 24</em></div>
              </div>
            </div>
            <div class="zone z3">
              <span class="mono10" style="position:absolute;left:12px;top:12px">Component · Button</span>
              <div class="dsb-wrap">
                <button class="dsb" id="dsb" data-variant="primary" data-size="md" data-state="default" type="button" tabindex="-1" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5l3 3 7-7"/></svg>Save &amp; continue</button>
                <span class="redx l" data-v="24" id="rxL"></span><span class="redx r" data-v="24" id="rxR"></span>
                <span class="dsb-sel"></span>
              </div>
            </div>
            <div class="zone z4" id="inspector"><span class="mono10">Properties</span>
              <div class="ins-r"><span>Variant</span><div class="seg" data-prop="variant"><button aria-pressed="true" data-v="primary">primary</button><button aria-pressed="false" data-v="secondary">secondary</button><button aria-pressed="false" data-v="ghost">ghost</button></div></div>
              <div class="ins-r"><span>Size</span><div class="seg" data-prop="size"><button aria-pressed="false" data-v="sm">sm</button><button aria-pressed="true" data-v="md">md</button><button aria-pressed="false" data-v="lg">lg</button></div></div>
              <div class="ins-r"><span>State</span><div class="seg" data-prop="state"><button aria-pressed="true" data-v="default">default</button><button aria-pressed="false" data-v="hover">hover</button><button aria-pressed="false" data-v="pressed">pressed</button><button aria-pressed="false" data-v="focus">focus</button><button aria-pressed="false" data-v="disabled">disabled</button></div></div>
              <div class="ins-r"><span>Theme</span><div class="seg" data-prop="theme"><button aria-pressed="true" data-v="light">light</button><button aria-pressed="false" data-v="dark">dark</button></div></div>
              <div class="ins-r"><span>Fill</span><code id="insFill">color.primary.bg</code></div>
              <div class="ins-r"><span>Padding</span><code id="insPad">12 · 24</code></div>
            </div>
            <div class="zone z5"><span class="mono10">Pattern · DataGrid (sorted by status)</span>
              <div class="dg tab" id="dg">
                <div class="dg-r" data-o="2"><span class="id">#INV-3021</span><span>Discharge invoice · Ward 4B</span><span class="st-b wa">PENDING</span><b>$85.20</b></div>
                <div class="dg-r" data-o="1"><span class="id">#INV-3018</span><span>Pre-auth claim · Bed 07</span><span class="st-b ok">APPROVED</span><b>$1,240.00</b></div>
                <div class="dg-r" data-o="3"><span class="id">#INV-3017</span><span>Consumables · OT 2</span><span class="st-b no">REJECTED</span><b>$920.50</b></div>
              </div>
            </div>
          </div>
          <div class="compile" id="compile">✓ tokens compiled → light.css · dark.css</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ PROCESS ============ -->
<section class="proc" id="process" data-zone="canvas" data-flow="6">
  <div class="proc-pin wrap" id="procPin" style="max-width:none">
    <div class="sec-head" style="padding-inline:0">
      <span class="label">Process &amp; methodology · prototype flow</span>
      <h2>How I solve <span class="serif">ambiguous product problems.</span></h2>
      <p>A six-step approach from problem topology to engineering handoff.</p>
    </div>
    <div class="track" id="track">
      <div class="pf"><span class="num">01</span><h3>Understand</h3><span class="tools">Claude · ChatGPT</span><p>Map existing workflows, interview operators, and identify domain constraints. AI helps synthesize notes, organize requirements, and surface themes.</p><div class="art"><small>KEY ARTIFACT</small><b>Role map + AI brief</b></div><svg class="pf-link" viewBox="0 0 120 60" aria-hidden="true"><path pathLength="1" d="M0 30 C 40 30, 60 30, 112 30"/><circle cx="4" cy="30" r="4"/></svg></div>
      <div class="pf"><span class="num">02</span><h3>Structure</h3><span class="tools">FigJam · Figma</span><p>Turn roles and tasks into information architecture: navigation, permissions, and the few flows that carry most of the daily work.</p><div class="art"><small>KEY ARTIFACT</small><b>IA + task flows</b></div><svg class="pf-link" viewBox="0 0 120 60" aria-hidden="true"><path pathLength="1" d="M0 30 C 40 30, 60 30, 112 30"/><circle cx="4" cy="30" r="4"/></svg></div>
      <div class="pf"><span class="num">03</span><h3>Explore</h3><span class="tools">Figma · AI alternatives</span><p>Sketch several interaction approaches in low fidelity, compare them against real data volumes, and pick with the team.</p><div class="art"><small>KEY ARTIFACT</small><b>Wireframe options</b></div><svg class="pf-link" viewBox="0 0 120 60" aria-hidden="true"><path pathLength="1" d="M0 30 C 40 30, 60 30, 112 30"/><circle cx="4" cy="30" r="4"/></svg></div>
      <div class="pf"><span class="num">04</span><h3>Systemize</h3><span class="tools">Figma variables · Tokens</span><p>Extract tokens, components and states from the chosen direction so every later screen is assembled, not redrawn.</p><div class="art"><small>KEY ARTIFACT</small><b>Token + component set</b></div><svg class="pf-link" viewBox="0 0 120 60" aria-hidden="true"><path pathLength="1" d="M0 30 C 40 30, 60 30, 112 30"/><circle cx="4" cy="30" r="4"/></svg></div>
      <div class="pf"><span class="num">05</span><h3>Design</h3><span class="tools">Manual process</span><p>High-fidelity screens across all responsive breakpoints with explicit edge cases, error states, and empty states.</p><div class="art"><small>KEY ARTIFACT</small><b>Interactive prototype</b></div><svg class="pf-link" viewBox="0 0 120 60" aria-hidden="true"><path pathLength="1" d="M0 30 C 40 30, 60 30, 112 30"/><circle cx="4" cy="30" r="4"/></svg></div>
      <div class="pf"><span class="num">06</span><h3>Validate &amp; handoff</h3><span class="tools">Storybook · Cursor</span><p>Test with operators, then hand over tokens, state variants and prop dictionaries that map one-to-one to code.</p><div class="art"><small>KEY ARTIFACT</small><b>Specs + Storybook</b></div></div>
    </div>
  </div>
</section>

<!-- ============ BRIDGE ============ -->
<section class="bridge wrap" id="bridge" data-zone="canvas" data-flow="6">
  <div class="br-grid">
    <div class="br-copy">
      <span class="label">The design-engineering bridge</span>
      <h2>Speaking fluent code changes <span class="serif">how I design.</span></h2>
      <p>Knowing HTML, CSS, Tailwind and component frameworks means I don't design impossible interactions. I design with flexbox wrapping, grid constraints, container queries and rendering cost in mind from day one.</p>
      <p>Instead of static artboards, engineers get tokens, state variants and auto-layout structures that map directly to component props in React or Angular.</p>
      <p class="note">AI agent-ready specs: component definitions ship as clean markdown and prop dictionaries for Cursor and GitHub Copilot.</p>
    </div>
    <div class="fit" data-fit="760x460">
      <div class="board">
        <div class="wipe" id="wipe">
          <div class="w-design">
            <span class="w-lab" style="left:20px">FIGMA · DESIGN</span>
            <div class="w-card">
              <span class="w-ann" style="top:-26px;left:50%;transform:translateX(-50%)">Auto layout → gap 8 · pad 12 / 24</span>
              <span class="btn accent" style="height:52px;padding:0 28px;pointer-events:none">✓ Save &amp; continue</span>
              <span class="w-ann" style="bottom:-24px;left:50%;transform:translateX(-50%);color:#9747ff">◆ Button / PrimaryAction</span>
            </div>
            <div class="w-props"><span>variant <b>"primary"</b></span><span>radius <b>9999px</b></span><span>fill <b>var(--color-accent)</b></span><span>states <b>6 explicit variants</b></span></div>
          </div>
          <div class="w-code"><span class="w-lab" style="right:20px">CODE · PrimaryAction.tsx</span><span class="k">export function</span> <span class="t">PrimaryAction</span>({ label, state }) {
  <span class="k">return</span> (
    &lt;<span class="t">Button</span>
      <span class="a">variant</span>=<span class="s">"primary"</span>      <span class="c">// ◆ variant</span>
      <span class="a">radius</span>=<span class="s">"pill"</span>         <span class="c">// 9999px</span>
      <span class="a">className</span>=<span class="s">"gap-2 px-6 py-3"</span>
      <span class="a">style</span>={{ bg: <span class="s">"var(--color-accent)"</span> }}
      <span class="a">state</span>={state}           <span class="c">// 6 variants</span>
    &gt;
      &lt;<span class="t">Icon</span> <span class="a">name</span>=<span class="s">"check"</span> /&gt; {label}
    &lt;/<span class="t">Button</span>&gt;
  );
}</div>
          <div class="w-line" id="wline"><span>DESIGN ⇄ CODE</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ AI ============ -->
<section class="ai wrap" id="ai" data-zone="canvas" data-flow="6">
  <div class="ai-grid">
    <div style="display:grid;gap:20px">
      <span class="label">AI in my workflow</span>
      <h2>AI accelerates the workflow. <span class="serif">I own the decisions.</span></h2>
      <p class="muted">I use agentic workflows to handle complex enterprise products, prototype quickly, and bridge Figma to production code, while UX reasoning and final quality stay human-led.</p>
      <div class="phases" id="phases"><span>CONTEXT</span><span>STRATEGY</span><span>DESIGN</span><span>BUILD</span><span>DEBUG</span><span>REVIEW</span></div>
      <ul class="assist"><li>Mapping workflow and information architecture</li><li>Comparing interaction approaches</li><li>Identifying edge cases</li><li>Drafting UX copy alternatives</li></ul>
    </div>
    <div class="term" aria-label="Example agent session">
      <div class="term-t"><div class="lights"><i></i><i></i><i></i></div>agent · settings-page</div>
      <pre id="termOut" aria-hidden="true"></pre>
      <pre class="sr" id="termFull"></pre>
    </div>
  </div>
  <div class="tools-g">
    <div><b>Claude + ChatGPT</b><p>Research, synthesis, requirements, UX exploration, documentation, and context.</p></div>
    <div><b>Figma + Figma MCP</b><p>Design source of truth, components, variables, and design-to-code context.</p></div>
    <div><b>Cursor + Copilot</b><p>Prompt-driven implementation, component scaffolding, and code assistance.</p></div>
    <div><b>Antigravity</b><p>Agentic development, multi-step implementation, UI building, and debugging.</p></div>
    <div><b>Angular / Next.js</b><p>Functional prototypes and production interfaces using Tailwind and PrimeNG.</p></div>
    <div><b>Storybook</b><p>Component states, validation, documentation, themes, and consistency.</p></div>
  </div>
  <div class="gains">
    <span>Requirements to testable prototypes, faster</span><span>More UX alternatives explored before committing</span><span>Long-running project context kept in one place</span><span>Figma to functional interfaces, faster</span><span>Less repetitive implementation and docs</span><span>Functional prototypes instead of static screens</span><span>Better designer-to-developer handoff</span><span>Faster iteration without losing design intent</span>
  </div>
</section>

<!-- ============ VOICES ============ -->
<section class="voices wrap" id="voices" data-zone="paper" data-flow="7">
  <div class="sec-head">
    <span class="label">Comments on the file</span>
    <h2>What collaborators <span class="serif">left in the margins.</span></h2>
    <p>Feedback from clinical directors, engineering leads, and product managers who shipped products with me.</p>
  </div>
  <div class="board-c">
    <div class="cm"><span class="pin">MV</span><div class="bub"><blockquote>“Aditya restructured our clinical billing workflow in six weeks. For the first time, our doctors and billing administrators share a single mental model without context switching.”</blockquote><cite><b>Dr. Marcus Vance</b><span>Chief Medical Officer · Doctor-Patient Care Platform</span></cite></div></div>
    <div class="cm"><span class="pin">ER</span><div class="bub"><blockquote>“Most designers give us static art that breaks the moment real table data loads. Aditya delivered a cohesive token system and documented states that mirrored our React and Angular component props.”</blockquote><cite><b>Elena Rostova</b><span>Lead Frontend Architect · Application Management System</span></cite></div></div>
    <div class="cm"><span class="pin">DC</span><div class="bub"><blockquote>“His frontend fluency meant zero translation loss between Figma and production. Every edge case, empty state, and responsive behavior was accounted for before we wrote a line of code.”</blockquote><cite><b>David Chen</b><span>VP of Product · Event &amp; Registration Platform</span></cite></div></div>
  </div>
</section>

<!-- ============ ABOUT ============ -->
<section class="about wrap" id="about" data-zone="paper" data-flow="7">
  <p class="statement" id="statement">Designer by role.<br>Builder by mindset. I untangle complex domains so operators move faster and engineers ship with confidence.</p>
  <div class="ab-grid">
    <aside class="ab-card">
      <div class="mono-av">AT</div>
      <div><b style="font-size:1.2rem">Aditya Tripathi</b><div class="muted">Senior UI/UX Designer · Surat, India</div></div>
      <span class="avail"><i></i>Available for Q4 / Q1 projects</span>
      <a class="btn ghost" href="https://linkedin.com/in/aditya-tripathi-2a4847171" target="_blank" rel="noopener" data-magnetic data-cursor="LinkedIn ↗">LinkedIn <span class="arr">↗</span></a>
    </aside>
    <div>
      <div class="ab-text">
        <span class="label">About</span>
        <p>For over 5 years, I've focused on untangling complex domain models: clinical healthcare software, role-based enterprise portals, and high-frequency booking systems.</p>
        <p>My background bridging design and frontend development means I design with empathy for both the operator using the tool and the engineer shipping the code. The most impactful design work happens in clear information architecture and robust design tokens, not in decoration.</p>
      </div>
      <div class="pr">
        <div><small>01</small><b>Clarity over decoration</b><p>An operator's time is precious. Clean hierarchy and information clarity beat flourishes.</p></div>
        <div><small>02</small><b>Systems over one-off screens</b><p>Every button, modal, and data row belongs to a token-driven system that scales with the product.</p></div>
        <div><small>03</small><b>Real data over placeholder text</b><p>Stress-test with long names, empty states, missing records, and 1,000-row tables.</p></div>
        <div><small>04</small><b>Engineer-friendly delivery</b><p>Complete states, responsive breakpoints, and tokenized specs bridge the engineering gap.</p></div>
        <div><small>05</small><b>Measurable workflow outcomes</b><p>Fewer clicks, less context switching, fewer operational errors.</p></div>
        <div><small>06</small><b>AI as acceleration, not replacement</b><p>AI helps me explore and scaffold. Every design decision and final review is human-led.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ FINAL ============ -->
<section class="final local" id="contact" data-zone="accent" data-flow="7">
  <div class="overview" id="overview" aria-hidden="true">
    <div class="ov"><span>01 Blank Canvas</span><i></i><i></i></div><div class="ov"><span>02 Wireframe</span><i></i><i></i></div><div class="ov"><span>03 Components</span><i></i><i></i></div><div class="ov"><span>04 UI Design</span><i></i><i></i></div>
    <div class="ov"><span>05 Prototype</span><i></i><i></i></div><div class="ov"><span>06 Product</span><i></i><i></i></div><div class="ov"><span>07 Design System</span><i></i><i></i></div><div class="ov"><span>08 Final Experience</span><i></i><i></i></div>
  </div>
  <div class="wrap final-in">
    <span class="label">08 / 08 · Final experience · ready to collaborate</span>
    <h2 id="finalTitle"><span class="ln"><span>Have a complex</span></span><span class="ln"><span>product to</span></span><span class="ln serif"><span>simplify?</span></span></h2>
    <p class="lead">Available for design systems, enterprise workflow simplification, and high-stakes product design. Open to freelance and selected full-time roles.</p>
    <div class="mail">
      <span class="mail-a" id="mailA">aditya21tripathi81040@gmail.com</span>
      <button class="btn" id="copyMail" data-magnetic data-cursor="Copy email" type="button">Copy email</button>
      <a class="btn ghost" href="https://linkedin.com/in/aditya-tripathi-2a4847171" target="_blank" rel="noopener" data-magnetic data-cursor="LinkedIn ↗">LinkedIn <span class="arr">↗</span></a>
    </div>
    
  </div>
</section>
</main>
`;
