import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MaiuanLogo from './MaiuanLogo'

const navLinks = [
  { label: 'Servicios', path: '/servicios', section: 'servicios' },
  { label: '¿Qué hacemos?', path: '/que-hacemos', section: 'proceso' },
  { label: 'Trabajos', path: '/trabajos', section: 'portfolio' },
  { label: 'Contacto', path: '/contacto', section: 'contacto' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [pill, setPill] = useState<{ left: number; width: number }>({ left: 0, width: 0 })
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const navRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const rafRef = useRef(0)

  const currentPath = location.pathname

  // cached nav-link positions (relative to nav container)
  const linkPositions = useRef<{ left: number; width: number }[]>([])

  const recalcCache = useCallback(() => {
    const nr = navRef.current?.getBoundingClientRect()
    if (!nr) return
    linkPositions.current = linkRefs.current.map(el => {
      if (!el) return { left: 0, width: 0 }
      const lr = el.getBoundingClientRect()
      return { left: lr.left - nr.left, width: lr.width }
    })
    // also re-apply pill position after cache update
    const idx = navLinks.findIndex(l => l.path === location.pathname)
    if (idx >= 0) {
      const pos = linkPositions.current[idx]
      if (pos) setPill(pos)
    }
  }, [location.pathname])

  useEffect(() => {
    recalcCache()
    const onResize = () => recalcCache()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [recalcCache])

  // detect closest section on scroll — uses cached nav positions, reads section rects
  const updatePill = useCallback(() => {
    const sy = window.scrollY
    if (sy < 100) { setPill({ left: 0, width: 0 }); return }

    const offset = sy + window.innerHeight * 0.3 + 72

    let bestIdx = -1
    let bestDist = Infinity
    for (let i = 0; i < navLinks.length; i++) {
      const el = document.getElementById(navLinks[i].section)
      if (!el) continue
      const { top } = el.getBoundingClientRect()
      const dist = Math.abs(offset - (sy + top))
      if (dist < bestDist) { bestDist = dist; bestIdx = i }
    }

    if (bestIdx < 0) { setPill({ left: 0, width: 0 }); return }

    const pos = linkPositions.current[bestIdx]
    if (pos && (pos.left !== pill.left || pos.width !== pill.width)) {
      setPill(pos)
    }
  }, [pill])

  useMotionValueEvent(scrollY, 'change', () => {
    setScrolled(window.scrollY > 40)
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        updatePill()
      })
    }
  })

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, section: string, path: string) => {
    e.preventDefault()
    if (currentPath !== path) navigate(path, { state: { nav: true } })
    const el = document.getElementById(section)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [navigate, currentPath])

  const showPill = pill.width > 0

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: 'var(--nav-h)' }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center backdrop-blur-xl border-b transition-all duration-500 ${
        scrolled ? 'bg-[#080808]/85 border-white/[0.06]' : 'bg-[#080808]/50 border-white/[0.03]'
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/15 to-transparent" />
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="min-w-[5.5rem] cursor-pointer" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <MaiuanLogo />
        </div>

        <motion.nav
          ref={navRef}
          className="hidden md:flex items-center gap-1 relative"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
        >
          {showPill && (
            <motion.div
              className="absolute top-0 bottom-0 rounded-full bg-[var(--accent)]/[0.12] pointer-events-none"
              animate={{ left: pill.left, width: pill.width }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}

          {navLinks.map(({ label, section, path }, i) => {
            const isActive = currentPath === path
            return (
              <motion.a
                key={path}
                ref={el => { linkRefs.current[i] = el }}
                href={path}
                onClick={e => handleClick(e, section, path)}
                variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`relative z-10 px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute inset-x-3 bottom-0 h-[1.5px] rounded-full bg-[var(--accent)] transition-all duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </motion.a>
            )
          })}
        </motion.nav>

        <a
          href="https://instagram.com/maiuan.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-white/40 hover:text-[var(--accent)] transition-colors duration-200 tracking-wide"
        >
          @maiuan.ar ↗
        </a>
      </div>
    </motion.header>
  )
}
