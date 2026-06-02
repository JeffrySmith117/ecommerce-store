import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CartProvider, useCart } from '../context/CartContext'
import { Product } from '../types'

const mockProduct: Product = {
  id: 1,
  name: 'Produto Teste',
  price: 100,
  image: '',
  category: 'Teste',
  rating: 5,
  reviewCount: 10,
  description: 'Teste',
}

// Componente auxiliar para testar o contexto
function TestComponent() {
  const { state, addItem, removeItem } = useCart()
  return (
    <div>
      <p data-testid="count">{state.itemCount}</p>
      <p data-testid="total">{state.total}</p>
      <button onClick={() => addItem(mockProduct)}>Adicionar</button>
      <button onClick={() => removeItem(mockProduct.id)}>Remover</button>
    </div>
  )
}

describe('CartContext', () => {
  it('deve iniciar com carrinho vazio', () => {
    render(<CartProvider><TestComponent /></CartProvider>)
    expect(screen.getByTestId('count').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0')
  })

  it('deve adicionar item ao carrinho', () => {
    render(<CartProvider><TestComponent /></CartProvider>)
    fireEvent.click(screen.getByText('Adicionar'))
    expect(screen.getByTestId('count').textContent).toBe('1')
    expect(screen.getByTestId('total').textContent).toBe('100')
  })

  it('deve incrementar quantidade ao adicionar o mesmo item', () => {
    render(<CartProvider><TestComponent /></CartProvider>)
    fireEvent.click(screen.getByText('Adicionar'))
    fireEvent.click(screen.getByText('Adicionar'))
    expect(screen.getByTestId('count').textContent).toBe('2')
    expect(screen.getByTestId('total').textContent).toBe('200')
  })

  it('deve remover item do carrinho', () => {
    render(<CartProvider><TestComponent /></CartProvider>)
    fireEvent.click(screen.getByText('Adicionar'))
    fireEvent.click(screen.getByText('Remover'))
    expect(screen.getByTestId('count').textContent).toBe('0')
  })
})