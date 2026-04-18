import { postgresAdapter } from '@payloadcms/db-postgres'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { SiteConfig } from './globals/site-config'
import { FleetVehicles } from './collections/FleetCars'
import { s3Storage } from '@payloadcms/storage-s3'
import { SiteSEO } from './globals/metadata'
import { z } from 'zod'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const r2 = s3Storage({
  collections: {
    media: true,
  },
  config: {
    credentials: {
      accessKeyId: z.string().parse(process.env.R2_ACCESS_KEY_ID),
      secretAccessKey: z.string().parse(process.env.R2_SECRET_ACCESS_KEY),
    },
    endpoint: z.string().url().parse(process.env.R2_URL),
    region: 'auto',
  },
  bucket: z.string().parse(process.env.R2_BUCKET),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, FleetVehicles],
  globals: [SiteConfig, SiteSEO],
  editor: lexicalEditor(),
  plugins: [
    r2,
    importExportPlugin({
      collections: [
        {
          slug: 'users',
          export: {
            disableJobsQueue: true,
          },
          import: {
            disableJobsQueue: true,
          },
        },
        {
          slug: 'media',
          export: {
            disableJobsQueue: true,
          },
          import: {
            disableJobsQueue: true,
          },
        },
        {
          slug: 'fleet-vehicles',
          export: {
            disableJobsQueue: true,
          },
          import: {
            disableJobsQueue: true,
          },
        },
      ],
      overrideExportCollection: ({ collection }) => ({
        ...collection,
        admin: {
          ...collection.admin,
          group: 'ייבוא וייצוא',
        },
      }),
      overrideImportCollection: ({ collection }) => ({
        ...collection,
        admin: {
          ...collection.admin,
          group: 'ייבוא וייצוא',
        },
      }),
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
