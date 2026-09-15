CREATE TYPE "public"."project_status" AS ENUM('Planned', 'Live');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"status" "project_status" NOT NULL,
	"technologies" text[] NOT NULL,
	"description" text NOT NULL,
	"deployed_href" text,
	"is_visible" boolean DEFAULT false NOT NULL,
	"display_order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_name_not_blank" CHECK (length(btrim("projects"."name")) > 0),
	CONSTRAINT "projects_slug_format" CHECK ("projects"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	CONSTRAINT "projects_technologies_not_empty" CHECK (cardinality("projects"."technologies") > 0),
	CONSTRAINT "projects_technologies_not_blank" CHECK (array_position("projects"."technologies", null) is null and array_to_string("projects"."technologies", chr(31)) !~ ('(^|' || chr(31) || ')[[:space:]]*(' || chr(31) || '|$)')),
	CONSTRAINT "projects_description_not_blank" CHECK (length(btrim("projects"."description")) > 0),
	CONSTRAINT "projects_deployment_link_https" CHECK ("projects"."deployed_href" is null or "projects"."deployed_href" ~ '^https://[^[:space:]/?#]+([/?#][^[:space:]]*)?$'),
	CONSTRAINT "projects_display_order_nonnegative" CHECK ("projects"."display_order" >= 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "projects_slug_unique" ON "projects" USING btree ("slug");--> statement-breakpoint
CREATE FUNCTION set_projects_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
	NEW.updated_at = now();
	RETURN NEW;
END;
$$;--> statement-breakpoint
CREATE TRIGGER projects_set_updated_at
BEFORE UPDATE ON "projects"
FOR EACH ROW
EXECUTE FUNCTION set_projects_updated_at();
