export type CityTier = 'principal' | 'secundario' | 'especial' | 'ciudad'
export type ZoneName = 'norte' | 'oriente' | 'nacional'
export type ShipmentType = 'documento' | 'carga'

export interface TarifaBase {
  documento: number
  carga: number
  kg_adicional: number
}

export interface Tarifa {
  documento: number
  carga: number
  kg_adicional: number
  aplica_descuento_norte: boolean
}

export const ZONAS_NORTE = [
  'Tabacundo', 'Cayambe', 'Otavalo', 'Cotacachi', 'Atuntaqui', 'Ibarra', 'Tulcán'
]

export const PROVINCIAS_ORIENTE = [
  'Napo', 'Pastaza', 'Sucumbíos', 'Francisco de Orellana', 'Morona Santiago', 'Zamora Chinchipe'
]

export const CIUDADES_PRINCIPALES = [
  'Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Manta', 'Portoviejo',
  'Latacunga', 'Riobamba', 'Santo Domingo', 'Quevedo', 'Ibarra',
  'Tulcán', 'Lago Agrio', 'El Coca', 'Puyo', 'Tena', 'Esmeraldas'
]

export const TARIFAS_NACIONALES: Record<CityTier, TarifaBase> = {
  ciudad: {
    documento: 3.00,
    carga: 3.00,
    kg_adicional: 0.25
  },
  principal: {
    documento: 3.50,
    carga: 3.50,
    kg_adicional: 0.35
  },
  secundario: {
    documento: 4.00,
    carga: 4.00,
    kg_adicional: 0.45
  },
  especial: {
    documento: 5.00,
    carga: 5.00,
    kg_adicional: 0.50
  }
}

export const TARIFAS_ORIENTE: Record<CityTier, TarifaBase> = {
  principal: {
    documento: 5.00,
    carga: 5.00,
    kg_adicional: 0.45
  },
  secundario: {
    documento: 6.00,
    carga: 6.00,
    kg_adicional: 0.50
  },
  especial: {
    documento: 7.00,
    carga: 7.00,
    kg_adicional: 0.75
  },
  ciudad: {
    documento: 5.00,
    carga: 5.00,
    kg_adicional: 0.45
  }
}

export const DESCUENTO_ZONA_NORTE = 0.30
export const SEGURO_PORCENTAJE = 0.01
export const PESO_INCLUIDO_KG = 5

export function getZoneName(destino: string, provincia: string): ZoneName {
  const destinoNorm = destino.trim().toLowerCase()
  const provinciaNorm = provincia.trim().toUpperCase()
  
  if (ZONAS_NORTE.some(z => destinoNorm.includes(z.toLowerCase()))) {
    return 'norte'
  }
  
  if (PROVINCIAS_ORIENTE.some(p => provinciaNorm.includes(p))) {
    return 'oriente'
  }
  
  return 'nacional'
}

export function isZonaNorte(destino: string): boolean {
  const destinoNorm = destino.trim().toLowerCase()
  return ZONAS_NORTE.some(z => destinoNorm.includes(z.toLowerCase()))
}

export function getCityTier(
  origen: string,
  destino: string,
  cityTier: string
): CityTier {
  const origenNorm = origen.trim().toLowerCase()
  const destinoNorm = destino.trim().toLowerCase()
  
  if (origenNorm === destinoNorm) {
    return 'ciudad'
  }
  
  if (cityTier === 'PRINCIPAL') return 'principal'
  if (cityTier === 'SECUNDARIO') return 'secundario'
  if (cityTier === 'ESPECIAL') return 'especial'
  
  return 'secundario'
}

export function calcularTarifa(
  origen: string,
  destino: string,
  tipo: ShipmentType,
  pesoKg: number,
  zona: ZoneName,
  cityTier: CityTier,
  tienePlan: boolean,
  descuentoPlan: number,
  valorDeclarado: number
): {
  tarifa_base: number
  recargo_peso: number
  descuento_zona: { pct: number; amount: number }
  descuento_plan: { pct: number; amount: number }
  seguro: number
  precio_total: number
  precio_sin_descuentos: number
} {
  const tarifas = zona === 'oriente' ? TARIFAS_ORIENTE : TARIFAS_NACIONALES
  const tarifa = tarifas[cityTier]
  
  let precioBase = tipo === 'documento' ? tarifa.documento : tarifa.carga
  
  let recargoPeso = 0
  if (tipo === 'carga' && pesoKg > PESO_INCLUIDO_KG) {
    const kilosExtras = pesoKg - PESO_INCLUIDO_KG
    recargoPeso = kilosExtras * tarifa.kg_adicional
  }
  
  const precioSinDescuentos = precioBase + recargoPeso
  
  let descuentoZonaPct = 0
  if (zona === 'norte') {
    descuentoZonaPct = DESCUENTO_ZONA_NORTE
  }
  
  const descuentoZonaAmount = precioSinDescuentos * descuentoZonaPct
  
  let descuentoPlanAmount = 0
  let descuentoPlanPct = 0
  if (tienePlan && descuentoPlan > 0) {
    descuentoPlanPct = descuentoPlan
    const precioConDescuentoZona = precioSinDescuentos - descuentoZonaAmount
    descuentoPlanAmount = precioConDescuentoZona * descuentoPlanPct
  }
  
  const seguro = valorDeclarado > 0 ? valorDeclarado * SEGURO_PORCENTAJE : 0
  
  const precioTotal = precioSinDescuentos - descuentoZonaAmount - descuentoPlanAmount + seguro
  
  return {
    tarifa_base: precioBase,
    recargo_peso: recargoPeso,
    descuento_zona: {
      pct: descuentoZonaPct * 100,
      amount: descuentoZonaAmount
    },
    descuento_plan: {
      pct: descuentoPlanPct * 100,
      amount: descuentoPlanAmount
    },
    seguro,
    precio_total: Math.round(precioTotal * 100) / 100,
    precio_sin_descuentos: Math.round(precioSinDescuentos * 100) / 100
  }
}
