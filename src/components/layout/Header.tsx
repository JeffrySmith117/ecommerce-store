import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import CartDrawer from '../cart/CartDrawer'

export default function Header() {
  const { state } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-display text-2xl font-bold text-gray-900 tracking-tight">
            Mercado<span className="text-primary-600">Store</span>
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            {['Início', 'Produtos', 'Ofertas', 'Sobre'].map(item => (
              <a key={item} href="#" className="hover:text-primary-600 transition-colors">{item}</a>
            ))}
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-600" />
            </button>

            {/* Botão do carrinho com badge */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingBag size={20} className="text-gray-600" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {state.itemCount}
                </span>
              )}
            </button>

            {/* Menu mobile */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Nav mobile */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
            {['Início', 'Produtos', 'Ofertas', 'Sobre'].map(item => (
              <a key={item} href="#" className="py-2 border-b border-gray-100">{item}</a>
            ))}
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
