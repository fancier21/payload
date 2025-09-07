import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const MediaUrlBlock: Block = {
  slug: 'mediaUrlBlock',
  interfaceName: 'MediaUrlBlock',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Image URL',
      admin: {
        description: 'Enter the full URL of the image (e.g., https://example.com/image.jpg)',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      label: 'Caption',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
}
