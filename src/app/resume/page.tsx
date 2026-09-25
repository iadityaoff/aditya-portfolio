"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { DotGrid, FrameHeading, PageToolbar } from "@/components/motion/studio";

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="relative isolate w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background min-h-screen">
      <DotGrid className="no-print h-[520px]" />
      <PageToolbar frame="Resume" />
      <Container size="default">
        {/* Top Action Bar (hidden in print) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-line">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              CURRICULUM VITAE
            </span>
            <div className="mt-3">
              <FrameHeading frame="Resume" className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
                Resume / Experience
              </FrameHeading>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-white text-ink text-xs font-mono font-semibold hover:border-ink/40 transition-all cursor-pointer shadow-2xs"
            >
              <span>Print / Save as PDF</span>
              <span aria-hidden="true">🖨</span>
            </button>

            <Button href="/contact" variant="primary" size="sm">
              Contact Aditya →
            </Button>
          </div>
        </div>

        {/* ATS-Friendly Resume Document (print-page) */}
        <article className="print-page max-w-4xl mx-auto p-8 sm:p-12 lg:p-16 rounded-[24px] bg-white border border-line shadow-xs text-ink space-y-10">
          {/* Header */}
          <div className="border-b border-line pb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
                Aditya Tripathi
              </h2>
              <p className="font-mono text-sm font-semibold text-accent mt-1">
                Senior UI/UX Designer
              </p>
            </div>

            <div className="font-mono text-xs text-muted space-y-1 sm:text-right">
              <p className="text-ink font-medium">{siteConfig.email}</p>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.location}</p>
              <p className="text-accent">linkedin.com/in/aditya-tripathi-2a4847171</p>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="space-y-3" data-section="Summary">
            <h3 className="font-mono text-xs uppercase font-bold text-muted tracking-wider">
              Professional Summary
            </h3>
            <p className="text-sm leading-relaxed text-ink/90">
              Senior UI/UX Designer with over 5 years of experience designing and shipping enterprise web and mobile products. Builds and maintains scalable design systems of reusable components, variants and design tokens that keep Figma libraries and production code in sync. Turns dense, multi-role enterprise workflows into clear, minimal interfaces, then implements them as responsive, production-ready UI in Angular, Next.js, SCSS and Tailwind CSS. Integrates AI-assisted workflows (Claude, Cursor, Antigravity) to accelerate research synthesis, component scaffolding, and prototype delivery while maintaining human-led design review. Works at the intersection of design and engineering, from user flows and prototypes through to Storybook documentation and developer handoff.
            </p>
          </section>

          {/* Professional Experience */}
          <section className="space-y-6" data-section="Experience">
            <h3 className="font-mono text-xs uppercase font-bold text-muted tracking-wider">
              Professional Experience
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h4 className="text-base font-bold text-ink">
                      OctaNode
                    </h4>
                    <p className="font-mono text-xs text-accent font-semibold">
                      Product &amp; UI/UX Designer
                    </p>
                  </div>
                  <div className="font-mono text-xs text-muted sm:text-right">
                    <p>03/2021 — Present</p>
                    <p>Surat, Gujarat, India</p>
                  </div>
                </div>

                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-muted leading-relaxed pt-2">
                  <li>
                    Lead end-to-end UX and UI design for enterprise web and mobile applications, covering research, user flows, wireframes, high-fidelity interfaces and interactive prototypes.
                  </li>
                  <li>
                    Build and maintain a scalable design system of reusable components, variants and design tokens, documented in Storybook so Figma libraries and Angular code stay aligned.
                  </li>
                  <li>
                    Implement designs in production code using Angular, SCSS (custom variables, functions and mixins) and Tailwind CSS, closing the gap between handoff and shipped UI.
                  </li>
                  <li>
                    Structure data-heavy interfaces, including role-based dashboards, Kanban boards and dense data tables, into clear and scannable layouts for enterprise users.
                  </li>
                  <li>
                    Partner with engineering throughout delivery to review implementation, resolve edge cases and keep interaction behavior consistent across products.
                  </li>
                  <li>
                    Integrate AI-assisted workflows using Claude, Cursor, and Antigravity for research synthesis, UX copy exploration, component scaffolding, and rapid prototyping — with human-led review of every output against design system standards.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Core Skills */}
          <section className="space-y-4" data-section="Skills">
            <h3 className="font-mono text-xs uppercase font-bold text-muted tracking-wider">
              Core Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-line/20 border border-line/60 space-y-2">
                <strong className="block text-ink font-semibold">Design &amp; UX</strong>
                <p className="text-muted leading-relaxed">
                  Product Design, UI/UX Design, Design Systems, Information Architecture, User Flows, Wireframing, Prototyping, Interaction &amp; Motion Design
                </p>
              </div>

              <div className="p-4 rounded-xl bg-line/20 border border-line/60 space-y-2">
                <strong className="block text-ink font-semibold">Frontend Implementation</strong>
                <p className="text-muted leading-relaxed">
                  HTML, CSS/SCSS (variables, functions, mixins), Angular, React, Next.js, Tailwind CSS, Bootstrap 5, PrimeNG, Framer Motion
                </p>
              </div>

              <div className="p-4 rounded-xl bg-line/20 border border-line/60 space-y-2">
                <strong className="block text-ink font-semibold">Tools &amp; Workflows</strong>
                <p className="text-muted leading-relaxed">
                  Figma, Storybook, Design Tokens, Atomic Design, Developer Handoff, Claude / ChatGPT, Cursor / GitHub Copilot, Antigravity, Adobe Photoshop, Adobe Illustrator
                </p>
              </div>
            </div>
          </section>

          {/* Selected Project Experience (from CV Page 2) */}
          <section className="space-y-6" data-section="Projects">
            <h3 className="font-mono text-xs uppercase font-bold text-muted tracking-wider">
              Selected Project Experience (OctaNode)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              {/* Project 1 */}
              <div className="p-4 rounded-xl bg-[#FAFAF7] border border-line space-y-2">
                <h4 className="font-bold text-ink">Scalable Design System</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Architected a component-based design system that unified UI patterns across multiple enterprise products. Built reusable components, variants and design tokens following Atomic Design principles. Translated tokens into modular SCSS and connected Figma libraries to an Angular Storybook instance.
                </p>
                <p className="font-mono text-[10px] text-accent pt-1">
                  Tools: Figma, Angular, SCSS, HTML, Storybook, Design Tokens, Atomic Design
                </p>
              </div>

              {/* Project 2 */}
              <div className="p-4 rounded-xl bg-[#FAFAF7] border border-line space-y-2">
                <h4 className="font-bold text-ink">Event &amp; Registration</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Designed a connected suite of web and mobile event products spanning public event discovery, attendee registration and administrative controls. Simplified conditional registration and multi-step approvals into clear linear journeys. Built modular HTML/SCSS patterns.
                </p>
                <p className="font-mono text-[10px] text-accent pt-1">
                  Tools: Figma, HTML, SCSS, User Flows, Wireframing, Interaction Design
                </p>
              </div>

              {/* Project 3 */}
              <div className="p-4 rounded-xl bg-[#FAFAF7] border border-line space-y-2">
                <h4 className="font-bold text-ink">Application Management System</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Led UI/UX design for a centralized platform handling complex administrative workflows. Designed structured, scannable interfaces letting administrators monitor and act on multiple applications from a single view. Mapped role hierarchies via interactive prototypes.
                </p>
                <p className="font-mono text-[10px] text-accent pt-1">
                  Tools: Figma, Prototyping, Information Architecture, Enterprise UX
                </p>
              </div>

              {/* Project 4 */}
              <div className="p-4 rounded-xl bg-[#FAFAF7] border border-line space-y-2">
                <h4 className="font-bold text-ink">Doctor-Patient Care Platform</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Designed the UI/UX for a doctor management system covering clinic and healthcare workflows. Created interfaces in Figma for doctor profiles, patient records, appointments and data management. Implemented responsive frontend layouts in Angular, HTML and SCSS.
                </p>
                <p className="font-mono text-[10px] text-accent pt-1">
                  Tools: Figma, Angular, HTML, SCSS, Prototyping, Responsive Web Design
                </p>
              </div>

              {/* Project 5 */}
              <div className="p-4 rounded-xl bg-[#FAFAF7] border border-line space-y-2">
                <h4 className="font-bold text-ink">Help Desk System</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Redesigned an internal IT service management platform to help support staff triage and resolve tickets faster. Grounded the redesign in user research with support staff, reorganizing dense data-heavy service processes into structured, accessible dashboard views.
                </p>
                <p className="font-mono text-[10px] text-accent pt-1">
                  Tools: Figma, User Research, Dashboard Design, Wireframing, Enterprise UX
                </p>
              </div>

              {/* Project 6 */}
              <div className="p-4 rounded-xl bg-[#FAFAF7] border border-line space-y-2">
                <h4 className="font-bold text-ink">Slot Scheduling Platform</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Designed a time-management and booking application with clear navigation and efficient task organization. Created slot-management workflows and wireframes in Figma, and built the responsive UI structure in HTML and SCSS.
                </p>
                <p className="font-mono text-[10px] text-accent pt-1">
                  Tools: Figma, HTML, SCSS, Wireframing, Information Architecture
                </p>
              </div>
            </div>
          </section>

          {/* Education, Certifications & Languages */}
          <section className="space-y-4 pt-4 border-t border-line" data-section="Education">
            <h3 className="font-mono text-xs uppercase font-bold text-muted tracking-wider">
              Education, Certifications &amp; Languages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-muted font-bold block">
                  EDUCATION
                </span>
                <p className="font-semibold text-ink">B.Sc. Information Technology</p>
                <p className="text-muted">Rabindranath Tagore University</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-muted font-bold block">
                  CERTIFICATION
                </span>
                <p className="font-semibold text-ink">UI/UX Design Certification</p>
                <p className="text-muted">R&amp;W Multimedia Academy</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-muted font-bold block">
                  LANGUAGES
                </span>
                <p className="font-semibold text-ink">English, Hindi</p>
                <p className="text-muted">Fluent Professional Proficiency</p>
              </div>
            </div>
          </section>
        </article>
      </Container>
    </div>
  );
}
