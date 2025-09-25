import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/utilities/cn'
import { Product } from '@/payload-types'

const TasteProfileItem = ({ scale, title, leftLabel, rightLabel }) => (
  <>
    <div className="flex justify-between text-xs text-gray-800 mb-1">
      <span>{leftLabel}</span>
      <span className="font-medium">{title}</span>
      <span>{rightLabel}</span>
    </div>
    <div className="relative">
      <div className="absolute w-full top-1/2 border-t border-dotted border-gray-800" />
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[scale]}
      >
        <SliderPrimitive.Track className="relative h-0.5 grow">
          <SliderPrimitive.Range className="absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block h-3 w-6 rounded-full bg-gray-800',
            'focus:outline-none focus-visible:ring focus-visible:ring-white/75',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
        />
      </SliderPrimitive.Root>
    </div>
  </>
)

interface Props {
  product: Product
}

export function TasteProfile({ product }: Props) {
  return (
    <div>
      <div className="text-md text-center font-normal text-gray-500">Taste Profile</div>
      <div className="pt-4">
        <div className="relative w-full space-y-3">
          <TasteProfileItem
            title="Body"
            scale={product.taste?.body * 100}
            leftLabel="Light"
            rightLabel="Bold"
          />
          <TasteProfileItem
            title="Sweetness"
            scale={product.taste?.sweetness * 100}
            leftLabel="Dry"
            rightLabel="Bold"
          />
          <TasteProfileItem
            title="Finish"
            scale={product.taste?.finish * 100}
            leftLabel="Short"
            rightLabel="Long"
          />
          <TasteProfileItem
            title="Acidity"
            scale={product.taste?.acidity * 100}
            leftLabel="Low"
            rightLabel="High"
          />
          <TasteProfileItem
            title="Tannin"
            scale={product.taste?.tannin * 100}
            leftLabel="Low"
            rightLabel="High"
          />
        </div>
      </div>
    </div>
  )
}
