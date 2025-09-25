import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { homePageData } from './home'

const collections: CollectionSlug[] = [
  'media',
  'pages',
  'producers',
  'products',
  'artists',
  'forms',
  'form-submissions',
]

const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

  payload.logger.info(`— Seeding pages...`)

  const homePage = await payload.create({
    collection: 'pages',
    locale: 'en',
    data: homePageData('en'),
    req,
  })
  await payload.update({
    collection: 'pages',
    id: homePage.id,
    locale: 'ge',
    data: homePageData('ge'),
    req,
  })
  await payload.update({
    collection: 'pages',
    id: homePage.id,
    locale: 'ja',
    data: homePageData('ja'),
    req,
  })

  const header = await payload.updateGlobal({
    slug: 'header',
    locale: 'en',
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: 'Local Products',
            url: '/products',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Producers',
            url: '/producers',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Artists',
            url: '/artists',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Account',
            url: '/account',
          },
        },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'header',
    locale: 'ge',
    data: {
      navItems: [
        {
          id: header.navItems![0].id,
          link: {
            type: 'custom',
            label: 'ლოკალური პროდუქცია',
            url: '/products',
          },
        },
        {
          id: header.navItems![1].id,
          link: {
            type: 'custom',
            label: 'მწარმოებლები',
            url: '/producers',
          },
        },
        {
          id: header.navItems![2].id,
          link: {
            type: 'custom',
            label: 'მხატვრები',
            url: '/artists',
          },
        },
        {
          id: header.navItems![3].id,
          link: {
            type: 'custom',
            label: 'ანგარიში',
            url: '/account',
          },
        },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'header',
    locale: 'ja',
    data: {
      navItems: [
        {
          id: header.navItems![0].id,
          link: {
            type: 'custom',
            label: 'ローカル製品',
            url: '/products',
          },
        },
        {
          id: header.navItems![1].id,
          link: {
            type: 'custom',
            label: '生産者',
            url: '/producers',
          },
        },
        {
          id: header.navItems![2].id,
          link: {
            type: 'custom',
            label: 'アーティスト',
            url: '/artists',
          },
        },
        {
          id: header.navItems![3].id,
          link: {
            type: 'custom',
            label: 'アカウント',
            url: '/account',
          },
        },
      ],
    },
  })
  const footer = payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: 'Local Products',
            url: '/products',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Find my order',
            url: '/find-order',
          },
        },
      ],
    },
  })

  payload.logger.info('Seeded database successfully!')
}

// async function fetchFileByURL(url: string): Promise<File> {
//   const res = await fetch(url, {
//     credentials: 'include',
//     method: 'GET',
//   })

//   if (!res.ok) {
//     throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
//   }

//   const data = await res.arrayBuffer()

//   return {
//     name: url.split('/').pop() || `file-${Date.now()}`,
//     data: Buffer.from(data),
//     mimetype: `image/${url.split('.').pop()}`,
//     size: data.byteLength,
//   }
// }
