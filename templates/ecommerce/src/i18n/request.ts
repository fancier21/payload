import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

import en from './messages/en.json'
import { hasLocale } from 'next-intl'

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
