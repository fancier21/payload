import { AuthProvider } from '@/providers/Auth'
import { EcommerceProvider } from '@/plugin-ecommerce/react/provider'
import { stripeAdapterClient } from '@/plugin-ecommerce/payments/adapters/stripe'
import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { SonnerProvider } from '@/providers/Sonner'
import { SearchProvider } from './Search'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HeaderThemeProvider>
          <SearchProvider>
            <SonnerProvider />
            <EcommerceProvider
              enableVariants={true}
              api={{
                cartsFetchQuery: {
                  depth: 2,
                  populate: {
                    products: {
                      slug: true,
                      title: true,
                      // gallery: true,
                    },
                    variants: {
                      title: true,
                    },
                  },
                },
              }}
              paymentMethods={[
                stripeAdapterClient({
                  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
                }),
              ]}
            >
              {children}
            </EcommerceProvider>
          </SearchProvider>
        </HeaderThemeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
