# Theme Builder — contrast guideline

**Rule: every foreground/background pair must stay accessible in every theme.** That means primary/accent colours, hover · active · pressed · selected states, buttons, badges, chips, links and labels, across all colour presets, all four experiences (Studio · Newspaper · Figma · Code) and both modes.

- Text: **≥ 4.5:1** (WCAG 2.2 AA). Large text (≥ 24px, or ≥ 18.66px bold) may go to 3:1, but aim for 4.5.
- Non-text UI (button edges on dark pages, focus rings, active indicators): **≥ 3:1**.
- Disabled controls and pure decoration are exempt. Say so in a comment.

## How the engine enforces it (`src/components/design-system/theme-engine.ts`)

**Accent as a fill** (buttons, chips, active steps, the Contact slab): `accentFill()`

1. **White label first.** Deepen the fill by the smallest step (≤ 22%) that gives white ≥ 4.5:1. Teal, green, orange and violet land here: a slightly deeper shade of the brand colour, never black text on a mid-tone.
2. **Only genuinely light accents** (yellow, sky, lime) keep their colour and take near-black text, and only when that text is clearly high-contrast (**≥ 7:1**). A marginal 4.5 on a mid-tone reads muddy and is not allowed.
3. On dark pages the fill must also stay visible against the page (≥ 3:1).
4. Hover and pressed fills move *away* from the label colour, so they only gain contrast.

**Accent as text** is its own token, stepped until it clears 4.5:1 on every surface it sits on. Never use the fill colour as text.

## Which token to use

| Where | Next.js pages | Homepage (`public/prototype.html`) |
|---|---|---|
| Accent fill + its label | `bg-accent` + `text-white` (auto → `--color-on-accent`) | `var(--accent)` + `var(--on-accent)` |
| Hover / pressed fill | `hover:bg-accent-hover`, `--color-accent-press` | `var(--accent-600)` |
| Accent text on page, cards, tints, badges | `text-accent` (auto → `--color-accent-text`) | `var(--accent-ink)` |
| Accent text on dark panels | inside `.bg-showcase` (auto → `--color-accent-on-dark`) | `var(--accent-dk)` |
| Accent text inside always-light product mocks | n/a | `var(--accent-onlight)` on `var(--accent-tint-light)` |

## Checklist for anything new

1. Never put `color: var(--accent)` / a raw accent hex on text. Use a text token from the table.
2. Never hard-code `#fff` / `#000` on an accent fill. Use the on-accent token.
3. Fixed colours (status greens/reds/ambers, mock screens) must pass on their own: check with white **and** with the dark-mode surface.
4. New presets or palettes: run **`npm run contrast`** (every preset + stress accents × experience × mode, ~9,000 checks) and ship only at **0 failures**. It checks fills, labels, hover/press, accent text on every surface, and body/secondary text on every panel. Source: `scripts/contrast-matrix.mts`.
5. Check both modes and all four experiences in the browser, including hover and selected states.
