import { ProjectCard } from "@/components/common/project-card";

const projects = [
  {
    name: "Atlas",
    title: "Truthful stub pending case study",
    description:
      "The public page explains the intended value without fabricated project claims.",
    status: "atlas-stub" as const,
    href: "/work/atlas",
  },
  {
    name: "Pulse",
    title: "Unavailable project",
    description: "No detail route is live until the real case study exists.",
    status: "unavailable" as const,
  },
  {
    name: "Composite",
    title: "Unavailable project",
    description: "No detailed work is published without honest evidence.",
    status: "unavailable" as const,
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Work
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
            Project index
          </h1>
        </header>
        <section aria-labelledby="project-list">
          <h2 id="project-list" className="sr-only">
            Projects
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
