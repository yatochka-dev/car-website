import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "fleet_vehicles" ADD COLUMN "show_on_homepage" boolean DEFAULT false;
    ALTER TABLE "fleet_vehicles" ADD COLUMN "homepage_order" numeric;

    UPDATE "fleet_vehicles" AS "vehicle"
    SET
      "show_on_homepage" = true,
      "homepage_order" = "selection"."order"
    FROM (
      SELECT DISTINCT ON ("fleet_vehicles_id")
        "fleet_vehicles_id",
        "order"
      FROM "home_fleet_rels"
      WHERE "path" = 'vehicles' AND "fleet_vehicles_id" IS NOT NULL
      ORDER BY "fleet_vehicles_id", "order"
    ) AS "selection"
    WHERE "vehicle"."id" = "selection"."fleet_vehicles_id";

    CREATE INDEX "fleet_vehicles_show_on_homepage_idx" ON "fleet_vehicles" USING btree ("show_on_homepage");
    CREATE INDEX "fleet_vehicles_homepage_order_idx" ON "fleet_vehicles" USING btree ("homepage_order");

    DROP TABLE "home_fleet_rels" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "home_fleet_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "fleet_vehicles_id" varchar
    );

    ALTER TABLE "home_fleet_rels" ADD CONSTRAINT "home_fleet_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_fleet"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "home_fleet_rels" ADD CONSTRAINT "home_fleet_rels_fleet_vehicles_fk" FOREIGN KEY ("fleet_vehicles_id") REFERENCES "public"."fleet_vehicles"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "home_fleet_rels_order_idx" ON "home_fleet_rels" USING btree ("order");
    CREATE INDEX "home_fleet_rels_parent_idx" ON "home_fleet_rels" USING btree ("parent_id");
    CREATE INDEX "home_fleet_rels_path_idx" ON "home_fleet_rels" USING btree ("path");
    CREATE INDEX "home_fleet_rels_fleet_vehicles_id_idx" ON "home_fleet_rels" USING btree ("fleet_vehicles_id");

    WITH "home_fleet_parent" AS (
      SELECT "id"
      FROM "home_fleet"
      ORDER BY "id"
      LIMIT 1
    ),
    "ranked_vehicles" AS (
      SELECT
        "vehicle"."id",
        COALESCE(
          "vehicle"."homepage_order",
          ROW_NUMBER() OVER (ORDER BY "vehicle"."created_at", "vehicle"."id")
        ) AS "resolved_order"
      FROM "fleet_vehicles" AS "vehicle"
      WHERE "vehicle"."show_on_homepage" = true
    )
    INSERT INTO "home_fleet_rels" ("order", "parent_id", "path", "fleet_vehicles_id")
    SELECT
      "ranked_vehicles"."resolved_order"::integer,
      "home_fleet_parent"."id",
      'vehicles',
      "ranked_vehicles"."id"
    FROM "ranked_vehicles"
    CROSS JOIN "home_fleet_parent"
    ORDER BY "ranked_vehicles"."resolved_order";

    SELECT setval(
      pg_get_serial_sequence('public.home_fleet_rels', 'id'),
      GREATEST(COALESCE((SELECT MAX("id") FROM "home_fleet_rels"), 1), 1),
      true
    );

    DROP INDEX "fleet_vehicles_show_on_homepage_idx";
    DROP INDEX "fleet_vehicles_homepage_order_idx";
    ALTER TABLE "fleet_vehicles" DROP COLUMN "show_on_homepage";
    ALTER TABLE "fleet_vehicles" DROP COLUMN "homepage_order";
  `)
}
