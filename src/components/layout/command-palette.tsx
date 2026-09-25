"use client";

/**
 * Command palette (⌘K / Ctrl+K). Rendered once in the root layout; any
 * component can open it with `openCommandPalette()`.
 * Styled like the homepage workflow toolbar (dark #141418 chrome).
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/content/site";
import { useSmoothScroll } from "@/components/layout/smooth-scroll";
import { cn } from "@/lib/utils";
import { EXPERIENCES, FONTS, PRESETS, type FontId } from "@/components/design-system/theme-engine";
import { openThemeBuilder } from "./theme-drawer";
import { setSiteTheme } from "@/lib/site-theme";

const OPEN_EVENT = "command-palette:open";

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

interface PaletteProject {
  slug: string;
  title: string;
  industry: string;
}

interface Command {
  id: string;
  group: "Pages" | "Case studies" | "Theme" | "Actions";
  label: string;
  hint?: string;
  run: () => void;
}

export function CommandPalette({ projects }: { projects: PaletteProject[] }) {
  const router = useRouter();
  const { lenis } = useSmoothScroll();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const returnFocus = React.useRef<HTMLElement | null>(null);
  const listId = React.useId();

  const close = React.useCallback(() => setOpen(false), []);

  const commands = React.useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      router.push(href);
      setOpen(false);
    };
    return [
      { id: "home", group: "Pages", label: "Home", hint: "/", run: go("/") },
      ...siteConfig.navItems.map((n) => ({
        id: n.href,
        group: "Pages" as const,
        label: n.label,
        hint: n.href,
        run: go(n.href),
      })),
      { id: "/contact", group: "Pages", label: "Contact", hint: "/contact", run: go("/contact") },
      ...projects.map((p) => ({
        id: `case-${p.slug}`,
        group: "Case studies" as const,
        label: p.title,
        hint: p.industry,
        run: go(`/work/${p.slug}`),
      })),
      {
        id: "theme-dark",
        group: "Theme",
        label: "Switch to dark theme",
        hint: "mode",
        run: () => { setSiteTheme({ mode: "dark" }); setOpen(false); },
      },
      {
        id: "theme-light",
        group: "Theme",
        label: "Switch to light theme",
        hint: "mode",
        run: () => { setSiteTheme({ mode: "light" }); setOpen(false); },
      },
      { id: "theme-builder", group: "Theme", label: "Open theme builder", hint: "drawer", run: () => { setOpen(false); openThemeBuilder(); } },
      ...EXPERIENCES.map((x) => ({
        id: `experience-${x.id}`,
        group: "Theme" as const,
        label: `Experience: ${x.name}`,
        hint: x.note,
        run: () => { setSiteTheme(x.theme); setOpen(false); },
      })),
      ...PRESETS.map((p) => ({
        id: `preset-${p.name}`,
        group: "Theme" as const,
        label: `Colour preset: ${p.name}`,
        hint: p.theme.accent,
        run: () => { setSiteTheme(p.theme); setOpen(false); },
      })),
      ...(Object.keys(FONTS) as FontId[]).map((id) => ({
        id: `font-${id}`,
        group: "Theme" as const,
        label: `Typography: ${FONTS[id].label}`,
        hint: FONTS[id].note,
        run: () => { setSiteTheme({ font: id }); setOpen(false); },
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: siteConfig.email,
        run: () => {
          navigator.clipboard?.writeText(siteConfig.email).then(
            () => {
              setCopied(true);
              window.setTimeout(() => {
                setCopied(false);
                setOpen(false);
              }, 900);
            },
            () => setOpen(false)
          );
        },
      },
      {
        id: "linkedin",
        group: "Actions",
        label: "Open LinkedIn",
        hint: "linkedin.com ↗",
        run: () => {
          window.open(siteConfig.socials.linkedin, "_blank", "noopener");
          setOpen(false);
        },
      },
      {
        id: "github",
        group: "Actions",
        label: "Open GitHub",
        hint: "github.com ↗",
        run: () => {
          window.open(siteConfig.socials.github, "_blank", "noopener");
          setOpen(false);
        },
      },
    ];
  }, [projects, router]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint ?? ""} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  // open via event or ⌘K / Ctrl+K
  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // reset, focus and scroll-lock while open; restore focus on close
  React.useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      lenis?.stop();
      document.body.style.overflow = "hidden";
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      returnFocus.current?.focus?.();
    }
  }, [open, lenis]);

  // keep the active option in view
  React.useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault(); // the input is the only tab stop; the list is driven by arrows
    }
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]">
      <div className="absolute inset-0 bg-[#0a0a0c]/45 backdrop-blur-[3px]" onClick={close} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-[560px] rounded-2xl bg-[#141418] text-[#f3f2ee] shadow-[0_30px_80px_rgba(0,0,0,.45),inset_0_0_0_1px_rgba(255,255,255,.08)] overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 border-b border-white/10">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[#8b8a94] shrink-0" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search pages, case studies, actions…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
            className="flex-1 h-14 bg-transparent outline-none text-[15px] placeholder:text-[#6b6a76]"
          />
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-white/15 text-[#8b8a94]">ESC</kbd>
        </div>

        <ul ref={listRef} id={listId} role="listbox" aria-label="Commands" className="max-h-[52vh] overflow-y-auto p-2" data-lenis-prevent>
          {results.length === 0 && (
            <li className="px-3 py-8 text-center font-mono text-[11px] tracking-[0.08em] uppercase text-[#6b6a76]">
              No matches for “{query}”
            </li>
          )}
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <React.Fragment key={c.id}>
                {header && (
                  <li role="presentation" className="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-[#6b6a76]">
                    {header}
                  </li>
                )}
                <li
                  id={`${listId}-${c.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => c.run()}
                  className={cn(
                    "flex items-center justify-between gap-4 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150",
                    i === active ? "bg-accent text-white" : "text-[#d7d6de]"
                  )}
                >
                  <span className="text-sm truncate">
                    {c.id === "copy-email" && copied ? "Copied ✓" : c.label}
                  </span>
                  {c.hint && (
                    <span className={cn("font-mono text-[10.5px] truncate max-w-[45%]", i === active ? "text-white/75" : "text-[#6b6a76]")}>
                      {c.hint}
                    </span>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/10 font-mono text-[10px] tracking-[0.08em] uppercase text-[#6b6a76]">
          <span><kbd className="text-[#cfcfd6]">↑↓</kbd> navigate</span>
          <span><kbd className="text-[#cfcfd6]">↵</kbd> open</span>
          <span className="ml-auto">{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
