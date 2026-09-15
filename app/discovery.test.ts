import { projectFixtures } from "@/data/projects/project-fixtures";

import robots from "./robots";
import sitemap from "./sitemap";

vi.mock("@/data/projects/projects.server", () => ({
  listVisibleProjects: vi.fn(async () => projectFixtures),
}));

describe("public route discovery", () => {
  it("lists exactly the public routes as URL-only sitemap entries", async () => {
    await expect(sitemap()).resolves.toEqual(
      [
        "",
        "/projects",
        ...projectFixtures.map(({ slug }) => `/projects/${slug}`),
      ].map((path) => ({ url: `https://denysshybkovskyy.dev${path}` })),
    );
  });

  it("permits public crawling and points to the canonical sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://denysshybkovskyy.dev/sitemap.xml",
    });
  });
});
