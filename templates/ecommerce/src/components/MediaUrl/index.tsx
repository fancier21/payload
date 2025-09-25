import React from 'react'
import Image from 'next/image'
import { cn } from 'src/utilities/cn'
import { MediaUrlItem, MediaUrlProps } from './types'

export const MediaUrl: React.FC<MediaUrlProps> = ({
  media,
  className,
  imgClassName,
  showCaption = true,
}) => {
  if (!media) return null

  // Handle single image
  if (!Array.isArray(media)) {
    return (
      <div className={cn('', className)}>
        <Image
          src={media.url}
          alt={media.alt}
          width={1200}
          height={800}
          className={cn('w-full h-auto', imgClassName)}
          style={{ objectFit: 'cover' }}
          unoptimized={!media.url.startsWith('/')}
        />
        {/*{showCaption && media.caption && (
          <p className="mt-2 text-sm text-gray-600">{media.caption}</p>
        )}*/}
      </div>
    )
  }

  // Handle array of images
  return (
    <div className={cn('grid gap-4', className)}>
      {media.map((item, index) => (
        <div key={index}>
          <Image
            src={item.url}
            alt={item.alt}
            width={1200}
            height={800}
            className={cn('w-full h-auto', imgClassName)}
            style={{ objectFit: 'cover' }}
            unoptimized={!item.url.startsWith('/')}
          />
          {/*{showCaption && item.caption && (
            <p className="mt-2 text-sm text-gray-600">{item.caption}</p>
          )}*/}
        </div>
      ))}
    </div>
  )
}
