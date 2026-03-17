import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
    {
        pregunta: '¿Cuánto cuesta enviar un paquete con EnviosXpress?',
        respuesta: 'Nuestras tarifas inician desde $3.50 para envíos estándar de hasta 1kg. El precio varía según el peso, destino y tipo de servicio (estándar o express). Usa nuestro cotizador en línea para obtener un precio exacto en segundos.',
    },
    {
        pregunta: '¿Cuánto tiempo tarda la entrega?',
        respuesta: 'Entrega estándar: 24 a 48 horas a nivel nacional. Entrega express: mismo día o siguiente día hábil para rutas principales (Quito-Guayaquil, Quito-Cuenca). Al crear tu envío, recibirás la fecha estimada exacta.',
    },
    {
        pregunta: '¿Puedo cobrar contra entrega (COD)?',
        respuesta: 'Sí. Nuestro servicio de Cobro Contra Entrega permite que tu cliente pague al recibir el paquete. El dinero se te deposita en 24-48 horas hábiles después de la entrega confirmada. Ideal para e-commerce y ventas por redes sociales.',
    },
    {
        pregunta: '¿Qué pasa si mi paquete se pierde o daña?',
        respuesta: 'Todos los envíos incluyen seguro básico sin costo adicional. En caso de pérdida o daño comprobado, cubrimos hasta el valor declarado del contenido. Puedes agregar seguro extendido al momento de cotizar para mayor protección.',
    },
    {
        pregunta: '¿Cómo rastreo mi envío?',
        respuesta: 'Al crear tu envío recibes un número de guía. Con ese número puedes rastrear en tiempo real desde nuestra plataforma web o directamente por WhatsApp. Además, enviamos notificaciones automáticas en cada etapa del proceso.',
    },
    {
        pregunta: '¿Tienen cobertura en mi ciudad?',
        respuesta: 'Cubrimos las 24 provincias del Ecuador. Tenemos rutas especializadas con descuentos de hasta 30% en la Zona Norte (Quito, Tabacundo, Cayambe, Otavalo, Ibarra, Tulcán). Consulta nuestra sección de cobertura para ver todas las rutas.',
    },
    {
        pregunta: '¿Cómo empiezo a enviar con ustedes?',
        respuesta: 'Es muy simple: 1) Cotiza tu envío en nuestra web o WhatsApp, 2) Programa la recolección o lleva tu paquete a nuestro punto más cercano, 3) Nosotros nos encargamos del resto. No necesitas contrato, empiezas desde tu primer envío.',
    },
]

function FAQItem({ pregunta, respuesta, isOpen, onClick }: {
    pregunta: string
    respuesta: string
    isOpen: boolean
    onClick: () => void
}) {
    return (
        <div className={`border-b border-gray-100 transition-all duration-300 ${isOpen ? 'bg-gray-50/50' : ''}`}>
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-7 sm:py-8 px-2 sm:px-4 text-left group cursor-pointer"
                aria-expanded={isOpen}
            >
                <span className={`text-base sm:text-lg font-bold pr-8 transition-colors duration-200 ${isOpen ? 'text-brand' : 'text-black group-hover:text-brand'}`}>
                    {pregunta}
                </span>
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-brand text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-brand/10 group-hover:text-brand'}`}>
                    <ChevronDown size={20} />
                </div>
            </button>
            <div
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0 }}
            >
                <p className="text-gray-600 font-medium leading-relaxed text-sm sm:text-base px-2 sm:px-4 pb-8">
                    {respuesta}
                </p>
            </div>
        </div>
    )
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="faq" className="section bg-white">
            <div className="container-swiss">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Left Column - Header */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <div className="animate-in">
                                <div className="inline-flex items-center gap-3 bg-brand/5 border border-brand/10 px-5 py-2.5 rounded-full mb-8">
                                    <HelpCircle size={14} className="text-brand" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">Preguntas Frecuentes</span>
                                </div>

                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6">
                                    Resolvemos<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-red-600">
                                        Tus Dudas
                                    </span>
                                </h2>

                                <p className="text-gray-500 font-medium leading-relaxed text-sm sm:text-base mb-8">
                                    Las respuestas a las consultas más comunes de nuestros clientes. Si no encuentras lo que buscas, escríbenos por WhatsApp.
                                </p>

                                <a
                                    href="https://wa.me/593967489002?text=Hola%20EnviosXpress%2C%20tengo%20una%20consulta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline inline-flex text-[10px] py-3 px-6"
                                >
                                    Pregúntanos por WhatsApp →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - FAQ Items */}
                    <div className="lg:col-span-8">
                        <div className="animate-in animate-delay-2">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    pregunta={faq.pregunta}
                                    respuesta={faq.respuesta}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
