-- ═══════════════════════════════════════════════════════════════════════════
-- ACTUALIZAR ESQUEMA DE TARIFAS - Agregar columna shipment_type
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Agregar columna shipment_type
ALTER TABLE shipping_rates 
ADD COLUMN IF NOT EXISTS shipment_type TEXT DEFAULT 'documento';

-- 2. Actualizar registros existentes
UPDATE shipping_rates SET shipment_type = 'documento' WHERE shipment_type IS NULL;

-- 3. Agregar columna para tipo de envío
ALTER TABLE shipping_rates 
ADD COLUMN IF NOT EXISTS is_documento BOOLEAN DEFAULT true;

-- 4. Insertar tarifas de CARGA (duplicar las de documento con cargo adicional)
INSERT INTO shipping_rates (zone_name, city_tier, shipment_type, base_price, extra_kg_price_min, extra_kg_price_max, discount_pct, is_active, is_documento)
SELECT 
    zone_name,
    city_tier,
    'carga',
    base_price,
    CASE 
        WHEN zone_name = 'nacional' AND city_tier = 'principal' THEN 0.35
        WHEN zone_name = 'nacional' AND city_tier = 'secundaria' THEN 0.45
        WHEN zone_name = 'nacional' AND city_tier = 'especial' THEN 0.50
        WHEN zone_name = 'oriente' AND city_tier = 'principal' THEN 0.45
        WHEN zone_name = 'oriente' AND city_tier = 'secundaria' THEN 0.50
        WHEN zone_name = 'oriente' AND city_tier = 'especial' THEN 0.75
        WHEN zone_name = 'norte' AND city_tier = 'principal' THEN 0.35
        WHEN zone_name = 'norte' AND city_tier = 'secundaria' THEN 0.45
        WHEN zone_name = 'norte' AND city_tier = 'especial' THEN 0.50
        ELSE 0.50
    END,
    CASE 
        WHEN zone_name = 'nacional' AND city_tier = 'principal' THEN 0.35
        WHEN zone_name = 'nacional' AND city_tier = 'secundaria' THEN 0.45
        WHEN zone_name = 'nacional' AND city_tier = 'especial' THEN 0.50
        WHEN zone_name = 'oriente' AND city_tier = 'principal' THEN 0.45
        WHEN zone_name = 'oriente' AND city_tier = 'secundaria' THEN 0.50
        WHEN zone_name = 'oriente' AND city_tier = 'especial' THEN 0.75
        WHEN zone_name = 'norte' AND city_tier = 'principal' THEN 0.35
        WHEN zone_name = 'norte' AND city_tier = 'secundaria' THEN 0.45
        WHEN zone_name = 'norte' AND city_tier = 'especial' THEN 0.50
        ELSE 0.50
    END,
    discount_pct,
    is_active,
    false
WHERE shipment_type = 'documento';

-- 5. Verificar
SELECT zone_name, city_tier, shipment_type, base_price, extra_kg_price_max 
FROM shipping_rates 
ORDER BY zone_name, city_tier, shipment_type;
