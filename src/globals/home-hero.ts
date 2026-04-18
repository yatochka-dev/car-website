import type { GlobalConfig } from 'payload'

import { defaultGlobalAccess, siteSettingsGroup } from './shared'

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: 'עמוד הבית: הירו',
  admin: {
    group: siteSettingsGroup,
    description: 'הכותרת הראשית והתמונה המובילה של עמוד הבית.',
  },
  access: defaultGlobalAccess,
  fields: [
    {
      name: 'headline',
      label: 'כותרת ראשית',
      type: 'text',
      required: true,
      defaultValue: 'להגיע לאירוע בסטייל של פעם בחיים',
    },
    {
      name: 'subheadline',
      label: 'כותרת משנה',
      type: 'textarea',
      required: true,
      defaultValue:
        'שירות רכבי יוקרה עם נהג צמוד לאירועים מיוחדים. חתונות, ימי הולדת, אירועים עסקיים ועוד.',
    },
    {
      name: 'cta',
      label: 'טקסט כפתור',
      type: 'text',
      required: true,
      defaultValue: 'הזמינו עכשיו',
    },
    {
      name: 'ctaHref',
      label: 'קישור הכפתור',
      type: 'text',
      required: true,
      defaultValue: '#contact',
    },
    {
      name: 'backgroundImage',
      label: 'תמונת רקע',
      type: 'relationship',
      required: true,
      relationTo: 'media',
    },
  ],
}
