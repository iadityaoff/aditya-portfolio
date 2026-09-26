import * as React from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CTASectionProps {
  heading?: string;
  subheading?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  note?: string;
  className?: string;
}

export function CTASection({
  heading = "Have a complex product that needs clarity?",
  subheading = "Tell me what you're trying to improve.",
  primaryButtonText = "Discuss your project",
  primaryButtonHref = "/contact",
  secondaryButtonText = "View resume",
  secondaryButtonHref = "/resume",
  note = "Open to freelance and selected full-time roles.",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-showcase text-white py-20 lg:py-28 relative overflow-hidden border-t border-showcase-border",
        className
      )}
    >
      {/* Subtle background radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-accent/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 text-center max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          Start a conversation
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
          {heading}
        </h2>

        <p className="text-base sm:text-lg text-showcase-muted mt-4 max-w-xl mx-auto leading-relaxed">
          {subheading}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            href={primaryButtonHref}
            variant="primary"
            size="lg"
            iconRight={<span aria-hidden="true">→</span>}
          >
            {primaryButtonText}
          </Button>

          <Button
            href={secondaryButtonHref}
            variant="outline-dark"
            size="lg"
          >
            {secondaryButtonText}
          </Button>
        </div>

        {note && (
          <p className="font-mono text-xs text-showcase-muted mt-6 tracking-wide">
            {note}
          </p>
        )}
      </Container>
    </section>
  );
}
