"use client";
import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { ProductImage } from "./product-image";

export function ProductGallery({ product }: { product: Product }) {
  const images = [{ src: product.image, alt: `${product.name} packaging` }, ...(product.gallery ?? [])];
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const current = images[selected] ?? images[0];
  return <div className="product-gallery">
    <div className={`detail-media gallery-stage${zoomed ? " is-zoomed" : ""}`}>
      <ProductImage key={current.src} src={current.src} alt={current.alt} fill sizes="(max-width:700px) 90vw, 45vw" style={{ objectFit: "contain", transform: `scale(${product.mediaScale * (zoomed ? 1.5 : 1)})` }} />
      <button className="gallery-zoom" aria-label={zoomed ? "Zoom out" : "Zoom in on product"} aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}</button>
    </div>
    {images.length > 1 && <div className="gallery-thumbnails" aria-label="Product photos">{images.map((image, index) => <button key={image.src} aria-label={`View ${image.alt}`} aria-pressed={selected === index} onClick={() => { setSelected(index); setZoomed(false); }}><ProductImage src={image.src} alt={image.alt} width={64} height={80} /></button>)}</div>}
    <p className="muted gallery-caption">{current.alt} · Tap the magnifier for a closer look.</p>
  </div>;
}
