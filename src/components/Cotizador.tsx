import { useState, useMemo, useEffect } from 'react'
import { Calculator, Check, MessageSquare, Package, FileText, Shield, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

type TipoEnvio = 'documento' | 'carga'

type City = { name: string, province: string, zone_name: string, city_tier: string, delivery_time: string }
type Rate = { zone_name: string, city_tier: string, base_price: number, extra_kg_price_min: number, extra_kg_price_max: number, discount_pct: number }

export default function Cotizador() {
    const [origen, setOrigen] = useState('')
    const [destino, setDestino] = useState('')
    const [tipo, setTipo] = useState<TipoEnvio>('carga')
    const [peso, setPeso] = useState('1.0')
    const [conSeguro, setConSeguro] = useState(false)
    const [valorDeclarado, setValorDeclarado] = useState('')
    const [showResult, setShowResult] = useState(false)

    const [cities, setCities] = useState<City[]>([])
    const [rates, setRates] = useState<Rate[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const [cRes, rRes] = await Promise.all([
                supabase.from('cities').select('*').order('name'),
                supabase.from('shipping_rates').select('*').eq('is_active', true)
            ])
            if (cRes.data) setCities(cRes.data)
            if (rRes.data) setRates(rRes.data)
            setLoading(false)
        }
        loadData()
    }, [])

    const resultado = useMemo(() => {
        if (!origen || !destino || rates.length === 0 || cities.length === 0) return null

        const destCity = cities.find(c => c.name === destino)
        if (!destCity) return null

        // La tarifa se asienta en la zona y jerarquía del DESTINO
        const zone = destCity.zone_name
        const tier = destCity.city_tier

        const rate = rates.find(r => r.zone_name === zone && r.city_tier === tier)
        if (!rate) return null

        // Tarifa Base (hasta 5 kg)
        const tarifaBase = Number(rate.base_price)
        
        // Kilos adicionales (solo carga > 5kg)
        let recargoPeso = 0
        const pesoNum = tipo === 'carga' ? parseFloat(peso || '0') : 0
        
        if (pesoNum > 50) {
            return { tipo: 'personalizado' as const, precio: 0, tiempoEstimado: '' }
        }

        if (tipo === 'carga' && pesoNum > 5) {
            const kilosExtra = Math.ceil(pesoNum - 5)
            recargoPeso = kilosExtra * Number(rate.extra_kg_price_max) // Por defecto cobramos el max de esa zona
        }

        let total = tarifaBase + recargoPeso

        // Descuentos porcentuales configurados en base de datos (Ej: 30% Zona Norte)
        let descuento = 0
        if (rate.discount_pct > 0) {
            descuento = total * (rate.discount_pct / 100)
            total = total - descuento
        }

        // Seguro 1%
        let valorSeguro = 0
        const valorDecNum = parseFloat(valorDeclarado || '0')
        if (conSeguro && valorDecNum > 0) {
            valorSeguro = valorDecNum * 0.01
            total += valorSeguro
        }

        return {
            tipo: 'calculado' as const,
            tarifaBase,
            recargoPeso,
            descuento,
            valorSeguro,
            precio: total,
            tiempoEstimado: destCity.delivery_time || '24-48 horas',
        }
    }, [origen, destino, tipo, peso, conSeguro, valorDeclarado, cities, rates])

    const handleWhatsApp = () => {
        const message = `Hola EnviosXpress, solicito cotización:\nOrigen: ${origen}\nDestino: ${destino}\nTipo: ${tipo === 'carga' ? 'Carga (' + peso + 'kg)' : 'Documento'}${conSeguro ? '\nSeguro sobre: $' + valorDeclarado : ''}`
        window.open(`https://wa.me/593967489002?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <section id="cotizador" className="section bg-gray-50 border-t border-gray-100" aria-label="Cotizador de envíos">
            <div className="container-swiss">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left: Content */}
                    <div className="animate-in">
                        <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">Cotizador Oficial Inteligente</div>
                        <h2 className="text-4xl lg:text-6xl font-black text-black mb-6 leading-tight italic tracking-tighter">
                            COTIZA TU <br /> <span className="text-metallic-brand">ENVÍO AHORA</span>
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md font-medium text-base leading-relaxed">
                            Nuestras tarifas incluyen los 5 primeros kilos sin costo adicional. Precios fijos, rutas diarias aseguradas y descuentos automáticos (Ej: 30% en Zona Norte).
                        </p>

                        <div className="space-y-4">
                            {[
                                'Tarifa Plana Nacional (Hasta 5kg gratis)',
                                'Seguro opcional (1% s/ valor declarado)',
                                'Descuento 30% en Zona Norte',
                                'Planes 15% Dto. para Emprendedores'
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
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand/30 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center gap-3 mb-8 pb-5 border-b border-white/10 relative z-10">
                            <Calculator className="text-brand" size={24} aria-hidden="true" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">Tarifa en Tiempo Real</h3>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12 relative z-10">
                                <Loader2 className="w-8 h-8 text-brand animate-spin mb-4" />
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sincronizando Tarifas...</p>
                            </div>
                        ) : !showResult ? (
                            <form onSubmit={(e) => { e.preventDefault(); setShowResult(true) }} className="space-y-6 relative z-10">
                                
                                <div className="flex gap-4 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => setTipo('documento')}
                                        className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer ${tipo === 'documento' ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
                                    >
                                        <FileText size={14} /> Documento
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTipo('carga')}
                                        className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer ${tipo === 'carga' ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-transparent text-white border-white/20 hover:border-white/50'}`}
                                    >
                                        <Package size={14} /> Carga
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="cotizador-origen" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Ciudad Origen</label>
                                        <select id="cotizador-origen" value={origen} onChange={(e) => setOrigen(e.target.value)} required
                                            className="w-full bg-white/5 border-b border-white/20 p-3 font-bold text-white focus:border-brand outline-none transition-colors duration-200 cursor-pointer appearance-none">
                                            <option value="" className="text-black">Seleccionar</option>
                                            {cities.map(c => <option key={`orig_${c.name}`} value={c.name} className="text-black">{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="cotizador-destino" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Ciudad Destino</label>
                                        <select id="cotizador-destino" value={destino} onChange={(e) => setDestino(e.target.value)} required
                                            className="w-full bg-white/5 border-b border-white/20 p-3 font-bold text-white focus:border-brand outline-none transition-colors duration-200 cursor-pointer appearance-none">
                                            <option value="" className="text-black">Seleccionar</option>
                                            {cities.map(c => <option key={`dest_${c.name}`} value={c.name} className="text-black">{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {tipo === 'carga' && (
                                    <div>
                                        <label htmlFor="cotizador-peso" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Peso del Paquete (KG) - 5kg Gratis</label>
                                        <input
                                            id="cotizador-peso" type="number" value={peso} onChange={(e) => setPeso(e.target.value)} required
                                            className="w-full bg-white/5 border-b border-white/20 p-3 font-bold text-white focus:border-brand outline-none transition-colors placeholder-white/30"
                                            placeholder="Máximo 50kg" min="0.1" step="0.1"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center w-5 h-5 border border-white/30 rounded bg-white/5 group-hover:border-brand transition-colors">
                                            <input type="checkbox" className="opacity-0 absolute w-full h-full cursor-pointer" checked={conSeguro} onChange={(e) => setConSeguro(e.target.checked)} />
                                            {conSeguro && <Check size={12} className="text-brand absolute" strokeWidth={4} />}
                                        </div>
                                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Añadir Seguro (Recomendado)</span>
                                    </label>
                                    {conSeguro && (
                                        <div className="mt-3 flex items-center gap-3">
                                            <Shield size={16} className="text-brand flex-shrink-0" />
                                            <input
                                                type="number" value={valorDeclarado} onChange={(e) => setValorDeclarado(e.target.value)}
                                                placeholder="Ej: 100 (Valor del producto en $)"
                                                className="w-full bg-white/5 border-b border-brand/50 p-2 text-xs text-white outline-none"
                                            />
                                        </div>
                                    )}
                                </div>

                                <button type="submit" disabled={!origen || !destino} className="btn-primary w-full justify-center py-4 uppercase tracking-[0.2em] text-[11px] mt-4 disabled:opacity-50">
                                    Calcular Tarifa Oficial
                                </button>
                            </form>
                        ) : (
                            <div className="relative z-10 animate-in is-revealed">
                                {resultado?.tipo === 'calculado' ? (
                                    <div className="text-center">
                                        <div className="text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 border border-brand/40 bg-brand/10 inline-block mb-6 rounded-full shadow-[0_0_15px_rgba(114,47,55,0.3)]">
                                            Cotización Oficial
                                        </div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total a Pagar</div>
                                        <div className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter italic tabular-nums text-metallic-brand">
                                            ${resultado.precio.toFixed(2)}
                                        </div>

                                        <div className="space-y-2 mb-8 bg-white/5 p-4 rounded-xl border border-white/10 text-left">
                                            <div className="flex justify-between text-xs text-gray-300">
                                                <span>Tarifa Base (hasta 5kg):</span>
                                                <span className="font-bold text-white">${resultado.tarifaBase.toFixed(2)}</span>
                                            </div>
                                            {resultado.recargoPeso > 0 && (
                                                <div className="flex justify-between text-xs text-brand">
                                                    <span>Exceso de Peso:</span>
                                                    <span className="font-bold">+${resultado.recargoPeso.toFixed(2)}</span>
                                                </div>
                                            )}
                                            {resultado.descuento > 0 && (
                                                <div className="flex justify-between text-xs text-[#25D366]">
                                                    <span>Descuento aplicado:</span>
                                                    <span className="font-bold">-${resultado.descuento.toFixed(2)}</span>
                                                </div>
                                            )}
                                            {resultado.valorSeguro > 0 && (
                                                <div className="flex justify-between text-xs text-gray-300">
                                                    <span>Seguro (1% val. decl.):</span>
                                                    <span className="font-bold">+${resultado.valorSeguro.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="pt-2 mt-2 border-t border-white/10 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                <span>Tiempo Estimado:</span>
                                                <span className="text-white">{resultado.tiempoEstimado}</span>
                                            </div>
                                        </div>

                                        <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#1DA851] transition-all duration-300 shadow-[0_15px_30px_rgba(37,211,102,0.3)] rounded-xl cursor-pointer">
                                            <MessageSquare size={16} /> Cerrar Envío en WhatsApp
                                        </button>

                                        <button onClick={() => setShowResult(false)} className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer w-full">
                                            ← Nueva Cotización
                                        </button>
                                    </div>
                                ) : (
                                    <div className="bg-white/5 p-8 border-l-4 border-brand text-left">
                                        <div className="font-black text-xs uppercase mb-3 text-metallic-brand tracking-widest flex items-center gap-2">
                                            <Package size={16} /> Carga Corporativa Viva
                                        </div>
                                        <p className="text-sm text-gray-300 mb-6 font-medium leading-relaxed">
                                            Las cargas mayores a 50kg requieren estructura operativa especial. Solicite una tarifa bulk directamente a nuestro equipo.
                                        </p>
                                        <button onClick={handleWhatsApp} className="btn-primary w-full justify-center py-4 uppercase tracking-[0.2em] text-[10px] rounded-xl cursor-pointer">
                                            Contactar Equipo Carga
                                        </button>
                                        <button onClick={() => setShowResult(false)} className="w-full text-center mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
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
