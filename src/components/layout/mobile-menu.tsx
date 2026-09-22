"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  currentPath,
}: MobileMenuProps) {
  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-[#FAFAF7] flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200"
    >
      {/* Top bar with close button */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <Link
          href="/"
          onClick={onClose}
          className="font-semibold text-xl tracking-tight text-ink"
        >
          {siteConfig.name}
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-ink hover:text-accent rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Large Navigation Links */}
      <nav className="flex flex-col gap-4 py-8" aria-label="Mobile Navigation">
        {navItems.map((item, index) => {
          const isActive =
            item.href === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "text-3xl sm:text-4xl font-semibold tracking-tight transition-colors py-2 flex items-center justify-between",
                isActive ? "text-accent" : "text-ink hover:text-accent"
              )}
            >
              <span>{item.label}</span>
              <span className="font-mono text-xs text-muted">0{index + 1}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA and contact info */}
      <div className="border-t border-line pt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs text-muted font-mono">
          <span>{siteConfig.location}</span>
          <span className="flex items-center gap-1.5 text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {siteConfig.availability}
          </span>
        </div>

        <Button
          href="/contact"
          size="lg"
          variant="primary"
          className="w-full justify-center"
          iconRight={<span aria-hidden="true">→</span>}
        >
          Let&apos;s talk
        </Button>
      </div>
    </div>
  );
}
