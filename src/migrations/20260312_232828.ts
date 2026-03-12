import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_config" ADD COLUMN "hero_background_image_id" integer NOT NULL;
  ALTER TABLE "site_config" ADD CONSTRAINT "site_config_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_config_hero_hero_background_image_idx" ON "site_config" USING btree ("hero_background_image_id");
  ALTER TABLE "site_config" DROP COLUMN "hero_background_image";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_config" DROP CONSTRAINT "site_config_hero_background_image_id_media_id_fk";
  
  DROP INDEX "site_config_hero_hero_background_image_idx";
  ALTER TABLE "site_config" ADD COLUMN "hero_background_image" varchar DEFAULT '/images/hero-car.jpg' NOT NULL;
  ALTER TABLE "site_config" DROP COLUMN "hero_background_image_id";`)
}
