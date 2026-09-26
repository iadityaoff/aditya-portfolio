"use client";

/**
 * Studio motion kit — the homepage prototype's motion language for the
 * rest of the site (see MOTION.md → "Homepage prototype").
 *
 *   Micro   0.3–0.45s  hover, press, state
 *   Reveal  0.9s       content entrance (expo out)
 *   Scene   1.1s       selection frames, camera-like moves (expo in-out)
 *
 * Everything falls back to a static, fully visible state under
 * prefers-reduced-motion.
 */

import * as React from "react";
import {
  animate,
  motion,
  useReducedMotionConfig,
  type Variants,
} from "motion/react";
import { useSmoothScroll } from "@/components/layout/smooth-scroll";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_INOUT = [0.65, 0, 0.35, 1] as const;
export const T = { micro: 0.35, reveal: 0.9, scene: 1.1 };

/* ------------------------------------------------------------------ */
/* Handles: the 8 Figma resize handles on a selection box              */
/* ------------------------------------------------------------------ */
const HANDLE_POS = [
  "-left-[5px] -top-[5px]",
  "-right-[5px] -top-[5px]",
  "-left-[5px] -bottom-[5px]",
  "-right-[5px] -bottom-[5px]",
  "left-[calc(50%-4px)] -top-[5px]",
  "left-[calc(50%-4px)] -bottom-[5px]",
  "-left-[5px] top-[calc(50%-4px)]",
  "-right-[5px] top-[calc(50%-4px)]",
];

function Handles({ corners = false }: { corners?: boolean }) {
  return (
    <>
      {(corners ? HANDLE_POS.slice(0, 4) : HANDLE_POS).map((pos) => (
        <i
          key={pos}
          className={cn(
            "absolute w-[9px] h-[9px] bg-white border-[1.5px] border-accent",
            pos
          )}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* FrameHeading — a selection box drags open and the headline is      */
/* revealed inside it, with a live W × H readout (homepage hero intro) */
/* ------------------------------------------------------------------ */
export function FrameHeading({
  frame,
  children,
  className,
  as: Tag = "h1",
}: {
  /** Frame label shown above, e.g. "Work" → "# Frame · Work" */
  frame: string;
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  const reduce = useReducedMotionConfig();
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const [drawn, setDrawn] = React.useState(0);

  React.useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setSize({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) })
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (reduce) return;
    const controls = animate(0, 1, {
      duration: T.scene,
      ease: EASE_INOUT,
      delay: 0.15,
      onUpdate: setDrawn,
    });
    return () => controls.stop();
  }, [reduce]);

  const p = reduce ? 1 : drawn;
  const HeadingTag = motion[Tag];

  return (
    <div className="relative">
      <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted mb-3 flex gap-2">
        <b className="text-accent font-medium">#</b> Frame · {frame}
        <span className="hidden sm:inline">{size.w ? `${size.w} × ${size.h}` : ""}</span>
      </p>
      <div ref={boxRef} className="relative px-3 py-2 -mx-3 sm:px-4 sm:-mx-4">
        <HeadingTag
          className={className}
          initial={reduce ? false : { clipPath: "inset(-10% -5% 100% -5%)", y: 18 }}
          animate={{ clipPath: "inset(-10% -5% -10% -5%)", y: 0 }}
          transition={{ duration: T.reveal, ease: EASE_OUT, delay: 0.45 }}
        >
          {children}
        </HeadingTag>
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 border-[1.5px] border-accent pointer-events-none origin-top-left"
          initial={reduce ? false : { scaleX: 0, scaleY: 0 }}
          animate={{ scaleX: 1, scaleY: 1 }}
          transition={{ duration: T.scene, ease: EASE_INOUT, delay: 0.15 }}
        >
          <Handles />
          <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 bg-accent text-white font-mono text-[10.5px] px-1.5 py-0.5 rounded tabular-nums whitespace-nowrap">
            W {Math.round(size.w * p)} · H {Math.round(size.h * p)}
          </span>
        </motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal / Stagger — level-2 entrances (fade-up, once, expo out)      */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  section,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Registers this block as a PageToolbar step */
  section?: string;
}) {
  const reduce = useReducedMotionConfig();
  return (
    <motion.div
      className={className}
      data-section={section}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some", margin: "0px 0px -6% 0px" }}
      transition={{ duration: T.reveal, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: T.reveal, ease: EASE_OUT } },
};

export function Stagger({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotionConfig();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotionConfig();
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* FigmaFrame — frame name above, selection box + handles on hover     */
/* ------------------------------------------------------------------ */
export function FigmaFrame({
  name,
  meta,
  children,
  className,
}: {
  name: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("group/frame relative", className)}>
      <div className="flex justify-between gap-4 font-mono text-[11px] tracking-[0.04em] text-muted mb-2">
        <b className="text-ink font-medium truncate group-hover/frame:text-accent transition-colors duration-300">
          {name}
        </b>
        {meta && <span className="shrink-0 tabular-nums">{meta}</span>}
      </div>
      <div className="relative">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[6px] border-[1.5px] border-accent opacity-0 scale-[1.01] group-hover/frame:opacity-100 group-hover/frame:scale-100 group-focus-within/frame:opacity-100 group-focus-within/frame:scale-100 transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)]"
        >
          <Handles corners />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DotGrid — the canvas dot texture, fading out downwards              */
/* ------------------------------------------------------------------ */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        backgroundImage: "radial-gradient(var(--dot, rgba(14,14,16,.09)) 1px, transparent 1.2px)",
        backgroundSize: "24px 24px",
        maskImage: "linear-gradient(to bottom, #000 0%, #000 45%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 45%, transparent 100%)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* PageToolbar — the homepage workflow toolbar: current section,       */
/* section steps and page progress. Reads [data-section] elements.     */
/* ------------------------------------------------------------------ */
interface ToolbarSection {
  id: string;
  label: string;
}

let sectionUid = 0;

export function PageToolbar({ frame }: { frame: string }) {
  const { lenis } = useSmoothScroll();
  const [sections, setSections] = React.useState<ToolbarSection[]>([]);
  const [active, setActive] = React.useState(0);
  const [hidden, setHidden] = React.useState(false);
  const barRef = React.useRef<HTMLElement>(null);
  // the section elements themselves: we never write ids into the DOM, which would
  // make React's hydration of late-mounting (Suspense) sections report a mismatch
  const elsRef = React.useRef<HTMLElement[]>([]);

  React.useEffect(() => {
    let els: HTMLElement[] = [];
    // re-scan when sections mount late (Suspense boundaries, filters)
    const scan = () => {
      // skip hidden subtrees (React keeps offscreen copies of routes/Suspense content)
      const found = Array.from(document.querySelectorAll<HTMLElement>("[data-section]")).filter(
        (el) => !el.closest("[hidden]")
      );
      if (found.length === els.length && found.every((el, i) => el === els[i])) return;
      els = found;
      elsRef.current = found;
      setSections(
        // unique keys across re-scans: late-mounting sections must not reuse one
        els.map((el, i) => ({ id: `section-${++sectionUid}`, label: el.dataset.section || `Section ${i + 1}` }))
      );
    };

    const onScroll = () => {
      scan();
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      barRef.current?.style.setProperty("--p", Math.min(1, scrollY / max).toFixed(4));
      let idx = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= innerHeight * 0.45) idx = i;
      });
      setActive(idx);
      // step aside when the footer arrives so it never covers footer content
      const footer = document.querySelector("footer");
      setHidden(!!footer && footer.getBoundingClientRect().top < innerHeight - 40);
    };
    onScroll();
    const late = window.setTimeout(onScroll, 600);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(late);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  if (!sections.length) return null;

  const go = (i: number) => {
    const el = elsRef.current[i];
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -96 });
    else el.scrollIntoView();
  };

  return (
    <nav
      ref={barRef}
      aria-label={`${frame} sections`}
      className={cn(
        "no-print hidden md:flex fixed left-1/2 bottom-4 z-30 -translate-x-1/2 items-center gap-3.5 py-2 pl-3.5 pr-2.5 rounded-[14px] bg-[#141418] text-[#f3f2ee] font-mono text-[10.5px] tracking-[0.08em] uppercase shadow-[0_12px_40px_rgba(0,0,0,.25),inset_0_0_0_1px_rgba(255,255,255,.08)] max-w-[calc(100vw-32px)] transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)]",
        hidden && "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="flex flex-col gap-0.5 min-w-[140px]">
        <span className="text-[#8b8a94]">
          {frame} · {String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </span>
        <b className="font-medium text-white tracking-[0.06em] whitespace-nowrap">
          {sections[active]?.label}
        </b>
      </div>
      <div className="hidden lg:flex gap-1">
        {sections.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(i)}
            aria-label={s.label}
            aria-current={i === active ? "step" : undefined}
            className={cn(
              "w-[26px] h-[26px] rounded-[7px] grid place-items-center transition-colors duration-300 cursor-pointer",
              i === active ? "bg-accent text-white" : i < active ? "text-[color-mix(in_srgb,var(--color-accent)_45%,white)] hover:bg-white/10" : "text-[#8b8a94] hover:bg-white/10 hover:text-white"
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <span className="pl-3 border-l border-white/10 text-[#cfcfd6] tabular-nums">100%</span>
      <span className="absolute left-3 right-3 bottom-[3px] h-[2px] rounded bg-white/10 overflow-hidden">
        <i className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-accent)_60%,white)] origin-left [transform:scaleX(var(--p,0))]" />
      </span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* FocusGroup — one item dominant: the child nearest the viewport      */
/* centre stays full strength, siblings recede (homepage Work canvas). */
/* Desktop + motion only; pure function of scroll, so it reverses.     */
/* ------------------------------------------------------------------ */
export function FocusGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionConfig();

  React.useEffect(() => {
    const root = ref.current;
    if (!root || reduce) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const items = () => Array.from(root.children) as HTMLElement[];
    const update = () => {
      const els = items();
      if (!mq.matches || els.length < 2) {
        els.forEach((el) => el.classList.remove("is-dim"));
        return;
      }
      const mid = innerHeight / 2;
      let best = -1, bd = Infinity;
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bd) { bd = d; best = i; }
      });
      els.forEach((el, i) => el.classList.toggle("is-dim", best > -1 && i !== best));
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      items().forEach((el) => el.classList.remove("is-dim"));
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={cn(
        "[&>*]:transition-[opacity,filter] [&>*]:duration-[850ms] [&>*]:ease-[cubic-bezier(.16,1,.3,1)] [&>.is-dim]:opacity-55 [&>.is-dim]:saturate-[.6]",
        className
      )}
    >
      {children}
    </div>
  );
}
