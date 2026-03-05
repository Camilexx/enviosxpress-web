import { Star, Quote, ArrowRight } from 'lucide-react'

const testimonios = [
    {
        nombre: 'María González',
        cargo: 'E-Commerce Director',
        ciudad: 'Quito',
        texto: 'La integración de su sistema COD transformó nuestra operatividad. Liquidez inmediata y logística impecable.',
        rating: 5,
    },
    {
        nombre: 'Carlos Mendoza',
        cargo: 'Logistics Manager',
        ciudad: 'Guayaquil',
        texto: 'Eficiencia técnica absoluta. EnviosXpress es el socio estratégico que necesitábamos para nuestra expansión nacional.',
        rating: 5,
    },
    {
        nombre: 'Ana Lucía Paredes',
        cargo: 'Operations Specialist',
        ciudad: 'Cuenca',
        texto: 'Precisión en los tiempos de entrega y un soporte corporativo que entiende la urgencia del sector tecnológico.',
        rating: 5,
    }
]

export default function Testimonios() {
    return (
        <section id="testimonios" className="section relative bg-white overflow-hidden border-t border-gray-100" aria-label="Testimonios de clientes">
            {/* Giant Background typography */}
            <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none select-none z-0 opacity-[0.02]">
                <h2 className="text-[200px] lg:text-[280px] font-black tracking-tighter italic text-black whitespace-nowrap leading-none">
                    TRUST QUALITY SPEED
                </h2>
            </div>

            <div className="container-swiss relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-24 gap-8">
                    <div className="max-w-3xl animate-in is-revealed">
                        <div className="inline-block border border-black/10 bg-gray-50 text-black font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-6 rounded-full">
                            Validación Técnica
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-black italic tracking-tighter uppercase mb-6 leading-[0.9]">
                            El Respaldo de <br />
                            <span className="text-brand">Los Mejores</span>
                        </h2>
                        <p className="text-gray-500 font-medium leading-relaxed text-lg lg:text-xl">
                            No prometemos resultados, los evidenciamos. Más de 500 empresas de alto nivel ya escalan su logística con EnviosXpress.
                        </p>
                    </div>

                    <div className="animate-in is-revealed animate-delay-2">
                        <div className="flex flex-col md:items-end md:text-right border-l md:border-l-0 md:border-r-4 border-brand pl-4 md:pl-0 md:pr-6 py-2">
                            <div className="text-5xl lg:text-6xl font-black italic tracking-tighter text-black mb-2">
                                4.9<span className="text-brand text-3xl">/5</span>
                            </div>
                            <div className="flex gap-1 mb-2 md:justify-end">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} className="fill-brand text-brand" aria-hidden="true" />)}
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                Puntaje Auditado
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
                    {testimonios.map((t, i) => (
                        <div
                            key={i}
                            className={`p-8 lg:p-12 relative group animate-in is-revealed transition-all duration-500 ${i === 1 ? 'bg-black text-white shadow-2xl lg:scale-105 z-10 hover:shadow-[0_20px_60px_rgba(114,47,55,0.25)] border-b-4 border-brand' : 'bg-gray-50 border border-gray-100 text-black hover:border-black/20 hover:bg-white hover:-translate-y-2'}`}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            {/* Graphic Quote Icon */}
                            <Quote size={80} className={`absolute top-6 right-6 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 ${i === 1 ? 'text-white' : 'text-black'}`} strokeWidth={1} aria-hidden="true" />

                            <div className="flex items-center gap-1 mb-8 relative z-10">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} size={16} className="fill-brand text-brand" aria-hidden="true" />
                                ))}
                            </div>

                            <blockquote className={`text-base lg:text-lg font-medium mb-10 leading-relaxed italic relative z-10 ${i === 1 ? 'text-gray-200' : 'text-gray-600'}`}>
                                "{t.texto}"
                            </blockquote>

                            <div className="flex items-center gap-4 pt-6 border-t border-current/10 relative z-10">
                                <div className={`w-12 h-12 flex items-center justify-center font-black text-xs rounded-full select-none shadow-inner ${i === 1 ? 'bg-brand text-white' : 'bg-black text-white'}`} aria-hidden="true">
                                    {t.nombre.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <cite className={`text-sm font-black not-italic block uppercase tracking-tight ${i === 1 ? 'text-white' : 'text-black'}`}>
                                        {t.nombre}
                                    </cite>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${i === 1 ? 'text-gray-400' : 'text-gray-400'}`}>
                                        {t.cargo} — {t.ciudad}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust CTA */}
                <div className="mt-20 lg:mt-32 pt-12 border-t border-gray-100 text-center animate-in is-revealed">
                    <p className="text-gray-500 font-bold mb-8 text-sm uppercase tracking-widest">
                        Únete a la red logística más confiable del país hoy mismo
                    </p>
                    <a href="#cotizador" className="btn-primary group">
                        Sincronizar Operativa
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    )
}
