'use client'
import React from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MediaUrl } from '@/components/MediaUrl'
import { Grape } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { useSearch } from '@/providers/Search'

interface Props {
  grape: Grape
  className?: string
}

export function GrapeCard({ grape, className }: Props) {
  const { openSearch } = useSearch()

  const handleOpenSearch = () => {
    openSearch({
      grapeSlug: grape.slug,
      producerSlug: null,
    })
  }

  const firstGrapeGalleryImage = grape?.gallery?.[0]
    ? {
        url: grape.gallery[0].url,
        alt: grape.gallery[0].alt,
        caption: grape.gallery[0].caption || undefined,
      }
    : undefined

  return (
    <Card
      className={cn(
        'flex flex-col rounded-xl overflow-hidden py-0 pb-3 cursor-pointer ',
        className,
      )}
      id={`grape-${grape.id}`}
    >
      <div onClick={handleOpenSearch} className="relative w-full h-[200px] group">
        {firstGrapeGalleryImage ? (
          <MediaUrl
            media={firstGrapeGalleryImage}
            className="w-full h-full object-cover"
            imgClassName="h-full"
          />
        ) : null}
      </div>
      <CardHeader className="">
        <CardTitle className="line-clamp-2 text-md font-normal cursor-pointer">
          {grape.title}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
