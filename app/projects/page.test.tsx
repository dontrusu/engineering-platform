import { render, screen, within } from "@testing-library/react";

import { projects } from "@/lib/projects";

import Page, { metadata } from "./page";

describe("Projects index", () => {
  it("publishes the approved canonical metadata", () => {
    expect(metadata).toMatchObject({
      title: "Projects",
      description:
        "Explore Engineering Lab projects, their problem framing, current status, and available details.",
      alternates: { canonical: "/projects" },
    });
  });

  it("presents every canonical Project", () => {
    render(<Page />);

    const projectList = screen.getByRole("region", { name: "Projects" });
    expect(within(projectList).getAllByRole("article")).toHaveLength(
      projects.length,
    );
    expect(
      within(projectList).getAllByRole("link", {
        name: "View Project Page",
      }),
    ).toHaveLength(projects.length);
  });

  it("links back to the Engineering Lab", () => {
    render(<Page />);

    expect(
      screen.getByRole("link", { name: "Engineering Lab" }),
    ).toHaveAttribute("href", "/");
  });
});
