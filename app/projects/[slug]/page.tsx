import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { findVisibleProjectBySlug } from "@/data/projects/projects.server";
import { createPageMetadata } from "@/lib/site";

import { ProjectPageContent } from "./project-page-content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await findVisibleProjectBySlug(slug);

  if (!project) {
    // Metadata resolution follows the same not-found contract as page render.
    notFound();
  }

  // Project data remains the single source of truth for Project Page copy.
  return createPageMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await findVisibleProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen text-foreground"
    >
      <ProjectPageContent project={project} />
    </main>
  );
}
