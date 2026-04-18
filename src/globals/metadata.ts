import type { GlobalConfig } from 'payload'

import { defaultGlobalAccess, siteSettingsGroup } from './shared'

export const SiteSEO: GlobalConfig = {
  slug: 'site-seo',
  label: 'SEO לאתר',
  admin: {
    group: siteSettingsGroup,
    description: 'כותרות ומטא-דאטה ברירת מחדל לאתר.',
  },
  access: defaultGlobalAccess,
  fields: [
    {
      name: 'siteName',
      label: 'שם האתר',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      label: 'כותרת ברירת מחדל',
      type: 'text',
      required: true,
      admin: {
        description: 'מוצגת כברירת מחדל בכותרת הדפדפן ובשיתופים.',
      },
    },
    {
      name: 'description',
      label: 'תיאור מטא',
      type: 'textarea',
      required: true,
      admin: {
        description: 'מומלץ לשמור על אורך של 150 עד 160 תווים.',
      },
    },
    {
      name: 'ogImage',
      label: 'תמונת Open Graph',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'robots',
      label: 'אינדוקס במנועי חיפוש',
      type: 'select',
      defaultValue: 'noindex',
      options: [
        {
          label: 'לאנדקס',
          value: 'index',
        },
        {
          label: 'לא לאנדקס',
          value: 'noindex',
        },
      ],
      admin: {
        description: 'השאר על noindex עד שהדומיין הסופי מוכן לעלייה לאוויר.',
      },
    },
  ],
}
