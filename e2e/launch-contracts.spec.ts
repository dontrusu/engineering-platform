import { expect, test } from "@playwright/test";

import { projects } from "../lib/projects";

const origin = "https://denysshybkovskyy.dev";
const homeDescription =
  "The engineering portfolio of frontend engineer Denys Shybkovskyy, featuring projects, documented decisions, and evidence.";

test("public pages emit canonical and social metadata", async ({ page }) => {
  const pages = [
    {
      path: "/",
      title: "Engineering Lab — Denys Shybkovskyy",
      description: homeDescription,
    },
    {
      path: "/projects",
      title: "Projects | Engineering Lab",
      description:
        "Explore Engineering Lab projects, their problem framing, current status, and available details.",
    },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      title: `${project.name} | Engineering Lab`,
      description: project.description,
    })),
  ];

  for (const expected of pages) {
    await page.goto(expected.path);

    await expect(page).toHaveTitle(expected.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      expected.description,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      expected.path === "/" ? origin : `${origin}${expected.path}`,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      expected.path === "/" ? expected.title : expected.title.split(" | ")[0]!,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      `${origin}/social-card.png`,
    );
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      "content",
      "Engineering Lab — Denys Shybkovskyy",
    );
  }
});

test("sitemap and robots expose only the canonical discovery contract", async ({
  request,
}) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  expect(sitemap.match(/<url>/g)).toHaveLength(projects.length + 2);
  expect(
    [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
  ).toEqual([
    origin,
    `${origin}/projects`,
    ...projects.map(({ slug }) => `${origin}/projects/${slug}`),
  ]);
  expect(sitemap).not.toMatch(/<(lastmod|changefreq|priority)>/);

  const robotsResponse = await request.get("/robots.txt");
  expect(await robotsResponse.text()).toBe(
    `User-Agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
  );
});

test("removed and unknown routes remain not found and protected", async ({
  request,
}) => {
  for (const path of [
    "/notes",
    "/resume",
    "/work",
    "/projects/unknown-project",
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    expect(response.headers()["content-security-policy"]).toContain(
      "frame-ancestors 'none'",
    );
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response.headers()["referrer-policy"]).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(response.headers()["permissions-policy"]).toBe(
      "camera=(), microphone=(), geolocation=()",
    );
    expect(response.headers()).not.toHaveProperty("strict-transport-security");
  }
});

test("the repository-owned social image has the approved dimensions", async ({
  page,
}) => {
  await page.goto("/social-card.png");
  await expect
    .poll(() =>
      page.locator("img").evaluate((image: HTMLImageElement) => ({
        width: image.naturalWidth,
        height: image.naturalHeight,
      })),
    )
    .toEqual({ width: 1200, height: 630 });
});
