import { SiteFrame } from '@/components/layout/site-frame'
import { HomePageContent } from '@/components/pages/home-page-content'
import { RefreshRouteOnSave } from '@/components/payload/refresh-route-on-save'
import { getHomePageData } from '@/lib/site-globals'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LivePreviewPage() {
  const data = await getHomePageData()

  return (
    <SiteFrame>
      <RefreshRouteOnSave />
      <HomePageContent data={data} />
    </SiteFrame>
  )
}
