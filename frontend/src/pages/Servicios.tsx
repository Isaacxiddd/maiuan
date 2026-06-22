import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Container from '../components/Container'

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

const faq = [
  { q: '¿Cuánto tarda en estar lista?', a: 'En 14 días hábiles tu landing está publicada y funcionando. El plan Sistema puede tomar más tiempo porque incluye varias páginas y automatizaciones.' },
  { q: '¿Necesito tener dominio y hosting?', a: 'Nosotros nos encargamos de todo. Te ayudamos a conseguir el dominio y lo publicamos en Vercel, que es rápido y gratuito.' },
  { q: '¿Puedo hacer cambios después?', a: 'Sí. Te damos acceso y te explicamos lo básico. Si querés que lo hagamos nosotros, tenemos planes de mantenimiento.' },
  { q: '¿Funciona para cualquier rubro?', a: 'Diseñamos para negocios locales de Buenos Aires: gastronomía, indumentaria, servicios profesionales, salud, belleza, etc.' },
  { q: '¿Cómo sé qué plan elegir?', a: 'Si arrancás, el plan Inicial está bien. Si querés aparecer en Google y tener datos, Crecimiento es tu mejor opción.' },
]

export default function Servicios() {
  return (
    <main className="min-h-screen pt-[var(--nav-h)]">
      <Container className="py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Servicios</span>
          <h1 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold mt-2">
            Elegí tu punto de entrada.
          </h1>
          <p className="text-[var(--text-muted)] mt-2 text-sm font-light max-w-lg mx-auto">
            Diseñado para negocios que quieren crecer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch mb-12">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`relative rounded-xl border flex flex-col ${
                p.highlight
                  ? 'border-[var(--accent)] bg-[var(--accent)]/[0.04]'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-white/20 transition-colors duration-300'
              }`}
            >
              <div className="px-4 pt-4 pb-2 border-b border-[var(--border)]">
                <h2 className="text-base font-bold">{p.name}</h2>
                <p className="text-[var(--accent)] font-semibold text-xs mt-1.5">{p.price}</p>
                <p className="text-[var(--text-muted)] mt-2 text-xs leading-relaxed">{p.desc}</p>
              </div>

              <ul className="flex-1 px-4 py-2 space-y-1">
                {p.items.map(item => (
                  <li key={item} className="flex gap-2 text-white/70 text-sm leading-snug">
                    <span className="text-[var(--accent)] shrink-0 font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="px-4 pb-3">
                <Link
                  to="/#contacto"
                  className={`block text-center text-xs py-2.5 rounded-full font-semibold transition-colors duration-200 ${
                    p.highlight
                      ? 'bg-[var(--accent)] text-black hover:bg-white'
                      : 'border border-[var(--border)] text-white/70 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-center text-lg font-bold mb-6">Preguntas frecuentes</h2>
          <div className="space-y-2">
            {faq.map((item, i) => (
              <details
                key={i}
                className="border border-[var(--border)] rounded-xl overflow-hidden group"
              >
                <summary className="px-4 py-3 text-sm font-medium text-white/80 cursor-pointer hover:text-white transition-colors list-none flex items-center justify-between group-open:border-b group-open:border-[var(--border)]">
                  {item.q}
                  <span className="text-[var(--accent)] text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="px-4 py-3 text-xs text-[var(--text-muted)] leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-sm text-[var(--text-muted)] mt-8">
          ¿No estás seguro cuál te conviene?{' '}
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
    </main>
  )
}
