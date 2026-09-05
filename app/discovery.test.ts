import { projects } from "@/lib/projects";

import robots from "./robots";
import sitemap from "./sitemap";

describe("public route discovery", () => {
  it("lists exactly the canonical public routes as URL-only sitemap entries", () => {
    expect(sitemap()).toEqual(
      ["", "/projects", ...projects.map(({ slug }) => `/projects/${slug}`)].map(
        (path) => ({ url: `https://denysshybkovskyy.dev${path}` }),
      ),
    );
  });

  it("permits public crawling and points to the canonical sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://denysshybkovskyy.dev/sitemap.xml",
    });
  });
});
