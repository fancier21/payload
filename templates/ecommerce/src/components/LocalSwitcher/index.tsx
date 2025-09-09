'use client'

import { useParams } from 'next/navigation'
import { Locale, useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { usePathname, useRouter } from '@/i18n/routing'
import localization from '@/i18n/localization'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function LocaleSwitcher() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      {localization.locales
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((locale) => (
          <SelectItem value={locale.code} key={locale.code}>
            {locale.label}
          </SelectItem>
        ))}
    </LocaleSwitcherSelect>
  )
}

type Props = {
  children: React.ReactNode
  defaultValue: string
  label?: string
}

function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onValueChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error next-intl typing quirk
        { pathname, params },
        { locale: nextLocale as Locale },
      )
    })
  }

  return (
    <div className="relative text-gray-400">
      <p className="sr-only">{label}</p>
      <Select defaultValue={defaultValue} onValueChange={onValueChange} disabled={isPending}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select locale" />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  )
}
