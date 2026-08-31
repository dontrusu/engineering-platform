import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectStatusIndicator } from "@/components/common/project-status";
import type { ProjectStatus } from "@/lib/projects";

export type ProjectCardProps = {
  name: string;
  problem: string;
  technologies: string[];
  status: ProjectStatus;
  currentState: string;
  pageHref?: string;
  deployedHref?: string;
};

export function ProjectCard({
  name,
  problem,
  technologies,
  status,
  currentState,
  pageHref,
  deployedHref,
}: ProjectCardProps) {
  return (
    <article aria-label={name} className="h-full">
      <Card className="h-full border border-border bg-card shadow-none">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <Badge
              variant="outline"
              className="w-fit uppercase tracking-[0.16em]"
            >
              {name}
            </Badge>
            <ProjectStatusIndicator status={status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <CardTitle
            role="heading"
            aria-level={3}
            className="mt-0 text-xl font-medium leading-snug tracking-[-0.02em]"
          >
            {name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{problem}</p>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Technology
            </p>
            <ul
              aria-label={`${name} technologies`}
              className="mt-2 flex flex-wrap gap-2"
            >
              {technologies.map((technology) => (
                <li key={technology}>
                  <Badge variant="secondary">{technology}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">{currentState}</p>
          <div className="flex flex-wrap gap-4 pt-2 text-sm">
            {pageHref ? (
              <Link
                href={pageHref}
                className="text-primary underline underline-offset-4"
              >
                View Project Page
              </Link>
            ) : null}
            {deployedHref ? (
              <a
                href={deployedHref}
                className="text-primary underline underline-offset-4"
              >
                Visit project
              </a>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
