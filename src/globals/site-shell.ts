import type { GlobalConfig } from 'payload'

import {
  defaultGlobalAccess,
  linkFields,
  siteSettingsGroup,
} from './shared'

export const SiteShell: GlobalConfig = {
  slug: 'site-shell',
  label: 'מעטפת האתר',
  admin: {
    group: siteSettingsGroup,
    description: 'מיתוג, ניווט עליון וקישורי תחתית לכל האתר.',
  },
  access: defaultGlobalAccess,
  fields: [
    {
      name: 'brand',
      label: 'מותג',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'name',
          label: 'שם המותג',
          type: 'text',
          required: true,
          defaultValue: 'הבוטיק',
        },
        {
          name: 'tagline',
          label: 'שורת תיאור',
          type: 'text',
          required: true,
          defaultValue: 'השכרת רכבי יוקרה',
        },
      ],
    },
    {
      name: 'nav',
      label: 'ניווט עליון',
      type: 'array',
      required: true,
      labels: {
        singular: 'קישור ניווט',
        plural: 'קישורי ניווט',
      },
      defaultValue: [
        { label: 'ראשי', href: '#hero' },
        { label: 'צי הרכבים', href: '#fleet' },
        { label: 'השירות', href: '#service' },
        { label: 'המלצות', href: '#testimonials' },
        { label: 'צור קשר', href: '#contact' },
      ],
      fields: linkFields('טקסט הניווט'),
    },
    {
      name: 'footer',
      label: 'כותרת תחתונה',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'copyright',
          label: 'טקסט זכויות יוצרים',
          type: 'text',
          required: true,
          defaultValue: 'כל הזכויות שמורות להבוטיק',
        },
        {
          name: 'links',
          label: 'קישורי תחתית',
          type: 'array',
          required: true,
          labels: {
            singular: 'קישור תחתית',
            plural: 'קישורי תחתית',
          },
          defaultValue: [
            { label: 'תנאי שימוש', href: '/use' },
            { label: 'מדיניות פרטיות', href: '/privacy' },
          ],
          fields: linkFields(),
        },
      ],
    },
  ],
}
