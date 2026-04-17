import { Check } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import Cotizador from '../components/Cotizador'

const WHY_US = [
    {
        icon: '⚡',
        title: 'Tarifa Inmediata',
        desc: 'Precio exacto en segundos sin formularios adicionales ni esperas.',
    },
    {
        icon: '🛡️',
        title: 'Sin Sorpresas',
        desc: 'El precio que ves es el que pagas. Cero costos ocultos garantizados.',
    },
    {
        icon: '📦',
        title: '5 kg Incluidos',
        desc: 'Tarifa plana nacional con 5 kg de peso base incluidos en el precio.',
    },
    {
        icon: '🗺️',
        title: '25% Norte',
        desc: 'Descuento automático en rutas Zona Norte sin código ni formulario.',
    },
]

const FEATURES = [
    'Recolección a domicilio coordinada',
    'Entrega puerta a puerta en todo Ecuador',
    'Confirmación de entrega por WhatsApp',
    'Seguro de carga opcional (1% valor declarado)',
    'Servicio Contra Entrega (COD) disponible',
    'Soporte corporativo de lunes a sábado',
]

export default function CotizadorPage() {
    return (
        <main className="bg-black min-h-screen">
            <PageHero
                badge="Cotizador Oficial Inteligente"
                title="Cotiza Tu"
                highlight="Envío Ahora"
                subtitle="Tarifas fijas con 5 kg incluidos. Descuento automático del 25% en Zona Norte y seguro opcional para tu carga."
            />

            {/* Stats rápidas */}
            <section className="bg-[#0a0a0a] border-b border-white/5 py-8">
                <div className="container-swiss">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { n: '24-48h', label: 'Entrega Nacional' },
                            { n: '90+', label: 'Ciudades Cubiertas' },
                            { n: '25%', label: 'Descuento Norte' },
                            { n: '24', label: 'Provincias Activas' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="text-center animate-in"
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <div className="text-2xl lg:text-3xl font-black italic tracking-tighter text-white mb-1">
                                    {stat.n}
                                </div>
                                <div className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-500">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cotizador principal — reutilizado del homepage */}
            <div className="animate-in">
                <Cotizador />
            </div>

            {/* Por qué cotizar con nosotros */}
            <section className="bg-black border-t border-white/10 py-20 lg:py-24">
                <div className="container-swiss">
                    <div className="mb-12 animate-in">
                        <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">
                            Sin letra pequeña
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase text-white">
                            ¿Por qué <span className="text-brand">Cotizar</span> con nosotros?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {WHY_US.map((item, i) => (
                            <div
                                key={i}
                                className="group bg-[#0a0a0a] border border-white/8 p-8 hover:border-brand/40 hover:bg-white/[0.02] hover:-translate-y-1 transition-all duration-500 animate-in"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="text-3xl mb-5">{item.icon}</div>
                                <h3 className="text-sm font-black uppercase tracking-tight text-white mb-3 group-hover:text-brand transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Feature list */}
                    <div className="grid md:grid-cols-2 gap-4 animate-in">
                        {FEATURES.map((feat, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-400">
                                <div className="bg-brand rounded-full p-1 shrink-0">
                                    <Check size={10} color="white" strokeWidth={4} />
                                </div>
                                {feat}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
