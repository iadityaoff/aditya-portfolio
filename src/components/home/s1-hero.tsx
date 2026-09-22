"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function S1Hero() {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers transform speeds
  const yLayer1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yLayer2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yLayer3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const workSection = document.getElementById("selected-work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-background"
    >
      {/* Background Subtle Gradient */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          {/* Eyebrow (mono) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-white/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink">
              SENIOR UI/UX DESIGNER · PRODUCT DESIGN · DESIGN SYSTEMS
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-ink leading-[1.12]">
            Complex products. Clear experiences.{" "}
            <em className="font-serif font-normal italic tracking-normal text-ink">
              Scalable systems.
            </em>
          </h1>

          {/* Sub-copy */}
          <p className="text-lg sm:text-xl text-muted max-w-2xl leading-relaxed">
            {siteConfig.subHeadline}
          </p>

          {/* Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToWork}
              className="inline-flex items-center justify-center font-medium rounded-full text-sm px-6 py-3 min-h-[46px] gap-2 bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>View selected work</span>
              <span aria-hidden="true">↓</span>
            </button>

            <Button
              href="/contact"
              variant="secondary"
              size="md"
              iconRight={<span aria-hidden="true">→</span>}
            >
              Let&apos;s talk
            </Button>
          </div>

          {/* Credibility line under buttons */}
          <p className="font-mono text-xs text-muted/80 tracking-widest uppercase pt-2">
            {siteConfig.credibilityText}
          </p>
        </div>

        {/* Hero Visual: Layered composition of 5 real screens */}
        <div className="mt-16 lg:mt-24 relative max-w-5xl mx-auto">
          {/* Layer 1: Central Dashboard in browser-less frame on tinted panel */}
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : yLayer1 }}
            className="relative rounded-2xl p-3 sm:p-4 bg-[#ECEAE4] border border-line shadow-2xl"
          >
            <div className="relative rounded-xl overflow-hidden bg-white border border-line/80 shadow-md aspect-[16/9]">
              <Image
                src="/images/projects/healthcare-cover.svg"
                alt="Complex clinical SaaS dashboard overview"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Layer 2: High-density Data Table overlay (Left Offset) */}
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : yLayer2 }}
            className="hidden sm:block absolute -bottom-8 -left-8 lg:-left-12 w-64 lg:w-76 rounded-xl overflow-hidden bg-white border border-line shadow-2xl p-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-line mb-2">
              <span className="font-mono text-[10px] uppercase font-bold text-accent">DATA DENSITY</span>
              <span className="font-mono text-[9px] text-muted">1,000+ ROWS</span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between p-1 rounded bg-line/20">
                <span className="text-ink font-semibold">#UHID-8910</span>
                <span className="text-emerald-600 font-bold">$1,240.00</span>
              </div>
              <div className="flex justify-between p-1 rounded bg-line/10">
                <span className="text-muted">#UHID-8911</span>
                <span className="text-ink">$480.00</span>
              </div>
              <div className="flex justify-between p-1 rounded bg-line/10">
                <span className="text-muted">#UHID-8912</span>
                <span className="text-accent">$920.50</span>
              </div>
            </div>
          </motion.div>

          {/* Layer 3: Component tokens sheet (Top Right Offset) */}
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : yLayer2 }}
            className="hidden md:block absolute -top-8 -right-6 lg:-right-8 w-56 rounded-xl overflow-hidden bg-white/95 backdrop-blur-md border border-line shadow-xl p-3"
          >
            <div className="flex items-center gap-1.5 pb-2 border-b border-line mb-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-mono text-[10px] font-bold text-ink">TOKENS STUDIO</span>
            </div>
            <div className="space-y-1 font-mono text-[9px]">
              <div className="flex justify-between text-muted">
                <span>color.accent</span>
                <span className="text-accent font-bold">#2F4BFF</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>radius.card</span>
                <span className="text-ink font-bold">18px</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>elevation.soft</span>
                <span className="text-ink font-bold">0 12px 32px</span>
              </div>
            </div>
          </motion.div>

          {/* Layer 4: Branching Workflow Diagram chip (Top Left Offset) */}
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : yLayer3 }}
            className="hidden lg:flex items-center gap-2 absolute top-12 -left-12 px-3.5 py-2 rounded-lg bg-ink text-white shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] font-medium">Workflow: Pruned 38 → 9 steps</span>
          </motion.div>

          {/* Layer 5: Mobile UI Overlapping Lower Right Corner */}
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : yLayer3 }}
            className="hidden sm:block absolute -bottom-10 -right-6 lg:-right-10 w-44 lg:w-52 rounded-2xl overflow-hidden bg-white border-2 border-ink shadow-2xl p-1.5"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[9/16] bg-[#FAFAF7]">
              <Image
                src="/images/projects/mysatsang-cover.svg"
                alt="Mobile responsive UI view"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
