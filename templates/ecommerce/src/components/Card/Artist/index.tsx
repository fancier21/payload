import { Card, CardContent } from '@/components/ui/card'
import { RichText } from '@/components/RichText'
import Link from 'next/link'
import { Artist } from '@/payload-types'
import { InstagramIcon } from '@/graphics/instagram'
import { YoutubeIcon } from '@/graphics/youtube'
import { CircleIcon } from '@/graphics/circle'
import { MediaUrl } from '@/components/MediaUrl'

interface ArtistProps {
  artist: Artist
}

export function ArtistCard({ artist }: ArtistProps) {
  const avatar = typeof artist.avatar !== 'string' ? artist.avatar : undefined
  const metaImage = typeof artist.meta?.image !== 'string' ? artist.meta?.image : undefined
  const image = metaImage || avatar

  return (
    <Card className="border-none rounded-xl p-6">
      <div className="aspect-[4/3] rounded-xl overflow-hidden">
        {image ? (
          <MediaUrl media={image} className="w-full h-full object-cover" imgClassName="h-full" />
        ) : null}
      </div>
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-4 mt-6">
          <h2 className="text-xl font-mono">{artist.title}</h2>
          <h3 className="text-lg">{artist.country}</h3>
        </div>
        {artist.description ? (
          <RichText
            className="text-sm text-muted-foreground mb-6"
            data={artist.description}
            enableGutter={false}
          />
        ) : null}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CircleIcon />
            <Link href={artist.website ?? ''}>
              <span className="text-sm">{artist.website}</span>
            </Link>
          </div>
          <div className="flex gap-4 ml-auto">
            <Link href={artist.instagram ?? ''}>
              <InstagramIcon />
            </Link>
            <Link href={artist.youtube ?? ''}>
              <YoutubeIcon />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
