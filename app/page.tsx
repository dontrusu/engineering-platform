import Link from "next/link";

const proofPoints = [
  "Editorial notice: the proof point copy is intentionally deferred until it can be backed by approved evidence.",
  "Editorial notice: no claim is published here without a real artifact, benchmark, or documented reasoning trail.",
  "Editorial notice: the site stays truthful by withholding unapproved professional claims.",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
        <header className="mb-12 border-b border-[var(--line)] pb-6">
          <nav
            aria-label="Primary navigation"
            className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.14em] text-[var(--muted)]"
          >
            <Link
              href="/"
              className="font-medium text-[var(--foreground)] no-underline"
            >
              Home
            </Link>
            <Link href="/work" className="no-underline">
              Work
            </Link>
            <Link href="/notes" className="no-underline">
              Notes
            </Link>
            <Link href="/resume" className="no-underline">
              Resume
            </Link>
          </nav>
        </header>

        <section aria-labelledby="positioning" className="mb-16 space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
            Portfolio platform
          </p>
          <h1
            id="positioning"
            className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl lg:text-6xl"
          >
            A resume can&apos;t show how I actually think through a hard
            technical problem — so I built this instead.
          </h1>
          <p className="max-w-2xl text-lg text-[var(--muted)]">
            Real systems, real decisions, real trade-offs, judged on their own
            terms.
          </p>
        </section>

        <section aria-labelledby="proof-points" className="mb-16">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-3">
            <h2
              id="proof-points"
              className="text-2xl font-semibold tracking-[-0.04em]"
            >
              Proof points
            </h2>
            <p className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
              Editorial notice
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {proofPoints.map((point) => (
              <article
                key={point}
                className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm"
              >
                <p className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
                  Proof point
                </p>
                <p className="mt-3 text-base text-[var(--foreground)]">
                  {point}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="case-studies" className="mb-16">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-3">
            <h2
              id="case-studies"
              className="text-2xl font-semibold tracking-[-0.04em]"
            >
              Case studies
            </h2>
            <p className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
              Live shell
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-[var(--line)] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                Atlas
              </p>
              <h3 className="mt-3 text-xl font-medium">
                Truthful stub pending case study
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                The public page exists without fabricated project claims.
              </p>
            </article>
            <article className="rounded-2xl border border-[var(--line)] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                Pulse
              </p>
              <h3 className="mt-3 text-xl font-medium">Unavailable project</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                No detail route is live until the real case study exists.
              </p>
            </article>
            <article className="rounded-2xl border border-[var(--line)] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                Composite
              </p>
              <h3 className="mt-3 text-xl font-medium">Unavailable project</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                No detailed work is published without honest evidence.
              </p>
            </article>
          </div>
        </section>

        <section
          aria-labelledby="background"
          className="mb-16 rounded-3xl border border-[var(--line)] bg-white/70 p-6"
        >
          <h2
            id="background"
            className="text-2xl font-semibold tracking-[-0.04em]"
          >
            Who&apos;s behind this
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-[var(--muted)]">
            Editorial notice: the narrative background copy is intentionally
            deferred until it can be written with real evidence and a clear
            point of view.
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="flex flex-col gap-4 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              How I work
            </p>
            <h2 id="cta" className="mt-2 text-xl font-medium">
              Editorial notice
            </h2>
            <p className="mt-2 max-w-xl text-[var(--muted)]">
              The working statements are intentionally deferred until they can
              be written with real evidence and explicit trade-offs.
            </p>
          </div>
          <Link
            href="/resume"
            className="inline-flex items-center justify-center rounded-full border border-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--foreground)] no-underline transition-colors hover:bg-[var(--foreground)] hover:text-white"
          >
            Resume and contact
          </Link>
        </section>
      </div>
    </main>
  );
}
