"use client";
import { useState } from "react";
import Link from "@/components/store-link";
import { Product } from "@/lib/catalog";
import { getSelectedVariant, variantImage } from "@/lib/catalog";
import { AddButton } from "./store";
import { ProductPrice, ProductVariantSelector, SaleBadge } from "./product-price";
import { ProductImage } from "./product-image";
import { QuickView } from "./quick-view";

export function ProductCard({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [hovered, setHovered] = useState(false);
  const variant = getSelectedVariant(product, variantId);
  const alternateVariant = product.variants.find(item => item.id !== variant.id && variantImage(product, item) !== variantImage(product, variant));
  const alternateImage = product.gallery?.[0]?.src ?? (alternateVariant ? variantImage(product, alternateVariant) : undefined);
  const image = hovered && alternateImage ? alternateImage : variantImage(product, variant);
  return <article className="product-card">
    <Link className="product-media" href={`/products/${product.slug}`} onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }} onMouseLeave={() => setHovered(false)}><ProductImage key={image} src={image} fallbackSrc={product.image} alt={`${product.name}, ${hovered && alternateImage ? "alternate" : variant.weight} pack`} fill sizes="(max-width:600px) 46vw, (max-width:1000px) 30vw, 24vw" style={{ objectFit: "contain", transform: `scale(${product.mediaScale})` }} /><SaleBadge variant={variant} /></Link>
    <div className="card-info"><span className="eyebrow">{product.category}</span><Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link><p className="product-description">{product.shortDescription}</p><div className="card-price" key={variant.id}><ProductPrice variant={variant} showDiscount={false} /></div><div className="quick-add-panel"><div className="quick-add-panel-inner"><ProductVariantSelector variants={product.variants} selectedId={variant.id} onSelect={id => { setVariantId(id); setHovered(false); }} /><AddButton id={product.id} variantId={variant.id} compact /><QuickView key={variant.id} product={product} selectedVariantId={variant.id} /></div></div></div>
  </article>;
}
