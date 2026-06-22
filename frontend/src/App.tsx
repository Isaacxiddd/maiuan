import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Servicios from './pages/Servicios'
import QueHacemos from './pages/QueHacemos'
import Trabajos from './pages/Trabajos'
import TrabajoGuayafood from './pages/TrabajoGuayafood'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/que-hacemos" element={<QueHacemos />} />
        <Route path="/trabajos" element={<Trabajos />} />
        <Route path="/trabajos/guayafood" element={<TrabajoGuayafood />} />
      </Routes>
    </BrowserRouter>
  )
}
