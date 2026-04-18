import type { GlobalConfig } from 'payload'

import { defaultGlobalAccess, siteSettingsGroup } from './shared'

export const HomeTestimonials: GlobalConfig = {
  slug: 'home-testimonials',
  label: 'עמוד הבית: המלצות',
  admin: {
    group: siteSettingsGroup,
    description: 'כותרת ההמלצות והעדויות המוצגות בעמוד הבית.',
  },
  access: defaultGlobalAccess,
  fields: [
    {
      name: 'sectionTitle',
      label: 'כותרת הסקשן',
      type: 'text',
      required: true,
      defaultValue: 'מה הלקוחות שלנו אומרים',
    },
    {
      name: 'items',
      label: 'המלצות',
      type: 'array',
      required: true,
      labels: {
        singular: 'המלצה',
        plural: 'המלצות',
      },
      defaultValue: [
        {
          id: 't1',
          name: 'מיכל ודניאל',
          text: 'הרולס רויס הפך את החתונה שלנו למושלמת. הנהג היה מקצועי ואדיב, והרכב היה מרהיב.',
          rating: 5,
        },
        {
          id: 't2',
          name: 'אבי כהן',
          text: 'שירות ברמה בינלאומית. השתמשתי בשירות לאירוע עסקי והתרשמתי מכל פרט ופרט.',
          rating: 5,
        },
        {
          id: 't3',
          name: 'שירה לוי',
          text: 'חוויה שלא נשכחת! הבנטלי היה מדהים ושירות הלקוחות היה מעולה מתחילה ועד סוף.',
          rating: 5,
        },
      ],
      fields: [
        {
          name: 'id',
          label: 'מזהה פנימי',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          label: 'שם הלקוח',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          label: 'תוכן ההמלצה',
          type: 'textarea',
          required: true,
        },
        {
          name: 'rating',
          label: 'דירוג',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
        },
      ],
    },
  ],
}
