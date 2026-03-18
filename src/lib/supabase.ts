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

import { calcularTarifa, getCityTier, getZoneName, type ZoneName, type CityTier } from './tarifas'

export async function getQuote(
  origen: string,
  destino: string,
  tipo: 'documento' | 'carga',
  peso?: number,
  conSeguro?: boolean,
  valorDeclarado?: number,
  planCode?: string
): Promise<QuoteResponse> {
  try {
    const { data: cityData } = await supabase.from('cities').select('*').eq('name', destino).single()

    const zone_name = (cityData?.zone_name?.toLowerCase() || getZoneName(destino, 'N/A')) as ZoneName
    const city_tier = getCityTier(origen, destino, cityData?.city_tier?.toUpperCase() || 'SECUNDARIO') as CityTier
    const tiempo_entrega = cityData?.delivery_time || '24 a 48 HORAS'

    let descuento_plan_pct = 0
    if (planCode === 'emprendedor') descuento_plan_pct = 0.15
    if (planCode === 'empresa') descuento_plan_pct = 0.05 // Empresa 5% a 20% max

    const pesoNum = peso || 0
    const seguroVal = conSeguro ? (valorDeclarado || 0) : 0

    const calc = calcularTarifa(
      origen, destino, tipo, pesoNum, zone_name, city_tier,
      !!planCode, descuento_plan_pct, seguroVal
    )

    return {
      success: true,
      quote: {
        origen,
        destino,
        zone_name,
        city_tier,
        shipment_type: tipo,
        peso_kg: pesoNum,
        tarifa_base: calc.tarifa_base,
        recargo_peso: calc.recargo_peso,
        descuento_zona: calc.descuento_zona,
        descuento_plan: { pct: descuento_plan_pct * 100, amount: calc.descuento_plan.amount, plan: planCode || null },
        seguro: calc.seguro,
        precio_total: calc.precio_total,
        precio_sin_descuentos: calc.precio_sin_descuentos,
        tiempo_entrega,
        aplica_zona_norte: zone_name === 'norte'
      }
    }
  } catch (error) {
    console.error('Error in local getQuote:', error)
    return { success: false, error: 'Error al calcular cotización' }
  }
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
