import { products } from "@/lib/catalog";
import { information } from "@/lib/information";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const paths = ["/", "/shop", "/contact", ...Object.keys(information).map(key => `/${key}`), ...products.map(product => `/products/${product.slug}`)];
  const escapeXml = (value: string) => value.replace(/[<>&"']/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${escapeXml(origin + path)}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
