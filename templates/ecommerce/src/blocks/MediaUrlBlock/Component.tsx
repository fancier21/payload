import { cn } from 'src/utilities/cn'
import React from 'react'
import { RichText } from '@/components/RichText'
import Image from 'next/image'

import type { MediaUrlBlock as MediaUrlBlockProps } from '@/payload-types'

type Props = MediaUrlBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  disableInnerContainer?: boolean
}

export const MediaUrlBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    url,
    alt,
    caption,
    disableInnerContainer,
  } = props

  if (!url || !alt) {
    return null
  }

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      <div className="relative">
        <Image
          src={url}
          alt={alt}
          width={1200}
          height={800}
          className={cn('border border-border rounded-[0.8rem] w-full h-auto', imgClassName)}
          style={{
            objectFit: 'cover',
          }}
          onError={(e) => {
            console.error('Failed to load image:', url)
            // You could set a fallback image here if needed
          }}
          // Allow images from external domains
          unoptimized={!url.startsWith('/')}
        />
      </div>
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
