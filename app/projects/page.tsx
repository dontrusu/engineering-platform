import Link from "next/link";

import { ProjectCard } from "@/components/common/project-card";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <header className="mb-10 border-b border-[var(--line)] pb-8">
          <Link href="/" className="text-sm text-[var(--highlight)] underline">
            Engineering Lab
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
            Project index
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
            Current Projects, their problem framing, and what is ready to be
            explored today.
          </p>
        </header>
        <section aria-labelledby="project-list">
          <h2 id="project-list" className="sr-only">
            Projects
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
          </div>
        </section>
      </div>
    </main>
  );
}
