import { ArrowRight, Truck, Clock, ShieldCheck, Sparkles, Star, Package } from 'lucide-react'

export default function Hero() {
    return (
        <section id="inicio" className="relative min-h-screen flex items-center bg-[#F8FAFC] overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-20">
            {/* Subtle Grid Pattern with perspective */}
            <div
                className="absolute inset-0 z-0 opacity-[0.25]"
                style={{
                    backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    transform: 'perspective(1000px) rotateX(20deg) translateY(-100px) scale(1.5)',
                    transformOrigin: 'top'
                }}
                aria-hidden="true"
            />

            {/* Premium Artistic Blurs */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-brand/[0.06] rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
            <div className="absolute top-[30%] left-[-15%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-red-600/[0.03] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="container-swiss relative z-10 w-full">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    {/* Content Column */}
                    <div className="lg:col-span-7">
                        <div className="animate-in animate-delay-1 is-revealed relative inline-block mb-6 sm:mb-10 gpu-accel">
                            <div className="relative inline-flex items-center gap-3 sm:gap-4 glass-effect border border-brand/10 text-black px-4 sm:px-6 py-2.5 sm:py-3 text-[9px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] rounded-full shadow-2xl">
                                <Sparkles size={14} className="text-brand animate-pulse" />
                                <span className="font-black text-gray-800">+15,000 Envíos Exitosos</span>
                            </div>
                        </div>

                        <div className="animate-in animate-delay-2 is-revealed relative gpu-accel">
                            {/* PAS Formula: Problem → Agitate → Solution */}
                            <h1 className="relative text-[2.75rem] sm:text-7xl lg:text-[6.5rem] font-black italic tracking-tighter text-black mb-6 sm:mb-8 leading-[0.85] uppercase">
                                Tu Envío{' '}
                                <span className="text-metallic-brand">
                                    Seguro
                                </span>
                                <br />
                                En 24 Horas
                            </h1>
                        </div>

                        <div className="animate-in animate-delay-3 is-revealed gpu-accel">
                            {/* Benefit-driven subheadline */}
                            <p className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-2xl mb-8 sm:mb-14 font-medium leading-relaxed relative z-10">
                                Envía paquetes a todo Ecuador desde <strong className="text-black">$3.50</strong>. Cobertura en las{' '}
                                <strong className="text-black underline decoration-brand/30 decoration-[3px] underline-offset-4">24 provincias</strong>,
                                seguimiento en tiempo real y cobro contra entrega incluido.
                            </p>

                            {/* CTAs — Verb + Benefit */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch sm:items-center relative z-10 w-full max-w-2xl">
                                <a href="#cotizador" className="w-full sm:w-auto min-h-[56px] sm:min-h-[64px] group relative inline-flex items-center justify-center bg-brand text-white px-8 sm:px-12 py-4 sm:py-6 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] shadow-[0_20px_40px_rgba(114,47,55,0.3)] hover:shadow-[0_25px_50px_rgba(114,47,55,0.5)] hover:bg-black hover:scale-105 transition-all duration-500 rounded-sm">
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                    <span className="relative z-10 flex items-center">
                                        Cotizar Envío Gratis
                                        <ArrowRight size={20} className="ml-3 sm:ml-4 group-hover:translate-x-3 transition-transform" />
                                    </span>
                                </a>

                                <a href="https://wa.me/593967489002?text=Hola%20EnviosXpress%2C%20necesito%20información%20sobre%20envíos" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto min-h-[56px] sm:min-h-[64px] group inline-flex items-center justify-center bg-white text-black px-8 sm:px-10 py-4 sm:py-6 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] border-2 border-gray-100 hover:border-black hover:shadow-xl transition-all duration-500 rounded-sm">
                                    Hablar con Asesor <ArrowRight size={16} className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </a>
                            </div>

                            {/* Trust Features - Mobile Friendly */}
                            <div className="mt-10 sm:mt-16 flex flex-wrap gap-y-4 sm:gap-y-6 gap-x-6 sm:gap-x-10 items-center text-[9px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                                <span className="flex items-center gap-2 sm:gap-3 hover:text-brand transition-colors cursor-default group">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ShieldCheck size={14} className="text-green-600" />
                                    </div>
                                    100% Asegurado
                                </span>
                                <span className="flex items-center gap-2 sm:gap-3 hover:text-brand transition-colors cursor-default group">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Package size={14} className="text-blue-600" />
                                    </div>
                                    Cobro Contra Entrega
                                </span>
                                <span className="flex items-center gap-2 sm:gap-3 hover:text-brand transition-colors cursor-default group">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Clock size={14} className="text-brand" />
                                    </div>
                                    Entrega 24-48h
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Column — Glassmorphism Cards */}
                    <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-center animate-in animate-delay-4 is-revealed gpu-accel">
                        <div className="relative z-10 grid gap-6">
                            {/* Main Feature Card */}
                            <div className="group glass-effect rounded-[2rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-white hover:border-brand/40 transition-all duration-700 hover:-translate-y-4 overflow-hidden relative animate-float">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/20 transition-all duration-1000" />

                                <div className="flex items-start justify-between mb-8">
                                    <div className="p-5 bg-brand rounded-2xl text-white shadow-2xl shadow-brand/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                                        <Truck size={42} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Tasa de Éxito</div>
                                        <div className="text-3xl font-black italic tracking-tighter text-black">99.8%</div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black italic">Entrega Garantizada</h3>
                                <p className="text-base font-medium text-gray-500 leading-relaxed">
                                    Si no llega a tiempo, te devolvemos el costo del envío. Así de confiados estamos.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Rating Card */}
                                <div className="group glass-effect rounded-[2rem] p-8 shadow-xl border border-white hover:-translate-y-2 hover:border-brand/20 transition-all duration-700 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex text-brand mb-4 relative z-10">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-brand" />)}
                                    </div>
                                    <div className="text-5xl font-black text-black italic tracking-tighter mb-2 relative z-10">
                                        4.9<span className="text-2xl text-gray-400">/5</span>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 relative z-10">Satisfacción</div>
                                </div>

                                {/* Speed Card */}
                                <div className="group relative bg-[#111] text-white rounded-[2rem] p-8 shadow-2xl hover:shadow-[0_30px_60px_rgba(114,47,55,0.4)] hover:-translate-y-2 hover:bg-black transition-all duration-700 overflow-hidden border border-white/5">
                                    <div className="absolute -right-6 -top-6 opacity-[0.08] group-hover:rotate-45 transition-transform duration-1000">
                                        <Clock size={140} />
                                    </div>
                                    <div className="text-brand mb-4 relative z-10">
                                        <Clock size={28} className="animate-pulse" />
                                    </div>
                                    <div className="relative z-10 text-5xl font-black italic tracking-tighter mb-2">
                                        24<span className="text-2xl text-gray-500">h</span>
                                    </div>
                                    <div className="relative z-10 w-12 h-1 bg-brand mb-4 group-hover:w-full transition-all duration-700" />
                                    <div className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Entrega Express</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
