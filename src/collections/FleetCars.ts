import { FleetVehicle, SiteConfig } from '@/payload-types'
import type { CollectionConfig } from 'payload'
import { v4 as uuid } from 'uuid'
export const FleetVehicles: CollectionConfig = {
  slug: 'fleet-vehicles',
  labels: {
    singular: 'Fleet Vehicle',
    plural: 'Fleet Vehicles',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Site Settings',
    description: 'רכבי צי + טווחי תאריכים תפוסים',
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
      type: 'text',
      required: true,
      defaultValue: uuid,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'רולס רויס גוסט',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'פסגת היוקרה הבריטית. חוויית נסיעה שקטה ומפנקת ברמה הגבוהה ביותר.',
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      hasMany: true,
      minRows: 1,
      maxRows: 10,
    },
    {
      name: 'seats',
      type: 'number',
      required: true,
      min: 1,
      defaultValue: 4,
    },
    {
      name: 'tags',
      type: 'array',
      required: true,
      minRows: 1,
      defaultValue: [{ tag: 'חתונות' }, { tag: 'VIP' }],
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bookings',
      type: 'array',
      required: true,
      defaultValue: [],
      labels: {
        singular: 'Booking Date',
        plural: 'Booking Dates',
      },
      fields: [
        {
          name: 'date',
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
          type: 'text',
          required: false,
          access: {
            read: ({ req }) => {
              // Only allow Payload admins / server-side trusted users
              return !!req.user
            },
            create: ({ req }) => !!req.user,
            update: ({ req }) => !!req.user,
          },
        },
        {
          name: 'notes',
          type: 'textarea',
          required: false,

          access: {
            read: ({ req }) => {
              // Only allow Payload admins / server-side trusted users
              return !!req.user
            },
            create: ({ req }) => !!req.user,
            update: ({ req }) => !!req.user,
          },
        },
      ],
      validate: (value) => {
        if (!Array.isArray(value)) return true

        for (const booking of value) {
          // @ts-expect-error
          if (!booking?.startDate || !booking?.endDate) continue

          // @ts-expect-error
          const start = new Date(booking.startDate).getTime()
          // @ts-expect-error
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
