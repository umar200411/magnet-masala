"use client";

import Image, { type ImageProps } from "next/image";
import { useMemo, useState, type SyntheticEvent } from "react";

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
  const currentSrc = candidates[candidateIndex] ?? GENERIC_IMAGE_FALLBACK;
  const localAsset = currentSrc.startsWith("/") && !currentSrc.startsWith("//");

  const imageClassName = `${className ?? ""} ${loaded ? "image-loaded" : "image-loading"}`.trim();
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    onError?.(event);
    setLoaded(false);
    if (candidateIndex + 1 < candidates.length) setCandidateIndex(candidateIndex + 1);
    else setFailed(true);
  };
  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    onLoad?.(event);
  };

  if (failed) return <span className="image-unavailable" role="img" aria-label={alt}>Image unavailable</span>;

  if (localAsset) {
    return <img
      src={currentSrc}
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
    src={currentSrc}
    alt={alt}
    fill={fill}
    width={fill ? undefined : width}
    height={fill ? undefined : height}
    priority={priority}
    loading={loading}
    fetchPriority={fetchPriority}
    className={imageClassName}
    style={style}
    onLoad={handleLoad}
    onError={handleError}
  />;
}
