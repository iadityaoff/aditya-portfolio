# SEO Source of Truth & Maintenance Guidelines

**Primary Entity**: Aditya Tripathi
**Primary Positioning**: Product/UI/UX Designer specializing in SaaS, enterprise products, complex workflows, and design systems.

> **MAINTENANCE RULE FOR AI AGENTS**
> Before creating, modifying, renaming, or deleting any public page, route, case study, metadata configuration, navigation structure, or indexable content, read this `SEO.md` file and preserve these rules. Update `SEO.md` whenever the SEO architecture itself changes — not for trivial copy edits.

## 1. SEO Goals
When someone searches "Aditya Tripathi", Google (and AI-driven answer surfaces like AI Overviews) should clearly understand that this portfolio is the official professional website of Aditya Tripathi, and associate him with his work as a Product/UI/UX Designer.

## 2. Keyword & Topic Strategy
**DO NOT KEYWORD STUFF.** Use the following phrases only where they naturally and accurately describe the content:
- Aditya Tripathi
- Product Designer / UI/UX Designer
- SaaS Product Designer
- Enterprise Product Designer
- Design Systems Designer

Supporting differentiators (use sparingly and contextually): AI-assisted workflows, vibe coding, Frontend implementation (Angular, React).

## 3. Metadata Rules
Every indexable public route (`/`, `/work`, `/design-system`, `/services`, `/about`, `/resume`, `/contact`) MUST have:
1. **Unique SEO Title**: Concise, human-readable, describing the specific page. Example: `Services | Aditya Tripathi — SaaS Product Designer`
2. **Unique Meta Description**: accurately summarizing the page without duplicating the homepage description.
3. **Canonical URL**: Self-referencing to prevent duplicate content issues.
4. **Open Graph & Twitter Cards**: Accurate `title`, `description`, and `image`.

## 4. Structured Data (JSON-LD) Rules
- The homepage `layout.tsx` must maintain a `Person` schema for Aditya Tripathi.
- Link the `Person` entity to verified, real professional profiles via `sameAs` (LinkedIn, Dribbble, Behance, GitHub, Upwork).
- **CRITICAL**: Never invent profile URLs, ratings, reviews, achievements, job titles, or affiliations. 
- Use the `WebSite` schema to accurately name the portfolio.

## 5. Case Study SEO Rules
Each public case study (`/work/[slug]`) must have:
- A meaningful H1 title.
- Logical H2/H3 structure covering problem, role, workflow, key decisions.
- Descriptive image alt text (never keyword stuffed).
- Sitemap inclusion (if indexable).
- Confidential/password-gated projects must retain their access restrictions and remain out of the sitemap.

## 6. Image SEO Rules
- Meaningful, contextual images get descriptive alt text.
- Decorative images get empty alt text (`alt=""`).
- Ensure responsive image sizing (Next.js `Image` component preferred).

## 7. Internal Linking Rules
- Link contextually between Case Studies, Design System, Services, and About pages.
- Use descriptive anchor text (e.g., "View the Design System architecture" rather than "Click here").

## 8. Sitemap Rules (`sitemap.ts`)
- Include: Homepage, Work listing, public case studies, Design System, Services, About, Resume, Contact.
- Exclude: Private/confidential routes, API routes, 404s.
- **CRITICAL**: Do NOT fake `lastModified` dates by using `new Date()` on every build. Hardcode a stable date or omit it if unknown.

## 9. Robots.txt & Indexing Rules
- Allow crawling of the public portfolio.
- Disallow `/api/`, `/protected/`, and password-gated work (`/work/*?password=`).

## 10. Performance Rules
- Optimize for Core Web Vitals, specifically LCP, CLS, and **INP** (Interaction to Next Paint).
- Do not strip premium portfolio interactions, but ensure they don't block the main thread unnecessarily.

## 11. Content Quality & AI Content Rules (2024–2026 E-E-A-T)
- All content must be genuinely useful and people-first.
- Do not generate pages purely to target keywords.
- AI may assist drafting content, but **MUST NEVER** invent experience, clients, employers, metrics, awards, testimonials, project outcomes, technologies, or credentials.

## 12. Cross-Domain Duplication (Canonicalization)
If any portfolio content is cross-posted elsewhere (e.g., Medium, LinkedIn), ensure the portfolio URL is set as the canonical source where the platform allows, to avoid diluting entity signals.

---

### New Page Checklist
- [ ] Added to `sitemap.ts`?
- [ ] Has unique `Metadata` (title, description, OG)?
- [ ] Contains a single `<h1>`?
- [ ] Linked contextually from other pages?

### New Case Study Checklist
- [ ] Meaningful URL slug?
- [ ] Is `confidential` status correctly set? (Public = included in sitemap).
- [ ] Descriptive alt text on all project screenshots?
- [ ] Clear H2 structure (Problem, Role, Outcomes)?
