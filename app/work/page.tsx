import Link from "next/link";

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-[var(--foreground)]">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Work
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
          Project index
        </h1>
      </header>
      <ul className="space-y-5 text-lg">
        <li>
          <Link
            href="/work/atlas"
            className="text-[var(--highlight)] underline"
          >
            Atlas
          </Link>{" "}
          — public stub until the case study is ready.
        </li>
        <li>Pulse — unavailable project without a detail route yet.</li>
        <li>Composite — unavailable project without a detail route yet.</li>
      </ul>
    </main>
  );
}
