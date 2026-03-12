import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_config_service_features_icon" AS ENUM('crown', 'shield', 'clock', 'star');
  CREATE TYPE "public"."enum_site_seo_robots" AS ENUM('index', 'noindex');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
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
  
  CREATE TABLE "fleet_vehicles_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE "fleet_vehicles_bookings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"customer_name" varchar,
  	"notes" varchar
  );
  
  CREATE TABLE "fleet_vehicles" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'רולס רויס גוסט' NOT NULL,
  	"description" varchar DEFAULT 'פסגת היוקרה הבריטית. חוויית נסיעה שקטה ומפנקת ברמה הגבוהה ביותר.' NOT NULL,
  	"image" varchar DEFAULT '/images/fleet-rolls-royce.jpg' NOT NULL,
  	"seats" numeric DEFAULT 4 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"fleet_vehicles_id" varchar
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_config_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_service_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_site_config_service_features_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"rating" numeric NOT NULL
  );
  
  CREATE TABLE "site_config_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_config" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tg_chat_id" varchar DEFAULT '5918252925' NOT NULL,
  	"brand_name" varchar DEFAULT 'הבוטיק' NOT NULL,
  	"brand_tagline" varchar DEFAULT 'השכרת רכבי יוקרה' NOT NULL,
  	"contact_phone" varchar DEFAULT '+972500000000' NOT NULL,
  	"contact_phone_display" varchar DEFAULT '050-000-0000' NOT NULL,
  	"contact_whatsapp" varchar DEFAULT 'https://wa.me/972500000000' NOT NULL,
  	"contact_whatsapp_display" varchar DEFAULT 'WhatsApp' NOT NULL,
  	"contact_email" varchar DEFAULT 'info@haboutique.co.il' NOT NULL,
  	"contact_address" varchar DEFAULT 'תל אביב, ישראל' NOT NULL,
  	"hero_headline" varchar DEFAULT 'להגיע לאירוע בסטייל של פעם בחיים' NOT NULL,
  	"hero_subheadline" varchar DEFAULT 'שירות רכבי יוקרה עם נהג צמוד לאירועים מיוחדים. חתונות, ימי הולדת, אירועים עסקיים ועוד.' NOT NULL,
  	"hero_cta" varchar DEFAULT 'הזמינו עכשיו' NOT NULL,
  	"hero_cta_href" varchar DEFAULT '#contact' NOT NULL,
  	"hero_background_image_id" integer NOT NULL,
  	"fleet_section_title" varchar DEFAULT 'צי הרכבים שלנו' NOT NULL,
  	"fleet_section_subtitle" varchar DEFAULT 'מבחר רכבי יוקרה מהמובילים בעולם, מתוחזקים ברמה הגבוהה ביותר.' NOT NULL,
  	"service_section_title" varchar DEFAULT 'השירות שלנו' NOT NULL,
  	"service_section_subtitle" varchar DEFAULT 'חוויה מושלמת מהרגע הראשון ועד הרגע האחרון.' NOT NULL,
  	"testimonials_section_title" varchar DEFAULT 'מה הלקוחות שלנו אומרים' NOT NULL,
  	"footer_copyright" varchar DEFAULT 'כל הזכויות שמורות להבוטיק' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_config_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"fleet_vehicles_id" varchar
  );
  
  CREATE TABLE "site_seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"og_image_id" integer,
  	"robots" "enum_site_seo_robots" DEFAULT 'noindex',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_vehicles_tags" ADD CONSTRAINT "fleet_vehicles_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet_vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_vehicles_bookings" ADD CONSTRAINT "fleet_vehicles_bookings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fleet_vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fleet_vehicles_fk" FOREIGN KEY ("fleet_vehicles_id") REFERENCES "public"."fleet_vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_nav" ADD CONSTRAINT "site_config_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_service_features" ADD CONSTRAINT "site_config_service_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_testimonials_items" ADD CONSTRAINT "site_config_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_footer_links" ADD CONSTRAINT "site_config_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config" ADD CONSTRAINT "site_config_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_config_rels" ADD CONSTRAINT "site_config_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_rels" ADD CONSTRAINT "site_config_rels_fleet_vehicles_fk" FOREIGN KEY ("fleet_vehicles_id") REFERENCES "public"."fleet_vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_seo" ADD CONSTRAINT "site_seo_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "fleet_vehicles_tags_order_idx" ON "fleet_vehicles_tags" USING btree ("_order");
  CREATE INDEX "fleet_vehicles_tags_parent_id_idx" ON "fleet_vehicles_tags" USING btree ("_parent_id");
  CREATE INDEX "fleet_vehicles_bookings_order_idx" ON "fleet_vehicles_bookings" USING btree ("_order");
  CREATE INDEX "fleet_vehicles_bookings_parent_id_idx" ON "fleet_vehicles_bookings" USING btree ("_parent_id");
  CREATE INDEX "fleet_vehicles_updated_at_idx" ON "fleet_vehicles" USING btree ("updated_at");
  CREATE INDEX "fleet_vehicles_created_at_idx" ON "fleet_vehicles" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_fleet_vehicles_id_idx" ON "payload_locked_documents_rels" USING btree ("fleet_vehicles_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_config_nav_order_idx" ON "site_config_nav" USING btree ("_order");
  CREATE INDEX "site_config_nav_parent_id_idx" ON "site_config_nav" USING btree ("_parent_id");
  CREATE INDEX "site_config_service_features_order_idx" ON "site_config_service_features" USING btree ("_order");
  CREATE INDEX "site_config_service_features_parent_id_idx" ON "site_config_service_features" USING btree ("_parent_id");
  CREATE INDEX "site_config_testimonials_items_order_idx" ON "site_config_testimonials_items" USING btree ("_order");
  CREATE INDEX "site_config_testimonials_items_parent_id_idx" ON "site_config_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "site_config_footer_links_order_idx" ON "site_config_footer_links" USING btree ("_order");
  CREATE INDEX "site_config_footer_links_parent_id_idx" ON "site_config_footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_config_hero_hero_background_image_idx" ON "site_config" USING btree ("hero_background_image_id");
  CREATE INDEX "site_config_rels_order_idx" ON "site_config_rels" USING btree ("order");
  CREATE INDEX "site_config_rels_parent_idx" ON "site_config_rels" USING btree ("parent_id");
  CREATE INDEX "site_config_rels_path_idx" ON "site_config_rels" USING btree ("path");
  CREATE INDEX "site_config_rels_fleet_vehicles_id_idx" ON "site_config_rels" USING btree ("fleet_vehicles_id");
  CREATE INDEX "site_seo_og_image_idx" ON "site_seo" USING btree ("og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "fleet_vehicles_tags" CASCADE;
  DROP TABLE "fleet_vehicles_bookings" CASCADE;
  DROP TABLE "fleet_vehicles" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_config_nav" CASCADE;
  DROP TABLE "site_config_service_features" CASCADE;
  DROP TABLE "site_config_testimonials_items" CASCADE;
  DROP TABLE "site_config_footer_links" CASCADE;
  DROP TABLE "site_config" CASCADE;
  DROP TABLE "site_config_rels" CASCADE;
  DROP TABLE "site_seo" CASCADE;
  DROP TYPE "public"."enum_site_config_service_features_icon";
  DROP TYPE "public"."enum_site_seo_robots";`)
}
