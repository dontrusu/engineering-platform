import { render, screen, within } from "@testing-library/react";

import { projectFixtures } from "@/data/projects/project-fixtures";

import { metadata } from "./page";
import { ProjectsPageContent } from "./projects-page-content";

vi.mock("@/data/projects/projects.server", () => ({
  listVisibleProjects: vi.fn(async () => projectFixtures),
}));

describe("Projects index", () => {
  it("publishes the approved canonical metadata", () => {
    expect(metadata).toMatchObject({
      title: "Projects",
      description:
        "Explore Engineering Lab projects, their problem framing, current status, and available details.",
      alternates: { canonical: "/projects" },
    });
  });

  it("presents every Project", async () => {
    render(<ProjectsPageContent projects={projectFixtures} />);

    const projectList = screen.getByRole("region", { name: "Projects" });
    expect(within(projectList).getAllByRole("article")).toHaveLength(
      projectFixtures.length,
    );
    expect(
      within(projectList).getAllByRole("link", {
        name: "View Project Page",
      }),
    ).toHaveLength(projectFixtures.length);
  });

  it("links back to the Engineering Lab", async () => {
    render(<ProjectsPageContent projects={projectFixtures} />);

    expect(
      screen.getByRole("link", { name: "Engineering Lab" }),
    ).toHaveAttribute("href", "/");
  });
});
