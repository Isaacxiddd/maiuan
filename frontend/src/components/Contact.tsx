import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { z } from 'zod'
import Container from './Container'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL as string
const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER as string
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hola%20maiuan%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios`

const schema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  rubro: z.string().min(2, 'Contanos tu rubro'),
  message: z.string().min(10, 'Contanos un poco más'),
})

type FormData = z.infer<typeof schema>

const inputClass = [
  'w-full',
  'bg-[#1a1a1a]',
  'border border-white/15',
  'rounded-xl',
  'px-4 py-3',
  'text-white text-sm',
  'placeholder:text-white/30',
  'hover:border-white/35',
  'focus:outline-none',
  'focus:border-[var(--accent)]/60',
  'focus:bg-[#1f1f1f]',
  'transition-colors duration-200',
].join(' ')

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: standardSchemaResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          email: CONTACT_EMAIL,
          from_name: data.name,
          rubro: data.rubro,
          message: data.message,
        }),
      })
      if (res.ok) { setStatus('ok'); reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="py-10 md:py-12">
      <Container>
        <div style={{ maxWidth: '36rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase">Contacto</span>
            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-extrabold mt-3">Empecemos.</h2>
            <p className="text-[var(--text-muted)] mt-3 text-base font-light">
              Contanos tu negocio y te respondemos en menos de 24&nbsp;horas.
            </p>
          </motion.div>

          {status === 'ok' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 border border-[var(--accent)]/20 rounded-2xl bg-[var(--accent)]/[0.03]"
            >
              <p className="text-2xl mb-3">✓</p>
              <p className="text-lg font-bold">¡Mensaje enviado!</p>
              <p className="text-[var(--text-muted)] mt-2 text-sm">Te contactamos pronto.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
              noValidate
            >
              <div>
                <input {...register('name')} placeholder="Tu nombre" className={inputClass} />
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register('email')} type="email" placeholder="Tu email" className={inputClass} />
                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>}
              </div>
              <div>
                <input {...register('rubro')} placeholder="Tu rubro o negocio" className={inputClass} />
                {errors.rubro && <p className="text-red-400 text-xs mt-1 ml-1">{errors.rubro.message}</p>}
              </div>
              <div>
                <textarea
                  {...register('message')}
                  placeholder="¿Qué necesitás?"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message.message}</p>}
              </div>
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status === 'loading' ? {} : { scale: 1.02 }}
                whileTap={status === 'loading' ? {} : { scale: 0.98 }}
                className="mt-1 bg-[var(--accent)] text-black text-sm font-bold py-3 rounded-full hover:bg-white transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                    Enviando...
                  </span>
                ) : 'Enviar mensaje'}
              </motion.button>
              {status === 'error' && (
                <p className="text-red-400 text-center text-xs mt-1">
                  Algo salió mal.{" "}
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
                    Escribinos por WhatsApp
                  </a>.
                </p>
              )}
            </motion.form>
          )}

          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribime por WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 border border-white/20 text-white/80 text-xs px-4 py-2 rounded-full hover:border-white/40 hover:text-white transition-colors duration-200"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 6L12 13 2 6M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/>
              </svg>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
