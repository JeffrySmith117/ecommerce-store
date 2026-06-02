// App.tsx — Componente raiz da aplicação
// Aqui ficam as rotas e o layout global (Header + Footer)

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    // CartProvider envolve tudo para que qualquer componente
    // possa acessar o carrinho via useCart()
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />

          {/* Routes: renderiza o componente da rota atual */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Adicione mais rotas aqui: /produto/:id, /checkout, etc. */}
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}
