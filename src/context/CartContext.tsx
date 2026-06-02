// ============================================
// CONTEXTO DO CARRINHO
// Context API = forma do React compartilhar dados
// entre componentes sem passar "props" manualmente
// em cada nível da árvore de componentes.
// ============================================

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem, CartState, Product } from '../types'

// Define quais ações o carrinho pode receber
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }       // payload = id do produto
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }

// Estado inicial (carrinho vazio)
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
}

// Função auxiliar para calcular total e quantidade
function calculateTotals(items: CartItem[]) {
  return {
    total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  }
}

// Reducer: recebe o estado atual + uma ação, retorna o novo estado
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.product.id === action.payload.id)
      const updatedItems = existing
        ? state.items.map(i =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { product: action.payload, quantity: 1 }]
      return { ...state, items: updatedItems, ...calculateTotals(updatedItems) }
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(i => i.product.id !== action.payload)
      return { ...state, items: updatedItems, ...calculateTotals(updatedItems) }
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = action.payload.quantity === 0
        ? state.items.filter(i => i.product.id !== action.payload.id)
        : state.items.map(i =>
            i.product.id === action.payload.id
              ? { ...i, quantity: action.payload.quantity }
              : i
          )
      return { ...state, items: updatedItems, ...calculateTotals(updatedItems) }
    }
    case 'CLEAR_CART':
      return initialState
    default:
      return state
  }
}

// Tipo do contexto que será exposto para os componentes
interface CartContextType {
  state: CartState
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider: envolve a aplicação e disponibiliza o carrinho para todos
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product })
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado: forma fácil de usar o carrinho em qualquer componente
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider')
  return context
}
