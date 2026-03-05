import { ArrowRight, Truck, Clock, Star, ShieldCheck, Sparkles } from 'lucide-react'

export default function Hero() {
    return (
        <section id="inicio" className="relative min-h-screen flex items-center bg-[#F8FAFC] overflow-hidden pt-36 pb-20">
            {/* Very Subtle Grid Pattern with perspective effect */}
            <div
                className="absolute inset-0 z-0 opacity-[0.3]"
                style={{
                    backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    transform: 'perspective(1000px) rotateX(20deg) translateY(-100px) scale(1.5)',
                    transformOrigin: 'top'
                }}
                aria-hidden="true"
            />

            {/* Premium Artistic Blurs */}
            <div className="absolute top-[-10%] right-[-5%] w-[900px] h-[900px] bg-brand/[0.06] rounded-full blur-[120px] animate-pulse pointer-events-none" aria-hidden="true" />
            <div className="absolute top-[30%] left-[-15%] w-[600px] h-[600px] bg-red-600/[0.03] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="container-swiss relative z-10 w-full">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Content Column - 7 Columns Wide */}
                    <div className="lg:col-span-7">
                        <div className="animate-in animate-delay-1 is-revealed relative inline-block mb-10 gpu-accel">
                            <div className="relative inline-flex items-center gap-4 glass-effect border border-brand/10 text-black px-6 py-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] rounded-full shadow-2xl">
                                <Sparkles size={16} className="text-brand animate-pulse" />
                                <span className="font-black text-gray-800">Operador Logístico Certificado</span>
                            </div>
                        </div>

                        <div className="animate-in animate-delay-2 is-revealed relative gpu-accel">
                            <h1 className="relative text-6xl sm:text-8xl lg:text-[7.5rem] font-black italic tracking-tighter text-black mb-8 leading-[0.8] uppercase">
                                Dominamos <br />
                                La <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand via-red-600 to-brand-dark animate-gradient-x">Logística</span> <br />
                                Del Ecuador
                            </h1>
                        </div>

                        <div className="animate-in animate-delay-3 is-revealed gpu-accel">
                            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-14 font-medium leading-relaxed relative z-10">
                                Tu mercancía en manos expertas. Más velocidad, menos riesgo, y un control total sobre tus envíos en las <strong className="text-black decoration-brand/30 decoration-4 underline underline-offset-4">24 provincias</strong> del país.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 items-center relative z-10 w-full max-w-2xl">
                                <a href="#cotizador" className="w-full sm:w-auto min-h-[64px] group relative inline-flex items-center justify-center bg-brand text-white px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(114,47,55,0.3)] hover:shadow-[0_25px_50px_rgba(114,47,55,0.5)] hover:bg-black hover:scale-105 transition-all duration-500 rounded-sm">
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                    <span className="relative z-10 flex items-center">
                                        Cotizar Envío
                                        <ArrowRight size={22} className="ml-4 group-hover:translate-x-3 transition-transform" />
                                    </span>
                                </a>

                                <a href="#servicios" className="w-full sm:w-auto min-h-[64px] group inline-flex items-center justify-center bg-white text-black px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] border-2 border-gray-100 hover:border-black hover:shadow-xl transition-all duration-500 rounded-sm">
                                    Ver Portafolio <ArrowRight size={18} className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </a>
                            </div>

                            {/* Trust Features Inline - Enhanced */}
                            <div className="mt-16 flex flex-wrap gap-y-6 gap-x-10 items-center text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">
                                <span className="flex items-center gap-3 hover:text-brand transition-colors cursor-default group"><div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform"><ShieldCheck size={16} className="text-green-600" /></div> 100% Seguro</span>
                                <span className="flex items-center gap-3 hover:text-brand transition-colors cursor-default group"><div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform"><Truck size={16} className="text-blue-600" /></div> Todo el País</span>
                                <span className="flex items-center gap-3 hover:text-brand transition-colors cursor-default group"><div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform"><Clock size={16} className="text-brand" /></div> Velocidad Pro</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual / Trust Dashboard Column - Refined with Glassmorphism */}
                    <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-center animate-in animate-delay-4 is-revealed gpu-accel">
                        <div className="relative z-10 grid gap-6">
                            {/* Premium Feature Card with Glass */}
                            <div className="group glass-effect rounded-[2rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-white hover:border-brand/40 transition-all duration-700 hover:-translate-y-4 overflow-hidden relative animate-float">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/20 transition-all duration-1000" />

                                <div className="flex items-start justify-between mb-8">
                                    <div className="p-5 bg-brand rounded-2xl text-white shadow-2xl shadow-brand/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                                        <ShieldCheck size={42} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Status Quo</div>
                                        <div className="text-3xl font-black italic tracking-tighter text-black">TOP TIER</div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black italic">Protección Activa</h3>
                                <p className="text-base font-medium text-gray-500 leading-relaxed">
                                    Protocolos de seguridad de grado militar y escolta digital para cada uno de tus activos.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Metric 1 Glass */}
                                <div className="group glass-effect rounded-[2rem] p-8 shadow-xl border border-white hover:-translate-y-2 hover:border-brand/20 transition-all duration-700 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex text-brand mb-4 relative z-10">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-brand" />)}
                                    </div>
                                    <div className="text-5xl font-black text-black italic tracking-tighter mb-2 relative z-10">
                                        4.9<span className="text-2xl text-gray-400">/5</span>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 relative z-10">Net Promoter Score</div>
                                </div>

                                {/* Metric 2 Dark Premium */}
                                <div className="group relative bg-[#111] text-white rounded-[2rem] p-8 shadow-2xl hover:shadow-[0_30px_60px_rgba(114,47,55,0.4)] hover:-translate-y-2 hover:bg-black transition-all duration-700 overflow-hidden border border-white/5">
                                    <div className="absolute -right-6 -top-6 opacity-[0.08] group-hover:rotate-45 transition-transform duration-1000">
                                        <Clock size={140} />
                                    </div>
                                    <div className="text-brand mb-4 relative z-10">
                                        <Clock size={28} className="animate-pulse" />
                                    </div>
                                    <div className="relative z-10 text-5xl font-black italic tracking-tighter mb-2">
                                        99.8<span className="text-2xl text-gray-500">%</span>
                                    </div>
                                    <div className="relative z-10 w-12 h-1 bg-brand mb-4 group-hover:w-full transition-all duration-700" />
                                    <div className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Eficiencia Real</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
