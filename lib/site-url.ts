// Read during static SEO generation, never from an incoming request.
const url = new URL(process.env.SITE_URL || "https://magnetmasala.com");
if (!["http:", "https:"].includes(url.protocol) || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
  throw new Error("SITE_URL must be a root-domain URL, for example https://magnetmasala.com");
}
export const siteUrl = url.origin;
