import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { information } from "@/lib/information";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/shop/", "/contact/",
    ...Object.keys(information).map(info => `/${info}/`),
    ...products.map(product => `/products/${product.slug}/`)];
  return paths.map(path => ({ url: `${siteUrl}${path}` }));
}
