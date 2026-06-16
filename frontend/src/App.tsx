import BgTexture from './components/BgTexture'
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
      <BgTexture />
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
