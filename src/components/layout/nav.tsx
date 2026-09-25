"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { openCommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";
import { ThemeBuilderButton } from "./theme-builder-button";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const { scrollDirection, isScrolled } = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // The homepage is an iframe (public/prototype.html) that scrolls itself, so it
  // reports whether it has scrolled via postMessage.
  const isHome = pathname === "/";
  const [frameScrolled, setFrameScrolled] = React.useState(false);
  React.useEffect(() => {
    if (!isHome) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "proto-scroll") setFrameScrolled(Boolean(e.data.scrolled));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [isHome]);

  // ⌘ on Apple platforms, Ctrl elsewhere (resolved after mount to keep SSR stable)
  const modKey = React.useSyncExternalStore(
    () => () => {},
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"),
    () => "⌘"
  );

  // Transparent at the top of every page; background + border once scrolled.
  const scrolled = isHome ? frameScrolled : isScrolled;
  // The prototype's layout reserves space for the nav, so it stays put on the homepage.
  const isHidden = !isHome && scrollDirection === "down" && isScrolled && !mobileMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 border-b transition-all duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)]",
          isHidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "bg-[#FAFAF7]/90 backdrop-blur-md border-line shadow-xs py-3.5"
            : "bg-transparent border-transparent shadow-none py-5"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-none"
            aria-label="Aditya Tripathi Home"
          >
            <span className="font-semibold text-lg sm:text-xl tracking-tight text-ink whitespace-nowrap transition-colors duration-200 group-hover:text-accent">
              Aditya Tripathi
            </span>
            <span className="hidden xl:inline-block whitespace-nowrap font-mono text-xs text-muted tracking-wider uppercase px-2 py-0.5 rounded-full border border-line bg-white/60">
              {siteConfig.roleTitle}
            </span>
          </Link>

          {/* Desktop Center Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full border border-line/60 bg-white/70 backdrop-blur-xs shadow-xs"
            aria-label="Main Navigation"
          >
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs lg:text-sm font-medium whitespace-nowrap transition-colors duration-200 rounded-full",
                    isActive
                      ? "text-accent font-semibold"
                      : "text-muted hover:text-ink hover:bg-black/5"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-accent rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeBuilderButton />
            <ThemeToggle />
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              aria-keyshortcuts="Meta+K Control+K"
              className="group inline-flex items-center justify-center gap-2 h-9 w-9 lg:w-auto lg:pl-3 lg:pr-1.5 rounded-full border border-line bg-white/70 backdrop-blur-xs text-muted hover:text-ink hover:border-ink/25 transition-colors duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" strokeLinecap="round" />
              </svg>
              <span className="hidden xl:inline text-xs">Search</span>
              <kbd className="hidden lg:inline-block font-mono text-[10px] px-1.5 py-0.5 rounded-full border border-line bg-[#FAFAF7] text-muted group-hover:text-ink transition-colors">
                {modKey} K
              </kbd>
            </button>
            <Button
              href="/contact"
              size="sm"
              variant="primary"
              iconRight={<span aria-hidden="true">→</span>}
            >
              Let&apos;s talk
            </Button>
          </div>

          {/* Mobile: theme + command palette + menu */}
          <ThemeBuilderButton className="md:hidden ml-auto" />
          <ThemeToggle className="md:hidden ml-1" />
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command palette"
            className="md:hidden ml-1 mr-1 p-2 text-ink hover:text-accent rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-ink hover:text-accent rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={siteConfig.navItems}
        currentPath={pathname}
      />
    </>
  );
}
