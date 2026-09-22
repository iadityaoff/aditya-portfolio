"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CopyEmail } from "@/components/ui/copy-email";
import { siteConfig } from "@/content/site";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    projectType: "SaaS / Enterprise Product Design",
    budgetRange: "$5k — $15k",
    message: "",
    _gotcha: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "SaaS / Enterprise Product Design",
          budgetRange: "$5k — $15k",
          message: "",
          _gotcha: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Please check the form fields and try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network connection error. Please email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background min-h-screen">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Contact Metadata */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                GET IN TOUCH
              </span>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink mt-2 leading-tight">
                Tell me what you&apos;re{" "}
                <em className="font-serif font-normal italic">trying to improve.</em>
              </h1>
              <p className="text-base text-muted mt-4 leading-relaxed">
                Whether you are untangling a legacy clinical workflow, structuring a multi-brand token system, or preparing for high-stakes enterprise releases.
              </p>
            </div>

            {/* Direct Email with copy-to-clipboard button */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block">
                DIRECT INBOX
              </span>
              <CopyEmail email={siteConfig.email} />
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-line">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block mb-1">
                  LOCATION &amp; ZONE
                </span>
                <p className="text-sm text-ink">{siteConfig.location}</p>
                <p className="text-xs text-muted mt-0.5">IST (UTC+5:30) · Global Sync</p>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block mb-1">
                  DIRECT PHONE
                </span>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="text-sm text-ink hover:text-accent font-medium font-mono inline-flex items-center gap-1"
                >
                  <span>{siteConfig.phone}</span>
                </a>
                <p className="text-xs text-muted mt-0.5">Direct &amp; WhatsApp</p>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block mb-1">
                  RESPONSE TIME
                </span>
                <p className="text-sm text-ink font-semibold">{siteConfig.responseTime}</p>
                <p className="text-xs text-emerald-600 font-mono mt-0.5">● Open to Projects</p>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block mb-1">
                  LINKEDIN
                </span>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink hover:text-accent font-medium inline-flex items-center gap-1"
                >
                  <span>Connect</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <p className="text-xs text-muted mt-0.5">Professional Network</p>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block mb-1">
                  UPWORK PROFILE
                </span>
                <a
                  href={siteConfig.socials.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink hover:text-accent font-medium inline-flex items-center gap-1"
                >
                  <span>Top Rated</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block mb-1">
                  BEHANCE PORTFOLIO
                </span>
                <a
                  href={siteConfig.socials.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink hover:text-accent font-medium inline-flex items-center gap-1"
                >
                  <span>Case Studies</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[24px] bg-white border border-line shadow-sm space-y-6">
              {status === "success" ? (
                /* Success State */
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 font-bold text-2xl flex items-center justify-center mx-auto">
                    ✓
                  </div>
                  <h3 className="text-2xl font-semibold text-ink">
                    Message Received
                  </h3>
                  <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! I will review your product context and respond within 24 hours to schedule our intro call.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 font-mono text-xs text-accent font-semibold hover:underline cursor-pointer"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field (hidden from view and screenreaders) */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="_gotcha">Leave blank</label>
                    <input
                      id="_gotcha"
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData._gotcha}
                      onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink mb-1.5">
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Elena Rostova"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-line bg-background text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink mb-1.5">
                        Work Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="elena@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-line bg-background text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company (Optional) */}
                    <div>
                      <label htmlFor="company" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink mb-1.5">
                        Company / Product <span className="text-muted text-[10px]">(Optional)</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Acme Health Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-line bg-background text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink mb-1.5">
                        Project Scope <span className="text-accent">*</span>
                      </label>
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-line bg-background text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                      >
                        <option>SaaS / Enterprise Product Design</option>
                        <option>Design System &amp; Token Architecture</option>
                        <option>Product Redesign / UX Audit</option>
                        <option>Design-to-Development Handoff</option>
                        <option>Advisory / Full-Time Role</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label htmlFor="budgetRange" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink mb-1.5">
                      Target Budget Range <span className="text-muted text-[10px]">(Optional)</span>
                    </label>
                    <select
                      id="budgetRange"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-line bg-background text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                    >
                      <option>&lt; $5,000 (Sprint Audit / Advisory)</option>
                      <option>$5k — $15k (Single Module / Feature Flow)</option>
                      <option>$15k — $35k (End-to-End Product or Design System)</option>
                      <option>$35k+ (Full Enterprise Suite Overhaul)</option>
                      <option>Full-Time Role / Equity</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink mb-1.5">
                      Project Context &amp; Objectives <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell me about your current platform, the roles using it, and what you're trying to solve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-line bg-background text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-y"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs"
                  >
                    {loading ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  {/* Privacy note per §6 */}
                  <p className="font-mono text-[11px] text-muted text-center pt-2">
                    Privacy notice: Information submitted is encrypted, stored strictly to reply to your inquiry, and never shared with third parties. Read our{" "}
                    <Link href="/privacy" className="underline hover:text-ink">
                      privacy policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
