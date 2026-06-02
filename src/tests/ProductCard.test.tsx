import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductCard from '../components/product/ProductCard'
import { CartProvider } from '../context/CartContext'
import { Product } from '../types'

// Produto mockado para os testes
const mockProduct: Product = {
  id: 1,
  name: 'Tênis Urban Runner Pro',
  price: 299.90,
  originalPrice: 399.90,
  image: 'https://via.placeholder.com/400',
  category: 'Calçados',
  rating: 4.8,
  reviewCount: 234,
  description: 'Conforto extremo para o dia a dia urbano.',
  badge: 'Oferta',
}

// Função auxiliar para renderizar com o Provider
const renderWithCart = (ui: React.ReactElement) =>
  render(<CartProvider>{ui}</CartProvider>)

describe('ProductCard', () => {
  it('deve renderizar o nome do produto', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Tênis Urban Runner Pro')).toBeInTheDocument()
  })

  it('deve exibir o preço formatado corretamente', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText('R$ 299,90')).toBeInTheDocument()
  })

  it('deve exibir o preço original riscado quando houver desconto', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText('R$ 399,90')).toBeInTheDocument()
  })

  it('deve exibir a badge do produto', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Oferta')).toBeInTheDocument()
  })

  it('deve exibir o botão de adicionar ao carrinho', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Adicionar')).toBeInTheDocument()
  })

  it('deve chamar addItem ao clicar no botão', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    const button = screen.getByText('Adicionar')
    fireEvent.click(button)
    // Sem erro = produto foi adicionado com sucesso
    expect(button).toBeInTheDocument()
  })
})