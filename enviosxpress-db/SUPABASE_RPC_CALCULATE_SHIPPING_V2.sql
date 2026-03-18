-- ═════════════════════════════════════════════════════════════════════════════════════════
-- FUNCIÓN RPC: calculate_shipping_price
-- ENVIOSXPRESS - Calcula precio de envío según tarifas
-- ═════════════════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION calculate_shipping_price(
    p_origen TEXT,
    p_destino TEXT,
    p_tipo TEXT,
    p_peso DECIMAL(10,2),
    p_con_seguro BOOLEAN DEFAULT false,
    p_valor_declarado DECIMAL(12,2) DEFAULT 0,
    p_plan_code TEXT DEFAULT NULL
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
    v_es_envio_ciudad BOOLEAN := false;
    v_city_tier_final TEXT;
    v_discount_pct DECIMAL(5,2);
BEGIN
    -- Validar destino
    SELECT * INTO v_city 
    FROM cities 
    WHERE LOWER(name) = LOWER(p_destino) AND is_active = true
    LIMIT 1;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT false, 'Ciudad no encontrada: ' || p_destino, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL;
        RETURN;
    END IF;

    -- Si origen no viene, usar Quito por defecto
    IF p_origen IS NULL OR TRIM(p_origen) = '' THEN
        p_origen := 'Quito';
    END IF;

    -- Determinar si es envío ciudad-ciudad
    v_es_envio_ciudad := LOWER(TRIM(p_origen)) = LOWER(TRIM(v_city.name));
    
    IF v_es_envio_ciudad THEN
        v_city_tier_final := 'ciudad';
    ELSE
        v_city_tier_final := v_city.city_tier;
    END IF;

    -- Obtener tarifa
    SELECT * INTO v_rate 
    FROM shipping_rates 
    WHERE zone_name = v_city.zone_name 
        AND city_tier = v_city_tier_final
        AND is_active = true
    LIMIT 1;
    
    IF NOT FOUND THEN
        SELECT * INTO v_rate 
        FROM shipping_rates 
        WHERE zone_name = v_city.zone_name AND is_active = true
        ORDER BY 
            CASE city_tier 
                WHEN 'principal' THEN 1 
                WHEN 'secundaria' THEN 2 
                WHEN 'especial' THEN 3 
                ELSE 4 
            END
        LIMIT 1;
    END IF;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT false, 'Tarifa no encontrada para zona: ' || v_city.zone_name, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL;
        RETURN;
    END IF;

    -- Obtener descuento de zona
    v_discount_pct := COALESCE(v_rate.discount_pct, 0);
    v_descuento_zona_pct := v_discount_pct;

    -- Calcular tarifa base
    v_tarifa_base := v_rate.base_price;
    
    -- Recargo por peso solo para carga > 5kg
    v_peso_calculado := COALESCE(p_peso, 0);
    IF p_tipo = 'carga' AND v_peso_calculado > 5 THEN
        v_kilos_extra := CEIL(v_peso_calculado - 5);
        v_recargo_peso := v_kilos_extra * v_rate.extra_kg_price_max;
    END IF;

    -- Precio sin descuentos
    v_precio_sin_descuentos := v_tarifa_base + v_recargo_peso;

    -- Descuento de zona ya aplicado en precio base
    v_descuento_zona_amount := 0;

    -- Descuento de plan
    IF p_plan_code IS NOT NULL AND TRIM(p_plan_code) != '' THEN
        SELECT * INTO v_plan 
        FROM subscription_plans 
        WHERE code = p_plan_code AND is_active = true;
        
        IF FOUND THEN
            v_descuento_plan_pct := v_plan.discount_pct;
            v_descuento_plan_amount := v_precio_sin_descuentos * (v_descuento_plan_pct / 100);
        END IF;
    END IF;

    -- Seguro
    IF p_con_seguro = true AND p_valor_declarado > 0 THEN
        v_seguro := p_valor_declarado * 0.01;
    END IF;

    -- Precio total
    v_precio_total := v_precio_sin_descuentos - v_descuento_plan_amount + v_seguro;

    RETURN QUERY SELECT 
        true,
        NULL::TEXT,
        p_origen::TEXT,
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
        (v_city.zone_name = 'norte')::BOOLEAN,
        COALESCE(v_plan.code, NULL::TEXT),
        v_precio_sin_descuentos;
END;
$$ LANGUAGE plpgsql;
