import Link from "next/link";

import { ProjectCard } from "@/components/common/project-card";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen text-foreground"
    >
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-10 md:py-20">
        <section
          id="about"
          aria-label="About"
          className="border-b border-border pb-16 md:pb-24"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            01 / About
          </p>
          <p className="mt-10 font-mono text-lg tracking-[0.08em] text-muted-foreground uppercase">
            Denys Shybkovskyy
          </p>
          <h1 className="mt-4 max-w-4xl text-6xl font-extrabold uppercase leading-[0.88] tracking-[-0.04em] sm:text-8xl">
            Frontend <span className="text-primary">Engineer</span>
          </h1>

          <blockquote className="mt-10 max-w-2xl border-l-2 border-primary pl-5 sm:pl-6">
            <p className="text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground">
              A CV can tell you I know React, TypeScript, or Vue. It can't show
              how I think, or what I'm capable of building. So I built something
              that lets you see it.
            </p>
          </blockquote>

          <div className="mt-10 max-w-2xl space-y-6 text-base leading-8 text-muted-foreground">
            <p>
              I've been building software across large enterprise applications,
              e-commerce, and AI-powered and security-focused platforms. The
              stack changes — the fundamentals don't: breaking down a problem,
              reasoning about trade-offs, designing boundaries, understanding a
              system before changing it, and making a defensible call when there
              isn't a perfect answer.
            </p>

            <aside
              aria-labelledby="why-this-site-heading"
              className="border border-border bg-card p-5 font-mono"
            >
              <h2
                id="why-this-site-heading"
                className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary"
              >
                What this site is
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">
                This is my engineering lab — a collection of projects built to
                explore different problems, technologies, and architectural
                approaches. Each one is a real engineering decision, with real
                trade-offs. The point isn't proving I can work in one stack.
                It's showing I can pick up new tools, understand the actual
                problem, and make informed calls with them.
              </p>
            </aside>

            <p className="font-mono text-sm leading-7 text-muted-foreground sm:text-base">
              <span aria-hidden="true" className="text-primary">
                ${" "}
              </span>
              Engineering Lab = Projects + documented decisions + Evidence
            </p>
          </div>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="border-b border-border py-16"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Projects
              </p>
              <h2
                id="projects-heading"
                className="mt-3 text-3xl font-semibold tracking-[-0.04em]"
              >
                What I am building
              </h2>
            </div>
            <Link href="/projects" className="text-sm text-primary underline">
              View all projects
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </section>

        <section
          id="experience"
          aria-labelledby="experience-heading"
          className="border-b border-border py-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.04em]"
          >
            A truthful record is still being assembled.
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Roles, dates, and working statements will be published once the
            wording and supporting context are approved.
          </p>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.04em]"
          >
            Contact actions will appear when verified.
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            No résumé, email, LinkedIn, or GitHub destination is published here
            until it is confirmed and ready to receive visitors.
          </p>
        </section>
      </div>
    </main>
  );
}
