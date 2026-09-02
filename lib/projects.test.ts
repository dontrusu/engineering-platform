import { getProjectBySlug, projects } from "./projects";

describe("Project collection", () => {
  it("provides every canonical Project through its slug", () => {
    for (const project of projects) {
      expect(getProjectBySlug(project.slug)).toBe(project);
    }
  });

  it("does not resolve an unknown Project slug", () => {
    expect(getProjectBySlug("unknown-project")).toBeUndefined();
  });
});
