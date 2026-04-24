import type { HomePageData } from '@/lib/site-globals'

import { ContactSection } from '@/components/sections/contact-section'
import { FleetSection } from '@/components/sections/fleet-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ServiceSection } from '@/components/sections/service-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

type Props = {
  data: HomePageData
}

export function HomePageContent({ data }: Props) {
  return (
    <>
      <HeroSection {...data.homeHero} />
      <FleetSection {...data.homeFleet} />
      <ServiceSection {...data.homeService} />
      <TestimonialsSection {...data.homeTestimonials} />
      <ContactSection contact={data.contactSettings} />
    </>
  )
}
