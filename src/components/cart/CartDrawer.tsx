import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

interface Props {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: Props) {
  const { state, removeItem, updateQuantity, clearCart } = useCart()

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <>
      {/* Overlay escuro atrás do drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer lateral */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-display text-xl font-bold text-gray-900">Seu Carrinho</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Lista de itens ou carrinho vazio */}
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
            <ShoppingBag size={48} strokeWidth={1} />
            <p className="text-sm">Seu carrinho está vazio</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[60vh]">
              {state.items.map(item => (
                <div key={item.product.id} className="flex gap-4 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.product.name}</p>
                    <p className="text-primary-600 text-sm font-bold">{formatPrice(item.product.price)}</p>
                    {/* Controle de quantidade */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold"
                      >−</button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold"
                      >+</button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Rodapé com total */}
            <div className="border-t border-gray-100 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total</span>
                <span className="text-xl font-bold text-gray-900">{formatPrice(state.total)}</span>
              </div>
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-2xl font-semibold transition-colors">
                Finalizar Compra
              </button>
              <button
                onClick={clearCart}
                className="w-full text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
