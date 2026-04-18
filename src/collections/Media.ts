import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'מדיה',
    plural: 'מדיה',
  },
  admin: {
    group: 'הגדרות האתר',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'טקסט חלופי',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
  },
}
