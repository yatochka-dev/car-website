'use server'

import { redirect } from 'next/navigation'

import { payload } from '@/lib/p'
import { sendContactFormNotification } from '@/lib/mail'

export async function submitContactForm(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const date = String(formData.get('date') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !phone) {
    throw new Error('חובה למלא שם וטלפון')
  }

  const p = await payload()

  const [siteShell, usersResult] = await Promise.all([
    p.findGlobal({
      slug: 'site-shell',
      depth: 0,
      select: {
        brand: true,
      },
    }),
    p.find({
      collection: 'users',
      depth: 0,
      limit: 1000,
      select: {
        email: true,
      },
    }),
  ])

  const adminEmails = Array.from(
    new Set(
      usersResult.docs
        .map((user) => user.email?.trim().toLowerCase())
        .filter((email): email is string => Boolean(email)),
    ),
  )

  await sendContactFormNotification({
    adminEmails,
    brandName: siteShell.brand.name,
    date: date || null,
    message: message || null,
    phone,
    siteURL: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || null,
    submitterName: name,
  })

  redirect('/?contactSubmitted=1#contact')
}
