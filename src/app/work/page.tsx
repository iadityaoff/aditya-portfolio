import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { getAllProjects } from "@/content/projects-data";
import { WorkContent } from "@/components/work/work-content";
import { DotGrid, FrameHeading, PageToolbar } from "@/components/motion/studio";

export const metadata: Metadata = {
  title: "Selected Work & Case Studies",
  description:
    "Explore in-depth product design and UI/UX case studies across healthcare platforms, enterprise application suites, and multi-tier design systems by Aditya Tripathi.",
  alternates: {
    canonical: "https://adityatripathi.design/work",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityatripathi.design/work",
    siteName: "Aditya Tripathi — Senior UI/UX Designer",
    title: "Selected Work & Case Studies | Aditya Tripathi",
    description:
      "Explore in-depth product design and UI/UX case studies across healthcare platforms, enterprise application suites, and multi-tier design systems by Aditya Tripathi.",
    images: [
      {
        url: "https://adityatripathi.design/og-work.jpg",
        width: 1200,
        height: 630,
        alt: "Selected Work & Case Studies - Aditya Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work & Case Studies | Aditya Tripathi",
    description:
      "Explore in-depth product design and UI/UX case studies across healthcare platforms, enterprise application suites, and multi-tier design systems by Aditya Tripathi.",
    images: ["https://adityatripathi.design/og-work.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WorkPage() {
  const allProjects = getAllProjects();

  return (
    <div className="relative isolate w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background min-h-screen">
      <DotGrid className="h-[640px]" />
      <PageToolbar frame="Work" />
      <Container size="default">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 space-y-4" data-section="Overview">
          <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            PORTFOLIO ARCHIVE
          </p>
          <FrameHeading frame="Work" className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-tight">
            Case studies in product, systems &amp;{" "}
            <em className="font-serif font-normal italic">enterprise workflows.</em>
          </FrameHeading>
          <p className="text-base sm:text-lg text-muted leading-relaxed pt-6">
            Every project below documents real constraints, evidence-backed architectural decisions, component states, and verified outcomes.
          </p>
        </div>

        {/* Suspense boundary for useSearchParams in WorkContent */}
        <Suspense
          fallback={
            <div className="py-20 text-center text-muted font-mono text-sm">
              Loading case studies...
            </div>
          }
        >
          <WorkContent initialProjects={allProjects} />
        </Suspense>
      </Container>
    </div>
  );
}
