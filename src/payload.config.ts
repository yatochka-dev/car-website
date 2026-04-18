import { postgresAdapter } from '@payloadcms/db-postgres'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { en } from 'payload/i18n/en'
import { he } from 'payload/i18n/he'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { z } from 'zod'

import { FleetVehicles } from './collections/FleetCars'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { ContactSettings } from './globals/contact-settings'
import { HomeFleet } from './globals/home-fleet'
import { HomeHero } from './globals/home-hero'
import { HomeService } from './globals/home-service'
import { HomeTestimonials } from './globals/home-testimonials'
import { SiteSEO } from './globals/metadata'
import { defaultLivePreviewPath } from './globals/shared'
import { SiteShell } from './globals/site-shell'
import { migrations } from './migrations'

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
    livePreview: {
      url: ({ globalConfig }) =>
        globalConfig
          ? `${defaultLivePreviewPath}?global=${encodeURIComponent(globalConfig.slug)}`
          : defaultLivePreviewPath,
      globals: [
        SiteShell.slug,
        ContactSettings.slug,
        HomeHero.slug,
        HomeFleet.slug,
        HomeService.slug,
        HomeTestimonials.slug,
      ],
      breakpoints: [
        {
          label: 'מובייל',
          name: 'mobile',
          width: 390,
          height: 844,
        },
        {
          label: 'דסקטופ',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, FleetVehicles],
  globals: [SiteShell, ContactSettings, HomeHero, HomeFleet, HomeService, HomeTestimonials, SiteSEO],
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: 'he',
    supportedLanguages: {
      en,
      he,
    },
  },
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
    prodMigrations: migrations,
  }),
  sharp,
})
