import type { Metadata } from "next";

import { listVisibleProjects } from "@/data/projects/projects.server";
import { createPageMetadata } from "@/lib/site";

import { ProjectsPageContent } from "./projects-page-content";

// The root layout turns this short title into "Projects | Engineering Lab".
export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Explore Engineering Lab projects, their problem framing, current status, and available details.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await listVisibleProjects();

  return <ProjectsPageContent projects={projects} />;
}
