import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "fleet_vehicles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "fleet_vehicles_bookings" ADD COLUMN "date" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "fleet_vehicles_rels" ADD CONSTRAINT "fleet_vehicles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."fleet_vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fleet_vehicles_rels" ADD CONSTRAINT "fleet_vehicles_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "fleet_vehicles_rels_order_idx" ON "fleet_vehicles_rels" USING btree ("order");
  CREATE INDEX "fleet_vehicles_rels_parent_idx" ON "fleet_vehicles_rels" USING btree ("parent_id");
  CREATE INDEX "fleet_vehicles_rels_path_idx" ON "fleet_vehicles_rels" USING btree ("path");
  CREATE INDEX "fleet_vehicles_rels_media_id_idx" ON "fleet_vehicles_rels" USING btree ("media_id");
  ALTER TABLE "fleet_vehicles_bookings" DROP COLUMN "start_date";
  ALTER TABLE "fleet_vehicles_bookings" DROP COLUMN "end_date";
  ALTER TABLE "fleet_vehicles" DROP COLUMN "image";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "fleet_vehicles_rels" CASCADE;
  ALTER TABLE "fleet_vehicles_bookings" ADD COLUMN "start_date" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "fleet_vehicles_bookings" ADD COLUMN "end_date" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "fleet_vehicles" ADD COLUMN "image" varchar DEFAULT '/images/fleet-rolls-royce.jpg' NOT NULL;
  ALTER TABLE "fleet_vehicles_bookings" DROP COLUMN "date";`)
}
