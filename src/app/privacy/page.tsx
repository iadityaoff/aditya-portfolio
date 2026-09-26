import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data handling practices for Aditya Tripathi's portfolio.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background min-h-screen">
      <Container size="narrow">
        <div className="space-y-8 max-w-3xl">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              LEGAL &amp; PRIVACY
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink mt-2">
              Privacy Notice
            </h1>
            <p className="font-mono text-xs text-muted mt-2">
              Last updated: September 2026
            </p>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-muted leading-relaxed border-t border-line pt-8">
            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-ink">
                1. Information Collected
              </h2>
              <p>
                When you submit an inquiry through the contact form on this site, I collect your name, email address, optional company name, project scope, budget range, and message context.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-ink">
                2. How Your Data is Used
              </h2>
              <p>
                The information you provide is used exclusively to respond to your project inquiry, schedule discovery calls, and discuss potential design collaborations. Your details are never sold, rented, or shared with third-party advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-ink">
                3. Analytics &amp; Cookies
              </h2>
              <p>
                This site respects user privacy. If web analytics are enabled, privacy-friendly, cookieless metrics (such as Plausible or Vercel Analytics) are utilized without collecting personal identifiable information or cross-site tracking profiles.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-ink">
                4. Data Retention &amp; Inquiries
              </h2>
              <p>
                Inquiry emails are retained only as long as necessary to conduct ongoing business communications. If you would like your submitted contact details deleted from records, please email{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-accent underline font-mono text-xs"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>

            <div className="pt-6 border-t border-line">
              <Link
                href="/"
                className="font-mono text-xs text-accent font-semibold hover:underline"
              >
                ← Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
