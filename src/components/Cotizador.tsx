import { useState, useEffect, useMemo } from 'react'
import { Calculator, Check, MessageSquare, Package, FileText, Shield, Loader2, Zap, ChevronDown } from 'lucide-react'
import { supabase, getQuote, type QuoteResponse } from '../lib/supabase'

type TipoEnvio = 'documento' | 'carga'

type City = { name: string, province: string, zone_name: string, city_tier: string, delivery_time: string }

type Plan = {
  code: string
  name: string
  discount_pct: number
  min_monthly_shipments: number
}

export default function Cotizador() {
  const [origen, setOrigen] = useState('Quito')
  const [destino, setDestino] = useState('')
  const [tipo, setTipo] = useState<TipoEnvio>('carga')
  const [peso, setPeso] = useState('1.0')
  const [conSeguro, setConSeguro] = useState(false)
  const [valorDeclarado, setValorDeclarado] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')

  const [cities, setCities] = useState<City[]>([])
  const [planes, setPlanes] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [quoting, setQuoting] = useState(false)
  const [quoteResult, setQuoteResult] = useState<QuoteResponse | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const { data: cData } = await supabase.from('cities').select('*').eq('is_active', true).order('province').order('name')
      
      const hardcodedPlanes: Plan[] = [
        { code: 'emprendedor', name: 'Plan Emprendedor', discount_pct: 15, min_monthly_shipments: 20 },
        { code: 'empresa', name: 'Plan Empresa', discount_pct: 5, min_monthly_shipments: 60 }
      ]

      if (cData) setCities(cData)
      setPlanes(hardcodedPlanes)
      setSelectedPlan('emprendedor') // Auto-seleccionar Plan Emprendedor
      setLoading(false)
    }
    loadData()
  }, [])

  const citiesByProvince = useMemo(() => {
    const grouped: Record<string, City[]> = {}
    cities.forEach(city => {
      if (!grouped[city.province]) grouped[city.province] = []
      grouped[city.province].push(city)
    })
    return grouped
  }, [cities])

  const handleQuote = async () => {
    if (!destino) return

    setQuoting(true)
    setError('')
    setQuoteResult(null)

    try {
      const result = await getQuote(
        origen,
        destino,
        tipo,
        tipo === 'carga' ? parseFloat(peso) : 0,
        conSeguro,
        valorDeclarado ? parseFloat(valorDeclarado) : 0,
        selectedPlan || undefined
      )

      setQuoteResult(result)

      if (result.success) {
        setShowResult(true)
        
        // MEJORA: Guardar cotización y lead en Supabase
        try {
          const q = result.quote!
          // Guardar lead anónimo del web (se actualizará si contacta por WhatsApp)
          const leadId = `web_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
          await supabase.from('leads').upsert({
            phone: leadId,
            name: 'Visitante Web',
            city: q.destino,
            source: 'web_quote',
            status: 'nuevo',
            notes: `Cotización web: ${q.origen} → ${q.destino}, ${tipo}, $${q.precio_total.toFixed(2)}`,
            last_interaction: new Date().toISOString()
          }, { onConflict: 'phone' }).then(() => {})
        } catch (saveErr) {
          // No bloquear la UX si falla el guardado
          console.warn('No se pudo guardar la cotización:', saveErr)
        }
      } else {
        setError(result.error || 'Error al calcular cotización')
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setQuoting(false)
    }
  }

  const handleWhatsApp = () => {
    if (!quoteResult?.quote) return

    const q = quoteResult.quote
    const planText = selectedPlan ? `\nPlan: ${planes.find(p => p.code === selectedPlan)?.name || selectedPlan}` : ''
    const seguroText = conSeguro ? `\nSeguro sobre: $${valorDeclarado}` : ''

    const message = `Hola EnviosXpress, solicito envío:\nOrigen: ${q.origen}\nDestino: ${q.destino}\nTipo: ${tipo === 'carga' ? `Carga (${peso}kg)` : 'Documento'}${seguroText}${planText}\n\nYa tengo mi cotización: $${q.precio_total.toFixed(2)}`

    window.open(`https://wa.me/593967489002?text=${encodeURIComponent(message)}`, '_blank')
  }

  const groupedCities = useMemo(() => {
    const provinces = Object.keys(citiesByProvince).sort()
    return provinces.map(province => ({
      province,
      cities: citiesByProvince[province]
    }))
  }, [citiesByProvince])

  return (
    <section id="cotizador" className="section bg-gray-50 border-t border-gray-100" aria-label="Cotizador de envíos">
      <div className="container-swiss">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="animate-in">
            <div className="text-brand font-black text-[11px] uppercase tracking-[0.25em] mb-3">Cotizador Oficial Inteligente</div>
            <h2 className="text-4xl lg:text-6xl font-black text-black mb-6 leading-tight italic tracking-tighter">
              COTIZA TU <br /> <span className="text-metallic-brand">ENVÍO AHORA</span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-md font-medium text-base leading-relaxed">
              Tarifas fijas con 5kg incluidos. Descuentos automáticos en Zona Norte (30%) y Planes de Suscripción.
            </p>

            <div className="space-y-4">
              {[
                'Tarifa Plana Nacional (Hasta 5kg incluidos)',
                '30% descuento en Zona Norte',
                'Planes desde 15% descuento',
                'Seguro opcional (1% valor declarado)'
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

          <div className="bg-black text-white p-8 lg:p-12 animate-in animate-delay-2 shadow-2xl relative overflow-hidden rounded-[2rem]">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand/30 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-8 pb-5 border-b border-white/10 relative z-10">
              <Calculator className="text-brand" size={24} aria-hidden="true" />
              <h3 className="text-xs font-black uppercase tracking-widest text-white">Tarifa en Tiempo Real</h3>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 relative z-10">
                <Loader2 className="w-8 h-8 text-brand animate-spin mb-4" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Cargando ciudades...</p>
              </div>
            ) : !showResult ? (
              <form onSubmit={(e) => { e.preventDefault(); handleQuote() }} className="space-y-6 relative z-10">
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

                <div>
                  <label htmlFor="cotizador-origen" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Ciudad de Origen</label>
                  <select
                    id="cotizador-origen"
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                    required
                    className="w-full bg-white/5 border-b border-white/20 p-3 font-bold text-white focus:border-brand outline-none transition-colors duration-200 cursor-pointer appearance-none"
                  >
                    <option value="" className="text-black">Seleccionar origen</option>
                    {groupedCities.map(({ province, cities }) => (
                      <optgroup key={province} label={province} className="text-black">
                        {cities.map(c => (
                          <option key={`origin_${c.province}_${c.name}`} value={c.name} className="text-black">
                            {c.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="cotizador-destino" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Ciudad de Destino</label>
                  <select
                    id="cotizador-destino"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    required
                    className="w-full bg-white/5 border-b border-white/20 p-3 font-bold text-white focus:border-brand outline-none transition-colors duration-200 cursor-pointer appearance-none"
                  >
                    <option value="" className="text-black">Seleccionar destino</option>
                    {groupedCities.map(({ province, cities }) => (
                      <optgroup key={province} label={province} className="text-black">
                        {cities.map(c => (
                          <option key={`${c.province}_${c.name}`} value={c.name} className="text-black">
                            {c.name} {c.zone_name === 'norte' ? '(Norte -30%)' : c.zone_name === 'oriente' ? '(Oriente)' : ''}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {tipo === 'carga' && (
                  <div>
                    <label htmlFor="cotizador-peso" className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Peso (KG) - 5kg incluidos</label>
                    <input
                      id="cotizador-peso"
                      type="number"
                      value={peso}
                      onChange={(e) => setPeso(e.target.value)}
                      className="w-full bg-white/5 border-b border-white/20 p-3 font-bold text-white focus:border-brand outline-none transition-colors placeholder-white/30"
                      placeholder="Ej: 5.5"
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">¿Tienes Plan de Suscripción?</label>
                  <div className="relative">
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="w-full bg-white/5 border-b border-white/20 p-3 font-bold text-white focus:border-brand outline-none transition-colors cursor-pointer appearance-none"
                    >
                      <option value="" className="text-black">Sin plan (precio regular)</option>
                      {planes.map(plan => (
                        <option key={plan.code} value={plan.code} className="text-black">
                          {plan.name} {plan.code === 'empresa' ? '(5% a 20% dto por volumen)' : `(${plan.discount_pct}% dto)`}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 border border-white/30 rounded bg-white/5 group-hover:border-brand transition-colors">
                      <input type="checkbox" className="opacity-0 absolute w-full h-full cursor-pointer" checked={conSeguro} onChange={(e) => setConSeguro(e.target.checked)} />
                      {conSeguro && <Check size={12} className="text-brand absolute" strokeWidth={4} />}
                    </div>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Añadir Seguro (1%)</span>
                  </label>
                  {conSeguro && (
                    <div className="mt-3 flex items-center gap-3">
                      <Shield size={16} className="text-brand flex-shrink-0" />
                      <input
                        type="number"
                        value={valorDeclarado}
                        onChange={(e) => setValorDeclarado(e.target.value)}
                        placeholder="Valor del producto en $"
                        className="w-full bg-white/5 border-b border-brand/50 p-2 text-xs text-white outline-none"
                      />
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-red-400 text-xs font-bold">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!destino || quoting}
                  className="btn-primary w-full justify-center py-4 uppercase tracking-[0.2em] text-[11px] mt-4 disabled:opacity-50 flex items-center gap-2"
                >
                  {quoting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Calculando...
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      Calcular Tarifa
                    </>
                  )}
                </button>
              </form>
            ) : quoteResult?.quote ? (
              <div className="relative z-10 animate-in is-revealed">
                <div className="text-center">
                  <div className="text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 border border-brand/40 bg-brand/10 inline-block mb-6 rounded-full shadow-[0_0_15px_rgba(114,47,55,0.3)]">
                    Cotización Oficial
                  </div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total a Pagar</div>
                  <div className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter italic tabular-nums text-metallic-brand">
                    ${quoteResult.quote.precio_total.toFixed(2)}
                  </div>

                  <div className="space-y-2 mb-8 bg-white/5 p-4 rounded-xl border border-white/10 text-left">
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Origen:</span>
                      <span className="font-bold text-white">{quoteResult.quote.origen}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Destino:</span>
                      <span className="font-bold text-white">{quoteResult.quote.destino}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Zona:</span>
                      <span className="font-bold text-white capitalize">{quoteResult.quote.zone_name}</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-white/10 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <span>Tiempo Estimado:</span>
                      <span className="text-white">{quoteResult.quote.tiempo_entrega}</span>
                    </div>

                    {quoteResult.quote.tarifa_base > 0 && (
                      <>
                        <div className="pt-2 mt-2 border-t border-white/10 flex justify-between text-xs text-gray-300">
                          <span>Tarifa Base (5kg):</span>
                          <span className="font-bold text-white">${quoteResult.quote.tarifa_base.toFixed(2)}</span>
                        </div>
                        {quoteResult.quote.recargo_peso > 0 && (
                          <div className="flex justify-between text-xs text-brand">
                            <span>Exceso de Peso:</span>
                            <span className="font-bold">+${quoteResult.quote.recargo_peso.toFixed(2)}</span>
                          </div>
                        )}
                      </>
                    )}

                    {quoteResult.quote.descuento_zona.pct > 0 && (
                      <div className="flex justify-between text-xs text-[#25D366]">
                        <span>Descuento Zona ({quoteResult.quote.descuento_zona.pct}%):</span>
                        <span className="font-bold">-${quoteResult.quote.descuento_zona.amount.toFixed(2)}</span>
                      </div>
                    )}

                    {quoteResult.quote.descuento_plan.pct > 0 && (
                      <div className="flex justify-between text-xs text-[#25D366]">
                        <span>Descuento Plan ({quoteResult.quote.descuento_plan.pct}%):</span>
                        <span className="font-bold">-${quoteResult.quote.descuento_plan.amount.toFixed(2)}</span>
                      </div>
                    )}

                    {quoteResult.quote.seguro > 0 && (
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>Seguro (1%):</span>
                        <span className="font-bold">+${quoteResult.quote.seguro.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#1DA851] transition-all duration-300 shadow-[0_15px_30px_rgba(37,211,102,0.3)] rounded-xl cursor-pointer">
                    <MessageSquare size={16} /> Confirmar y Cerrar por WhatsApp
                  </button>

                  <button onClick={() => { setShowResult(false); setQuoteResult(null) }} className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer w-full">
                    ← Nueva Cotización
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
