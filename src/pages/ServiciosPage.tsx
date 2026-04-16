import { ArrowRight, Truck, DollarSign, Package, Check, Clock, Shield, Phone } from 'lucide-react'

const serviciosDetalle = [
    {
        title: 'COURIER NACIONAL',
        icon: Truck,
        tagline: 'Conectamos Ecuador de punta a punta',
        desc: 'Servicio de mensajería terrestre de alta frecuencia que cubre las 24 provincias del Ecuador. Ideal para e-commerce, pequeñas y medianas empresas que necesitan entregas confiables con tiempos definidos.',
        features: [
            'Cobertura total en las 24 provincias',
            'Recolección a domicilio coordinada (pickup)',
            'Clasificación automatizada en Hub central',
            'Entrega puerta a puerta garantizada',
            'Notificación de estado por WhatsApp',
            'Seguro básico de mercadería incluido',
        ],
        tiempo: '24-48 horas',
        precio: 'Desde $3.50',
        isHighlight: false,
    },
    {
        title: 'E-COMMERCE COD',
        icon: DollarSign,
        tagline: 'Cobra al entregar — sin riesgo para ti',
        desc: 'El servicio más solicitado por vendedores en redes sociales y marketplaces. Entregamos tu producto y cobramos el dinero al cliente final. Liquidación rápida, tasa de devolución mínima y soporte dedicado.',
        features: [
            'Cobro contraentrega (pago en efectivo)',
            'Liquidación en 24-48 horas hábiles',
            'Dashboard de seguimiento de recaudos',
            'Gestión de intentos de entrega fallidos',
            'Soporte por WhatsApp Business 24/7',
            'Tasas de devolución <3% garantizadas',
        ],
        tiempo: '24-48 horas',
        precio: 'Tarifa preferencial COD',
        isHighlight: true,
        badge: 'MÁS SOLICITADO',
    },
    {
        title: 'LOGÍSTICA B2B',
        icon: Package,
        tagline: 'Volumen empresarial con precisión corporativa',
        desc: 'Soluciones de transporte de carga para empresas que mueven grandes volúmenes. Contratos a medida, rutas dedicadas, consolidación de carga y gestión logística integral para distribuidoras, importadoras y grandes retailers.',
        features: [
            'Manejo especializado de inventarios',
            'Consolidación de carga multi-origen',
            'Tarifas preferenciales por volumen',
            'Ruta dedicada para tu empresa',
            'Reportes mensuales de KPIs logísticos',
            'Account manager corporativo asignado',
        ],
        tiempo: 'Según ruta y volumen',
        precio: 'Tarifa corporativa a medida',
        isHighlight: false,
    },
]

export default function ServiciosPage() {
    return (
        <main className="pt-24">
                {/* Hero pequeño */}
                <section className="bg-black text-white py-20 lg:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #722F37 0%, transparent 60%)' }} />
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                        <div className="inline-block border border-brand/40 bg-brand/10 text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-6 rounded-full">
                            Portfolio Logístico
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase mb-6 leading-[0.9]">
                            Nuestros <span className="text-brand">Servicios</span>
                        </h1>
                        <p className="text-gray-400 font-medium max-w-xl text-base leading-relaxed">
                            Tres pilares logísticos diseñados para escalar tu operación comercial
                            sin importar el tamaño de tu negocio.
                        </p>
                    </div>
                </section>

                {/* Cards detalladas */}
                <section className="bg-white py-20 lg:py-28">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
                            {serviciosDetalle.map((s, i) => {
                                const Icon = s.icon
                                return (
                                    <div
                                        key={i}
                                        className={`relative flex flex-col p-8 lg:p-12 border transition-all duration-500 ${s.isHighlight
                                            ? 'bg-black text-white border-brand/20 shadow-2xl shadow-brand/20 lg:scale-105'
                                            : 'bg-white border-gray-100 hover:border-brand/30 hover:shadow-xl'
                                        }`}
                                    >
                                        {s.badge && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white font-black text-[9px] uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-xl">
                                                {s.badge}
                                            </div>
                                        )}

                                        <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-8 ${s.isHighlight ? 'bg-brand text-white' : 'bg-brand/10 text-brand'}`}>
                                            <Icon size={26} strokeWidth={2.5} />
                                        </div>

                                        <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${s.isHighlight ? 'text-brand' : 'text-gray-400'}`}>
                                            {s.tagline}
                                        </div>
                                        <h2 className={`text-2xl font-black italic tracking-tighter uppercase mb-4 ${s.isHighlight ? 'text-white' : 'text-black'}`}>
                                            {s.title}
                                        </h2>
                                        <p className={`text-sm font-medium mb-8 leading-relaxed ${s.isHighlight ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {s.desc}
                                        </p>

                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {s.features.map((f, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <div className="mt-0.5 p-0.5 rounded-full bg-brand/20 text-brand flex-shrink-0">
                                                        <Check size={11} strokeWidth={4} />
                                                    </div>
                                                    <span className={`text-[11px] font-black uppercase tracking-widest leading-snug ${s.isHighlight ? 'text-gray-300' : 'text-gray-600'}`}>
                                                        {f}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className={`border-t pt-6 mb-6 ${s.isHighlight ? 'border-white/10' : 'border-gray-100'}`}>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={14} className={s.isHighlight ? 'text-brand' : 'text-gray-400'} />
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${s.isHighlight ? 'text-gray-300' : 'text-gray-500'}`}>
                                                        {s.tiempo}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Shield size={14} className={s.isHighlight ? 'text-brand' : 'text-gray-400'} />
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${s.isHighlight ? 'text-gray-300' : 'text-gray-500'}`}>
                                                        {s.precio}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <a
                                            href="/#cotizador"
                                            className={`w-full flex items-center justify-between px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${s.isHighlight
                                                ? 'bg-brand text-white hover:bg-white hover:text-black'
                                                : 'bg-black text-white hover:bg-brand'
                                            }`}
                                        >
                                            COTIZAR AHORA
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="bg-gray-50 border-t border-gray-100 py-16 lg:py-20">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 text-center">
                        <h2 className="text-2xl lg:text-4xl font-black italic tracking-tighter uppercase mb-4">
                            ¿No sabes qué servicio <span className="text-brand">necesitas?</span>
                        </h2>
                        <p className="text-gray-500 font-medium mb-8 max-w-md mx-auto text-sm">
                            Un asesor logístico te ayuda a elegir el plan correcto según tu volumen y ruta.
                        </p>
                        <a
                            href="https://wa.me/593967489002"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-brand text-white font-black text-[11px] uppercase tracking-widest px-10 py-5 hover:bg-black transition-colors duration-300"
                        >
                            <Phone size={18} /> HABLAR CON UN ASESOR
                        </a>
                    </div>
                </section>
        </main>
    )
}
