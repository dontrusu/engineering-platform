import Link from "next/link";

export default function AtlasPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-[var(--foreground)]">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
        Atlas
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
        Atlas stub
      </h1>
      <p className="mt-6 text-lg text-[var(--muted)]">
        This project is represented honestly as a stub until the real case study
        exists.
      </p>
      <p className="mt-4 text-lg text-[var(--muted)]">
        The public page states the problem framing, intended value, and the fact
        that the case study is not yet built.
      </p>
      <div className="mt-8">
        <Link href="/work" className="text-[var(--highlight)] underline">
          Back to work
        </Link>
      </div>
    </main>
  );
}
