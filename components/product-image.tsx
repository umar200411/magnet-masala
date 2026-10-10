"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import productImageWidths from "@/lib/product-image-widths.json";

type ProductImageProps = ImageProps & { fallbackSrc?: string };
const GENERIC_IMAGE_FALLBACK = "/logo.jpg";

export function ProductImage({
  ...props
}: ProductImageProps) {
  const imageKey = `${typeof props.src === "string" ? props.src : "static-image"}|${props.fallbackSrc ?? ""}`;
  return <ProductImageInstance key={imageKey} {...props} />;
}

function ProductImageInstance({
  src,
  fallbackSrc,
  alt,
  className,
  style,
  fill,
  width,
  height,
  priority,
  loading,
  fetchPriority,
  onLoad,
  onError,
  ...imageProps
}: ProductImageProps) {
  const candidates = useMemo(
    () => [...new Set([src, fallbackSrc, GENERIC_IMAGE_FALLBACK].filter((value): value is string => typeof value === "string" && value.length > 0))],
    [src, fallbackSrc],
  );
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [useOriginal, setUseOriginal] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const currentSrc = candidates[candidateIndex] ?? GENERIC_IMAGE_FALLBACK;
  const localAsset = currentSrc.startsWith("/") && !currentSrc.startsWith("//");
  const optimizedWidth = productImageWidths[currentSrc as keyof typeof productImageWidths];
  const optimized = optimizedWidth && !useOriginal;
  const imageBase = currentSrc.replace(/\.jpg$/i, "").replace("/products/", "/products/optimized/");

  // Cached loads and early failures can finish before React attaches handlers.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const image = imageRef.current;
      if (!image?.complete) return;
      if (image.naturalWidth > 0) setLoaded(true);
      else if (optimized) setUseOriginal(true);
      else if (candidateIndex + 1 < candidates.length) setCandidateIndex(candidateIndex + 1);
      else setFailed(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [currentSrc, useOriginal, optimized, candidateIndex, candidates.length]);

  const imageClassName = `${className ?? ""} ${loaded ? "image-loaded" : "image-loading"}`.trim();
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    onError?.(event);
    setLoaded(false);
    if (optimized) setUseOriginal(true);
    else if (candidateIndex + 1 < candidates.length) setCandidateIndex(candidateIndex + 1);
    else setFailed(true);
  };
  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    onLoad?.(event);
  };

  if (failed) return <span className="image-unavailable" role="img" aria-label={alt}>Image unavailable</span>;

  if (localAsset) {
    // eslint-disable-next-line @next/next/no-img-element -- Static export serves prebuilt responsive WebP assets.
    return <img
      ref={imageRef}
      src={optimized ? `${imageBase}.webp` : currentSrc}
      srcSet={optimized ? `${imageBase}-360.webp 360w, ${imageBase}-720.webp 720w, ${imageBase}.webp ${optimizedWidth}w` : undefined}
      sizes={imageProps.sizes ?? (fill ? "100vw" : `${width ?? 120}px`)}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={imageClassName}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
      loading={loading ?? (priority ? "eager" : "lazy")}
      fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
    />;
  }

  return <Image
    {...imageProps}
    ref={imageRef}
    src={currentSrc}
    alt={alt}
    fill={fill}
    width={fill ? undefined : width}
    height={fill ? undefined : height}
    preload={priority ?? imageProps.preload}
    loading={loading}
    fetchPriority={fetchPriority}
    className={imageClassName}
    style={style}
    onLoad={handleLoad}
    onError={handleError}
  />;
}
