import { GrapeCard } from '@/components/Card/Grape'
import { Grid } from '@/components/Grid'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const metadata = {
  description: 'Search for products in the store.',
  title: 'Search',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q: searchValue, sort } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const grapes = await payload.find({
    collection: 'grapes',
    limit: 0, // Get all grapes
    select: {
      id: true,
      title: true,
      slug: true,
      gallery: true,
    },
    // where: {
    //   _status: {
    //     equals: 'published',
    //   },
    // },
  })

  return (
    <>
      {grapes.docs?.length > 0 ? (
        <Grid className="grid-cols-[repeat(auto-fill,minmax(min(9rem,100%),1fr))]">
          {grapes.docs.map((grape) => {
            return <GrapeCard key={grape.id} grape={grape} />
          })}
        </Grid>
      ) : null}
    </>
  )
}
