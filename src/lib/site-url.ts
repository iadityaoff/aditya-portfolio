/**
 * The site's public origin, used for canonical URLs, the sitemap, robots.txt
 * and structured data. Set NEXT_PUBLIC_SITE_URL once a custom domain is live;
 * otherwise Vercel's production domain is used (VERCEL_PROJECT_PRODUCTION_URL
 * is provided automatically on Vercel builds).
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "https://aditya-portfolio-gamma-sandy.vercel.app";

export const SITE_URL = fromEnv.replace(/\/+$/, "");
export const SITE_HOST = new URL(SITE_URL).host;
