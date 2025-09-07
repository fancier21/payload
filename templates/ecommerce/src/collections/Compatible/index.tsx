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

export const Compatible: CollectionConfig = {
  slug: 'compatible',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: isAdminOrPublished,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['title', '_status'],
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    icon: true,
    meta: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            mediaUrl({
              name: 'icon',
              label: 'Icon/Image',
              description: 'Photo with external image URL',
              required: true,
            }),
          ],
          label: 'Media',
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
