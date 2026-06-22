import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Container from '../components/Container'

const signals = [
  { icon: '⚡', text: 'Tu web tarda más de 3 segundos en cargar y el usuario se va antes de ver tu oferta.' },
  { icon: '📱', text: 'No está adaptada al celular, donde el 80% de tus clientes potenciales te buscan.' },
  { icon: '💬', text: 'No hay un botón de contacto visible. El visitante quiere escribirte pero no sabe cómo.' },
  { icon: '❓', text: 'No queda claro qué ofrecés ni para quién. El mensaje es genérico o inexistente.' },
  { icon: '📉', text: 'No tiene prueba social. Sin casos ni testimonios, la confianza no se construye.' },
  { icon: '🚪', text: 'El visitante entra, mira y se va. No hay ningún motivo para que tome acción.' },
]

const deliverables = [
  'Diseño orientado a que el visitante tome acción',
  'Copy claro que habla el idioma de tu cliente',
  'Formulario de contacto y WhatsApp siempre visibles',
  'Carga rápida y experiencia mobile perfecta',
  'SEO técnico básico desde el día uno',
  'Analytics para medir qué funciona',
]

const steps = [
  { n: '01', title: 'Brief', desc: 'Una llamada de 30 minutos. Entendemos tu negocio, tu cliente ideal y qué consulta querés generar.', time: 'Día 1' },
  { n: '02', title: 'Estructura', desc: 'Te enviamos un documento con las secciones, el copy principal y los CTAs. Lo ajustamos hasta que esté ok.', time: 'Día 2-3' },
  { n: '03', title: 'Diseño', desc: 'Prototipo interactivo en alta fidelidad. Lo ves en desktop y mobile antes de escribir una línea de código.', time: 'Día 4-6' },
  { n: '04', title: 'Desarrollo', desc: 'Codificamos en React + Tailwind. Rápido, responsive, optimizado para carga y SEO.', time: 'Día 7-10' },
  { n: '05', title: 'Revisión', desc: 'Testeamos en Chrome, Safari, Firefox, Edge y 3 dispositivos móviles. Ajustamos lo que haga falta.', time: 'Día 11-12' },
  { n: '06', title: 'Publicación', desc: 'Deploy con dominio propio, analytics configurado, formulario activo. Tu landing está generando consultas.', time: 'Día 13-14' },
]

export default function QueHacemos() {
  return (
    <main className="min-h-screen pt-[var(--nav-h)]">
      {/* Diagnóstico */}
      <section className="py-10 md:py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 max-w-2xl mx-auto text-center"
          >
            <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Diagnóstico</span>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4 leading-[1.1]">
              ¿Tu web está<br />trabajando para vos?
            </h1>
            <p className="text-[var(--text-muted)] mt-4 text-base font-light leading-relaxed">
              Seis señales de que tu presencia digital no está generando consultas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {signals.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.55 }}
                className="flex flex-col gap-2 p-4 border border-[var(--border)] rounded-xl bg-white/[0.025] hover:border-[var(--accent)]/40 hover:shadow-[0_0_20px_-8px_rgba(232,255,0,0.15)] transition-all duration-300"
              >
                <span className="text-[var(--accent)] text-lg">{s.icon}</span>
                <p className="text-white/70 text-xs leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* La diferencia */}
      <section className="py-10 md:py-12 bg-[var(--surface)]">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">La diferencia</span>
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
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-0"
            >
              {deliverables.map((d, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
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

      {/* Cómo trabajamos */}
      <section className="py-10 md:py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 max-w-xl mx-auto text-center"
          >
            <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">¿Qué hacemos?</span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4">Cómo trabajamos.</h2>
            <p className="text-[var(--text-muted)] mt-4 text-base font-light leading-relaxed">
              Entrega en tiempo y forma.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="p-4 border border-[var(--border)] rounded-xl bg-[var(--surface)] flex flex-col"
              >
                <span className="text-[2rem] font-extrabold leading-none text-white/10 block">{s.n}</span>
                <span className="text-[var(--accent)] text-[9px] font-semibold tracking-wider uppercase">{s.time}</span>
                <h3 className="text-sm font-bold mt-0.5 text-white">{s.title}</h3>
                <p className="text-[var(--text-muted)] mt-1 text-xs leading-relaxed flex-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="py-10 md:py-12 bg-[var(--surface)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold">¿Listo para empezar?</h2>
            <p className="text-[var(--text-muted)] mt-3 text-sm font-light">
              Una llamada de 30 minutos y ya sabemos si podemos ayudarte.
            </p>
            <Link
              to="/#contacto"
              className="inline-block mt-5 bg-[var(--accent)] text-black text-sm font-semibold px-7 py-3 rounded-full hover:bg-white transition-colors duration-200"
            >
              Hablemos
            </Link>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
