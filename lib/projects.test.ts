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

  it("provides complete canonical Project content", () => {
    for (const project of projects) {
      expect(project.name.trim()).not.toBe("");
      expect(project.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(["Planned", "Live"]).toContain(project.status);
      expect(project.description.trim()).not.toBe("");
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.technologies.every((value) => value.trim() !== "")).toBe(
        true,
      );
      if (project.deployedHref) {
        expect(new URL(project.deployedHref).protocol).toBe("https:");
      }
    }
  });
});
