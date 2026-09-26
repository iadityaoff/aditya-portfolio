import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Availability",
  description: "Get in touch with Aditya Tripathi for freelance product design, design systems architecture, and legacy SaaS modernization.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/contact",
    siteName: "Aditya Tripathi — Senior UI/UX Designer",
    title: "Contact & Availability | Aditya Tripathi",
    description: "Get in touch with Aditya Tripathi for freelance product design, design systems architecture, and legacy SaaS modernization.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contact & Availability - Aditya Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Availability | Aditya Tripathi",
    description: "Get in touch with Aditya Tripathi for freelance product design, design systems architecture, and legacy SaaS modernization.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
