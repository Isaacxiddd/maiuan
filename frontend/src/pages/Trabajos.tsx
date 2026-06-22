import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Container from '../components/Container'

const projects = [
  {
    rubro: 'Gastronomía',
    name: 'Guayafood',
    desc: 'Landing para delivery de comida casera. Diseño apetitoso, WhatsApp integrado, pedidos directos. Dueño cocina, nosotros le hicimos la web.',
    tags: ['React', 'Tailwind', 'WhatsApp API'],
    image: '/guayafood-frame.jpg',
    slug: 'guayafood',
  },
]

export default function Trabajos() {
  return (
    <main className="min-h-screen pt-[var(--nav-h)]">
      <Container className="py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Trabajos</span>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4">Algunos trabajos.</h1>
          <p className="text-[var(--text-muted)] mt-4 text-base font-light max-w-md mx-auto">
            Proyectos reales, resultados concretos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch max-w-2xl mx-auto">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="rounded-xl border border-[var(--border)] overflow-hidden hover:border-white/25 transition-colors duration-300 flex flex-col"
            >
              <div className="h-28 shrink-0 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <span className="text-[var(--accent)] text-[9px] font-semibold tracking-[0.2em] uppercase">{p.rubro}</span>
                <h2 className="font-bold text-sm mt-1.5 text-white">{p.name}</h2>
                <p className="text-[var(--text-muted)] text-xs mt-1.5 leading-relaxed flex-1">{p.desc}</p>

                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {p.tags.map(t => (
                    <span
                      key={t}
                      className="text-[9px] font-medium bg-white/10 text-white/80 px-2 py-0.5 rounded-full border border-white/15"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/trabajos/${p.slug}`}
                  className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold bg-[var(--accent)] text-black py-2.5 rounded-full hover:bg-white transition-colors duration-200"
                >
                  Ver proyecto ↗
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </main>
  )
}
