import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume & Experience",
  description: "Professional experience, skills, and work history of Aditya Tripathi, Senior UI/UX Designer specializing in SaaS and enterprise products.",
  alternates: {
    canonical: "https://adityatripathi.design/resume",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityatripathi.design/resume",
    siteName: "Aditya Tripathi — Senior UI/UX Designer",
    title: "Resume & Experience | Aditya Tripathi",
    description: "Professional experience, skills, and work history of Aditya Tripathi, Senior UI/UX Designer specializing in SaaS and enterprise products.",
    images: [
      {
        url: "https://adityatripathi.design/og-resume.jpg",
        width: 1200,
        height: 630,
        alt: "Resume & Experience - Aditya Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume & Experience | Aditya Tripathi",
    description: "Professional experience, skills, and work history of Aditya Tripathi, Senior UI/UX Designer specializing in SaaS and enterprise products.",
    images: ["https://adityatripathi.design/og-resume.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
