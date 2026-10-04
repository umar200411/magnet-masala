"use client";

import { useEffect, useState } from "react";
import type { Product, ProductVariant } from "@/lib/catalog";
import { priceLabel } from "@/lib/catalog";
import { AddButton } from "./store";

export function ProductStickyCTA({ product, variant }: { product: Product; variant: ProductVariant }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const purchaseControls = document.querySelector(".detail-copy .product-actions");
    if (!purchaseControls || !("IntersectionObserver" in window)) return;
    let hasEnteredViewport = false;
    let purchaseIsVisible = false;
    let footerIsVisible = false;
    const footer = document.querySelector("footer");
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === purchaseControls) {
          purchaseIsVisible = entry.isIntersecting;
          if (entry.isIntersecting) hasEnteredViewport = true;
        } else if (entry.target === footer) footerIsVisible = entry.isIntersecting;
      }
      setVisible(hasEnteredViewport && !purchaseIsVisible && !footerIsVisible);
    }, { threshold: 0.15 });
    observer.observe(purchaseControls);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;
  return <div className="product-sticky-cta" aria-label="Quick purchase">
    <span><small>{variant.weight}</small><strong>{priceLabel(variant.salePrice)}</strong></span>
    <AddButton id={product.id} variantId={variant.id} />
  </div>;
}
