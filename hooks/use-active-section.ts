"use client";

import { useEffect, useState } from "react";

const activationLineViewportShare = 0.25;
const activationBandHeight = 2;

type SectionTracking<SectionId extends string> = {
  sectionIds: readonly SectionId[];
  pageEndMarkerId: string;
};

export function useActiveSection<const SectionId extends string>(
  tracking: SectionTracking<SectionId> | null,
) {
  const [activeSection, setActiveSection] = useState<SectionId | null>(
    tracking?.sectionIds[0] ?? null,
  );

  useEffect(() => {
    if (!tracking) {
      setActiveSection(null);
      return;
    }

    const { sectionIds, pageEndMarkerId } = tracking;
    const sections = sectionIds.flatMap((id) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    if (sections.length === 0) return;

    const pageEndMarker = document.getElementById(pageEndMarkerId);
    const sectionsAtActivationLine = new Set<Element>();
    let isPageEndVisible = false;
    let sectionObserver: IntersectionObserver | null = null;

    function updateActiveSection() {
      if (isPageEndVisible) {
        setActiveSection(sections.at(-1)?.id ?? null);
        return;
      }

      const active = sections.findLast(({ element }) =>
        sectionsAtActivationLine.has(element),
      );
      if (active) setActiveSection(active.id);
    }

    function observeActivationLine() {
      sectionObserver?.disconnect();
      sectionsAtActivationLine.clear();

      const activationTop = Math.round(
        window.innerHeight * activationLineViewportShare,
      );
      const activationBottom = Math.max(
        0,
        window.innerHeight - activationTop - activationBandHeight,
      );

      sectionObserver = new IntersectionObserver(
        (entries) => {
          for (const { target, isIntersecting } of entries) {
            if (isIntersecting) sectionsAtActivationLine.add(target);
            else sectionsAtActivationLine.delete(target);
          }
          updateActiveSection();
        },
        {
          rootMargin: `-${activationTop}px 0px -${activationBottom}px 0px`,
        },
      );

      for (const { element } of sections) sectionObserver.observe(element);
    }

    const pageEndObserver = new IntersectionObserver((entries) => {
      const pageEndEntry = entries.find(
        ({ target }) => target === pageEndMarker,
      );
      if (!pageEndEntry) return;

      isPageEndVisible = pageEndEntry.isIntersecting;
      updateActiveSection();
    });

    if (pageEndMarker) pageEndObserver.observe(pageEndMarker);
    observeActivationLine();
    window.addEventListener("resize", observeActivationLine);

    return () => {
      sectionObserver?.disconnect();
      pageEndObserver.disconnect();
      window.removeEventListener("resize", observeActivationLine);
    };
  }, [tracking]);

  return activeSection;
}
