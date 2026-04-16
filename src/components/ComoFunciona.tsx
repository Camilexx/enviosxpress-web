import { Calculator, PackageCheck, Truck } from 'lucide-react'

export default function ComoFunciona() {
    const steps = [
        {
            number: '01',
            title: 'Cotiza en 1 Minuto',
            description: 'Usa nuestra calculadora online o escríbenos por WhatsApp. Obtén tu tarifa exacta al instante, sin costos ocultos.',
            icon: <Calculator size={28} className="text-white" />,
        },
        {
            number: '02',
            title: 'Recogemos tu Paquete',
            description: 'Pasamos por tu domicilio o local en el horario acordado. También puedes dejarlo en nuestro centro logístico.',
            icon: <PackageCheck size={28} className="text-white" />,
        },
        {
            number: '03',
            title: 'Entregamos y Cobramos',
            description: 'Tu envío llega seguro en 24-48h. Si usas el servicio Contra Entrega, recaudamos el dinero y te lo depositamos.',
            icon: <Truck size={28} className="text-white" />,
        }
    ]

    return (
        <section id="como-funciona" className="section relative bg-black text-white overflow-hidden border-t border-white/10" aria-label="Cómo funciona nuestro servicio">
            {/* Background Details */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #722F37 0%, transparent 70%)' }} />
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="container-swiss relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24 animate-in">
                    <div className="inline-block border border-brand/40 bg-brand/10 text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-6 rounded-full shadow-[0_0_15px_rgba(114,47,55,0.3)]">
                        Proceso Sin Fricción
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black italic tracking-tighter uppercase mb-6 leading-[0.95] drop-shadow-lg">
                        Envía en <span className="text-metallic-brand">3 Pasos</span>
                    </h2>
                    <p className="text-gray-400 font-medium leading-relaxed text-base md:text-xl max-w-2xl mx-auto">
                        Olvídate de procesos burocráticos. Diseñamos un sistema tan simple que puedes concretar tu envío desde tu celular en un par de minutos.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 lg:gap-12 relative max-w-6xl mx-auto">
                    {/* Background connecting line for Desktop */}
                    <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-1 bg-gradient-to-r from-brand/0 via-brand/30 to-brand/0 z-0" aria-hidden="true" />

                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className={`relative z-10 p-8 lg:p-10 bg-[#0A0A0A] border border-white/5 hover:border-brand/40 transition-all duration-500 group rounded-[2rem] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(114,47,55,0.15)] animate-in animate-delay-${i + 1}`}
                        >
                            {/* Giant faded number behind */}
                            <div className="absolute -top-4 -right-2 text-[120px] font-black italic text-white/[0.02] group-hover:text-brand/[0.05] transition-colors duration-500 leading-none select-none z-0 tracking-tighter" aria-hidden="true">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="mb-8 w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center bg-black group-hover:bg-brand group-hover:border-brand/50 transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:-rotate-3">
                                    {step.icon}
                                </div>

                                <h3 className="text-xl lg:text-2xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-brand transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-base text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center animate-in animate-delay-4">
                    <a href="#cotizador" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-brand hover:text-white transition-all duration-300 shadow-xl hover:shadow-brand/30 hover:scale-105">
                        Empezar Ahora
                    </a>
                </div>
            </div>
        </section>
    )
}
