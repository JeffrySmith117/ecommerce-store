import { useEffect, useRef } from 'react'
import ProductGrid from '../components/product/ProductGrid'

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      })
    }

    let animId: number
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <main>
      {/* HERO DARK */}
      <section id="inicio" className="relative min-h-screen bg-[#080810] flex items-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/15 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-fuchsia-600/10 blur-[80px]" />
        </div>

        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent z-10 hidden md:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              NOVA COLEÇÃO 2026
            </div>

            <h1 className="font-display text-6xl md:text-7xl font-bold leading-none text-white mb-6 tracking-tight">
              Estilo
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-violet-400">
                que fala
              </span>
              por você
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
              Peças únicas com qualidade premium — para quem não aceita o comum.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#produtos" className="group relative bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-300">
                Ver Coleção
              </a>
              <a href="#ofertas" className="border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-2xl backdrop-blur-sm transition-all duration-300">
                Nossas Ofertas
              </a>
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-white/5">
              {[
                { value: '2.4k+', label: 'Clientes' },
                { value: '98%', label: 'Satisfação' },
                { value: '150+', label: 'Produtos' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lado direito — cards flutuantes */}
          <div className="hidden md:flex items-center justify-center relative h-[480px]">
            <div className="absolute w-64 bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl top-8 left-8 animate-[float_6s_ease-in-out_infinite]">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
                alt="produto"
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <p className="text-white font-semibold text-sm">Tênis Urban Runner</p>
                <p className="text-purple-400 font-bold mt-1">R$ 299,90</p>
              </div>
            </div>

            <div className="absolute w-56 bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl bottom-8 right-4 animate-[float_8s_ease-in-out_infinite_2s]">
              <img
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80"
                alt="produto"
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <p className="text-white font-semibold text-sm">Relógio Sunset</p>
                <p className="text-purple-400 font-bold mt-1">R$ 459,00</p>
              </div>
            </div>

            <div className="absolute top-4 right-8 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-2 rounded-xl backdrop-blur-sm animate-[float_5s_ease-in-out_infinite_1s]">
              🔥 -25% OFF
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </section>

      {/* Grade de produtos */}
      <section id="produtos">
        <ProductGrid />
      </section>

      {/* Seção Ofertas */}
      <section id="ofertas" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Ofertas</h2>
        <p className="text-gray-500">Confira os produtos com desconto na seção de produtos acima, filtrados por categoria.</p>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl font-bold mb-4">Sobre a MercadoStore</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Somos uma loja virtual focada em trazer produtos de qualidade premium com os melhores preços do mercado.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Fundada em 2026, nossa missão é conectar pessoas a produtos que expressam seu estilo único.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2.4k+', label: 'Clientes satisfeitos' },
              { value: '150+', label: 'Produtos disponíveis' },
              { value: '98%', label: 'Taxa de satisfação' },
              { value: '24h', label: 'Suporte ao cliente' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-3xl font-bold text-purple-400">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}