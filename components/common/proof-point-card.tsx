import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export type ProofPointCardProps = {
  eyebrow: string;
  body: string;
};

export function ProofPointCard({ eyebrow, body }: ProofPointCardProps) {
  return (
    <article aria-label={eyebrow} className="h-full">
      <Card className="h-full border border-[var(--line)] bg-[var(--panel)] shadow-sm">
        <CardHeader className="pb-0">
          <Badge variant="secondary" className="w-fit uppercase tracking-[0.12em]">
            {eyebrow}
          </Badge>
        </CardHeader>
        <CardContent className="pt-3">
          <p className="text-base text-[var(--foreground)]">{body}</p>
        </CardContent>
      </Card>
    </article>
  );
}
