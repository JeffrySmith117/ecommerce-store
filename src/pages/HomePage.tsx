import ProductGrid from '../components/product/ProductGrid'

export default function HomePage() {
  return (
    <main>
      {/* Banner Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <p className="text-primary-200 text-sm font-semibold uppercase tracking-widest mb-3">
            Nova Coleção 2026
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-lg">
            Estilo que fala por você
          </h1>
          <p className="mt-4 text-primary-100 text-lg max-w-sm">
            Descubra peças únicas com qualidade premium e preços que cabem no seu bolso.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="bg-white text-primary-700 font-semibold px-7 py-3 rounded-2xl hover:bg-primary-50 transition-colors">
              Ver Coleção
            </button>
            <button className="border border-white/40 text-white font-semibold px-7 py-3 rounded-2xl hover:bg-white/10 transition-colors">
              Nossas Ofertas
            </button>
          </div>
        </div>
      </section>

      {/* Grade de produtos */}
      <ProductGrid />
    </main>
  )
}
