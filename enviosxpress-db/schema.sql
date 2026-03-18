-- ═══════════════════════════════════════════════════════════════════════════
--  ENVIOSXPRESS - Schema de Base de Datos v3.1
--  Cobertura: 90+ ciudades Ecuador | Tarifas: Nacional, Norte (+30%), Oriente
--  Precios: Quito-Quito y Guayaquil-Guayaquil únicamente (mismo origen/destino)
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. ZONAS DE COBERTURA
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,           -- 'nacional', 'norte', 'oriente'
    display_name TEXT NOT NULL,           -- 'Nacional', 'Zona Norte (+30%)', 'Oriente'
    discount_pct DECIMAL(5,2) DEFAULT 0, -- Descuento automático (30% para Norte)
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Zonas base
INSERT INTO zones (name, display_name, discount_pct, description) VALUES
    ('nacional', 'Nacional', 0, 'Todo Ecuador excepto Zona Norte y Oriente'),
    ('norte', 'Zona Norte', 30, 'Ibarra, Otavalo, Cotacachi, Atuntaqui, Cayambe, Tabacundo, Tulcán'),
    ('oriente', 'Oriente', 0, 'Tena, Lago Agrio, Puyo, El Coca, Macas, Zamora')
ON CONFLICT (name) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. CIUDADES COBERTURA (90+ ciudades Ecuador)
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    province TEXT NOT NULL,
    zone_name TEXT NOT NULL REFERENCES zones(name),
    city_tier TEXT NOT NULL,             -- 'principal', 'secundaria', 'especial'
    delivery_time TEXT,                  -- '24 horas', '48 horas', 'Martes y Jueves', etc.
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(name, province)
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_cities_zone ON cities(zone_name);
CREATE INDEX idx_cities_tier ON cities(city_tier);
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_cities_province ON cities(province);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. TARIFAS BASE POR ZONA Y TIPO
-- ═══════════════════════════════════════════════════════════════════════════
-- Nota: Precios aplican para envíos Quito-Quito y Guayaquil-Guayaquil
-- Peso base: 5kg incluido | Kg adicional: $0.25-$0.75 según zona
CREATE TABLE IF NOT EXISTS shipping_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_name TEXT NOT NULL REFERENCES zones(name),
    shipment_type TEXT NOT NULL,         -- 'documento', 'carga'
    city_tier TEXT NOT NULL,             -- 'principal', 'secundaria', 'especial'
    base_price DECIMAL(10,2) NOT NULL,   -- Hasta 5kg
    extra_kg_price_min DECIMAL(10,2) DEFAULT 0.25,  -- Kg adicional (mínimo)
    extra_kg_price_max DECIMAL(10,2) DEFAULT 0.75,  -- Kg adicional (máximo)
    is_active BOOLEAN DEFAULT true,
    valid_from DATE DEFAULT CURRENT_DATE,
    valid_until DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(zone_name, shipment_type, city_tier)
);

-- Índices
CREATE INDEX idx_rates_zone_type ON shipping_rates(zone_name, shipment_type, city_tier);

-- Tarifas por defecto (se actualizan desde ENVIOSXPRESS_Guia_v3.1)
-- Nacional Principal: $3.00 documento, $4.00 carga
-- Nacional Secundaria: $4.00 documento, $5.00 carga  
-- Nacional Especial: $5.00 documento, $6.00 carga
-- Oriente Principal: $5.00 documento, $6.00 carga
-- Norte: 30% dto sobre Nacional (aplicado automáticamente por zona)

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. PLANES DE SUSCRIPCIÓN
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,           -- 'emprendedor', 'empresarial_50', 'empresarial_100', etc.
    name TEXT NOT NULL,                  -- 'Plan Emprendedor', 'Plan Empresarial 50+'
    description TEXT,
    discount_pct DECIMAL(5,2) NOT NULL,  -- 15% para emprendedor, 10-30% para empresarial
    min_monthly_shipments INTEGER NOT NULL,  -- 10, 50, 100, 200, 500, 801
    max_monthly_shipments INTEGER,        -- NULL = ilimitado
    includes_pickup BOOLEAN DEFAULT false,    -- Recojo gratis
    includes_insurance BOOLEAN DEFAULT false, -- Seguro incluido
    has_dedicated_agent BOOLEAN DEFAULT false, -- Gerente de cuenta
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Planes base
INSERT INTO subscription_plans (code, name, description, discount_pct, min_monthly_shipments, max_monthly_shipments, includes_pickup, has_dedicated_agent) VALUES
    ('emprendedor', 'Plan Emprendedor', 'Para pequeños emprendedores', 15, 10, 49, true, false),
    ('empresarial_50', 'Plan Empresarial 50+', 'Para empresas medianas', 10, 50, 99, true, false),
    ('empresarial_100', 'Plan Empresarial 100+', 'Para empresas grandes', 15, 100, 199, true, true),
    ('empresarial_200', 'Plan Empresarial 200+', 'Para empresas grandes', 20, 200, 499, true, true),
    ('empresarial_500', 'Plan Empresarial 500+', 'Para empresas corporativas', 25, 500, 800, true, true),
    ('empresarial_801', 'Plan Corporativo', 'Para grandes volúmenes', 30, 801, NULL, true, true)
ON CONFLICT (code) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. LEADS / CLIENTES
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT UNIQUE NOT NULL,
    name TEXT,
    email TEXT,
    company_name TEXT,
    city TEXT,
    volume_segment TEXT CHECK (volume_segment IN ('individual', 'emprendedor', 'pequeno', 'mediano', 'grande', 'corporativo')),
    current_plan_id UUID REFERENCES subscription_plans(id),
    source TEXT NOT NULL DEFAULT 'organic',  -- 'organic', 'meta_ads', 'google_ads', 'web_quote', 'whatsapp_bot'
    status TEXT NOT NULL DEFAULT 'nuevo' CHECK (status IN ('nuevo', 'en_conversacion', 'cotizado', 'agendado', 'cliente', 'descartado')),
    notes TEXT,
    assigned_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_interaction TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_volume ON leads(volume_segment);

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. HISTORIAL DE CHAT (CRM)
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_phone TEXT NOT NULL REFERENCES leads(phone),
    message_in TEXT NOT NULL,
    response_out TEXT,
    message_type TEXT DEFAULT 'incoming',  -- 'incoming', 'outgoing', 'system'
    detected_intent TEXT,  -- 'cotizacion', 'informacion', 'cierre', 'objecion', 'descarte'
    extracted_data JSONB,  -- {origen, destino, tipo, peso, valor_declarado}
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_chat_lead ON chat_history(lead_phone);
CREATE INDEX idx_chat_created ON chat_history(created_at);

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. ENVÍOS / SHIPMENTS
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_number TEXT UNIQUE NOT NULL,  -- Generated: ENV-2026-XXXXXXXX
    lead_id UUID REFERENCES leads(id),
    origen_city TEXT NOT NULL,
    destino_city TEXT NOT NULL,
    origen_zone TEXT NOT NULL,
    destino_zone TEXT NOT NULL,
    shipment_type TEXT NOT NULL CHECK (shipment_type IN ('documento', 'carga')),
    peso_kg DECIMAL(10,2),
    valor_declarado DECIMAL(12,2),
    con_seguro BOOLEAN DEFAULT false,
    precio_base DECIMAL(10,2) NOT NULL,
    descuento_zona DECIMAL(10,2) DEFAULT 0,
    descuento_plan DECIMAL(10,2) DEFAULT 0,
    recargo_peso DECIMAL(10,2) DEFAULT 0,
    seguro DECIMAL(10,2) DEFAULT 0,
    precio_total DECIMAL(10,2) NOT NULL,
    plan_aplicado TEXT,  -- 'emprendedor', 'empresarial_50', etc.
    estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'recogido', 'en_transito', 'en_ruta', 'entregado', 'devuelto', 'cancelado')),
    observaciones TEXT,
    fecha_envio DATE,
    fecha_entrega DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_shipments_tracking ON shipments(tracking_number);
CREATE INDEX idx_shipments_estado ON shipments(estado);
CREATE INDEX idx_shipments_lead ON shipments(lead_id);

-- Función para generar tracking number
CREATE OR REPLACE FUNCTION generate_tracking_number()
RETURNS TEXT AS $$
DECLARE
    year_part TEXT;
    random_part TEXT;
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    random_part := LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0');
    RETURN 'ENV-' || year_part || '-' || random_part;
END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. SEGUIMIENTO DE ENVÍOS (EVENTOS)
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS shipment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
    estado TEXT NOT NULL,  -- 'recogido', 'en_transito', 'en_ruta', 'entregado'
    ubicacion TEXT,
    observaciones TEXT,
    evento_timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice
CREATE INDEX idx_events_shipment ON shipment_events(shipment_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. EVENTOS DEL BOT (MONITOREO)
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS bot_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    reason TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice
CREATE INDEX idx_bot_events_type ON bot_events(event_type);

-- ─────────────────────────────────────────────────────────────────────────────
-- 10. PROMOCIONES / CUPONES
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    discount_pct DECIMAL(5,2),
    discount_fixed DECIMAL(10,2),
    min_order_value DECIMAL(10,2),
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 11. CONFIGURACIÓN DEL SISTEMA
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS system_config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configuración inicial
INSERT INTO system_config (key, value, description) VALUES
    ('company', '{"name": "EnviosXpress", "phone": "+593967489002", "whatsapp": "593967489002", "email": "info@enviosxpress.ec"}', 'Datos de la empresa'),
    ('pricing', '{"peso_base_kg": 5, "seguro_pct": 1, "zona_norte_discount": 30}', 'Parámetros de precios'),
    ('business_hours', '{"days": [1,2,3,4,5,6], "start": "07:00", "end": "20:00", "timezone": "America/Guayaquil"}', 'Horario de atención')
ON CONFLICT (key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- 12. VIEW: COTIZACIÓN RÁPIDA (para Edge Functions)
-- ═══════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE VIEW v_cotizacion AS
SELECT 
    c.name AS ciudad,
    c.province,
    c.zone_name,
    c.city_tier,
    c.delivery_time,
    r.base_price AS precio_base_documento,
    r.base_price * 1.33 AS precio_base_carga,  -- Carga ~33% más caro
    r.extra_kg_price_min,
    r.extra_kg_price_max,
    z.discount_pct AS descuento_zona_pct
FROM cities c
LEFT JOIN zones z ON c.zone_name = z.name
LEFT JOIN shipping_rates r ON c.zone_name = r.zone_name 
    AND r.shipment_type = 'documento' 
    AND r.city_tier = c.city_tier
WHERE c.is_active = true
ORDER BY c.province, c.name;

-- ═══════════════════════════════════════════════════════════════════════════
-- 13. VIEW: RESUMEN DE ZONAS
-- ═══════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE VIEW v_zonas_resumen AS
SELECT 
    z.name,
    z.display_name,
    z.discount_pct,
    COUNT(c.id) AS ciudades_count,
    COUNT(DISTINCT c.province) AS provincias_count
FROM zones z
LEFT JOIN cities c ON z.name = c.zone_name AND c.is_active = true
GROUP BY z.id, z.name, z.display_name, z.discount_pct
ORDER BY z.display_name;

-- ═══════════════════════════════════════════════════════════════════════════
-- 14. FUNCION: CALCULAR PRECIO DE ENVÍO
-- ═══════════════════════════════════════════════════════════════════════════
-- Esta función centraliza TODA la lógica de precios
-- p_origen: ciudad de origen (para detectar envíos ciudad-ciudad)
-- p_destino: ciudad de destino
-- p_tipo: 'documento' o 'carga'
-- p_peso: peso en kg
-- p_con_seguro: true/false
-- p_valor_declarado: valor declarado para seguro
-- p_plan_code: código de plan de suscripción
-- apply_plan_discount: true/false - aplicar descuento de plan
CREATE OR REPLACE FUNCTION calculate_shipping_price(
    p_origen TEXT DEFAULT 'Quito',
    p_destino TEXT,
    p_tipo TEXT,           -- 'documento' o 'carga'
    p_peso DECIMAL(10,2), -- peso en kg
    p_con_seguro BOOLEAN DEFAULT false,
    p_valor_declarado DECIMAL(12,2) DEFAULT 0,
    p_plan_code TEXT DEFAULT NULL  -- 'emprendedor', 'empresarial_50', etc.
)
RETURNS TABLE (
    success BOOLEAN,
    error_message TEXT,
    origen TEXT,
    destino TEXT,
    zone_name TEXT,
    city_tier TEXT,
    shipment_type TEXT,
    peso_kg DECIMAL(10,2),
    tarifa_base DECIMAL(10,2),
    recargo_peso DECIMAL(10,2),
    descuento_zona_pct DECIMAL(5,2),
    descuento_zona_amount DECIMAL(10,2),
    descuento_plan_pct DECIMAL(5,2),
    descuento_plan_amount DECIMAL(10,2),
    seguro DECIMAL(10,2),
    precio_total DECIMAL(10,2),
    tiempo_entrega TEXT,
    aplica_zona_norte BOOLEAN,
    plan_aplicado TEXT,
    precio_sin_descuentos DECIMAL(10,2)
) AS $$
DECLARE
    v_city RECORD;
    v_rate RECORD;
    v_zone RECORD;
    v_plan RECORD;
    v_tarifa_base DECIMAL(10,2);
    v_recargo_peso DECIMAL(10,2) := 0;
    v_descuento_zona_pct DECIMAL(5,2) := 0;
    v_descuento_zona_amount DECIMAL(10,2) := 0;
    v_descuento_plan_pct DECIMAL(5,2) := 0;
    v_descuento_plan_amount DECIMAL(10,2) := 0;
    v_seguro DECIMAL(10,2) := 0;
    v_precio_sin_descuentos DECIMAL(10,2);
    v_precio_total DECIMAL(10,2);
    v_peso_calculado DECIMAL(10,2);
    v_kilos_extra INTEGER;
    v_origen RECORD;
    v_es_envio_ciudad BOOLEAN := false;
    v_city_tier_final TEXT;
BEGIN
    -- Validar origen
    SELECT * INTO v_origen 
    FROM cities 
    WHERE name ILIKE p_origen AND is_active = true
    LIMIT 1;
    
    -- Si origen no existe, usar valor por defecto
    IF NOT FOUND THEN
        v_origen := ROW(NULL, 'Quito', 'Pichincha', 'nacional', 'principal', '24 horas', true)::cities;
    END IF;
    
    -- Validar destino
    SELECT * INTO v_city 
    FROM cities 
    WHERE name ILIKE p_destino AND is_active = true
    LIMIT 1;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT 
            false, 
            'Ciudad de destino no encontrada: ' || p_destino, 
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL;
        RETURN;
    END IF;

    -- Determinar si es envío ciudad-ciudad (mismo ciudad)
    -- Normalizar nombres para comparación
    v_es_envio_ciudad := LOWER(TRIM(v_origen.name)) = LOWER(TRIM(v_city.name));
    
    -- Determinar el tier final: si es ciudad-ciudad, usar 'ciudad', sino usar el tier de la ciudad
    IF v_es_envio_ciudad THEN
        v_city_tier_final := 'ciudad';
    ELSE
        v_city_tier_final := v_city.city_tier;
    END IF;

    -- Obtener zona
    SELECT * INTO v_zone FROM zones WHERE name = v_city.zone_name;
    
    -- Obtener tarifa usando el tier determinado
    SELECT * INTO v_rate 
    FROM shipping_rates 
    WHERE zone_name = v_city.zone_name 
        AND shipment_type = p_tipo 
        AND city_tier = v_city_tier_final
        AND is_active = true
    LIMIT 1;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT 
            false, 
            'Tarifa no encontrada para zona ' || v_city.zone_name || ' tipo ' || p_tipo || ' tier ' || v_city_tier_final, 
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL;
        RETURN;
    END IF;

    -- Calcular tarifa base
    v_tarifa_base := v_rate.base_price;
    
    -- Calcular recargo por peso (solo si tipo = carga y peso > 5kg)
    v_peso_calculado := COALESCE(p_peso, 0);
    IF p_tipo = 'carga' AND v_peso_calculado > 5 THEN
        v_kilos_extra := CEIL(v_peso_calculado - 5);
        v_recargo_peso := v_kilos_extra * v_rate.extra_kg_price_max;
    END IF;

    -- Precio sin descuentos
    v_precio_sin_descuentos := v_tarifa_base + v_recargo_peso;

    -- Descuento de zona (aplica primero)
    IF v_zone.discount_pct > 0 THEN
        v_descuento_zona_pct := v_zone.discount_pct;
        v_descuento_zona_amount := v_precio_sin_descuentos * (v_descuento_zona_pct / 100);
    END IF;

    -- Descuento de plan (aplica después del descuento de zona)
    IF p_plan_code IS NOT NULL THEN
        SELECT * INTO v_plan 
        FROM subscription_plans 
        WHERE code = p_plan_code AND is_active = true;
        
        IF FOUND THEN
            v_descuento_plan_pct := v_plan.discount_pct;
            -- El descuento de plan se aplica sobre el precio DESPUÉS del descuento de zona
            v_descuento_plan_amount := (v_precio_sin_descuentos - v_descuento_zona_amount) * (v_descuento_plan_pct / 100);
        END IF;
    END IF;

    -- Seguro (1% del valor declarado)
    IF p_con_seguro AND p_valor_declarado > 0 THEN
        v_seguro := p_valor_declarado * 0.01;
    END IF;

    -- Precio total final
    v_precio_total := v_precio_sin_descuentos - v_descuento_zona_amount - v_descuento_plan_amount + v_seguro;

    -- Retornar resultado
    RETURN QUERY SELECT 
        true,
        NULL::TEXT,
        'Quito'::TEXT,  -- Origen fijo según especificación
        v_city.name::TEXT,
        v_city.zone_name::TEXT,
        v_city.city_tier::TEXT,
        p_tipo::TEXT,
        v_peso_calculado,
        v_tarifa_base,
        v_recargo_peso,
        v_descuento_zona_pct,
        v_descuento_zona_amount,
        v_descuento_plan_pct,
        v_descuento_plan_amount,
        v_seguro,
        ROUND(v_precio_total::NUMERIC, 2),
        v_city.delivery_time::TEXT,
        (v_zone.name = 'norte')::BOOLEAN,
        COALESCE(v_plan.code, NULL::TEXT),
        v_precio_sin_descuentos;
    
EXCEPTION WHEN OTHERS THEN
    RETURN QUERY SELECT 
        false, 
        'Error calculando precio: ' || SQLERRM, 
        NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL;
END;
$$ LANGUAGE plpgsql;

-- ═══════════════════════════════════════════════════════════════════════════
-- 15. SEED: CIudades (basado en ENVIOSXPRESS_Guia_v3.1 y Excel Cobertura)
-- ═══════════════════════════════════════════════════════════════════════════
DO $$
DECLARE
    cities_data TEXT[][] := ARRAY[
        -- PICHINCHA (Quito - Nacional + Cayambe/Tabacundo Zona Norte)
        ARRAY['Quito', 'Pichincha', 'nacional', 'principal', '24 horas'],
        ARRAY['Calderón (Carapungo)', 'Pichincha', 'nacional', 'principal', '24 horas'],
        ARRAY['Cumbayá', 'Pichincha', 'nacional', 'secundaria', '24 horas'],
        ARRAY['Tumbaco', 'Pichincha', 'nacional', 'secundaria', '24 horas'],
        ARRAY['Sangolquí', 'Pichincha', 'nacional', 'secundaria', '24 horas'],
        ARRAY['Conocoto', 'Pichincha', 'nacional', 'secundaria', '24 horas'],
        ARRAY['San Rafael', 'Pichincha', 'nacional', 'secundaria', '24 horas'],
        ARRAY['Pomasqui', 'Pichincha', 'nacional', 'secundaria', '24 horas'],
        ARRAY['San Antonio de Quito', 'Pichincha', 'nacional', 'secundaria', '24 horas'],
        ARRAY['Cayambe', 'Pichincha', 'norte', 'principal', '24 horas'],
        ARRAY['Tabacundo', 'Pichincha', 'norte', 'secundario', '24 horas'],

        -- GUAYAS (Guayaquil - Nacional Principal)
        ARRAY['Guayaquil', 'Guayas', 'nacional', 'principal', '24 horas'],
        ARRAY['Durán', 'Guayas', 'nacional', 'secundario', '48-72 horas'],
        ARRAY['Samborondón', 'Guayas', 'nacional', 'secundario', '48 horas'],
        ARRAY['Milagro', 'Guayas', 'nacional', 'especial', 'Martes, Jueves, Sábado'],
        ARRAY['Pascuales', 'Guayas', 'nacional', 'especial', '48-72 horas'],
        ARRAY['La Puntilla', 'Guayas', 'nacional', 'especial', '48-72 horas'],

        -- IMBABURA (Zona Norte)
        ARRAY['Ibarra', 'Imbabura', 'norte', 'principal', '24 horas'],
        ARRAY['Atuntaqui', 'Imbabura', 'norte', 'principal', '24 horas'],
        ARRAY['Otavalo', 'Imbabura', 'norte', 'principal', '24 horas'],
        ARRAY['San Antonio de Ibarra', 'Imbabura', 'norte', 'secundario', '24 horas'],
        ARRAY['Cotacachi', 'Imbabura', 'norte', 'especial', 'Martes y Jueves'],
        ARRAY['Antonio Ante', 'Imbabura', 'norte', 'especial', '48 horas'],

        -- CARCHI (Zona Norte)
        ARRAY['Tulcán', 'Carchi', 'norte', 'secundario', '24 horas'],
        ARRAY['González Suárez', 'Carchi', 'norte', 'secundario', '24 horas'],
        ARRAY['Bolívar', 'Carchi', 'norte', 'especial', '24 horas'],
        ARRAY['Huaca', 'Carchi', 'norte', 'especial', '24-48 horas'],
        ARRAY['San Gabriel', 'Carchi', 'norte', 'especial', '24-48 horas'],
        ARRAY['Julio Andrade', 'Carchi', 'norte', 'especial', '24-48 horas'],
        ARRAY['Mira', 'Carchi', 'norte', 'especial', '24-48 horas'],

        -- AZUAY
        ARRAY['Cuenca', 'Azuay', 'nacional', 'principal', '24 horas'],
        ARRAY['Baños (Azuay)', 'Azuay', 'nacional', 'secundario', '48 horas'],
        ARRAY['Ricaurte', 'Azuay', 'nacional', 'secundario', '48 horas'],
        ARRAY['San Joaquín', 'Azuay', 'nacional', 'secundario', '48 horas'],
        ARRAY['Santa Ana', 'Azuay', 'nacional', 'especial', '48-72 horas'],
        ARRAY['Gualaceo', 'Azuay', 'nacional', 'especial', '48-72 horas'],

        -- COTOPAXI
        ARRAY['Latacunga', 'Cotopaxi', 'nacional', 'principal', '24 horas'],
        ARRAY['Salcedo', 'Cotopaxi', 'nacional', 'especial', '72 horas'],
        ARRAY['Saquisilí', 'Cotopaxi', 'nacional', 'especial', 'Lunes'],

        -- CHIMBORAZO
        ARRAY['Riobamba', 'Chimborazo', 'nacional', 'principal', '24 horas'],

        -- TUNGURAHUA
        ARRAY['Ambato', 'Tungurahua', 'nacional', 'principal', '24 horas'],
        ARRAY['Baños de Agua Santa', 'Tungurahua', 'nacional', 'secundario', '24-48 horas'],
        ARRAY['Pelileo', 'Tungurahua', 'nacional', 'secundario', '24-48 horas'],

        -- MANABÍ
        ARRAY['Manta', 'Manabí', 'nacional', 'principal', '24 horas (después 13h)'],
        ARRAY['Portoviejo', 'Manabí', 'nacional', 'principal', '24 horas'],
        ARRAY['Chone', 'Manabí', 'nacional', 'principal', '24 horas'],
        ARRAY['El Carmen', 'Manabí', 'nacional', 'principal', '24 horas'],
        ARRAY['Montecristi', 'Manabí', 'nacional', 'principal', '24 horas'],

        -- LOS RÍOS
        ARRAY['Quevedo', 'Los Ríos', 'nacional', 'principal', '24 horas'],
        ARRAY['Buena Fe', 'Los Ríos', 'nacional', 'secundario', '24 horas'],
        ARRAY['Valencia', 'Los Ríos', 'nacional', 'secundario', '24 horas'],
        ARRAY['La Maná', 'Los Ríos', 'nacional', 'secundario', '24 horas'],
        ARRAY['Babahoyo', 'Los Ríos', 'nacional', 'especial', 'Martes, Jueves, Sábado'],

        -- ESMERALDAS
        ARRAY['Esmeraldas', 'Esmeraldas', 'nacional', 'principal', '24 horas'],
        ARRAY['Tonsupa', 'Esmeraldas', 'nacional', 'secundario', '24 horas'],
        ARRAY['Atacames', 'Esmeraldas', 'nacional', 'secundario', '24 horas'],

        -- EL ORO
        ARRAY['Machala', 'El Oro', 'nacional', 'secundario', '24-48 horas'],

        -- LOJA
        ARRAY['Loja', 'Loja', 'nacional', 'secundario', '48 horas'],

        -- SANTO DOMINGO
        ARRAY['Santo Domingo', 'Santo Domingo', 'nacional', 'principal', '24 horas'],
        ARRAY['El Carmen (SD)', 'Santo Domingo', 'nacional', 'secundario', '24-48 horas'],
        ARRAY['La Concordia', 'Santo Domingo', 'nacional', 'secundario', '24-48 horas'],

        -- ORIENTE - SUCUMBÍOS
        ARRAY['Lago Agrio', 'Sucumbíos', 'oriente', 'principal', '24 horas'],
        ARRAY['Shushufindi', 'Sucumbíos', 'oriente', 'secundario', '24 horas'],
        ARRAY['Cascales', 'Sucumbíos', 'oriente', 'especial', '24-48 horas'],

        -- ORIENTE - FRANCISCO DE ORELLANA
        ARRAY['El Coca', 'Francisco de Orellana', 'oriente', 'principal', '24 horas'],
        ARRAY['Joya de los Sachas', 'Francisco de Orellana', 'oriente', 'secundario', '24 horas'],

        -- ORIENTE - NAPO
        ARRAY['Tena', 'Napo', 'oriente', 'principal', 'Martes y Jueves'],
        ARRAY['Baeza', 'Napo', 'oriente', 'secundario', 'Martes y Jueves'],
        ARRAY['Archidona', 'Napo', 'oriente', 'especial', 'Martes y Jueves'],

        -- ORIENTE - PASTAZA
        ARRAY['Puyo', 'Pastaza', 'oriente', 'principal', 'Martes y Jueves'],
        ARRAY['Shell', 'Pastaza', 'oriente', 'secundario', 'Martes y Jueves'],

        -- CAÑAR
        ARRAY['Azogues', 'Cañar', 'nacional', 'especial', '48 horas'],
        ARRAY['Cañar', 'Cañar', 'nacional', 'especial', '48 horas']
    ];
    
    city_row TEXT[];
BEGIN
    FOREACH city_row SLICE 1 IN ARRAY cities_data LOOP
        INSERT INTO cities (name, province, zone_name, city_tier, delivery_time)
        VALUES (city_row[1], city_row[2], city_row[3], city_row[4], city_row[5])
        ON CONFLICT (name, province) DO UPDATE SET
            zone_name = EXCLUDED.zone_name,
            city_tier = EXCLUDED.city_tier,
            delivery_time = EXCLUDED.delivery_time;
    END LOOP;
    
    RAISE NOTICE 'Ciudades insertadas correctamente';
END $$;

-- ═══════════════════════════════════════════════════════════════════════════
-- 16. SEED: Tarifas
-- ═══════════════════════════════════════════════════════════════════════════
-- TARIFAS OFICIALES ENVIOSXPRESS 2026
-- Ciudad-Ciudad: mismo ciudad (Quito a Quito) = $3.00
-- Principal: ciudades principales = $3.50
-- Secundario: ciudades secundarias = $4.00
-- Especial: zonas de difícil acceso = $5.00
-- Oriente tiene tarifas adicionales
-- 5kg incluidos en tarifa base, cargo por kilo adicional a partir del 6to kg

INSERT INTO shipping_rates (zone_name, shipment_type, city_tier, base_price, extra_kg_price_min, extra_kg_price_max)
SELECT * FROM (VALUES
    -- NACIONAL - Ciudad a Ciudad (mismo ciudad)
    ('nacional', 'documento', 'ciudad', 3.00, 0.25, 0.25),
    ('nacional', 'carga', 'ciudad', 3.00, 0.25, 0.25),
    -- NACIONAL - Principal
    ('nacional', 'documento', 'principal', 3.50, 0.35, 0.35),
    ('nacional', 'carga', 'principal', 3.50, 0.35, 0.35),
    -- NACIONAL - Secundario
    ('nacional', 'documento', 'secundario', 4.00, 0.45, 0.45),
    ('nacional', 'carga', 'secundario', 4.00, 0.45, 0.45),
    -- NACIONAL - Especial
    ('nacional', 'documento', 'especial', 5.00, 0.50, 0.50),
    ('nacional', 'carga', 'especial', 5.00, 0.50, 0.50),
    -- NORTE (30% dto aplicado automáticamente por zona)
    ('norte', 'documento', 'ciudad', 2.10, 0.25, 0.25),
    ('norte', 'carga', 'ciudad', 2.10, 0.25, 0.25),
    ('norte', 'documento', 'principal', 2.45, 0.35, 0.35),
    ('norte', 'carga', 'principal', 2.45, 0.35, 0.35),
    ('norte', 'documento', 'secundario', 2.80, 0.45, 0.45),
    ('norte', 'carga', 'secundario', 2.80, 0.45, 0.45),
    ('norte', 'documento', 'especial', 3.50, 0.50, 0.50),
    ('norte', 'carga', 'especial', 3.50, 0.50, 0.50),
    -- ORIENTE - Principal
    ('oriente', 'documento', 'principal', 5.00, 0.45, 0.45),
    ('oriente', 'carga', 'principal', 5.00, 0.45, 0.45),
    -- ORIENTE - Secundario
    ('oriente', 'documento', 'secundario', 6.00, 0.50, 0.50),
    ('oriente', 'carga', 'secundario', 6.00, 0.50, 0.50),
    -- ORIENTE - Especial
    ('oriente', 'documento', 'especial', 7.00, 0.75, 0.75),
    ('oriente', 'carga', 'especial', 7.00, 0.75, 0.75),
    -- ORIENTE - Ciudad
    ('oriente', 'documento', 'ciudad', 5.00, 0.45, 0.45),
    ('oriente', 'carga', 'ciudad', 5.00, 0.45, 0.45)
) AS t(zone_name, shipment_type, city_tier, base_price, extra_kg_price_min, extra_kg_price_max)
ON CONFLICT (zone_name, shipment_type, city_tier) DO UPDATE SET
    base_price = EXCLUDED.base_price,
    extra_kg_price_min = EXCLUDED.extra_kg_price_min,
    extra_kg_price_max = EXCLUDED.extra_kg_price_max;

-- ═══════════════════════════════════════════════════════════════════════════
-- Row Level Security (RLS)
-- ═══════════════════════════════════════════════════════════════════════════

-- Habilitar RLS en todas las tablas
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_events ENABLE ROW LEVEL SECURITY;

-- Políticas para leads (solo lectura pública para inserts)
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update own leads" ON leads FOR UPDATE USING (true);
CREATE POLICY "Public can view leads" ON leads FOR SELECT USING (true);

-- Políticas para chat_history
CREATE POLICY "Anyone can insert chat" ON chat_history FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view chat" ON chat_history FOR SELECT USING (true);

-- Políticas para cities (públicas para cotizador)
CREATE POLICY "Public can view cities" ON cities FOR SELECT USING (true);

-- Políticas para shipping_rates (públicas para cotizador)
CREATE POLICY "Public can view rates" ON shipping_rates FOR SELECT USING (true);

-- Políticas para zones
CREATE POLICY "Public can view zones" ON zones FOR SELECT USING (true);

-- Políticas para subscription_plans
CREATE POLICY "Public can view plans" ON subscription_plans FOR SELECT USING (true);

-- Políticas para shipments
CREATE POLICY "Anyone can insert shipments" ON shipments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update shipments" ON shipments FOR UPDATE USING (true);
CREATE POLICY "Public can view shipments" ON shipments FOR SELECT USING (true);

-- Políticas para shipment_events
CREATE POLICY "Anyone can insert events" ON shipment_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view events" ON shipment_events FOR SELECT USING (true);

-- Políticas para bot_events
CREATE POLICY "Anyone can insert bot events" ON bot_events FOR INSERT WITH CHECK (true);

-- Políticas para promotions
CREATE POLICY "Public can view promotions" ON promotions FOR SELECT USING (true);

-- Políticas para system_config (solo lectura)
CREATE POLICY "Public can view config" ON system_config FOR SELECT USING (true);

-- ═══════════════════════════════════════════════════════════════════════════
-- FIN DEL SCHEMA
-- ═══════════════════════════════════════════════════════════════════════════
