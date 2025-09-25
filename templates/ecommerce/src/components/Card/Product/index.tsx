'use client'
import React, { Suspense } from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Media } from '@/components/Media'
import { Product } from '@/payload-types'
import { AddToCart } from '@/components/Cart/AddToCart'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { cn } from '@/utilities/cn'
import { MediaUrl } from '@/components/MediaUrl'

interface ProductProps {
  product: Product
  className?: string
}

function ProductCardInner({ product, className }: ProductProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onSelectCard = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (product) {
      params.set('product', product?.slug)
    } else {
      params.delete('product')
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const firstGalleryImage =
    typeof product.gallery?.[0] !== 'string' ? product.gallery?.[0] : undefined
  const metaImage = typeof product.meta?.image !== 'string' ? product.meta?.image : undefined
  const image = metaImage || firstGalleryImage

  return (
    <Card
      className={cn('flex flex-col rounded-xl overflow-hidden py-0 pb-3', className)}
      id={`product-${product.id}`}
    >
      <div onClick={onSelectCard} className="relative w-full h-[183px] cursor-pointer group">
        {image ? (
          <MediaUrl media={image} className="w-full h-full object-cover" imgClassName="h-full" />
        ) : null}
      </div>
      <CardHeader className="">
        <CardTitle
          onClick={onSelectCard}
          className="line-clamp-2 text-md font-normal cursor-pointer"
        >
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center mt-auto">
        <Suspense fallback={null}>
          <AddToCart product={product} withIcon={true} />
        </Suspense>
      </CardFooter>
    </Card>
  )
}

export function ProductCard({ product, className }: ProductProps) {
  return (
    <Suspense
      fallback={
        <Card className={cn('flex flex-col rounded-xl overflow-hidden py-0 pb-3', className)}>
          <div className="relative w-full h-[183px] bg-gray-200 animate-pulse" />
          <CardHeader>
            <CardTitle className="h-4 bg-gray-200 animate-pulse rounded" />
          </CardHeader>
          <CardFooter className="flex justify-center mt-auto">
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
          </CardFooter>
        </Card>
      }
    >
      <ProductCardInner product={product} className={className} />
    </Suspense>
  )
}
