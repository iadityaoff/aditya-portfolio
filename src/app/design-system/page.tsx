"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/shared/cta-section";
import { cn } from "@/lib/utils";
import { ComponentLab } from "@/components/design-system/component-lab";
import { PatternLab } from "@/components/design-system/pattern-gallery";
import { useSiteTheme } from "@/lib/site-theme";
import { DotGrid, FrameHeading, PageToolbar, Reveal } from "@/components/motion/studio";

export default function DesignSystemPage() {
  const siteTheme = useSiteTheme();

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
    <div className="relative isolate w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background min-h-screen">
      <DotGrid className="h-[720px]" />
      <PageToolbar frame="Design System" />
      <Container size="default">
        {/* Hero Section */}
        <div className="max-w-3xl mb-16 space-y-4" data-section="Overview">
          <Badge variant="accent">PORTFOLIO DESIGN SYSTEM</Badge>
          <FrameHeading frame="Design System" className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-tight">
            Designing systems,{" "}
            <em className="font-serif font-normal italic">not just screens.</em>
          </FrameHeading>
          <p className="text-base sm:text-lg text-muted leading-relaxed pt-6">
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
        <section className="my-20" data-section="Foundations">
          <Reveal className="space-y-8">
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
                    <span className="w-4 h-4 rounded-full bg-accent" />
                    <span className="font-mono text-xs text-accent font-bold">Accent · live</span>
                  </div>
                  <span className="font-mono text-xs text-accent uppercase">{siteTheme.accent}</span>
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
          </Reveal>
        </section>

        {/* 2. Token Architecture Diagram */}
        <section className="my-20" data-section="Tokens">
          <Reveal className="space-y-8">
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
                  <p>color.primary.500: <span className="uppercase">{siteTheme.accent}</span></p>
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
          </Reveal>
        </section>

        {/* 3. Component Inventory — live examples */}
        <section id="components" className="my-20 space-y-10" data-section="Components">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                03 · COMPONENT LIBRARY &amp; THEME BUILDER
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
                Core Library Primitives (62 Components)
              </h2>
              <p className="text-sm text-muted mt-2 max-w-xl">
                Every card is the component itself. Switch its variants, then re-theme the whole library from the builder: one set of tokens drives all of it.
              </p>
            </div>
            <span className="font-mono text-xs text-muted">
              Figma Auto-Layout &amp; TypeScript Parity
            </span>
          </Reveal>
          <ComponentLab />
        </section>

        {/* 4. Composed patterns — organisms built from the library */}
        <section id="patterns" className="my-20 space-y-10" data-section="Patterns">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                04 · COMPOSED PATTERNS
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
                Components, assembled into <em className="font-serif font-normal italic">real workflows</em>
              </h2>
              <p className="text-sm text-muted mt-2 max-w-xl">
                The same primitives and tokens, composed into the organisms a product actually ships: booking, dense tables, command search and access control. Everything here is live and follows the theme builder.
              </p>
            </div>
            <span className="font-mono text-xs text-muted">Organisms · Interactive</span>
          </Reveal>
          <PatternLab />
        </section>

        {/* 5. Atomic Architecture */}
        <section className="my-20" data-section="Atomic">
          <Reveal className="space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              05 · ATOMIC ARCHITECTURE
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
          </Reveal>
        </section>

        {/* 6. AI-Assisted System Workflow */}
        <section className="my-20" data-section="AI workflow">
          <Reveal className="space-y-8">
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
          </Reveal>
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
