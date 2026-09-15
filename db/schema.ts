import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const projectStatus = pgEnum("project_status", ["Planned", "Live"]);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    status: projectStatus("status").notNull(),
    technologies: text("technologies").array().notNull(),
    description: text("description").notNull(),
    deployedHref: text("deployed_href"),
    isVisible: boolean("is_visible").default(false).notNull(),
    displayOrder: integer("display_order").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("projects_slug_unique").on(table.slug),
    check("projects_name_not_blank", sql`length(btrim(${table.name})) > 0`),
    check(
      "projects_slug_format",
      sql`${table.slug} ~ '^[a-z0-9]+(-[a-z0-9]+)*$'`,
    ),
    check(
      "projects_technologies_not_empty",
      sql`cardinality(${table.technologies}) > 0`,
    ),
    check(
      "projects_technologies_not_blank",
      sql`array_position(${table.technologies}, null) is null and array_to_string(${table.technologies}, chr(31)) !~ ('(^|' || chr(31) || ')[[:space:]]*(' || chr(31) || '|$)')`,
    ),
    check(
      "projects_description_not_blank",
      sql`length(btrim(${table.description})) > 0`,
    ),
    check(
      "projects_deployment_link_https",
      sql`${table.deployedHref} is null or ${table.deployedHref} ~ '^https://[^[:space:]/?#]+([/?#][^[:space:]]*)?$'`,
    ),
    check(
      "projects_display_order_nonnegative",
      sql`${table.displayOrder} >= 0`,
    ),
  ],
);
