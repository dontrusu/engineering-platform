import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectBySlug, projects } from "@/lib/projects";
import { createPageMetadata } from "@/lib/site";

import { ProjectPageDetails } from "./project-page-details";

export function generateStaticParams() {
  // Every canonical Project, including Planned Projects, receives a static
  // public Project Page at build time.
  return projects.map(({ slug }) => ({ slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen text-foreground"
    >
      <ProjectPageDetails project={project} />
    </main>
  );
}
