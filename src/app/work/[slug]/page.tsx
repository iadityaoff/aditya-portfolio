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
import { NextProject } from "@/components/shared/next-project";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CTASection } from "@/components/shared/cta-section";
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
    title: `${project.title} | Aditya Tripathi`,
    description: project.summary,
    alternates: {
      canonical: `https://adityatripathi.design/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://adityatripathi.design/work/${project.slug}`,
      siteName: "Aditya Tripathi — Senior UI/UX Designer",
      title: `${project.title} — Case Study | Aditya Tripathi`,
      description: project.summary,
      images: [
        {
          url: project.cover,
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
      images: [project.cover],
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

      {/* Main Content Layout with Sticky Side Nav */}
      <div className="w-full bg-background py-16">
        <Container size="default">
          <div className="flex flex-col xl:flex-row items-start gap-12">
            {/* Sticky Navigation Sidebar */}
            <CaseStudyNav />

            {/* Main Content Spine */}
            <article className="flex-1 w-full max-w-4xl space-y-4">
              {/* TL;DR Executive Summary */}
              <TLDR tldr={project.tldr} />

              {/* Context and Hard Constraints */}
              <ConstraintList
                context={project.context}
                constraints={project.constraints}
              />

              {/* Roles & Personas */}
              <RoleCards roles={project.roles} />

              {/* Information Architecture & Flow */}
              <FlowDiagram keyFlow={project.keyFlow} />

              {/* Exploration & Low-Fi Wireframes */}
              <WireframeGallery wireframes={project.wireframes} />

              {/* Key Decisions with 4-Stage Evidence Chains */}
              <DecisionBlock decisions={project.decisions} />

              {/* Responsive Behavior Table */}
              <BreakpointTable breakpoints={project.breakpoints} />

              {/* System Handoff & Tokens */}
              <ComponentPreview systemHandoff={project.systemHandoff} />

              {/* Verified Measurable Outcomes */}
              <OutcomeList outcomes={project.outcomes} />

              {/* Retrospective */}
              <Reflection reflection={project.reflection} />

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
