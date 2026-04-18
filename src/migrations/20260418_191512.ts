import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_service_features_icon" AS ENUM('crown', 'shield', 'clock', 'star');
  CREATE TYPE "public"."enum_exports_format" AS ENUM('csv', 'json');
  CREATE TYPE "public"."enum_exports_sort_order" AS ENUM('asc', 'desc');
  CREATE TYPE "public"."enum_exports_drafts" AS ENUM('yes', 'no');
  CREATE TYPE "public"."enum_imports_import_mode" AS ENUM('create', 'update', 'upsert');
  CREATE TYPE "public"."enum_imports_status" AS ENUM('pending', 'completed', 'partial', 'failed');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport');

  CREATE TABLE "site_shell" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'הבוטיק' NOT NULL,
  	"brand_tagline" varchar DEFAULT 'השכרת רכבי יוקרה' NOT NULL,
  	"footer_copyright" varchar DEFAULT 'כל הזכויות שמורות להבוטיק' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "site_shell_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );

  CREATE TABLE "site_shell_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );

  CREATE TABLE "contact_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tg_chat_id" varchar DEFAULT '5918252925' NOT NULL,
  	"phone" varchar DEFAULT '+972500000000' NOT NULL,
  	"phone_display" varchar DEFAULT '050-000-0000' NOT NULL,
  	"whatsapp" varchar DEFAULT 'https://wa.me/972500000000' NOT NULL,
  	"whatsapp_display" varchar DEFAULT 'WhatsApp' NOT NULL,
  	"email" varchar DEFAULT 'info@haboutique.co.il' NOT NULL,
  	"address" varchar DEFAULT 'תל אביב, ישראל' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "home_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'להגיע לאירוע בסטייל של פעם בחיים' NOT NULL,
  	"subheadline" varchar DEFAULT 'שירות רכבי יוקרה עם נהג צמוד לאירועים מיוחדים. חתונות, ימי הולדת, אירועים עסקיים ועוד.' NOT NULL,
  	"cta" varchar DEFAULT 'הזמינו עכשיו' NOT NULL,
  	"cta_href" varchar DEFAULT '#contact' NOT NULL,
  	"background_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "home_fleet" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'צי הרכבים שלנו' NOT NULL,
  	"section_subtitle" varchar DEFAULT 'מבחר רכבי יוקרה מהמובילים בעולם, מתוחזקים ברמה הגבוהה ביותר.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "home_fleet_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"fleet_vehicles_id" varchar
  );

  CREATE TABLE "home_service" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'השירות שלנו' NOT NULL,
  	"section_subtitle" varchar DEFAULT 'חוויה מושלמת מהרגע הראשון ועד הרגע האחרון.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "home_service_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_service_features_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );

  CREATE TABLE "home_testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'מה הלקוחות שלנו אומרים' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "home_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );

  CREATE TABLE "exports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"format" "enum_exports_format" DEFAULT 'csv' NOT NULL,
  	"limit" numeric,
  	"page" numeric DEFAULT 1,
  	"sort" varchar,
  	"sort_order" "enum_exports_sort_order",
  	"drafts" "enum_exports_drafts" DEFAULT 'yes',
  	"collection_slug" varchar DEFAULT 'users' NOT NULL,
  	"where" jsonb DEFAULT '{}'::jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );

  CREATE TABLE "exports_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );

  CREATE TABLE "imports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collection_slug" varchar DEFAULT 'users' NOT NULL,
  	"import_mode" "enum_imports_import_mode",
  	"match_field" varchar DEFAULT 'id',
  	"status" "enum_imports_status" DEFAULT 'pending',
  	"summary_imported" numeric,
  	"summary_updated" numeric,
  	"summary_total" numeric,
  	"summary_issues" numeric,
  	"summary_issue_details" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );

  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );

  ALTER TABLE "site_shell_nav" ADD CONSTRAINT "site_shell_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_shell"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_shell_footer_links" ADD CONSTRAINT "site_shell_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_shell"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero" ADD CONSTRAINT "home_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_fleet_rels" ADD CONSTRAINT "home_fleet_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_fleet"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_fleet_rels" ADD CONSTRAINT "home_fleet_rels_fleet_vehicles_fk" FOREIGN KEY ("fleet_vehicles_id") REFERENCES "public"."fleet_vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_service_features" ADD CONSTRAINT "home_service_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_testimonials_items" ADD CONSTRAINT "home_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exports_texts" ADD CONSTRAINT "exports_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."exports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "site_shell_nav_order_idx" ON "site_shell_nav" USING btree ("_order");
  CREATE INDEX "site_shell_nav_parent_id_idx" ON "site_shell_nav" USING btree ("_parent_id");
  CREATE INDEX "site_shell_footer_links_order_idx" ON "site_shell_footer_links" USING btree ("_order");
  CREATE INDEX "site_shell_footer_links_parent_id_idx" ON "site_shell_footer_links" USING btree ("_parent_id");
  CREATE INDEX "home_hero_background_image_idx" ON "home_hero" USING btree ("background_image_id");
  CREATE INDEX "home_fleet_rels_order_idx" ON "home_fleet_rels" USING btree ("order");
  CREATE INDEX "home_fleet_rels_parent_idx" ON "home_fleet_rels" USING btree ("parent_id");
  CREATE INDEX "home_fleet_rels_path_idx" ON "home_fleet_rels" USING btree ("path");
  CREATE INDEX "home_fleet_rels_fleet_vehicles_id_idx" ON "home_fleet_rels" USING btree ("fleet_vehicles_id");
  CREATE INDEX "home_service_features_order_idx" ON "home_service_features" USING btree ("_order");
  CREATE INDEX "home_service_features_parent_id_idx" ON "home_service_features" USING btree ("_parent_id");
  CREATE INDEX "home_testimonials_items_order_idx" ON "home_testimonials_items" USING btree ("_order");
  CREATE INDEX "home_testimonials_items_parent_id_idx" ON "home_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "exports_updated_at_idx" ON "exports" USING btree ("updated_at");
  CREATE INDEX "exports_created_at_idx" ON "exports" USING btree ("created_at");
  CREATE UNIQUE INDEX "exports_filename_idx" ON "exports" USING btree ("filename");
  CREATE INDEX "exports_texts_order_parent" ON "exports_texts" USING btree ("order", "parent_id");
  CREATE INDEX "imports_updated_at_idx" ON "imports" USING btree ("updated_at");
  CREATE INDEX "imports_created_at_idx" ON "imports" USING btree ("created_at");
  CREATE UNIQUE INDEX "imports_filename_idx" ON "imports" USING btree ("filename");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");`)

  await db.execute(sql`
   INSERT INTO "site_shell" ("id", "brand_name", "brand_tagline", "footer_copyright", "updated_at", "created_at")
  SELECT
  	"id",
  	"brand_name",
  	"brand_tagline",
  	"footer_copyright",
  	"updated_at",
  	"created_at"
  FROM "site_config"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "site_shell_nav" ("_order", "_parent_id", "id", "label", "href")
  SELECT "_order", "_parent_id", "id", "label", "href"
  FROM "site_config_nav"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "site_shell_footer_links" ("_order", "_parent_id", "id", "label", "href")
  SELECT "_order", "_parent_id", "id", "label", "href"
  FROM "site_config_footer_links"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "contact_settings" ("id", "tg_chat_id", "phone", "phone_display", "whatsapp", "whatsapp_display", "email", "address", "updated_at", "created_at")
  SELECT
  	"id",
  	"tg_chat_id",
  	"contact_phone",
  	"contact_phone_display",
  	"contact_whatsapp",
  	"contact_whatsapp_display",
  	"contact_email",
  	"contact_address",
  	"updated_at",
  	"created_at"
  FROM "site_config"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "home_hero" ("id", "headline", "subheadline", "cta", "cta_href", "background_image_id", "updated_at", "created_at")
  SELECT
  	"id",
  	"hero_headline",
  	"hero_subheadline",
  	"hero_cta",
  	"hero_cta_href",
  	"hero_background_image_id",
  	"updated_at",
  	"created_at"
  FROM "site_config"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "home_fleet" ("id", "section_title", "section_subtitle", "updated_at", "created_at")
  SELECT
  	"id",
  	"fleet_section_title",
  	"fleet_section_subtitle",
  	"updated_at",
  	"created_at"
  FROM "site_config"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "home_fleet_rels" ("id", "order", "parent_id", "path", "fleet_vehicles_id")
  SELECT
  	"id",
  	"order",
  	"parent_id",
  	'vehicles',
  	"fleet_vehicles_id"
  FROM "site_config_rels"
  WHERE "fleet_vehicles_id" IS NOT NULL
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "home_service" ("id", "section_title", "section_subtitle", "updated_at", "created_at")
  SELECT
  	"id",
  	"service_section_title",
  	"service_section_subtitle",
  	"updated_at",
  	"created_at"
  FROM "site_config"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "home_service_features" ("_order", "_parent_id", "id", "icon", "title", "description")
  SELECT
  	"_order",
  	"_parent_id",
  	"id",
  	"icon"::text::"enum_home_service_features_icon",
  	"title",
  	"description"
  FROM "site_config_service_features"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "home_testimonials" ("id", "section_title", "updated_at", "created_at")
  SELECT
  	"id",
  	"testimonials_section_title",
  	"updated_at",
  	"created_at"
  FROM "site_config"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "home_testimonials_items" ("_order", "_parent_id", "id", "name", "text", "rating")
  SELECT "_order", "_parent_id", "id", "name", "text", "rating"
  FROM "site_config_testimonials_items"
  ON CONFLICT ("id") DO NOTHING;

  SELECT setval(pg_get_serial_sequence('public.site_shell', 'id'), GREATEST(COALESCE((SELECT MAX("id") FROM "site_shell"), 1), 1), true);
  SELECT setval(pg_get_serial_sequence('public.contact_settings', 'id'), GREATEST(COALESCE((SELECT MAX("id") FROM "contact_settings"), 1), 1), true);
  SELECT setval(pg_get_serial_sequence('public.home_hero', 'id'), GREATEST(COALESCE((SELECT MAX("id") FROM "home_hero"), 1), 1), true);
  SELECT setval(pg_get_serial_sequence('public.home_fleet', 'id'), GREATEST(COALESCE((SELECT MAX("id") FROM "home_fleet"), 1), 1), true);
  SELECT setval(pg_get_serial_sequence('public.home_fleet_rels', 'id'), GREATEST(COALESCE((SELECT MAX("id") FROM "home_fleet_rels"), 1), 1), true);
  SELECT setval(pg_get_serial_sequence('public.home_service', 'id'), GREATEST(COALESCE((SELECT MAX("id") FROM "home_service"), 1), 1), true);
  SELECT setval(pg_get_serial_sequence('public.home_testimonials', 'id'), GREATEST(COALESCE((SELECT MAX("id") FROM "home_testimonials"), 1), 1), true);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "imports" CASCADE;
  DROP TABLE "exports_texts" CASCADE;
  DROP TABLE "exports" CASCADE;
  DROP TABLE "home_testimonials_items" CASCADE;
  DROP TABLE "home_testimonials" CASCADE;
  DROP TABLE "home_service_features" CASCADE;
  DROP TABLE "home_service" CASCADE;
  DROP TABLE "home_fleet_rels" CASCADE;
  DROP TABLE "home_fleet" CASCADE;
  DROP TABLE "home_hero" CASCADE;
  DROP TABLE "contact_settings" CASCADE;
  DROP TABLE "site_shell_footer_links" CASCADE;
  DROP TABLE "site_shell_nav" CASCADE;
  DROP TABLE "site_shell" CASCADE;
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_imports_status";
  DROP TYPE "public"."enum_imports_import_mode";
  DROP TYPE "public"."enum_exports_drafts";
  DROP TYPE "public"."enum_exports_sort_order";
  DROP TYPE "public"."enum_exports_format";
  DROP TYPE "public"."enum_home_service_features_icon";`)
}
