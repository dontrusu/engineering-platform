import { projectFixtures } from "./project-fixtures";
import { parseProject } from "./project-schema";

function projectRecord() {
  return {
    name: "Project",
    slug: "project",
    status: "Planned",
    technologies: ["TypeScript"],
    description: "Project description",
    deployedHref: null,
    isVisible: true,
    displayOrder: 10,
  };
}

describe("Project schema", () => {
  it("returns only the fields that are safe to render", () => {
    expect(parseProject(projectRecord())).toEqual({
      name: "Project",
      slug: "project",
      status: "Planned",
      technologies: ["TypeScript"],
      description: "Project description",
    });
  });

  it.each([
    ["an invalid slug", { slug: "Project Name" }],
    ["an insecure Deployment Link", { deployedHref: "http://project.test" }],
    ["an empty technology list", { technologies: [] }],
  ])("rejects %s", (_scenario, fields) => {
    expect(() => parseProject({ ...projectRecord(), ...fields })).toThrow();
  });

  it("accepts every deterministic Project fixture", () => {
    expect(projectFixtures.map(parseProject)).toEqual(projectFixtures);
  });
});
