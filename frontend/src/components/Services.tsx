import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Container from './Container'

const plans = [
  {
    name: 'Inicial',
    desc: 'Para arrancar rápido con una presencia profesional que convierte visitas en consultas.',
    price: 'Desde $150.000',
    items: ['Landing de una página', 'Texto pensado para convertir visitas en consultas', 'Formulario + WhatsApp', 'Se ve bien en celular y computadora', 'Lo publicamos y queda funcionando'],
    cta: 'Empezar',
    highlight: false,
  },
  {
    name: 'Crecimiento',
    desc: 'Para negocios que quieren más alcance, más datos y acompañamiento real.',
    price: 'Desde $250.000',
    items: ['Todo lo del plan Inicial', 'Tu negocio aparece en Google cuando te buscan', 'Ves cuánta gente entra y cuántos te escriben', 'Cada consulta queda registrada sin perderla', 'Estoy al lado tuyo el primer mes'],
    cta: 'Mi recomendación',
    highlight: true,
  },
  {
    name: 'Sistema',
    desc: 'Para negocios que quieren una máquina de captación de clientes a largo plazo.',
    price: 'A consultar',
    items: ['Todo lo anterior', 'Varias páginas — presencia web completa', 'Ahorrás horas con tareas que se hacen solas', 'Contenido que atrae clientes sin pagar publicidad', 'Siempre hay alguien del otro lado'],
    cta: 'Hablemos',
    highlight: false,
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicios" className="py-6 md:py-8">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <span className="text-[var(--accent)] text-[10px] font-semibold tracking-[0.2em] uppercase">Servicios</span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold mt-2">
            Elegí tu punto de entrada.
          </h2>
          <p className="text-[var(--text-muted)] mt-2 text-sm font-light max-w-lg mx-auto">
            Diseñado para negocios que quieren crecer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch">
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
                  Mi recomendación
                </span>
              )}

              {/* Header */}
                <div className="px-4 pt-4 pb-2 border-b border-[var(--border)]">
                  <h3 className="text-base font-bold">{p.name}</h3>
                  <p className="text-[var(--accent)] font-semibold text-xs mt-1.5">{p.price}</p>
                  <p className="text-[var(--text-muted)] mt-2 text-xs leading-relaxed">{p.desc}</p>
                </div>

              {/* Items */}
              <ul className="flex-1 px-4 py-2 space-y-1">
                {p.items.map(item => (
                  <li key={item} className="flex gap-2 text-white/70 text-sm leading-snug">
                    <span className="text-[var(--accent)] shrink-0 font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="px-4 pb-3">
                <motion.a
                  href="#contacto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`block text-center text-xs py-2.5 rounded-full font-semibold transition-colors duration-200 cursor-pointer ${
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

        <p className="text-center text-sm text-[var(--text-muted)] mt-3 pb-1">
          ¿No estás seguro cuál te conviene?{" "}
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '5491123952146'}?text=Hola%20maiuan%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:text-white underline underline-offset-2 transition-colors"
          >
            Escribime y lo vemos en 5 minutos.
          </a>
        </p>
      </Container>
    </section>
  )
}
