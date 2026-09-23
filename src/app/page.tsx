import { S1Hero } from "@/components/home/s1-hero";
import { S2ProofStrip } from "@/components/home/s2-proof-strip";
import { S3SelectedWork } from "@/components/home/s3-selected-work";
import { S4FeaturedDesignSystem } from "@/components/home/s4-featured-design-system";
import { S5Specializations } from "@/components/home/s5-specializations";
import { S6HowIWork } from "@/components/home/s6-how-i-work";
import { S7DesignEngineering } from "@/components/home/s7-design-engineering";
import { S8AiWorkflow } from "@/components/home/s8-ai-workflow";
import { S8KindWords } from "@/components/home/s8-kind-words";
import { S9AboutTeaser } from "@/components/home/s9-about-teaser";
import { CTASection } from "@/components/shared/cta-section";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export default function HomePage() {
  return (
    <>
      {/* S1: Hero (has its own scroll transforms) */}
      <S1Hero />

      {/* S2: Proof Strip */}
      <ScrollReveal>
        <S2ProofStrip />
      </ScrollReveal>

      {/* S3: Selected Work */}
      <ScrollReveal>
        <S3SelectedWork />
      </ScrollReveal>

      {/* S4: Featured Design System */}
      <ScrollReveal>
        <S4FeaturedDesignSystem />
      </ScrollReveal>

      {/* S5: What I specialize in */}
      <ScrollReveal>
        <S5Specializations />
      </ScrollReveal>

      {/* S6: How I work */}
      <ScrollReveal>
        <S6HowIWork />
      </ScrollReveal>

      {/* S7: Design + Engineering */}
      <ScrollReveal>
        <S7DesignEngineering />
      </ScrollReveal>

      {/* S8: AI Workflow */}
      <ScrollReveal>
        <S8AiWorkflow />
      </ScrollReveal>

      {/* S8: Kind Words */}
      <ScrollReveal>
        <S8KindWords />
      </ScrollReveal>

      {/* S9: About Teaser */}
      <ScrollReveal>
        <S9AboutTeaser />
      </ScrollReveal>

      {/* S10: Final CTA */}
      <ScrollReveal>
        <CTASection
          heading="Have a complex product that needs clarity?"
          subheading="Tell me what you're trying to improve."
          primaryButtonText="Discuss your project"
          primaryButtonHref="/contact"
          secondaryButtonText="View resume"
          secondaryButtonHref="/resume"
          note="Open to freelance and selected full-time roles."
        />
      </ScrollReveal>
    </>
  );
}
