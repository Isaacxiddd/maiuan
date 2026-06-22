import { lazy, Suspense, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import Insight from '../components/Insight'
import Solution from '../components/Solution'
import WhatsAppButton from '../components/WhatsAppButton'

const BgTexture = lazy(() => import('../components/BgTexture'))
const Services = lazy(() => import('../components/Services'))
const Process = lazy(() => import('../components/Process'))
const Portfolio = lazy(() => import('../components/Portfolio'))
const Testimonials = lazy(() => import('../components/Testimonials'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

const pathToSection: Record<string, string> = {
  '/servicios': 'servicios',
  '/que-hacemos': 'proceso',
  '/trabajos': 'portfolio',
  '/contacto': 'contacto',
}

const sectionToPath: Record<string, string> = {
  'servicios': '/servicios',
  'proceso': '/que-hacemos',
  'portfolio': '/trabajos',
  'contacto': '/contacto',
}

const sectionIds = ['servicios', 'proceso', 'portfolio', 'contacto']

function useScrollSpy() {
  const navigate = useNavigate()
  const location = useLocation()
  const activeRef = useRef('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id && id !== activeRef.current) {
              activeRef.current = id
              const path = sectionToPath[id]
              if (path) {
                navigate(path, { replace: true })
              }
            }
          }
        }
      },
      { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' },
    )

    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
    elements.forEach(el => el && observer.observe(el))

    // Initial: go to section if URL has a path
    const initialSection = pathToSection[location.pathname]
    if (initialSection) {
      const el = document.getElementById(initialSection)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'instant' }), 0)
      }
    }

    return () => observer.disconnect()
  }, [navigate, location.pathname])

  return null
}

export default function Landing() {
  return (
    <main className="min-h-screen">
      <ScrollSpy />
      <Suspense fallback={null}><BgTexture /></Suspense>
      <Hero />
      <Insight />
      <Solution />
      <Suspense fallback={null}>
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
      </Suspense>
      <WhatsAppButton />
    </main>
  )
}

function ScrollSpy() {
  useScrollSpy()
  return null
}
