"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { homeSectionTracking, type NavigationSection } from "./sections";

type NavigationSectionId = NavigationSection["id"];
type NavigationClickEvent = {
  altKey: boolean;
  button: number;
  ctrlKey: boolean;
  defaultPrevented: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  preventDefault: () => void;
};

type NavigationStateValue = {
  activeSection: NavigationSectionId | null;
  resetNavigationIntent: () => void;
  navigateToSection: (
    sectionId: NavigationSectionId,
    event: NavigationClickEvent,
  ) => void;
};
const ActiveNavigationSectionContext =
  createContext<NavigationStateValue | null>(null);

const scrollKeys = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
]);

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName))
  );
}

export function NavigationState({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const observedSection = useActiveSection(
    pathname === "/" ? homeSectionTracking : null,
  );
  const [selectedSection, setSelectedSection] =
    useState<NavigationSectionId | null>(null);
  const resetNavigationIntent = useCallback(() => setSelectedSection(null), []);

  const navigateToSection = useCallback(
    (sectionId: NavigationSectionId, event: NavigationClickEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      setSelectedSection(sectionId);

      if (pathname !== "/") return;

      if (decodeURIComponent(window.location.hash.slice(1)) !== sectionId) {
        return;
      }

      event.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView();
    },
    [pathname],
  );

  useEffect(() => {
    if (!selectedSection) return;

    const clearSelectedSection = () => setSelectedSection(null);
    const clearSelectedSectionForKey = (event: KeyboardEvent) => {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isEditableTarget(event.target) ||
        !scrollKeys.has(event.key)
      ) {
        return;
      }
      clearSelectedSection();
    };

    window.addEventListener("wheel", clearSelectedSection, { passive: true });
    window.addEventListener("touchstart", clearSelectedSection, {
      passive: true,
    });
    window.addEventListener("keydown", clearSelectedSectionForKey);
    window.addEventListener("popstate", clearSelectedSection);

    return () => {
      window.removeEventListener("wheel", clearSelectedSection);
      window.removeEventListener("touchstart", clearSelectedSection);
      window.removeEventListener("keydown", clearSelectedSectionForKey);
      window.removeEventListener("popstate", clearSelectedSection);
    };
  }, [selectedSection]);

  const activeSection =
    pathname === "/" ? (selectedSection ?? observedSection) : null;

  return (
    <ActiveNavigationSectionContext
      value={{
        activeSection,
        resetNavigationIntent,
        navigateToSection,
      }}
    >
      {children}
    </ActiveNavigationSectionContext>
  );
}

export function useActiveNavigationSection() {
  const navigationState = useContext(ActiveNavigationSectionContext);
  if (!navigationState)
    throw new Error(
      "useActiveNavigationSection must be used within NavigationState",
    );
  return navigationState;
}
