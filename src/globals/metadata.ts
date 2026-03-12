import { GlobalConfig } from 'payload'

export const SiteSEO: GlobalConfig = {
  slug: 'site-seo',
  label: 'Site SEO',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      label: 'Site Name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      label: 'Default Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Used as the base title for the website',
      },
    },
    {
      name: 'description',
      label: 'Meta Description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Recommended length: 150–160 characters',
      },
    },
    {
      name: 'ogImage',
      label: 'Open Graph Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'robots',
      label: 'Robots Indexing',
      type: 'select',
      defaultValue: 'noindex',
      options: [
        {
          label: 'Index',
          value: 'index',
        },
        {
          label: 'No Index',
          value: 'noindex',
        },
      ],
      admin: {
        description: 'Keep NOINDEX until the final domain launches',
      },
    },
  ],
}
