import type { Metadata } from "next";
import Link from "next/link";
import { PrototypeHome } from "@/components/home/prototype-home";
import { getAllProjects } from "@/content/projects-data";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Aditya Tripathi Studio — Senior UI/UX & Product Designer",
  description:
    "Aditya Tripathi is a Senior UI/UX & Product Designer in Surat, India, designing complex SaaS, healthcare (DrPro) and enterprise products and design systems. A portfolio that builds itself as you scroll.",
  alternates: { canonical: "/" },
};

/**
 * Home page renders the full cinematic GSAP prototype.
 * The prototype has its own nav/footer/cursor, so we hide the
 * Next.js shell chrome (Nav + Footer) on this route only via CSS.
 * No component files are modified — just scoped style overrides.
 */
export default function HomePage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body { overflow: hidden !important; }
            main { padding: 0 !important; margin: 0 !important; }
            body::after { display: none !important; } /* the prototype has its own grain */
          `,
        }}
      />
      {/* The visible homepage lives in the iframe, so give search engines,
          link previews and screen readers the same story in the page itself. */}
      <div className="sr-only">
        <h1>
          {siteConfig.name}: {siteConfig.roleTitle}. {siteConfig.headline}
        </h1>
        <p>{siteConfig.subHeadline}</p>
        <h2>Selected case studies</h2>
        <ul>
          {getAllProjects()
            .filter((p) => p.published)
            .map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`}>{p.title}</Link>: {p.summary}
              </li>
            ))}
        </ul>
      </div>
      <PrototypeHome />
    </>
  );
}
