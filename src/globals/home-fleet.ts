import type { GlobalConfig } from 'payload'

import { defaultGlobalAccess, siteSettingsGroup } from './shared'

export const HomeFleet: GlobalConfig = {
  slug: 'home-fleet',
  label: 'עמוד הבית: צי רכבים',
  admin: {
    group: siteSettingsGroup,
    description: 'כותרת הסקשן והרכבים המוצגים בעמוד הבית.',
  },
  access: defaultGlobalAccess,
  fields: [
    {
      name: 'sectionTitle',
      label: 'כותרת הסקשן',
      type: 'text',
      required: true,
      defaultValue: 'צי הרכבים שלנו',
    },
    {
      name: 'sectionSubtitle',
      label: 'תיאור הסקשן',
      type: 'textarea',
      required: true,
      defaultValue: 'מבחר רכבי יוקרה מהמובילים בעולם, מתוחזקים ברמה הגבוהה ביותר.',
    },
    {
      name: 'vehicles',
      label: 'רכבים מוצגים',
      type: 'relationship',
      relationTo: 'fleet-vehicles',
      hasMany: true,
      required: true,
      admin: {
        description: 'בחר את הרכבים שיוצגו בעמוד הבית.',
      },
    },
  ],
}
