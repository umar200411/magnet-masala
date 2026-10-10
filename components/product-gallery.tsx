"use client";
import { useRef, useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import type { Product, ProductVariant } from "@/lib/catalog";
import { variantImage } from "@/lib/catalog";
import { ProductImage } from "./product-image";

export function ProductGallery({ product, variant }: { product: Product; variant: ProductVariant }) {
  return <GalleryView key={variant.id} product={product} variant={variant} />;
}

function GalleryView({ product, variant }: { product: Product; variant: ProductVariant }) {
  const variantImages = product.variants.filter(item => item.id !== variant.id && variantImage(product, item) !== variantImage(product, variant)).map(item => ({ src: variantImage(product, item), alt: `${product.name} ${item.weight} packaging` }));
  const images = [{ src: variantImage(product, variant), alt: `${product.name} ${variant.weight} packaging` }, ...variantImages, ...(product.gallery ?? [])].filter((image, index, all) => all.findIndex(candidate => candidate.src === image.src) === index);
  const [selected, setSelected] = useState(0), [zoomed, setZoomed] = useState(false);
  const touchStart = useRef<number | null>(null);
  const current = images[selected] ?? images[0];
  return <div className="product-gallery"><div className={`detail-media gallery-stage${zoomed ? " is-zoomed" : ""}`} onTouchStart={event => { touchStart.current = event.changedTouches[0]?.clientX ?? null; }} onTouchEnd={event => { const end = event.changedTouches[0]?.clientX; if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 36 && images.length > 1) { setSelected(index => Math.max(0, Math.min(images.length - 1, index + (end < touchStart.current! ? 1 : -1)))); setZoomed(false); } touchStart.current = null; }}>
    <ProductImage key={current.src} src={current.src} fallbackSrc={product.image} alt={current.alt} fill priority={selected === 0} sizes="(max-width:700px) 90vw, 45vw" style={{ objectFit: "contain", transform: `scale(${product.mediaScale * (zoomed ? 1.5 : 1)})` }} />
    <button className="gallery-zoom" aria-label={zoomed ? "Zoom out" : "Zoom in on product"} aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}</button>
  </div>{images.length > 1 && <div className="gallery-thumbnails" aria-label="Product photos">{images.map((image, index) => <button key={image.src} aria-label={`View ${image.alt}`} aria-pressed={selected === index} onClick={() => { setSelected(index); setZoomed(false); }}><ProductImage src={image.src} alt={image.alt} width={64} height={80} /></button>)}</div>}<p className="muted gallery-caption">{current.alt} · Tap the magnifier for a closer look.</p></div>;
}
