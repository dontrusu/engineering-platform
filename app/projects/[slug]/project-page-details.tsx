import Link from "next/link";

import { ProjectStatusIndicator } from "@/components/common/project-status";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

export function ProjectPageDetails({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
      <Link href="/projects" className="text-sm text-primary underline">
        Back to projects
      </Link>
      <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Project Page
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <h1 className="text-5xl font-semibold tracking-[-0.05em]">
          {project.name}
        </h1>
        <ProjectStatusIndicator status={project.status} />
      </div>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
        {project.description}
      </p>
      <section
        aria-labelledby="technologies-heading"
        className="mt-10 border-t border-border pt-8"
      >
        <h2
          id="technologies-heading"
          className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
        >
          Technologies
        </h2>
        <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Badge variant="secondary">{technology}</Badge>
            </li>
          ))}
        </ul>
      </section>
      {project.deployedHref ? (
        <a
          href={project.deployedHref}
          className="mt-10 inline-flex min-h-11 items-center border border-primary px-4 font-mono text-xs uppercase tracking-[0.12em] text-primary hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground"
        >
          Visit project
        </a>
      ) : null}
    </article>
  );
}
