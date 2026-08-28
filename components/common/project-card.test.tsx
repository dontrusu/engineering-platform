import { render, screen } from "@testing-library/react";

import { ProjectCard } from "./project-card";

describe("ProjectCard", () => {
  it("renders project details with a clear heading and supporting description", () => {
    render(
      <ProjectCard
        name="Atlas"
        problem="Make technical reasoning easier to inspect."
        technologies={["Next.js", "TypeScript"]}
        status="Planned"
        currentState="Project Page published; the full Case Study is still being developed."
        pageHref="/projects/atlas"
      />,
    );

    expect(screen.getByRole("heading", { name: "Atlas" })).toBeInTheDocument();
    expect(
      screen.getByText(/make technical reasoning easier to inspect/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Planned")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Project Page" })).toHaveAttribute(
      "href",
      "/projects/atlas",
    );
    expect(screen.getByRole("article")).toBeInTheDocument();
  });
});
