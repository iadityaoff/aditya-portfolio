/**
 * Theme engine. A handful of decisions — experience, accent, mode,
 * typography, radius, density, motion, texture — compile into:
 *   compile()          component-lab artboard tokens (--t-*)
 *   compileSite()      Next.js page tokens (Tailwind @theme vars + helpers)
 *   compilePrototype() homepage (public/prototype.html) root vars + scroll zones
 * Primitive → semantic → component, same as the real system.
 */

export type Mode = "light" | "dark";
export type Density = "compact" | "default" | "comfortable";
export type Skin = "studio" | "newspaper" | "figma" | "code";
export type FontId = "studio" | "geist" | "inter" | "grotesk" | "jakarta" | "editorial" | "mono";
export type MotionPref = "full" | "reduced";

export interface Theme {
  accent: string; // #rrggbb
  mode: Mode;
  radius: number; // px, 0–24 (component lab)
  density: Density; // component lab
  skin: Skin; // the whole-site "experience"
  font: FontId;
  motion: MotionPref;
  texture: boolean; // film grain
}

export const DEFAULT_THEME: Theme = {
  accent: "#2F4BFF",
  mode: "light",
  radius: 12,
  density: "default",
  skin: "studio",
  font: "studio",
  motion: "full",
  texture: true,
};

/* ---------------- typography ---------------- */

interface FontSet {
  label: string;
  note: string;
  /** [Next.js next/font CSS variable, CSS family name for the homepage] */
  sans: [string, string];
  display: [string, string];
  serif: [string, string];
  mono: [string, string];
  /** display headline tracking (serif/mono faces need looser than the grotesks) */
  tracking: string;
}

const F = {
  interTight: ["--font-inter-tight", '"Inter Tight"'],
  instrument: ["--font-instrument-serif", '"Instrument Serif"'],
  geistMono: ["--font-geist-mono", '"Geist Mono"'],
  geist: ["--font-geist-sans", '"Geist"'],
  inter: ["--font-inter", '"Inter"'],
  grotesk: ["--font-space-grotesk", '"Space Grotesk"'],
  fraunces: ["--font-fraunces", '"Fraunces"'],
  jetbrains: ["--font-jetbrains-mono", '"JetBrains Mono"'],
  jakarta: ["--font-plus-jakarta", '"Plus Jakarta Sans"'],
  newsreader: ["--font-newsreader", '"Newsreader"'],
  playfair: ["--font-playfair", '"Playfair Display"'],
  plexMono: ["--font-ibm-plex-mono", '"IBM Plex Mono"'],
} satisfies Record<string, [string, string]>;

export const FONTS: Record<FontId, FontSet> = {
  studio: { label: "Studio", note: "Inter Tight · Instrument Serif", sans: F.interTight, display: F.interTight, serif: F.instrument, mono: F.geistMono, tracking: "-0.035em" },
  geist: { label: "Geist", note: "Geist · Geist Mono", sans: F.geist, display: F.geist, serif: F.instrument, mono: F.geistMono, tracking: "-0.04em" },
  inter: { label: "Inter", note: "Inter · product UI", sans: F.inter, display: F.inter, serif: F.inter, mono: F.geistMono, tracking: "-0.03em" },
  grotesk: { label: "Grotesk", note: "Space Grotesk · Fraunces", sans: F.grotesk, display: F.grotesk, serif: F.fraunces, mono: F.jetbrains, tracking: "-0.035em" },
  jakarta: { label: "Jakarta", note: "Plus Jakarta Sans", sans: F.jakarta, display: F.jakarta, serif: F.instrument, mono: F.geistMono, tracking: "-0.035em" },
  editorial: { label: "Editorial", note: "Playfair · Newsreader", sans: F.newsreader, display: F.playfair, serif: F.playfair, mono: F.plexMono, tracking: "-0.01em" },
  mono: { label: "Mono", note: "JetBrains Mono", sans: F.jetbrains, display: F.jetbrains, serif: F.jetbrains, mono: F.jetbrains, tracking: "-0.03em" },
};

const FALLBACK = {
  sans: "ui-sans-serif, system-ui, -apple-system, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
};
const isSerifFace = (id: FontId) => id === "editorial";
const isMonoFace = (id: FontId) => id === "mono";

/* ---------------- experiences (skins) ---------------- */

interface Palette {
  bg: string; surface: string; surface2: string; ink: string; muted: string; line: string; dot: string;
  /** the homepage's dark "canvas" sections */
  canvas: { bg: string; panel: string; panel2: string; line: string; ink: string; muted: string; dot: string };
}

const PALETTES: Record<Skin, Record<Mode, Palette>> = {
  studio: {
    light: { bg: "#fafaf7", surface: "#ffffff", surface2: "#f3f2ee", ink: "#0e0e10", muted: "#5f5f68", line: "#e7e5df", dot: "rgba(14,14,16,.09)",
      canvas: { bg: "#0f0f12", panel: "#17171c", panel2: "#1f1f26", line: "#26262d", ink: "#f3f2ee", muted: "#9b9aa4", dot: "rgba(255,255,255,.07)" } },
    dark: { bg: "#0f0f12", surface: "#17171c", surface2: "#1f1f26", ink: "#f3f2ee", muted: "#9b9aa4", line: "#2a2a33", dot: "rgba(255,255,255,.07)",
      canvas: { bg: "#08080a", panel: "#121216", panel2: "#1a1a20", line: "#222228", ink: "#f3f2ee", muted: "#9b9aa4", dot: "rgba(255,255,255,.06)" } },
  },
  newspaper: {
    light: { bg: "#f2ede2", surface: "#f7f3ea", surface2: "#ebe5d7", ink: "#15130f", muted: "#57524a", line: "#cdc5b4", dot: "rgba(21,19,15,.07)",
      canvas: { bg: "#15130f", panel: "#1e1b16", panel2: "#27231d", line: "#3a352c", ink: "#f2ede2", muted: "#b3ab9c", dot: "rgba(242,237,226,.06)" } },
    dark: { bg: "#14120e", surface: "#1c1a15", surface2: "#24211b", ink: "#ece5d6", muted: "#a8a092", line: "#3a352c", dot: "rgba(236,229,214,.06)",
      canvas: { bg: "#0c0b08", panel: "#16140f", panel2: "#1e1b16", line: "#2e2a22", ink: "#ece5d6", muted: "#a8a092", dot: "rgba(236,229,214,.05)" } },
  },
  figma: {
    light: { bg: "#f5f5f5", surface: "#ffffff", surface2: "#f0f0f0", ink: "#1e1e1e", muted: "#6b6b6b", line: "#e3e3e3", dot: "rgba(0,0,0,.13)",
      canvas: { bg: "#2c2c2c", panel: "#383838", panel2: "#444444", line: "#444444", ink: "#ffffff", muted: "#b3b3b3", dot: "rgba(255,255,255,.1)" } },
    dark: { bg: "#1e1e1e", surface: "#2c2c2c", surface2: "#383838", ink: "#ffffff", muted: "#b3b3b3", line: "#444444", dot: "rgba(255,255,255,.1)",
      canvas: { bg: "#141414", panel: "#232323", panel2: "#2c2c2c", line: "#3a3a3a", ink: "#ffffff", muted: "#b3b3b3", dot: "rgba(255,255,255,.08)" } },
  },
  code: {
    light: { bg: "#ffffff", surface: "#f8f8f8", surface2: "#f3f3f3", ink: "#1f1f1f", muted: "#616161", line: "#e5e5e5", dot: "rgba(0,0,0,.06)",
      canvas: { bg: "#1e1e1e", panel: "#252526", panel2: "#2d2d30", line: "#3c3c3c", ink: "#d4d4d4", muted: "#9d9d9d", dot: "rgba(255,255,255,.05)" } },
    dark: { bg: "#1e1e1e", surface: "#252526", surface2: "#2d2d30", ink: "#d4d4d4", muted: "#9d9d9d", line: "#3c3c3c", dot: "rgba(255,255,255,.05)",
      canvas: { bg: "#181818", panel: "#1f1f1f", panel2: "#262626", line: "#333333", ink: "#d4d4d4", muted: "#9a9a9a", dot: "rgba(255,255,255,.04)" } },
  },
};

/** Card radius used by each experience on the homepage + inner pages. */
export const SKIN_RADIUS: Record<Skin, number> = { studio: 18, newspaper: 0, figma: 6, code: 4 };

export interface Experience {
  id: Skin;
  name: string;
  note: string;
  theme: Partial<Theme>;
}

export const EXPERIENCES: Experience[] = [
  { id: "studio", name: "Studio", note: "Editorial canvas, the default", theme: { skin: "studio", font: "studio", accent: "#2F4BFF", mode: "light", radius: 12 } },
  { id: "newspaper", name: "Newspaper", note: "Newsprint, serif, hairline rules", theme: { skin: "newspaper", font: "editorial", accent: "#B3261E", mode: "light", radius: 0 } },
  { id: "figma", name: "Figma", note: "Canvas, frames, selection", theme: { skin: "figma", font: "inter", accent: "#0D99FF", mode: "light", radius: 6 } },
  { id: "code", name: "Code", note: "Editor, mono, syntax", theme: { skin: "code", font: "mono", accent: "#3794FF", mode: "dark", radius: 4 } },
];

export interface Preset {
  name: string;
  theme: Partial<Theme>;
}

/** Colour presets (keep the current experience + typography). */
export const PRESETS: Preset[] = [
  { name: "Cobalt", theme: { accent: "#2F4BFF", mode: "light", radius: 12, density: "default" } },
  { name: "Clinical", theme: { accent: "#0E8A7E", mode: "light", radius: 6, density: "compact" } },
  { name: "Ember", theme: { accent: "#E4572E", mode: "light", radius: 18, density: "comfortable" } },
  { name: "Midnight", theme: { accent: "#8B7BFF", mode: "dark", radius: 12, density: "default" } },
  { name: "Graphite", theme: { accent: "#18181B", mode: "light", radius: 2, density: "compact" } },
  { name: "Lagoon", theme: { accent: "#38BDF8", mode: "dark", radius: 20, density: "comfortable" } },
];

/** "Surprise me": a curated random combination (always readable). */
export function randomTheme(current: Theme): Partial<Theme> {
  const accents = ["#2F4BFF", "#0E8A7E", "#E4572E", "#8B7BFF", "#D6336C", "#F59F00", "#12B886", "#7048E8", "#1C7ED6", "#E8590C"];
  const fonts: FontId[] = ["studio", "geist", "inter", "grotesk", "jakarta", "editorial"];
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
  let accent = pick(accents);
  while (accent === current.accent) accent = pick(accents);
  return {
    accent,
    font: pick(fonts),
    mode: Math.random() < 0.35 ? "dark" : "light",
    radius: pick([0, 4, 8, 12, 18, 24]),
    density: pick<Density>(["compact", "default", "comfortable"]),
  };
}

/* ---------------- colour math ---------------- */

export const isHex = (v: string) => /^#[0-9a-f]{6}$/i.test(v);

const hexToRgb = (h: string) => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgbToHex = (c: number[]) =>
  "#" + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");

/** Mix a toward b; t = weight of b (0–1). */
export const mix = (a: string, b: string, t: number) => {
  const x = hexToRgb(a), y = hexToRgb(b);
  return rgbToHex(x.map((v, i) => v + (y[i] - v) * t));
};

const luminance = (hex: string) => {
  const c = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

export const contrast = (a: string, b: string) => {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

export const rating = (ratio: number) => (ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA Large" : "Fail");

/** Step a colour toward ink/white until it reaches `min` contrast on `bg`. */
export function ensureContrast(fg: string, bg: string, min = 4.5) {
  const towardWhite = luminance(bg) < 0.4;
  let c = fg;
  for (let i = 0; i < 10 && contrast(c, bg) < min; i++) c = mix(c, towardWhite ? "#ffffff" : "#000000", 0.16);
  return c;
}

/* ---------------- accessible accent (the contrast policy) ----------------
 * See themebuilder.md. Every accent a visitor can pick goes through here.
 *
 * Accent as a FILL (buttons, chips, the Contact slab, active steps):
 *   1. White label first. Deepen (or, on dark pages, lift) the fill by the
 *      smallest step that gives white ≥ 4.5:1 — capped at a 22% shift so the
 *      brand hue stays recognisable. Teal/green/orange/violet land here.
 *   2. Genuinely light accents (yellow, sky, lime) keep their colour and take a
 *      near-black label — but only when that label is clearly high-contrast
 *      (≥ 7:1), never a muddy 4.5 on a mid-tone.
 *   3. Otherwise white with a larger shift; last resort, whichever reads best.
 *   On dark pages the fill must also stay visible against the page (≥ 3:1).
 * Hover / pressed fills move away from the label, so they only gain contrast.
 * Accent as TEXT is stepped until it clears 4.5:1 on every surface it sits on.
 */
const WHITE = "#ffffff";
const INK = "#0e0e10";
export const AA = 4.5;
const WHITE_MAX_SHIFT = 0.22;
const INK_MIN = 7;

export interface AccentFill {
  fill: string;
  on: string;
  hover: string;
  press: string;
}

export function accentFill(accent: string, page: string, dark: boolean): AccentFill {
  const cands: { c: string; shift: number }[] = [{ c: accent, shift: 0 }];
  for (let i = 1; i <= 30; i++) {
    const s = i * 0.02;
    cands.push({ c: mix(accent, "#000000", s), shift: s }, { c: mix(accent, "#ffffff", s), shift: s });
  }
  cands.sort((a, b) => a.shift - b.shift);
  const visible = (c: string) => !dark || contrast(c, page) >= 3;
  const pick = (on: string, min: number, maxShift: number) =>
    cands.find((x) => x.shift <= maxShift && contrast(x.c, on) >= min && visible(x.c));
  const white = pick(WHITE, AA, WHITE_MAX_SHIFT);
  const ink = !white ? pick(INK, INK_MIN, 0.12) : undefined;
  const chosen =
    (white && { c: white.c, on: WHITE }) ||
    (ink && { c: ink.c, on: INK }) ||
    ((w) => w && { c: w.c, on: WHITE })(pick(WHITE, AA, 0.6)) ||
    ((k) => k && { c: k.c, on: INK })(pick(INK, AA, 0.6)) ||
    { c: accent, on: contrast(accent, WHITE) >= contrast(accent, INK) ? WHITE : INK };
  // interaction states move *away* from the label colour, so contrast only rises
  const away = chosen.on === WHITE ? "#000000" : "#ffffff";
  return { fill: chosen.c, on: chosen.on, hover: mix(chosen.c, away, 0.12), press: mix(chosen.c, away, 0.2) };
}

/** Accent as text: stepped until it clears `min` on every listed surface. */
export function accentText(accent: string, surfaces: string[], min = AA) {
  const dark = luminance(surfaces[0]) < 0.4;
  let c = accent;
  for (let i = 0; i < 16 && surfaces.some((b) => contrast(c, b) < min); i++) c = mix(c, dark ? "#ffffff" : "#000000", 0.1);
  return c;
}

/** A tint of `fg` toward `bg` that still reads at `min` on `bg` (for secondary text on fills). */
function readableTint(fg: string, bg: string, weight: number, min = AA) {
  for (let w = weight; w > 0; w -= 0.04) {
    const c = mix(fg, bg, w);
    if (contrast(c, bg) >= min) return c;
  }
  return fg;
}

const rgba = (hex: string, a: number) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
};

/** Tonal ramp 50–900 generated from the accent (primitive layer). */
export function scale(accent: string) {
  const steps: [string, string][] = [
    ["50", mix(accent, "#ffffff", 0.92)],
    ["100", mix(accent, "#ffffff", 0.82)],
    ["200", mix(accent, "#ffffff", 0.64)],
    ["300", mix(accent, "#ffffff", 0.44)],
    ["400", mix(accent, "#ffffff", 0.22)],
    ["500", accent],
    ["600", mix(accent, "#000000", 0.16)],
    ["700", mix(accent, "#000000", 0.32)],
    ["800", mix(accent, "#000000", 0.48)],
    ["900", mix(accent, "#000000", 0.62)],
  ];
  return steps;
}

const palette = (t: Theme) => PALETTES[t.skin]?.[t.mode] ?? PALETTES.studio[t.mode];
const DENSITY = { compact: 0.86, default: 1, comfortable: 1.14 } as const;

/* ---------------- component-lab artboard ---------------- */

export function compile(t: Theme) {
  const p = palette(t);
  const dark = t.mode === "dark";
  const surface = p.surface;
  const a = accentFill(t.accent, surface, dark);
  const subtle = mix(a.fill, surface, dark ? 0.8 : 0.88);
  const text = accentText(dark ? mix(a.fill, "#ffffff", 0.3) : a.fill, [surface, p.surface2, subtle]);

  return {
    "--t-accent": a.fill,
    "--t-accent-hover": a.hover,
    "--t-on-accent": a.on,
    "--t-accent-subtle": subtle,
    "--t-accent-text": text,
    "--t-canvas": dark ? p.bg : mix(p.bg, "#000000", 0.025),
    "--t-surface": surface,
    "--t-surface-2": p.surface2,
    "--t-ink": p.ink,
    "--t-muted": p.muted,
    "--t-line": p.line,
    "--t-dot": p.dot,
    "--t-ok-bg": dark ? "rgba(111,227,161,.14)" : "#e3f5ea",
    "--t-ok": dark ? "#6fe3a1" : "#0d7a3c",
    "--t-warn-bg": dark ? "rgba(255,203,107,.14)" : "#fdf1dc",
    "--t-warn": dark ? "#ffcb6b" : "#9a5d00",
    "--t-bad-bg": dark ? "rgba(255,107,107,.14)" : "#fde6e7",
    "--t-bad": dark ? "#ff8a8a" : "#b3261e",
    "--t-r": `${t.radius}px`,
    "--t-r-lg": `${Math.min(28, t.radius + 6)}px`,
    "--t-pill": t.radius >= 14 ? "999px" : `${t.radius}px`,
    "--t-d": String(DENSITY[t.density]),
  } as Record<string, string>;
}

/** CSS a developer could paste (semantic names). */
export function exportCss(t: Theme) {
  const v = compile(t);
  const f = FONTS[t.font] ?? FONTS.studio;
  return [
    `/* ${EXPERIENCES.find((e) => e.id === t.skin)?.name ?? "Studio"} · ${t.mode} · ${f.label} */`,
    `:root[data-theme="${t.mode}"] {`,
    `  --color-action: ${v["--t-accent"]};`,
    `  --color-action-hover: ${v["--t-accent-hover"]};`,
    `  --color-on-action: ${v["--t-on-accent"]};`,
    `  --color-action-subtle: ${v["--t-accent-subtle"]};`,
    `  --color-surface: ${v["--t-surface"]};`,
    `  --color-text: ${v["--t-ink"]};`,
    `  --color-border: ${v["--t-line"]};`,
    `  --font-body: ${f.sans[1]};`,
    `  --font-display: ${f.display[1]};`,
    `  --font-mono: ${f.mono[1]};`,
    `  --radius-control: ${v["--t-r"]};`,
    `  --density-scale: ${v["--t-d"]};`,
    `}`,
  ].join("\n");
}

/* ---------------- whole site (Next.js pages) ---------------- */

const stack = (face: [string, string], kind: "sans" | "serif" | "mono") => `var(${face[0]}), ${FALLBACK[kind]}`;

export function compileSite(t: Theme) {
  const p = palette(t);
  const dark = t.mode === "dark";
  const f = FONTS[t.font] ?? FONTS.studio;
  const a = accentFill(t.accent, p.bg, dark);
  const subtle = mix(a.fill, p.bg, dark ? 0.82 : 0.9);
  // badges (bg-accent/10) and chips sit on a ~10% tint of the fill over the page/card
  const tintOnBg = mix(a.fill, p.bg, 0.9), tintOnSurface = mix(a.fill, p.surface, 0.9);
  const text = accentText(a.fill, [p.bg, p.surface, p.surface2, subtle, tintOnBg, tintOnSurface]);
  // accent text inside the dark showcase panels (CTA etc.), whatever the page mode
  const textOnDark = accentText(mix(a.fill, "#ffffff", 0.35), [p.canvas.bg, p.canvas.panel, p.canvas.panel2]);
  return {
    "--color-background": p.bg,
    "--color-ink": p.ink,
    "--color-muted": p.muted,
    "--color-line": p.line,
    "--color-accent": a.fill,
    "--color-accent-hover": a.hover,
    "--color-accent-press": a.press,
    "--color-accent-subtle": subtle,
    "--color-accent-text": text,
    "--color-accent-on-dark": textOnDark,
    "--color-on-accent": a.on,
    "--color-showcase": p.canvas.bg,
    "--color-showcase-card": p.canvas.panel,
    "--color-showcase-border": p.canvas.line,
    "--background": p.bg,
    "--foreground": p.ink,
    "--accent": a.fill,
    "--surface": p.surface,
    "--surface-2": p.surface2,
    "--dot": p.dot,
    "--font-sans": stack(f.sans, isSerifFace(t.font) ? "serif" : isMonoFace(t.font) ? "mono" : "sans"),
    "--font-display": stack(f.display, isSerifFace(t.font) ? "serif" : isMonoFace(t.font) ? "mono" : "sans"),
    "--font-serif": stack(f.serif, isMonoFace(t.font) ? "mono" : t.font === "inter" ? "sans" : "serif"),
    "--font-mono": stack(f.mono, "mono"),
    "--display-tracking": f.tracking,
  } as Record<string, string>;
}

/* ---------------- homepage prototype ---------------- */

type Zone = Record<"--bg" | "--fg" | "--fg2" | "--rule" | "--panel" | "--panel2" | "--dot", string>;

/** Accent-tinted zones: step secondary text until it reads on the zone and its panels. */
const withReadableFg2 = (z: Zone): Zone => ({ ...z, "--fg2": accentText(z["--fg2"], [z["--bg"], z["--panel"], z["--panel2"]]) });

export function compilePrototype(t: Theme) {
  const p = palette(t);
  const dark = t.mode === "dark";
  const f = FONTS[t.font] ?? FONTS.studio;
  const af = accentFill(t.accent, p.bg, dark);
  const a = af.fill;
  const on = af.on;
  // print and editor skins keep "blueprint" sections neutral; the others tint them with the accent
  const tint = t.skin === "studio" || t.skin === "figma";
  const zones: Record<"paper" | "canvas" | "blueprint" | "accent", Zone> = {
    paper: { "--bg": p.bg, "--fg": p.ink, "--fg2": p.muted, "--rule": p.line, "--panel": p.surface, "--panel2": p.surface2, "--dot": p.dot },
    canvas: { "--bg": p.canvas.bg, "--fg": p.canvas.ink, "--fg2": p.canvas.muted, "--rule": p.canvas.line, "--panel": p.canvas.panel, "--panel2": p.canvas.panel2, "--dot": p.canvas.dot },
    blueprint: tint
      ? withReadableFg2(dark
        ? { "--bg": mix(a, p.bg, 0.88), "--fg": p.ink, "--fg2": mix(a, "#c9cbd6", 0.7), "--rule": mix(a, p.bg, 0.72), "--panel": mix(a, p.surface, 0.9), "--panel2": mix(a, p.surface2, 0.86), "--dot": rgba(a, 0.16) }
        : { "--bg": mix(a, "#ffffff", 0.91), "--fg": p.ink, "--fg2": mix(a, "#525874", 0.8), "--rule": mix(a, "#ffffff", 0.8), "--panel": "#ffffff", "--panel2": mix(a, "#ffffff", 0.95), "--dot": rgba(a, 0.12) })
      : { "--bg": p.surface2, "--fg": p.ink, "--fg2": p.muted, "--rule": p.line, "--panel": p.surface, "--panel2": p.bg, "--dot": p.dot },
    accent: {
      "--bg": a, "--fg": on, "--fg2": readableTint(on, a, 0.22), "--rule": rgba(on, 0.22),
      "--panel": mix(a, "#000000", 0.12), "--panel2": mix(a, "#000000", 0.2), "--dot": rgba(on, 0.12),
    },
  };
  const serifKind = isMonoFace(t.font) ? FALLBACK.mono : t.font === "inter" ? FALLBACK.sans : FALLBACK.serif;
  const bodyKind = isSerifFace(t.font) ? FALLBACK.serif : isMonoFace(t.font) ? FALLBACK.mono : FALLBACK.sans;
  const accent100 = mix(a, dark ? p.surface : "#ffffff", dark ? 0.8 : 0.86);
  const bp = zones.blueprint;
  const root = {
    "--accent": a,
    "--accent-600": af.hover,
    "--accent-100": accent100,
    // accent as text on the themed page, cards, tints and blueprint sections
    "--accent-ink": accentText(a, [p.bg, p.surface, p.surface2, accent100, bp["--bg"], bp["--panel"], bp["--panel2"]]),
    // accent as text on the always-light product mocks / frames (device, library, case frames)
    "--accent-onlight": accentText(a, ["#ffffff", "#fafaf7", "#f6f6f3", mix(a, "#ffffff", 0.86)]),
    "--accent-tint-light": mix(a, "#ffffff", 0.86),
    // accent as text on dark canvas sections
    "--accent-dk": accentText(mix(a, "#ffffff", 0.45), [p.canvas.bg, p.canvas.panel, p.canvas.panel2]),
    "--on-accent": on,
    "--hl": a,
    "--hl-text": accentText(a, [p.bg]),
    "--sans": `${f.sans[1]}, ${bodyKind}`,
    "--display": `${f.display[1]}, ${isSerifFace(t.font) ? FALLBACK.serif : bodyKind}`,
    "--serif": `${f.serif[1]}, ${serifKind}`,
    "--mono": `${f.mono[1]}, ${FALLBACK.mono}`,
    "--display-tracking": f.tracking,
    "--radius": `${SKIN_RADIUS[t.skin]}px`,
  };
  return { mode: t.mode, skin: t.skin, motion: t.motion, texture: t.texture, root, zones };
}
