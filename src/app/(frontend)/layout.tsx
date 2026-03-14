import type { Metadata, Viewport } from 'next'
import { Heebo } from 'next/font/google'
// import { Analytics } from "@vercel/analytics/next"
import './globals.css'
import { payload } from '@/lib/p'
import { Media } from '@/payload-types'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const p = await payload()
  const siteConfig = await p.findGlobal({
    slug: 'site-config',
    depth: 100,
  })
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-background">
          <SiteHeader {...siteConfig} />

          <main>{children}</main>

          <SiteFooter {...siteConfig} />
        </div>
        {/*<Analytics />*/}
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await payload()
  const seo = await p.findGlobal({ slug: 'site-seo' })

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: seo.siteName,
      images: [
        {
          url: (seo.ogImage as Media).url as string,
        },
      ],
    },
  }
}
