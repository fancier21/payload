import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from '@/fields/slug'
import { mediaUrl } from '@/fields/mediaUrl'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'
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
import { Field } from 'payload'

export const ProductsCollection: CollectionOverride = {
  admin: {
    defaultColumns: ['title', 'enableVariants', '_status', 'variants.variants'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'products',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'products',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    producer: true,
    slug: true,
    grape: true,
    // variantOptions: true,
    // variants: true,
    // enableVariants: true,
    gallery: true,
    taste: true,
    compatibility: true,
    priceInUSD: true,
    inventory: true,
    meta: true,
  },
  fields: ({ defaultFields }) => {
    const fields: Field[] = [
      { name: 'title', type: 'text', required: true },
      {
        name: 'grape',
        type: 'relationship',
        filterOptions: ({ id }) => {
          return {
            id: {
              not_in: [id],
            },
          }
        },
        relationTo: 'grapes',
        required: true,
        admin: {
          description: 'Select the grape associated with this product',
        },
      },
      {
        name: 'producer',
        type: 'relationship',
        filterOptions: ({ id }) => {
          return {
            id: {
              not_in: [id],
            },
          }
        },
        relationTo: 'producers',
        required: true,
        admin: {
          description: 'Select the producer associated with this product',
        },
      },
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
                name: 'gallery',
                label: 'Photo Gallery',
                hasMany: true,
                description: 'Photo gallery with external image URLs',
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
              ...defaultFields,
              {
                name: 'relatedProducts',
                type: 'relationship',
                filterOptions: ({ id }) => {
                  if (id) {
                    return {
                      id: {
                        not_in: [id],
                      },
                    }
                  }

                  // ID comes back as undefined during seeding so we need to handle that case
                  return {
                    id: {
                      exists: true,
                    },
                  }
                },
                hasMany: true,
                relationTo: 'products',
              },
            ],
            label: 'Product Details',
          },
          {
            fields: [
              {
                name: 'taste',
                type: 'group',
                label: 'Taste',
                fields: [
                  {
                    label: 'Body - Light/Bold',
                    name: 'body',
                    type: 'number',
                    defaultValue: 0.5,
                    min: 0,
                    max: 1,
                    required: true,
                  },
                  {
                    label: 'Sweetness - Dry/Sweet',
                    name: 'sweetness',
                    type: 'number',
                    defaultValue: 0.5,
                    min: 0,
                    max: 1,
                    required: true,
                  },
                  {
                    label: 'Finish - Short/Long',
                    name: 'finish',
                    type: 'number',
                    defaultValue: 0.5,
                    min: 0,
                    max: 1,
                    required: true,
                  },
                  {
                    label: 'Acidity - Low/High',
                    name: 'acidity',
                    type: 'number',
                    defaultValue: 0.5,
                    min: 0,
                    max: 1,
                    required: true,
                  },
                  {
                    label: 'Tannin - Low/High',
                    name: 'tannin',
                    type: 'number',
                    defaultValue: 0.5,
                    min: 0,
                    max: 1,
                    required: true,
                  },
                ],
              },
              {
                label: 'Compatibility:',
                name: 'compatibility',
                type: 'relationship',
                filterOptions: ({ id }) => {
                  return {
                    id: {
                      not_in: [id],
                    },
                  }
                },
                relationTo: 'compatible',
                hasMany: true,
                admin: {
                  description:
                    'Upload icons that represent products that go well with this product',
                },
              },
            ],
            label: 'Preferences',
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
      {
        name: 'categories',
        type: 'relationship',
        admin: {
          position: 'sidebar',
          sortOptions: 'title',
        },
        hasMany: true,
        relationTo: 'categories',
      },
      ...slugField('title', {
        slugOverrides: {
          required: true,
        },
      }),
    ]

    return fields
  },
}
