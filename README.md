# 🛍️ MercadoStore — E-commerce com React + TypeScript + Tailwind

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/        # Header e Footer (presentes em todas as páginas)
│   ├── product/       # ProductCard (um produto) + ProductGrid (lista com filtros)
│   └── cart/          # CartDrawer (gaveta lateral do carrinho)
├── context/
│   └── CartContext.tsx   # Estado global do carrinho (Context API + useReducer)
├── data/
│   └── products.ts       # Dados mockados dos produtos
├── hooks/
│   └── useProducts.ts    # Hook com lógica de filtro e busca
├── pages/
│   └── HomePage.tsx      # Página inicial com Hero + Grid
├── styles/
│   └── globals.css       # Tailwind + estilos base
├── types/
│   └── index.ts          # Interfaces TypeScript (Product, CartItem, etc.)
├── App.tsx               # Rotas + Provider global
└── main.tsx              # Ponto de entrada React
```

## 🚀 Como Rodar

```bash
npm install
npm run dev
```

## 🧩 Próximos Passos

- [ ] Página de detalhe do produto (`/produto/:id`)
- [ ] Página de checkout
- [ ] Autenticação (login/cadastro)
- [ ] Integração com API real (ex: Fake Store API)
- [ ] Persistência do carrinho no localStorage
- [ ] Paginação ou scroll infinito

## 📦 Tecnologias

- **React 18** + **TypeScript** — UI reativa com tipagem
- **Tailwind CSS** — Estilização utilitária
- **React Router DOM** — Navegação entre páginas
- **Vite** — Build tool ultrarrápido
