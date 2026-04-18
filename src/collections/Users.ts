import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'משתמש',
    plural: 'משתמשים',
  },
  admin: {
    useAsTitle: 'email',
    group: 'ניהול',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
