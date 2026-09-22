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

export default function HomePage() {
  return (
    <>
      {/* S1: Hero */}
      <S1Hero />

      {/* S2: Proof Strip */}
      <S2ProofStrip />

      {/* S3: Selected Work */}
      <S3SelectedWork />

      {/* S4: Featured Design System */}
      <S4FeaturedDesignSystem />

      {/* S5: What I specialize in */}
      <S5Specializations />

      {/* S6: How I work */}
      <S6HowIWork />

      {/* S7: Design + Engineering */}
      <S7DesignEngineering />

      {/* S8: AI Workflow */}
      <S8AiWorkflow />

      {/* S8: Kind Words */}
      <S8KindWords />

      {/* S9: About Teaser */}
      <S9AboutTeaser />

      {/* S10: Final CTA */}
      <CTASection
        heading="Have a complex product that needs clarity?"
        subheading="Tell me what you're trying to improve."
        primaryButtonText="Discuss your project"
        primaryButtonHref="/contact"
        secondaryButtonText="View resume"
        secondaryButtonHref="/resume"
        note="Open to freelance and selected full-time roles."
      />
    </>
  );
}
