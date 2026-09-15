import type { MetadataRoute } from "next";

import { listVisibleProjects } from "@/data/projects/projects.server";
import { siteOrigin } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await listVisibleProjects();

  // Deriving entries from the same collection as the pages prevents discovery
  // from drifting when canonical Projects are added or removed.
  return [
    "",
    "/projects",
    ...projects.map(({ slug }) => `/projects/${slug}`),
  ].map((path) => ({ url: `${siteOrigin}${path}` }));
}
