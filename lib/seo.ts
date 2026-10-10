import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string, image = "/logo.jpg"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Magnet Masala",
      type: "website",
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary", title, description, images: [image] },
  };
}
