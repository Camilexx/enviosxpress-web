import { MapPin, ArrowRight, Zap, Clock } from 'lucide-react'

const zonas = [
    {
        nombre: 'Sierra Norte',
        provincias: ['Carchi', 'Imbabura', 'Pichincha'],
        tiempo: '24 horas',
        descuento: '25% OFF — Ruta Premium',
        destacado: true,
    },
    {
        nombre: 'Sierra Centro',
        provincias: ['Cotopaxi', 'Tungurahua', 'Chimborazo', 'Bolívar'],
        tiempo: '24 horas',
        descuento: null,
        destacado: false,
    },
    {
        nombre: 'Sierra Sur',
        provincias: ['Cañar', 'Azuay', 'Loja'],
        tiempo: '24-48 horas',
        descuento: null,
        destacado: false,
    },
    {
        nombre: 'Costa',
        provincias: ['Esmeraldas', 'Manabí', 'Guayas', 'Los Ríos', 'El Oro', 'Santa Elena'],
        tiempo: '24-48 horas',
        descuento: null,
        destacado: false,
    },
    {
        nombre: 'Costa Norte (Santo Domingo)',
        provincias: ['Santo Domingo de los Tsáchilas'],
        tiempo: '24 horas',
        descuento: null,
        destacado: false,
    },
    {
        nombre: 'Amazonia',
        provincias: ['Sucumbíos', 'Orellana', 'Napo', 'Pastaza', 'Morona Santiago', 'Zamora Chinchipe'],
        tiempo: '48-72 horas',
        descuento: null,
        destacado: false,
    },
    {
        nombre: 'Galápagos',
        provincias: ['Galápagos'],
        tiempo: 'Consultar',
        descuento: null,
        destacado: false,
    },
]

export default function CoberturaPage() {
    return (
        <main className="pt-24">
                {/* Hero */}
                <section className="bg-black text-white py-20 lg:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #722F37 0%, transparent 60%)' }} />
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                        <div className="inline-block border border-brand/40 bg-brand/10 text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-6 rounded-full">
                            Red Logística Nacional
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase mb-6 leading-[0.9]">
                            Cobertura <span className="text-brand">Ecuador</span>
                        </h1>
                        <p className="text-gray-400 font-medium max-w-xl text-base leading-relaxed">
                            24 provincias cubiertas. Rutas terrestres optimizadas con tiempos de entrega reales y garantizados.
                        </p>
                    </div>
                </section>

                {/* Zona Norte Highlight */}
                <section className="bg-brand py-12 lg:py-16">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="bg-white/10 p-4 rounded-xl">
                                    <Zap size={32} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-white/70 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Oferta Corporativa Activa</div>
                                    <h2 className="text-white font-black text-2xl lg:text-3xl italic tracking-tighter uppercase">
                                        Ruta Premium Zona Norte — 25% OFF
                                    </h2>
                                    <p className="text-white/80 text-sm font-medium mt-2">
                                        Quito → Tabacundo → Cayambe → Otavalo → Cotacachi → Atuntaqui → Ibarra
                                    </p>
                                </div>
                            </div>
                            <a
                                href="/#cotizador"
                                className="flex-shrink-0 flex items-center gap-3 bg-white text-brand font-black text-[11px] uppercase tracking-widest px-8 py-4 hover:bg-black hover:text-white transition-colors duration-300"
                            >
                                COTIZAR ZONA NORTE <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Zonas */}
                <section className="bg-white py-20 lg:py-28">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        <h2 className="text-2xl lg:text-4xl font-black italic tracking-tighter uppercase mb-12">
                            Zonas y <span className="text-brand">Tiempos de Entrega</span>
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {zonas.map((z, i) => (
                                <div
                                    key={i}
                                    className={`p-8 border transition-all duration-300 ${z.destacado
                                        ? 'bg-black text-white border-brand/30 shadow-xl shadow-brand/10'
                                        : 'bg-white border-gray-100 hover:border-brand/20 hover:shadow-lg'
                                    }`}
                                >
                                    <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${z.destacado ? 'text-brand' : 'text-gray-400'}`}>
                                        {z.descuento ?? 'Tarifa estándar'}
                                    </div>
                                    <h3 className={`text-xl font-black italic tracking-tighter uppercase mb-4 ${z.destacado ? 'text-white' : 'text-black'}`}>
                                        {z.nombre}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {z.provincias.map((p, j) => (
                                            <div key={j} className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${z.destacado ? 'bg-white/10 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
                                                <MapPin size={9} />
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-4 border-t ${z.destacado ? 'border-white/10 text-brand' : 'border-gray-100 text-gray-400'}`}>
                                        <Clock size={12} />
                                        Entrega: {z.tiempo}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-gray-50 border-t border-gray-100 py-16">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 text-center">
                        <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-4">
                            ¿Tu ciudad está cubierta?
                        </h2>
                        <p className="text-gray-500 font-medium mb-8 text-sm">
                            Cotiza tu envío en segundos — sin registro ni compromiso.
                        </p>
                        <a href="/#cotizador" className="inline-flex items-center gap-3 bg-brand text-white font-black text-[11px] uppercase tracking-widest px-10 py-5 hover:bg-black transition-colors duration-300">
                            COTIZAR AHORA <ArrowRight size={16} />
                        </a>
                    </div>
                </section>
        </main>
    )
}
