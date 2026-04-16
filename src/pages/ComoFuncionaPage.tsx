import { Phone, Truck, MapPin, CheckCircle, ArrowRight, Package, Clock, Shield } from 'lucide-react'

const pasos = [
    {
        number: '01',
        icon: Phone,
        title: 'Solicitud y Cotización',
        desc: 'Ingresa origen, destino y peso en nuestro cotizador o contáctanos por WhatsApp. Recibes tarifa inmediata sin necesidad de registro.',
        detalle: [
            'Cotizador en línea 24/7',
            'Respuesta por WhatsApp en minutos',
            'Sin contratos ni permanencia',
        ],
    },
    {
        number: '02',
        icon: Package,
        title: 'Preparación y Pickup',
        desc: 'Programa la recolección de tu paquete. Nuestro motorizado llega a tu domicilio en la ventana horaria acordada y genera la guía al instante.',
        detalle: [
            'Pickup en domicilio coordinado',
            'Embalaje verificado al recibir',
            'Guía de rastreo generada al instante',
        ],
    },
    {
        number: '03',
        icon: Truck,
        title: 'Tránsito Controlado',
        desc: 'Tu envío entra a nuestra red terrestre nacional. Clasificación en Hub central y despacho directo por rutas optimizadas.',
        detalle: [
            'Clasificación automatizada en Hub',
            'Rutas terrestres optimizadas',
            'Monitoreo de estado en tiempo real',
        ],
    },
    {
        number: '04',
        icon: MapPin,
        title: 'Entrega Final',
        desc: 'Último kilómetro hasta la puerta del destinatario. Para servicios COD: cobro al momento de entrega y liquidación inmediata.',
        detalle: [
            'Entrega puerta a puerta',
            'Confirmación de recepción digital',
            'Liquidación de cobros en 24-48h (COD)',
        ],
    },
    {
        number: '05',
        icon: CheckCircle,
        title: 'Confirmación y Reporte',
        desc: 'Cierre de ciclo logístico con confirmación al remitente. Acceso a dashboard con historial de envíos y métricas de efectividad.',
        detalle: [
            'Notificación de entrega confirmada',
            'Historial de envíos disponible',
            'Reporte mensual de métricas (cuentas corporativas)',
        ],
    },
]

const faqs = [
    {
        q: '¿Cuál es el peso máximo permitido?',
        a: 'Para envíos estándar aceptamos hasta 50 kg por guía. Cargas mayores se manejan como logística B2B con tarifa corporativa a medida.',
    },
    {
        q: '¿Qué pasa si el destinatario no está en casa?',
        a: 'Se realizan hasta 2 intentos de entrega. Si no hay éxito, se notifica al remitente para coordinar un tercer intento o devolución.',
    },
    {
        q: '¿Cómo funciona el servicio COD?',
        a: 'Entregamos el paquete y cobramos el valor acordado al destinatario. Los fondos se liquidan a tu cuenta en 24-48 horas hábiles.',
    },
    {
        q: '¿Puedo rastrear mi envío?',
        a: 'Sí. Al momento del pickup recibes un número de guía. Puedes consultar el estado contactando a tu asesor por WhatsApp.',
    },
    {
        q: '¿Hay restricciones de contenido?',
        a: 'No se transportan artículos peligrosos, perecederos sin embalaje especial, ni artículos prohibidos por la ley ecuatoriana.',
    },
    {
        q: '¿Cuándo está disponible el servicio de pickup?',
        a: 'Lunes a sábado de 08:00 a 17:00. Domingos bajo previa coordinación para cuentas corporativas.',
    },
]

export default function ComoFuncionaPage() {
    return (
        <main className="pt-24">
                {/* Hero */}
                <section className="bg-black text-white py-20 lg:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 80%, #722F37 0%, transparent 60%)' }} />
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                        <div className="inline-block border border-brand/40 bg-brand/10 text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-6 rounded-full">
                            Metodología Logística
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase mb-6 leading-[0.9]">
                            Cómo <span className="text-brand">Funciona</span>
                        </h1>
                        <p className="text-gray-400 font-medium max-w-xl text-base leading-relaxed">
                            5 pasos, de la solicitud a la entrega confirmada. Procesos estandarizados para máxima eficiencia.
                        </p>
                    </div>
                </section>

                {/* Pasos */}
                <section className="bg-white py-20 lg:py-28">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        <div className="space-y-12">
                            {pasos.map((p, i) => {
                                const Icon = p.icon
                                const isEven = i % 2 === 0
                                return (
                                    <div
                                        key={i}
                                        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center border-b border-gray-100 pb-12`}
                                    >
                                        <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center lg:items-start gap-4">
                                            <div className="text-[80px] font-black italic text-gray-50 leading-none select-none">
                                                {p.number}
                                            </div>
                                            <div className="w-16 h-16 bg-brand/10 text-brand flex items-center justify-center rounded-xl -mt-6">
                                                <Icon size={28} strokeWidth={2} />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-4 text-black">
                                                {p.title}
                                            </h2>
                                            <p className="text-gray-500 font-medium text-base leading-relaxed mb-6">
                                                {p.desc}
                                            </p>
                                            <ul className="space-y-2">
                                                {p.detalle.map((d, j) => (
                                                    <li key={j} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-600">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Requisitos */}
                <section className="bg-gray-50 border-t border-gray-100 py-16 lg:py-20">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-10">
                            Requisitos de <span className="text-brand">Envío</span>
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: Package, title: 'Embalaje', desc: 'Empaque correcto para el tipo de producto. Frágiles deben indicarse con etiqueta visible.' },
                                { icon: Clock, title: 'Horario Pickup', desc: 'Solicita con al menos 2 horas de anticipación. Pickup disponible Lun-Sáb 08:00-17:00.' },
                                { icon: Shield, title: 'Declaración', desc: 'Indica el valor del contenido para efectos del seguro de la guía. Requerido para COD.' },
                            ].map((r, i) => {
                                const Icon = r.icon
                                return (
                                    <div key={i} className="bg-white p-8 border border-gray-100">
                                        <div className="w-12 h-12 bg-brand/10 text-brand flex items-center justify-center rounded-lg mb-6">
                                            <Icon size={22} strokeWidth={2} />
                                        </div>
                                        <h3 className="text-lg font-black italic tracking-tighter uppercase mb-3 text-black">{r.title}</h3>
                                        <p className="text-sm font-medium text-gray-500 leading-relaxed">{r.desc}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="bg-white border-t border-gray-100 py-20 lg:py-24">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-12">
                            Preguntas <span className="text-brand">Frecuentes</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {faqs.map((faq, i) => (
                                <div key={i} className="border-l-2 border-brand pl-6 py-2">
                                    <h3 className="font-black text-base uppercase tracking-tight mb-2 text-black">{faq.q}</h3>
                                    <p className="text-sm font-medium text-gray-500 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-black text-white py-16">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 text-center">
                        <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-4 text-white">
                            Listo para empezar
                        </h2>
                        <p className="text-gray-400 font-medium mb-8 text-sm">
                            Obtén tu tarifa en menos de 30 segundos.
                        </p>
                        <a href="/#cotizador" className="inline-flex items-center gap-3 bg-brand text-white font-black text-[11px] uppercase tracking-widest px-10 py-5 hover:bg-white hover:text-black transition-colors duration-300">
                            COTIZAR MI ENVÍO <ArrowRight size={16} />
                        </a>
                    </div>
                </section>
        </main>
    )
}
