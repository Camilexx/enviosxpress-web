import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const location = useLocation()

    const links = [
        { to: '/', label: 'INICIO' },
        { to: '/servicios', label: 'SERVICIOS' },
        { to: '/cobertura', label: 'COBERTURA' },
        { to: '/como-funciona', label: 'CÓMO FUNCIONA' },
        { to: '/cotizador', label: 'COTIZADOR' },
    ]

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-swiss ${scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}
                role="navigation"
                aria-label="Navegación principal"
            >
                {/* Thin Branding Top Border */}
                <div
                    className="absolute top-0 left-0 h-[3px] bg-brand transition-swiss"
                    style={{ width: scrolled ? '100%' : '40px' }}
                />

                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-swiss" aria-label="EnviosXpress - Ir al inicio">
                        <Logo height={scrolled ? 52 : 68} className="transition-all duration-300 transform origin-left" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {/* Primary Links */}
                        <div className="flex items-center gap-8">
                            {links.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`text-[10px] font-black tracking-[0.2em] transition-colors duration-200 uppercase cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-brand after:transition-all after:duration-200 hover:after:w-full ${location.pathname === link.to ? 'text-brand after:w-full' : 'text-black hover:text-brand after:w-0'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-6 border-l border-gray-200 pl-8 h-8">
                            <a href="#login" title="Acceso de clientes" className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-black hover:text-brand transition-colors duration-200 cursor-pointer">
                                <User size={14} />
                                INGRESAR
                            </a>
                            <Link to="/cotizador" className="btn-primary py-3 px-6 text-[9px] tracking-[0.2em] cursor-pointer">
                                COTIZAR
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-black transition-colors duration-200 active:scale-90 p-4 -mr-2 cursor-pointer flex items-center justify-center min-w-[48px] min-h-[48px]"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Abrir menú de navegación"
                        aria-expanded={mobileOpen}
                    >
                        <Menu size={32} />
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-y-0 right-0 z-[100] w-[85%] sm:w-[400px] bg-white shadow-2xl transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-label="Menú de navegación"
                aria-modal="true"
            >
                <div className="p-6 sm:p-10 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-12">
                        <Logo height={38} />
                        <button
                            className="text-black bg-gray-50 p-4 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer flex items-center justify-center min-w-[48px] min-h-[48px]"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Cerrar menú de navegación"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileOpen(false)}
                                className="text-3xl font-black tracking-tighter border-b border-gray-50 py-5 hover:pl-3 transition-all duration-300 hover:text-brand cursor-pointer flex items-center justify-between group"
                            >
                                {link.label}
                                <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand" />
                            </Link>
                        ))}

                        <div className="mt-8 flex flex-col gap-3">
                            <a
                                href="#login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-4 text-base font-black text-gray-500 hover:text-black transition-colors duration-200 py-4 px-2 cursor-pointer border border-gray-100 rounded-xl"
                            >
                                <div className="p-3 bg-gray-50 rounded-lg text-brand"><User size={22} /></div>
                                INGRESO CLIENTES
                            </a>
                            <Link
                                to="/cotizador"
                                onClick={() => setMobileOpen(false)}
                                className="btn-primary w-full justify-center mt-6 py-6 text-sm font-black tracking-[0.3em] cursor-pointer shadow-lg shadow-brand/20 active:scale-[0.98]"
                            >
                                COTIZAR AHORA <ArrowRight size={20} className="ml-3" />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-auto pt-10 text-center text-[10px] font-black tracking-[0.3em] text-gray-300 uppercase">
                        EnviosXpress — Smart Logistics Ecuador
                    </div>
                </div>
            </div>
        </>
    )
}
