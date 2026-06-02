export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-white text-lg mb-3">MercadoStore</h3>
          <p className="text-sm leading-relaxed">Moda e estilo com a melhor qualidade para o seu dia a dia.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Links</h4>
          <ul className="space-y-2 text-sm">
            {['Produtos', 'Ofertas', 'Sobre nós', 'Contato'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Contato</h4>
          <p className="text-sm">contato@mercadostore.com.br</p>
          <p className="text-sm mt-1">(11) 99999-0000</p>
        </div>
      </div>
      <p className="text-center text-xs mt-10 text-gray-600">© 2026 MercadoStore. Todos os direitos reservados.</p>
    </footer>
  )
}
