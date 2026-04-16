import { useState } from 'react'
import { Phone, Mail, Clock, ArrowRight, Loader2 } from 'lucide-react'

export default function CTAFinal() {
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [tipo, setTipo] = useState('')
    const [sending, setSending] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSending(true)

        // Simulate brief delay then open WhatsApp
        setTimeout(() => {
            let text = `SOLICITUD DE CONTACTO CORPORATIVO\n\n`
            text += `CLIENTE: ${nombre}\n`
            text += `TELÉFONO: ${telefono}\n`
            text += `PERFIL: ${tipo}\n`
            const encoded = encodeURIComponent(text)
            window.open(`https://wa.me/593967489002?text=${encoded}`, '_blank')
            setSending(false)
        }, 500)
    }

    return (
        <section id="contacto" className="section bg-black text-white overflow-hidden" aria-label="Contacto y registro">
            <div className="container-swiss relative">
                {/* Decorative accent */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/10 rounded-full blur-3xl" aria-hidden="true" />

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                    {/* Copy Section */}
                    <div className="animate-in">
                        <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">Empieza a Enviar Hoy</div>
                        <h2 className="text-3xl lg:text-4xl font-black mb-8 leading-[0.9] tracking-tighter">
                            Simplifica tu <br /> Logística Hoy
                        </h2>
                        <p className="text-gray-400 font-medium mb-10 max-w-md leading-relaxed text-base">
                            Únete a los emprendedores y empresas que ya confían sus entregas en nosotros.
                            Sin contratos forzosos. Date de alta y comienza a enviar de inmediato.
                        </p>

                        <div className="space-y-5">
                            {[
                                { icon: <Phone size={16} />, text: '+593 96 748 9002', label: 'Contacto Directo' },
                                { icon: <Mail size={16} />, text: 'enviosexpress.uio@gmail.com', label: 'Cotizaciones' },
                                { icon: <Clock size={16} />, text: '08:00 — 18:00', label: 'Atención Inmediata' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-5">
                                    <div className="text-brand p-2.5 bg-white/5 rounded-full" aria-hidden="true">{item.icon}</div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-0.5">{item.label}</div>
                                        <div className="text-sm font-bold">{item.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 lg:p-12 animate-in shadow-2xl hover-lift" style={{ animationDelay: '0.2s' }}>
                        <div className="mb-8">
                            <h3 className="text-black font-black text-xl tracking-tight mb-2 uppercase">Solicitar Información</h3>
                            <div className="w-10 h-[3px] bg-brand" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="cta-nombre" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                                    Nombre de Empresa / Personal
                                </label>
                                <input
                                    id="cta-nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                    className="w-full bg-gray-50 border-b-2 border-gray-200 p-3.5 font-bold text-black focus:border-brand outline-none transition-colors duration-200"
                                    placeholder="¿Cómo te llamas?"
                                    autoComplete="name"
                                />
                            </div>
                            <div>
                                <label htmlFor="cta-telefono" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                                    WhatsApp de Contacto
                                </label>
                                <input
                                    id="cta-telefono"
                                    type="tel"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    required
                                    className="w-full bg-gray-50 border-b-2 border-gray-200 p-3.5 font-bold text-black focus:border-brand outline-none transition-colors duration-200"
                                    placeholder="Tu mejor número de contacto"
                                    autoComplete="tel"
                                />
                            </div>
                            <div>
                                <label htmlFor="cta-perfil" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                                    ¿A qué te dedicas?
                                </label>
                                <select
                                    id="cta-perfil"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    required
                                    className="w-full bg-gray-50 border-b-2 border-gray-200 p-3.5 font-bold text-black focus:border-brand outline-none transition-colors duration-200 cursor-pointer"
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Emprendedor/E-commerce">Emprendedor / Tienda Online</option>
                                    <option value="Empresa Corporativa">Empresa Grande</option>
                                    <option value="Importador/Mayorista">Importador / Mayorista</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="cta-ciudad" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                                        Ciudad Base
                                    </label>
                                    <input
                                        id="cta-ciudad"
                                        type="text"
                                        placeholder="Ej: Quito"
                                        required
                                        className="w-full bg-gray-50 border-b-2 border-gray-200 p-3.5 font-bold text-black focus:border-brand outline-none transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cta-volumen" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                                        Envíos por Mes
                                    </label>
                                    <select
                                        id="cta-volumen"
                                        required
                                        className="w-full bg-gray-50 border-b-2 border-gray-200 p-3.5 font-bold text-black focus:border-brand outline-none transition-colors duration-200 cursor-pointer"
                                    >
                                        <option value="">Aproximado</option>
                                        <option value="1-50">Menos de 50</option>
                                        <option value="51-200">Entre 50 y 200</option>
                                        <option value="200+">Más de 200</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={sending}
                                className="btn-primary btn-shine-effect w-full py-5 flex justify-between items-center px-8 group cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                            >
                                <span className="font-black text-xs uppercase tracking-widest">
                                    {sending ? 'Redirigiendo a WhatsApp...' : 'Quiero Empezar a Enviar'}
                                </span>
                                {sending ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
