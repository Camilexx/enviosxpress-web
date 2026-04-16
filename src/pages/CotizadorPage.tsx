import { useState, useMemo } from 'react'
import { Calculator, Check, MessageSquare, Truck, Zap, ArrowRight } from 'lucide-react'

const CIUDADES_ECUADOR = [
    'Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Manta',
    'Machala', 'Portoviejo', 'Loja', 'Riobamba', 'Esmeraldas',
    'Ibarra', 'Santo Domingo', 'Latacunga', 'Babahoyo',
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

export default function CotizadorPage() {
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
        window.open(`https://wa.me/593967489002?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <main className="pt-24 min-h-screen bg-gray-50">
                {/* Hero */}
                <section className="bg-black text-white py-16 lg:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #722F37 0%, transparent 60%)' }} />
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                        <div className="inline-block border border-brand/40 bg-brand/10 text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-4 rounded-full">
                            Eficiencia Técnica
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black italic tracking-tighter uppercase mb-3 leading-[0.9]">
                            Cotizador <span className="text-brand">Instantáneo</span>
                        </h1>
                        <p className="text-gray-400 font-medium text-sm">
                            Tarifa exacta en segundos. Sin cargos ocultos.
                        </p>
                    </div>
                </section>

                {/* Cotizador full */}
                <section className="py-16 lg:py-24">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

                            {/* Left info */}
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-4 text-black">
                                        ¿Por qué <span className="text-brand">cotizar</span> con nosotros?
                                    </h2>
                                    <div className="space-y-4">
                                        {[
                                            'Recogida programada a domicilio',
                                            'Entrega puerta a puerta nacional',
                                            'Tarifas corporativas por volumen',
                                            'Seguridad y respaldo total',
                                            'Confirmación en tiempo real',
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

                                {/* Tabla de tarifas */}
                                <div>
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Tarifas Base</h3>
                                    <div className="space-y-2">
                                        {[
                                            { rango: 'Hasta 1 kg', std: '$3.50', exp: '$5.50' },
                                            { rango: '1 — 3 kg', std: '$4.50', exp: '$7.00' },
                                            { rango: '3 — 5 kg', std: '$6.00', exp: '$9.50' },
                                            { rango: '5 — 10 kg', std: '$8.50', exp: '$13.00' },
                                            { rango: '10 — 20 kg', std: '$12.00', exp: '$18.00' },
                                            { rango: '20 — 50 kg', std: '$18.00', exp: '$28.00' },
                                        ].map((t, i) => (
                                            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 text-sm">
                                                <span className="font-medium text-gray-600 text-[11px]">{t.rango}</span>
                                                <div className="flex gap-4">
                                                    <span className="font-black text-gray-500 text-[11px]">Std: {t.std}</span>
                                                    <span className="font-black text-brand text-[11px]">Exp: {t.exp}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest">
                                        +50kg → cotización corporativa
                                    </p>
                                </div>
                            </div>

                            {/* Right: Widget */}
                            <div className="lg:col-span-3 bg-black text-white p-10 lg:p-14 shadow-2xl relative overflow-hidden">
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand/30 rounded-full blur-3xl pointer-events-none" />

                                <div className="flex items-center gap-3 mb-10 pb-5 border-b border-white/10 relative z-10">
                                    <Calculator className="text-brand" size={24} />
                                    <h2 className="text-xs font-black uppercase tracking-widest text-white">Tarifa Inmediata</h2>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); setShowResult(true) }} className="space-y-8 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="page-origen" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Ciudad Origen</label>
                                            <select
                                                id="page-origen"
                                                value={origen}
                                                onChange={(e) => setOrigen(e.target.value)}
                                                className="w-full bg-white/5 border-b border-white/20 p-4 font-bold text-white focus:border-brand outline-none transition-colors cursor-pointer appearance-none"
                                            >
                                                <option value="" className="text-black">Seleccionar</option>
                                                {CIUDADES_ECUADOR.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="page-destino" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Ciudad Destino</label>
                                            <select
                                                id="page-destino"
                                                value={destino}
                                                onChange={(e) => setDestino(e.target.value)}
                                                className="w-full bg-white/5 border-b border-white/20 p-4 font-bold text-white focus:border-brand outline-none transition-colors cursor-pointer appearance-none"
                                            >
                                                <option value="" className="text-black">Seleccionar</option>
                                                {CIUDADES_ECUADOR.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="page-peso" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Peso Estimado (KG)</label>
                                        <input
                                            id="page-peso"
                                            type="number"
                                            value={peso}
                                            onChange={(e) => setPeso(e.target.value)}
                                            className="w-full bg-white/5 border-b border-white/20 p-4 font-bold text-white focus:border-brand outline-none transition-colors placeholder-white/30"
                                            placeholder="Ej: 5.0"
                                            min="0.1"
                                            step="0.1"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setTipo('estandar')}
                                            className={`flex-1 py-5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer ${tipo === 'estandar' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
                                        >
                                            <Truck size={14} /> Estándar — 24/48h
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setTipo('express')}
                                            className={`flex-1 py-5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer ${tipo === 'express' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
                                        >
                                            <Zap size={14} /> Express — 24h
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!resultado}
                                        className="btn-primary w-full justify-center py-5 uppercase tracking-[0.2em] text-xs mt-4 flex items-center gap-3"
                                    >
                                        Calcular Tarifa <ArrowRight size={16} />
                                    </button>
                                </form>

                                {showResult && resultado && (
                                    <div className="mt-8 pt-6 border-t border-white/20 text-center">
                                        {resultado.tipo === 'calculado' ? (
                                            <>
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Estimado</div>
                                                <div className="text-5xl font-black text-white mb-2 tracking-tighter italic tabular-nums drop-shadow-lg">
                                                    ${resultado.precio.toFixed(2)}
                                                </div>
                                                <div className="text-xs font-black text-brand mb-8 uppercase tracking-[0.2em]">
                                                    Tiempo estimado: {resultado.tiempoEstimado}
                                                </div>
                                                <button onClick={handleWhatsApp} className="btn-outline w-full justify-center py-4 cursor-pointer border-white text-white hover:bg-white hover:text-black flex items-center gap-2">
                                                    <MessageSquare size={16} />
                                                    Confirmar por WhatsApp
                                                </button>
                                            </>
                                        ) : (
                                            <div className="bg-white/5 p-6 border-l-4 border-brand text-left">
                                                <div className="font-black text-[10px] uppercase mb-3 text-brand tracking-widest">Carga Pesada Detectada</div>
                                                <p className="text-sm text-gray-300 mb-6 font-medium leading-relaxed">
                                                    Envíos mayores a 50kg requieren logística especial. Contacta a nuestro equipo corporativo.
                                                </p>
                                                <button onClick={handleWhatsApp} className="btn-primary w-full justify-center py-4 cursor-pointer flex items-center gap-2">
                                                    <MessageSquare size={16} />
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
        </main>
    )
}
