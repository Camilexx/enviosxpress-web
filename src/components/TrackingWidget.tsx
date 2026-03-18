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
    <section id="tracking" className="section bg-white border-t border-gray-100" aria-label="Rastrear envío">
      <div className="container-swiss">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8a1538]/10 text-[#8a1538] text-sm font-semibold mb-4">
            <Truck className="w-4 h-4" />
            Rastreo en Tiempo Real
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Rastrea tu envío
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Ingresa tu número de tracking para ver el estado actual de tu envío
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrack} className="max-w-2xl mx-auto mb-10">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Ej: ENV-2026-XXXXXXXX"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#8a1538]/30 focus:border-[#8a1538] transition-all font-mono tracking-wider"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !trackingNumber.trim()}
              className="px-8 py-4 bg-gradient-to-r from-[#8a1538] to-[#b91c48] text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-[#8a1538]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              Rastrear
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Result */}
        {result?.shipment && (
          <div className="max-w-3xl mx-auto">
            {/* Shipment Header */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Tracking Number</p>
                  <p className="text-2xl font-bold font-mono text-gray-900">{result.shipment.tracking_number}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${estadoColors[result.shipment.estado] || 'bg-gray-100 text-gray-800'}`}>
                  {estadoLabels[result.shipment.estado] || result.shipment.estado}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8a1538] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Origen</p>
                    <p className="text-sm font-bold text-gray-900">{result.shipment.origen}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Destino</p>
                    <p className="text-sm font-bold text-gray-900">{result.shipment.destino}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Tipo / Peso</p>
                    <p className="text-sm font-bold text-gray-900">{result.shipment.tipo} • {result.shipment.peso_kg}kg</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Creado</p>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(result.shipment.fecha_creacion).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            {result.events && result.events.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#8a1538]" />
                  Historial de Movimientos
                </h3>
                <div className="space-y-0">
                  {result.events.map((event, idx) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${idx === result.events!.length - 1 ? 'bg-[#8a1538] ring-4 ring-[#8a1538]/20' : 'bg-gray-300'}`} />
                        {idx < result.events!.length - 1 && <div className="w-0.5 h-12 bg-gray-200" />}
                      </div>
                      <div className="pb-8">
                        <p className="text-sm font-bold text-gray-900">{event.evento}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(event.evento_timestamp).toLocaleString('es-EC')}
                          {event.ubicacion && ` • ${event.ubicacion}`}
                        </p>
                        {event.observaciones && (
                          <p className="text-xs text-gray-400 mt-0.5 italic">{event.observaciones}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No events */}
            {(!result.events || result.events.length === 0) && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center text-gray-500">
                <Package className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">Este envío aún no tiene movimientos registrados.</p>
                <p className="text-sm mt-1">Los eventos se actualizan en tiempo real.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
