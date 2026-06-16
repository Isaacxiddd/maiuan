import { lazy, Suspense } from 'react'
import BgTexture from './components/BgTexture'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Insight from './components/Insight'
import Solution from './components/Solution'
import WhatsAppButton from './components/WhatsAppButton'

const Services = lazy(() => import('./components/Services'))
const Process = lazy(() => import('./components/Process'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

const SectionFallback = () => <div className="h-24" />

export default function App() {
  return (
    <main className="min-h-screen">
      <BgTexture />
      <Navbar />
      <Hero />
      <Insight />
      <Solution />
      <Suspense fallback={<SectionFallback />}><Services /></Suspense>
      <Suspense fallback={<SectionFallback />}><Process /></Suspense>
      <Suspense fallback={<SectionFallback />}><Portfolio /></Suspense>
      <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
      <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      <Suspense fallback={null}><Footer /></Suspense>
      <WhatsAppButton />
    </main>
  )
}
