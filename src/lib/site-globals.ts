import type { FleetVehicle } from '@/payload-types'

import { payload } from './p'

export async function getSiteFrameData() {
  const p = await payload()

  const [siteShell, contactSettings] = await Promise.all([
    p.findGlobal({
      slug: 'site-shell',
      depth: 0,
    }),
    p.findGlobal({
      slug: 'contact-settings',
      depth: 0,
    }),
  ])

  return {
    siteShell,
    contactSettings,
  }
}

export async function getHomePageData() {
  const p = await payload()

  const [homeHero, homeFleet, homeService, homeTestimonials, contactSettings, fleetVehicles] =
    await Promise.all([
      p.findGlobal({
        slug: 'home-hero',
        depth: 1,
      }),
      p.findGlobal({
        slug: 'home-fleet',
        depth: 0,
      }),
      p.findGlobal({
        slug: 'home-service',
        depth: 0,
      }),
      p.findGlobal({
        slug: 'home-testimonials',
        depth: 0,
      }),
      p.findGlobal({
        slug: 'contact-settings',
        depth: 0,
      }),
      p.find({
        collection: 'fleet-vehicles',
        depth: 2,
        pagination: false,
        sort: 'homepageOrder',
        where: {
          showOnHomepage: {
            equals: true,
          },
        },
      }),
    ])

  const vehicles = fleetVehicles.docs as FleetVehicle[]

  return {
    homeHero,
    homeFleet: {
      ...homeFleet,
      vehicles,
    },
    homeService,
    homeTestimonials,
    contactSettings,
  }
}

export async function getSiteSEO() {
  const p = await payload()

  return p.findGlobal({
    slug: 'site-seo',
    depth: 1,
  })
}

export type SiteFrameData = Awaited<ReturnType<typeof getSiteFrameData>>
export type SiteShellData = SiteFrameData['siteShell']
export type ContactSettingsData = SiteFrameData['contactSettings']

export type HomePageData = Awaited<ReturnType<typeof getHomePageData>>
export type HomeHeroData = HomePageData['homeHero']
export type HomeFleetData = HomePageData['homeFleet']
export type HomeServiceData = HomePageData['homeService']
export type HomeTestimonialsData = HomePageData['homeTestimonials']
