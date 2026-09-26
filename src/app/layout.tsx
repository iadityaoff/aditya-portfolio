import type { Metadata } from "next";
import {
  Inter_Tight,
  Instrument_Serif,
  Geist_Mono,
  Geist,
  Inter,
  Space_Grotesk,
  Fraunces,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Newsreader,
  Playfair_Display,
  IBM_Plex_Mono,
} from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { LenisErrorBoundary } from "@/components/layout/lenis-error-boundary";
import { siteConfig } from "@/content/site";
import { getAllProjects } from "@/content/projects-data";
import { CommandPalette } from "@/components/layout/command-palette";
import { ThemeDrawer } from "@/components/layout/theme-drawer";
import { SiteMotion } from "@/components/layout/site-motion";
import { SITE_THEME_BOOT } from "@/lib/site-theme-boot";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* Theme Builder typography options. preload:false — a face is only fetched
   when a visitor picks a pairing that uses it (see theme-engine.ts FONTS).
   next/font options must be literal objects (no spreads). */
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap", preload: false });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap", preload: false });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap", preload: false });
const fraunces = Fraunces({ variable: "--font-fraunces", style: ["normal", "italic"], subsets: ["latin"], display: "swap", preload: false });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", style: ["normal", "italic"], subsets: ["latin"], display: "swap", preload: false });
const plusJakarta = Plus_Jakarta_Sans({ variable: "--font-plus-jakarta", subsets: ["latin"], display: "swap", preload: false });
const newsreader = Newsreader({ variable: "--font-newsreader", style: ["normal", "italic"], subsets: ["latin"], display: "swap", preload: false });
const playfair = Playfair_Display({ variable: "--font-playfair", style: ["normal", "italic"], subsets: ["latin"], display: "swap", preload: false });
const plexMono = IBM_Plex_Mono({ variable: "--font-ibm-plex-mono", weight: ["400", "500", "600"], subsets: ["latin"], display: "swap", preload: false });
const themeFonts = [geist, inter, spaceGrotesk, fraunces, jetbrainsMono, plusJakarta, newsreader, playfair, plexMono]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  metadataBase: new URL("https://adityatripathi.design"),
  title: {
    default: "Aditya Tripathi | Senior UI/UX Designer for SaaS & Enterprise",
    template: "%s | Aditya Tripathi",
  },
  description:
    "Senior UI/UX Designer specializing in complex SaaS platforms, enterprise workflows, high-density data dashboards, and scalable token-driven design systems.",
  keywords: [
    "Senior UI/UX Designer",
    "Product Designer",
    "UI/UX Designer",
    "Design Systems",
    "Enterprise UX",
    "SaaS Design",
    "Figma Variables",
    "Design Tokens",
    "AI-Assisted Design",
    "Vibe Coding",
    "Rapid Prototyping",
    "Aditya Tripathi",
  ],
  authors: [{ name: "Aditya Tripathi" }],
  creator: "Aditya Tripathi",
  alternates: {
    canonical: "https://adityatripathi.design",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityatripathi.design",
    siteName: "Aditya Tripathi — Senior UI/UX Designer",
    title: "Aditya Tripathi | Senior UI/UX Designer for SaaS & Enterprise",
    description:
      "Senior UI/UX Designer specializing in complex SaaS platforms, enterprise workflows, high-density data dashboards, and scalable token-driven design systems.",
    images: [
      {
        url: "https://adityatripathi.design/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aditya Tripathi - Senior UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Tripathi | Senior UI/UX Designer",
    description:
      "Senior UI/UX Designer specializing in SaaS, enterprise workflows, and token-driven design systems.",
    images: ["https://adityatripathi.design/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://adityatripathi.design/#website",
        url: "https://adityatripathi.design",
        name: "Aditya Tripathi Portfolio",
        publisher: {
          "@id": "https://adityatripathi.design/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://adityatripathi.design/#person",
        name: siteConfig.name,
        jobTitle: siteConfig.roleTitle,
        description: siteConfig.subHeadline,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Surat",
          addressRegion: "Gujarat",
          addressCountry: "India",
        },
        sameAs: [
          siteConfig.socials.linkedin,
          siteConfig.socials.github,
        ].filter(Boolean),
        knowsAbout: [
          "SaaS Product Design",
          "Enterprise UX",
          "Design Systems",
          "User Interface Design",
          "Information Architecture",
          "AI-Assisted Design Workflows"
        ],
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${geistMono.variable} ${themeFonts}`}
      // the theme boot script sets data-theme + CSS variables on <html> before hydration
      suppressHydrationWarning
    >
      <head>
        {/* Apply the visitor's saved site theme before first paint (no flash) */}
        <script dangerouslySetInnerHTML={{ __html: SITE_THEME_BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-ink antialiased selection:bg-accent/15 selection:text-accent">
        {/* Accessible Skip Link per §6 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <LenisErrorBoundary>
          <SmoothScroll>
            <SiteMotion>
              <Nav />

              <main id="main-content" className="flex-1 flex flex-col w-full">
                {children}
              </main>

              <Footer />
              <CommandPalette
                projects={getAllProjects()
                  .filter((p) => p.published)
                  .map(({ slug, title, industry }) => ({ slug, title, industry }))}
              />
              <ThemeDrawer />
            </SiteMotion>
          </SmoothScroll>
        </LenisErrorBoundary>
      </body>
    </html>
  );
}
