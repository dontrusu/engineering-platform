import Link from "next/link";

import { ProjectCard } from "@/components/common/project-card";
import { projects } from "@/lib/projects";

const navigation = [
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-8 sm:px-8 md:grid-cols-[180px_1fr] md:px-10">
        <aside className="hidden md:block">
          <nav aria-label="Section navigation" className="sticky top-8">
            <Link href="/" className="font-medium no-underline">
              Engineering Lab
            </Link>
            <ul className="mt-10 space-y-4 text-sm text-[var(--muted)]">
              {navigation.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="underline-offset-4 hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div>
          <nav
            aria-label="Mobile section navigation"
            className="mb-12 flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--line)] pb-4 text-sm text-[var(--muted)] md:hidden"
          >
            {navigation.map(([label, href]) => (
              <a key={label} href={href} className="underline-offset-4 hover:underline">
                {label}
              </a>
            ))}
          </nav>

          <header className="border-b border-[var(--line)] pb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Engineering Lab
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              Denys Shybkovskyy
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-[var(--muted)]">
              A place to see how I think through hard technical problems.
            </p>
          </header>

          <section id="about" aria-labelledby="about-heading" className="border-b border-[var(--line)] py-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">About</p>
            <h2 id="about-heading" className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              Engineering work, made inspectable.
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 text-lg text-[var(--muted)]">
              <p>
                I&apos;ve been building software for quite a few years now,
                across large enterprise applications, e-commerce, and
                AI-powered and security-focused platforms.
              </p>
              <p>
                Technologies and frameworks change. What doesn&apos;t is the
                fundamentals — breaking down a problem, reasoning about
                trade-offs, designing boundaries, understanding a system before
                changing it, and making a defensible call when there isn&apos;t
                a perfect answer.
              </p>
              <p>
                A CV can tell you I know React, TypeScript, or Vue. It can&apos;t
                really show how I think or what I&apos;m capable of building. So
                instead of asking you to take that on trust, I built something
                that lets you see it.
              </p>
              <p>
                This platform is my engineering lab — a collection of projects
                built to explore different problems, technologies, and
                architectural approaches. Each one is a chance to make real
                engineering decisions and show the trade-offs behind them.
              </p>
              <p>
                The point isn&apos;t proving I can work in one stack — it&apos;s
                showing I can pick up new tools, understand the actual problem,
                and make informed calls with them. Because technologies will
                keep changing; what matters is understanding them, choosing them
                for the right reasons, and building things that work.
              </p>
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-heading" className="border-b border-[var(--line)] py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Projects</p>
                <h2 id="projects-heading" className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  What I am building
                </h2>
              </div>
              <Link href="/projects" className="text-sm text-[var(--highlight)] underline">
                View all projects
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </section>

          <section id="experience" aria-labelledby="experience-heading" className="border-b border-[var(--line)] py-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Experience</p>
            <h2 id="experience-heading" className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              A truthful record is still being assembled.
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-[var(--muted)]">
              Roles, dates, and working statements will be published once the
              wording and supporting context are approved.
            </p>
          </section>

          <section id="contact" aria-labelledby="contact-heading" className="py-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Contact</p>
            <h2 id="contact-heading" className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              Contact actions will appear when verified.
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-[var(--muted)]">
              No résumé, email, LinkedIn, or GitHub destination is published
              here until it is confirmed and ready to receive visitors.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
