import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";

import { projectFixtures } from "@/data/projects/project-fixtures";
import type { Project } from "@/data/projects/project-schema";

import ProjectPage, { generateMetadata } from "./page";
import { ProjectPageContent } from "./project-page-content";

vi.mock("@/data/projects/projects.server", () => ({
  findVisibleProjectBySlug: vi.fn(async (slug: string) =>
    projectFixtures.find((project) => project.slug === slug),
  ),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_HTTP_ERROR_FALLBACK;404");
  }),
}));

describe("Project Page route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("resolves a canonical Project", async () => {
    const canonicalProject = projectFixtures[0];

    render(<ProjectPageContent project={canonicalProject} />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Project status: ${canonicalProject.status}`),
    ).toBeInTheDocument();
    expect(screen.getByText(canonicalProject.description)).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Technologies" }),
    ).toHaveTextContent(canonicalProject.technologies[0]);
    expect(
      screen.getByRole("link", { name: "Back to projects" }),
    ).toHaveAttribute("href", "/projects");
    expect(
      screen.queryByRole("link", { name: "Visit project" }),
    ).not.toBeInTheDocument();
    expect(notFound).not.toHaveBeenCalled();
  });

  it("links to the Project's Deployment Link", async () => {
    const deployedProject: Project = {
      ...projectFixtures[0],
      deployedHref: "https://example.com/project",
    };

    render(<ProjectPageContent project={deployedProject} />);

    expect(screen.getByRole("link", { name: "Visit project" })).toHaveAttribute(
      "href",
      deployedProject.deployedHref,
    );
  });

  it("derives canonical metadata from the Project", async () => {
    const project = projectFixtures[0];

    await expect(
      generateMetadata({ params: Promise.resolve({ slug: project.slug }) }),
    ).resolves.toMatchObject({
      title: project.name,
      description: project.description,
      alternates: { canonical: `/projects/${project.slug}` },
    });
  });

  it("returns not found when metadata is requested for an unknown slug", async () => {
    await expect(
      generateMetadata({
        params: Promise.resolve({ slug: "unknown-project" }),
      }),
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  it("returns not found for an unknown slug", async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ slug: "unknown-project" }) }),
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
    expect(notFound).toHaveBeenCalledOnce();
  });
});
