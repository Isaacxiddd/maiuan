import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import MaiuanLogo from './MaiuanLogo'

const NAV_H = 72

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: '¿Qué hacemos?', href: '#proceso' },
  { label: 'Trabajos', href: '#portfolio' },
  { label: 'Contacto', href: '#contacto' },
]

function getSectionId(href: string) {
  return href.slice(1)
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [pill, setPill] = useState<{ left: number; width: number }>({ left: 0, width: 0 })
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const navRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef('')
  const pillVisible = useRef(false)
  const { scrollY } = useScroll()

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (!el) return

    const extra = sectionId === 'servicios' ? 25 : sectionId === 'portfolio' ? 10 : 0
    const rect = el.getBoundingClientRect()
    window.scrollTo({
      top: Math.max(0, window.scrollY + rect.top - NAV_H + extra),
    })
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    scrollToSection(sectionId)
    history.replaceState(null, '', `#${sectionId}`)
  }, [scrollToSection])

  useMotionValueEvent(scrollY, 'change', () => {
    setScrolled(window.scrollY > 40)

    const sectionIds = navLinks.map(l => getSectionId(l.href))
    const vh = window.innerHeight
    let found = ''

    // Bottom-up: find the lowest section whose content overlaps the viewport
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i])
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top < vh && rect.bottom > NAV_H) {
        found = sectionIds[i]
        break
      }
    }

    if (found === activeRef.current) return
    activeRef.current = found
    setActiveSection(found)
    pillVisible.current = true

    if (found) {
      const idx = navLinks.findIndex(l => getSectionId(l.href) === found)
      const linkEl = linkRefs.current[idx]
      const navEl = navRef.current
      if (linkEl && navEl) {
        const lr = linkEl.getBoundingClientRect()
        const nr = navEl.getBoundingClientRect()
        setPill({ left: lr.left - nr.left, width: lr.width })
      }
    }
  })

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
      {/* Top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/15 to-transparent" />
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="min-w-[5.5rem]" onClickCapture={e => { e.preventDefault(); e.stopPropagation(); window.scrollTo({ top: 0 }); history.replaceState(null, '', window.location.pathname) }}>
          <MaiuanLogo />
        </div>

        <motion.nav
          className="hidden md:flex items-center gap-1 relative"
          ref={navRef}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
        >
          {/* Pill indicator (scroll) */}
          <motion.div
            className="absolute top-0 bottom-0 rounded-full bg-white/10 pointer-events-none"
            animate={{ left: pill.left, width: pill.width }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />

          {navLinks.map(({ label, href }, i) => {
            const isActive = activeSection === getSectionId(href)
            return (
              <motion.a
                key={href}
                ref={el => { linkRefs.current[i] = el }}
                href={href}
                onClick={e => handleNavClick(e, getSectionId(href))}
                variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`relative z-10 px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 group ${
                  isActive
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
                {/* Underline hover (solo mouse, no scroll) */}
                <span
                  className={`absolute inset-x-3 bottom-0 h-[1.5px] rounded-full bg-[var(--accent)] transition-all duration-300 scale-x-0 group-hover:scale-x-100`}
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
