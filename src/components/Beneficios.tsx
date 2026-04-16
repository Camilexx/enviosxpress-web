import { ShieldCheck, Truck, Zap, Headphones, BarChart3, Clock, ArrowRight } from 'lucide-react'

const beneficios = [
    {
        title: 'SEGURIDAD NIVEL BANCARIO',
        icon: ShieldCheck,
        desc: 'Tu mercadería cuenta con seguro total contra siniestros y monitoreo satelital en cada ruta.',
        color: 'text-brand',
        bg: 'bg-brand/10'
    },
    {
        title: 'ENTREGA ULTRA-VELOZ',
        icon: Zap,
        desc: 'Logística optimizada para entregas en 24-48 horas en las principales ciudades del país.',
        color: 'text-brand',
        bg: 'bg-brand/10'
    },
    {
        title: 'COBERTURA 24 PROVINCIAS',
        icon: Truck,
        desc: 'Llegamos a donde otros no llegan. Nuestra red capilar cubre hasta el último rincón del Ecuador.',
        color: 'text-brand',
        bg: 'bg-brand/10'
    },
    {
        title: 'SOPORTE PERSONALIZADO',
        icon: Headphones,
        desc: 'Olvídate de los bots genéricos. Tienes un asesor humano asignado directamente por WhatsApp 24/7.',
        color: 'text-brand',
        bg: 'bg-brand/10'
    },
    {
        title: 'REPORTE DE MÉTRICAS',
        icon: BarChart3,
        desc: 'Acceso a un panel para visualizar tus envíos, efectividad de entrega y reportes de cobro COD.',
        color: 'text-brand',
        bg: 'bg-brand/10'
    },
    {
        title: 'PUNTUALIDAD GARANTIZADA',
        icon: Clock,
        desc: 'Cumplimos con nuestras ventanas de entrega con una precisión del 99.8% en rutas comerciales.',
        color: 'text-brand',
        bg: 'bg-brand/10'
    }
]

export default function Beneficios() {
    return (
        <section id="beneficios" className="section bg-[#F8FAFC] relative overflow-hidden">
            {/* Ultra-subtle background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />

            <div className="absolute -top-64 -right-64 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px]" />
            <div className="absolute -bottom-64 -left-64 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px]" />

            <div className="container-swiss relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-32 animate-in gpu-accel">
                    <div className="inline-block border border-brand/20 glass-brand text-brand font-black text-[10px] uppercase tracking-[0.4em] px-6 py-2.5 mb-8 rounded-full">
                        Premium Logistics Choice
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black text-black italic tracking-tighter uppercase mb-8 leading-[0.9]">
                        Diseño <span className="text-brand">Operativo</span> <br />
                        De Alto Rendimiento
                    </h2>
                    <p className="text-gray-500 font-medium text-xl leading-relaxed max-w-2xl mx-auto">
                        Optimizamos cada eslabón de la cadena para que tu empresa solo se preocupe por crecer.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                    {beneficios.map((b, i) => (
                        <div
                            key={i}
                            className="group relative bg-white p-10 lg:p-12 border border-gray-100 hover-lift hover-glow-brand animate-in gpu-accel"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {/* Hover accent decoration */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rotate-45 translate-x-12 -translate-y-12 group-hover:bg-brand/10 transition-colors duration-500" />

                            <div className={`w-20 h-20 ${b.bg} ${b.color} rounded-sm flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-sm border border-brand/5`}>
                                <b.icon size={36} strokeWidth={2} className="group-hover:animate-pulse" />
                            </div>

                            <h3 className="text-2xl font-black text-black mb-4 tracking-tight uppercase group-hover:text-brand transition-colors italic">
                                {b.title}
                            </h3>
                            <p className="text-base font-medium text-gray-400 leading-relaxed">
                                {b.desc}
                            </p>

                            <div className="mt-8 flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-300 group-hover:text-brand group-hover:translate-x-2 transition-all duration-300">
                                EXPLORAR SERVICIO <ArrowRight size={14} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final CTA Strip */}
                <div className="mt-24 lg:mt-32 p-10 lg:p-16 bg-black text-white relative overflow-hidden animate-in shadow-2xl gpu-accel rounded-sm">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-brand/10 skew-x-[-25deg] translate-x-1/3" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl text-center lg:text-left">
                            <h3 className="text-2xl lg:text-4xl font-black italic tracking-tighter uppercase mb-6 leading-none">
                                Impulsa Tu <br className="hidden lg:block" />
                                <span className="text-brand">Crecimiento Nacional</span>
                            </h3>
                            <p className="text-gray-400 text-lg font-medium">
                                Únete a la infraestructura logística más moderna del país.
                            </p>
                        </div>
                        <a href="#contacto" className="btn-primary btn-shine-effect whitespace-nowrap px-16 py-7 text-sm hover-glow group">
                            SOLICITAR CUENTA CORPORATIVA <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
