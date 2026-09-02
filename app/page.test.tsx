import { render, screen, within } from "@testing-library/react";

import { projects } from "@/lib/projects";

import Page from "./page";

describe("Home page", () => {
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
});
