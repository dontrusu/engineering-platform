import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex! min-h-screen items-center justify-center px-6 py-16 text-foreground sm:px-10"
    >
      <div className="w-full max-w-2xl text-center">
        <p
          aria-hidden="true"
          className="font-mono text-sm font-medium tracking-[0.3em] text-primary"
        >
          404
        </p>
        <h1 className="mt-5 text-5xl font-extrabold tracking-[-0.05em] uppercase sm:text-7xl">
          Route not found
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
          This experiment led somewhere outside the lab.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-12 items-center justify-center bg-primary px-6 font-mono text-sm font-medium tracking-[0.08em] text-primary-foreground uppercase no-underline transition-colors hover:bg-foreground motion-reduce:transition-none"
        >
          Return to the lab
        </Link>
      </div>
    </main>
  );
}
