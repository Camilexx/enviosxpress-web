import { Truck, DollarSign, Package, ArrowRight, Check, Sparkles, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'

const SERVICIOS = [
    {
        title: 'Courier Nacional',
        tagline: 'Conectamos Ecuador de punta a punta',
        icon: Truck,
        desc: 'Llega a clientes en todo el país sin complicaciones. Entregas rápidas y seguras para negocios y personas con cobertura total en las 24 provincias.',
        features: [
            'Cobertura en las 24 provincias del Ecuador',
            'Recolección a domicilio coordinada (pickup)',
            'Entrega puerta a puerta garantizada',
            'Notificación de estado por WhatsApp',
            'Seguro básico de mercadería incluido',
            'Tiempos: 24h Sierra / 48h Costa y Oriente',
        ],
        tiempo: '24-48 horas',
        precio: 'Desde $4.50',
        isHighlight: false,
        badge: null,
    },
    {
        title: 'E-Commerce COD',
        tagline: 'Cobra al entregar — sin riesgo para ti',
        icon: DollarSign,
        desc: 'Aumenta tus ventas ofreciendo pago al recibir. Entregamos el paquete, cobramos el dinero al cliente y te lo depositamos rápido y sin fricción.',
        features: [
            'Cobro contraentrega en efectivo',
            'Liquidación en 24-48 horas hábiles',
            'Dashboard de seguimiento de recaudos',
            'Soporte WhatsApp Business dedicado',
            'Gestión de intentos de entrega fallidos',
            'Tasa de devolución <3% garantizada',
        ],
        tiempo: '24-48 horas',
        precio: 'Tarifa preferencial COD',
        isHighlight: true,
        badge: 'MÁS SOLICITADO',
    },
    {
        title: 'Carga Empresarial',
        tagline: 'Volumen empresarial con precisión corporativa',
        icon: Package,
        desc: 'Mueve grandes volúmenes de mercadería de forma segura y rentable. Rutas dedicadas, tarifas por volumen y account manager asignado a tu cuenta.',
        features: [
            'Manejo de pesos y dimensiones sin límite',
            'Tarifas preferenciales por volumen',
            'Ruta dedicada para tu operación',
            'Reportes mensuales de KPIs logísticos',
            'Carga consolidada multi-origen',
            'Account Manager corporativo asignado',
        ],
        tiempo: 'Según ruta y volumen',
        precio: 'Tarifa corporativa a medida',
        isHighlight: false,
        badge: null,
    },
]

export default function ServiciosPage() {
    return (
        <main className="bg-black min-h-screen">
            <PageHero
                badge="Portfolio Logístico"
                title="Nuestros"
                highlight="Servicios"
                subtitle="Tres pilares logísticos diseñados para escalar tu operación comercial sin importar el tamaño de tu negocio."
            />

            {/* Service Cards */}
            <section className="py-20 lg:py-28">
                <div className="container-swiss">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
                        {SERVICIOS.map((s, i) => {
                            const Icon = s.icon
                            return (
                                <article
                                    key={i}
                                    className={`relative flex flex-col p-10 lg:p-12 border transition-all duration-700 group animate-in rounded-[2rem] overflow-hidden ${
                                        s.isHighlight
                                            ? 'bg-[#0a0a0a] border-brand/30 shadow-[0_40px_80px_-20px_rgba(114,47,55,0.4)] lg:scale-105 z-10'
                                            : 'bg-[#0a0a0a] border-white/8 hover:border-brand/30 hover:shadow-2xl hover:-translate-y-2'
                                    }`}
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                    aria-label={s.title}
                                >
                                    {/* Top accent line on hover */}
                                    <div
                                        className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand to-transparent transition-opacity duration-500 ${
                                            s.isHighlight ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                        }`}
                                        aria-hidden="true"
                                    />

                                    {/* Badge */}
                                    {s.badge && (
                                        <div className="absolute -top-0 right-8 bg-brand text-white font-black text-[9px] uppercase tracking-[0.3em] px-5 py-2 rounded-b-xl flex items-center gap-2 shadow-xl">
                                            <Sparkles size={11} aria-hidden="true" />
                                            {s.badge}
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`mb-8 inline-flex p-5 rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 ${
                                            s.isHighlight
                                                ? 'bg-brand border-brand/50 shadow-[0_15px_30px_rgba(114,47,55,0.4)]'
                                                : 'bg-white/5 border-white/10 group-hover:border-brand/30 group-hover:bg-brand/10'
                                        }`}
                                    >
                                        <Icon size={32} className="text-white" strokeWidth={2.5} aria-hidden="true" />
                                    </div>

                                    {/* Copy */}
                                    <div className="text-brand font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                                        {s.tagline}
                                    </div>
                                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-4 group-hover:text-brand transition-colors duration-300">
                                        {s.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">
                                        {s.desc}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8 flex-grow">
                                        {s.features.map((f, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <div className="mt-0.5 shrink-0 rounded-full bg-brand/20 p-0.5">
                                                    <Check size={11} className="text-brand" strokeWidth={4} aria-hidden="true" />
                                                </div>
                                                <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 leading-snug group-hover:text-gray-300 transition-colors">
                                                    {f}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Meta */}
                                    <div className="border-t border-white/8 pt-6 mb-6">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                            <span>{s.tiempo}</span>
                                            <span className="text-brand">{s.precio}</span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        to="/cotizador"
                                        className={`mt-auto w-full flex items-center justify-between px-6 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 group/btn rounded-xl ${
                                            s.isHighlight
                                                ? 'bg-brand text-white hover:bg-white hover:text-black'
                                                : 'bg-white/5 text-white border border-white/10 hover:bg-brand hover:border-brand'
                                        }`}
                                    >
                                        <span>Cotizar Servicio</span>
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-300 group-hover/btn:translate-x-1"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Comparativa rápida */}
            <section className="bg-[#0a0a0a] border-y border-white/8 py-16 lg:py-20">
                <div className="container-swiss">
                    <div className="mb-10 animate-in">
                        <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">
                            Comparativa Rápida
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase text-white">
                            ¿Cuál es el <span className="text-brand">Indicado</span> para Ti?
                        </h2>
                    </div>
                    <div className="overflow-x-auto animate-in">
                        <table className="w-full border border-white/8 text-sm">
                            <thead>
                                <tr className="bg-brand text-white">
                                    <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest">
                                        Característica
                                    </th>
                                    <th className="text-center p-4 text-[10px] font-black uppercase tracking-widest">
                                        Courier
                                    </th>
                                    <th className="text-center p-4 text-[10px] font-black uppercase tracking-widest">
                                        COD
                                    </th>
                                    <th className="text-center p-4 text-[10px] font-black uppercase tracking-widest">
                                        B2B
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { f: 'Tiempo de Entrega', c: '24-48h', cod: '24-48h', b: 'Programado' },
                                    { f: 'Cobro a Destinatario', c: '—', cod: '✓ Incluido', b: 'Opcional' },
                                    { f: 'Pickup a Domicilio', c: '✓', cod: '✓', b: '✓' },
                                    { f: 'Seguro de Carga', c: 'Opcional', cod: 'Opcional', b: 'Incluido' },
                                    { f: 'Cobertura', c: '24 provincias', cod: '24 provincias', b: '24 provincias' },
                                    { f: 'Panel de Control', c: '✓', cod: '✓', b: '✓ Avanzado' },
                                ].map((row, i) => (
                                    <tr
                                        key={i}
                                        className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                                    >
                                        <td className="p-4 text-[11px] font-black uppercase tracking-wider text-gray-500">
                                            {row.f}
                                        </td>
                                        <td className="p-4 text-center text-white font-bold">{row.c}</td>
                                        <td className="p-4 text-center text-brand font-bold">{row.cod}</td>
                                        <td className="p-4 text-center text-white font-bold">{row.b}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 lg:py-24 text-center">
                <div className="container-swiss animate-in">
                    <h2 className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase text-white mb-6">
                        ¿Listo para <span className="text-brand">Empezar?</span>
                    </h2>
                    <p className="text-gray-400 font-medium mb-10 max-w-lg mx-auto">
                        Habla con nuestro equipo y recibe una propuesta personalizada para tu volumen de envíos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/593967489002"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center gap-2 py-5 px-10"
                        >
                            <Phone size={16} aria-hidden="true" />
                            Contactar por WhatsApp
                        </a>
                        <Link
                            to="/cotizador"
                            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white py-5 px-10 text-[10px] font-black uppercase tracking-[0.3em] hover:border-brand hover:text-brand transition-all duration-300"
                        >
                            Cotizar Ahora
                            <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
