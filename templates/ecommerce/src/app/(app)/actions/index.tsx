'use server'

import type { Product, Producer, Grape } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Get all grapes
 */
export async function getAllGrapes(): Promise<Grape[]> {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: grapes } = await payload.find({
      collection: 'grapes',
      limit: 0, // Get all grapes
      // where: {
      //   _status: {
      //     equals: 'published',
      //   },
      // },
    })

    return grapes as Grape[]
  } catch (error) {
    console.error('Error fetching all grapes:', error)
    return []
  }
}

/**
 * Get unique producers by grape slug
 */
export async function getProducersByGrape(grapeSlug: string): Promise<Producer[]> {
  try {
    const payload = await getPayload({ config: configPromise })

    // First, get the grape by slug to get its ID for the relationship query
    const { docs: grapes } = await payload.find({
      collection: 'grapes',
      limit: 1,
      where: {
        slug: {
          equals: grapeSlug,
        },
      },
    })

    if (grapes.length === 0) {
      console.error('Grape not found with slug:', grapeSlug)
      return []
    }

    const grapeId = grapes[0].id

    const { docs: products } = await payload.find({
      collection: 'products',
      depth: 3,
      limit: 0,
      where: {
        grape: {
          equals: grapeId,
        },
        // Add additional filters if needed
        // _status: {
        //   equals: 'published',
        // },
      },
    })

    // Extract unique producers from products with better type safety
    const uniqueProducers: Producer[] = []
    const seenProducerIds = new Set<string>()

    products.forEach((product: any) => {
      const producer = product.producer

      // Handle both populated and non-populated producer references
      const producerData = typeof producer === 'object' ? producer : null
      const producerId = typeof producer === 'string' ? producer : producer?.id

      if (producerData && producerId && !seenProducerIds.has(producerId)) {
        seenProducerIds.add(producerId)
        uniqueProducers.push(producerData as Producer)
      }
    })

    return uniqueProducers
  } catch (error) {
    console.error('Error fetching producers by grape:', error)
    throw error
  }
}

/**
 * Get current product by grape slug and producer slug
 */
export async function getCurrentProduct(
  grapeSlug: string,
  producerSlug: string,
): Promise<Product | null> {
  try {
    const payload = await getPayload({ config: configPromise })

    // First, get the grape and producer by their slugs to get their IDs
    const [grapeResult, producerResult] = await Promise.all([
      payload.find({
        collection: 'grapes',
        limit: 1,
        where: { slug: { equals: grapeSlug } },
      }),
      payload.find({
        collection: 'producers',
        limit: 1,
        where: { slug: { equals: producerSlug } },
      }),
    ])

    if (grapeResult.docs.length === 0) {
      console.error('Grape not found with slug:', grapeSlug)
      return null
    }

    if (producerResult.docs.length === 0) {
      console.error('Producer not found with slug:', producerSlug)
      return null
    }

    const grapeId = grapeResult.docs[0].id
    const producerId = producerResult.docs[0].id

    const { docs: products } = await payload.find({
      collection: 'products',
      depth: 2,
      limit: 1,
      where: {
        and: [
          {
            grape: {
              equals: grapeId,
            },
          },
          {
            producer: {
              equals: producerId,
            },
          },
        ],
      },
    })

    // Return the first product that matches both grape and producer
    return products[0] || null
  } catch (error) {
    console.error('Error fetching current product:', error)
    return null
  }
}

// Export types for use in other components
export type { Grape, Producer }
