export const navigationSections = [
  { id: "about", label: "About", href: "/#about", number: "01" },
  { id: "projects", label: "Projects", href: "/#projects", number: "02" },
  {
    id: "experience",
    label: "Experience",
    href: "/#experience",
    number: "03",
  },
  { id: "contact", label: "Contact", href: "/#contact", number: "04" },
] as const;

export const homeSectionIds = navigationSections.map(({ id }) => id);
export const homePageEndMarkerId = "home-page-end";
export const homeSectionTracking = {
  sectionIds: homeSectionIds,
  pageEndMarkerId: homePageEndMarkerId,
};

export type NavigationSection = (typeof navigationSections)[number];
