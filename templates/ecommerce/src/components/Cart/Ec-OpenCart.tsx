import { ShoppingCart } from 'lucide-react'
import React from 'react'

export function OpenCartButton({ quantity }: { quantity?: number }) {
  return (
    <div className="relative text-gray-500 transition-colors hover:cursor-pointer  dark:text-white">
      <ShoppingCart className="h-6 transition-all ease-in-out hover:scale-110" />
      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white text-center">
          {quantity}
        </div>
      ) : null}
    </div>
  )
}
