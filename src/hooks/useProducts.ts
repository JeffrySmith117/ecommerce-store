// ============================================
// HOOK PERSONALIZADO: useProducts
// Hooks customizados encapsulam lógica reutilizável.
// Este hook gerencia busca e filtragem de produtos.
// Use-o quando precisar de busca ou mais filtros.
// ============================================

import { useState, useMemo } from 'react'
import { products } from '../data/products'
import { Product } from '../types'

interface FilterOptions {
  category: string
  search: string
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'default'
}

export function useProducts() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'Todos',
    search: '',
    sortBy: 'default',
  })

  // useMemo: só recalcula quando filters mudar (otimização de performance)
  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products]

    if (filters.category !== 'Todos') {
      result = result.filter(p => p.category === filters.category)
    }

    if (filters.search) {
      const term = filters.search.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(term))
    }

    switch (filters.sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break
    }

    return result
  }, [filters])

  return { filteredProducts, filters, setFilters }
}
