import type { Metadata } from "next";

// Canonical URLs are repository-owned so builds cannot silently publish a
// different origin because of missing or incorrect environment configuration.
export const siteOrigin = "https://denysshybkovskyy.dev";

// Every public page uses the same truthful, repository-owned social card.
export const sharedSocialImage = {
  url: "/social-card.png",
  width: 1200,
  height: 630,
  alt: "Engineering Lab — Denys Shybkovskyy",
} as const;

// Keep canonical, Open Graph, and Twitter metadata consistent while allowing
// each route to supply only its own title, description, and canonical path.
export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: "Engineering Lab",
      images: [sharedSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [sharedSocialImage],
    },
  };
}
