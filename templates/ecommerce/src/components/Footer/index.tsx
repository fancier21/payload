import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { Dot } from 'lucide-react'
import React from 'react'
import { Logo } from '@/graphics/logo'
import { TypedLocale } from 'payload'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer({ locale }: { locale?: TypedLocale }) {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()

  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  return (
    <footer className="w-full bg-zinc-900 text-zinc-400 py-12">
      {/* <h1>{t('Menu')}</h1> */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Logo fill="#fff" />
              {/* <h2 className="text-xl font-bold">YOUR LOGO</h2>
              <p className="text-sm text-zinc-400">YOUR TAGLINE</p> */}
            </div>
            <p className="text-sm max-w-md">
              Fundly is dedicated to providing you with the tools you need to raise money for
              whatever your cause may be.
            </p>
            <ThemeSelector />
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">ABOUT US</h3>
              <ul className="space-y-2">
                {[
                  { text: 'Fundraising Ideas', href: '#' },
                  { text: 'Pricing', href: '#' },
                  { text: 'Privacy Policy', href: '#' },
                  { text: 'About Us', href: '#' },
                  { text: 'Support', href: '#' },
                ].map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold opacity-0">LINKS</h3>
              <ul className="space-y-2">
                {[
                  { text: 'Blog', href: '#' },
                  { text: 'Terms of Use', href: '#' },
                  { text: 'FAQ', href: '#' },
                  { text: 'Sales', href: '#' },
                  { text: 'Press', href: '#' },
                ].map((link) => (
                  <li key={link.text}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">FOLLOW US</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Twitter</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Instagram</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Google+</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Blog</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
          <p className="text-sm">Copyright © Fundly {currentYear}</p>
        </div>
      </div>
    </footer>
  )
}
