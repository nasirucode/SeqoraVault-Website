import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { Preloader } from './components/Preloader'
import { ContactPage } from './pages/ContactPage'
import { LandingPage } from './pages/LandingPage'
import { PricingPage } from './pages/PricingPage'

function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash && hash.length > 1) {
      const id = hash.slice(1)
      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
        })
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <Preloader>
      <ScrollToTopOnRoute />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Preloader>
  )
}
