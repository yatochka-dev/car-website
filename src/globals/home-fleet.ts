import type { GlobalConfig } from 'payload'

import { defaultGlobalAccess, siteSettingsGroup } from './shared'

export const HomeFleet: GlobalConfig = {
  slug: 'home-fleet',
  label: 'עמוד הבית: צי רכבים',
  admin: {
    group: siteSettingsGroup,
    description: 'כותרת ותיאור סקשן צי הרכבים בעמוד הבית.',
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
  ],
}
