import { ArtistCard } from '@/components/Card/Artist'
import { Grid } from '@/components/Grid'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const metadata = {
  description: 'Artists page.',
  title: 'Artists',
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function ArtistsPage() {
  const payload = await getPayload({ config: configPromise })

  const artists = await payload.find({
    collection: 'artists',
  })

  return (
    <div>
      {artists?.docs.length > 0 ? (
        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.docs.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />
          })}
        </Grid>
      ) : null}
    </div>
  )
}
