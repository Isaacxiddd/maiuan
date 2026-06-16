#!/usr/bin/env python3
"""
Script de construcción orquestado para maiuan.
Ejecutado via MCP shell_command - genera el monorepo completo.
"""
import subprocess, sys, json
from pathlib import Path

ROOT = Path(__file__).parent
FRONTEND = ROOT / "frontend"
BACKEND = ROOT / "backend"

def run(cmd, cwd=None):
    print(f">> {cmd}")
    result = subprocess.run(cmd, shell=True, cwd=cwd or ROOT, capture_output=True, text=True)
    if result.stdout: print(result.stdout)
    if result.stderr: print(result.stderr, file=sys.stderr)
    return result.returncode == 0

def write(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"   wrote {path.relative_to(ROOT)}")

# ─── FRONTEND ────────────────────────────────────────────────────────────────

def scaffold_frontend():
    print("\n=== FRONTEND: Vite + React + TS ===")
    if not FRONTEND.exists():
        run("pnpm create vite@latest frontend --template react-ts")
    run("pnpm install", cwd=FRONTEND)
    run("pnpm add framer-motion react-hook-form zod @hookform/resolvers", cwd=FRONTEND)
    run("pnpm add -D tailwindcss @tailwindcss/vite", cwd=FRONTEND)

def write_tailwind_config():
    write(FRONTEND / "src" / "index.css", """\
@import "tailwindcss";

:root {
  --color-brand: #0a0a0a;
  --color-accent: #e8ff00;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: #0a0a0a; color: #f5f5f5; font-family: 'Inter', sans-serif; }
""")

    write(FRONTEND / "vite.config.ts", """\
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 }
})
""")

def write_frontend_components():
    src = FRONTEND / "src"

    # ── Navbar ──
    write(src / "components" / "Navbar.tsx", """\
import { motion } from 'framer-motion'

export default function Navbar() {
  const links = ['servicios', 'proceso', 'portfolio', 'contacto']
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
    >
      <a href="#hero" className="text-xl font-bold tracking-tight text-white">maiuan</a>
      <div className="hidden md:flex gap-8">
        {links.map(l => (
          <a key={l} href={`#${l}`} className="text-sm text-white/60 hover:text-white transition-colors capitalize">{l}</a>
        ))}
      </div>
      <a
        href="https://instagram.com/maiuan.ba"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-white/60 hover:text-[#e8ff00] transition-colors"
      >
        @maiuan.ba
      </a>
    </motion.nav>
  )
}
""")

    # ── Hero ──
    write(src / "components" / "Hero.tsx", """\
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-8 md:px-20 pt-24">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[#e8ff00] text-sm tracking-widest uppercase mb-6"
      >
        Buenos Aires · Landing pages que convierten
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-5xl md:text-8xl font-bold leading-none tracking-tight mb-8"
      >
        Tu negocio<br />
        <span className="text-white/20">merece</span><br />
        más consultas.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/50 text-lg md:text-xl max-w-xl mb-12"
      >
        Diseñamos la presencia digital que convierte visitantes en clientes.
        Sin tecnología de más, sin promesas vacías.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex gap-4 flex-wrap"
      >
        <a
          href="#contacto"
          className="bg-[#e8ff00] text-black font-semibold px-8 py-4 rounded-full hover:bg-white transition-colors"
        >
          Hablemos
        </a>
        <a
          href="#servicios"
          className="border border-white/20 text-white px-8 py-4 rounded-full hover:border-white/60 transition-colors"
        >
          Ver servicios
        </a>
      </motion.div>
    </section>
  )
}
""")

    # ── Insight (ex "Problema" — enfocado en entender al cliente) ──
    write(src / "components" / "Insight.tsx", """\
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const signals = [
  { icon: '⚡', text: 'Tu web tarda más de 3 segundos en cargar' },
  { icon: '📱', text: 'No se ve bien en el celular' },
  { icon: '🔇', text: 'No tiene un botón de contacto visible' },
  { icon: '🌫️', text: 'No queda claro qué ofrecés ni para quién' },
  { icon: '📉', text: 'No tiene prueba social ni ejemplos reales' },
  { icon: '🚪', text: 'El visitante entra y sale sin hacer nada' },
]

function SignalCard({ icon, text, i }: { icon: string; text: string; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="flex items-start gap-4 p-6 border border-white/10 rounded-2xl hover:border-[#e8ff00]/30 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <p className="text-white/70">{text}</p>
    </motion.div>
  )
}

export default function Insight() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <section id="insight" className="py-32 px-8 md:px-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="max-w-2xl mb-16"
      >
        <span className="text-[#e8ff00] text-sm tracking-widest uppercase">Lo que vemos todos los días</span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
          ¿Tu web está<br />trabajando para vos?
        </h2>
        <p className="text-white/50 mt-6 text-lg">
          La mayoría de los negocios tienen presencia digital pero no generan consultas.
          No es culpa del rubro ni del mercado.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.map((s, i) => <SignalCard key={i} {...s} i={i} />)}
      </div>
    </section>
  )
}
""")

    # ── Solution ──
    write(src / "components" / "Solution.tsx", """\
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const deliverables = [
  'Diseño orientado a que el visitante tome acción',
  'Copy claro que habla el idioma de tu cliente',
  'Formulario de contacto y WhatsApp siempre visibles',
  'Carga rápida y experiencia mobile perfecta',
  'SEO técnico básico desde el día uno',
  'Analytics para medir qué funciona',
]

export default function Solution() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="solucion" className="py-32 px-8 md:px-20 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[#e8ff00] text-sm tracking-widest uppercase">La diferencia</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            Una landing que<br />trabaja mientras<br />vos trabajás.
          </h2>
          <p className="text-white/50 mt-6 text-lg">
            No vendemos diseño. Construimos el sistema que convierte
            tu tráfico en consultas reales.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4"
        >
          {deliverables.map((d, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="flex items-start gap-3 text-white/80"
            >
              <span className="text-[#e8ff00] mt-1">✓</span> {d}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
""")

    # ── Services ──
    write(src / "components" / "Services.tsx", """\
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const plans = [
  {
    name: 'Inicial',
    desc: 'Para arrancar rápido con una presencia que convierte.',
    items: ['Landing de una página', 'Copy orientado a conversión', 'Formulario + WhatsApp', 'Responsive', 'Deploy incluido'],
    cta: 'Empezar',
    highlight: false,
  },
  {
    name: 'Crecimiento',
    desc: 'Para negocios que quieren más alcance y seguimiento.',
    items: ['Todo lo del plan Inicial', 'SEO técnico', 'Analytics configurado', 'Integración con CRM', 'Soporte 30 días'],
    cta: 'El más elegido',
    highlight: true,
  },
  {
    name: 'Sistema',
    desc: 'Para negocios que quieren una máquina de captación.',
    items: ['Todo lo anterior', 'Múltiples páginas', 'Automatizaciones', 'Blog SEO', 'Soporte continuo'],
    cta: 'Hablemos',
    highlight: false,
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="servicios" className="py-32 px-8 md:px-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-20"
      >
        <span className="text-[#e8ff00] text-sm tracking-widest uppercase">Servicios</span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4">Elegí tu punto de entrada.</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15 }}
            className={`relative p-8 rounded-3xl border flex flex-col gap-6 ${
              p.highlight
                ? 'border-[#e8ff00] bg-[#e8ff00]/5'
                : 'border-white/10 hover:border-white/30 transition-colors'
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-8 bg-[#e8ff00] text-black text-xs font-bold px-4 py-1 rounded-full">
                Más popular
              </span>
            )}
            <div>
              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className="text-white/50 mt-2 text-sm">{p.desc}</p>
            </div>
            <ul className="space-y-3 flex-1">
              {p.items.map(item => (
                <li key={item} className="flex gap-2 text-white/70 text-sm">
                  <span className="text-[#e8ff00]">✓</span> {item}
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              className={`text-center py-3 rounded-full font-semibold transition-colors ${
                p.highlight
                  ? 'bg-[#e8ff00] text-black hover:bg-white'
                  : 'border border-white/20 hover:border-white/60'
              }`}
            >
              {p.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
""")

    # ── Process ──
    write(src / "components" / "Process.tsx", """\
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { n: '01', title: 'Brief', desc: 'Entendemos tu negocio, tu cliente y tu objetivo real.' },
  { n: '02', title: 'Estructura', desc: 'Definimos las secciones, el mensaje y los llamados a la acción.' },
  { n: '03', title: 'Diseño', desc: 'Prototipamos la visual con foco en conversión y mobile.' },
  { n: '04', title: 'Desarrollo', desc: 'Construimos rápido, con calidad y rendimiento.' },
  { n: '05', title: 'Revisión', desc: 'Ajustamos copy, diseño y validamos en todos los dispositivos.' },
  { n: '06', title: 'Publicación', desc: 'Deploy, dominio, analytics. Tu landing lista para captar.' },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="proceso" className="py-32 px-8 md:px-20 bg-white/[0.02]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="max-w-2xl mb-20"
      >
        <span className="text-[#e8ff00] text-sm tracking-widest uppercase">Proceso</span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4">Cómo trabajamos.</h2>
        <p className="text-white/50 mt-4 text-lg">Sin vueltas. Sin sorpresas. Entrega en tiempo y forma.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            className="p-6 border border-white/10 rounded-2xl hover:border-white/20 transition-colors"
          >
            <span className="text-5xl font-bold text-white/10">{s.n}</span>
            <h3 className="text-xl font-bold mt-4">{s.title}</h3>
            <p className="text-white/50 mt-2 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
""")

    # ── Portfolio ──
    write(src / "components" / "Portfolio.tsx", """\
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    rubro: 'Odontología',
    name: 'Clínica Dental Norte',
    desc: 'Landing orientada a reservas de primera consulta. WhatsApp + formulario.',
    tags: ['React', 'Tailwind', 'NestJS'],
    color: '#1a1a2e',
  },
  {
    rubro: 'Arquitectura',
    name: 'Estudio Bauwerk',
    desc: 'Portfolio + captación de proyectos. Diseño minimalista premium.',
    tags: ['React', 'Framer Motion'],
    color: '#1a2e1a',
  },
  {
    rubro: 'Kinesiología',
    name: 'Centro KinesioBA',
    desc: 'Conversión de tráfico orgánico en turnos. SEO básico incluido.',
    tags: ['React', 'SEO', 'Analytics'],
    color: '#2e1a1a',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="portfolio" className="py-32 px-8 md:px-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-20"
      >
        <span className="text-[#e8ff00] text-sm tracking-widest uppercase">Portfolio</span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4">Algunos trabajos.</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15 }}
            className="group rounded-3xl border border-white/10 overflow-hidden hover:border-white/30 transition-colors"
          >
            <div className="h-48 flex items-center justify-center text-4xl" style={{ background: p.color }}>
              🖥️
            </div>
            <div className="p-6">
              <span className="text-[#e8ff00] text-xs tracking-widest uppercase">{p.rubro}</span>
              <h3 className="font-bold text-lg mt-1">{p.name}</h3>
              <p className="text-white/50 text-sm mt-2">{p.desc}</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {p.tags.map(t => (
                  <span key={t} className="text-xs border border-white/20 px-3 py-1 rounded-full text-white/60">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
""")

    # ── Testimonials ──
    write(src / "components" / "Testimonials.tsx", """\
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    name: 'Valentina R.',
    role: 'Nutricionista · CABA',
    text: 'Antes tenía Instagram pero nadie me escribía. Con la landing empecé a recibir consultas todos los días.',
  },
  {
    name: 'Marcos L.',
    role: 'Arquitecto · Palermo',
    text: 'El proceso fue claro y rápido. En dos semanas tenía la web publicada y ya me llegaron dos proyectos.',
  },
  {
    name: 'Clínica Dental Norte',
    role: 'Odontología · Belgrano',
    text: 'La inversión se recuperó en el primer mes. Ahora el 60% de nuestras reservas vienen de la landing.',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="testimonios" className="py-32 px-8 md:px-20 bg-white/[0.02]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-20"
      >
        <span className="text-[#e8ff00] text-sm tracking-widest uppercase">Resultados</span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4">Lo que dicen.</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15 }}
            className="p-8 border border-white/10 rounded-3xl flex flex-col gap-4"
          >
            <p className="text-white/80 text-lg leading-relaxed">"{t.text}"</p>
            <div className="mt-auto pt-4 border-t border-white/10">
              <p className="font-semibold">{t.name}</p>
              <p className="text-white/40 text-sm">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
""")

    # ── Contact ──
    write(src / "components" / "Contact.tsx", """\
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  rubro: z.string().min(2, 'Contanos tu rubro'),
  message: z.string().min(10, 'Contanos un poco más'),
})

type FormData = z.infer<typeof schema>

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
      const res = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) { setStatus('ok'); reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const field = "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#e8ff00]/50 transition-colors"

  return (
    <section id="contacto" className="py-32 px-8 md:px-20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[#e8ff00] text-sm tracking-widest uppercase">Contacto</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">Empecemos.</h2>
          <p className="text-white/50 mt-4 text-lg">
            Contanos tu negocio y te respondemos en menos de 24 horas.
          </p>
        </motion.div>

        {status === 'ok' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 border border-[#e8ff00]/30 rounded-3xl"
          >
            <p className="text-4xl mb-4">✓</p>
            <p className="text-xl font-bold">¡Mensaje enviado!</p>
            <p className="text-white/50 mt-2">Te contactamos pronto.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <input {...register('name')} placeholder="Tu nombre" className={field} />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input {...register('email')} placeholder="Tu email" className={field} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input {...register('rubro')} placeholder="Tu rubro o negocio" className={field} />
              {errors.rubro && <p className="text-red-400 text-xs mt-1">{errors.rubro.message}</p>}
            </div>
            <div>
              <textarea {...register('message')} placeholder="¿Qué necesitás?" rows={5} className={field} />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#e8ff00] text-black font-bold py-4 rounded-full hover:bg-white transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-center text-sm">Algo salió mal. Escribinos por WhatsApp.</p>
            )}
          </motion.form>
        )}
      </div>
    </section>
  )
}
""")

    # ── WhatsApp Button ──
    write(src / "components" / "WhatsAppButton.tsx", """\
import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5491100000000?text=Hola%20maiuan%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-black/40"
      title="Escribinos por WhatsApp"
    >
      <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  )
}
""")

    # ── Footer ──
    write(src / "components" / "Footer.tsx", """\
export default function Footer() {
  return (
    <footer className="py-12 px-8 md:px-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xl font-bold text-white">maiuan</span>
        <p className="text-white/30 text-sm">© {new Date().getFullYear()} maiuan. Buenos Aires.</p>
        <a
          href="https://instagram.com/maiuan.ba"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-[#e8ff00] transition-colors text-sm"
        >
          @maiuan.ba
        </a>
      </div>
    </footer>
  )
}
""")

    # ── App.tsx ──
    write(src / "App.tsx", """\
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Insight from './components/Insight'
import Solution from './components/Solution'
import Services from './components/Services'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import WhatsAppButton from './components/WhatsAppButton'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Insight />
      <Solution />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
""")

    print("Frontend components escritos.")

# ─── BACKEND ─────────────────────────────────────────────────────────────────

def scaffold_backend():
    print("\n=== BACKEND: NestJS ===")
    if not BACKEND.exists():
        run("pnpm dlx @nestjs/cli new backend --package-manager pnpm --skip-git")

def write_backend_modules():
    src = BACKEND / "src"

    write(src / "contact" / "contact.dto.ts", """\
import { IsEmail, IsString, MinLength } from 'class-validator'

export class ContactDto {
  @IsString() @MinLength(2) name: string
  @IsEmail() email: string
  @IsString() @MinLength(2) rubro: string
  @IsString() @MinLength(10) message: string
}
""")

    write(src / "contact" / "contact.service.ts", """\
import { Injectable, Logger } from '@nestjs/common'
import { ContactDto } from './contact.dto'

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name)

  async send(dto: ContactDto): Promise<{ ok: boolean }> {
    this.logger.log(`Nuevo contacto: ${dto.name} <${dto.email}> [${dto.rubro}]`)
    // TODO: configurar mailer con credenciales en .env
    return { ok: true }
  }
}
""")

    write(src / "contact" / "contact.controller.ts", """\
import { Body, Controller, Post, HttpCode } from '@nestjs/common'
import { ContactService } from './contact.service'
import { ContactDto } from './contact.dto'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(200)
  send(@Body() dto: ContactDto) {
    return this.contactService.send(dto)
  }
}
""")

    write(src / "contact" / "contact.module.ts", """\
import { Module } from '@nestjs/common'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
""")

    write(src / "app.module.ts", """\
import { Module } from '@nestjs/common'
import { ContactModule } from './contact/contact.module'

@Module({ imports: [ContactModule] })
export class AppModule {}
""")

    write(src / "main.ts", """\
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: 'http://localhost:5173' })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(3000)
  console.log('maiuan backend running on http://localhost:3000')
}
bootstrap()
""")

    print("Backend modules escritos.")

# ─── PACKAGE.JSON RAÍZ ───────────────────────────────────────────────────────

def write_root_config():
    write(ROOT / "package.json", """\
{
  "name": "maiuan",
  "private": true,
  "scripts": {
    "dev:frontend": "pnpm --filter frontend dev",
    "dev:backend": "pnpm --filter backend start:dev",
    "dev": "concurrently \\"pnpm dev:frontend\\" \\"pnpm dev:backend\\"",
    "build:frontend": "pnpm --filter frontend build"
  },
  "devDependencies": {
    "concurrently": "^9.0.0"
  }
}
""")
    write(ROOT / ".gitignore", """\
node_modules/
dist/
.env
.env.local
*.log
""")
    print("Root config escrita.")

# ─── MAIN ────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("=== maiuan build script ===\n")
    write_root_config()
    scaffold_frontend()
    write_tailwind_config()
    write_frontend_components()
    scaffold_backend()
    write_backend_modules()
    print("\n=== Build completo. ===")
    print("Frontend: cd frontend && pnpm dev")
    print("Backend:  cd backend && pnpm start:dev")
