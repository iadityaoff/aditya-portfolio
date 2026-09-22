import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System & Architecture",
  description: "Explore Aditya Tripathi's approach to scalable design token architectures, multi-app theming, and component library construction.",
  alternates: {
    canonical: "https://adityatripathi.design/design-system",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityatripathi.design/design-system",
    siteName: "Aditya Tripathi — Senior UI/UX Designer",
    title: "Design System & Architecture | Aditya Tripathi",
    description: "Explore Aditya Tripathi's approach to scalable design token architectures, multi-app theming, and component library construction.",
    images: [
      {
        url: "https://adityatripathi.design/og-design-system.jpg",
        width: 1200,
        height: 630,
        alt: "Design System & Architecture - Aditya Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design System & Architecture | Aditya Tripathi",
    description: "Explore Aditya Tripathi's approach to scalable design token architectures, multi-app theming, and component library construction.",
    images: ["https://adityatripathi.design/og-design-system.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
