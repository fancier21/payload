'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface SearchSelection {
  grapeSlug: string
  producerSlug: string | null
}

interface SearchContextType {
  isOpen: boolean
  selection: SearchSelection | null
  openSearch: (initialSelection?: SearchSelection) => void
  closeSearch: () => void
  setSelection: (newSelection: SearchSelection) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selection, setSelection] = useState<SearchSelection | null>(null)

  // Memoize openSearch to prevent infinite re-renders
  const openSearch = useCallback((initialSelection?: SearchSelection) => {
    setSelection(initialSelection || null)
    setIsOpen(true)
  }, [])

  // Memoize closeSearch as well for consistency
  const closeSearch = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Memoize setSelection too
  const handleSetSelection = useCallback((newSelection: SearchSelection) => {
    setSelection(newSelection)
  }, [])

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        selection,
        openSearch,
        closeSearch,
        setSelection: handleSetSelection,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
