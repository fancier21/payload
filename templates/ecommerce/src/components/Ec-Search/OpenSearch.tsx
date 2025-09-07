import { Search } from 'lucide-react'
import React from 'react'

export function OpenSearchButton({ className, ...rest }: { className?: string }) {
  return (
    <div className="relative text-gray-500 transition-colors hover:cursor-pointer  dark:text-white">
      <Search className="h-6 transition-all ease-in-out hover:scale-110" />
    </div>
  )
}
