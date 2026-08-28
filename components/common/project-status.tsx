import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/lib/projects";

export function ProjectStatusIndicator({ status }: { status: ProjectStatus }) {
  return (
    <div aria-label={`Project status: ${status}`} className="space-y-2">
      <Badge variant="secondary" className="uppercase tracking-[0.12em]">
        {status}
      </Badge>
    </div>
  );
}
