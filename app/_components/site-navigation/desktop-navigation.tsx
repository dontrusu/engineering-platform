"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useActiveNavigationSection } from "./navigation-state";
import { navigationSections } from "./sections";

export function DesktopNavigation() {
  const { activeSection, navigateToSection } = useActiveNavigationSection();

  return (
    <nav aria-label="Section navigation" className="desktop-navigation">
      <ul className="site-navigation-list">
        {navigationSections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <Link
                href={section.href}
                onClick={(event) => navigateToSection(section.id, event)}
                className={cn(
                  "site-navigation-link",
                  isActive && "font-bold text-foreground",
                )}
                aria-current={isActive ? "location" : undefined}
              >
                <span aria-hidden="true" className="site-navigation-number">
                  {section.number}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "site-navigation-rule transition-[width,background-color] duration-150 motion-reduce:transition-none",
                    isActive && "w-8 bg-primary",
                  )}
                />
                <span>{section.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
