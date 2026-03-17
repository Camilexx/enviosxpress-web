import { useEffect } from 'react'
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
import FAQ from './components/FAQ'
import CTAFinal from './components/CTAFinal'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

function App() {
  // Global Scroll Reveal Initialization
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    // Re-observe after initial render + small delay for dynamic content
    const setupObserver = () => {
      const elements = document.querySelectorAll('.animate-in:not(.is-revealed)')
      elements.forEach(el => observer.observe(el))
    }

    setupObserver()
    // Re-run after a short delay to catch dynamically rendered elements
    const timer = setTimeout(setupObserver, 100)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <LogosEmpresas />
      <SocialProof />
      <TrustBanner />
      <Servicios />
      <Beneficios />
      <Cotizador />
      <ComoFunciona />
      <Cobertura />
      <Testimonios />
      <FAQ />
      <CTAFinal />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default App
