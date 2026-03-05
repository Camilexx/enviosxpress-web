import { ArrowRight, Truck, Clock, Star, ShieldCheck, Users } from 'lucide-react'

export default function Hero() {
    return (
        <section id="inicio" className="relative min-h-screen flex items-center bg-[#F8FAFC] overflow-hidden pt-36 pb-20">
            {/* Very Subtle Grid Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.4]"
                style={{ backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)', backgroundSize: '48px 48px' }}
                aria-hidden="true"
            />

            {/* Light Artistic Blurs */}
            <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand/[0.04] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-red-600/[0.02] rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

            <div className="container-swiss relative z-10 w-full">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Content Column - 7 Columns Wide */}
                    <div className="lg:col-span-7">
                        <div className="animate-in animate-delay-1 is-revealed relative inline-block mb-8">
                            <div className="relative inline-flex items-center gap-3 bg-white border border-gray-200 text-black px-5 py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                                <div className="absolute -left-1 -top-1 w-3 h-3 bg-brand rounded-full animate-pulse opacity-70" />
                                <div className="absolute -left-1 -top-1 w-3 h-3 bg-brand rounded-full shadow-[0_0_10px_rgba(114,47,55,0.4)]" />
                                <span className="ml-2 font-bold text-gray-800">Operador Logístico Certificado</span>
                            </div>
                        </div>

                        <div className="animate-in animate-delay-2 is-revealed relative">
                            <h1 className="relative text-5xl sm:text-7xl lg:text-[6rem] font-black italic tracking-tighter text-black mb-6 leading-[0.85] uppercase">
                                Dominamos <br />
                                La <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-red-600">Logística</span> <br />
                                Del Ecuador
                            </h1>
                        </div>

                        <div className="animate-in animate-delay-3 is-revealed">
                            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12 font-medium leading-normal relative z-10">
                                Tu mercancía en manos expertas. Más velocidad, menos riesgo, y un control total sobre tus envíos en las <strong className="text-black bg-brand/10 px-1 py-0.5 border-b-2 border-brand">24 provincias</strong>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 items-center relative z-10 w-full max-w-xl">
                                <a href="#cotizador" className="w-full sm:w-auto min-h-[56px] group relative inline-flex items-center justify-center bg-brand text-white px-10 py-5 text-sm font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(114,47,55,0.25)] hover:shadow-[0_20px_40px_rgba(114,47,55,0.4)] hover:bg-black hover:scale-105 transition-all duration-300">
                                    <span className="relative z-10 flex items-center">
                                        Cotizar Envío
                                        <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </a>

                                <div className="h-px w-10 bg-gray-300 hidden sm:block"></div>

                                <a href="#servicios" className="w-full sm:w-auto min-h-[56px] group inline-flex items-center justify-center bg-transparent text-black px-8 py-5 text-sm font-black uppercase tracking-[0.2em] border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
                                    Ver Servicios
                                </a>
                            </div>

                            {/* Trust Features Inline */}
                            <div className="mt-14 flex flex-wrap gap-y-4 gap-x-6 items-center text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"><ShieldCheck size={12} className="text-green-600" /></div> 100% Seguro</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:block" />
                                <span className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center"><Truck size={12} className="text-blue-600" /></div> Todo el País</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:block" />
                                <span className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center"><Clock size={12} className="text-brand" /></div> Velocidad</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual / Trust Dashboard Column - 5 Columns Wide */}
                    <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-center animate-in animate-delay-4 is-revealed">
                        {/* Connecting Lines Graphic */}
                        <div className="absolute -left-10 top-1/2 w-20 border-t-2 border-dashed border-gray-300 -translate-y-1/2 z-0" />

                        <div className="relative z-10 grid gap-5">
                            {/* Premium Feature Card */}
                            <div className="group bg-white rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 hover:border-brand/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl group-hover:bg-brand/10 transition-colors" />

                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 bg-brand/5 rounded-2xl text-brand group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm">
                                        <ShieldCheck size={36} strokeWidth={2} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Garantía</div>
                                        <div className="text-2xl font-black italic tracking-tighter text-black">TOTAL</div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-black relative z-10">Seguridad de Carga</h3>
                                <p className="text-sm font-medium text-gray-500 leading-relaxed relative z-10">
                                    Monitoreo GPS en tiempo real y protocolos de seguridad física 24/7 en toda la ruta comercial.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {/* Metric 1 */}
                                <div className="group bg-white rounded-2xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:border-brand/20 transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute -left-10 -bottom-10 opacity-5 rotate-45 group-hover:rotate-12 transition-transform duration-700">
                                        <Star size={120} />
                                    </div>
                                    <div className="flex text-brand mb-3 relative z-10">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-brand" />)}
                                    </div>
                                    <div className="text-4xl font-black text-black italic tracking-tighter mb-1 relative z-10">
                                        4.9<span className="text-xl text-gray-400">/5</span>
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mt-2 relative z-10">Valoración Global</div>
                                </div>

                                {/* Metric 2 PRO */}
                                <div className="group relative bg-[#111] text-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(114,47,55,0.4)] hover:-translate-y-1 hover:bg-black transition-all duration-500 overflow-hidden">
                                    <div className="absolute -right-4 -top-4 opacity-[0.05] group-hover:rotate-12 transition-transform duration-700">
                                        <Clock size={100} />
                                    </div>
                                    <div className="text-brand mb-2 relative z-10">
                                        <Clock size={20} />
                                    </div>
                                    <div className="relative z-10 text-4xl font-black italic tracking-tighter mb-1">
                                        99.8<span className="text-xl text-gray-500">%</span>
                                    </div>
                                    <div className="relative z-10 w-8 h-1 bg-brand mb-4 group-hover:w-full transition-all duration-500" />
                                    <div className="relative z-10 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Efectividad Entregas</div>
                                </div>
                            </div>

                            {/* Corporate Proof */}
                            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-5 flex items-center justify-between shadow-sm">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-400 shadow-sm">
                                            <Users size={16} />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Respaldado por</p>
                                    <h4 className="font-black text-black uppercase tracking-tight">+2,500 Empresas</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
