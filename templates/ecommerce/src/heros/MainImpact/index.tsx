'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { RichText } from '@/components/RichText'
import { Logo } from '@/graphics/logo'

export const MainImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="text-white bg-gray-800" data-theme="dark">
      <div className="container py-7 relative flex items-center space-x-20">
        <div className="max-w-[30rem]">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} appearance="link" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="hidden md:block">
          <Logo width={237} height={123} fill="#ffffff" />
        </div>
      </div>
    </div>
  )
}
