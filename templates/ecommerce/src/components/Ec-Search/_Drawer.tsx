'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { create } from 'zustand'
import { Button } from '@/components/ui/button' // Assuming shadcn/ui setup
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from '@/components/ui/drawer' // Assuming shadcn/ui setup
import { useAppStore } from '@/stores/useAppStore'
import { Spinner } from '@/graphics/spinner'
import { Grapes } from './features/Grapes'
import { MediaUrl } from '@/components/MediaUrl'
import { TasteProfile } from './features/TasteProfile'
import { CompatibleWith } from './features/CompatibleWith'
import { OpenSearchButton } from './OpenSearch'
import { CloseSearch } from './CloseSearch'
import { AddToCart } from '../Cart/AddToCart'

import type { Product, Producer, Grape } from '@/payload-types'

// --- 2. The Global Drawer Component ---
export function GlobalBottomDrawer() {
  const { isDrawerOpen, drawerContent, closeDrawer } = useAppStore()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDrawer()
      }
    }
    if (isDrawerOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen, closeDrawer])

  const handleOpenChange = (open) => {
    if (!open) {
      closeDrawer()
    }
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger>
        <OpenSearchButton />
      </DrawerTrigger>
      <DrawerContent className="[&>div:first-child]:hidden border-none bg-white dark:bg-zinc-900 rounded-t-2xl shadow-lg">
        <DrawerClose className="absolute top-4 right-7 z-10">
          <CloseSearch />
        </DrawerClose>
        <div className="overflow-auto">{drawerContent}</div>
      </DrawerContent>
    </Drawer>
  )
}

// --- 3. The Self-Contained Producers Drawer ---
// This component is now updated to handle fetching a specific product.

export function ProducersDrawerContent({ initialGrapeData, initialProductId }) {
  const { grapes, producers, products } = useAppStore()
  // State for filtering
  const [activeGrapeData, setActiveGrapeData] = useState<Grape | null>(initialGrapeData)
  const [filteredProducers, setFilteredProducers] = useState<Producer[] | []>([])
  const [isListLoading, setIsListLoading] = useState<boolean>(true)

  // New state for the selected product
  const [selectedProducerId, setSelectedProducerId] = useState<string | null>(null)
  const [selectedProductData, setSelectedProductData] = useState<Product | null>(null)
  const [isProductLoading, setIsProductLoading] = useState<boolean>(false)

  // Effect for filtering the producers list when a grape is selected
  useEffect(() => {
    setIsListLoading(true)
    setSelectedProducerId(null) // Deselect producer when changing grape
    setSelectedProductData(null)
    setTimeout(() => {
      if (activeGrapeData === 'all') {
        // Show all producers if 'All Grapes' is selected
        const producerIdsWithProducts = new Set(products.map((p) => p.producer.id))
        setFilteredProducers(producers.filter((p) => producerIdsWithProducts.has(p.id)))
      } else {
        // Show producers that have a product with the selected grape
        const producerIdsForGrape = new Set(
          products.filter((p) => p.grape.id === activeGrapeData.id).map((p) => p.producer.id),
        )
        setFilteredProducers(producers.filter((p) => producerIdsForGrape.has(p.id)))
      }
      setIsListLoading(false)
    }, 300)
  }, [activeGrapeData, producers, products])

  const activeGrapeName =
    activeGrapeData.id === 'all'
      ? 'All Grapes'
      : grapes.find((g) => g.id === activeGrapeData.id)?.title

  // --- Updated handler for selecting a producer ---
  const handleSelectProducer = (producer) => {
    if (selectedProducerId === producer.id) {
      // If clicking the same producer, deselect it
      setSelectedProducerId(null)
      setSelectedProductData(null)
      return
    }

    setSelectedProducerId(producer.id)
    setIsProductLoading(true)
    setSelectedProductData(null)

    // Simulate an API call to fetch a product matching producerId and grapeId
    console.log(`Fetching product for producer: ${producer.title} and grape: ${activeGrapeName}...`)
    setTimeout(() => {
      const product = products.find(
        (p) => p.producer.id === producer.id && p.grape.id === activeGrapeData.id,
      )

      setSelectedProductData(product) // This will be undefined if no match is found
      setIsProductLoading(false)
      console.log('Product found:', product)
    }, 800)
  }

  const image = React.useMemo(() => {
    const firstGalleryImage =
      typeof activeGrapeData?.gallery?.[0] !== 'string' ? activeGrapeData?.gallery?.[0] : undefined
    const metaImage =
      typeof activeGrapeData?.meta?.image !== 'string' ? activeGrapeData?.meta?.image : undefined
    return metaImage || firstGalleryImage
  }, [activeGrapeData])

  return (
    <div className="mx-auto w-full max-w-lg px-4">
      {/* Active Grape Image */}
      <div className="relative bg-[#EDEDED] mx-auto w-full max-w-lg flex flex-col h-[400px] rounded-t-xl">
        {image ? <MediaUrl media={image} className="flex justify-center h-[400px]" /> : null}
      </div>

      <DrawerHeader className="text-left">
        <DrawerTitle className="text-2xl font-semibold">Grape Profile</DrawerTitle>
        <DrawerDescription className="hidden">
          Showing producers for:{' '}
          <span className="font-semibold text-blue-500">{activeGrapeName}</span>
        </DrawerDescription>
      </DrawerHeader>

      {/* In-Drawer Grape Filter List */}
      <div className="py-4">
        <div className="flex space-x-2 pb-2">
          <button
            onClick={() => setActiveGrapeData('all')}
            className={`px-4 py-2 text-sm font-semibold rounded-full shrink-0 transition-colors ${activeGrapeData.id === 'all' ? 'bg-blue-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
          >
            All Producers
          </button>
          <Grapes
            grapes={grapes}
            activeGrapeData={activeGrapeData}
            handleActiveGrapeData={setActiveGrapeData}
          />
        </div>
      </div>

      {/* Producers List Area */}
      <div className="h-48 overflow-y-auto pr-2 border-b dark:border-zinc-700 pb-2">
        {isListLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {filteredProducers.length > 0 ? (
              filteredProducers.map((producer) => (
                <li key={producer.id}>
                  <button
                    onClick={() => handleSelectProducer(producer)}
                    className={`w-full text-left p-3 rounded-md transition-colors flex items-center space-x-4 ${selectedProducerId === producer.id ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 shrink-0">
                      {producer.title.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                        {producer.title}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{producer.region}</p>
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-zinc-500 pt-8">No producers found for this grape.</p>
            )}
          </ul>
        )}
      </div>

      {/* --- Updated: Selected Product Detail Area --- */}
      <div className="pt-4 min-h-[120px]">
        {isProductLoading && (
          <div className="flex justify-center items-center h-full pt-4">
            <Spinner />
          </div>
        )}
        {selectedProductData && (
          <>
            <TasteProfile product={selectedProductData} />
          </>
        )}
        {selectedProductData && (
          <div className="mt-4">
            <CompatibleWith product={selectedProductData} />
          </div>
        )}
        {!isProductLoading && selectedProducerId && !selectedProductData && (
          <p className="text-center text-zinc-500 pt-8">
            No specific product found for this combination.
          </p>
        )}
        {!selectedProducerId && !isProductLoading && (
          <p className="text-center text-zinc-500 pt-8">Select a producer to see their product.</p>
        )}
      </div>

      <DrawerFooter className="px-0 mt-5">
        <Suspense fallback={null}>
          {selectedProductData && (
            <AddToCart product={selectedProductData} withPrice={true} btnVariant="accent" />
          )}
        </Suspense>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  )
}
