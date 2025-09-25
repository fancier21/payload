'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import type { Product, Variant } from '@/payload-types'

import { useCart } from '@/plugin-ecommerce/react/provider'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
type Props = {
  product: Product
  withIcon?: boolean
  withPrice?: boolean
  btnVariant?: ButtonProps['variant']
}

export function AddToCart({
  product,
  withIcon = false,
  withPrice = false,
  btnVariant = 'default',
}: Props) {
  const { addItem, cart } = useCart()
  const searchParams = useSearchParams()

  const variants = product.variants?.docs || []

  const selectedVariant = useMemo<Variant | undefined>(() => {
    if (product.enableVariants && variants.length) {
      const variantId = searchParams.get('variant')
      const validVariant = variants.find((variant) => {
        if (typeof variant === 'object') {
          return variant.id === variantId
        }
        return variant === variantId
      })

      if (validVariant && typeof validVariant === 'object') {
        return validVariant
      }
    }

    return undefined
  }, [product.enableVariants, searchParams, variants])

  const addToCart = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()

      addItem({
        product: product.id,
        variant: selectedVariant?.id ?? undefined,
      }).then(() => {
        toast.success('Item added to cart.')
      })
    },
    [addItem, product, selectedVariant],
  )

  const disabled = useMemo<boolean>(() => {
    const existingItem = cart?.items?.find((item) => {
      const productID = typeof item.product === 'object' ? item.product?.id : item.product
      const variantID = item.variant
        ? typeof item.variant === 'object'
          ? item.variant?.id
          : item.variant
        : undefined

      if (productID === product.id) {
        if (product.enableVariants) {
          return variantID === selectedVariant?.id
        }
        return true
      }
    })

    if (existingItem) {
      const existingQuantity = existingItem.quantity

      if (product.enableVariants) {
        return existingQuantity >= (selectedVariant?.inventory || 0)
      }
      return existingQuantity >= (product.inventory || 0)
    }

    if (product.enableVariants) {
      if (!selectedVariant) {
        return true
      }

      if (selectedVariant.inventory === 0) {
        return true
      }
    } else {
      if (product.inventory === 0) {
        return true
      }
    }

    return false
  }, [selectedVariant, cart?.items, product])

  return (
    <Button
      aria-label="Add to cart"
      variant={btnVariant}
      className={clsx({
        'hover:opacity-90': true,
      })}
      disabled={disabled}
      onClick={addToCart}
      type="submit"
    >
      {withIcon && <ShoppingCart size={16} />}
      Add To Cart {withPrice && `| ${product.priceInUSD}`}
    </Button>
  )
}
