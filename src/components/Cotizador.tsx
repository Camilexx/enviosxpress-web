import { useState, useMemo } from 'react'
import { Calculator, Check, MessageSquare, Truck, Zap } from 'lucide-react'

const CIUDADES_ECUADOR = [
    'Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Manta',
    'Machala', 'Portoviejo', 'Loja', 'Riobamba', 'Esmeraldas',
    'Ibarra', 'Santo Domingo', 'Latacunga', 'Babahoyo', 'Tulcán',
    'Durán', 'Quevedo', 'Milagro', 'Azogues', 'Guaranda',
    'Puyo', 'Tena', 'Nueva Loja', 'Coca', 'Macas',
]

type TipoServicio = 'estandar' | 'express'

const TARIFAS: Record<TipoServicio, { min: number; max: number; precio: number }[]> = {
    estandar: [
        { min: 0, max: 1, precio: 3.50 },
        { min: 1, max: 3, precio: 4.50 },
        { min: 3, max: 5, precio: 6.00 },
        { min: 5, max: 10, precio: 8.50 },
        { min: 10, max: 20, precio: 12.00 },
        { min: 20, max: 50, precio: 18.00 },
    ],
    express: [
        { min: 0, max: 1, precio: 5.50 },
        { min: 1, max: 3, precio: 7.00 },
        { min: 3, max: 5, precio: 9.50 },
        { min: 5, max: 10, precio: 13.00 },
        { min: 10, max: 20, precio: 18.00 },
        { min: 20, max: 50, precio: 28.00 },
    ],
}

export default function Cotizador() {
    const [origen, setOrigen] = useState('')
    const [destino, setDestino] = useState('')
    const [peso, setPeso] = useState('')
    const [tipo, setTipo] = useState<TipoServicio>('estandar')
    const [showResult, setShowResult] = useState(false)

    const resultado = useMemo(() => {
        const pesoNum = parseFloat(peso)
        if (!origen || !destino || !pesoNum || pesoNum <= 0) return null

        if (pesoNum > 50) return { tipo: 'personalizado' as const, precio: 0 }

        const tarifas = TARIFAS[tipo]
        const tarifa = tarifas.find(t => pesoNum > t.min && pesoNum <= t.max) || tarifas[tarifas.length - 1]

        return {
            tipo: 'calculado' as const,
            precio: tarifa.precio,
            tiempoEstimado: tipo === 'express' ? '24 horas' : '24-48 horas',
        }
    }, [origen, destino, peso, tipo])

    const handleWhatsApp = () => {
        const message = `Hola EnviosXpress, solicito cotización:\nOrigen: ${origen}\nDestino: ${destino}\nPeso: ${peso}kg\nServicio: ${tipo}`
        window.open(`https://wa.me/593XXXXXXXXX?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <section id="cotizador" className="section bg-gray-50 border-t border-gray-100" aria-label="Cotizador de envíos">
            <div className="container-swiss">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left: Content */}
                    <div className="animate-in">
                        <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">Eficiencia Técnica</div>
                        <h2 className="text-4xl lg:text-6xl font-black text-black mb-6 leading-tight italic tracking-tighter">
                            COTIZADOR <br /> <span className="text-metallic-brand">INSTANTÁNEO</span>
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md font-medium text-base leading-relaxed">
                            Cálculo de tarifas instantáneo basado en logística terrestre nacional.
                            Sin cargos ocultos, precisión garantizada.
                        </p>

                        <div className="space-y-4">
                            {[
                                'Recogida programada a domicilio',
                                'Entrega puerta a puerta nacional',
                                'Tarifas corporativas por volumen',
                                'Seguridad y respaldo total'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-black font-bold text-sm">
                                    <div className="bg-brand rounded-full p-1 shrink-0">
                                        <Check size={12} color="white" strokeWidth={3} />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Widget */}
                    <div className="bg-black text-white p-8 lg:p-12 animate-in animate-delay-2 shadow-2xl relative overflow-hidden rounded-[2rem]">
                        {/* Dramatic glow */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand/30 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center gap-3 mb-10 pb-5 border-b border-white/10 relative z-10">
                            <Calculator className="text-brand" size={24} aria-hidden="true" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">Tarifa Inmediata</h3>
                        </div>

                        {!showResult ? (
                            <form onSubmit={(e) => { e.preventDefault(); setShowResult(true) }} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="cotizador-origen" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Ciudad Origen</label>
                                        <select
                                            id="cotizador-origen"
                                            value={origen}
                                            onChange={(e) => setOrigen(e.target.value)}
                                            className="w-full bg-white/5 border-b border-white/20 p-4 font-bold text-white focus:border-brand outline-none transition-colors duration-200 cursor-pointer appearance-none"
                                        >
                                            <option value="" className="text-black">Seleccionar</option>
                                            {CIUDADES_ECUADOR.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="cotizador-destino" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Ciudad Destino</label>
                                        <select
                                            id="cotizador-destino"
                                            value={destino}
                                            onChange={(e) => setDestino(e.target.value)}
                                            className="w-full bg-white/5 border-b border-white/20 p-4 font-bold text-white focus:border-brand outline-none transition-colors duration-200 cursor-pointer appearance-none"
                                        >
                                            <option value="" className="text-black">Seleccionar</option>
                                            {CIUDADES_ECUADOR.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="cotizador-peso" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Peso Estimado (KG)</label>
                                    <input
                                        id="cotizador-peso"
                                        type="number"
                                        value={peso}
                                        onChange={(e) => setPeso(e.target.value)}
                                        className="w-full bg-white/5 border-b border-white/20 p-4 font-bold text-white focus:border-brand outline-none transition-colors duration-200 placeholder-white/30"
                                        placeholder="Ej: 5.0"
                                        min="0.1"
                                        step="0.1"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setTipo('estandar')}
                                        className={`flex-1 py-5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer ${tipo === 'estandar' ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
                                    >
                                        <Truck size={14} /> Estándar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTipo('express')}
                                        className={`flex-1 py-5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer ${tipo === 'express' ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
                                    >
                                        <Zap size={14} /> Express
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!resultado}
                                    className="btn-primary w-full justify-center py-5 uppercase tracking-[0.2em] text-xs mt-4 disabled:opacity-50"
                                >
                                    Calcular Tarifa
                                </button>
                            </form>
                        ) : (
                            <div className="relative z-10 animate-in is-revealed py-4">
                                {resultado?.tipo === 'calculado' ? (
                                    <div className="text-center">
                                        <div className="text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 border border-brand/40 bg-brand/10 inline-block mb-8 rounded-full shadow-[0_0_15px_rgba(114,47,55,0.3)]">
                                            Tu Tarifa Oficial
                                        </div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Estimado</div>

                                        <div className="text-7xl lg:text-8xl font-black text-white mb-4 tracking-tighter italic tabular-nums drop-shadow-2xl text-metallic-brand">
                                            ${resultado.precio.toFixed(2)}
                                        </div>

                                        <div className="text-[11px] font-black text-white mb-10 uppercase tracking-widest py-2">
                                            Tiempo estimado: <span className="text-gray-400">{resultado.tiempoEstimado}</span>
                                        </div>

                                        <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 px-8 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#1DA851] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-[0_15px_30px_rgba(37,211,102,0.3)] rounded-xl group cursor-pointer">
                                            <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                                            Reservar por WhatsApp
                                        </button>

                                        <button onClick={() => setShowResult(false)} className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer w-full">
                                            ← Nueva Cotización
                                        </button>
                                    </div>
                                ) : (
                                    <div className="bg-white/5 p-8 border-l-4 border-brand text-left backdrop-blur-sm shadow-2xl">
                                        <div className="font-black text-xs uppercase mb-3 text-metallic-brand tracking-widest flex items-center gap-2">
                                            <Zap size={16} /> Carga Corporativa
                                        </div>
                                        <p className="text-sm text-gray-300 mb-8 font-medium leading-relaxed">
                                            Los envíos mayores a 50kg requieren de una estructura operativa especial. Nuestro equipo B2B le asignará la tarifa más rentable y segura del mercado.
                                        </p>
                                        <button onClick={handleWhatsApp} className="btn-primary w-full justify-center py-5 uppercase tracking-[0.2em] text-[10px] rounded-xl cursor-pointer">
                                            <MessageSquare size={16} className="mr-2" />
                                            Contactar Equipo B2B
                                        </button>
                                        <button onClick={() => setShowResult(false)} className="w-full text-center mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                                            ← Nueva Cotización
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
