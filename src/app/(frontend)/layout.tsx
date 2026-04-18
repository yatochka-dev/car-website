import type { Metadata, Viewport } from 'next'
import { Heebo } from 'next/font/google'

import { getSiteSEO } from '@/lib/site-globals'
import type { Media } from '@/payload-types'

import './globals.css'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSEO()

  return {
    title: seo.title,
    description: seo.description,
    icons: [{ url: './favicon.ico', rel: 'icon' }],
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: seo.siteName,
      images: seo.ogImage
        ? [
            {
              url: (seo.ogImage as Media).url as string,
            },
          ]
        : undefined,
    },
  }
}
