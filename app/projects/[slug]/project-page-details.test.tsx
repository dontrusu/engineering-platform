import { render, screen } from "@testing-library/react";

import type { Project } from "@/lib/projects";

import { ProjectPageDetails } from "./project-page-details";

const projectFixture: Project = {
  name: "Test Project",
  slug: "test-project",
  status: "Live",
  technologies: ["TypeScript", "Next.js"],
  description: "A complete Project overview.",
};

describe("ProjectPageDetails", () => {
  it("presents a complete Project overview", () => {
    render(<ProjectPageDetails project={projectFixture} />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText("Project status: Live")).toBeInTheDocument();
    expect(screen.getByText(projectFixture.description)).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Technologies" }),
    ).toHaveTextContent("TypeScript");
    expect(
      screen.getByRole("list", { name: "Technologies" }),
    ).toHaveTextContent("Next.js");
    expect(
      screen.getByRole("link", { name: "Back to projects" }),
    ).toHaveAttribute("href", "/projects");
    expect(
      screen.queryByRole("link", { name: "Visit project" }),
    ).not.toBeInTheDocument();
  });

  it("links to a verified external deployment", () => {
    render(
      <ProjectPageDetails
        project={{
          ...projectFixture,
          deployedHref: "https://example.com/verified-project",
        }}
      />,
    );

    expect(screen.getByRole("link", { name: "Visit project" })).toHaveAttribute(
      "href",
      "https://example.com/verified-project",
    );
  });
});
