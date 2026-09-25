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
          "fixed top-0 left-0 right-0 z-40 transition-all duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)]",
          isHidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "bg-background/80 backdrop-blur-lg py-4"
            : "bg-transparent py-6"
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
            className="hidden md:flex items-center gap-4 lg:gap-8"
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
                    "relative py-1 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:rounded-full after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] after:origin-left",
                    isActive
                      ? "text-ink after:scale-x-100 after:bg-accent"
                      : "text-muted hover:text-ink after:scale-x-0 hover:after:scale-x-100 after:bg-ink/30"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeBuilderButton />
            <ThemeToggle />
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              aria-keyshortcuts="Meta+K Control+K"
              className="group inline-flex items-center gap-2 text-muted hover:text-ink transition-colors duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" strokeLinecap="round" />
              </svg>
              <span className="hidden xl:inline text-sm font-medium">Search</span>
              <kbd className="hidden lg:inline-flex items-center justify-center font-mono text-[10px] h-5 px-1.5 rounded border border-line/60 text-muted group-hover:border-ink/20 group-hover:text-ink transition-colors">
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
