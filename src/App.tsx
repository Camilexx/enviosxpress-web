import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogosEmpresas from './components/LogosEmpresas'
import SocialProof from './components/SocialProof'
import TrustBanner from './components/TrustBanner'
import Servicios from './components/Servicios'
import Cotizador from './components/Cotizador'
import ComoFunciona from './components/ComoFunciona'
import Cobertura from './components/Cobertura'
import Testimonios from './components/Testimonios'
import Beneficios from './components/Beneficios'
import CTAFinal from './components/CTAFinal'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ServiciosPage from './pages/ServiciosPage'
import CoberturaPage from './pages/CoberturaPage'
import ComoFuncionaPage from './pages/ComoFuncionaPage'
import CotizadorPage from './pages/CotizadorPage'

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    const setupObserver = () => {
      const elements = document.querySelectorAll('.animate-in:not(.is-revealed)')
      elements.forEach(el => observer.observe(el))
    }

    setupObserver()
    const timer = setTimeout(setupObserver, 100)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  useScrollReveal()
  return <>{children}</>
}

function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <TrustBanner />
      <Cotizador />
      <Servicios />
      <ComoFunciona />
      <Cobertura />
      <Beneficios />
      <SocialProof />
      <Testimonios />
      <LogosEmpresas />
      <CTAFinal />
    </PageWrapper>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<PageWrapper><ServiciosPage /></PageWrapper>} />
        <Route path="/cobertura" element={<PageWrapper><CoberturaPage /></PageWrapper>} />
        <Route path="/como-funciona" element={<PageWrapper><ComoFuncionaPage /></PageWrapper>} />
        <Route path="/cotizador" element={<PageWrapper><CotizadorPage /></PageWrapper>} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </BrowserRouter>
  )
}

export default App
