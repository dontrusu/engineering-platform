import "server-only";

import { and, asc, eq } from "drizzle-orm";
import { connection } from "next/server";
import { cache } from "react";

import { getDatabase } from "@/db/client";
import { projects } from "@/db/schema";

import { projectFixtures } from "./project-fixtures";
import { parseProject, type Project } from "./project-schema";

const useProjectFixtures = process.env.PROJECT_FIXTURES_BUILD === "1";

if (useProjectFixtures && process.env.VERCEL) {
  throw new Error("Project fixtures cannot be used in a Vercel deployment");
}

const publicProjectSelection = {
  name: projects.name,
  slug: projects.slug,
  status: projects.status,
  technologies: projects.technologies,
  description: projects.description,
  deployedHref: projects.deployedHref,
};

async function listFromDatabase(): Promise<readonly Project[]> {
  const records = await getDatabase()
    .select(publicProjectSelection)
    .from(projects)
    .where(eq(projects.isVisible, true))
    .orderBy(asc(projects.displayOrder), asc(projects.slug));

  return records.map(parseProject);
}

async function findBySlugInDatabase(
  slug: string,
): Promise<Project | undefined> {
  const [record] = await getDatabase()
    .select(publicProjectSelection)
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.isVisible, true)))
    .limit(1);

  return record === undefined ? undefined : parseProject(record);
}

export async function listVisibleProjects(): Promise<readonly Project[]> {
  await connection();
  return useProjectFixtures ? projectFixtures : listFromDatabase();
}

export const findVisibleProjectBySlug = cache(
  async (slug: string): Promise<Project | undefined> => {
    await connection();
    return useProjectFixtures
      ? projectFixtures.find((project) => project.slug === slug)
      : findBySlugInDatabase(slug);
  },
);
