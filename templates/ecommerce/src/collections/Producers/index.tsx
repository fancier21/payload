import { CollectionConfig } from 'payload'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { MediaUrlBlock } from '@/blocks/MediaUrlBlock/config'
import { slugField } from '@/fields/slug'
import { mediaUrl } from '@/fields/mediaUrl'
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

export const Producers: CollectionConfig = {
  slug: 'producers',
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
          collection: 'producers',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'producers',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'The producer name',
                width: '100%',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Producer tag or category',
                    width: '50%',
                  },
                },
                {
                  name: 'website',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Must start with http:// or https://',
                    width: '50%',
                  },
                  validate: (val: string) => {
                    if (val && !val.startsWith('http')) {
                      return 'Please enter a valid URL starting with http:// or https://'
                    }
                    return true
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'region',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'country',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            mediaUrl({
              name: 'avatar',
              label: 'Avatar Image',
              required: true,
              description: 'The main producer image',
            }),
          ],
        },
        {
          label: 'Description & Story',
          fields: [
            {
              name: 'description',
              type: 'richText',
              localized: true,
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
              label: 'Description',
              admin: {
                description: 'Brief description of the producer',
              },
            },
            {
              name: 'story',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: 'Story',
              admin: {
                description: "The producer's full story",
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            mediaUrl({
              name: 'gallery',
              label: 'Photo Gallery',
              hasMany: true,
              description: 'Photo gallery with external image URLs',
            }),
            mediaUrl({
              name: 'stickerCollection',
              label: 'Sticker Collection',
              hasMany: true,
              maxRows: 3,
              description: 'Stickers collection images (maximum 3)',
            }),
            mediaUrl({
              name: 'wineCollection',
              label: 'Wine Collection',
              hasMany: true,
              maxRows: 3,
              description: 'Wine collection images',
            }),
          ],
        },
        {
          label: 'Features',
          fields: [
            {
              type: 'row',
              admin: {
                className: 'feature-checkboxes',
              },
              fields: [
                {
                  name: 'inStock',
                  type: 'checkbox',
                  label: 'In Stock',
                  defaultValue: true,
                  admin: {
                    description: 'Check if product is in stock',
                    width: '33%',
                  },
                },
                {
                  name: 'guaranteed',
                  type: 'checkbox',
                  label: 'Guaranteed',
                  defaultValue: true,
                  admin: {
                    description: 'Check if product is guaranteed',
                    width: '33%',
                  },
                },
                {
                  name: 'freeDelivery',
                  type: 'checkbox',
                  label: 'Free Delivery',
                  defaultValue: true,
                  admin: {
                    description: 'Check if free delivery is available',
                    width: '33%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Page Builder',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, MediaUrlBlock, Archive],
              admin: {
                description: 'Build the page using content blocks',
              },
            },
          ],
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
              hasGenerateFn: true,
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
