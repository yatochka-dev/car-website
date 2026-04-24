'use server'

import { payload } from '@/lib/p'
import { sendContactFormNotification } from '@/lib/mail'

export type ContactFormState = {
  message: string
  status: 'error' | 'idle' | 'success'
}

export const initialContactFormState: ContactFormState = {
  message: '',
  status: 'idle',
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const date = String(formData.get('date') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !phone) {
    return {
      message: 'יש למלא שם וטלפון.',
      status: 'error',
    }
  }

  try {
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

    return {
      message: 'ההודעה נשלחה בהצלחה. נחזור אליכם בהקדם.',
      status: 'success',
    }
  } catch (error) {
    console.error('Contact form submission failed', error)

    return {
      message: 'אירעה תקלה בשליחת הטופס. נסו שוב בעוד רגע או צרו קשר בטלפון.',
      status: 'error',
    }
  }
}
