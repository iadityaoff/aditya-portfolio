import type { Metadata } from "next";
import { PrototypeHome } from "@/components/home/prototype-home";

export const metadata: Metadata = {
  title: "Aditya Tripathi Studio — Senior UI/UX & Product Designer",
  description:
    "Aditya Tripathi — Senior UI/UX & Product Designer for SaaS and enterprise. A portfolio that builds itself as you scroll.",
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
      <PrototypeHome />
    </>
  );
}
