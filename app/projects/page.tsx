import Link from "next/link";
import type { Metadata } from "next";

import { ProjectRow } from "@/components/common/project-row";
import { projects } from "@/lib/projects";
import { createPageMetadata } from "@/lib/site";

// The root layout turns this short title into "Projects | Engineering Lab".
export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Explore Engineering Lab projects, their problem framing, current status, and available details.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen text-foreground"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <header className="mb-10 border-b border-border pb-8">
          <Link href="/" className="text-sm text-primary underline">
            Engineering Lab
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
            Project index
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Current Projects, their problem framing, and what is ready to be
            explored today.
          </p>
        </header>
        <section aria-labelledby="project-list">
          <h2 id="project-list" className="sr-only">
            Projects
          </h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <ProjectRow key={project.slug} {...project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
