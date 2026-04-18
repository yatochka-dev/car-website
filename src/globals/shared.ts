import type { Field, GlobalConfig } from 'payload'

export const siteSettingsGroup = 'הגדרות האתר'

export const defaultGlobalAccess: NonNullable<GlobalConfig['access']> = {
  read: () => true,
  update: ({ req }) => Boolean(req.user),
}

export const defaultLivePreviewPath = '/live-preview'

export const linkFields = (labelFieldLabel = 'טקסט הקישור'): Field[] => [
  {
    name: 'label',
    label: labelFieldLabel,
    type: 'text',
    required: true,
  },
  {
    name: 'href',
    label: 'כתובת הקישור',
    type: 'text',
    required: true,
  },
]
