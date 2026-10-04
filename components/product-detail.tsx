"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { getSelectedVariant } from "@/lib/catalog";
import { site } from "@/lib/config";
import { ProductActions } from "./product-actions";
import { ProductGallery } from "./product-gallery";
import { ProductPrice, ProductVariantSelector } from "./product-price";
import { ProductStickyCTA } from "./product-sticky-cta";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant = getSelectedVariant(product, variantId);

  return (
    <>
      <ProductGallery product={product} variant={variant} />
      <div className="detail-copy">
        <p className="eyebrow red">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.shortDescription}</p>
        <h2 className="pack-size-heading">Select pack size</h2>
        <ProductVariantSelector variants={product.variants} selectedId={variant.id} onSelect={setVariantId} />
        <div className="detail-price" key={variant.id}>
          <ProductPrice variant={variant} />
        </div>
        {!variant.inStock && <p className="out-of-stock" role="status">{variant.weight} is currently out of stock.</p>}
        <ProductActions product={product} variantId={variant.id} />
        <p className="delivery-note">{site.deliveryNote}</p>
        <details open>
          <summary>Made for your menu</summary>
          <p>Explore {product.name} from the Magnet Masala range.</p>
          <div className="tags">{product.recommendedFor.map(tag => <span key={tag}>{tag}</span>)}</div>
        </details>
        {product.ingredients && <details><summary>Ingredients</summary><p>{product.ingredients}</p></details>}
        {product.directions && <details><summary>How to use</summary><p>{product.directions}</p></details>}
        {product.storageInformation && <details><summary>Storage information</summary><p>{product.storageInformation}</p></details>}
      </div>
      <ProductStickyCTA product={product} variant={variant} />
    </>
  );
}
