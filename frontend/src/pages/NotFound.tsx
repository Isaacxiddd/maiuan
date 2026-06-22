import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[var(--accent)] text-[10px] font-semibold tracking-[0.2em] uppercase">Error 404</span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold mt-4 leading-tight">
            Página no encontrada
          </h1>
          <p className="text-[var(--text-muted)] mt-3 text-sm leading-relaxed">
            La página que buscás no existe o fue movida. Pero todavía podés encontrar lo que necesitás.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-8 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-full bg-[var(--accent)] text-black text-sm font-semibold hover:bg-white transition-colors duration-200 cursor-pointer"
            >
              Volver al inicio
            </button>
            <button
              onClick={() => navigate('/contacto')}
              className="px-6 py-2.5 rounded-full border border-white/15 text-white/70 text-sm font-medium hover:border-white/40 hover:text-white transition-all duration-200 cursor-pointer"
            >
              Contacto
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-white/[0.06]">
            <p className="text-[var(--text-muted)] text-xs mb-4">O explorá estas secciones:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: 'Servicios', path: '/servicios' },
                { label: '¿Qué hacemos?', path: '/que-hacemos' },
                { label: 'Trabajos', path: '/trabajos' },
                { label: 'FAQ', path: '/faq' },
              ].map(link => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="px-4 py-1.5 rounded-full bg-white/5 text-white/50 text-xs font-medium hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
