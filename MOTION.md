# Motion & Scroll Architecture

This portfolio uses a dual-layer approach to scroll and motion, separating physical scroll feel (Lenis) from visual transformations (Motion).

## The Dual-Layer System

### Layer 01: Lenis (Scroll Physics)
- **Role**: Replaces the browser's native scroll behavior with a physics-based, lerped scrolling experience.
- **Provider**: `<SmoothScroll>` (`src/components/layout/smooth-scroll.tsx`)
- **Tuning**: Tuned for an editorial "controlled glide" (`lerp: 0.1`, `duration: 1.2`). 
- **Touch**: Mobile touch inertia is preserved (`smoothTouch: false`) to maintain native OS feel and save battery.
- **Initialization**: Uses `useSyncExternalStore` to cleanly initialize and provide the Lenis instance across the app, safely bypassing React 18/19 Strict Mode double-invocation issues without triggering "setState in effect" lint errors.

### Layer 02: Motion (Visual Transformations)
- **Role**: Drives visual changes (fade, scale, translate) based on the user's scroll progress.
- **Provider**: `motion/react` (Framer Motion v13+)
- **Implementation**: We map Lenis's smooth scroll position into Motion's `useScroll` and `useTransform` hooks. Because Lenis updates the native scroll position smoothly, Framer Motion automatically reads the smoothed values.

## Scroll-Driven Experiences

Instead of relying on timers or intersection observers, we map visual state directly to scroll progress using custom hooks:

1. **`useSectionProgress`**: Measures an element's progress through the viewport.
2. **`useStickyProgress`**: Measures a sticky container's progress (used for pinned storytelling).

### Key Components

- **`ScrollReveal`**: A reusable wrapper (`src/components/shared/scroll-reveal.tsx`) that creates a staggered fade-up entry animation when an element enters the viewport. Used to wrap section content on the homepage and decision cards in case studies.
- **S1 Hero (`s1-hero.tsx`)**: Implements "Scroll Handoff". As the user scrolls down, the hero text fades and translates up, while the product visual scales slightly to gain emphasis before transitioning to the next section.
- **S4 Design System (`s4-featured-design-system.tsx`)**: Uses section scroll progress to step through the 6-stage component pipeline, replacing the previous timer-based auto-play.
- **S8 AI Workflow (`s8-ai-workflow.tsx`)**: Uses scroll progress to drive the active stage of the pipeline while the section is centered in the viewport.
- **Evidence Chain (`evidence-chain.tsx`)**: Inside case studies, the 4-stage traceability chain reveals progressively (Problem → Decision → Implementation → Outcome) as the user scrolls through the decision card.

## Important Rules & Gotchas

### 1. CSS Scroll Behavior
Do **not** use `scroll-behavior: smooth` in CSS (e.g., on the `<html>` tag). If native smooth scrolling is active alongside Lenis, they will fight and cause "double-smoothing" or severe jitter. 

### 2. Overlays & Modals
When opening an overlay (like the Mobile Menu or Lightbox), setting `document.body.style.overflow = "hidden"` is not enough to stop Lenis. You must pause Lenis explicitly:
```tsx
const { lenis } = useSmoothScroll();
// Pause: lenis?.stop()
// Resume: lenis?.start()
```

### 3. Programmatic Scrolling
Do not use native `element.scrollIntoView({ behavior: "smooth" })` or `window.scrollTo()`. Use the Lenis instance provided by context:
```tsx
const { lenis } = useSmoothScroll();
if (lenis) {
  lenis.scrollTo(targetElement, { offset: -100 });
}
```

### 4. Reduced Motion
All motion respects the user's OS-level accessibility settings (`prefers-reduced-motion`). 
- Lenis automatically disables interpolation (snaps to scroll).
- Motion effects bypass `useTransform` and fallback to static/visible states.
- The Design System and AI Workflow fallback to their original timer-based auto-play behaviors.

### 5. Debug Kill-Switch
If you need to isolate scroll bugs, you can disable Lenis entirely:
- Add `?scroll=native` to the URL.
- Set `NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL=true` in `.env`.

---

## Homepage prototype (`public/prototype.html`)

The `/` route renders `public/prototype.html` in an iframe (`src/components/home/prototype-home.tsx`). It runs its own GSAP + ScrollTrigger + Lenis stack, independent of the React layers above.

### Rhythm
| Level | Use | Timing |
|---|---|---|
| Micro | hover, press, focus, component state | 0.3–0.45s (`--t-micro`, `--t-ui`) |
| Reveal | section / content entrance | 0.85–0.9s (`--t-scene`, `M.reveal`) |
| Story | pinned sequences | 2–4 viewports |
| Cinema | camera / build sequences | ≤ 5 viewports |

Pinned lengths live in one place: `VH = { studio:5, stats:3, work:5, system:3.5 }` (Process is sized to its track, min 2vh).

### Rules
- **Scroll-linked state is a pure function of scroll position.** Stats transforms, counts and mini-charts, theme colours, design-system steps and About highlights are all computed from progress, so reverse scrolling replays the scene exactly. Don't add one-shot `onEnter` state for anything scroll-linked.
- **Theme** is blended per zone boundary (`BLEND` ranges). Surfaces interpolate across the whole range; text tokens (`--fg`, `--fg2`) flip in a narrow window around the midpoint to keep contrast. Sections with `.local` paint their own background (Work, Voices, Contact).
- **Stats spacing:** cards sit on one row with a fixed 48px gap between *scaled* edges; the final grid is the untransformed layout, and the assemble phase interpolates linearly between the two, so cards can't overlap.
- **Zoom readout** (`setZoom`) is owned only by the camera moments: Studio hero-out, Work, Final. The HUD flashes; the toolbar keeps the value.
- **Gating:** `html.motion` (no reduced-motion) enables scroll motion; `html.cine` (≥900px + hover) enables pins. Touch/small screens get plain layouts with reversible fills; reduced motion gets finished static states.
- **Debugging in a hidden tab:** scroll events and rAF don't fire, so dispatch `scroll` and call `ScrollTrigger.update()` manually; scrubbed tweens won't advance without frames.

---

## Studio motion kit (inner pages)

`src/components/motion/studio.tsx` brings the homepage language to the Next.js pages. Timing matches the prototype (micro 0.3–0.45s, reveal 0.9s expo-out, scene 1.1s expo-in-out); everything is static under reduced motion.

| Component | Use |
|---|---|
| `FrameHeading` | Page `h1`: selection box drags open with handles and a live W × H label, headline revealed inside. Leave ~24px below it for the label (`pt-6` on the next element). |
| `Reveal` / `Stagger` + `StaggerItem` | Entrances, once. `Reveal section="Label"` also registers a toolbar step. |
| `FigmaFrame` | Frame name above a card, selection box + handles on hover/focus. |
| `FocusGroup` | One item dominant: siblings dim while another is nearest the viewport centre (≥1024px). |
| `DotGrid` | Canvas dot texture behind a hero (parent needs `relative isolate`). |
| `PageToolbar` | Bottom workflow toolbar; reads `[data-section]` elements (ignores hidden subtrees, re-scans late mounts), hides when the footer arrives. |

- **Header:** transparent at the top of every page; background + border after scroll. The homepage iframe posts `{ type: "proto-scroll", scrolled }` to the parent.
- **Case studies:** `CaseCoverBuild` runs Wireframe → Components → UI → Prototype → Outcome on the project's cover, using its own data for captions. Desktop (≥1024px wide, ≥700px tall) with motion only; otherwise `CaseHero` shows the static cover.
- **Resume:** no reveals inside the printable article — unrevealed content would print blank.

### Command palette
`src/components/layout/command-palette.tsx`, mounted once in the root layout. Opens with ⌘K / Ctrl+K, the header's search button (`openCommandPalette()` → `cmdk:open` event), or from inside the homepage iframe (`proto-cmdk` message). Lists pages, case studies (titles only are passed from the layout), sections on the current page (`[data-section]`, or the prototype's fixed list on `/`), and actions (copy email, LinkedIn, GitHub, layout grid, back to top). On `/` it drives the prototype with `proto-goto` and `proto-grid` messages. Smooth scroll pauses while it's open, and focus returns to where it was (including the iframe) on close.

---

## Site theme (ThemeBuilder → whole portfolio)

The builder on `/design-system` themes every page. Accent + mode are site-wide; radius + density apply to the component artboard only.

- **Compile once:** `theme-engine.ts` → `compileSite()` (Tailwind tokens for the Next pages) and `compilePrototype()` (root accent vars + the four scroll zones for `public/prototype.html`). Contrast is enforced there: `--color-accent-text` is stepped until it passes 4.5:1, `--color-on-accent` picks white or ink.
- **Store:** `src/lib/site-theme.ts` saves `{ theme, site, proto }` to `localStorage["at-site-theme"]`. `SITE_THEME_BOOT` (in `site-theme-boot.ts`, server-safe) applies `site` in `<head>` before first paint; the prototype applies `proto` in its own head script and re-themes live on the `storage` event.
- **Dark mode on inner pages:** `globals.css` maps fixed light surfaces (`bg-white`, `bg-[#FAFAF7]`…) to `--surface` / `--surface-2` under `html[data-theme="dark"]`. New components should prefer `bg-(--surface)` / theme tokens over literal whites.
- **Controls:** builder on `/design-system`, the same builder as a drawer on every page (`theme-drawer.tsx`, nav palette button), nav sun/moon toggle (`theme-toggle.tsx`), and ⌘K "Theme" commands.

### Theme dimensions
| Option | Values | Where it lands |
|---|---|---|
| Experience (`skin`) | studio · newspaper · figma · code | `html[data-skin]` → skin CSS in `globals.css` and `prototype.html` §15, plus a palette per skin × mode in `theme-engine.ts` |
| Typography (`font`) | studio · geist · inter · grotesk · jakarta · editorial · mono | `--font-sans/-display/-serif/-mono` (Next, next/font with `preload:false`) and `--sans/--display/--serif/--mono` (homepage, Google Fonts). Headline tracking scales from `--display-tracking`. |
| Accent / mode | any hex · light, dark | as above |
| Motion | full · reduced | `html[data-motion]`; `SiteMotion` sets `MotionConfig reducedMotion="always"`; use `useReducedMotionConfig()` (not `useReducedMotion`) and the `reduced:` variant. The homepage reloads on change (pinning is set up at boot). |
| Texture | on · off | `html[data-texture]` toggles the film grain |
| Radius / density | 0–24 · compact…roomy | component-lab artboard only |

New fonts: add the `next/font` instance in `layout.tsx` (literal options only, no spreads), the family to the homepage's Google Fonts link, and an entry in `FONTS`.
