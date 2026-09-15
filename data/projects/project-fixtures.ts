import type { Project } from "./project-schema";

export const projectFixtures: readonly Project[] = [
  {
    name: "Atlas",
    slug: "atlas",
    status: "Planned",
    technologies: ["Next.js", "TypeScript", "Content design"],
    description:
      "Make the reasoning behind a technical system easier to inspect before implementation details take over. Atlas is planned and its direction is still being established.",
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
];
