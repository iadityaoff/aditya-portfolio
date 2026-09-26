import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { CaseHero } from "@/components/case-study/case-hero";
import { TLDR } from "@/components/case-study/tldr";
import { ConstraintList } from "@/components/case-study/constraint-list";
import { RoleCards } from "@/components/case-study/role-card";
import { FlowDiagram } from "@/components/case-study/flow-diagram";
import { WireframeGallery } from "@/components/case-study/wireframe-gallery";
import { DecisionBlock } from "@/components/case-study/decision-block";
import { BreakpointTable } from "@/components/case-study/breakpoint-table";
import { ComponentPreview } from "@/components/case-study/component-preview";
import { OutcomeList } from "@/components/case-study/outcome-list";
import { Reflection } from "@/components/case-study/reflection";
import { ProductStorySequence } from "@/components/case-study/product-story-sequence";
import { RealityCheck } from "@/components/case-study/reality-check";
import { NextProject } from "@/components/shared/next-project";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CTASection } from "@/components/shared/cta-section";
import { CaseCoverBuild } from "@/components/case-study/case-cover-build";
import { PageToolbar, Reveal } from "@/components/motion/studio";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/content/projects-data";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  const isConfidential = project.confidential === "password";

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `/work/${project.slug}`,
      siteName: "Aditya Tripathi — Senior UI/UX Designer",
      title: `${project.title} — Case Study | Aditya Tripathi`,
      description: project.summary,
      // SVG covers don't render in link previews, so share the generated PNG card
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | Aditya Tripathi`,
      description: project.summary,
      images: ["/opengraph-image"],
    },
    robots: {
      index: !isConfidential,
      follow: !isConfidential,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { next } = getAdjacentProjects(slug);

  return (
    <>
      {/* Scroll progress indicator for case studies per §1.4 */}
      <ScrollProgress />

      {/* Hero Section */}
      <CaseHero project={project} />

      {/* The cover builds itself: wireframe → components → UI → prototype → outcome */}
      <CaseCoverBuild project={project} />
      <PageToolbar frame="Case study" />

      {/* Main Content Layout with Sticky Side Nav */}
      <div className="w-full bg-background py-16">
        <Container size="default">
          <div className="flex flex-col xl:flex-row items-start gap-12">
            {/* Sticky Navigation Sidebar */}
            <CaseStudyNav />

            {/* Main Content Spine */}
            <article className="flex-1 w-full max-w-4xl space-y-4">
              {/* TL;DR Executive Summary */}
              <Reveal section="Overview">
                <TLDR tldr={project.tldr} />
              </Reveal>

              {/* Context and Hard Constraints */}
              <Reveal section="Context">
                <ConstraintList
                context={project.context}
                constraints={project.constraints}
              />
              </Reveal>

              {/* The Messy Reality */}
              {project.realityCheck && (
                <RealityCheck 
                  quote={project.realityCheck.quote}
                  author={project.realityCheck.author}
                  context={project.realityCheck.context}
                />
              )}

              {/* Roles & Personas */}
              <Reveal section="Roles">
                <RoleCards roles={project.roles} />
              </Reveal>

              {/* Information Architecture & Flow */}
              <Reveal section="Structure">
                <FlowDiagram keyFlow={project.keyFlow} />
              </Reveal>

              {/* Exploration & Low-Fi Wireframes */}
              <Reveal section="Exploration">
                <WireframeGallery wireframes={project.wireframes} />
              </Reveal>

              {/* Product Story Sequence (§16) */}
              {project.productStory && (
                <ProductStorySequence story={project.productStory} />
              )}

              {/* Key Decisions with 4-Stage Evidence Chains */}
              <Reveal section="Decisions">
                <DecisionBlock decisions={project.decisions} />
              </Reveal>

              {/* Responsive Behavior Table */}
              <Reveal section="Responsive">
                <BreakpointTable breakpoints={project.breakpoints} />
              </Reveal>

              {/* System Handoff & Tokens */}
              <Reveal section="Handoff">
                <ComponentPreview systemHandoff={project.systemHandoff} />
              </Reveal>

              {/* Verified Measurable Outcomes */}
              <Reveal section="Outcomes">
                <OutcomeList outcomes={project.outcomes} />
              </Reveal>

              {/* Retrospective */}
              <Reveal section="Retrospective">
                <Reflection reflection={project.reflection} />
              </Reveal>

              {/* Next Case Study Link */}
              {next && <NextProject project={next} />}
            </article>
          </div>
        </Container>
      </div>

      {/* Final Call to Action */}
      <CTASection
        heading={`Interested in similar outcomes for your platform?`}
        subheading="Let's review your product workflows, audit table density, or establish your multi-brand design tokens."
        primaryButtonText="Discuss this project"
        primaryButtonHref="/contact"
      />
    </>
  );
}
