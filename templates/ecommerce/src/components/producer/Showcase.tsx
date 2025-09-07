import { Media } from '@/payload-types'
import { MediaUrl } from '@/components/MediaUrl'

interface Props {
  title: string
  subtitle: string
  description: string
  collection: Media[]
}

export function Showcase({ title, subtitle, description, collection }: Props) {
  return (
    <section className="border rounded-xl">
      <div className="p-6">
        <h2 className="text-xl mb-4">{title}</h2>
        <div className="flex justify-around gap-4">
          {collection.map((image, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden">
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
        <p className="text-md mt-4 mb-1">{subtitle}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </section>
  )
}
