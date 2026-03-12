import type { MetadataRoute } from 'next'
import z from 'zod'

export default function sitemap(): MetadataRoute.Sitemap {
  const webURL = z.string().url().parse(process.env.DEPLOY_URL)

  return [
    {
      url: webURL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
