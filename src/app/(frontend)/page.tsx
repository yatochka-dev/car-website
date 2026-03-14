import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { HeroSection } from '@/components/sections/hero-section'
import { FleetSection } from '@/components/sections/fleet-section'
import { ServiceSection } from '@/components/sections/service-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ContactSection } from '@/components/sections/contact-section'
import { payload } from '@/lib/p'
import { FleetVehicle, SiteConfig } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Main Page
 * ---------
 * Composes all sections using data from siteConfig.
 * Each section is a self-contained component receiving only the data it needs.
 *
 * CMS Integration: Replace `siteConfig` imports with server-side data fetching
 * (e.g., `await sanity.fetch(...)`) and the page structure remains identical.
 */
export default async function HomePage() {
  const p = await payload()
  const siteConfig = await p.findGlobal({
    slug: 'site-config',
    depth: 100,
  })

  return (
    <>
      <HeroSection {...siteConfig.hero} />

      <FleetSection
        {...(siteConfig.fleet as Omit<SiteConfig['fleet'], 'vehicles'> & {
          vehicles: FleetVehicle[]
        })}
      />

      <ServiceSection {...siteConfig.service} />

      <TestimonialsSection {...siteConfig.testimonials} />

      <ContactSection contact={siteConfig.contact} submitted={false} />
    </>
  )
}
