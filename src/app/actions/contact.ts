'use server'

import { payload } from '@/lib/p'
import { sendTelegramMessage } from '@/lib/tg'
import { redirect } from 'next/navigation'

export async function submitContactForm(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const dateFrom = String(formData.get('dateFrom') ?? '').trim()
  const dateTo = String(formData.get('dateTo') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !phone) {
    throw new Error('Name and phone are required')
  }

  console.log('New contact form submission:', {
    name,
    phone,
    date: dateFrom || null,
    datet: dateTo || null,
    message: message || null,
    submittedAt: new Date().toISOString(),
  })

  const date = dateFrom
    ? dateTo
      ? `Has an event from *${dateFrom}* till *${dateTo}*`
      : `Has an event on *${dateFrom}*`
    : ''
  const msg = `
    New Contact Request.\nname: *${name}*\nphone number: *${phone}*\n${date}\n\n\`\`\`${message}\`\`\``

  await sendTelegramMessage(
    msg,
    process.env.TG_TOKEN as string,
    (await (await payload()).findGlobal({ slug: 'site-config' })).tg_chat_id,
  )

  redirect('/?contactSubmitted=1#contact')
}
