import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Container from './Container'

function ZapIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>) }
function SmartphoneIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>) }
function MessageOffIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>) }
function HelpIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>) }
function TrendingDownIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>) }
function DoorOpenIcon() { return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>) }

const signals = [
  { icon: <ZapIcon />, text: 'Tu web tarda más de 3 segundos en cargar y el usuario se va antes de ver tu oferta.' },
  { icon: <SmartphoneIcon />, text: 'No está adaptada al celular, donde el 80% de tus clientes potenciales te buscan.' },
  { icon: <MessageOffIcon />, text: 'No hay un botón de contacto visible. El visitante quiere escribirte pero no sabe cómo.' },
  { icon: <HelpIcon />, text: 'No queda claro qué ofrecés ni para quién. El mensaje es genérico o inexistente.' },
  { icon: <TrendingDownIcon />, text: 'No tiene prueba social. Sin casos ni testimonios, la confianza no se construye.' },
  { icon: <DoorOpenIcon />, text: 'El visitante entra, mira y se va. No hay ningún motivo para que tome acción.' },
]

export default function Insight() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="insight" className="py-10 md:py-12">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl mx-auto text-center"
        >
          <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">
            Diagnóstico
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4 leading-[1.1]">
            ¿Tu web está<br />trabajando para vos?
          </h2>
          <p className="text-[var(--text-muted)] mt-4 text-base font-light leading-relaxed">
            Seis señales de que tu presencia digital no está generando consultas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {signals.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.55 }}
              className="flex flex-col gap-2 p-4 border border-[var(--border)] rounded-xl bg-white/[0.025] hover:border-[var(--accent)]/40 hover:shadow-[0_0_20px_-8px_rgba(232,255,0,0.15)] transition-all duration-300"
            >
              <span className="text-[var(--accent)]">{s.icon}</span>
              <p className="text-white/70 text-xs leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
