import { notFound } from "next/navigation";

import { getProjectBySlug, projects } from "@/lib/projects";

import { ProjectPageDetails } from "./project-page-details";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
