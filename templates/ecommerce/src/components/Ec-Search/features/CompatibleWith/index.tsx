import * as React from 'react'
import { Product } from '@/payload-types'
import { MediaUrl } from '@/components/MediaUrl'

interface Props {
  product: Product
}

export function CompatibleWith({ product }: Props) {
  return (
    <>
      <div className="text-md text-center font-normal text-gray-500">Goes well with</div>
      <div className="bg-gray-800 text-white p-4 rounded-md">
        <div className="flex items-center justify-center gap-4">
          {product.compatibility?.length > 0 &&
            product.compatibility.map((item, i) => (
              <div key={i} className="relative w-10 h-10 aspect-square overflow-hidden">
                {item.icon ? <MediaUrl media={item.icon} /> : null}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
