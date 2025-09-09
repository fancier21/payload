import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { ProducerInfo } from '@/components/producer/ProducerInfo'
import { AvailableCollection } from '@/components/producer/AvailableCollection'
import { OriginGellery } from '@/components/producer/OriginGellery'
import { Showcase } from '@/components/producer/Showcase'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: Args) {
  const { slug } = await params

  const { producer, products } = await queryProducerBySlug({ slug })

  if (!producer) return notFound()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
      <div className="space-y-3">
        <ProducerInfo producer={producer} />
        {products.length ? <AvailableCollection products={products} /> : null}
        {producer.gallery?.length ? <OriginGellery gallery={producer.gallery} /> : null}
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] lg:grid-cols-1 gap-3">
          {producer.stickerCollection?.length ? (
            <Showcase
              title="Art Collection"
              subtitle="Explore this month's art collection"
              description="Its simple and flavour makes it perfect for those of you who like you who want minimalist taste"
              collection={producer.stickerCollection}
            />
          ) : null}
          {producer.wineCollection?.length ? (
            <Showcase
              title="Wines"
              subtitle="Discover this month's wine collection"
              description="Its simple and flavour makes it perfect for those of you who like you who want minimalist taste"
              collection={producer.wineCollection}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

const queryProducerBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  try {
    // Get the producer
    const producer = await payload.find({
      collection: 'producers',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (!producer.docs[0]) {
      return { producer: null, products: [] }
    }

    // Get products - let's try a simpler approach first
    let products: any[] = []
    try {
      const productsResult = await payload.find({
        collection: 'products',
        where: {
          producer: {
            in: [producer.docs[0].id],
          },
        },
      })
      products = productsResult.docs || []
    } catch (productError) {
      console.log('Error loading products, continuing without them:', productError)
      products = []
    }

    return {
      producer: producer.docs[0],
      products,
    }
  } catch (error) {
    console.error('Query error:', error)
    throw error
  }
}
