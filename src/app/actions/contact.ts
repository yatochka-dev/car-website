'use server'

import { redirect } from 'next/navigation'

import { payload } from '@/lib/p'
import { sendTelegramMessage } from '@/lib/tg'

export async function submitContactForm(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const date = String(formData.get('date') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !phone) {
    throw new Error('חובה למלא שם וטלפון')
  }

  const details = [
    'פניית קשר חדשה',
    `שם: *${name}*`,
    `טלפון: *${phone}*`,
    date ? `תאריך: ${date}` : null,
    '',
    `\`\`\`${message}\`\`\``,
  ]
    .filter(Boolean)
    .join('\n')

  const p = await payload()
  const contactSettings = await p.findGlobal({ slug: 'contact-settings' })

  await sendTelegramMessage(details, process.env.TG_TOKEN as string, contactSettings.tgChatId)

  redirect('/?contactSubmitted=1#contact')
}
