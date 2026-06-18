import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Container from './Container'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoLoaded(true)
          ob.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  useEffect(() => {
    if (!videoLoaded) return
    const el = videoRef.current
    if (!el) return
    el.load()
  }, [videoLoaded])
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col pt-[calc(var(--nav-h)+1rem)] md:pt-[calc(var(--nav-h)+2rem)]"
    >
      <Container className="pt-6 pb-10 md:pt-10 md:pb-12 relative z-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left: text */}
        <div className="flex flex-col max-md:contents md:col-start-1 md:row-start-1">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[clamp(2rem,8vw,4rem)] leading-[1.1] tracking-normal mb-4 font-extrabold"
          >
            <span className="text-[1.1em]">Tu negocio</span><br />
              <span className="font-medium text-hero">merece</span><br />
              <span className="text-[1.1em]">más consultas.</span>
            </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[var(--text-muted)] text-base mb-6 leading-relaxed font-light max-md:order-1"
          >
            <span className="text-white/90 font-medium">Guayafood</span> pasó de vender solo por Instagram a tener un sitio propio que cobra y ordena los pedidos solo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex gap-3 flex-wrap justify-center md:justify-start max-md:order-3 max-md:mt-6"
          >
            <motion.a
              href="#contacto"
              initial="idle"
              whileHover="hover"
              className="relative bg-[var(--accent)] text-black text-sm md:text-base font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 cursor-pointer block overflow-hidden"
            >
              <div className="relative flex items-center justify-center">
                <motion.span
                  variants={{
                    idle: { opacity: 1, y: 0, scale: 1 },
                    hover: { opacity: 0, y: 6, scale: 0.6, transition: { duration: 0.2 } },
                  }}
                >
                  Hablemos
                </motion.span>
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute w-5 h-5 text-black"
                  variants={{
                    idle: { opacity: 0, y: -6, scale: 0.4 },
                    hover: {
                      opacity: [0, 1, 1],
                      y: [-6, 3, 0],
                      scale: [0.4, 1.2, 1],
                      transition: { duration: 0.35, ease: 'easeOut' },
                    },
                  }}
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </motion.svg>
              </div>
            </motion.a>
            <motion.a
              href="#servicios"
              initial="idle"
              whileHover="hover"
              className="relative border border-[var(--border)] text-white/70 text-sm md:text-base px-7 py-3.5 rounded-md hover:border-white/30 hover:text-white transition-colors duration-200 cursor-pointer block overflow-hidden"
            >
              Ver servicios{' '}
              <motion.span
                className="inline-block"
                variants={{
                  idle: { x: 0, opacity: 1 },
                  hover: { x: 80, opacity: [1, 1, 0], transition: { duration: 0.2, ease: 'easeIn' } },
                }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right: video mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-md:order-2 max-md:mt-6"
        >
          <div className="perspective-[1000px] group">
            <div className="relative [transform-style:preserve-3d] transition-transform duration-700 border border-white/[0.08] bg-black shadow-2xl group-hover:[transform:rotateY(180deg)]">
              {/* Front: video */}
              <a
                href="https://guayafood.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver sitio de Guayafood"
                className="block [backface-visibility:hidden] rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 z-10 rounded-2xl" />
                <video
                  ref={videoRef}
                  autoPlay muted loop playsInline
                  poster="/guayafood-frame.jpg"
                  preload={videoLoaded ? 'auto' : 'none'}
                  className="w-full h-auto block"
                >
                  <source src="/hero-demo.mp4" type="video/mp4" />
                </video>
              </a>

              {/* Back: text */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center bg-black rounded-2xl overflow-hidden">
                <span className="text-5xl md:text-6xl mb-4 [filter:drop-shadow(0_0_12px_rgba(232,255,0,0.5))]">↗</span>
                <span className="font-sans text-white/80 text-base md:text-lg font-medium tracking-wide">Explorar proyecto</span>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-[var(--accent)] opacity-50" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-10 right-10 h-8 rounded-full bg-black/40 blur-xl" />
        </motion.div>
      </Container>
    </section>
  )
}
