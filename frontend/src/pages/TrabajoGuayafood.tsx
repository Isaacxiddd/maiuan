import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Container from '../components/Container'

export default function TrabajoGuayafood() {
  return (
    <main className="min-h-screen pt-[var(--nav-h)]">
      {/* Hero del caso */}
      <section className="relative overflow-hidden">
        <Container className="py-12 md:py-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Gastronomía</span>
            <h1 className="text-[clamp(2rem,5vw,4rem)] font-extrabold mt-3 leading-[0.95]">Guayafood</h1>
            <p className="text-[var(--text-muted)] text-sm md:text-base mt-4 leading-relaxed font-light">
              Landing para delivery de comida casera. Diseño apetitoso, WhatsApp integrado, pedidos directos.
              El dueño cocina, nosotros le hicimos la web.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {['React', 'Tailwind', 'WhatsApp API'].map(t => (
                <span key={t} className="text-[10px] font-medium bg-white/10 text-white/80 px-3 py-1 rounded-full border border-white/15">
                  {t}
                </span>
              ))}
            </div>
            <Link
              to="/#contacto"
              className="inline-block mt-6 bg-[var(--accent)] text-black text-sm font-semibold px-7 py-3 rounded-full hover:bg-white transition-colors duration-200"
            >
              Quiero un proyecto así
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="https://guayafood.vercel.app/" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black shadow-2xl group cursor-pointer">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-300 z-10 rounded-2xl" />
              <video autoPlay muted loop playsInline className="w-full h-auto block">
                <source src="/hero-demo.mp4" type="video/mp4" />
              </video>
            </a>
            <div className="absolute -bottom-4 left-10 right-10 h-8 rounded-full bg-black/40 blur-xl" />
          </motion.div>
        </Container>
      </section>

      {/* Desafío */}
      <section className="py-10 md:py-12 bg-[var(--surface)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Desafío</span>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mt-3">El problema</h2>
            <p className="text-[var(--text-muted)] mt-3 text-sm leading-relaxed font-light">
              Guayafood vendía solo por Instagram. Los pedidos llegaban por mensaje directo, se perdían en la bandeja
              de entrada y no había forma de llevar un registro ordenado. La dueña pasaba más tiempo organizando
              pedidos que cocinando. Necesitaban una página web simple pero funcional que permita a los clientes
              ver el menú, hacer un pedido y pagar sin intermedio humano.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Solución */}
      <section className="py-10 md:py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Solución</span>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mt-3">Lo que hicimos</h2>
            <ul className="mt-4 space-y-3">
              {[
                'Diseñamos una landing apetitosa con fotos reales de los platos',
                'Integramos WhatsApp Business API para recibir pedidos directos',
                'Pusimos el menú completo con precios actualizados',
                'Optimizamos la carga para que entre rápido incluso con poca señal',
                'Configuramos analytics para saber qué platos se ven más',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-white/75 text-sm leading-snug">
                  <span className="text-[var(--accent)] font-bold shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </section>

      {/* Resultados */}
      <section className="py-10 md:py-12 bg-[var(--surface)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Resultados</span>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mt-3">Lo que logramos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { n: '100%', label: 'Pedidos sin intervención humana' },
                { n: '×3', label: 'Más consultas que antes' },
                { n: '24/7', label: 'La web nunca cierra' },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-4 border border-[var(--border)] rounded-xl bg-[var(--bg)]"
                >
                  <p className="text-[var(--accent)] text-2xl font-extrabold">{m.n}</p>
                  <p className="text-[var(--text-muted)] text-xs mt-1">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Testimonio */}
      <section className="py-10 md:py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto p-4 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-center"
          >
            <span className="text-[var(--accent)] text-2xl font-serif leading-none opacity-50">"</span>
            <p className="text-white/80 text-sm leading-relaxed font-light italic mt-2">
              Sin problemas, excelente servicio.
            </p>
            <div className="mt-3 pt-2.5 border-t border-[var(--border)]">
              <p className="font-bold text-sm text-white">Maria</p>
              <p className="text-[var(--text-muted)] text-xs mt-0.5">Dueña de Guayafood</p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-12 bg-[var(--surface)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold">¿Tu negocio puede ser el próximo?</h2>
            <p className="text-[var(--text-muted)] mt-3 text-sm font-light">
              Contanos tu idea y te mostramos cómo podemos ayudarte.
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
