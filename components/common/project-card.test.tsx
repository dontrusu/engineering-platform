import { render, screen } from "@testing-library/react";

import { ProjectCard } from "./project-card";

describe("ProjectCard", () => {
  it("renders project details with a clear heading and supporting description", () => {
    render(
      <ProjectCard
        name="Atlas"
        title="Truthful stub pending case study"
        description="The public page exists without fabricated project claims."
      />,
    );

    expect(screen.getByText("Atlas")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /truthful stub pending case study/i })).toBeInTheDocument();
    expect(
      screen.getByText(/the public page exists without fabricated project claims/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("article")).toBeInTheDocument();
  });
});
