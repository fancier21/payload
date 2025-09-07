'use client'

import { useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useSearch } from '@/providers/Search'

export function UrlSearchTrigger() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { openSearch } = useSearch()

  // Extract and memoize the values to prevent unnecessary re-renders
  const producerSlug = useMemo(() => params?.slug as string, [params?.slug])
  const productQuery = useMemo(() => searchParams?.get('product'), [searchParams])

  useEffect(() => {
    console.log('Producer slug from URL:', producerSlug)
    console.log('Product query from URL:', productQuery)

    if (producerSlug && productQuery) {
      openSearch({
        grapeSlug: productQuery,
        producerSlug: producerSlug,
      })
    }
  }, [producerSlug, productQuery, openSearch])

  return null
}
