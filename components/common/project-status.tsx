import { Badge } from "@/components/ui/badge";

export type ProjectStatus = "atlas-stub" | "unavailable";

const statusCopy: Record<
  ProjectStatus,
  { label: string; description: string }
> = {
  "atlas-stub": {
    label: "Atlas stub",
    description:
      "A truthful public page exists, but the case study is not yet built.",
  },
  unavailable: {
    label: "Unavailable project",
    description:
      "No detail route is published until the real case study exists.",
  },
};

export function ProjectStatusIndicator({ status }: { status: ProjectStatus }) {
  const copy = statusCopy[status];

  return (
    <div aria-label={copy.label} className="space-y-2">
      <Badge variant="secondary" className="uppercase tracking-[0.12em]">
        {copy.label}
      </Badge>
      <p className="text-sm text-[var(--muted)]">{copy.description}</p>
    </div>
  );
}
