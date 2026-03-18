import { useState } from 'react'
import { Search, Package, MapPin, Clock, Truck, Loader2 } from 'lucide-react'
import { trackShipment, type TrackingResponse } from '../lib/supabase'

const estadoColors: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  recogido: 'bg-blue-100 text-blue-800',
  en_transito: 'bg-indigo-100 text-indigo-800',
  en_distribucion: 'bg-purple-100 text-purple-800',
  entregado: 'bg-green-100 text-green-800',
  devuelto: 'bg-red-100 text-red-800',
}

const estadoLabels: Record<string, string> = {
  pendiente: '📋 Pendiente de Recolección',
  recogido: '📦 Recogido',
  en_transito: '🚛 En Tránsito',
  en_distribucion: '🏍️ En Distribución Local',
  entregado: '✅ Entregado',
  devuelto: '↩️ Devuelto',
}

export default function TrackingWidget() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrackingResponse | null>(null)
  const [error, setError] = useState('')

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await trackShipment(trackingNumber.trim().toUpperCase())
      if (res.success) {
        setResult(res)
      } else {
        setError(res.error || 'Envío no encontrado. Verifica tu número de tracking.')
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="tracking" className="section bg-black border-t border-white/5 relative overflow-hidden" aria-label="Rastrear envío">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-swiss relative z-10">
        <div className="text-center mb-16 animate-in">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-[0_0_20px_rgba(114,47,55,0.2)]">
            <Truck className="w-4 h-4" />
            Rastreo en Tiempo Real
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic mb-4">
            RASTREA TU <span className="text-metallic-brand">ENVÍO</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto font-medium text-sm">
            Ingresa tu número de tracking para monitorear cada movimiento de tu paquete en vivo.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrack} className="max-w-3xl mx-auto mb-16 animate-in animate-delay-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand to-[#ff4d6d] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex flex-col md:flex-row gap-3 bg-black/50 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl">
              <div className="flex-1 relative flex items-center">
                <Search className="absolute left-6 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Ej: ENV-2026-XXXXXXXX"
                  className="w-full pl-16 pr-6 py-4 bg-transparent text-white text-lg placeholder-white/30 focus:outline-none focus:ring-0 font-mono tracking-wider font-bold"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !trackingNumber.trim()}
                className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-brand hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(114,47,55,0.6)] cursor-pointer"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                Rastrear
              </button>
            </div>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center font-bold text-sm backdrop-blur-md animate-in is-revealed">
            {error}
          </div>
        )}

        {/* Result */}
        {result?.shipment && (
          <div className="max-w-4xl mx-auto animate-in is-revealed space-y-6">
            {/* Shipment Header Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[80px] pointer-events-none rounded-full" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b border-white/10 relative z-10 gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Tracking Number</p>
                  <p className="text-3xl font-black font-mono text-white tracking-widest">{result.shipment.tracking_number}</p>
                </div>
                <div className="relative group">
                  <div className={`absolute -inset-1 rounded-full blur opacity-40 transition-opacity ${estadoColors[result.shipment.estado] ? 'bg-current' : ''}`} />
                  <span className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl inline-flex items-center gap-2 ${estadoColors[result.shipment.estado] || 'bg-white/10 text-white border border-white/20'}`}>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {estadoLabels[result.shipment.estado] || result.shipment.estado}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-brand">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Origen</p>
                  </div>
                  <p className="text-lg font-bold text-white pl-7">{result.shipment.origen}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#25D366]">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Destino</p>
                  </div>
                  <p className="text-lg font-bold text-white pl-7">{result.shipment.destino}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Package className="w-5 h-5 flex-shrink-0" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Paquete</p>
                  </div>
                  <p className="text-sm font-bold text-white pl-7 capitalize">{result.shipment.tipo}<br/><span className="text-gray-400 font-normal">{result.shipment.peso_kg}kg</span></p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Clock className="w-5 h-5 flex-shrink-0" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Solicitud</p>
                  </div>
                  <p className="text-sm font-bold text-white pl-7">
                    {new Date(result.shipment.fecha_creacion).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Events */}
            {result.events && result.events.length > 0 && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
                <h3 className="text-[11px] font-black text-white mb-10 uppercase tracking-[0.3em] flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand" />
                  Historial de Ruta
                  <div className="h-px bg-white/10 flex-1 ml-4" />
                </h3>
                
                <div className="space-y-0 relative">
                  <div className="absolute left-2.5 top-2 bottom-6 w-px bg-white/10" />
                  {result.events.map((event, idx) => {
                    const isLast = idx === result.events!.length - 1;
                    return (
                      <div key={event.id} className="relative pl-12 pb-10 group">
                        <div className={`absolute left-0 w-5 h-5 rounded-full flex items-center justify-center translate-x-[1px] transition-all duration-300 ${isLast ? 'bg-brand shadow-[0_0_15px_rgba(114,47,55,0.8)] scale-125' : 'bg-white/20'}`}>
                          {isLast && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                        </div>
                        
                        <div className={`bg-white/5 border ${isLast ? 'border-brand/40 shadow-[0_0_30px_rgba(114,47,55,0.1)]' : 'border-white/5'} rounded-2xl p-6 transition-all duration-300 hover:bg-white/10`}>
                          <p className={`text-lg font-black tracking-tight mb-2 ${isLast ? 'text-white' : 'text-gray-300'}`}>{event.evento}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-bold font-mono tracking-wider text-brand">
                            <span className="bg-brand/10 px-3 py-1 rounded inline-block">
                              {new Date(event.evento_timestamp).toLocaleString('es-EC')}
                            </span>
                            {event.ubicacion && (
                              <span className="text-gray-400 flex items-center gap-1">
                                <MapPin size={12} /> {event.ubicacion}
                              </span>
                            )}
                          </div>
                          {event.observaciones && (
                            <p className="text-sm text-gray-400 mt-4 italic border-l-2 border-white/20 pl-3">"{event.observaciones}"</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* No events */}
            {(!result.events || result.events.length === 0) && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center text-gray-500 shadow-2xl relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Package className="w-8 h-8 text-brand" />
                </div>
                <p className="font-bold text-white text-lg">Envío registrado sin movimientos</p>
                <p className="text-sm mt-2 font-medium">Los eventos se actualizarán aquí en tiempo real cuando el mensajero escanee el paquete.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
