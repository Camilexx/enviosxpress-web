import { Instagram, Facebook, Phone, Mail, MapPin, Youtube } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5" role="contentinfo">
            <div className="container-swiss">
                <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <Logo white height={95} className="mb-10" />
                        <p className="text-gray-400 font-medium mb-8 leading-relaxed max-w-sm text-sm">
                            Infraestructura logística terrestre premium.
                            Conectando el mercado ecuatoriano con soluciones de alta eficiencia.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Facebook, label: 'Facebook', href: '#' },
                                { Icon: Instagram, label: 'Instagram', href: '#' },
                                { Icon: Youtube, label: 'YouTube', href: '#' },
                            ].map(({ Icon, label, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    className="p-3 border border-white/10 hover:bg-brand hover:border-brand transition-colors duration-200 cursor-pointer"
                                    aria-label={`Síguenos en ${label}`}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Solutions Links */}
                    <nav className="lg:col-span-2" aria-label="Enlaces de soluciones">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Soluciones</h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><a href="#servicios" className="hover:text-brand transition-colors duration-200 cursor-pointer">Courier Express</a></li>
                            <li><a href="#servicios" className="hover:text-brand transition-colors duration-200 cursor-pointer">Contraentrega COD</a></li>
                            <li><a href="#servicios" className="hover:text-brand transition-colors duration-200 cursor-pointer">Distribución B2B</a></li>
                            <li><a href="#servicios" className="hover:text-brand transition-colors duration-200 cursor-pointer">Carga Segura</a></li>
                        </ul>
                    </nav>

                    {/* Company Links */}
                    <nav className="lg:col-span-2" aria-label="Enlaces de empresa">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Empresa</h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><a href="#inicio" className="hover:text-brand transition-colors duration-200 cursor-pointer">Nosotros</a></li>
                            <li><a href="#cobertura" className="hover:text-brand transition-colors duration-200 cursor-pointer">Cobertura</a></li>
                            <li><a href="#cotizador" className="hover:text-brand transition-colors duration-200 cursor-pointer">Cotizador</a></li>
                            <li><a href="#contacto" className="hover:text-brand transition-colors duration-200 cursor-pointer">Contacto</a></li>
                        </ul>
                    </nav>

                    {/* Contact Info */}
                    <div className="lg:col-span-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Base de Operaciones</h4>
                        <address className="not-italic space-y-4">
                            <div className="flex gap-3 items-start">
                                <MapPin size={18} className="text-brand shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm font-medium">Quito, Ecuador — Centro Logístico Norte</span>
                            </div>
                            <div className="flex gap-3 items-start">
                                <Phone size={18} className="text-brand shrink-0 mt-0.5" aria-hidden="true" />
                                <a href="tel:+593987654321" className="text-sm font-medium hover:text-brand transition-colors duration-200 cursor-pointer">+593 9 8765 4321</a>
                            </div>
                            <div className="flex gap-3 items-start">
                                <Mail size={18} className="text-brand shrink-0 mt-0.5" aria-hidden="true" />
                                <a href="mailto:operaciones@enviosxpress.ec" className="text-sm font-medium hover:text-brand transition-colors duration-200 cursor-pointer">operaciones@enviosxpress.ec</a>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    <div className="order-2 md:order-1">
                        © {currentYear} ENVIOSXPRESS S.A. TODOS LOS DERECHOS RESERVADOS
                    </div>
                    <div className="flex gap-8 order-1 md:order-2">
                        <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">POLÍTICA DE PRIVACIDAD</a>
                        <a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">TÉRMINOS DE SERVICIO</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
