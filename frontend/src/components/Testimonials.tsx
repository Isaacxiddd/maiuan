import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Container from './Container'

const testimonials = [
  {
    name: 'Maria',
    role: 'Dueña de Guayafood',
    location: '',
    text: 'Sin problemas, excelente servicio.',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonios" className="py-10 md:py-12 bg-[var(--surface)]">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Resultados</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4">Lo que dicen.</h2>
          <p className="text-[var(--text-muted)] mt-4 text-base font-light max-w-md mx-auto">
            Negocios reales en Buenos Aires que convirtieron mejor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-stretch max-w-md mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="p-4 border border-[var(--border)] rounded-xl bg-[var(--bg)] flex flex-col"
            >
              <span className="text-[var(--accent)] text-2xl font-serif leading-none mb-3 opacity-50">"</span>

              <p className="text-white/80 text-sm leading-relaxed flex-1 font-light italic">
                {t.text}
              </p>

              <div className="mt-3 pt-2.5 border-t border-[var(--border)]">
                <p className="font-bold text-sm text-white">{t.name}</p>
                <p className="text-[var(--text-muted)] text-xs mt-0.5">
                  {t.role} · <span className="text-white/30">{t.location}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
