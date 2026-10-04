"use client";
import { useState } from "react";
import Link from "@/components/store-link";
import { Eye } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { getSelectedVariant } from "@/lib/catalog";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "./ui/sheet";
import { ProductGallery } from "./product-gallery";
import { ProductActions } from "./product-actions";
import { ProductPrice, ProductVariantSelector } from "./product-price";

export function QuickView({ product, selectedVariantId }: { product: Product; selectedVariantId?: string }) {
  const [variantId, setVariantId] = useState(selectedVariantId ?? product.variants[0].id);
  const variant = getSelectedVariant(product, variantId);
  return <Sheet><SheetTrigger asChild><button className="quick-view-trigger" aria-label={`Quick view ${product.name}`}><Eye size={16} />Quick view</button></SheetTrigger>
    <SheetContent className="quick-view-sheet"><SheetTitle>{product.name}</SheetTitle><SheetDescription>{product.category} · {variant.weight}</SheetDescription>
      <ProductGallery product={product} variant={variant} /><p>{product.shortDescription}</p><ProductVariantSelector variants={product.variants} selectedId={variant.id} onSelect={setVariantId} /><p className="quick-view-price" key={variant.id}><ProductPrice variant={variant} /></p><ProductActions product={product} variantId={variant.id} />
      {product.ingredients && <p><strong>Ingredients: </strong>{product.ingredients}</p>}
      <SheetClose asChild><Link className="text-link" href={`/products/${product.slug}`}>View full product details</Link></SheetClose>
    </SheetContent>
  </Sheet>;
}
