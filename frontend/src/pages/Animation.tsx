import { lazy, Suspense } from 'react'
import Navbar from '../components/animation/Navbar'
import Hero from '../components/animation/Hero'

const BgTexture = lazy(() => import('../components/animation/BgTexture'))

export default function Animation() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={null}><BgTexture /></Suspense>
      <Navbar />
      <Hero />
    </main>
  )
}
