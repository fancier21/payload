import { CollectionConfig } from 'payload'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrPublished } from '@/access/isAdminOrPublished'
import { mediaUrl } from '@/fields/mediaUrl'

export const Artists: CollectionConfig = {
  slug: 'artists',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: isAdminOrPublished,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['title', '_status'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'artists',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'artists',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    meta: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: false,
            },
            mediaUrl({
              name: 'avatar',
              label: 'Avatar Image',
              required: true,
              description: 'The main artist image',
            }),
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock],
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'country',
              type: 'text',
              required: true,
            },
            {
              name: 'website',
              type: 'text',
              validate: (val) => {
                if (val && !val.startsWith('http')) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'instagram',
              type: 'text',
              validate: (val) => {
                if (val && !val.startsWith('http')) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'youtube',
              type: 'text',
              validate: (val) => {
                if (val && !val.startsWith('http')) {
                  return 'Please enter a valid URL starting with http:// or https://'
                }
                return true
              },
            },
          ],
          label: 'Artist Details',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField('title', {
      slugOverrides: {
        required: true,
      },
    }),
  ],
}
