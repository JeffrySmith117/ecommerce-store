import { useEffect, useRef } from 'react'
import ProductGrid from '../components/product/ProductGrid'

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Efeito de partículas no canvas
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
      <section className="relative min-h-screen bg-[#080810] flex items-center overflow-hidden">

        {/* Canvas de partículas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        {/* Gradientes de fundo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/15 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-fuchsia-600/10 blur-[80px]" />
        </div>

        {/* Linha decorativa vertical */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent z-10 hidden md:block" />

        {/* Conteúdo principal */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* Lado esquerdo — texto */}
          <div>
            {/* Tag animada */}
            <div className="inline-flex items-center gap-2 border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              NOVA COLEÇÃO 2026
            </div>

            {/* Título gigante com glitch */}
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

            {/* Botões */}
            <div className="flex flex-wrap gap-4">
              <button className="group relative bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Ver Coleção</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-2xl backdrop-blur-sm transition-all duration-300">
                Nossas Ofertas
              </button>
            </div>

            {/* Métricas */}
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
            {/* Card principal */}
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

            {/* Card secundário */}
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

            {/* Badge flutuante */}
            <div className="absolute top-4 right-8 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-2 rounded-xl backdrop-blur-sm animate-[float_5s_ease-in-out_infinite_1s]">
              🔥 -25% OFF
            </div>
          </div>
        </div>

        {/* Linha decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </section>

      {/* Grade de produtos */}
      <ProductGrid />
    </main>
  )
}