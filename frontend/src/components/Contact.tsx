import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Container from './Container'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL as string
const WHATSAPP = '+5491123952146'

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

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
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
                  Algo salió mal. Escribinos por WhatsApp.
                </p>
              )}
            </motion.form>
          )}

          <div className="mt-6 text-center text-xs text-[var(--text-muted)] flex flex-wrap justify-center gap-x-6 gap-y-1">
            <a href={`tel:${WHATSAPP}`} className="hover:text-white transition-colors">{WHATSAPP}</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">{CONTACT_EMAIL}</a>
          </div>
        </div>
      </Container>
    </section>
  )
}
