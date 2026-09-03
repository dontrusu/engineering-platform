"use client";

import Link from "next/link";

import { useActiveNavigationSection } from "./navigation-state";

export function SiteIdentityLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { resetNavigationIntent } = useActiveNavigationSection();

  return (
    <Link href="/" className={className} onNavigate={resetNavigationIntent}>
      {children}
    </Link>
  );
}
