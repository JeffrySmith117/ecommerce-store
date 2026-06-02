// main.tsx — Ponto de entrada da aplicação React
// Aqui o React é inicializado e montado no index.html

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // StrictMode ajuda a encontrar problemas durante o desenvolvimento
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
