import { ShoppingCart, Star } from 'lucide-react'
import { Product } from '../../types'
import { useCart } from '../../context/CartContext'

interface Props {
  product: Product
}

// Cores das etiquetas de badge
const badgeColors: Record<string, string> = {
  'Novo': 'bg-blue-100 text-blue-700',
  'Oferta': 'bg-red-100 text-red-600',
  'Popular': 'bg-amber-100 text-amber-700',
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart()

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Imagem do produto */}
      <div className="relative overflow-hidden h-56 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge (etiqueta) */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[product.badge]}`}>
            {product.badge}
          </span>
        )}
        {/* Desconto */}
        {discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Informações */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2">{product.name}</h3>

        {/* Avaliação */}
        <div className="flex items-center gap-1 mb-3">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Preços + botão */}
        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
            )}
            <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl transition-all"
          >
            <ShoppingCart size={15} />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
