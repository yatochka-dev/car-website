import type { GlobalConfig } from 'payload'

import { defaultGlobalAccess, siteSettingsGroup } from './shared'

export const HomeService: GlobalConfig = {
  slug: 'home-service',
  label: 'עמוד הבית: השירות',
  admin: {
    group: siteSettingsGroup,
    description: 'כותרות ויתרונות השירות של עמוד הבית.',
  },
  access: defaultGlobalAccess,
  fields: [
    {
      name: 'sectionTitle',
      label: 'כותרת הסקשן',
      type: 'text',
      required: true,
      defaultValue: 'השירות שלנו',
    },
    {
      name: 'sectionSubtitle',
      label: 'תיאור הסקשן',
      type: 'textarea',
      required: true,
      defaultValue: 'חוויה מושלמת מהרגע הראשון ועד הרגע האחרון.',
    },
    {
      name: 'features',
      label: 'יתרונות השירות',
      type: 'array',
      required: true,
      labels: {
        singular: 'יתרון',
        plural: 'יתרונות',
      },
      defaultValue: [
        {
          id: 'luxury',
          icon: 'crown',
          title: 'רכבים מהשורה הראשונה',
          description:
            'רק רכבי הפרימיום המובילים בעולם, מתוחזקים ומטופלים ברמה הגבוהה ביותר.',
        },
        {
          id: 'safety',
          icon: 'shield',
          title: 'בטיחות ללא פשרות',
          description: 'נהגים מקצועיים ומנוסים, רכבים מבוטחים במלואם, שקט נפשי מוחלט.',
        },
        {
          id: 'punctual',
          icon: 'clock',
          title: 'דייקנות מוחלטת',
          description: 'אנחנו מגיעים בזמן, בכל פעם. תכנון מדויק ומעקב בזמן אמת.',
        },
        {
          id: 'experience',
          icon: 'star',
          title: 'חוויה אישית',
          description: 'כל אירוע מותאם אישית לצרכים שלכם. מהמוזיקה ועד הקישוטים.',
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
          name: 'icon',
          label: 'אייקון',
          type: 'select',
          required: true,
          options: [
            { label: 'כתר', value: 'crown' },
            { label: 'מגן', value: 'shield' },
            { label: 'שעון', value: 'clock' },
            { label: 'כוכב', value: 'star' },
          ],
        },
        {
          name: 'title',
          label: 'כותרת',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'תיאור',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
