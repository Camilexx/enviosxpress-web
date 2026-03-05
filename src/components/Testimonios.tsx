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
    },
    {
        nombre: 'Sofia Ramos',
        cargo: 'CEO E-commerce',
        ciudad: 'Manta',
        texto: 'El mejor aliado para nuestras rutas en la costa. Seguridad total y excelente comunicación en cada etapa.',
        rating: 5,
    },
    {
        nombre: 'Roberto Cando',
        cargo: 'Supply Chain Manager',
        ciudad: 'Santo Domingo',
        texto: 'Sencillez y potencia. Los reportes y el control que tenemos ahora nos han permitido optimizar costos.',
        rating: 5,
    },
    {
        nombre: 'Patricia Ortiz',
        cargo: 'Directora de Operaciones',
        ciudad: 'Loja',
        texto: 'Su cobertura en el sur del país es inigualable. Han cumplido donde otros operadores fallaron.',
        rating: 5,
    },
    {
        nombre: 'Francisco Silva',
        cargo: 'Fundador TechRetail',
        ciudad: 'Ambato',
        texto: 'La tecnología detrás de EnviosXpress es lo que los separa del resto. Son el futuro de la logística.',
        rating: 5,
    },
    {
        nombre: 'Gabriel Vega',
        cargo: 'Export Manager',
        ciudad: 'Guayaquil',
        texto: 'Compromiso y profesionalismo. Manejan nuestra carga crítica con un nivel de detalle impresionante.',
        rating: 5,
    }
]

export default function Testimonios() {
    return (
        <section id="testimonios" className="section relative bg-white overflow-hidden border-t border-gray-100 py-24 lg:py-32" aria-label="Testimonios de clientes">
            {/* Custom Styles for Infinite Marquee */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 50s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />

            {/* Giant Background typography */}
            <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none select-none z-0 opacity-[0.02]">
                <h2 className="text-[200px] lg:text-[280px] font-black tracking-tighter italic text-black whitespace-nowrap leading-none">
                    TRUST QUALITY SPEED
                </h2>
            </div>

            <div className="container-swiss relative z-10 mb-16 lg:mb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
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
            </div>

            {/* Marquee Wrapper */}
            <div className="relative w-full overflow-hidden py-10">
                {/* Visual fading shadows on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

                <div className="animate-marquee gap-8 px-4">
                    {/* Double the array for seamless scrolling */}
                    {[...testimonios, ...testimonios].map((t, i) => (
                        <div
                            key={i}
                            className="w-[350px] md:w-[450px] p-8 lg:p-10 bg-gray-50 border border-gray-100 text-black hover:border-brand/40 hover:bg-white hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full shrink-0"
                        >
                            <div className="flex items-center gap-1 mb-6">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} size={14} className="fill-brand text-brand" aria-hidden="true" />
                                ))}
                            </div>

                            <blockquote className="text-sm md:text-base font-medium mb-8 leading-relaxed italic text-gray-600 flex-grow">
                                "{t.texto}"
                            </blockquote>

                            <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-[10px] rounded-full group-hover:bg-brand transition-colors" aria-hidden="true">
                                    {t.nombre.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <cite className="text-sm font-black not-italic block uppercase tracking-tight text-black">
                                        {t.nombre}
                                    </cite>
                                    <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5 text-gray-400">
                                        {t.cargo} — {t.ciudad}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-swiss relative z-10">
                {/* Trust CTA */}
                <div className="mt-16 lg:mt-24 pt-12 text-center animate-in is-revealed">
                    <p className="text-gray-500 font-bold mb-8 text-sm uppercase tracking-widest">
                        Únete a la red logística más confiable del país hoy mismo
                    </p>
                    <a href="#cotizador" className="btn-primary group inline-flex items-center gap-2">
                        Sincronizar Operativa
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    )
}
