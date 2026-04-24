const notificationSender = 'cars@yatochka.dev'

type ContactNotificationArgs = {
  adminEmails: string[]
  brandName: string
  date: null | string
  message: null | string
  phone: string
  siteURL: null | string
  submitterName: string
}

type SendEmailResponse = {
  id?: string
  message?: string
  name?: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function buildMessageLines({
  date,
  message,
  phone,
  siteURL,
  submitterName,
}: Omit<ContactNotificationArgs, 'adminEmails' | 'brandName'>) {
  return [
    `שם מלא: ${submitterName}`,
    `טלפון: ${phone}`,
    date ? `תאריך מועדף: ${date}` : null,
    siteURL ? `אתר: ${siteURL}` : null,
    '',
    'הודעה:',
    message || 'לא הוזנה הודעה.',
  ].filter(Boolean) as string[]
}

export async function sendContactFormNotification({
  adminEmails,
  brandName,
  date,
  message,
  phone,
  siteURL,
  submitterName,
}: ContactNotificationArgs) {
  const apiKey = process.env.RESEND_KEY?.trim()

  if (!apiKey) {
    throw new Error('חסר מפתח API לשליחת אימייל')
  }

  if (!adminEmails.length) {
    throw new Error('לא נמצאו כתובות אימייל לשליחת ההתראה')
  }

  const subject = `פנייה חדשה מהאתר - ${brandName}`
  const lines = buildMessageLines({
    date,
    message,
    phone,
    siteURL,
    submitterName,
  })

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;text-align:right">
      <h2 style="margin-bottom:16px;">פנייה חדשה מטופס יצירת הקשר</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">
        <tbody>
          <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;"><strong>שם מלא</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(submitterName)}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;"><strong>טלפון</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(phone)}</td></tr>
          ${
            date
              ? `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;"><strong>תאריך מועדף</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(date)}</td></tr>`
              : ''
          }
          ${
            siteURL
              ? `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;"><strong>אתר</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(siteURL)}</td></tr>`
              : ''
          }
        </tbody>
      </table>
      <div style="margin-top:16px;">
        <strong>הודעה</strong>
        <p style="white-space:pre-wrap;">${escapeHtml(message || 'לא הוזנה הודעה.')}</p>
      </div>
    </div>
  `.trim()

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `contact-form-${crypto.randomUUID()}`,
      'User-Agent': 'car-website/contact-form',
    },
    body: JSON.stringify({
      from: `${brandName} <${notificationSender}>`,
      html,
      subject,
      text: lines.join('\n'),
      to: adminEmails,
    }),
  })

  const data = (await response.json()) as SendEmailResponse

  if (!response.ok) {
    const details = data.message || data.name || 'שגיאה לא ידועה'
    throw new Error(`שגיאה בשליחת האימייל: ${details}`)
  }

  return data
}
