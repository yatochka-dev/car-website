'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { useSearchParams } from 'next/navigation'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { HomePageContent } from '@/components/pages/home-page-content'
import type {
  ContactSettingsData,
  HomeFleetData,
  HomePageData,
  HomeServiceData,
  HomeTestimonialsData,
  SiteFrameData,
  SiteShellData,
} from '@/lib/site-globals'
import type { FleetVehicle } from '@/payload-types'

type Props = {
  initialHomeData: HomePageData
  initialSiteFrameData: SiteFrameData
}

function resolveServerURL() {
  return (
    process.env.NEXT_PUBLIC_PAYLOAD_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : '')
  )
}

function normalizeHomeFleetData(homeFleet: HomeFleetData): HomeFleetData {
  return {
    ...homeFleet,
    vehicles: (homeFleet.vehicles ?? []).filter(
      (vehicle): vehicle is FleetVehicle => typeof vehicle !== 'string',
    ),
  }
}

type PreviewScaffoldProps = {
  siteShell: SiteShellData
  contactSettings: ContactSettingsData
  homeHero: HomePageData['homeHero']
  homeFleet: HomeFleetData
  homeService: HomeServiceData
  homeTestimonials: HomeTestimonialsData
}

function PreviewScaffold({
  siteShell,
  contactSettings,
  homeHero,
  homeFleet,
  homeService,
  homeTestimonials,
}: PreviewScaffoldProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader shell={siteShell} contact={contactSettings} />
      <main>
        <HomePageContent
          data={{
            homeHero,
            homeFleet,
            homeService,
            homeTestimonials,
            contactSettings,
          }}
        />
      </main>
      <SiteFooter shell={siteShell} contact={contactSettings} />
    </div>
  )
}

function DefaultPreview({ initialHomeData, initialSiteFrameData }: Props) {
  return (
    <PreviewScaffold
      siteShell={initialSiteFrameData.siteShell}
      contactSettings={initialSiteFrameData.contactSettings}
      homeHero={initialHomeData.homeHero}
      homeFleet={initialHomeData.homeFleet}
      homeService={initialHomeData.homeService}
      homeTestimonials={initialHomeData.homeTestimonials}
    />
  )
}

function SiteShellPreview({ initialHomeData, initialSiteFrameData }: Props) {
  const { data: siteShell } = useLivePreview({
    initialData: initialSiteFrameData.siteShell,
    serverURL: resolveServerURL(),
  })

  return (
    <PreviewScaffold
      siteShell={siteShell}
      contactSettings={initialSiteFrameData.contactSettings}
      homeHero={initialHomeData.homeHero}
      homeFleet={initialHomeData.homeFleet}
      homeService={initialHomeData.homeService}
      homeTestimonials={initialHomeData.homeTestimonials}
    />
  )
}

function ContactSettingsPreview({ initialHomeData, initialSiteFrameData }: Props) {
  const { data: contactSettings } = useLivePreview({
    initialData: initialSiteFrameData.contactSettings,
    serverURL: resolveServerURL(),
  })

  return (
    <PreviewScaffold
      siteShell={initialSiteFrameData.siteShell}
      contactSettings={contactSettings}
      homeHero={initialHomeData.homeHero}
      homeFleet={initialHomeData.homeFleet}
      homeService={initialHomeData.homeService}
      homeTestimonials={initialHomeData.homeTestimonials}
    />
  )
}

function HomeHeroPreview({ initialHomeData, initialSiteFrameData }: Props) {
  const { data: homeHero } = useLivePreview({
    depth: 1,
    initialData: initialHomeData.homeHero,
    serverURL: resolveServerURL(),
  })

  return (
    <PreviewScaffold
      siteShell={initialSiteFrameData.siteShell}
      contactSettings={initialSiteFrameData.contactSettings}
      homeHero={homeHero}
      homeFleet={initialHomeData.homeFleet}
      homeService={initialHomeData.homeService}
      homeTestimonials={initialHomeData.homeTestimonials}
    />
  )
}

function HomeFleetPreview({ initialHomeData, initialSiteFrameData }: Props) {
  const { data: liveHomeFleet } = useLivePreview({
    depth: 2,
    initialData: initialHomeData.homeFleet,
    serverURL: resolveServerURL(),
  })

  const homeFleet = normalizeHomeFleetData(liveHomeFleet)

  return (
    <PreviewScaffold
      siteShell={initialSiteFrameData.siteShell}
      contactSettings={initialSiteFrameData.contactSettings}
      homeHero={initialHomeData.homeHero}
      homeFleet={homeFleet}
      homeService={initialHomeData.homeService}
      homeTestimonials={initialHomeData.homeTestimonials}
    />
  )
}

function HomeServicePreview({ initialHomeData, initialSiteFrameData }: Props) {
  const { data: homeService } = useLivePreview({
    initialData: initialHomeData.homeService,
    serverURL: resolveServerURL(),
  })

  return (
    <PreviewScaffold
      siteShell={initialSiteFrameData.siteShell}
      contactSettings={initialSiteFrameData.contactSettings}
      homeHero={initialHomeData.homeHero}
      homeFleet={initialHomeData.homeFleet}
      homeService={homeService}
      homeTestimonials={initialHomeData.homeTestimonials}
    />
  )
}

function HomeTestimonialsPreview({ initialHomeData, initialSiteFrameData }: Props) {
  const { data: homeTestimonials } = useLivePreview({
    initialData: initialHomeData.homeTestimonials,
    serverURL: resolveServerURL(),
  })

  return (
    <PreviewScaffold
      siteShell={initialSiteFrameData.siteShell}
      contactSettings={initialSiteFrameData.contactSettings}
      homeHero={initialHomeData.homeHero}
      homeFleet={initialHomeData.homeFleet}
      homeService={initialHomeData.homeService}
      homeTestimonials={homeTestimonials}
    />
  )
}

export function HomeLivePreview(props: Props) {
  const searchParams = useSearchParams()
  const activeGlobal = searchParams.get('global')

  switch (activeGlobal) {
    case 'site-shell':
      return <SiteShellPreview {...props} />
    case 'contact-settings':
      return <ContactSettingsPreview {...props} />
    case 'home-hero':
      return <HomeHeroPreview {...props} />
    case 'home-fleet':
      return <HomeFleetPreview {...props} />
    case 'home-service':
      return <HomeServicePreview {...props} />
    case 'home-testimonials':
      return <HomeTestimonialsPreview {...props} />
    default:
      return <DefaultPreview {...props} />
  }
}
