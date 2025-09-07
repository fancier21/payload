import { Media } from '@/payload-types'
import { MediaUrl } from '@/components/MediaUrl'

interface Props {
  gallery: Media[]
}

export function OriginGellery({ gallery }: Props) {
  return (
    <section className="border rounded-xl">
      <div className="p-6">
        <h2 className="text-xl mb-4">Origin Gallery</h2>
        <div className="flex flex-wrap justify-center">
          {gallery.map((image, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden w-full sm:w-1/2 md:w-1/3"
            >
              {image ? (
                <MediaUrl
                  media={image}
                  className="w-full h-full object-cover"
                  imgClassName="h-full"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
