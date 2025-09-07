'use server'

import type { Producer, Product, Grape } from '@/payload-types'
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

    return grapes
  } catch (error) {
    console.error('Error fetching all grapes:', error)
    return []
  }
}

/**
 * Get unique producers by grape ID
 */
export async function getProducersByGrape(grapeId: string): Promise<Producer[]> {
  try {
    const payload = await getPayload({ config: configPromise })

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
 * Get current product by grape ID and producer ID
 */
export async function getCurrentProduct(
  grapeId: string,
  producerId: string,
): Promise<Product | null> {
  try {
    const payload = await getPayload({ config: configPromise })

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
