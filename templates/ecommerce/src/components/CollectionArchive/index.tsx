import { cn } from '@/utilities/cn'
import React from 'react'

import type { Grape } from '@/payload-types'
import { GrapeCard } from '../Card/Grape'

export type Props = {
  posts: Grape[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div className="w-full flex flex-wrap justify-center border rounded-xl gap-4 py-4 ">
        {posts?.map((result: Grape, index: number) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <GrapeCard key={result.id} grape={result} className="w-[9rem]" />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
