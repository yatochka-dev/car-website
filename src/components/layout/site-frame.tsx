import type { ReactNode } from 'react'

import { getSiteFrameData } from '@/lib/site-globals'

import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

type Props = {
  children: ReactNode
}

export async function SiteFrame({ children }: Props) {
  const { siteShell, contactSettings } = await getSiteFrameData()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader shell={siteShell} contact={contactSettings} />
      <main>{children}</main>
      <SiteFooter shell={siteShell} contact={contactSettings} />
    </div>
  )
}
