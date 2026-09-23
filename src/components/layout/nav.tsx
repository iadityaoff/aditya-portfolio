"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
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

  const isHidden = scrollDirection === "down" && isScrolled && !mobileMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out",
          isHidden ? "-translate-y-full" : "translate-y-0",
          isScrolled
            ? "bg-[#FAFAF7]/90 backdrop-blur-md border-b border-line shadow-xs py-3.5"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-none"
            aria-label="Aditya Tripathi Home"
          >
            <span className="font-semibold text-lg sm:text-xl tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
              Aditya Tripathi
            </span>
            <span className="hidden md:inline-block font-mono text-xs text-muted tracking-wider uppercase px-2 py-0.5 rounded-full border border-line bg-white/60">
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
                    "relative px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-200 rounded-full",
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
            <Button
              href="/contact"
              size="sm"
              variant="primary"
              iconRight={<span aria-hidden="true">→</span>}
            >
              Let&apos;s talk
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
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
