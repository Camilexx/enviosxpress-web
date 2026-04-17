import { Phone, Truck, MapPin, CheckCircle, ArrowRight, Package, Clock, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'

const PASOS = [
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

const REQUISITOS = [
    {
        icon: Package,
        title: 'Embalaje Correcto',
        desc: 'Empaque adecuado para el tipo de producto. Frágiles deben indicarse con etiqueta visible para manejo especial.',
    },
    {
        icon: Clock,
        title: 'Horario Pickup',
        desc: 'Solicita con al menos 2 horas de anticipación. Pickup disponible lunes a sábado de 08:00 a 17:00.',
    },
    {
        icon: Shield,
        title: 'Declaración de Valor',
        desc: 'Indica el valor del contenido para efectos del seguro de la guía. Requerido para servicio COD.',
    },
]

const FAQS = [
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
        <main className="bg-black min-h-screen">
            <PageHero
                badge="Metodología Logística"
                title="¿Cómo"
                highlight="Funciona?"
                subtitle="Cinco pasos, de la solicitud a la entrega confirmada. Procesos estandarizados para máxima eficiencia y cero sorpresas."
            />

            {/* Stats */}
            <section className="bg-[#0a0a0a] border-b border-white/5 py-8">
                <div className="container-swiss">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { n: '5', label: 'Pasos del proceso' },
                            { n: '24-48h', label: 'Tiempo de entrega' },
                            { n: '2', label: 'Intentos de entrega' },
                            { n: '99.8%', label: 'Efectividad' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="text-center animate-in"
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <div className="text-2xl lg:text-3xl font-black italic tracking-tighter text-white mb-1">
                                    {stat.n}
                                </div>
                                <div className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-500">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 lg:py-28">
                <div className="container-swiss">
                    <div className="mb-12 animate-in">
                        <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">
                            De solicitud a entrega
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase text-white">
                            El <span className="text-brand">Proceso</span> Paso a Paso
                        </h2>
                    </div>

                    <div className="relative max-w-4xl">
                        {/* Vertical connecting line */}
                        <div
                            className="absolute left-[31px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-brand via-brand/30 to-transparent pointer-events-none"
                            aria-hidden="true"
                        />

                        <div className="space-y-8">
                            {PASOS.map((paso, i) => {
                                const Icon = paso.icon
                                return (
                                    <div
                                        key={i}
                                        className="relative flex gap-8 animate-in"
                                        style={{ animationDelay: `${i * 0.12}s` }}
                                    >
                                        {/* Step circle */}
                                        <div className="relative flex-shrink-0 w-16 h-16 bg-brand rounded-full flex items-center justify-center border-4 border-black z-10 shadow-[0_0_20px_rgba(114,47,55,0.4)]">
                                            <Icon size={22} className="text-white" aria-hidden="true" />
                                        </div>

                                        {/* Content card */}
                                        <div className="flex-1 group bg-[#0a0a0a] border border-white/8 p-8 rounded-2xl hover:border-brand/30 hover:-translate-y-0.5 transition-all duration-500">
                                            {/* Giant faded number */}
                                            <div
                                                className="absolute top-2 right-4 text-[80px] font-black italic text-white/[0.02] leading-none select-none pointer-events-none"
                                                aria-hidden="true"
                                            >
                                                {paso.number}
                                            </div>

                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-2">
                                                Paso {paso.number}
                                            </div>
                                            <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3 group-hover:text-brand transition-colors duration-300">
                                                {paso.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-5">
                                                {paso.desc}
                                            </p>
                                            <ul className="flex flex-wrap gap-x-6 gap-y-2">
                                                {paso.detalle.map((d, j) => (
                                                    <li
                                                        key={j}
                                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-400 transition-colors"
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" aria-hidden="true" />
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
                </div>
            </section>

            {/* Requisitos */}
            <section className="bg-[#0a0a0a] border-y border-white/8 py-16 lg:py-20">
                <div className="container-swiss">
                    <div className="mb-10 animate-in">
                        <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">
                            Antes de enviar
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase text-white">
                            Requisitos de <span className="text-brand">Envío</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {REQUISITOS.map((r, i) => {
                            const Icon = r.icon
                            return (
                                <div
                                    key={i}
                                    className="group bg-black border border-white/8 p-8 rounded-2xl hover:border-brand/30 hover:-translate-y-1 transition-all duration-500 animate-in"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand group-hover:border-brand transition-all duration-300">
                                        <Icon size={20} className="text-brand group-hover:text-white transition-colors duration-300" strokeWidth={2.5} aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-black italic tracking-tighter uppercase text-white mb-3 group-hover:text-brand transition-colors">
                                        {r.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                        {r.desc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* FAQs — accordion */}
            <section className="py-20 lg:py-24">
                <div className="container-swiss">
                    <div className="max-w-3xl">
                        <div className="mb-10 animate-in">
                            <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">
                                Resolvemos tus dudas
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase text-white">
                                Preguntas <span className="text-brand">Frecuentes</span>
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {FAQS.map((faq, i) => (
                                <details
                                    key={i}
                                    className="group bg-[#0a0a0a] border border-white/8 rounded-xl hover:border-brand/30 transition-all duration-300 animate-in"
                                    style={{ animationDelay: `${i * 0.07}s` }}
                                >
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                                        <span className="text-sm font-black uppercase tracking-tight text-white group-hover:text-brand transition-colors duration-300 pr-4">
                                            {faq.q}
                                        </span>
                                        <span
                                            className="text-brand text-xl font-black flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                                            aria-hidden="true"
                                        >
                                            +
                                        </span>
                                    </summary>
                                    <p className="px-6 pb-6 text-gray-400 text-sm font-medium leading-relaxed border-t border-white/5 pt-4">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#0a0a0a] border-t border-white/8 py-20 text-center">
                <div className="container-swiss animate-in">
                    <h2 className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase text-white mb-6">
                        Listo para <span className="text-brand">Enviar</span>
                    </h2>
                    <p className="text-gray-400 font-medium mb-10 max-w-md mx-auto text-sm">
                        Obtén tu tarifa en menos de 30 segundos. Sin registro ni compromiso.
                    </p>
                    <Link to="/cotizador" className="btn-primary inline-flex items-center gap-2">
                        Cotizar Mi Envío
                        <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </main>
    )
}
