"use client";

/**
 * CaseCoverBuild — the homepage's "screen builds itself" sequence, applied to a
 * case study cover. One sticky stage, scrolled through five steps:
 *
 *   Wireframe → Components → UI design → Prototype → Outcome
 *
 * Captions come from the project's own data. Stage changes are CSS transitions
 * (data-stage), continuous values are scroll-linked, so reversing the scroll
 * replays the build backwards. Desktop + motion only; smaller screens and
 * reduced motion get the static cover (rendered by CaseHero).
 */

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const STAGES = ["Wireframe", "Components", "UI Design", "Prototype", "Outcome"] as const;

/* Layout regions of the cover app frame (covers are 800×500, frame at 60,45 · 680×410) */
const REGIONS = [
  { name: "Header", style: { left: "7.5%", top: "9%", width: "85%", height: "8.8%" } },
  { name: "Navigation", style: { left: "9.5%", top: "21%", width: "19%", height: "64%" } },
  { name: "DataView", style: { left: "31%", top: "21%", width: "59%", height: "38%" } },
  { name: "Summary", style: { left: "31%", top: "62%", width: "59%", height: "23%" } },
];

function captions(p: Project) {
  const decision = p.decisions?.[0];
  return [
    {
      kicker: "Structure before pixels.",
      title: p.keyFlow?.title ?? "Mapping who does what, and what comes next.",
      body: p.context?.[0] ?? p.tldr.problem,
    },
    {
      kicker: "Components, not screens.",
      title: p.systemHandoff
        ? `${p.systemHandoff.componentsCount} components, ${p.systemHandoff.tokensCount} tokens.`
        : "Boxes snap into reusable parts.",
      body: p.systemHandoff?.specsDescription ?? p.tldr.role,
    },
    {
      kicker: "Hierarchy through restraint.",
      title: decision?.title ?? p.insightHeadline ?? p.title,
      body: decision?.reason ?? p.summary,
    },
    {
      kicker: "Interaction you can click.",
      title: p.keyFlow ? `${p.keyFlow.steps.length}-step core flow, tested before build.` : "Flows are tested before they're built.",
      body: p.keyFlow?.steps.join(" → ") ?? "Working prototypes with real states, reviewed with stakeholders before a sprint starts.",
    },
    {
      kicker: "Shipped and measured.",
      title: p.keyOutcome ? `${p.keyOutcome.metric} ${p.keyOutcome.label}` : p.outcomes[0]?.text ?? "Shipped.",
      body: p.tldr.outcome,
    },
  ];
}

export function CaseCoverBuild({ project }: { project: Project }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [stage, setStage] = React.useState(0);
  const caps = React.useMemo(() => captions(project), [project]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // first 14%: the frame arrives in perspective (hero → build handoff); then 5 equal stages
  const build = useTransform(scrollYProgress, [0.14, 1], [0, 1], { clamp: true });
  const enterScale = useTransform(scrollYProgress, [0, 0.14], [0.84, 1]);
  const enterRotate = useTransform(scrollYProgress, [0, 0.14], [16, 0]);
  const enterY = useTransform(scrollYProgress, [0, 0.14], [60, 0]);
  const stageBar = useTransform(build, (b) => {
    const s = Math.min(4, Math.floor(b * 5));
    return Math.min(1, Math.max(0, b * 5 - s));
  });
  const zoom = useTransform(scrollYProgress, (v) =>
    v < 0.02 ? "100%" : v < 0.14 ? `${Math.round(100 - 25 * (v / 0.14))}%` : "Fit"
  );

  useMotionValueEvent(build, "change", (b) => setStage(Math.min(4, Math.floor(b * 5))));

  const cap = caps[stage];

  return (
    <section
      ref={ref}
      data-section="Build"
      aria-label={`${project.title}: how the product was built`}
      className="hidden lg:block motion-reduce:!hidden reduced:!hidden [@media(max-height:699px)]:!hidden relative h-[380vh]"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center"
        data-stage={stage}
      >
        {/* canvas dots */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(14,14,16,.08) 1px, transparent 1.2px)", backgroundSize: "24px 24px" }}
        />
        <div className="relative w-full max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-12 items-center pt-16 pb-20">
          {/* captions */}
          <div className="col-span-4 space-y-4" aria-live="polite">
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted">
              {String(stage + 2).padStart(2, "0")} / 06 · {STAGES[stage]}
            </p>
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <p className="font-serif italic text-2xl text-accent">{cap.kicker}</p>
              <h2 className="text-3xl xl:text-4xl font-semibold tracking-tight text-ink leading-[1.05] text-balance">
                {cap.title}
              </h2>
              <p className="text-muted leading-relaxed max-w-[44ch] line-clamp-5">{cap.body}</p>
            </motion.div>
            <div className="h-[2px] max-w-[220px] rounded bg-line overflow-hidden">
              <motion.i className="block h-full bg-accent origin-left" style={{ scaleX: stageBar }} />
            </div>
            <ol className="flex gap-1.5 pt-2" aria-hidden="true">
              {STAGES.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)]",
                    i === stage ? "w-8 bg-accent" : i < stage ? "w-3 bg-accent/40" : "w-3 bg-line"
                  )}
                />
              ))}
            </ol>
          </div>

          {/* the frame being built */}
          <div className="col-span-8">
            <div className="flex justify-between font-mono text-[11px] tracking-[0.04em] text-muted mb-2">
              <span><b className="text-accent font-medium">#</b> Frame · {project.slug}</span>
              <span className="flex items-center gap-3">
                <motion.span className="tabular-nums">{zoom}</motion.span>
                <span>1600 × 1000</span>
              </span>
            </div>
            <motion.div
              style={{ scale: enterScale, rotateX: enterRotate, y: enterY, transformPerspective: 1400, transformOrigin: "50% 100%" }}
              className="relative"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-line bg-white shadow-[0_40px_120px_rgba(14,14,16,.14),0_2px_6px_rgba(14,14,16,.05)]">
                {/* the real cover, "developed" stage by stage */}
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1400px) 66vw, 900px"
                  className={cn(
                    "object-cover transition-[filter,opacity] duration-[850ms] ease-[cubic-bezier(.16,1,.3,1)]",
                    stage === 0 && "grayscale opacity-25",
                    stage === 1 && "grayscale opacity-60",
                    stage >= 2 && "grayscale-0 opacity-100"
                  )}
                />

                {/* wireframe + component regions */}
                {REGIONS.map((r, i) => (
                  <div
                    key={r.name}
                    aria-hidden="true"
                    style={{ ...r.style, transitionDelay: `${i * 60}ms` }}
                    className={cn(
                      "absolute rounded-lg transition-all duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)]",
                      stage === 0 && "border border-dashed border-[#c9c7c0] bg-[#efeee9]/85",
                      stage === 1 && "border-[1.5px] border-[#9747ff] bg-[#9747ff]/[0.04] shadow-[0_0_0_3px_rgba(151,71,255,.08)]",
                      stage >= 2 && "border border-transparent opacity-0"
                    )}
                  >
                    {/* wireframe hatch */}
                    <span
                      className={cn("absolute inset-0 rounded-[inherit] transition-opacity duration-[450ms]", stage === 0 ? "opacity-100" : "opacity-0")}
                      style={{
                        background:
                          "linear-gradient(to top right, transparent calc(50% - .5px), #cfcdc6 50%, transparent calc(50% + .5px)), linear-gradient(to top left, transparent calc(50% - .5px), #cfcdc6 50%, transparent calc(50% + .5px))",
                      }}
                    />
                    <span
                      className={cn(
                        "absolute -top-[18px] left-0 font-mono text-[10px] text-[#9747ff] whitespace-nowrap transition-opacity duration-[450ms]",
                        stage === 1 ? "opacity-100" : "opacity-0"
                      )}
                    >
                      ◆ {r.name}
                    </span>
                  </div>
                ))}

                {/* UI design: inspect panel */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute right-4 top-[22%] w-[200px] rounded-xl border border-line bg-white/95 backdrop-blur-sm p-3 font-mono text-[10px] text-muted space-y-2 shadow-[0_20px_50px_rgba(14,14,16,.12)] transition-all duration-[850ms] ease-[cubic-bezier(.34,1.56,.64,1)]",
                    stage === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                  )}
                >
                  <p className="text-[9.5px] tracking-[0.12em] text-muted/80">DESIGN · TOKENS</p>
                  <p className="flex justify-between"><span>Fill</span><span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-accent inline-block" />color.accent</span></p>
                  <p className="flex justify-between"><span>Text</span><span>Inter Tight 500</span></p>
                  <p className="flex justify-between"><span>Numbers</span><span>tabular-nums</span></p>
                  <p className="flex justify-between"><span>Contrast</span><span className="text-[#0d9a52]">AA · 7.1:1</span></p>
                </div>

                {/* prototype: noodle + cursor */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                >
                  <path
                    d="M190 300 C 250 300, 240 200, 300 200"
                    pathLength={1}
                    fill="none"
                    style={{ stroke: "var(--color-accent)", strokeDashoffset: stage === 3 ? 0 : 1 }}
                    strokeWidth={2.5}
                    strokeDasharray="1"
                    className="transition-[stroke-dashoffset] duration-[1100ms] ease-[cubic-bezier(.65,0,.35,1)]"
                  />
                  <circle cx="190" cy="300" r="6" style={{ fill: "var(--color-accent)" }} className={cn("transition-opacity duration-300", stage === 3 ? "opacity-100" : "opacity-0")} />
                  <circle cx="300" cy="200" r="5" style={{ fill: "var(--color-accent)" }} className={cn("transition-opacity duration-300 delay-700", stage === 3 ? "opacity-100" : "opacity-0")} />
                </svg>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute right-4 top-4 bg-accent text-white font-mono text-[10.5px] tracking-[0.08em] px-2.5 py-1.5 rounded-md transition-opacity duration-[450ms]",
                    stage === 3 ? "opacity-100" : "opacity-0"
                  )}
                >
                  ▶ PROTOTYPE · FLOW 1
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[36%] top-[38%] flex items-start gap-0.5 transition-all duration-[1400ms] ease-[cubic-bezier(.65,0,.35,1)]",
                    stage === 3 ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-40 translate-y-24"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" style={{ fill: "var(--color-accent)" }} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                  <em className="not-italic text-[11px] font-medium text-white bg-accent px-2 py-1 rounded-[3px_9px_9px_9px] mt-3">Aditya</em>
                </span>

                {/* outcome: collaborators + result */}
                {[
                  { who: "PM · “Rolling out next sprint”", c: "#e5484d", pos: "left-[58%] top-[26%]" },
                  { who: "Dev · “Props match the file”", c: "#12a150", pos: "left-[16%] top-[72%]" },
                ].map((m) => (
                  <span
                    key={m.who}
                    aria-hidden="true"
                    className={cn(
                      "absolute flex items-start gap-0.5 transition-all duration-[850ms] ease-[cubic-bezier(.16,1,.3,1)]",
                      m.pos,
                      stage === 4 ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-10 translate-y-8"
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" fill={m.c} stroke="#fff" strokeWidth="1.5" /></svg>
                    <em className="not-italic text-[11px] font-medium text-white px-2 py-1 rounded-[3px_9px_9px_9px] mt-3 whitespace-nowrap" style={{ background: m.c }}>{m.who}</em>
                  </span>
                ))}
              </div>

              {/* outcome card breaks out of the frame, like the homepage */}
              <div
                aria-hidden={stage !== 4}
                className={cn(
                  "absolute -right-6 -bottom-8 w-[260px] rounded-[14px] bg-[#0e0e10] dark:bg-[#1f1f26] dark:ring-1 dark:ring-white/10 text-white p-4 shadow-[0_30px_60px_rgba(0,0,0,.25)] transition-all duration-[850ms] ease-[cubic-bezier(.34,1.56,.64,1)]",
                  stage === 4 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"
                )}
              >
                <p className="font-mono text-[10px] tracking-[0.12em] text-[#9b9aa4] uppercase">
                  {project.keyOutcome?.label ?? "Outcome"}
                </p>
                <p className="text-3xl font-semibold tracking-tight mt-1 tabular-nums">
                  {project.keyOutcome?.metric ?? "Shipped"}
                </p>
                <p className="font-mono text-[11px] text-[#6fe3a1] mt-1 line-clamp-2">{project.outcomes[0]?.text}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
