import Link from "next/link";

import { ProjectStatusIndicator } from "@/components/common/project-status";
import { projects } from "@/lib/projects";

export default function AtlasPage() {
  const atlas = projects.find((project) => project.slug === "atlas");

  if (!atlas) {
    throw new Error("Atlas project data is missing");
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen text-foreground"
    >
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <Link href="/projects" className="text-sm text-primary underline">
          Back to projects
        </Link>
        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Project Page
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
          {atlas.name}
        </h1>
        <div className="mt-6">
          <ProjectStatusIndicator status={atlas.status} />
        </div>
        <section aria-labelledby="atlas-framing" className="mt-10 space-y-5">
          <h2
            id="atlas-framing"
            className="text-2xl font-semibold tracking-[-0.04em]"
          >
            Problem framing
          </h2>
          <p className="text-lg text-muted-foreground">{atlas.problem}</p>
          <p className="text-lg text-muted-foreground">
            Atlas is an informational Project Page, not yet a Case Study. The
            full decisions, trade-offs, implementation, and supporting Evidence
            are not published until they are ready to be represented truthfully.
          </p>
        </section>
        <section
          aria-labelledby="atlas-state"
          className="mt-10 border-t border-border pt-8"
        >
          <h2
            id="atlas-state"
            className="text-2xl font-semibold tracking-[-0.04em]"
          >
            Current state
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {atlas.currentState}
          </p>
        </section>
        {atlas.deployedHref ? (
          <a
            href={atlas.deployedHref}
            className="mt-8 inline-block text-primary underline"
          >
            Visit project
          </a>
        ) : null}
      </div>
    </main>
  );
}
