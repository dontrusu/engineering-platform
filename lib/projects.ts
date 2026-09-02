export type ProjectStatus = "Planned" | "Live";

export type Project = {
  name: string;
  slug: string;
  status: ProjectStatus;
  technologies: readonly string[];
  description: string;
  deployedHref?: string;
};

export const projects = [
  {
    name: "Atlas",
    slug: "atlas",
    status: "Planned",
    technologies: ["Next.js", "TypeScript", "Content design"],
    description:
      "Make the reasoning behind a technical system easier to inspect before implementation details take over. The full Case Study and Evidence are still being developed.",
  },
  {
    name: "Pulse",
    slug: "pulse",
    status: "Planned",
    technologies: ["TypeScript", "Data modeling", "Interface design"],
    description:
      "Explore a clearer way to understand changing signals without presenting unfinished work as Evidence. Pulse is planned and its direction is still being established.",
  },
  {
    name: "Composite",
    slug: "composite",
    status: "Planned",
    technologies: ["TypeScript", "Systems design", "Documentation"],
    description:
      "Bring multiple technical concerns into a coherent system without hiding the trade-offs between them. Composite is planned and its implementation has not begun.",
  },
] satisfies readonly Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
