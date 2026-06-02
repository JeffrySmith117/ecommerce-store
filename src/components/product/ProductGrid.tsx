import { useState } from 'react'
import { products, categories } from '../../data/products'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('Todos')

  // Filtra os produtos pela categoria selecionada
  const filtered = activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Título da seção */}
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold text-gray-900">Nossos Produtos</h2>
        <p className="text-gray-500 mt-1 text-sm">Encontre o que você precisa com a melhor qualidade</p>
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
