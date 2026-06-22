import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Container from './Container'

const faqs = [
  {
    q: '¿Cuánto cuesta una página web?',
    a: 'Depende de lo que necesites. Nuestro plan inicial arranca desde $150.000 para una landing page profesional. Si necesitas más páginas, funcionalidades personalizadas o integraciones, te armo un presupuesto a medida. Agendá una llamada de 30 minutos y te digo exactamente cuánto sale lo tuyo.',
  },
  {
    q: '¿Cuánto tiempo lleva tener el sitio listo?',
    a: 'Una landing page la tenemos lista en 2 semanas. Sitios más complejos pueden llevar entre 3 y 4 semanas. Te doy fechas concretas desde el día 1 y cumplimos.',
  },
  {
    q: '¿Necesito tener dominio y hosting?',
    a: 'No. Nosotros nos encargamos de todo: dominio, hosting, configuración técnica y publicación. Te llegás a preocupar solo de recibir consultas.',
  },
  {
    q: '¿Qué pasa si no me gusta el diseño?',
    a: 'Primero hacemos un prototipo interactivo antes de escribir código. Lo ves en desktop y celular, lo ajustamos hasta que quede justo como querés. Recién ahí arrancamos el desarrollo.',
  },
  {
    q: '¿Mi sitio va a aparecer en Google?',
    a: 'Sí. Todos nuestros sitios se construyen con SEO técnico desde el vamos: etiquetas, estructura, velocidad de carga y datos estructurados. En el plan Crecimiento además incluimos configuración de Google Search Console y reportes.',
  },
  {
    q: '¿Ofrecen mantenimiento después de entregar?',
    a: 'Sí. El primer mes después del lanzamiento estoy al lado tuyo para ajustar lo que haga falta. Después ofrecemos planes de mantenimiento mensual si querés seguir actualizando contenido, agregando secciones o mejorando el SEO.',
  },
  {
    q: '¿Cómo sé si necesito una landing o un sitio completo?',
    a: 'Si tenés un negocio con un solo servicio o producto, una landing alcanza y sobra. Si tenés varias áreas, un blog, casos de éxito o querés captar clientes desde diferentes frentes, te conviene un sitio multicuenta. En la llamada de brief te ayudo a decidir.',
  },
  {
    q: '¿Cómo empiezo?',
    a: 'Escribime por WhatsApp o completá el formulario de contacto. Coordinamos una llamada de 30 minutos, sin compromiso, y te cuento exactamente cómo sería tu proyecto.',
  },
]

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left group cursor-pointer"
      >
        <span className={`text-sm font-medium transition-colors duration-200 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`text-lg shrink-0 ml-4 ${isOpen ? 'text-[var(--accent)]' : 'text-white/30'}`}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="text-sm text-[var(--text-muted)] leading-relaxed pb-4 pr-8 max-w-prose">
          {a}
        </p>
      </motion.div>
    </div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-6 md:py-8">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <span className="text-[var(--accent)] text-[10px] font-semibold tracking-[0.2em] uppercase">FAQ</span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold mt-2">
            Preguntas frecuentes
          </h2>
          <p className="text-[var(--text-muted)] mt-2 text-sm font-light max-w-lg mx-auto">
            Todo lo que necesitás saber antes de dar el paso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
