import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/shared/cta-section";
import { capabilities, experiences, whatICareAbout } from "@/content/site";

export const metadata: Metadata = {
  title: "About Aditya Tripathi",
  description:
    "Senior UI/UX Designer with over 5 years specializing in complex SaaS workflows, clinical healthcare systems, and scalable design token architectures. Uses AI-assisted workflows to accelerate research, prototyping, and implementation.",
  alternates: {
    canonical: "https://adityatripathi.design/about",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://adityatripathi.design/about",
    siteName: "Aditya Tripathi — Senior UI/UX Designer",
    title: "About Aditya Tripathi",
    description:
      "Senior UI/UX Designer with over 5 years specializing in complex SaaS workflows, clinical healthcare systems, and scalable design token architectures.",
    images: [
      {
        url: "https://adityatripathi.design/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Aditya Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aditya Tripathi",
    description:
      "Senior UI/UX Designer with over 5 years specializing in complex SaaS workflows, clinical healthcare systems, and scalable design token architectures.",
    images: ["https://adityatripathi.design/og-about.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background min-h-screen">
      <Container size="default">
        {/* Top Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-line">
          {/* Portrait Column */}
          <div className="lg:col-span-4">
            <div className="p-8 rounded-[24px] bg-white border border-line shadow-md space-y-6 text-center max-w-sm mx-auto lg:mx-0">
              <div className="w-28 h-28 rounded-full bg-accent/15 border-2 border-accent text-accent font-semibold text-3xl flex items-center justify-center mx-auto">
                AT
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-ink">Aditya Tripathi</h2>
                <p className="font-mono text-xs text-muted mt-1">
                  Senior UI/UX Designer
                </p>
                <p className="font-mono text-xs text-ink/70 mt-0.5">
                  Surat, Gujarat, India · Remote Worldwide
                </p>
              </div>

              <div className="pt-4 border-t border-line/60 flex flex-col gap-2">
                <Button href="/contact" variant="primary" size="sm" className="w-full justify-center">
                  Let&apos;s talk →
                </Button>
                <Button href="/resume" variant="secondary" size="sm" className="w-full justify-center">
                  View full resume
                </Button>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-8 space-y-6">
            <Badge variant="accent">BIOGRAPHY &amp; PERSPECTIVE</Badge>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink leading-tight">
              Designer by role. <em className="font-serif font-normal italic">Builder by mindset.</em>
            </h1>

            <div className="space-y-4 text-base sm:text-lg text-muted leading-relaxed">
              <p>
                For over five years, I have worked at the intersection of complex operational workflows and rigorous design systems, currently driving product design at OctaNode. My work focuses on platforms where users make high-consequence decisions under time pressure — clinical hospital administrators managing patient wards, hiring panels screening thousands of candidates, and support engineers triaging incident queues.
              </p>
              <p>
                What differentiates my approach is frontend awareness. Having built interfaces with HTML, CSS/SCSS, Tailwind, Angular, and React, I understand the technical boundaries and state complexities behind every layout choice. When I design a component, its variants, hover states, keyboard focus behaviors, and responsive rules are ready for engineers to implement without guesswork.
              </p>
              <p>
                In 2024–2025, I integrated AI-assisted workflows into my practice — using Claude and ChatGPT for research synthesis and UX exploration, Cursor and GitHub Copilot for component scaffolding, and agentic tools like Antigravity for rapid prototype building. These tools accelerate my process, but every design decision, accessibility check, and production review remains human-led.
              </p>
              <p>
                I partner with distributed squads, collaborating asynchronously via Figma and Storybook, leading design reviews, and working side-by-side with frontend engineers to ensure that what gets shipped to users is exactly what was designed.
              </p>
            </div>
          </div>
        </div>

        {/* Capabilities (Plain Text Chips - No Percentage Bars per §1.6) */}
        <section className="my-20 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              TOOLING &amp; METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Capability Groups
            </h2>
            <p className="text-muted text-sm mt-1">
              Plain text verification of everyday tools, frameworks, and methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((group) => (
              <div
                key={group.category}
                className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-4"
              >
                <h3 className="font-mono text-xs uppercase font-bold text-ink tracking-wider">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#FAFAF7] border border-line text-ink"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="my-20 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              CAREER TIMELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
              5+ Years in Enterprise Product Design
            </h2>
          </div>

          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-[20px] bg-white border border-line flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-ink">
                    {exp.role} · <span className="text-muted">{exp.company}</span>
                  </h3>
                  <p className="text-sm text-muted">
                    {exp.description}
                  </p>
                </div>
                <span className="font-mono text-xs font-semibold text-accent whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Education, Certifications & Languages */}
        <section className="my-20 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              BACKGROUND &amp; CREDENTIALS
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Education, Certifications &amp; Languages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-2">
              <span className="font-mono text-xs uppercase font-bold text-accent tracking-wider">
                EDUCATION
              </span>
              <h3 className="text-base font-semibold text-ink">
                B.Sc. Information Technology
              </h3>
              <p className="text-sm text-muted">
                Rabindranath Tagore University
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-2">
              <span className="font-mono text-xs uppercase font-bold text-accent tracking-wider">
                CERTIFICATION
              </span>
              <h3 className="text-base font-semibold text-ink">
                UI/UX Design Certification
              </h3>
              <p className="text-sm text-muted">
                R&amp;W Multimedia Academy
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-2">
              <span className="font-mono text-xs uppercase font-bold text-accent tracking-wider">
                LANGUAGES
              </span>
              <h3 className="text-base font-semibold text-ink">
                English &amp; Hindi
              </h3>
              <p className="text-sm text-muted">
                Professional &amp; native fluency for global remote collaboration
              </p>
            </div>
          </div>
        </section>

        {/* What I Care About (5 Principles) */}
        <section className="my-20 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              DESIGN PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
              What I Care About
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatICareAbout.map((p, idx) => (
              <div
                key={p.title}
                className="p-6 rounded-[20px] bg-white border border-line flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-accent block mb-2">
                    0{idx + 1}
                  </span>
                  <h4 className="text-sm font-semibold text-ink mb-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Note */}
        <section className="my-20 p-8 rounded-[24px] bg-line/20 border border-line space-y-3 max-w-3xl">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-bold">
            Outside of Design Work
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            When I&apos;m not analyzing data tables or organizing Figma auto-layout variants, you&apos;ll find me reading about systems engineering, studying industrial typography and Swiss editorial layouts, or exploring specialty espresso beans.
          </p>
        </section>
      </Container>

      {/* CTA Section */}
      <CTASection
        heading="Let's build something clear and scalable together."
        subheading="Open to select enterprise product design, design system governance, and advisory roles."
        primaryButtonText="Start a conversation"
        primaryButtonHref="/contact"
      />
    </div>
  );
}
