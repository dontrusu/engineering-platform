import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-[var(--foreground)]">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
        Resume
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
        Resume shell
      </h1>
      <p className="mt-6 text-lg text-[var(--muted)]">
        This page intentionally contains no fabricated contact or role details.
        It is a placeholder shell until the final resume material is approved.
      </p>
      <div className="mt-8">
        <Link href="/" className="text-[var(--highlight)] underline">
          Return home
        </Link>
      </div>
    </main>
  );
}
