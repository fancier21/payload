import type { Field } from 'payload'

export const mediaUrl = (options: {
  name: string
  label?: string
  required?: boolean
  hasMany?: boolean
  maxRows?: number
  description?: string
}): Field => {
  const { name, label, required = false, hasMany = false, maxRows, description } = options

  const baseFields = [
    {
      name: 'url',
      type: 'text' as const,
      required: true,
      label: 'Image URL',
      // validate: (val: string) => {
      //   if (val && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val)) {
      //     return 'Please enter a valid image URL (jpg, jpeg, png, gif, webp, svg)'
      //   }
      //   return true
      // },
    },
    {
      name: 'alt',
      type: 'text' as const,
      required: true,
      label: 'Alt Text',
    },
    {
      name: 'caption',
      type: 'text' as const,
      label: 'Caption',
    },
  ]

  if (hasMany) {
    return {
      name,
      type: 'array',
      label: label || name,
      required,
      ...(maxRows && { maxRows }),
      fields: baseFields,
      admin: {
        description: description || 'Add images by URL',
      },
    }
  }

  return {
    name,
    type: 'group',
    label: label || name,
    required,
    fields: baseFields,
    admin: {
      description: description || 'Add image by URL',
    },
  }
}
