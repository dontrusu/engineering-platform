import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";

import { projects } from "@/lib/projects";

import ProjectPage, { generateStaticParams } from "./page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_HTTP_ERROR_FALLBACK;404");
  }),
}));

describe("Project Page route", () => {
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

  it("returns not found for an unknown slug", async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ slug: "unknown-project" }) }),
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
    expect(notFound).toHaveBeenCalledOnce();
  });
});
