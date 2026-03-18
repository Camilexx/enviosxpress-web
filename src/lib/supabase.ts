import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const SUPABASE_FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || `${supabaseUrl}/functions/v1`

export interface QuoteResponse {
  success: boolean
  error?: string
  quote?: {
    origen: string
    destino: string
    zone_name: string
    city_tier: string
    shipment_type: string
    peso_kg: number
    tarifa_base: number
    recargo_peso: number
    descuento_zona: { pct: number; amount: number }
    descuento_plan: { pct: number; amount: number; plan: string | null }
    seguro: number
    precio_total: number
    tiempo_entrega: string
    aplica_zona_norte: boolean
    precio_sin_descuentos: number
  }
}

export async function getQuote(
  origen: string,
  destino: string,
  tipo: 'documento' | 'carga',
  peso?: number,
  conSeguro?: boolean,
  valorDeclarado?: number,
  planCode?: string
): Promise<QuoteResponse> {
  const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/quote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({
      origen,
      destino,
      tipo,
      peso: peso || 0,
      con_seguro: conSeguro || false,
      valor_declarado: valorDeclarado || 0,
      plan_code: planCode || null,
    }),
  })

  return response.json()
}

export interface TrackingResponse {
  success: boolean
  error?: string
  shipment?: {
    tracking_number: string
    estado: string
    origen: string
    destino: string
    tipo: string
    peso_kg: number
    precio_total: number
    fecha_creacion: string
    fecha_entrega: string | null
  }
  events?: Array<{
    id: number
    evento: string
    evento_timestamp: string
    ubicacion: string
    observaciones: string
  }>
}

export async function trackShipment(trackingNumber: string): Promise<TrackingResponse> {
  const response = await fetch(
    `${SUPABASE_FUNCTIONS_URL}/track?tracking=${encodeURIComponent(trackingNumber)}`,
    {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    }
  )
  return response.json()
}
