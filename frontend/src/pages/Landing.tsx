import { lazy, Suspense, useEffect, useRef } from 'react'
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

function scrollToWithRetry(sectionId: string) {
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

function useScrollSpy() {
  const navigate = useNavigate()
  const location = useLocation()
  const visitedRef = useRef(new Set<string>())
  const activeRef = useRef('')
  const pathRef = useRef(location.pathname)
  pathRef.current = location.pathname

  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubScroll = scrollY.on('change', (latest: number) => {
      if (latest < NAV_H + 10 && activeRef.current !== 'hero') {
        activeRef.current = 'hero'
        const cur = pathRef.current
        if (cur !== '/') {
          if (!visitedRef.current.has('hero')) {
            visitedRef.current.add('hero')
            navigate('/', { replace: true })
          } else {
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
            if (!visitedRef.current.has(id)) {
              visitedRef.current.add(id)
              navigate(path)
            } else {
              navigate(path, { replace: true })
            }
          }
        }
      },
      { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' },
    )

    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
    elements.forEach(el => el && observer.observe(el))

    const initialSection = pathToSection[location.pathname]
    if (initialSection) {
      scrollToWithRetry(initialSection)
    }

    return () => {
      unsubScroll()
      observer.disconnect()
    }
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
        <FAQ />
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
