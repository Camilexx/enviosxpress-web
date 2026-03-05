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
                            COTIZADOR <br /> INSTANTÁNEO
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
                    <div className="bg-black text-white p-8 lg:p-12 animate-in animate-delay-2 shadow-2xl relative overflow-hidden">
                        {/* Dramatic glow */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand/30 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center gap-3 mb-10 pb-5 border-b border-white/10 relative z-10">
                            <Calculator className="text-brand" size={24} aria-hidden="true" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">Tarifa Inmediata</h3>
                        </div>

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
                                    className={`flex-1 py-5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer ${tipo === 'estandar' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
                                >
                                    <Truck size={14} /> Estándar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTipo('express')}
                                    className={`flex-1 py-5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer ${tipo === 'express' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
                                >
                                    <Zap size={14} /> Express
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={!resultado}
                                className="btn-primary w-full justify-center py-5 uppercase tracking-[0.2em] text-xs mt-4"
                            >
                                Calcular Tarifa
                            </button>
                        </form>

                        {showResult && resultado && (
                            <div className="mt-8 pt-6 border-t border-white/20 text-center animate-in is-revealed">
                                {resultado.tipo === 'calculado' ? (
                                    <>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Estimado</div>
                                        <div className="text-6xl font-black text-white mb-2 tracking-tighter italic tabular-nums drop-shadow-lg">
                                            ${resultado.precio.toFixed(2)}
                                        </div>
                                        <div className="text-xs font-black text-brand mb-8 uppercase tracking-[0.2em]">
                                            Tiempo estimado: {resultado.tiempoEstimado}
                                        </div>
                                        <button onClick={handleWhatsApp} className="btn-outline w-full justify-center py-4 cursor-pointer border-white text-white hover:bg-white hover:text-black">
                                            <MessageSquare size={16} className="mr-2" />
                                            Confirmar por WhatsApp
                                        </button>
                                    </>
                                ) : (
                                    <div className="bg-white/5 p-6 border-l-4 border-brand text-left backdrop-blur-sm">
                                        <div className="font-black text-[10px] uppercase mb-3 text-brand tracking-widest">Carga Pesada Detectada</div>
                                        <p className="text-sm text-gray-300 mb-6 font-medium leading-relaxed">
                                            Envíos mayores a 50kg requieren logística especial. Contacte a nuestro equipo corporativo para una tarifa personalizada.
                                        </p>
                                        <button onClick={handleWhatsApp} className="btn-primary w-full justify-center py-4 cursor-pointer">
                                            <MessageSquare size={16} className="mr-2" />
                                            Contactar Soporte
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
