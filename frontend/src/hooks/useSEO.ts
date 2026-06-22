import { useEffect } from 'react'

const baseUrl = 'https://maiuan.com'

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'maiuan · Landing pages que convierten',
    description: 'maiuan — Landing pages que convierten visitantes en clientes. Diseñamos tu presencia digital en Buenos Aires.',
  },
  '/servicios': {
    title: 'Planes de landing pages · maiuan',
    description: 'Elegí el plan ideal para tu negocio: Inicial, Crecimiento o Sistema. Landing pages profesionales desde $150.000.',
  },
  '/que-hacemos': {
    title: '¿Qué hace maiuan? · Agencia de landing pages',
    description: 'Diagnosticamos, diseñamos y publicamos tu presencia digital. Sin tecnología de más, sin promesas vacías.',
  },
  '/trabajos': {
    title: 'Casos de éxito · maiuan',
    description: 'Conocé los proyectos que ya convertimos. Landing pages reales para negocios reales.',
  },
  '/contacto': {
    title: 'Contacto · maiuan',
    description: 'Escribinos para arrancar tu proyecto. Respondemos en menos de 24 horas.',
  },
  '/faq': {
    title: 'Preguntas frecuentes · maiuan',
    description: 'Resolvé tus dudas sobre landing pages, precios, plazos y proceso de trabajo.',
  },
}

export function useSEO(pathname: string) {
  useEffect(() => {
    const meta = routeMeta[pathname] || routeMeta['/']

    document.title = meta.title

    let descEl = document.querySelector('meta[name="description"]')
    if (descEl) {
      descEl.setAttribute('content', meta.description)
    } else {
      const el = document.createElement('meta')
      el.name = 'description'
      el.content = meta.description
      document.head.appendChild(el)
    }

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${baseUrl}${pathname === '/' ? '' : pathname}`)
  }, [pathname])
}
