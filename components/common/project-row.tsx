import Link from "next/link";

import { ProjectStatusIndicator } from "@/components/common/project-status";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

export type ProjectRowProps = Pick<
  Project,
  "name" | "slug" | "status" | "technologies" | "description"
>;

export function ProjectRow({
  name,
  slug,
  status,
  technologies,
  description,
}: ProjectRowProps) {
  return (
    <article
      aria-label={name}
      className="grid gap-6 border border-border bg-card p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start"
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-semibold tracking-[-0.03em]">{name}</h3>
          <ProjectStatusIndicator status={status} />
        </div>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          {description}
        </p>
        <ul
          aria-label={`${name} technologies`}
          className="mt-5 flex flex-wrap gap-2"
        >
          {technologies.map((technology) => (
            <li key={technology}>
              <Badge variant="secondary">{technology}</Badge>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={`/projects/${slug}`}
        className="inline-flex min-h-11 items-center justify-center border border-primary px-4 font-mono text-xs uppercase tracking-[0.12em] text-primary underline-offset-4 hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground lg:min-w-48"
      >
        View Project Page
      </Link>
    </article>
  );
}
