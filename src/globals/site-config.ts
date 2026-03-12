import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'Site Configuration',
  admin: {
    group: 'Site Settings',
    description: 'Single source of truth for site text, links, and metadata.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'tg_chat_id',
      type: 'text',
      required: true,
      defaultValue: '5918252925',
    },
    {
      name: 'brand',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          defaultValue: 'הבוטיק',
        },
        {
          name: 'tagline',
          type: 'text',
          required: true,
          defaultValue: 'השכרת רכבי יוקרה',
        },
      ],
    },

    {
      name: 'nav',
      type: 'array',
      required: true,
      defaultValue: [
        { label: 'ראשי', href: '#hero' },
        { label: 'צי הרכבים', href: '#fleet' },
        { label: 'השירות', href: '#service' },
        { label: 'המלצות', href: '#testimonials' },
        { label: 'צור קשר', href: '#contact' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },

    {
      name: 'contact',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '+972500000000',
        },
        {
          name: 'phoneDisplay',
          type: 'text',
          required: true,
          defaultValue: '050-000-0000',
        },
        {
          name: 'whatsapp',
          type: 'text',
          required: true,
          defaultValue: 'https://wa.me/972500000000',
        },
        {
          name: 'whatsappDisplay',
          type: 'text',
          required: true,
          defaultValue: 'WhatsApp',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'info@haboutique.co.il',
        },
        {
          name: 'address',
          type: 'text',
          required: true,
          defaultValue: 'תל אביב, ישראל',
        },
      ],
    },

    {
      name: 'hero',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
          defaultValue: 'להגיע לאירוע בסטייל של פעם בחיים',
        },
        {
          name: 'subheadline',
          type: 'textarea',
          required: true,
          defaultValue:
            'שירות רכבי יוקרה עם נהג צמוד לאירועים מיוחדים. חתונות, ימי הולדת, אירועים עסקיים ועוד.',
        },
        {
          name: 'cta',
          type: 'text',
          required: true,
          defaultValue: 'הזמינו עכשיו',
        },
        {
          name: 'ctaHref',
          type: 'text',
          required: true,
          defaultValue: '#contact',
        },
        {
          name: 'backgroundImage',
          type: 'text',
          required: true,
          defaultValue: '/images/hero-car.jpg',
        },
      ],
    },

    {
      name: 'fleet',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          defaultValue: 'צי הרכבים שלנו',
        },
        {
          name: 'sectionSubtitle',
          type: 'textarea',
          required: true,
          defaultValue: 'מבחר רכבי יוקרה מהמובילים בעולם, מתוחזקים ברמה הגבוהה ביותר.',
        },
        {
          name: 'vehicles',
          type: 'relationship',
          relationTo: 'fleet-vehicles',
          hasMany: true,
          required: true,
          admin: {
            description: 'בחר רכבים שיוצגו באתר',
          },
        },
      ],
    },

    {
      name: 'service',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          defaultValue: 'השירות שלנו',
        },
        {
          name: 'sectionSubtitle',
          type: 'textarea',
          required: true,
          defaultValue: 'חוויה מושלמת מהרגע הראשון ועד הרגע האחרון.',
        },
        {
          name: 'features',
          type: 'array',
          required: true,
          defaultValue: [
            {
              id: 'luxury',
              icon: 'crown',
              title: 'רכבים מהשורה הראשונה',
              description: 'רק רכבי הפרימיום המובילים בעולם, מתוחזקים ומטופלים ברמה הגבוהה ביותר.',
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
            { name: 'id', type: 'text', required: true },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Crown', value: 'crown' },
                { label: 'Shield', value: 'shield' },
                { label: 'Clock', value: 'clock' },
                { label: 'Star', value: 'star' },
              ],
            },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
      ],
    },

    {
      name: 'testimonials',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          defaultValue: 'מה הלקוחות שלנו אומרים',
        },
        {
          name: 'items',
          type: 'array',
          required: true,
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
            { name: 'id', type: 'text', required: true },
            { name: 'name', type: 'text', required: true },
            { name: 'text', type: 'textarea', required: true },
            { name: 'rating', type: 'number', required: true, min: 1, max: 5 },
          ],
        },
      ],
    },

    {
      name: 'footer',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'copyright',
          type: 'text',
          required: true,
          defaultValue: 'כל הזכויות שמורות להבוטיק',
        },
        {
          name: 'links',
          type: 'array',
          required: true,
          defaultValue: [
            { label: 'תנאי שימוש', href: '#' },
            { label: 'מדיניות פרטיות', href: '#' },
          ],
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
