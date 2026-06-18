import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Container from './Container'

const steps = [
  { n: '01', title: 'Brief', desc: 'Una llamada de 30 minutos. Entendemos tu negocio, tu cliente ideal y qué consulta querés generar.', time: 'Día 1' },
  { n: '02', title: 'Estructura', desc: 'Te enviamos un documento con las secciones, el copy principal y los CTAs. Lo ajustamos hasta que esté ok.', time: 'Día 2-3' },
  { n: '03', title: 'Diseño', desc: 'Prototipo interactivo en alta fidelidad. Lo ves en desktop y mobile antes de escribir una línea de código.', time: 'Día 4-6' },
  { n: '04', title: 'Desarrollo', desc: 'Codificamos en React + Tailwind. Rápido, responsive, optimizado para carga y SEO.', time: 'Día 7-10' },
  { n: '05', title: 'Revisión', desc: 'Testeamos en Chrome, Safari, Firefox, Edge y 3 dispositivos móviles. Ajustamos lo que haga falta.', time: 'Día 11-12' },
  { n: '06', title: 'Publicación', desc: 'Deploy con dominio propio, analytics configurado, formulario activo. Tu landing está generando consultas.', time: 'Día 13-14' },
]

const GREEN = '#22ff88'

export default function Process() {
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const activeRef = useRef(-1)
  const [linePath, setLinePath] = useState('')

  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-100px' })

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', () => {
    const grid = gridRef.current
    if (!grid) return

    const rect = grid.getBoundingClientRect()

    if (rect.top > window.innerHeight || rect.bottom < 0) {
      if (activeRef.current !== -1) {
        activeRef.current = -1
        setActiveIndex(-1)
      }
      return
    }

    const scrollEnd = 100
    const scrolled = window.innerHeight - rect.top
    const progress = Math.max(0, Math.min(1, scrolled / (window.innerHeight - scrollEnd)))
    const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length))

    if (idx !== activeRef.current) {
      activeRef.current = idx
      setActiveIndex(idx)
    }
  })

  // Build path through card centers
  const gridRectCached = useRef<DOMRect | null>(null)

  const buildPath = (idx: number) => {
    const grid = gridRef.current
    if (!grid || idx < 1) { setLinePath(''); return }

    const gridRect = grid.getBoundingClientRect()
    gridRectCached.current = gridRect

    const cx = (i: number) => {
      const el = cardRefs.current[i]
      if (!el) return 0
      const r = el.getBoundingClientRect()
      return r.left + r.width / 2 - gridRect.left
    }
    const cy = (i: number) => {
      const el = cardRefs.current[i]
      if (!el) return 0
      const r = el.getBoundingClientRect()
      return r.top + r.height / 2 - gridRect.top
    }

    let path = `M ${cx(0)} ${cy(0)}`

    for (let i = 1; i <= idx; i++) {
      const prevX = cx(i - 1)
      const currX = cx(i)
      const currY = cy(i)

      if (i === 3) {
        const prevY = cy(i - 1)
        const turnY = prevY + (currY - prevY) / 2
        const r = 8
        path += ` L ${prevX} ${turnY - r}`
        path += ` A ${r} ${r} 0 0 1 ${prevX - r} ${turnY}`
        path += ` L ${currX} ${currY}`
      } else {
        path += ` L ${currX} ${currY}`
      }
    }

    setLinePath(path)
  }

  // Rebuild path whenever activeIndex changes
  useEffect(() => { buildPath(activeIndex) }, [activeIndex])

  return (
    <section id="proceso" className="py-10 md:py-12 bg-[var(--surface)]">
      <Container>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 max-w-xl mx-auto text-center"
        >
          <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">¿Qué hacemos?</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4">Cómo trabajamos.</h2>
          <p className="text-[var(--text-muted)] mt-4 text-base font-light leading-relaxed">
            Entrega en tiempo y forma.
          </p>
        </motion.div>

        <div ref={gridRef} className="relative">
          {linePath && (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ width: '100%', height: '100%', zIndex: -1 }}
            >
              <motion.path
                key={linePath}
                d={linePath}
                fill="none"
                stroke={GREEN}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(34,255,136,0.4))' }}
              />
            </svg>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative" style={{ zIndex: 0 }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                ref={el => { cardRefs.current[i] = el }}
                className="p-4 border rounded-xl bg-[var(--bg)] flex flex-col transition-all duration-700"
                style={{
                  borderColor: i <= activeIndex ? 'rgba(34,255,136,0.25)' : 'var(--border)',
                  boxShadow: i <= activeIndex ? `0 0 20px -10px ${GREEN}` : 'none',
                }}
              >
                <span
                  className="text-[2rem] font-extrabold leading-none block transition-colors duration-700"
                  style={{ color: i <= activeIndex ? GREEN : 'rgba(255,255,255,0.05)' }}
                >
                  {s.n}
                </span>
                <span className="text-[var(--accent)] text-[9px] font-semibold tracking-wider uppercase">{s.time}</span>
                <h3 className="text-sm font-bold mt-0.5 text-white">{s.title}</h3>
                <p className="text-[var(--text-muted)] mt-1 text-xs leading-relaxed flex-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
