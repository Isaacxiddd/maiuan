import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import MaiuanLogo from './MaiuanLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <MaiuanLogo />
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
