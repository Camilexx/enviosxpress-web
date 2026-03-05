import { Truck, DollarSign, Package, ArrowRight, Check } from 'lucide-react'

export default function Servicios() {
    const services = [
        {
            title: 'COURIER NACIONAL',
            icon: Truck,
            desc: 'Expande el alcance de tu negocio a nivel nacional con nuestra robusta red terrestre y entregas oportunas.',
            features: ['Cobertura total en 24 provincias', 'Recolección a domicilio coordinada', 'Seguridad total de tu mercadería'],
            isHighlight: false,
        },
        {
            title: 'E-COMMERCE COD',
            badge: 'MÁS SOLICITADO',
            icon: DollarSign,
            desc: 'Multiplica tus ventas con pago contraentrega. Nosotros nos encargamos del riesgo logístico y los cobros de tus productos.',
            features: ['Liquidación eficiente y confiable', 'Tasas mínimas de devolución', 'Asesoría y soporte por WhatsApp'],
            isHighlight: true,
        },
        {
            title: 'LOGÍSTICA B2B',
            icon: Package,
            desc: 'Soluciones de transporte de volumen para empresas que exigen capacidad, cuidado y precisión corporativa.',
            features: ['Manejo cuidadoso de inventarios', 'Consolidación de carga segura', 'Tarifas preferenciales por volumen'],
            isHighlight: false,
        }
    ]

    return (
        <section id="servicios" className="section bg-white border-t border-gray-100 relative" aria-label="Nuestros servicios">
            {/* Subtle background mesh */}
            <div className="absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container-swiss relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-6 animate-in is-revealed">
                    <div className="max-w-3xl">
                        <div className="inline-block border border-brand/20 bg-brand/5 text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-6 rounded-full shadow-sm">
                            Impulsa tu Negocio
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-black italic tracking-tighter uppercase mb-6 leading-[0.9]">
                            Soluciones <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-red-600">Especializadas</span>
                        </h2>
                        <p className="text-gray-500 font-medium leading-relaxed text-lg max-w-2xl">
                            Diseñamos la logística perfecta para que tú te enfoques en escalar ventas. Nosotros nos
                            encargamos de que tus productos lleguen de forma segura y veloz a todo el Ecuador.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        const isMain = service.isHighlight;

                        return (
                            <div
                                key={i}
                                className={`p-8 lg:p-10 relative group transition-all duration-500 flex flex-col h-full animate-in is-revealed ${isMain
                                        ? 'bg-black text-white shadow-[0_20px_50px_rgba(114,47,55,0.4)] lg:scale-105 border-b-4 border-brand z-10'
                                        : 'bg-gray-50 border border-gray-100 text-black hover:bg-white hover:border-black/20 hover:shadow-xl hover:-translate-y-2'
                                    }`}
                                style={{ animationDelay: `${i * 0.15}s` }}
                            >
                                {/* Watermark Icon */}
                                <Icon
                                    size={120}
                                    className={`absolute top-6 right-6 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none ${isMain ? 'text-white/5' : 'text-black/[0.03]'}`}
                                    strokeWidth={1}
                                />

                                {/* Badge for highlighted card */}
                                {service.badge && (
                                    <div className="absolute -top-4 left-8 bg-brand text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 shadow-lg shadow-brand/40 animate-pulse">
                                        {service.badge}
                                    </div>
                                )}

                                <div className={`mb-8 inline-flex p-4 rounded-full border transition-all duration-300 group-hover:scale-110 shadow-sm ${isMain
                                        ? 'bg-brand border-brand text-white shadow-[0_0_15px_rgba(114,47,55,0.5)]'
                                        : 'bg-white border-gray-200 text-brand group-hover:border-brand/40 group-hover:bg-brand/5'
                                    }`}>
                                    <Icon size={28} strokeWidth={2.5} />
                                </div>

                                <h3 className={`text-2xl font-black mb-4 tracking-tighter italic uppercase ${isMain ? 'text-white' : 'text-black'}`}>
                                    {service.title}
                                </h3>
                                <p className={`text-sm font-medium mb-10 leading-relaxed ${isMain ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {service.desc}
                                </p>

                                <ul className="space-y-4 mb-12 flex-grow">
                                    {service.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <div className={`mt-0.5 rounded-full p-0.5 ${isMain ? 'bg-white/10 text-brand' : 'bg-brand/10 text-brand'}`}>
                                                <Check size={12} strokeWidth={4} />
                                            </div>
                                            <span className={`text-xs font-bold uppercase tracking-widest leading-snug ${isMain ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {f}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#cotizador"
                                    className={`mt-auto w-full flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 group/btn ${isMain
                                            ? 'bg-brand text-white hover:bg-white hover:text-black border border-brand hover:border-white shadow-[0_0_20px_rgba(114,47,55,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]'
                                            : 'bg-white border border-black/20 text-black hover:bg-black hover:text-white'
                                        }`}
                                >
                                    SOLICITAR ASESORÍA
                                    <ArrowRight size={16} className={`transition-transform duration-300 group-hover/btn:translate-x-1 ${isMain ? 'text-current' : 'text-brand group-hover/btn:text-white'}`} />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
