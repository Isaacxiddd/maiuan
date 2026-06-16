import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Container from './Container'

const plans = [
  {
    name: 'Inicial',
    desc: 'Para arrancar rápido con una presencia profesional que convierte visitas en consultas.',
    items: ['Landing de una página', 'Copy orientado a conversión', 'Formulario + WhatsApp', 'Diseño responsive', 'Deploy incluido'],
    cta: 'Empezar',
    highlight: false,
  },
  {
    name: 'Crecimiento',
    desc: 'Para negocios que quieren más alcance, más datos y acompañamiento real.',
    items: ['Todo lo del plan Inicial', 'SEO técnico completo', 'Analytics configurado', 'Integración con CRM', 'Soporte 30 días'],
    cta: 'Más elegido',
    highlight: true,
  },
  {
    name: 'Sistema',
    desc: 'Para negocios que quieren una máquina de captación de clientes a largo plazo.',
    items: ['Todo lo anterior', 'Múltiples páginas', 'Automatizaciones', 'Blog SEO', 'Soporte continuo'],
    cta: 'Hablemos',
    highlight: false,
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicios" className="py-10 md:py-12">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Servicios</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4">
            Elegí tu punto de entrada.
          </h2>
          <p className="text-[var(--text-muted)] mt-4 text-base font-light max-w-lg mx-auto">
            Tres paquetes claros. Sin letra chica. Sin sorpresas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
               className={`relative rounded-xl border flex flex-col ${
                p.highlight
                  ? 'border-[var(--accent)] bg-[var(--accent)]/[0.04]'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-white/20 transition-colors duration-300'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-6 bg-[var(--accent)] text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                  Más popular
                </span>
              )}

              {/* Header */}
              <div className="px-5 pt-5 pb-3 border-b border-[var(--border)]">
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="text-[var(--text-muted)] mt-3 text-sm leading-relaxed">{p.desc}</p>
              </div>

              {/* Items */}
              <ul className="flex-1 px-5 py-3 space-y-1.5">
                {p.items.map(item => (
                  <li key={item} className="flex gap-2 text-white/70 text-sm leading-snug">
                    <span className="text-[var(--accent)] shrink-0 font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="px-5 pb-4">
                <motion.a
                  href="#contacto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`block text-center text-sm py-3 rounded-full font-semibold transition-colors duration-200 cursor-pointer ${
                    p.highlight
                      ? 'bg-[var(--accent)] text-black hover:bg-white'
                      : 'border border-[var(--border)] text-white/70 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {p.cta}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
