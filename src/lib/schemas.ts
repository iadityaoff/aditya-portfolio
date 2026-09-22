import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name (at least 2 characters)"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  projectType: z.enum([
    "SaaS / Enterprise Product Design",
    "Design System & Token Architecture",
    "Product Redesign / UX Audit",
    "Design-to-Development Handoff",
    "Advisory / Full-Time Role",
    "Other",
  ]),
  budgetRange: z.string().optional(),
  message: z.string().min(10, "Please include a brief message (at least 10 characters)"),
  _gotcha: z.string().max(0, "Bot detected"), // Honeypot field must be empty
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const projectFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  industry: z.string(),
  category: z.enum(["flagship", "compact", "card"]),
  role: z.string(),
  platform: z.array(z.string()),
  scope: z.array(z.string()),
  tools: z.array(z.string()),
  timeline: z.string().optional(),
  confidential: z.enum(["public", "anonymized", "password"]),
  order: z.number(),
  published: z.boolean(),
});
