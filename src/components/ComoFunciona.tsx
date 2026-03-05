import { Phone, Truck, MapPin, CheckCircle } from 'lucide-react'

export default function ComoFunciona() {
    const steps = [
        {
            number: '01',
            title: 'Protocolo de Inicio',
            description: 'Cotización inmediata y asignación de guía. Definición estructural de origen, destino y requerimientos especiales de carga.',
            icon: <Phone size={24} />,
        },
        {
            number: '02',
            title: 'Recolección y Hub',
            description: 'Pickup puntual en ventana horaria. Admisión directa y clasificación automatizada en nuestro Hub logístico central.',
            icon: <Truck size={24} />,
        },
        {
            number: '03',
            title: 'Tránsito Controlado',
            description: 'Rutas terrestres optimizadas con monitoreo continuo. Tiempos de conexión exactos a lo largo de las 24 provincias.',
            icon: <MapPin size={24} />,
        },
        {
            number: '04',
            title: 'Entrega Exitosa',
            description: 'Confirmación de recepción en tiempo real. Cierre de ciclo operativo y liquidación de recaudos (si el servicio lo requiere).',
            icon: <CheckCircle size={24} />,
        }
    ]

    return (
        <section id="como-funciona" className="section relative bg-black text-white overflow-hidden border-t border-white/10" aria-label="Cómo funciona nuestro servicio">
            {/* Background Details */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #722F37 0%, transparent 70%)' }} />
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="container-swiss relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20 animate-in is-revealed">
                    <div className="inline-block border border-brand/40 bg-brand/10 text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-6 rounded-full">Metodología Logística</div>
                    <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase mb-6 leading-[0.9] drop-shadow-lg">
                        Pipeline de <span className="text-brand">Operación</span>
                    </h2>
                    <p className="text-gray-400 font-medium leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
                        Nuestro framework de trabajo está diseñado con precisión militar. Procesos estandarizados bajo estrictas métricas de calidad para garantizar la integridad y puntualidad de su cadena de suministro.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
                    {/* Background connecting line for Desktop */}
                    <div className="hidden lg:block absolute top-[80px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-brand/0 via-brand/50 to-brand/0 z-0" aria-hidden="true" />

                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="relative z-10 p-8 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand/50 transition-all duration-300 group backdrop-blur-md animate-in is-revealed"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            {/* Giant faded number behind */}
                            <div className="absolute top-2 right-4 text-[80px] font-black italic text-white/5 group-hover:text-brand/10 transition-colors duration-500 leading-none select-none z-0" aria-hidden="true">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="mb-8 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black group-hover:bg-brand group-hover:border-brand transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(114,47,55,0.6)]">
                                    <div className="text-white">
                                        {step.icon}
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight group-hover:text-brand transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
