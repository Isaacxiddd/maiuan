import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import { useSEO } from './hooks/useSEO'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'maiuan',
  url: 'https://maiuan.com',
  sameAs: [
    'https://instagram.com/maiuan.ar',
    'https://linkedin.com/company/maiuan',
  ],
}

function SEOByRoute() {
  const { pathname } = useLocation()
  useSEO(pathname)
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <SEOByRoute />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/servicios" element={<Landing />} />
        <Route path="/que-hacemos" element={<Landing />} />
        <Route path="/trabajos" element={<Landing />} />
        <Route path="/contacto" element={<Landing />} />
        <Route path="/faq" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
