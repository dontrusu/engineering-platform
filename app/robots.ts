import type { MetadataRoute } from "next";

import { siteOrigin } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Removed and invalid routes use normal 404 responses, so crawlers need no
  // speculative disallow rules.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
