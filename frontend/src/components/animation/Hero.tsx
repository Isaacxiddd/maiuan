import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: 'var(--nav-h)' }}
    >
      <div className="w-full px-6 md:px-12 pt-16 pb-10 md:pt-20 md:pb-12 relative z-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center" style={{ maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.03em] mb-4"
          >
            <span className="font-extrabold">Tu negocio</span><br />
              <span className="font-medium text-hero">merece</span><br />
              <span className="font-extrabold">más consultas.</span>
            </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[var(--text-muted)] text-sm md:text-base mb-6 leading-relaxed font-light"
          >
            <span className="text-white/90 font-medium">Guayafood</span> pasó de vender solo por Instagram a tener un sitio propio que cobra y ordena los pedidos solo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex gap-3 flex-wrap"
          >
            <Link
              to="/"
              className="bg-[var(--accent)] text-black text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 cursor-pointer block"
            >
              Ir al sitio principal
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden md:block"
        >
          <a href="https://guayafood.vercel.app/" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black shadow-2xl group cursor-pointer">
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-300 z-10 rounded-2xl" />
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto block"
            >
              <source src="/hero-demo.mp4" type="video/mp4" />
            </video>
          </a>
          <div className="absolute -bottom-4 left-10 right-10 h-8 rounded-full bg-black/40 blur-xl" />
        </motion.div>
      </div>
    </section>
  )
}
