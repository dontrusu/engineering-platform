import Link from "next/link";

import { ProjectStatusIndicator } from "@/components/common/project-status";

export default function AtlasPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Atlas
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
          Atlas stub
        </h1>
        <div className="mt-6">
          <ProjectStatusIndicator status="atlas-stub" />
        </div>
        <section aria-labelledby="atlas-framing" className="mt-10 space-y-4">
          <h2
            id="atlas-framing"
            className="text-2xl font-semibold tracking-[-0.04em]"
          >
            Problem framing and intended value
          </h2>
          <p className="text-lg text-[var(--muted)]">
            Atlas is intended to make the reasoning behind a technical system
            easier to inspect: the problem, constraints, and decisions should be
            understandable before the implementation is discussed.
          </p>
          <p className="text-lg text-[var(--muted)]">
            The case study is not yet built, so this page intentionally does not
            present architecture, metrics, source links, or provisional claims
            as evidence.
          </p>
        </section>
        <div className="mt-8">
          <Link href="/work" className="text-[var(--highlight)] underline">
            Back to work
          </Link>
        </div>
      </div>
    </main>
  );
}
