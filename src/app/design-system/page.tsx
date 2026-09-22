"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/shared/cta-section";
import { cn } from "@/lib/utils";

export default function DesignSystemPage() {
  const [activeTheme, setActiveTheme] = React.useState<"light" | "dark" | "cobalt">("light");

  const componentInventory = [
    { name: "Button", count: 18, category: "Actions" },
    { name: "Input & Textarea", count: 12, category: "Forms" },
    { name: "Checkbox & Radio", count: 8, category: "Forms" },
    { name: "Select & Combobox", count: 14, category: "Forms" },
    { name: "Tabs & Steppers", count: 10, category: "Navigation" },
    { name: "Dialog & Modal", count: 8, category: "Overlays" },
    { name: "Drawer / Sheet", count: 6, category: "Overlays" },
    { name: "Data Table & Header", count: 16, category: "Data Display" },
    { name: "Pagination", count: 6, category: "Navigation" },
    { name: "Badge & Tag", count: 9, category: "Data Display" },
    { name: "Avatar & Identity", count: 8, category: "Data Display" },
    { name: "Toast & Alert", count: 12, category: "Feedback" },
  ];

  const atomicLayers = [
    {
      layer: "Atoms",
      description: "Color tokens, typography styles, spacing units, elevation, raw icons.",
      examples: "blue-500, font-mono, gap-4, 18px radius",
    },
    {
      layer: "Molecules",
      description: "Simple combinations of atoms forming standalone functional units.",
      examples: "SearchInput, MetricBadge, ActionButton, FilterChip",
    },
    {
      layer: "Organisms",
      description: "Complex UI structures handling complete user interactions.",
      examples: "DataTable, ContextHeader, SplitPaneEvaluator, Navbar",
    },
    {
      layer: "Templates",
      description: "Page-level structural grids orchestrating organisms across breakpoints.",
      examples: "InpatientBillingLayout, CandidateTriageWorkspace",
    },
  ];

  return (
    <div className="w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background min-h-screen">
      <Container size="default">
        {/* Hero Section */}
        <div className="max-w-3xl mb-16 space-y-4">
          <Badge variant="accent">PORTFOLIO DESIGN SYSTEM</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-tight">
            Designing systems,{" "}
            <em className="font-serif font-normal italic">not just screens.</em>
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            A comprehensive reference of the token hierarchy, component states, atomic architecture, and documentation standards applied across my enterprise portfolio.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Button href="/work/design-system" variant="primary" size="md">
              Read Flagship Case Study →
            </Button>
            <Button href="#components" variant="secondary" size="md">
              Browse Components ↓
            </Button>
          </div>
        </div>

        {/* 1. Foundations Board */}
        <section className="my-20 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              01 · FOUNDATIONS BOARD
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Colors, Typography, Spacing &amp; Radius
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Colors */}
            <div className="p-6 rounded-[20px] bg-white border border-line space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-ink">
                Color Palette Tokens
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAFAF7] border border-line">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#FAFAF7] border border-line" />
                    <span className="font-mono text-xs text-ink">Background</span>
                  </div>
                  <span className="font-mono text-xs text-muted">#FAFAF7</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-line/20 border border-line">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0E0E10]" />
                    <span className="font-mono text-xs text-ink">Ink Text</span>
                  </div>
                  <span className="font-mono text-xs text-muted">#0E0E10</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#2F4BFF]" />
                    <span className="font-mono text-xs text-accent font-bold">Accent Cobalt</span>
                  </div>
                  <span className="font-mono text-xs text-accent">#2F4BFF</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#0B0B0F] border border-showcase-border">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0B0B0F] border border-white/20" />
                    <span className="font-mono text-xs text-white">Showcase Dark</span>
                  </div>
                  <span className="font-mono text-xs text-showcase-muted">#0B0B0F</span>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="p-6 rounded-[20px] bg-white border border-line space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-ink">
                Typography Scale
              </h3>
              <div className="space-y-3">
                <div className="p-2 rounded bg-line/20">
                  <span className="font-mono text-[10px] text-muted block">UI SANS</span>
                  <span className="font-sans text-sm font-semibold text-ink">Inter Tight (Primary)</span>
                </div>
                <div className="p-2 rounded bg-line/20">
                  <span className="font-mono text-[10px] text-muted block">EDITORIAL SERIF</span>
                  <span className="font-serif italic text-base text-ink">Instrument Serif (Accent)</span>
                </div>
                <div className="p-2 rounded bg-line/20">
                  <span className="font-mono text-[10px] text-muted block">CODE &amp; LABELS</span>
                  <span className="font-mono text-xs text-ink">Geist Mono (Metadata)</span>
                </div>
              </div>
            </div>

            {/* Elevation & Radius */}
            <div className="p-6 rounded-[20px] bg-white border border-line space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-ink">
                Radius &amp; Elevation
              </h3>
              <div className="space-y-3 font-mono text-xs text-muted">
                <div className="p-2 rounded-lg bg-line/20">
                  <span className="text-ink font-semibold block">radius.card:</span> 18px (Smooth)
                </div>
                <div className="p-2 rounded-lg bg-line/20">
                  <span className="text-ink font-semibold block">radius.button:</span> 9999px (Pill)
                </div>
                <div className="p-2 rounded-lg bg-line/20">
                  <span className="text-ink font-semibold block">shadow.hover:</span> 0 12px 32px
                </div>
              </div>
            </div>

            {/* 12-Column Grid */}
            <div className="p-6 rounded-[20px] bg-white border border-line space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-ink">
                12-Column Grid Token
              </h3>
              <div className="space-y-2 font-mono text-xs text-muted">
                <p><strong className="text-ink">Container Max:</strong> 1280px</p>
                <p><strong className="text-ink">Desktop Gutters:</strong> 24px</p>
                <p><strong className="text-ink">Mobile Gutters:</strong> 16px</p>
                <p><strong className="text-ink">Section Padding:</strong> 120px / 72px</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Token Architecture Diagram */}
        <section className="my-20 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              02 · TOKEN ARCHITECTURE PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Primitive → Semantic → Component Scopes
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-[#FAFAF7] border border-line space-y-2">
                <span className="font-mono text-xs font-bold text-muted uppercase">
                  1. GLOBAL PRIMITIVES
                </span>
                <p className="text-xs text-muted">
                  Raw hex values and unit increments with zero contextual semantics.
                </p>
                <div className="font-mono text-[11px] p-2 bg-white rounded border border-line/80 space-y-1">
                  <p>color.blue.500: #2F4BFF</p>
                  <p>color.gray.900: #0E0E10</p>
                  <p>spacing.4: 16px</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-accent/5 border border-accent/20 space-y-2">
                <span className="font-mono text-xs font-bold text-accent uppercase">
                  2. SEMANTIC TOKENS
                </span>
                <p className="text-xs text-muted">
                  Contextual purpose definitions capable of theme inversion.
                </p>
                <div className="font-mono text-[11px] p-2 bg-white rounded border border-accent/20 space-y-1">
                  <p>color.surface.primary: {`{color.gray.900}`}</p>
                  <p>color.action.interactive: {`{color.blue.500}`}</p>
                  <p>space.card.padding: {`{spacing.6}`}</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#FAFAF7] border border-line space-y-2">
                <span className="font-mono text-xs font-bold text-muted uppercase">
                  3. COMPONENT TOKENS
                </span>
                <p className="text-xs text-muted">
                  Strictly scoped component property bindings mapped to code props.
                </p>
                <div className="font-mono text-[11px] p-2 bg-white rounded border border-line/80 space-y-1">
                  <p>btn.primary.bg: {`{color.action.interactive}`}</p>
                  <p>badge.accent.text: {`{color.action.interactive}`}</p>
                  <p>table.row.height: 36px</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Component Inventory Grid */}
        <section id="components" className="my-20 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                03 · COMPONENT INVENTORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
                Core Library Primitives (62 Components)
              </h2>
            </div>
            <span className="font-mono text-xs text-muted">
              Figma Auto-Layout &amp; TypeScript Parity
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {componentInventory.map((comp) => (
              <div
                key={comp.name}
                className="p-5 rounded-xl bg-white border border-line card-hover flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-muted block mb-1">
                    {comp.category}
                  </span>
                  <h4 className="text-base font-semibold text-ink">
                    {comp.name}
                  </h4>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-line/60">
                  <span className="font-mono text-[11px] text-accent font-semibold">
                    {comp.count} Variants
                  </span>
                  <span className="text-xs text-muted">Ready</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Atomic Architecture */}
        <section className="my-20 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              04 · ATOMIC ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Atoms → Molecules → Organisms → Templates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {atomicLayers.map((layer, idx) => (
              <div
                key={layer.layer}
                className="p-6 rounded-[20px] bg-white border border-line space-y-3"
              >
                <span className="font-mono text-xs font-bold text-accent">
                  LEVEL 0{idx + 1}
                </span>
                <h3 className="text-xl font-semibold text-ink">{layer.layer}</h3>
                <p className="text-xs text-muted leading-relaxed">
                  {layer.description}
                </p>
                <div className="pt-3 border-t border-line/60 font-mono text-[11px] text-ink">
                  {layer.examples}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Live Theme Switcher */}
        <section className="my-20 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              05 · THEME ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Live Theme Swapping
            </h2>
            <p className="text-muted text-base mt-2">
              Demonstrating semantic token resolution across Light, Dark, and High-Contrast Cobalt palettes.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-ink">
                ACTIVE PALETTE:
              </span>
              <div className="flex items-center gap-2">
                {(["light", "dark", "cobalt"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTheme(t)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full font-mono text-xs uppercase font-semibold transition-colors cursor-pointer",
                      activeTheme === t
                        ? "bg-accent text-white"
                        : "bg-line/40 text-muted hover:text-ink"
                    )}
                  >
                    {t} Theme
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Box Styled According to Active Theme */}
            <div
              className={cn(
                "p-8 rounded-xl transition-colors duration-300 border space-y-6",
                activeTheme === "light" && "bg-[#FAFAF7] text-[#0E0E10] border-[#E7E5DF]",
                activeTheme === "dark" && "bg-[#0B0B0F] text-white border-[#23232C]",
                activeTheme === "cobalt" && "bg-[#1E2E8C] text-white border-[#3F59FF]"
              )}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold">Clinical Record #AP-84920</h4>
                  <p className="text-xs opacity-75">Theme tokens applied without DOM re-render</p>
                </div>
                <span
                  className={cn(
                    "font-mono text-xs px-3 py-1 rounded-full",
                    activeTheme === "light" && "bg-accent text-white",
                    activeTheme === "dark" && "bg-white text-black font-bold",
                    activeTheme === "cobalt" && "bg-amber-400 text-black font-bold"
                  )}
                >
                  TOKEN RESOLVED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3 rounded bg-black/5 dark:bg-white/5">
                  <span className="opacity-60 block">--color-surface</span>
                  <span className="font-bold">
                    {activeTheme === "light" ? "#FAFAF7" : activeTheme === "dark" ? "#0B0B0F" : "#1E2E8C"}
                  </span>
                </div>
                <div className="p-3 rounded bg-black/5 dark:bg-white/5">
                  <span className="opacity-60 block">--color-text</span>
                  <span className="font-bold">
                    {activeTheme === "light" ? "#0E0E10" : "#FFFFFF"}
                  </span>
                </div>
                <div className="p-3 rounded bg-black/5 dark:bg-white/5">
                  <span className="opacity-60 block">--color-action</span>
                  <span className="font-bold">
                    {activeTheme === "cobalt" ? "#FBBF24" : "#2F4BFF"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. AI-Assisted System Workflow */}
        <section className="my-20 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              06 · AI-ASSISTED SYSTEM WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Figma → Tokens → AI Scaffold → Code → Storybook → Product
            </h2>
            <p className="text-muted text-base mt-2">
              AI tools accelerate component scaffolding and documentation, but every output is reviewed against the design system, responsive behavior, accessibility, and final visual quality.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-6">
            {/* Workflow Pipeline */}
            <div className="flex flex-wrap gap-2 items-center">
              {[
                { step: "Figma Design", desc: "Component with variants & auto-layout", ai: false },
                { step: "Design Tokens", desc: "Exported JSON via CI/CD pipeline", ai: false },
                { step: "AI Scaffold", desc: "Cursor / Antigravity generates component code", ai: true },
                { step: "Manual Review", desc: "Design system check, a11y, responsive QA", ai: false },
                { step: "Storybook", desc: "Documented stories with all states", ai: false },
                { step: "Production", desc: "Shipped to enterprise platforms", ai: false },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center gap-2">
                  <div className={cn(
                    "p-3 rounded-xl border space-y-1 min-w-[140px]",
                    item.ai
                      ? "bg-accent/5 border-accent/20"
                      : "bg-[#FAFAF7] border-line"
                  )}>
                    <span className={cn(
                      "font-mono text-[10px] font-bold block uppercase tracking-wider",
                      item.ai ? "text-accent" : "text-muted"
                    )}>
                      {item.step}
                    </span>
                    <p className="text-[10px] text-muted leading-snug">{item.desc}</p>
                  </div>
                  {i < 5 && (
                    <span className="text-muted/40 text-xs" aria-hidden="true">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Key Principle */}
            <div className="pt-4 border-t border-line/60 flex items-start gap-3">
              <span className="font-mono text-xs text-accent font-bold pt-0.5 shrink-0">PRINCIPLE</span>
              <p className="text-xs text-muted leading-normal">
                AI scaffolds the first pass. I review every component against the design system&apos;s token hierarchy, state completeness (6 states), responsive breakpoints, WCAG AA compliance, and visual fidelity before it enters Storybook or production.
              </p>
            </div>
          </div>
        </section>
      </Container>

      {/* CTA Block */}
      <CTASection
        heading="Need a scalable design system for your squads?"
        subheading="I help engineering teams establish token architecture, build Storybook component libraries, and streamline design handoff."
        primaryButtonText="Discuss a design system"
        primaryButtonHref="/contact"
      />
    </div>
  );
}
