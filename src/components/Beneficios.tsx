import { ShieldCheck, Truck, Zap, Headphones, BarChart3, Clock } from 'lucide-react'

const beneficios = [
    {
        title: 'SEGURIDAD NIVEL BANCARIO',
        icon: ShieldCheck,
        desc: 'Tu mercadería cuenta con seguro total contra siniestros y monitoreo satelital en tiempo real en cada ruta.',
        color: 'text-green-600',
        bg: 'bg-green-50'
    },
    {
        title: 'ENTREGA ULTRA-VELOZ',
        icon: Zap,
        desc: 'Logística optimizada para entregas en 24-48 horas en las principales ciudades del país sin retrasos.',
        color: 'text-amber-500',
        bg: 'bg-amber-50'
    },
    {
        title: 'COBERTURA 24 PROVINCIAS',
        icon: Truck,
        desc: 'Llegamos a donde otros no llegan. Nuestra red capilar cubre hasta el último rincón del Ecuador.',
        color: 'text-blue-600',
        bg: 'bg-blue-50'
    },
    {
        title: 'SOPORTE PERSONALIZADO',
        icon: Headphones,
        desc: 'Olvídate de los bots genéricos. Tienes un asesor humano asignado directamente por WhatsApp 24/7.',
        color: 'text-brand',
        bg: 'bg-brand/5'
    },
    {
        title: 'REPORTE DE MÉTRICAS',
        icon: BarChart3,
        desc: 'Acceso a un panel de control para visualizar tus envíos, efectividad de entrega y reportes de cobro COD.',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50'
    },
    {
        title: 'PUNTUALIDAD GARANTIZADA',
        icon: Clock,
        desc: 'Cumplimos con nuestras ventanas de entrega con una precisión del 99.8% en rutas comerciales.',
        color: 'text-red-600',
        bg: 'bg-red-50'
    }
]

export default function Beneficios() {
    return (
        <section id="beneficios" className="section bg-[#F8FAFC] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="container-swiss relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 animate-in">
                    <div className="inline-block border border-brand/20 bg-brand/5 text-brand font-black text-[10px] uppercase tracking-[0.4em] px-5 py-2 mb-6 rounded-full">
                        Por qué elegirnos
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-black italic tracking-tighter uppercase mb-6 leading-[0.9]">
                        Ventaja <span className="text-brand">Competitiva</span> <br />
                        Sin Precedentes
                    </h2>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        No solo movemos cajas, impulsamos el crecimiento de tu negocio con tecnología
                        logística de vanguardia y un compromiso inquebrantable con la seguridad.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {beneficios.map((b, i) => (
                        <div
                            key={i}
                            className="group bg-white p-8 lg:p-10 border border-gray-100 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/5 transition-all duration-500 animate-in relative overflow-hidden"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {/* Hover accent */}
                            <div className="absolute top-0 left-0 w-1 h-0 bg-brand group-hover:h-full transition-all duration-500" />

                            <div className={`w-16 h-16 ${b.bg} ${b.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                                <b.icon size={32} strokeWidth={2} />
                            </div>

                            <h3 className="text-xl font-black text-black mb-4 tracking-tight uppercase group-hover:text-brand transition-colors">
                                {b.title}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                {b.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 lg:mt-28 p-8 lg:p-12 bg-black text-white relative overflow-hidden animate-in">
                    {/* Abstract graphic */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/10 skew-x-[-20deg] translate-x-1/2" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl">
                            <h3 className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase mb-4 leading-tight">
                                ¿Listo para escalar <br /> la logística de tu empresa?
                            </h3>
                            <p className="text-gray-400 font-medium">
                                Únete a las más de 2,500 empresas que ya confían en nuestra red nacional.
                            </p>
                        </div>
                        <a href="#contacto" className="btn-primary whitespace-nowrap px-12 py-6 text-sm">
                            ABRIR MI CUENTA CORPORATIVA
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
