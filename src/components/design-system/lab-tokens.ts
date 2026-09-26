/**
 * Token-driven class shorthands shared by every component-lab example.
 * They read the lab's semantic tokens (--t-*, compiled by theme-engine.ts),
 * so the ThemeBuilder re-themes all examples at once.
 */
export const accentFill = "bg-[var(--t-accent)] text-[var(--t-on-accent)] hover:bg-[var(--t-accent-hover)]";
export const surface = "bg-[var(--t-surface)]";
export const surface2 = "bg-[var(--t-surface-2)]";
export const ink = "text-[var(--t-ink)]";
export const muted = "text-[var(--t-muted)]";
export const line = "border-[var(--t-line)]";
export const r = "rounded-[var(--t-r)]";
export const rLg = "rounded-[var(--t-r-lg)]";
export const pill = "rounded-[var(--t-pill)]";
export const h = (px: number) => ({ height: `calc(${px}px * var(--t-d))` });
export const pad = (y: number, x: number) => ({ padding: `calc(${y}px * var(--t-d)) calc(${x}px * var(--t-d))` });
export const monoSm = "font-mono text-[9.5px] tracking-[0.06em]";
export const STATUS = {
  ok: "bg-[var(--t-ok-bg)] text-[var(--t-ok)]",
  wait: "bg-[var(--t-warn-bg)] text-[var(--t-warn)]",
  no: "bg-[var(--t-bad-bg)] text-[var(--t-bad)]",
};
