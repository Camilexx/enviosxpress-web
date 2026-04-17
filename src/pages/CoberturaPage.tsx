import { MapPin, ArrowRight, Zap, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'

const ZONAS = [
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
        nombre: 'Costa Norte',
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

const ALL_PROVINCES = [
    'Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi',
    'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas', 'Imbabura', 'Loja',
    'Los Ríos', 'Manabí', 'Morona Santiago', 'Napo', 'Orellana', 'Pastaza',
    'Pichincha', 'S. Elena', 'Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora',
]

export default function CoberturaPage() {
    return (
        <main className="bg-black min-h-screen">
            <PageHero
                badge="Red Logística Nacional"
                title="Cobertura"
                highlight="Ecuador"
                subtitle="24 provincias cubiertas. Rutas terrestres optimizadas con tiempos de entrega reales y garantizados a todo el territorio nacional."
            />

            {/* Stats strip */}
            <section className="bg-[#0a0a0a] border-b border-white/5 py-8">
                <div className="container-swiss">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { n: '24', label: 'Provincias Activas' },
                            { n: '90+', label: 'Ciudades Cubiertas' },
                            { n: '24-72h', label: 'Tiempo de Entrega' },
                            { n: '25%', label: 'Descuento Zona Norte' },
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

            {/* Zona Norte — Featured Banner */}
            <section className="border-b border-brand/20 animate-in">
                <div className="relative bg-[#0a0a0a] overflow-hidden">
                    {/* Glowing border */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand via-red-600 to-brand blur opacity-20 animate-pulse" />
                    </div>
                    <div
                        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                        aria-hidden="true"
                    />

                    <div className="container-swiss relative z-10 py-12 lg:py-16">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="bg-brand/20 border border-brand/30 p-4 rounded-2xl shrink-0">
                                    <Zap size={30} className="text-brand animate-pulse" aria-hidden="true" />
                                </div>
                                <div>
                                    <div className="text-brand font-black text-[10px] uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                                        Beneficio Corporativo Activo
                                    </div>
                                    <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase text-white mb-3">
                                        Ruta Premium — <span className="text-brand">Zona Norte 25% OFF</span>
                                    </h2>
                                    <div className="bg-white/5 border border-white/10 px-4 py-3 font-mono text-[10px] lg:text-xs text-white uppercase tracking-widest">
                                        Quito ➔ Tabacundo ➔ Cayambe ➔ Otavalo ➔ Cotacachi ➔ Atuntaqui ➔ Ibarra
                                    </div>
                                </div>
                            </div>
                            <Link
                                to="/cotizador"
                                className="shrink-0 btn-primary flex items-center gap-2 py-5 px-8 shadow-[0_0_30px_rgba(114,47,55,0.5)]"
                            >
                                Cotizar Zona Norte
                                <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Zona Grid */}
            <section className="py-20 lg:py-24">
                <div className="container-swiss">
                    <div className="mb-12 animate-in">
                        <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">
                            Zonas de Cobertura
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase text-white">
                            Tiempos de <span className="text-brand">Entrega</span> por Zona
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ZONAS.map((z, i) => (
                            <div
                                key={i}
                                className={`group p-8 border transition-all duration-500 animate-in rounded-2xl ${
                                    z.destacado
                                        ? 'bg-[#0a0a0a] border-brand/40 shadow-[0_20px_40px_rgba(114,47,55,0.15)]'
                                        : 'bg-[#0a0a0a] border-white/8 hover:border-brand/30 hover:-translate-y-1'
                                }`}
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-black uppercase tracking-wider text-white group-hover:text-brand transition-colors duration-300">
                                        {z.nombre}
                                    </h3>
                                    {z.descuento && (
                                        <span className="bg-brand text-white font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                                            {z.descuento}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {z.provincias.map((p, j) => (
                                        <div
                                            key={j}
                                            className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors ${
                                                z.destacado
                                                    ? 'bg-brand/15 border border-brand/30 text-brand'
                                                    : 'bg-white/5 border border-white/8 text-gray-400 group-hover:text-gray-300'
                                            }`}
                                        >
                                            <MapPin size={8} aria-hidden="true" />
                                            {p}
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-4 border-t ${
                                        z.destacado
                                            ? 'border-brand/20 text-brand'
                                            : 'border-white/8 text-gray-500 group-hover:text-gray-400'
                                    }`}
                                >
                                    <Clock size={12} aria-hidden="true" />
                                    Entrega: {z.tiempo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Las 24 provincias */}
            <section className="bg-[#0a0a0a] border-y border-white/8 py-16 lg:py-20">
                <div className="container-swiss">
                    <div className="mb-10 animate-in">
                        <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">
                            Alcance Incomparable
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase text-white">
                            Las <span className="text-brand">24 Provincias</span> del Ecuador
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 animate-in">
                        {ALL_PROVINCES.map((prov, i) => (
                            <div
                                key={i}
                                className="group flex items-center gap-2 bg-white/3 border border-white/8 px-3 py-2.5 rounded-lg hover:border-brand/30 hover:bg-brand/5 transition-all duration-300"
                            >
                                <div className="bg-white/10 border border-white/10 p-1 rounded group-hover:bg-brand group-hover:border-brand transition-all">
                                    <MapPin size={9} className="text-gray-400 group-hover:text-white transition-colors" strokeWidth={3} aria-hidden="true" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                                    {prov}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 lg:py-24 text-center">
                <div className="container-swiss animate-in">
                    <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase text-white mb-4">
                        ¿Tu ciudad está <span className="text-brand">cubierta?</span>
                    </h2>
                    <p className="text-gray-400 font-medium mb-8 max-w-md mx-auto text-sm">
                        Cotiza tu envío en segundos — sin registro ni compromiso.
                    </p>
                    <Link to="/cotizador" className="btn-primary inline-flex items-center gap-2">
                        Cotizar a Mi Ciudad
                        <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </main>
    )
}
