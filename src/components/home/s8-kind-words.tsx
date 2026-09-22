import * as React from "react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Testimonial } from "@/components/ui/testimonial";
import { testimonials } from "@/content/site";

export function S8KindWords() {
  return (
    <section className="w-full py-20 lg:py-32 bg-white/40 border-t border-line">
      <Container size="default">
        <SectionHeading
          eyebrow="CLIENT &amp; TEAM TESTIMONIALS"
          title={
            <>
              What collaborators <em>say about working together.</em>
            </>
          }
          description="Direct feedback from clinical directors, engineering leads, and product managers who shipped products with me."
          className="mb-16"
        />

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <Testimonial
              key={t.name}
              quote={t.quote}
              name={t.name}
              role={t.role}
              project={t.project}
              source={t.source}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
