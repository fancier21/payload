import * as React from 'react'
import { Producer } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'

interface Props {
  producers: Producer[]
  loading: boolean
  activeProducer?: Producer | null
  onProducerSelect?: (producer: Producer) => void
}

export function Producers({ producers, loading, activeProducer, onProducerSelect }: Props) {
  const handleProducerClick = (producer: Producer) => {
    if (onProducerSelect) {
      onProducerSelect(producer)
    }
  }

  return (
    <div className="bg-gray-800 text-white p-2 rounded-lg">
      <div className="text-md text-center font-normal text-gray-300 pl-2 mb-3">Producers</div>
      <div className="pt-2">
        <div className="px-4 pb-4">
          {loading && <p className="text-center text-gray-400">Loading producers...</p>}

          {!loading && producers.length === 0 && (
            <p className="text-center text-gray-400">No producers found.</p>
          )}

          {!loading && producers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {producers.map((producer) => {
                const isActive = activeProducer?.id === producer.id

                return (
                  <button
                    key={producer.id}
                    onClick={() => handleProducerClick(producer)}
                    className={cn(
                      'px-3 py-2 rounded-lg border transition-all duration-200 text-sm font-medium',
                      'hover:scale-105 active:scale-95',
                      isActive
                        ? 'bg-accent text-accent-foreground border-accent shadow-lg ring-2 ring-accent/50'
                        : 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:border-gray-500',
                    )}
                  >
                    <div className="flex flex-col items-start">
                      <h4 className="font-medium">{producer.title || producer.name}</h4>
                      {producer.region && (
                        <p
                          className={cn(
                            'text-xs',
                            isActive ? 'text-accent-foreground/80' : 'text-gray-400',
                          )}
                        >
                          {producer.region}
                        </p>
                      )}
                    </div>
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white" />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
