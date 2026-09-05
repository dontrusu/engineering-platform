import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects";
import { siteOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Deriving entries from the same collection as the pages prevents discovery
  // from drifting when canonical Projects are added or removed.
  return [
    "",
    "/projects",
    ...projects.map(({ slug }) => `/projects/${slug}`),
  ].map((path) => ({ url: `${siteOrigin}${path}` }));
}
