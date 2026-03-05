import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import TrustBanner from './components/TrustBanner'
import Servicios from './components/Servicios'
import Cotizador from './components/Cotizador'
import ComoFunciona from './components/ComoFunciona'
import Cobertura from './components/Cobertura'
import Testimonios from './components/Testimonios'
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

    const elements = document.querySelectorAll('.animate-in')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <TrustBanner />
      <Servicios />
      <Cotizador />
      <ComoFunciona />
      <Cobertura />
      <Testimonios />
      <CTAFinal />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default App
