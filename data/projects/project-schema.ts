import { z } from "zod";

const projectStatusSchema = z.enum(["Planned", "Live"]);
const deploymentLinkSchema = z.url().startsWith("https://");

const projectSchema = z
  .object({
    name: z.string().trim().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    status: projectStatusSchema,
    technologies: z.array(z.string().trim().min(1)).min(1),
    description: z.string().trim().min(1),
    deployedHref: deploymentLinkSchema.nullable().optional(),
  })
  .transform((project) => ({
    name: project.name,
    slug: project.slug,
    status: project.status,
    technologies: project.technologies,
    description: project.description,
    ...(project.deployedHref === null || project.deployedHref === undefined
      ? {}
      : { deployedHref: project.deployedHref }),
  }));

export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type Project = z.output<typeof projectSchema>;

export function parseProject(value: unknown): Project {
  return projectSchema.parse(value);
}
