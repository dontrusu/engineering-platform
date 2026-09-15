import { render, screen, within } from "@testing-library/react";

import { projectFixtures } from "@/data/projects/project-fixtures";

import { HomePageContent } from "./home-page-content";
import { metadata } from "./page";

vi.mock("@/data/projects/projects.server", () => ({
  listVisibleProjects: vi.fn(async () => projectFixtures),
}));

describe("Home page", () => {
  it("publishes the approved canonical metadata", () => {
    expect(metadata).toMatchObject({
      title: { absolute: "Engineering Lab — Denys Shybkovskyy" },
      description:
        "The engineering portfolio of frontend engineer Denys Shybkovskyy, featuring projects, documented decisions, and evidence.",
      alternates: { canonical: "/" },
    });
  });

  it("provides the primary page structure", async () => {
    render(<HomePageContent projects={projectFixtures} />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "About" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Projects" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Experience" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Contact" })).toBeInTheDocument();
  });

  it("presents the Projects collection", async () => {
    render(<HomePageContent projects={projectFixtures} />);

    const projectRegion = screen.getByRole("region", { name: "Projects" });
    expect(within(projectRegion).getAllByRole("article")).toHaveLength(
      projectFixtures.length,
    );
    expect(
      within(projectRegion).getAllByRole("link", {
        name: "View Project Page",
      }),
    ).toHaveLength(projectFixtures.length);
  });

  it("links to the complete Projects index", async () => {
    render(<HomePageContent projects={projectFixtures} />);

    expect(
      screen.getByRole("link", { name: "View all projects" }),
    ).toHaveAttribute("href", "/projects");
  });

  it("presents the editorial sections in order with truthful incomplete states", async () => {
    render(<HomePageContent projects={projectFixtures} />);

    const sections = ["About", "Projects", "Experience", "Contact"].map(
      (name) => screen.getByRole("region", { name }),
    );

    expect(
      sections.every(
        (section, index) =>
          index === 0 ||
          Boolean(
            sections[index - 1]?.compareDocumentPosition(section) &
            Node.DOCUMENT_POSITION_FOLLOWING,
          ),
      ),
    ).toBe(true);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "A truthful record is still being assembled.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Contact actions will appear when verified.",
      }),
    ).toBeInTheDocument();
  });
});
