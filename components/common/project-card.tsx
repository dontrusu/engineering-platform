import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ProjectCardProps = {
  name: string;
  title: string;
  description: string;
};

export function ProjectCard({ name, title, description }: ProjectCardProps) {
  return (
    <article aria-label={name} className="h-full">
      <Card className="h-full border border-[var(--line)] bg-white/70 shadow-sm">
        <CardHeader>
          <Badge variant="outline" className="w-fit uppercase tracking-[0.16em]">
            {name}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <CardTitle
            role="heading"
            aria-level={3}
            className="mt-0 text-xl font-medium leading-snug tracking-[-0.02em]"
          >
            {title}
          </CardTitle>
          <p className="text-sm text-[var(--muted)]">{description}</p>
        </CardContent>
      </Card>
    </article>
  );
}
