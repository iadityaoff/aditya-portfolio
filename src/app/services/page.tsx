import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/shared/cta-section";
import { DotGrid, FrameHeading, PageToolbar, Reveal } from "@/components/motion/studio";
import { services, faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Design Services & Advisory",
  description:
    "Product design, design systems, legacy SaaS modernization, and design-to-development handoff services by Aditya Tripathi.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/services",
    siteName: "Aditya Tripathi — Senior UI/UX Designer",
    title: "Design Services & Advisory | Aditya Tripathi",
    description:
      "Product design, design systems, legacy SaaS modernization, and design-to-development handoff services by Aditya Tripathi.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Design Services & Advisory - Aditya Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Services & Advisory | Aditya Tripathi",
    description:
      "Product design, design systems, legacy SaaS modernization, and design-to-development handoff services by Aditya Tripathi.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  const engagementSteps = [
    {
      step: "01",
      title: "Discovery & Scope",
      desc: "30-minute sync to evaluate your product domain, technical stack, operator roles, and sprint timeline.",
    },
    {
      step: "02",
      title: "Architecture & Low-Fi",
      desc: "Mapping workflows, object models, and rapid wireframe testing with real tabular data before styling.",
    },
    {
      step: "03",
      title: "High-Fidelity & Systems",
      desc: "Building all breakpoint states, tokenized variables, and edge case error flows in Figma.",
    },
    {
      step: "04",
      title: "Handoff & Engineering QA",
      desc: "Walking developers through props, responsive CSS rules, and conducting implementation review sprints.",
    },
  ];

  return (
    <div className="relative isolate w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background min-h-screen">
      <DotGrid className="h-[680px]" />
      <PageToolbar frame="Services" />
      <Container size="default">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4" data-section="Overview">
          <Badge variant="accent">SERVICES &amp; CAPABILITIES</Badge>
          <FrameHeading frame="Services" className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-tight">
            Specialized design services for{" "}
            <em className="font-serif font-normal italic">enterprise software.</em>
          </FrameHeading>
          <p className="text-base sm:text-lg text-muted leading-relaxed pt-6">
            I partner with founders, product directors, and engineering leads to design mission-critical software, untangle complex operational debt, and institute shared design systems.
          </p>
        </div>

        {/* 4 Service Blocks */}
        <div className="space-y-12">
          {services.map((service, idx) => (
            <Reveal key={service.id} section={`Service 0${idx + 1}`}>
            <div className="p-8 sm:p-10 lg:p-12 rounded-[24px] bg-white border border-line card-hover">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left overview */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="font-mono text-xs font-bold text-accent">
                    SERVICE 0{idx + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                    {service.title}
                  </h2>
                  <p className="font-serif italic text-lg text-accent">
                    {service.tagline}
                  </p>

                  <div className="pt-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block mb-1">
                      IDEAL FOR:
                    </span>
                    <p className="text-sm text-muted leading-relaxed">
                      {service.whoItsFor}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line/60">
                    <span className="font-mono text-[11px] text-muted block mb-1">
                      RELATED CASE STUDY:
                    </span>
                    <Link
                      href={`/work/${service.relatedWorkSlug}`}
                      className="text-sm font-semibold text-ink hover:text-accent transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{service.relatedWorkTitle}</span>
                      <span className="text-accent" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                {/* Right deliverables and outputs */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink font-bold block mb-3">
                      WHAT I DELIVER:
                    </span>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                          <span className="text-accent font-bold mt-0.5">•</span>
                          <span className="text-ink">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-line/60 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-muted font-semibold">
                      Typical Outputs:
                    </span>
                    {service.typicalOutputs.map((out) => (
                      <span
                        key={out}
                        className="font-mono text-xs px-2.5 py-1 rounded-md bg-line/40 text-ink border border-line"
                      >
                        {out}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {/* How Engagements Work */}
        <section className="my-24 space-y-10" data-section="Engagement">
          <Reveal className="space-y-10">
          <SectionHeading
            eyebrow="ENGAGEMENT MODEL"
            title={
              <>
                How we work together from <em>audit to delivery.</em>
              </>
            }
            description="Clear milestones, asynchronous weekly sprint loops, and structured review stages."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-[20px] bg-white border border-line space-y-3"
              >
                <span className="font-mono text-xs font-bold text-accent">
                  STEP {step.step}
                </span>
                <h3 className="text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          </Reveal>
        </section>

        {/* Frequently Asked Questions */}
        <section className="my-24 space-y-10" data-section="FAQ">
          <Reveal className="space-y-10">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title={
              <>
                Common questions about <em>process &amp; collaboration.</em>
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-3"
              >
                <h3 className="text-base font-semibold text-ink">
                  {faq.question}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          </Reveal>
        </section>
      </Container>

      {/* CTA Section */}
      <CTASection
        heading="Have a project that fits these services?"
        subheading="Let's hop on a 20-minute intro call to discuss your product roadmap, backlog, and timeline."
        primaryButtonText="Schedule a discovery call"
        primaryButtonHref="/contact"
      />
    </div>
  );
}
