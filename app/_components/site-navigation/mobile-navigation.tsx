"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useActiveNavigationSection } from "./navigation-state";
import { navigationSections } from "./sections";

export function MobileNavigation() {
  const { activeSection, navigateToSection } = useActiveNavigationSection();

  return (
    <nav
      aria-label="Mobile section navigation"
      className="mobile-navigation-scroll overflow-x-auto border-t border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="m-0 flex w-max list-none gap-5 px-6">
        {navigationSections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <Link
                href={section.href}
                onClick={(event) => navigateToSection(section.id, event)}
                className={cn(
                  "inline-flex min-h-12 items-center border-b-2 border-transparent font-mono text-[0.72rem] font-medium tracking-[0.08em] text-muted-foreground uppercase no-underline transition-colors hover:text-foreground",
                  isActive && "border-primary text-foreground",
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {section.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
