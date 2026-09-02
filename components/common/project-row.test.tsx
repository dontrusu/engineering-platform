import { render, screen, within } from "@testing-library/react";

import type { Project } from "@/lib/projects";

import { ProjectRow } from "./project-row";

const projectFixture: Project = {
  name: "Test Project",
  slug: "test-project",
  status: "Planned",
  description: "A complete Project overview.",
  technologies: ["Next.js", "TypeScript"],
};

describe("ProjectRow", () => {
  it("presents a Project with an explicit internal action", () => {
    render(<ProjectRow {...projectFixture} />);

    const row = screen.getByRole("article", { name: projectFixture.name });

    expect(within(row).getByRole("heading")).toBeInTheDocument();
    expect(
      within(row).getByLabelText("Project status: Planned"),
    ).toBeInTheDocument();
    expect(
      within(row).getByText(projectFixture.description),
    ).toBeInTheDocument();
    expect(within(row).getByRole("list")).toHaveTextContent("Next.js");
    expect(within(row).getByRole("list")).toHaveTextContent("TypeScript");
    expect(
      within(row).getByRole("link", { name: "View Project Page" }),
    ).toHaveAttribute("href", "/projects/test-project");
  });

  it("keeps deployment links off Project rows", () => {
    const deployedProject: Project = {
      ...projectFixture,
      status: "Live",
      deployedHref: "https://example.com/verified-project",
    };

    render(<ProjectRow {...deployedProject} />);

    const row = screen.getByRole("article", { name: projectFixture.name });

    expect(
      within(row).getByLabelText("Project status: Live"),
    ).toBeInTheDocument();
    expect(
      within(row).getByRole("link", { name: "View Project Page" }),
    ).toBeInTheDocument();
    expect(
      within(row).queryByRole("link", { name: "Visit project" }),
    ).not.toBeInTheDocument();
  });
});
