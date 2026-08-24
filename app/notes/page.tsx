import Link from "next/link";

export default function NotesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-[var(--foreground)]">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
        Notes
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
        No notes yet
      </h1>
      <p className="mt-6 text-lg text-[var(--muted)]">
        Notes appear only when they arise from a genuinely difficult or
        interesting decision. This empty state is intentional.
      </p>
      <div className="mt-8">
        <Link href="/" className="text-[var(--highlight)] underline">
          Return home
        </Link>
      </div>
    </main>
  );
}
