"use client";
import { ProductPrice } from "@/components/product-price";
import Link from "next/link";
import { Eye } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "./ui/sheet";
import { ProductGallery } from "./product-gallery";
import { ProductActions } from "./product-actions";

export function QuickView({ product }: { product: Product }) {
  return <Sheet><SheetTrigger asChild><button className="quick-view-trigger" aria-label={`Quick view ${product.name}`}><Eye size={16} />Quick view</button></SheetTrigger>
    <SheetContent className="quick-view-sheet">
      <SheetTitle>{product.name}</SheetTitle>
      <SheetDescription>{product.category} · {product.weight}</SheetDescription>
      <ProductGallery product={product} />
      <p className="quick-view-price"><ProductPrice product={product}/></p><p>{product.shortDescription}</p>
      <ProductActions id={product.id} />
      {product.ingredients && <p><strong>Ingredients: </strong>{product.ingredients}</p>}
      <SheetClose asChild><Link className="text-link" href={`/products/${product.slug}`}>View full product details</Link></SheetClose>
    </SheetContent>
  </Sheet>;
}
