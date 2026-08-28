export type ProjectStatus = "Planned" | "Live";

export type Project = {
  name: string;
  slug: string;
  problem: string;
  technologies: string[];
  status: ProjectStatus;
  currentState: string;
  pageHref?: string;
  deployedHref?: string;
};

export const projects: Project[] = [
  {
    name: "Atlas",
    slug: "atlas",
    problem:
      "Make the reasoning behind a technical system easier to inspect before implementation details take over.",
    technologies: ["Next.js", "TypeScript", "Content design"],
    status: "Planned",
    currentState:
      "Project Page published; the full Case Study and Evidence are still being developed.",
    pageHref: "/projects/atlas",
  },
  {
    name: "Pulse",
    slug: "pulse",
    problem:
      "Explore a clearer way to understand changing signals without presenting unfinished work as evidence.",
    technologies: ["TypeScript", "Data modeling", "Interface design"],
    status: "Planned",
    currentState:
      "Planned project; an approved Project Page is not published yet.",
  },
  {
    name: "Composite",
    slug: "composite",
    problem:
      "Bring multiple technical concerns into a coherent system without hiding the trade-offs between them.",
    technologies: ["TypeScript", "Systems design", "Documentation"],
    status: "Planned",
    currentState:
      "Planned project; an approved Project Page is not published yet.",
  },
];
