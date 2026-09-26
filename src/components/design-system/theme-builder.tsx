"use client";

import * as React from "react";
import {
  EXPERIENCES,
  FONTS,
  PRESETS,
  compile,
  contrast,
  exportCss,
  isHex,
  rating,
  scale,
  type Density,
  type FontId,
  type Mode,
  type MotionPref,
  type Skin,
  type Theme,
} from "./theme-engine";
import { cn } from "@/lib/utils";

const mono = "font-mono text-[10px] tracking-[0.1em] uppercase text-muted";

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <p className={mono}>{title}</p>
        {hint && <span className="font-mono text-[10px] text-muted tabular-nums">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { v: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-flow-col auto-cols-fr gap-1 p-1 rounded-xl bg-[#f3f2ee]">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          onClick={() => onChange(o.v)}
          className={cn(
            "h-8 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer",
            value === o.v ? "bg-white text-ink shadow-[0_1px_3px_rgba(14,14,16,.12)]" : "text-muted hover:text-ink"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Rating({ ratio }: { ratio: number }) {
  const r = rating(ratio);
  return (
    <span
      className={cn(
        "font-mono text-[9.5px] px-1.5 py-0.5 rounded-full",
        r === "Fail" ? "bg-[#fde6e7] text-[#b3261e]" : r === "AA Large" ? "bg-[#fdf1dc] text-[#9a5d00]" : "bg-[#e3f5ea] text-[#0d7a3c]"
      )}
    >
      {r}
    </span>
  );
}

/** Tiny illustration of each experience (drawn, not screenshots). */
function SkinThumb({ id }: { id: Skin }) {
  if (id === "newspaper")
    return (
      <span aria-hidden="true" className="block h-12 bg-[#f2ede2] border-b border-[#15130f]/20 px-2 pt-1.5">
        <span className="block text-center text-[9px] leading-none font-bold tracking-tight text-[#15130f]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>The Daily Design</span>
        <span className="block mt-1 border-t-[3px] border-double border-[#15130f]" />
        <span className="mt-1 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => <i key={i} className="block h-2.5 bg-[repeating-linear-gradient(#15130f55_0_1px,transparent_1px_3px)]" />)}
        </span>
      </span>
    );
  if (id === "figma")
    return (
      <span aria-hidden="true" className="relative block h-12 bg-[#f5f5f5] bg-[radial-gradient(#c8c8c8_1px,transparent_1.2px)] [background-size:8px_8px]">
        <i className="absolute left-3 top-3 w-12 h-6 bg-white border-[1.5px] border-[#0d99ff]" />
        <i className="absolute left-[10px] top-[10px] w-1.5 h-1.5 bg-white border border-[#0d99ff]" />
        <i className="absolute left-[56px] top-[34px] w-1.5 h-1.5 bg-white border border-[#0d99ff]" />
        <i className="absolute right-3 top-2 bottom-2 w-5 rounded-sm bg-white border border-[#e3e3e3]" />
      </span>
    );
  if (id === "code")
    return (
      <span aria-hidden="true" className="block h-12 bg-[#1e1e1e] px-2 py-1.5 font-mono text-[8px] leading-[1.35]">
        <span className="block"><b className="font-normal text-[#c586c0]">const</b> <b className="font-normal text-[#4fc1ff]">ui</b> = <b className="font-normal text-[#ce9178]">&quot;clear&quot;</b></span>
        <span className="block text-[#6a9955]">{"// ship it"}</span>
        <span className="block"><b className="font-normal text-[#dcdcaa]">design</b>(<b className="font-normal text-[#9cdcfe]">system</b>)</span>
      </span>
    );
  return (
    <span aria-hidden="true" className="relative block h-12 bg-[#fafaf7] bg-[radial-gradient(rgba(14,14,16,.1)_1px,transparent_1.2px)] [background-size:8px_8px] px-2 pt-2">
      <span className="block text-[11px] leading-none font-semibold tracking-tight text-[#0e0e10]">Aa <em className="font-serif font-normal text-[#2f4bff]">Studio</em></span>
      <span className="mt-1.5 flex gap-1"><i className="h-2 w-8 rounded-full bg-[#2f4bff]" /><i className="h-2 w-5 rounded-full border border-[#0e0e10]/30" /></span>
    </span>
  );
}

export function ThemeBuilder({
  theme,
  onChange,
  onReset,
  onSurprise,
  className,
}: {
  theme: Theme;
  onChange: (patch: Partial<Theme>) => void;
  onReset: () => void;
  onSurprise: () => void;
  className?: string;
}) {
  const [hexDraft, setHexDraft] = React.useState(theme.accent);
  const [copied, setCopied] = React.useState(false);
  const [prevAccent, setPrevAccent] = React.useState(theme.accent);
  if (prevAccent !== theme.accent) {
    setPrevAccent(theme.accent);
    setHexDraft(theme.accent);
  }

  const tokens = compile(theme);
  const ramp = scale(theme.accent);
  const onAccent = contrast(tokens["--t-accent"], tokens["--t-on-accent"]);
  const textOnSurface = contrast(tokens["--t-accent-text"], tokens["--t-surface"]);
  const colorId = React.useId();
  const radiusId = React.useId();
  const activePreset = PRESETS.find(
    (p) => p.theme.accent?.toLowerCase() === theme.accent.toLowerCase() && p.theme.mode === theme.mode && p.theme.radius === theme.radius && p.theme.density === theme.density
  );

  const copy = () => {
    navigator.clipboard?.writeText(exportCss(theme)).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    });
  };

  return (
    <div aria-label="Theme builder" className={cn("rounded-[20px] border border-line bg-white p-5 space-y-6 shadow-[0_24px_60px_rgba(14,14,16,.06)]", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.1em] text-[var(--color-component)]">◆ THEME BUILDER</p>
          <p className="text-sm font-semibold text-ink mt-0.5">Site variables</p>
          <p className="text-[11px] text-muted mt-1 leading-snug">Everything here themes the whole portfolio. Shape &amp; density tune the component library.</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onSurprise}
            className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-line text-[11px] font-medium text-ink hover:border-ink/30 transition-colors cursor-pointer"
          >
            <span aria-hidden="true">✦</span> Surprise me
          </button>
          <button type="button" onClick={onReset} className="font-mono text-[10px] tracking-[0.08em] uppercase text-muted hover:text-ink cursor-pointer">
            Reset
          </button>
        </div>
      </div>

      {/* experience */}
      <Section title="Experience">
        <div role="radiogroup" aria-label="Experience" className="grid grid-cols-2 gap-2">
          {EXPERIENCES.map((x) => {
            const on = theme.skin === x.id;
            return (
              <button
                key={x.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onChange(x.theme)}
                className={cn(
                  "text-left rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer",
                  on ? "border-ink ring-2 ring-ink/10" : "border-line hover:border-ink/30"
                )}
              >
                <SkinThumb id={x.id} />
                <span className="block px-2.5 py-2">
                  <span className="block text-xs font-semibold text-ink">{x.name}</span>
                  <span className="block text-[10px] text-muted leading-snug mt-0.5">{x.note}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* colour presets */}
      <Section title="Colour presets">
        <div className="grid grid-cols-3 gap-1.5">
          {PRESETS.map((p) => {
            const on = activePreset?.name === p.name;
            return (
              <button
                key={p.name}
                type="button"
                aria-pressed={on}
                onClick={() => onChange(p.theme)}
                className={cn(
                  "flex items-center gap-2 px-2 py-2 rounded-lg border text-[11px] font-medium text-left transition-all duration-300 cursor-pointer",
                  on ? "border-ink text-ink" : "border-line text-muted hover:text-ink hover:border-ink/30"
                )}
              >
                <span
                  aria-hidden="true"
                  className="w-4 h-4 shrink-0 border border-black/10"
                  style={{
                    background: `linear-gradient(135deg, ${p.theme.mode === "dark" ? "#17171c" : "#ffffff"} 50%, ${p.theme.accent} 50%)`,
                    borderRadius: Math.min(8, p.theme.radius ?? 8),
                  }}
                />
                {p.name}
              </button>
            );
          })}
        </div>
      </Section>

      {/* accent */}
      <Section title="Accent · color.primary.500">
        <div className="flex items-center gap-2">
          <input
            id={colorId}
            type="color"
            aria-label="Accent colour"
            value={theme.accent}
            onChange={(e) => onChange({ accent: e.target.value })}
            className="w-10 h-10 rounded-lg border border-line cursor-pointer bg-transparent p-0.5"
          />
          <input
            aria-label="Accent hex value"
            value={hexDraft}
            spellCheck={false}
            onChange={(e) => {
              const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`;
              setHexDraft(v);
              if (isHex(v)) onChange({ accent: v });
            }}
            className={cn(
              "flex-1 h-10 px-3 rounded-lg border font-mono text-xs uppercase outline-none focus:ring-[3px] transition-shadow bg-transparent text-ink",
              isHex(hexDraft) ? "border-line focus:border-accent focus:ring-accent/15" : "border-[#e5484d] focus:ring-[#e5484d]/15"
            )}
          />
        </div>
        <div className="flex rounded-lg overflow-hidden border border-line" aria-label="Generated color scale">
          {ramp.map(([step, hex]) => (
            <span key={step} title={`primary.${step} ${hex}`} className="flex-1 h-7 relative group/sw" style={{ background: hex }}>
              <span className={cn("absolute inset-x-0 bottom-0.5 text-center font-mono text-[7.5px] opacity-0 group-hover/sw:opacity-100 transition-opacity", Number(step) >= 500 ? "text-white" : "text-black/60")}>
                {step}
              </span>
            </span>
          ))}
        </div>
      </Section>

      <Section title="Mode">
        <Segmented<Mode>
          label="Mode"
          value={theme.mode}
          options={[{ v: "light", label: "Light" }, { v: "dark", label: "Dark" }]}
          onChange={(mode) => onChange({ mode })}
        />
      </Section>

      {/* typography */}
      <Section title="Typography" hint={FONTS[theme.font]?.note}>
        <div role="radiogroup" aria-label="Typography" className="grid grid-cols-2 gap-1.5">
          {(Object.keys(FONTS) as FontId[]).map((id) => {
            const f = FONTS[id];
            const on = theme.font === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onChange({ font: id })}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-lg border text-left transition-all duration-300 cursor-pointer",
                  on ? "border-ink" : "border-line hover:border-ink/30"
                )}
              >
                <span aria-hidden="true" className="text-xl leading-none text-ink w-7 shrink-0" style={{ fontFamily: `var(${f.display[0]})`, fontWeight: 600, letterSpacing: "-0.03em" }}>
                  Aa
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-ink">{f.label}</span>
                  <span className="block text-[10px] text-muted truncate">{f.note}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* component shape */}
      <Section title="Shape · radius.control" hint={`${theme.radius}px`}>
        <input
          id={radiusId}
          type="range"
          min={0}
          max={24}
          value={theme.radius}
          aria-label="Component radius"
          onChange={(e) => onChange({ radius: Number(e.target.value) })}
          className="w-full accent-[var(--color-accent)] cursor-pointer"
        />
        <Segmented<Density>
          label="Density"
          value={theme.density}
          options={[{ v: "compact", label: "Compact" }, { v: "default", label: "Default" }, { v: "comfortable", label: "Roomy" }]}
          onChange={(density) => onChange({ density })}
        />
      </Section>

      {/* experience settings */}
      <div className="grid grid-cols-2 gap-3">
        <Section title="Motion">
          <Segmented<MotionPref>
            label="Motion"
            value={theme.motion}
            options={[{ v: "full", label: "Full" }, { v: "reduced", label: "Reduced" }]}
            onChange={(motion) => onChange({ motion })}
          />
        </Section>
        <Section title="Texture">
          <Segmented<"on" | "off">
            label="Film grain texture"
            value={theme.texture ? "on" : "off"}
            options={[{ v: "on", label: "Grain" }, { v: "off", label: "Clean" }]}
            onChange={(v) => onChange({ texture: v === "on" })}
          />
        </Section>
      </div>

      {/* accessibility */}
      <Section title="Contrast check · WCAG 2.2">
        <div className="space-y-1.5 text-xs text-ink">
          <p className="flex items-center justify-between gap-2">
            <span className="text-muted">Label on accent</span>
            <span className="flex items-center gap-2 font-mono tabular-nums">{onAccent.toFixed(1)}:1 <Rating ratio={onAccent} /></span>
          </p>
          <p className="flex items-center justify-between gap-2">
            <span className="text-muted">Accent text on surface</span>
            <span className="flex items-center gap-2 font-mono tabular-nums">{textOnSurface.toFixed(1)}:1 <Rating ratio={textOnSurface} /></span>
          </p>
        </div>
      </Section>

      {/* export */}
      <Section title="Export · tokens.css">
        <div className="flex justify-end -mt-6">
          <button type="button" onClick={copy} className="font-mono text-[10px] tracking-[0.08em] uppercase text-accent hover:underline cursor-pointer" aria-live="polite">
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <pre className="max-h-40 overflow-auto rounded-xl bg-[#0e0e10] text-[#d7d6de] font-mono text-[10.5px] leading-relaxed p-3" data-lenis-prevent>
          {exportCss(theme)}
        </pre>
      </Section>
    </div>
  );
}
