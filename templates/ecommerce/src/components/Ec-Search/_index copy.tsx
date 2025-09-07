'use client'
import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useAppStore } from '@/stores/useAppStore'
import { SearchModal } from './SearchModal'

import { Producer, Product, Grape } from '@/payload-types'
import { GlobalBottomDrawer, ProducersDrawerContent } from './Drawer'

interface Props {
  producers: Producer[]
  products: Product[]
  grapes: Grape[]
}

export function Search({ producers, products, grapes }: Props) {
  const { initializeAppData, openDrawer } = useAppStore()
  const params = useParams()
  const searchParams = useSearchParams()

  useEffect(() => {
    initializeAppData({ producers, products, grapes })

    // Extract producer ID/slug from the URL path
    // For URL like /producers/25?product=tsolikouri
    const producerSlug = params?.slug as string

    // Extract product query from search parameters
    const productQuery = searchParams?.get('product')

    console.log('Producer slug from URL:', producerSlug)
    console.log('Product query from URL:', productQuery)

    // Check if BOTH params exist
    if (producerSlug && productQuery) {
      // Find the producer first
      const producer = producers.find((p) => p.slug === producerSlug)

      if (!producer) {
        console.warn('Producer not found for slug:', producerSlug)
        return
      }

      // Find the product that matches both the product query and belongs to the producer
      const product = products.find((p) => p.slug === productQuery && p.producer.id === producer.id)

      console.log('Found producer:', producer)
      console.log('Found product:', product)

      if (product) {
        console.log('Found matching product and producer from URL, opening drawer:', product)
        // If a valid product is found, open the drawer with its info
        openDrawer(
          <ProducersDrawerContent
            initialGrapeData={product.grape}
            initialProductId={product.slug}
          />,
        )
      } else {
        console.warn('Product not found or does not belong to the specified producer')
      }
    }
  }, [initializeAppData, params, searchParams, producers, products])

  return <GlobalBottomDrawer />
}
