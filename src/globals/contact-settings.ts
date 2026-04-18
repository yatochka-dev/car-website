import type { GlobalConfig } from 'payload'

import { defaultGlobalAccess, siteSettingsGroup } from './shared'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'פרטי קשר',
  admin: {
    group: siteSettingsGroup,
    description: 'פרטי התקשרות ויעד הטלגרם של פניות מהאתר.',
  },
  access: defaultGlobalAccess,
  fields: [
    {
      name: 'tgChatId',
      label: 'מזהה צ׳אט בטלגרם',
      type: 'text',
      required: true,
      defaultValue: '5918252925',
    },
    {
      name: 'phone',
      label: 'מספר טלפון',
      type: 'text',
      required: true,
      defaultValue: '+972500000000',
    },
    {
      name: 'phoneDisplay',
      label: 'טלפון לתצוגה',
      type: 'text',
      required: true,
      defaultValue: '050-000-0000',
    },
    {
      name: 'whatsapp',
      label: 'קישור WhatsApp',
      type: 'text',
      required: true,
      defaultValue: 'https://wa.me/972500000000',
    },
    {
      name: 'whatsappDisplay',
      label: 'טקסט כפתור WhatsApp',
      type: 'text',
      required: true,
      defaultValue: 'WhatsApp',
    },
    {
      name: 'email',
      label: 'אימייל',
      type: 'email',
      required: true,
      defaultValue: 'info@haboutique.co.il',
    },
    {
      name: 'address',
      label: 'כתובת',
      type: 'text',
      required: true,
      defaultValue: 'תל אביב, ישראל',
    },
  ],
}
