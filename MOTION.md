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
