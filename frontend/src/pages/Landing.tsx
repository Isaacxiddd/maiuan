import { useEffect, useRef } from 'react'
import { lazy, Suspense } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useScroll } from 'framer-motion'
import Hero from '../components/Hero'
import Insight from '../components/Insight'
import Solution from '../components/Solution'
import FAQ from '../components/FAQ'
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
  '/faq': 'faq',
}

const sectionToPath: Record<string, string> = {
  'servicios': '/servicios',
  'proceso': '/que-hacemos',
  'portfolio': '/trabajos',
  'contacto': '/contacto',
  'faq': '/faq',
}

const sectionIds = ['servicios', 'proceso', 'portfolio', 'contacto', 'faq']
const NAV_H = 72

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'instant' })
    return
  }
  const timer = setInterval(() => {
    const el2 = document.getElementById(sectionId)
    if (el2) {
      el2.scrollIntoView({ behavior: 'instant' })
      clearInterval(timer)
    }
  }, 100)
  setTimeout(() => clearInterval(timer), 5000)
}

export default function Landing() {
  const location = useLocation()
  const navigate = useNavigate()
  const pathRef = useRef(location.pathname)
  const activeRef = useRef('')
  const { scrollY } = useScroll()

  // keep pathRef in sync without re-render cycles
  pathRef.current = location.pathname

  // scroll to section on nav click, back/forward, or direct URL
  // but NOT when observer already handled it (scroll-based)
  useEffect(() => {
    const sectionId = pathToSection[location.pathname]
    if (sectionId) {
      if (activeRef.current !== sectionId) {
        scrollToSection(sectionId)
        activeRef.current = sectionId
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
      activeRef.current = ''
    }
  }, [location.pathname, location.state])

  // set up observers once — never re-create
  useEffect(() => {
    const unsubScroll = scrollY.on('change', (latest: number) => {
      if (latest < NAV_H + 10) {
        if (activeRef.current !== 'hero') {
          activeRef.current = 'hero'
          if (pathRef.current !== '/') {
            navigate('/', { replace: true })
          }
        }
      }
    })

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (!id || id === activeRef.current) continue
            activeRef.current = id
            const path = sectionToPath[id]
            if (!path || path === pathRef.current) continue
            navigate(path, { replace: true })
          }
        }
      },
      { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' },
    )

    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
    elements.forEach(el => el && observer.observe(el))

    return () => {
      unsubScroll()
      observer.disconnect()
    }
  }, [])

  return (
    <main className="min-h-screen">
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
        <FAQ />
        <Footer />
      </Suspense>
      <WhatsAppButton />
    </main>
  )
}
