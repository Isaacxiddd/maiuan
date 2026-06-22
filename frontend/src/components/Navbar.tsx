import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MaiuanLogo from './MaiuanLogo'

const navLinks = [
  { label: 'Servicios', section: 'servicios', path: '/servicios' },
  { label: '¿Qué hacemos?', section: 'proceso', path: '/que-hacemos' },
  { label: 'Trabajos', section: 'portfolio', path: '/trabajos' },
  { label: 'Contacto', section: 'contacto', path: '/contacto' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [pill, setPill] = useState<{ left: number; width: number }>({ left: 0, width: 0 })
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const navRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const currentPath = location.pathname

  const updatePill = useCallback(() => {
    const idx = navLinks.findIndex(l => l.path === currentPath)
    const linkEl = linkRefs.current[idx]
    const navEl = navRef.current
    if (linkEl && navEl) {
      const lr = linkEl.getBoundingClientRect()
      const nr = navEl.getBoundingClientRect()
      setPill({ left: lr.left - nr.left, width: lr.width })
    } else {
      setPill({ left: 0, width: 0 })
    }
  }, [currentPath])

  useEffect(() => {
    updatePill()
  }, [updatePill])

  useMotionValueEvent(scrollY, 'change', () => {
    setScrolled(window.scrollY > 40)
    updatePill()
  })

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, section: string, path: string) => {
    e.preventDefault()
    const el = document.getElementById(section)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    navigate(path, { replace: true })
  }, [navigate])

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
              className="absolute top-0 bottom-0 rounded-full bg-white/10 pointer-events-none"
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
                className={`relative z-10 px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 group ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute inset-x-3 bottom-0 h-[1.5px] rounded-full bg-[var(--accent)] transition-all duration-300 scale-x-0 group-hover:scale-x-100 ${
                    isActive ? 'scale-x-100' : ''
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
