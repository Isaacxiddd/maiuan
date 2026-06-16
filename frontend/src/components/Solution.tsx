import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Container from './Container'

const deliverables = [
  'Diseño orientado a que el visitante tome acción',
  'Copy claro que habla el idioma de tu cliente',
  'Formulario de contacto y WhatsApp siempre visibles',
  'Carga rápida y experiencia mobile perfecta',
  'SEO técnico básico desde el día uno',
  'Analytics para medir qué funciona',
]

export default function Solution() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="solucion" className="py-10 md:py-12 bg-[var(--surface)]">
      <Container>
        <div ref={ref} className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">
              La diferencia
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4 leading-[1.1]">
              Una landing que<br />trabaja mientras<br />vos trabajás.
            </h2>
            <p className="text-[var(--text-muted)] mt-4 text-base font-light leading-relaxed">
              No vendemos diseño. Construimos el sistema que convierte
              tu tráfico en consultas reales, todos los días.
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-0"
          >
            {deliverables.map((d, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.12 * i + 0.3, duration: 0.45 }}
                className="flex items-start gap-3 text-white/75 text-sm py-3 border-b border-[var(--border)] last:border-0 leading-snug"
              >
                <span className="text-[var(--accent)] font-bold shrink-0 mt-0.5 text-base">✓</span>
                {d}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  )
}
