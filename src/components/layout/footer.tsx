"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { CopyEmail } from "@/components/ui/copy-email";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/components/layout/smooth-scroll";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const { lenis } = useSmoothScroll();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-ink text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <footer className="w-full bg-[#FAFAF7] border-t border-line pt-20 pb-12 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large closing statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-line">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
              Ready to collaborate
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink leading-tight">
              Designing clarity for complex SaaS products.
            </h2>
            <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
              Available for design systems, enterprise workflow simplification, and high-stakes product design engagements.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <CopyEmail email={siteConfig.email} />
              <Button href="/contact" variant="primary" size="md">
                Get in touch →
              </Button>
            </div>
          </div>

          {/* Navigation & Profiles Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted font-semibold mb-4">
                Pages
              </p>
              <ul className="space-y-2.5 text-sm">
                {siteConfig.navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ink hover:text-accent transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="text-ink hover:text-accent transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted hover:text-ink transition-colors duration-200 text-xs"
                  >
                    Privacy Notice
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted font-semibold mb-4">
                Profiles & Artifacts
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors duration-200"
                  >
                    LinkedIn
                    <span className="text-xs text-muted" aria-hidden="true">↗</span>
                  </a>
                </li>
                {siteConfig.socials.github && (
                  <li>
                    <a
                      href={siteConfig.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors duration-200"
                    >
                      GitHub
                      <span className="text-xs text-muted" aria-hidden="true">↗</span>
                    </a>
                  </li>
                )}
                <li className="pt-2">
                  <Link
                    href="/resume"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-accent font-semibold hover:underline"
                  >
                    Download Resume (PDF) ↓
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom meta row: location, availability, copyright, back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>{siteConfig.location}</span>
            <span className="inline-flex items-center gap-1.5 text-ink">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {siteConfig.availability}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {currentYear} {siteConfig.name}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-ink transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label="Back to top of page"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
