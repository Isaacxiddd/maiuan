import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Container from './Container'

const projects = [
  {
    rubro: 'Gastronomía',
    name: 'Guayafood',
    desc: 'Landing para delivery de comida casera. Diseño apetitoso, WhatsApp integrado, pedidos directos. Dueño cocina, nosotros le hicimos la web.',
    tags: ['React', 'Tailwind', 'WhatsApp API'],
    image: '/guayafood-frame.jpg',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portfolio" className="py-10 md:py-12">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Portfolio</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4">Algunos trabajos.</h2>
          <p className="text-[var(--text-muted)] mt-4 text-base font-light max-w-md mx-auto">
            Proyectos reales, resultados concretos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-stretch max-w-md mx-auto">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="rounded-xl border border-[var(--border)] overflow-hidden hover:border-white/25 transition-colors duration-300 flex flex-col"
            >
              {p.image ? (
                <div className="h-28 shrink-0 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div
                  className="h-28 flex items-center justify-center text-4xl shrink-0"
                  style={{ background: p.bg }}
                >
                  {p.emoji}
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <span className="text-[var(--accent)] text-[9px] font-semibold tracking-[0.2em] uppercase">{p.rubro}</span>
                <h3 className="font-bold text-sm mt-1.5 text-white">{p.name}</h3>
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

                <motion.a
                  href="#contacto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold bg-[var(--accent)] text-black py-2.5 rounded-full hover:bg-white transition-colors duration-200 cursor-pointer"
                >
                  Ver proyecto ↗
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
