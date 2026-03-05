import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, User, PackageSearch } from 'lucide-react'
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

    const links = [
        { href: '#inicio', label: 'INICIO' },
        { href: '#servicios', label: 'SERVICIOS' },
        { href: '#cotizador', label: 'COTIZADOR' },
        { href: '#cobertura', label: 'COBERTURA' },
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
                    <a href="#inicio" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-swiss" aria-label="EnviosXpress - Ir al inicio">
                        <Logo height={scrolled ? 52 : 68} className="transition-all duration-300 transform origin-left" />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {/* Primary Links */}
                        <div className="flex items-center gap-8">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-[10px] font-black tracking-[0.2em] text-black hover:text-brand transition-colors duration-200 uppercase cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand after:transition-all after:duration-200 hover:after:w-full"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-6 border-l border-gray-200 pl-8 h-8">
                            <a href="#rastreo" title="Rastreo de envíos" className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer">
                                <PackageSearch size={14} />
                                RASTREO
                            </a>
                            <a href="#login" title="Acceso de clientes" className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-black hover:text-brand transition-colors duration-200 cursor-pointer">
                                <User size={14} />
                                INGRESAR
                            </a>
                            <a href="#contacto" className="btn-primary py-3 px-6 text-[9px] tracking-[0.2em] cursor-pointer">
                                CONTACTO
                            </a>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-black transition-colors duration-200 active:scale-90 p-2 cursor-pointer"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Abrir menú de navegación"
                        aria-expanded={mobileOpen}
                    >
                        <Menu size={28} />
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
                className={`fixed inset-0 z-[100] bg-white transition-transform duration-400 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-label="Menú de navegación"
                aria-modal="true"
            >
                <div className="p-8 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-16">
                        <Logo height={42} />
                        <button
                            className="text-black bg-gray-50 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Cerrar menú de navegación"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-3xl font-black tracking-tighter border-b border-gray-50 pb-5 hover:pl-3 transition-all duration-200 hover:text-brand cursor-pointer"
                            >
                                {link.label}
                            </a>
                        ))}

                        <div className="mt-8 flex flex-col gap-4">
                            <a
                                href="#rastreo"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-4 text-lg font-black text-gray-400 hover:text-black transition-colors duration-200 p-2 cursor-pointer"
                            >
                                <PackageSearch size={22} /> Rastrear Envío
                            </a>
                            <a
                                href="#login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-4 text-lg font-black text-gray-400 hover:text-black transition-colors duration-200 p-2 cursor-pointer"
                            >
                                <User size={22} /> Ingreso Clientes
                            </a>
                            <a
                                href="#contacto"
                                onClick={() => setMobileOpen(false)}
                                className="btn-primary w-full justify-center mt-4 py-5 text-sm cursor-pointer"
                            >
                                CONTACTO <ArrowRight size={22} className="ml-2" />
                            </a>
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
