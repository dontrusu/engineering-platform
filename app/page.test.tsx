import { render, screen, within } from "@testing-library/react";

import { projects } from "@/lib/projects";

import Page, { metadata } from "./page";

describe("Home page", () => {
  it("publishes the approved canonical metadata", () => {
    expect(metadata).toMatchObject({
      title: { absolute: "Engineering Lab — Denys Shybkovskyy" },
      description:
        "The engineering portfolio of frontend engineer Denys Shybkovskyy, featuring projects, documented decisions, and evidence.",
      alternates: { canonical: "/" },
    });
  });

  it("provides the primary page structure", () => {
    render(<Page />);

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

  it("presents the canonical Projects collection", () => {
    render(<Page />);

    const projectRegion = screen.getByRole("region", { name: "Projects" });
    expect(within(projectRegion).getAllByRole("article")).toHaveLength(
      projects.length,
    );
    expect(
      within(projectRegion).getAllByRole("link", {
        name: "View Project Page",
      }),
    ).toHaveLength(projects.length);
  });

  it("links to the complete Projects index", () => {
    render(<Page />);

    expect(
      screen.getByRole("link", { name: "View all projects" }),
    ).toHaveAttribute("href", "/projects");
  });

  it("presents the editorial sections in order with truthful incomplete states", () => {
    render(<Page />);

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
