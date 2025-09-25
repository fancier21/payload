import type { ArchiveBlock as ArchiveBlockProps, Grape } from '@/payload-types'

import configPromise from '@payload-config'
import { DefaultDocumentIDType, getPayload, TypedLocale } from 'payload'
import React from 'react'
import { RichText } from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: DefaultDocumentIDType
    locale: TypedLocale
  }
> = async (props) => {
  const { id, introContent, limit: limitFromProps, populateBy, locale } = props

  const limit = limitFromProps || 3

  let posts: Grape[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const grapes = await payload.find({
      collection: 'grapes',
      depth: 1,
      limit,
      locale,
    })

    posts = grapes.docs
  } else {
    return null
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <RichText
          className="mx-auto max-w-[48rem] text-center"
          data={introContent}
          enableGutter={false}
        />
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
