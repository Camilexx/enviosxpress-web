import { useState, useEffect } from 'react'
import { MessageCircle, X, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function WhatsAppFloat() {
    const [showBubble, setShowBubble] = useState(false)
    const [closed, setClosed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowBubble(true), 45000)
        return () => clearTimeout(timer)
    }, [])

    const handleWhatsApp = () => {
        const text = "Hola EnviosXpress, necesito asesoría con un envío corporativo."
        window.open(`https://wa.me/593967489002?text=${encodeURIComponent(text)}`, '_blank')
    }

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none group/parent">
            {/* AI Floating Message */}
            {showBubble && !closed && (
                <div className="glass-effect p-5 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] max-w-[290px] animate-in is-revealed translate-y-0 opacity-100 pointer-events-auto relative mb-2 border-brand/5 group-hover/parent:translate-y-[-5px] transition-transform duration-500">
                    <button
                        onClick={() => setClosed(true)}
                        className="absolute -top-3 -right-3 bg-white p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 cursor-pointer shadow-xl border border-gray-100 flex items-center justify-center w-8 h-8 transition-all hover:scale-110 active:scale-90"
                        aria-label="Cerrar"
                    >
                        <X size={14} />
                    </button>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="relative shrink-0">
                            <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white shadow-lg shadow-brand/20">
                                <Sparkles size={18} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-brand">Soporte Inteligente · Logística AI</div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-black text-black italic">EnviosXpress</span>
                                <span className="bg-brand text-white font-black text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full">
                                    25% NORTE
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <p className="text-[13px] font-bold text-gray-800 leading-snug mb-1">
                        ¡Hola! ¿Necesitas cotizar un envío?
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium leading-snug">
                        Respondo en segundos. Zona Norte con{' '}
                        <span className="text-brand font-black">25% de descuento</span> automático.
                    </p>

                    {/* CTAs */}
                    <div className="mt-4 flex flex-col gap-2">
                        <Link
                            to="/cotizador"
                            onClick={() => setClosed(true)}
                            className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest bg-brand text-white px-4 py-2.5 rounded-full shadow-lg shadow-brand/20 hover:bg-black transition-colors cursor-pointer"
                        >
                            Cotizar Ahora
                            <ArrowRight size={12} />
                        </Link>
                        <button
                            onClick={() => { handleWhatsApp(); setClosed(true) }}
                            className="text-[10px] font-black uppercase tracking-widest text-brand border border-brand/30 bg-brand/5 px-4 py-2 rounded-full hover:bg-brand/10 transition-colors cursor-pointer"
                        >
                            Hablar por WhatsApp
                        </button>
                    </div>
                </div>
            )}

            {/* Main Floating Button */}
            <button
                onClick={handleWhatsApp}
                className="group p-5 bg-brand text-white rounded-full shadow-2xl shadow-brand/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto relative overflow-hidden animate-float"
                aria-label="Contactar por WhatsApp"
            >
                {/* Shine sweep */}
                <div className="absolute inset-0 bg-white/30 translate-x-[-150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                <MessageCircle size={36} strokeWidth={2} className="relative z-10" />
                <span className="absolute inset-0 rounded-full border-2 border-brand animate-ping opacity-30" />
            </button>
        </div>
    )
}
