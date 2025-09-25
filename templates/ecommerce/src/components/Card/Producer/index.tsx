import { RichText } from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { Producer } from '@/payload-types'
import Link from 'next/link'
import { CircleIcon } from '@/graphics/circle'

interface ProducerProps {
  producer: Producer
}

export function ProducerCard({ producer }: any) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-3xl">
      <Link className="relative inline-block h-full w-full" href={`/producers/${producer.slug}`}>
        <CardContent>
          <h2 className="text-xl font-mono mb-2">{producer.title}</h2>
          {producer.description ? (
            <RichText
              className="text-sm text-muted-foreground mb-6 max-w-md !mx-0"
              data={producer.description}
              enableGutter={false}
            />
          ) : null}
          <div className="flex flex-center gap-3 sm:gap-6 ">
            <span className="flex items-center gap-1">
              <CircleIcon />
              {producer.tag}
            </span>
            <span className="flex items-center gap-1">
              <CircleIcon />
              {producer.region}
            </span>
            <span className="flex items-center gap-1">
              <CircleIcon />
              {producer.country}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
