import clsx from 'clsx'
import { XIcon } from 'lucide-react'
import React from 'react'

export function CloseSearch({ className }: { className?: string }) {
  return (
    <div className="relative text-gray-500 transition-colors hover:cursor-pointer  dark:text-white">
      <XIcon className={clsx('h-6 transition-all ease-in-out hover:scale-110 ', className)} />
    </div>
  )
}
