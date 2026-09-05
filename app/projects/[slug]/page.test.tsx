import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";

import { projects } from "@/lib/projects";

import ProjectPage, { generateMetadata, generateStaticParams } from "./page";

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
    const canonicalProject = projects[0];

    render(
      await ProjectPage({
        params: Promise.resolve({ slug: canonicalProject.slug }),
      }),
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(notFound).not.toHaveBeenCalled();
  });

  it("generates a route for every canonical Project", () => {
    expect(generateStaticParams()).toEqual(
      projects.map(({ slug }) => ({ slug })),
    );
  });

  it("derives canonical metadata from the Project", async () => {
    const project = projects[0];

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
