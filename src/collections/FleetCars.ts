import type { CollectionConfig } from 'payload'
import { v4 as uuid } from 'uuid'

export const FleetVehicles: CollectionConfig = {
  slug: 'fleet-vehicles',
  labels: {
    singular: 'רכב בצי',
    plural: 'רכבי צי',
  },
  admin: {
    useAsTitle: 'name',
    group: 'הגדרות האתר',
    description: 'ניהול רכבי הצי ותאריכים תפוסים.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'id',
      label: 'מזהה',
      type: 'text',
      required: true,
      defaultValue: uuid,
    },
    {
      name: 'name',
      label: 'שם הרכב',
      type: 'text',
      required: true,
      defaultValue: 'רולס רויס גוסט',
    },
    {
      name: 'description',
      label: 'תיאור',
      type: 'textarea',
      required: true,
      defaultValue:
        'פסגת היוקרה הבריטית. חוויית נסיעה שקטה ומפנקת ברמה הגבוהה ביותר.',
    },
    {
      name: 'showOnHomepage',
      label: 'הצג בעמוד הבית',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'שלוט אם הרכב יוצג בסקשן צי הרכבים בעמוד הבית.',
      },
    },
    {
      name: 'homepageOrder',
      label: 'סדר בעמוד הבית',
      type: 'number',
      min: 0,
      index: true,
      admin: {
        description: 'מספר נמוך יותר יוצג קודם. רלוונטי רק עבור רכבים שמוצגים בעמוד הבית.',
        condition: (_, siblingData) => Boolean(siblingData?.showOnHomepage),
      },
      validate: (
        value: null | number | undefined,
        { siblingData }: { siblingData?: { showOnHomepage?: boolean } },
      ) => {
        if (siblingData?.showOnHomepage && (value === null || value === undefined)) {
          return 'הזינו סדר לרכב שמוצג בעמוד הבית'
        }

        return true
      },
    },
    {
      name: 'images',
      label: 'תמונות',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      hasMany: true,
      minRows: 1,
      maxRows: 10,
    },
    {
      name: 'seats',
      label: 'מספר מקומות',
      type: 'number',
      required: true,
      min: 1,
      defaultValue: 4,
    },
    {
      name: 'tags',
      label: 'תגיות',
      type: 'array',
      required: true,
      minRows: 1,
      defaultValue: [{ tag: 'חתונות' }, { tag: 'VIP' }],
      labels: {
        singular: 'תגית',
        plural: 'תגיות',
      },
      fields: [
        {
          name: 'tag',
          label: 'תגית',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bookings',
      label: 'תאריכים תפוסים',
      type: 'array',
      required: true,
      defaultValue: [],
      labels: {
        singular: 'תאריך תפוס',
        plural: 'תאריכים תפוסים',
      },
      fields: [
        {
          name: 'date',
          label: 'תאריך',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
        {
          name: 'customerName',
          label: 'שם הלקוח',
          type: 'text',
          required: false,
          access: {
            read: ({ req }) => !!req.user,
            create: ({ req }) => !!req.user,
            update: ({ req }) => !!req.user,
          },
        },
        {
          name: 'notes',
          label: 'הערות',
          type: 'textarea',
          required: false,
          access: {
            read: ({ req }) => !!req.user,
            create: ({ req }) => !!req.user,
            update: ({ req }) => !!req.user,
          },
        },
      ],
      validate: (value) => {
        if (!Array.isArray(value)) return true

        for (const booking of value) {
          // Legacy data may still contain the old range-based shape.
          // @ts-expect-error legacy rows are migrated gradually
          if (!booking?.startDate || !booking?.endDate) continue

          // @ts-expect-error legacy rows are migrated gradually
          const start = new Date(booking.startDate).getTime()
          // @ts-expect-error legacy rows are migrated gradually
          const end = new Date(booking.endDate).getTime()

          if (end < start) {
            return 'תאריך הסיום חייב להיות אחרי תאריך ההתחלה'
          }
        }

        return true
      },
    },
  ],
}
