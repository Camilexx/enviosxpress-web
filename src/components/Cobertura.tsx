import { ArrowRight, Zap, MapPin } from 'lucide-react'

export default function Cobertura() {

    return (
        <section id="cobertura" className="section bg-white border-t border-gray-100" aria-label="Cobertura nacional">
            <div className="container-swiss">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left: 24 Provinces List */}
                    <div className="relative animate-in is-revealed bg-white border border-gray-100 p-8 lg:p-12 shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/[0.02] rounded-full blur-3xl group-hover:bg-brand/[0.04] transition-colors duration-500 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-block border border-brand/10 bg-brand/5 text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-6 rounded-full">
                                Alcance Incomparable
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-black text-black mb-6 leading-[0.9] italic tracking-tighter">
                                24 Provincias <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">Del Ecuador</span>
                            </h2>

                            <p className="text-sm lg:text-base font-medium text-gray-500 mb-10 max-w-sm leading-relaxed">
                                Nuestra red se extiende por todo el territorio nacional, garantizando
                                tiempos de entrega óptimos gracias a una infraestructura de distribución ininterrumpida.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-2">
                                {[
                                    'Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi',
                                    'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas', 'Imbabura', 'Loja',
                                    'Los Ríos', 'Manabí', 'Morona', 'Napo', 'Orellana', 'Pastaza',
                                    'Pichincha', 'S. Elena', 'Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora'
                                ].map((prov, i) => (
                                    <div key={i} className="flex items-center gap-2 group/item hover:translate-x-1 transition-transform cursor-default">
                                        <div className="bg-gray-50 border border-gray-100 p-1.5 rounded-sm group-hover/item:bg-brand group-hover/item:border-brand transition-all">
                                            <MapPin size={10} className="text-gray-400 group-hover/item:text-white transition-colors" strokeWidth={3} />
                                        </div>
                                        <span className="text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-widest group-hover/item:text-black transition-colors">{prov}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Regions & Special Offer CTA */}
                    <div className="space-y-6">
                        {/* High-CTR Promotion Card */}
                        <div className="relative group animate-in is-revealed">
                            {/* Animated Glowing Gradient Behind Card */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand via-red-600 to-brand rounded-sm blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                            <div className="relative bg-black text-white p-8 lg:p-10 border border-white/10 shadow-2xl overflow-hidden">

                                {/* Promo Ribbon Badge */}
                                <div className="absolute -right-20 top-10 bg-brand text-white px-24 py-2 rotate-45 font-black text-xl lg:text-2xl shadow-xl shadow-brand/50 select-none pointer-events-none text-center">
                                    25% OFF
                                </div>

                                <div className="text-brand font-black text-[12px] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <Zap size={18} className="text-brand animate-bounce" /> BENEFICIO CORPORATIVO
                                </div>
                                <h3 className="font-black text-4xl lg:text-5xl uppercase tracking-tighter mb-4 italic leading-[0.9]">
                                    Ruta Premium <br /> Zona Norte
                                </h3>

                                <p className="text-gray-300 text-sm font-medium mb-6 leading-relaxed max-w-sm">
                                    Optimiza tus costos hoy. Obtén un <strong className="text-white text-base">descuento de hasta el 25%</strong> en fletes diarios a través de nuestra ruta de ultra-eficiencia:
                                </p>

                                {/* Route path */}
                                <div className="bg-white/5 border border-white/10 p-4 mb-8 font-mono text-[10px] lg:text-xs text-white uppercase tracking-widest leading-relaxed">
                                    Quito ➔ Tabacundo ➔ Cayambe ➔ Otavalo ➔ Cotacachi ➔ Atuntaqui ➔ Ibarra
                                </div>

                                {/* High-CTR Button */}
                                <a href="#cotizador" className="btn-primary w-full justify-center bg-brand text-white shadow-[0_0_20px_rgba(114,47,55,0.7)] border border-brand hover:bg-white hover:text-black hover:border-white cursor-pointer py-5 transition-all duration-300 transform group-hover:scale-[1.02]">
                                    RECLAMAR 25% DE DESCUENTO <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Rest of Country */}
                        <div className="border border-gray-100 bg-gray-50 p-8 hover:border-black hover:shadow-lg transition-all duration-300 animate-in is-revealed animate-delay-2">
                            <h3 className="font-black text-xl uppercase tracking-tighter mb-2 italic">Resto del País</h3>
                            <p className="text-sm font-medium text-gray-500 mb-6">Frecuencias corporativas directas a Guayaquil, Cuenca y todo el Ecuador.</p>
                            <a href="#cotizador" className="btn-outline w-full justify-center cursor-pointer py-4 hover:tracking-widest transition-all text-xs">
                                Ver Tarifíario General
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
