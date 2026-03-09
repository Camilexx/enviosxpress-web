import { Truck, DollarSign, Package, ArrowRight, Check, Sparkles } from 'lucide-react'

export default function Servicios() {
    const services = [
        {
            title: 'COURIER NACIONAL',
            icon: Truck,
            desc: 'Llega a clientes en todo el país sin complicaciones. Entregas rápidas y seguras para negocios y personas.',
            features: [
                'Llega a más clientes (24 provincias)',
                'Ahorra tiempo: Recogemos a domicilio',
                'Cero estrés con seguro incluido'
            ],
            isHighlight: false,
        },
        {
            title: 'E-COMMERCE COD',
            badge: 'MÁS SOLICITADO',
            icon: DollarSign,
            desc: 'Aumenta tus ventas ofreciendo pago al recibir. Entregamos el paquete, cobramos y te depositamos rápido.',
            features: [
                'Recibe tu dinero en 24-48 horas',
                'Reduce drásticamente devoluciones',
                'Soporte real y rápido por WhatsApp'
            ],
            isHighlight: true,
        },
        {
            title: 'CARGA EMPRESARIAL',
            icon: Package,
            desc: 'Mueve grandes volúmenes de mercadería de forma segura y rentable con tarifas especiales para negocios.',
            features: [
                'Tu mercadería llega siempre intacta',
                'Ahorra dinero en envíos frecuentes',
                'Asesor personal asignado a tu cuenta'
            ],
            isHighlight: false,
        }
    ]

    return (
        <section id="servicios" className="section bg-white border-t border-gray-100 relative overflow-hidden" aria-label="Nuestros servicios">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none opacity-50" />

            <div className="container-swiss relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 lg:mb-32 gap-10 animate-in gpu-accel">
                    <div className="max-w-3xl">
                        <div className="inline-block border border-brand/20 glass-brand text-brand font-black text-[10px] uppercase tracking-[0.4em] px-6 py-2.5 mb-8 rounded-full shadow-sm">
                            Servicios de Crecimiento
                        </div>
                        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-black italic tracking-tighter uppercase mb-8 leading-[0.85]">
                            Soluciones a <br />
                            <span className="text-metallic-brand">Tu Medida</span>
                        </h2>
                        <p className="text-gray-500 font-medium leading-relaxed text-lg max-w-2xl">
                            Elegimos la logística adecuada para que tú solo te preocupes por vender más. Desde paquetes pequeños hasta carga pesada, lo hacemos simple y seguro.
                        </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 text-gray-300 font-black text-[10px] tracking-[0.5em] vertical-rl rotate-180 select-none pb-2">
                        GROWTH PARTNERS
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 items-stretch">
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        const isMain = service.isHighlight;

                        return (
                            <div
                                key={i}
                                className={`p-10 lg:p-14 relative group transition-all duration-700 flex flex-col h-full animate-in gpu-accel ${isMain
                                    ? 'bg-black text-white shadow-[0_40px_90px_-20px_rgba(114,47,55,0.5)] lg:scale-110 z-10 rounded-[2rem] border border-brand/20'
                                    : 'bg-white border border-gray-100 text-black hover:border-brand/30 hover:shadow-2xl hover:-translate-y-4 rounded-[2rem]'
                                    }`}
                                style={{ animationDelay: `${i * 0.15}s` }}
                            >
                                {/* Floating Badge for highlight */}
                                {service.badge && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand text-white font-black text-[9px] uppercase tracking-[0.4em] px-6 py-2.5 shadow-2xl shadow-brand/50 rounded-full flex items-center gap-2 group-hover:scale-110 transition-transform whitespace-nowrap">
                                        <Sparkles size={12} className="animate-pulse" /> {service.badge}
                                    </div>
                                )}

                                <div className={`mb-12 inline-flex p-5 rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 shadow-sm ${isMain
                                    ? 'bg-brand border-brand text-white shadow-[0_15px_30px_rgba(114,47,55,0.4)]'
                                    : 'bg-gray-50 border-gray-100 text-brand group-hover:border-brand/30 group-hover:bg-brand/5'
                                    }`}>
                                    <Icon size={36} strokeWidth={2.5} />
                                </div>

                                <h3 className={`text-3xl font-black mb-6 tracking-tighter italic uppercase ${isMain ? 'text-white' : 'text-black'}`}>
                                    {service.title}
                                </h3>
                                <p className={`text-base font-medium mb-12 leading-relaxed ${isMain ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {service.desc}
                                </p>

                                <ul className="space-y-5 mb-14 flex-grow">
                                    {service.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-4 group/item">
                                            <div className={`mt-1 shrink-0 rounded-full p-1 transition-transform group-hover/item:scale-125 ${isMain ? 'bg-brand/20 text-brand' : 'bg-brand/10 text-brand'}`}>
                                                <Check size={14} strokeWidth={4} />
                                            </div>
                                            <span className={`text-[11px] font-black uppercase tracking-widest leading-snug transition-colors ${isMain ? 'text-gray-300 group-hover/item:text-white' : 'text-gray-600 group-hover/item:text-black'}`}>
                                                {f}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#cotizador"
                                    className={`mt-auto w-full flex items-center justify-between px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 group/btn rounded-xl ${isMain
                                        ? 'bg-brand text-white hover:bg-white hover:text-black shadow-[0_20px_40px_-5px_rgba(114,47,55,0.5)]'
                                        : 'bg-black text-white hover:bg-brand hover:shadow-xl'
                                        }`}
                                >
                                    <span>COTIZAR SERVICIO</span>
                                    <ArrowRight size={18} className="transition-transform duration-500 group-hover/btn:translate-x-2" />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
