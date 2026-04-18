import { HomeLivePreview } from '@/components/payload/home-live-preview'
import { getHomePageData, getSiteFrameData } from '@/lib/site-globals'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LivePreviewPage() {
  const [homeData, siteFrameData] = await Promise.all([getHomePageData(), getSiteFrameData()])

  return <HomeLivePreview initialHomeData={homeData} initialSiteFrameData={siteFrameData} />
}
