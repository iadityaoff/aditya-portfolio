/**
 * Contrast matrix for the Theme Builder (see themebuilder.md).
 * Every colour preset + experience accent + stress accents × 4 experiences × 2 modes.
 * Checks fills + labels + hover/press, accent text on every surface, body/secondary text on every panel,
 * for the Next.js pages, the homepage prototype and the component-lab artboard.
 *   npm run contrast        → exits 1 on any failure
 */
import { compile, compilePrototype, compileSite, contrast, mix, DEFAULT_THEME, EXPERIENCES, PRESETS, type Mode, type Skin } from "../src/components/design-system/theme-engine.ts";

const STRESS = ["#FFD400", "#A3E635", "#38BDF8", "#F472B6", "#FB923C", "#F5F5F5", "#111111", "#7C3AED"];
const accents: [string, string][] = [
  ...PRESETS.map((p) => [p.name, p.theme.accent!] as [string, string]),
  ...EXPERIENCES.map((x) => [`exp:${x.name}`, x.theme.accent!] as [string, string]),
  ...STRESS.map((a) => ["stress", a] as [string, string]),
];
const fails: string[] = [];
let checks = 0;
const chk = (ctx: string, fgName: string, fg: string, bgName: string, bg: string, min = 4.5) => {
  checks++;
  const c = contrast(fg, bg);
  if (c < min) fails.push(`${ctx} | ${fgName} ${fg} on ${bgName} ${bg} = ${c.toFixed(2)} (< ${min})`);
};
const hex = (v: string) => (/^#[0-9a-f]{6}$/i.test(v) ? v : null);

for (const skin of ["studio", "newspaper", "figma", "code"] as Skin[])
  for (const mode of ["light", "dark"] as Mode[])
    for (const [name, accent] of accents) {
      const t = { ...DEFAULT_THEME, skin, mode, accent };
      const ctx = `${skin}/${mode}/${name}(${accent})`;
      // Next.js pages
      const s = compileSite(t);
      for (const k of ["--color-accent", "--color-accent-hover", "--color-accent-press"]) chk(ctx, "on-accent", s["--color-on-accent"], k, s[k]);
      const surfaces: [string, string][] = [
        ["bg", s["--color-background"]], ["surface", s["--surface"]], ["surface-2", s["--surface-2"]], ["subtle", s["--color-accent-subtle"]],
        ["tint10/bg", mix(s["--color-accent"], s["--color-background"], 0.9)], ["tint10/surface", mix(s["--color-accent"], s["--surface"], 0.9)],
      ];
      for (const [bn, bv] of surfaces) chk(ctx, "accent-text", s["--color-accent-text"], bn, bv);
      for (const [bn, bv] of [["bg", s["--color-background"]], ["surface", s["--surface"]], ["surface-2", s["--surface-2"]]]) {
        chk(ctx, "ink", s["--color-ink"], bn, bv);
        chk(ctx, "muted", s["--color-muted"], bn, bv);
      }
      for (const [bn, bv] of [["showcase", s["--color-showcase"]], ["showcase-card", s["--color-showcase-card"]]]) chk(ctx, "accent-on-dark", s["--color-accent-on-dark"], bn, bv);
      if (mode === "dark") chk(ctx, "fill (non-text)", s["--color-accent"], "bg", s["--color-background"], 3);
      // homepage prototype
      const p = compilePrototype(t);
      const r = p.root as Record<string, string>, z = p.zones;
      for (const k of ["--accent", "--accent-600"]) chk(`${ctx} proto`, "on-accent", r["--on-accent"], k, r[k]);
      chk(`${ctx} proto`, "fg", z.accent["--fg"], "accent zone", z.accent["--bg"]);
      chk(`${ctx} proto`, "fg2", z.accent["--fg2"], "accent zone", z.accent["--bg"]);
      for (const zn of ["paper", "blueprint", "canvas"] as const)
        for (const bk of ["--bg", "--panel", "--panel2"] as const) {
          const bv = hex(z[zn][bk]);
          if (!bv) continue;
          chk(`${ctx} proto`, `${zn} fg`, z[zn]["--fg"], `${zn}${bk}`, bv);
          chk(`${ctx} proto`, `${zn} fg2`, z[zn]["--fg2"], `${zn}${bk}`, bv);
          chk(`${ctx} proto`, zn === "canvas" ? "accent-dk" : "accent-ink", zn === "canvas" ? r["--accent-dk"] : r["--accent-ink"], `${zn}${bk}`, bv);
        }
      chk(`${ctx} proto`, "accent-ink", r["--accent-ink"], "accent-100", r["--accent-100"]);
      for (const bv of ["#ffffff", "#fafaf7", "#f6f6f3", r["--accent-tint-light"]]) chk(`${ctx} proto`, "accent-onlight", r["--accent-onlight"], "light mock", bv);
      // component-lab artboard
      const l = compile(t);
      for (const k of ["--t-accent", "--t-accent-hover"]) chk(`${ctx} lab`, "t-on-accent", l["--t-on-accent"], k, l[k]);
      for (const k of ["--t-surface", "--t-surface-2", "--t-accent-subtle"]) chk(`${ctx} lab`, "t-accent-text", l["--t-accent-text"], k, l[k]);
      for (const k of ["--t-surface", "--t-surface-2"]) { chk(`${ctx} lab`, "t-ink", l["--t-ink"], k, l[k]); chk(`${ctx} lab`, "t-muted", l["--t-muted"], k, l[k]); }
    }

const combos = 4 * 2 * accents.length;
if (fails.length) {
  console.error(`✗ ${fails.length} contrast failures in ${checks} checks (${combos} themes)\n` + fails.slice(0, 60).join("\n"));
  process.exit(1);
}
console.log(`✓ ${checks} contrast checks passed across ${combos} themes (${accents.length} accents × 4 experiences × 2 modes)`);
