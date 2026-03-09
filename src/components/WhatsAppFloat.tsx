import { useState, useEffect } from 'react'
import { MessageCircle, X, Sparkles } from 'lucide-react'

export default function WhatsAppFloat() {
    const [showBubble, setShowBubble] = useState(false)
    const [closed, setClosed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowBubble(true), 45000)
        return () => clearTimeout(timer)
    }, [])

    const handleWhatsApp = () => {
        const text = "Hola EnviosXpress, necesito asesoría con un envío corporativo."
        window.open(`https://wa.me/593987654321?text=${encodeURIComponent(text)}`, '_blank')
    }

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none group/parent">
            {/* AI Floating Message */}
            {showBubble && !closed && (
                <div className="glass-effect p-5 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] max-w-[280px] animate-in is-revealed translate-y-0 opacity-100 pointer-events-auto relative mb-2 border-brand/5 group-hover/parent:translate-y-[-5px] transition-transform duration-500">
                    <button
                        onClick={() => setClosed(true)}
                        className="absolute -top-3 -right-3 bg-white p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 cursor-pointer shadow-xl border border-gray-100 flex items-center justify-center w-8 h-8 transition-all hover:scale-110 active:scale-90"
                    >
                        <X size={14} />
                    </button>

                    <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white shadow-lg shadow-brand/20">
                                <Sparkles size={18} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                        </div>
                        <div>
                            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-brand">Soporte Inteligente</div>
                            <div className="text-xs font-black text-black italic">Logística AI</div>
                        </div>
                    </div>

                    <p className="text-[13px] font-bold text-gray-800 leading-snug">
                        ¡Hola! He detectado tu interés en rutas nacionales. ¿Buscas cotizar <span className="text-brand">30% OFF</span> en Zona Norte?
                    </p>

                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={handleWhatsApp}
                            className="text-[10px] font-black uppercase tracking-widest bg-brand text-white px-4 py-2 rounded-full shadow-lg shadow-brand/10 hover:bg-black transition-colors cursor-pointer"
                        >
                            COTIZAR AHORA
                        </button>
                    </div>
                </div>
            )}

            {/* Main Primary Button */}
            <button
                onClick={handleWhatsApp}
                className="group p-5 bg-brand text-white rounded-full shadow-2xl shadow-brand/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto relative overflow-hidden animate-float"
                aria-label="Contactar por WhatsApp"
            >
                {/* Internal shine animation */}
                <div className="absolute inset-0 bg-white/30 translate-x-[-150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                <MessageCircle size={36} strokeWidth={2} className="relative z-10" />

                {/* Double ring pulse */}
                <span className="absolute inset-0 rounded-full border-2 border-brand animate-ping opacity-30" />
            </button>
        </div>
    )
}
