import { getCachedGlobal } from '@/utilities/getGlobals'

import './index.css'
import { HeaderClient } from './index.client'
import { TypedLocale } from 'payload'

export async function Header({ locale }: { locale: TypedLocale }) {
  const header = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient header={header} />
}
