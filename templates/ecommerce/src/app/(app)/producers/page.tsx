import { ProducerCard } from '@/components/Card/Producer'
import { Grid } from '@/components/Grid'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const metadata = {
  description: 'Producers page.',
  title: 'Producers',
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function ProducersPage() {
  const payload = await getPayload({ config: configPromise })

  const producers = await payload.find({
    collection: 'producers',
  })

  return (
    <div>
      {producers?.docs.length > 0 ? (
        <Grid className="grid grid-cols-1 gap-8">
          {producers.docs.map((producer) => {
            return <ProducerCard key={producer.slug} producer={producer} />
          })}
        </Grid>
      ) : null}
    </div>
  )
}
