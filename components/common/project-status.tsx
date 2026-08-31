import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/lib/projects";

export function ProjectStatusIndicator({ status }: { status: ProjectStatus }) {
  return (
    <div aria-label={`Project status: ${status}`} className="space-y-2">
      <Badge
        variant="secondary"
        className="border-[color-mix(in_srgb,var(--planned)_45%,var(--line))] bg-transparent font-mono text-[var(--planned)] uppercase tracking-[0.12em]"
      >
        {status}
      </Badge>
    </div>
  );
}
