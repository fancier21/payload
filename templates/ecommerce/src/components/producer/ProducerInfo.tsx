import { Package, Clock } from 'lucide-react'
import { Producer } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { MediaUrl } from '@/components/MediaUrl'

interface Props {
  producer: Producer
}

export function ProducerInfo({ producer }: Props) {
  const avatar = typeof producer?.avatar !== 'string' ? producer?.avatar : undefined

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">
      {/* Left Card */}
      <section className="border rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] h-full">
          <div className="p-6 space-y-4">
            <h1 className="text-2xl">Headline</h1>
            <div className="text-gray-600 text-sm">
              {producer.description ? (
                <RichText className="mb-2" data={producer.description} enableGutter={false} />
              ) : null}
            </div>
            <div className="inline-block bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
              {producer.title}
            </div>
          </div>
          {avatar ? (
            <div className="relative overflow-hidden rounded-b-xl sm:rounded-tr-xl sm:rounded-bl-none">
              <MediaUrl
                media={avatar}
                className="w-full h-full object-cover"
                imgClassName="min-h-[350px]"
              />
            </div>
          ) : null}
        </div>
      </section>
      {/* Right Card */}
      <section className="border rounded-xl">
        <div className="space-y-8 p-6 flex flex-col justify-between h-full">
          <div>
            <div className="font-medium">
              Location: <span className="font-normal">{producer.region}</span>
            </div>
            <div className="mt-2">
              <span className="font-medium">Story: </span>
              <span className="text-sm text-gray-600">
                {producer?.story ? (
                  <RichText className="inline-block" data={producer.story} enableGutter={false} />
                ) : null}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {producer?.inStock ? <span>In Stock</span> : <span>Out of Stock</span>}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {producer?.guaranteed ? <span>Guaranteed</span> : <span>Not Guaranteed</span>}
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {producer?.freeDelivery ? <span>Free Delivery</span> : <span>Not Free Delivery</span>}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
