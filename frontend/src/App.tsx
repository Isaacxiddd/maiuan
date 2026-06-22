import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Animation from './pages/Animation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/animation" element={<Animation />} />
      </Routes>
    </BrowserRouter>
  )
}
