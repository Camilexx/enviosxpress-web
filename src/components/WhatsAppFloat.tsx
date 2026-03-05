import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppFloat() {
    const [showBubble, setShowBubble] = useState(false)
    const [closed, setClosed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowBubble(true), 3000)
        return () => clearTimeout(timer)
    }, [])

    const handleWhatsApp = () => {
        const text = "Hola EnviosXpress, necesito asesoría con un envío corporativo."
        window.open(`https://wa.me/593987654321?text=${encodeURIComponent(text)}`, '_blank')
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
            {showBubble && !closed && (
                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-brand/10 max-w-[240px] animate-in is-revealed translate-y-0 opacity-100 pointer-events-auto relative mb-2">
                    <button
                        onClick={() => setClosed(true)}
                        className="absolute -top-2 -right-2 bg-gray-100 p-1 rounded-full text-gray-500 hover:text-black cursor-pointer shadow-sm flex items-center justify-center w-6 h-6 transition-colors"
                    >
                        <X size={12} />
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand">LOGÍSTICA AI</span>
                    </div>
                    <p className="text-xs font-bold text-gray-800 leading-snug">
                        ¡Hola! Soy el asistente de EnviosXpress. ¿Puedo cotizar tu carga nacional ahora?
                    </p>
                </div>
            )}

            <button
                onClick={handleWhatsApp}
                className="group p-4 bg-brand text-white rounded-full shadow-2xl shadow-brand/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto relative overflow-hidden"
                aria-label="Contactar por WhatsApp"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <MessageCircle size={32} strokeWidth={2.5} className="relative z-10" />
            </button>
        </div>
    )
}
