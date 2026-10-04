"use client";

import { useEffect, useState } from "react";
import Link from "@/components/store-link";
import { products, getSelectedVariant, variantImage, priceLabel } from "@/lib/catalog";
import { ProductImage } from "./product-image";

export function RecentlyViewed({ currentId }: { currentId: string }) {
  const [recent, setRecent] = useState<typeof products>([]);
  useEffect(() => {
    let viewed: typeof products = [];
    try {
      const raw: unknown = JSON.parse(localStorage.getItem("magnet-recently-viewed") || "[]");
      const ids = Array.isArray(raw) ? raw.filter((id): id is string => typeof id === "string") : [];
      viewed = ids.filter(id => id !== currentId).flatMap(id => products.find(product => product.id === id) ?? []).slice(0, 4);
      localStorage.setItem("magnet-recently-viewed", JSON.stringify([currentId, ...ids.filter(id => id !== currentId)].slice(0, 8)));
    } catch { /* Browsing history is optional if storage is unavailable. */ }
    const frame = requestAnimationFrame(() => setRecent(viewed));
    return () => cancelAnimationFrame(frame);
  }, [currentId]);
  if (!recent.length) return null;
  return <section className="recently-viewed" aria-labelledby="recently-viewed-heading">
    <div className="section-heading"><h2 id="recently-viewed-heading">Recently viewed</h2></div>
    <div className="recently-viewed-grid">{recent.map(product => {
      const variant = getSelectedVariant(product);
      return <Link key={product.id} href={`/products/${product.slug}`} className="recently-viewed-card">
        <ProductImage src={variantImage(product, variant)} fallbackSrc={product.image} alt={`${product.name} ${variant.weight}`} width={72} height={84} />
        <span><strong>{product.name}</strong><small>{variant.weight} · {priceLabel(variant.salePrice)}</small></span>
      </Link>;
    })}</div>
  </section>;
}
