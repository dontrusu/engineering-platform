import type { Metadata } from "next";

import { listVisibleProjects } from "@/data/projects/projects.server";
import { createPageMetadata } from "@/lib/site";

import { HomePageContent } from "./home-page-content";

// Home uses an absolute title so the child-route title template is not added.
export const metadata: Metadata = createPageMetadata({
  title: "Engineering Lab — Denys Shybkovskyy",
  description:
    "The engineering portfolio of frontend engineer Denys Shybkovskyy, featuring projects, documented decisions, and evidence.",
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  const projects = await listVisibleProjects();

  return <HomePageContent projects={projects} />;
}
