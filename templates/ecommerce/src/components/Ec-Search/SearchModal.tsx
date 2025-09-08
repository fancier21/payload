'use client'

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearch } from '@/providers/Search'

import type { Product, Producer, Grape } from '@/payload-types'
import { OpenSearchButton } from './OpenSearch'
import { getAllGrapes, getCurrentProduct, getProducersByGrape } from '@/app/(app)/actions'
import { Grapes } from './features/Grapes'
import { Spinner } from '@/graphics/spinner'
import { TasteProfile } from './features/TasteProfile'
import { CompatibleWith } from './features/CompatibleWith'
import { AddToCart } from '../Cart/AddToCart'
import { CloseSearch } from './CloseSearch'
import { MediaUrl } from '../MediaUrl'

export function SearchModal() {
  const { isOpen, openSearch, closeSearch, selection, setSelection } = useSearch()

  const [grapes, setGrapes] = useState<Grape[]>([])
  const [producers, setProducers] = useState<Producer[]>([])
  const [product, setProduct] = useState<Product | null>(null)

  const [isGrapesLoading, setIsGrapesLoading] = useState(false)
  const [isProducersLoading, setIsProducersLoading] = useState(false)
  const [isProductLoading, setIsProductLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Effect 1: Load grapes when drawer opens
  useEffect(() => {
    if (!isOpen || grapes.length > 0) return

    const loadGrapes = async () => {
      setIsGrapesLoading(true)
      setError(null)
      try {
        const grapesData = await getAllGrapes()
        console.log('All grapes:', grapesData)
        setGrapes(grapesData)
      } catch (e) {
        setError('Could not load grapes.')
      } finally {
        setIsGrapesLoading(false)
      }
    }
    console.log('Loading grapes...')
    loadGrapes()
  }, [isOpen, grapes.length])

  // Effect 2: Load producers after grapes are loaded
  useEffect(() => {
    if (!isOpen || grapes.length === 0) return

    const loadProducers = async () => {
      setIsProducersLoading(true)
      setError(null)
      try {
        // Use first grape as default
        console.log('Selected:', selection)
        const producers = await getProducersByGrape(selection?.grapeSlug || grapes[0].slug)
        console.log('All producers:', producers)
        setProducers(producers)

        // Set default selection if none exists
        if (!selection && producers.length > 0) {
          const defaultSelection = {
            grapeSlug: grapes[0].slug,
            producerSlug: producers[0].slug,
          }
          setSelection(defaultSelection)
        }
      } catch (e) {
        setError('Could not load producers.')
      } finally {
        setIsProducersLoading(false)
      }
    }
    console.log('Loading producers...')
    loadProducers()
  }, [isOpen, grapes.length, selection?.grapeSlug])

  // Effect 3: Load product when selection changes
  useEffect(() => {
    if (!selection || !selection.producerSlug) return

    const loadProduct = async () => {
      setIsProductLoading(true)
      setError(null)
      try {
        const productData = await getCurrentProduct(selection?.grapeSlug, selection?.producerSlug)
        console.log('Current product:', productData)
        setProduct(productData)
      } catch (e) {
        setError('Could not load product.')
        setProduct(null)
      } finally {
        setIsProductLoading(false)
      }
    }
    console.log('Loading product...')
    loadProduct()
  }, [selection])

  const handleGrapeChange = (grapeSlug: string) => {
    if (selection) setSelection({ ...selection, grapeSlug })
  }
  const handleProducerChange = (producerSlug: string) => {
    if (selection) setSelection({ ...selection, producerSlug })
  }

  const selectedGrape = grapes.find((grape) => selection?.grapeSlug === grape.slug)

  const firstGrapeGalleryImage = selectedGrape?.gallery?.[0]
    ? {
        url: selectedGrape.gallery[0].url,
        alt: selectedGrape.gallery[0].alt,
        caption: selectedGrape.gallery[0].caption || undefined,
      }
    : undefined

  return (
    <Drawer open={isOpen} onOpenChange={closeSearch}>
      <button onClick={() => openSearch()}>
        <OpenSearchButton />
      </button>
      <DrawerContent className="[&>div:first-child]:hidden border-none bg-white dark:bg-zinc-900 rounded-t-2xl shadow-lg">
        <button onClick={closeSearch} className="absolute top-4 right-7 z-10">
          <CloseSearch />
        </button>
        <div className="mx-auto w-full max-w-lg px-4 overflow-auto">
          {/* Active Grape Image */}
          <div className="relative bg-[#EDEDED] mx-auto w-full max-w-lg flex flex-col h-[400px] rounded-t-xl">
            {grapes.length === 0 ? (
              <div className="flex justify-center items-center h-[400px]">
                <Spinner />
              </div>
            ) : firstGrapeGalleryImage ? (
              <MediaUrl media={firstGrapeGalleryImage} className="flex justify-center h-[400px]" />
            ) : null}
          </div>

          <DrawerHeader className="text-left">
            <DrawerTitle className="text-2xl font-semibold">Grape Profile</DrawerTitle>
            <DrawerDescription className="hidden"></DrawerDescription>
          </DrawerHeader>

          {/* In-Drawer Grape Filter List */}
          <div className="py-4">
            <div className="flex space-x-2 pb-2">
              <Grapes
                grapes={grapes}
                selectedGrape={grapes.find((grape) => selection?.grapeSlug === grape.slug)}
                handleGrapeChange={handleGrapeChange}
              />
            </div>
          </div>

          {/* Producers List Area */}
          <div className="h-48 overflow-y-auto pr-2 border-b dark:border-zinc-700 pb-2">
            {isProducersLoading ? (
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            ) : (
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {producers.length > 0 ? (
                  producers.map((producer) => (
                    <li key={producer.id}>
                      <button
                        onClick={() => handleProducerChange(producer.slug)}
                        className={`w-full text-left p-3 rounded-md transition-colors flex items-center space-x-4 ${selection?.producerSlug === producer.slug ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                      >
                        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 shrink-0">
                          {producer.title.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                            {producer.title}
                          </p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {producer.region}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-zinc-500 pt-8">
                    No producers found for this grape.
                  </p>
                )}
              </ul>
            )}
          </div>

          {/* --- Updated: Selected Product Detail Area --- */}
          <div className="pt-4 min-h-[120px]">
            {isProductLoading ? (
              <div className="flex justify-center items-center h-full pt-4">
                <Spinner />
              </div>
            ) : product ? (
              <div className="space-y-4">
                <TasteProfile product={product} />
                <CompatibleWith product={product} />
              </div>
            ) : null}
            {!isProductLoading && selection?.producerSlug && !product && (
              <p className="text-center text-zinc-500 pt-8">
                No specific product found for this combination.
              </p>
            )}
            {!selection?.producerSlug && !isProductLoading && (
              <p className="text-center text-zinc-500 pt-8">
                Select a producer to see their product.
              </p>
            )}
          </div>

          <DrawerFooter className="px-0 mt-5">
            <Suspense fallback={null}>
              {product && <AddToCart product={product} withPrice={true} btnVariant="accent" />}
            </Suspense>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
