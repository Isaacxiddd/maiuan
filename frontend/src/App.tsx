import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'

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

export default function App() {
  return (
    <BrowserRouter>
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
