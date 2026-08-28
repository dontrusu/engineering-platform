import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ProjectStatusIndicator,
  type ProjectStatus,
} from "@/components/common/project-status";

export type ProjectCardProps = {
  name: string;
  title: string;
  description: string;
  status?: ProjectStatus;
  href?: string;
};

export function ProjectCard({
  name,
  title,
  description,
  status,
  href,
}: ProjectCardProps) {
  return (
    <article aria-label={name} className="h-full">
      <Card className="h-full border border-[var(--line)] bg-white/70 shadow-sm">
        <CardHeader>
          <Badge
            variant="outline"
            className="w-fit uppercase tracking-[0.16em]"
          >
            {name}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <CardTitle
            role="heading"
            aria-level={3}
            className="mt-0 text-xl font-medium leading-snug tracking-[-0.02em]"
          >
            {href ? (
              <Link
                href={href}
                className="text-[var(--highlight)] underline underline-offset-4"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </CardTitle>
          <p className="text-sm text-[var(--muted)]">{description}</p>
          {status ? <ProjectStatusIndicator status={status} /> : null}
        </CardContent>
      </Card>
    </article>
  );
}
