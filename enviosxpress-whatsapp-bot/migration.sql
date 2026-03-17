-- ═══════════════════════════════════════════════════════════════
-- EnviosXpress — Migración Completa v1.0
-- Fuente: COBERTURA - ENVIOS EXPRESS.xlsx + ENVIOSXPRESS_Guia_v3.1.docx
-- Ejecutar en: https://supabase.com/dashboard/project/dmraxfxvjqnrbajonmat/sql/new
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────
-- 001 — EXTENDER TABLA leads
-- ─────────────────────────────────────────────────────────────────
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS source           text    DEFAULT 'organic',
  ADD COLUMN IF NOT EXISTS origin_city      text,
  ADD COLUMN IF NOT EXISTS destination_city text,
  ADD COLUMN IF NOT EXISTS estimated_weight text,
  ADD COLUMN IF NOT EXISTS shipment_frequency text,
  ADD COLUMN IF NOT EXISTS funnel_stage     text    DEFAULT 'apertura',
  ADD COLUMN IF NOT EXISTS quoted_price     decimal,
  ADD COLUMN IF NOT EXISTS tipo_cliente     text,
  ADD COLUMN IF NOT EXISTS plan_interes     text,
  ADD COLUMN IF NOT EXISTS conversation_ended_at timestamptz;

-- ─────────────────────────────────────────────────────────────────
-- 002 — EXTENDER TABLA chat_history
-- ─────────────────────────────────────────────────────────────────
ALTER TABLE chat_history
  ADD COLUMN IF NOT EXISTS bias_triggered      text[],
  ADD COLUMN IF NOT EXISTS funnel_stage_at_msg text,
  ADD COLUMN IF NOT EXISTS lead_replied_after  boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS response_time_ms    integer;

-- ─────────────────────────────────────────────────────────────────
-- 003 — TABLA shipping_rates (tarifas por zona y tier)
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS shipping_rates (
  id                  uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_name           text    NOT NULL,
  city_tier           text    NOT NULL,
  max_weight_kg       decimal DEFAULT 5,
  base_price          decimal NOT NULL,
  extra_kg_price_min  decimal,
  extra_kg_price_max  decimal,
  discount_pct        integer DEFAULT 0,
  is_active           boolean DEFAULT true,
  updated_at          timestamptz DEFAULT now(),
  UNIQUE (zone_name, city_tier)
);

-- ─────────────────────────────────────────────────────────────────
-- 004 — TABLA cities (cobertura real desde Excel)
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cities (
  id           uuid  PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text  NOT NULL,
  province     text  NOT NULL,
  zone_name    text  NOT NULL,
  city_tier    text  NOT NULL,
  delivery_time text,
  is_active    boolean DEFAULT true,
  UNIQUE (name, province)
);

-- ─────────────────────────────────────────────────────────────────
-- 005 — TABLA bot_events (monitoring de salud del bot)
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bot_events (
  id          uuid  PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type  text  NOT NULL,
  reason      text,
  metadata    jsonb,
  created_at  timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────────
-- 006 — TABLA promotions (promociones con vigencia)
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS promotions (
  id            uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  code          text    UNIQUE,
  description   text,
  discount_pct  integer NOT NULL,
  applies_to    text    DEFAULT 'all',
  valid_from    date    NOT NULL,
  valid_until   date    NOT NULL,
  min_shipments integer DEFAULT 1,
  is_active     boolean DEFAULT true
);

-- ─────────────────────────────────────────────────────────────────
-- 007 — SEED: shipping_rates (tarifas oficiales 2026)
-- Fuente: ENVIOSXPRESS_Guia_v3.1.docx + prompt actual
-- ─────────────────────────────────────────────────────────────────
INSERT INTO shipping_rates (zone_name, city_tier, base_price, extra_kg_price_min, extra_kg_price_max, discount_pct)
VALUES
  ('nacional', 'principal',  3.00, 0.35, 0.50, 0),
  ('nacional', 'secundaria', 4.00, 0.35, 0.50, 0),
  ('nacional', 'especial',   5.00, 0.35, 0.50, 0),
  ('oriente',  'principal',  5.00, 0.45, 0.75, 0),
  ('oriente',  'secundaria', 6.00, 0.45, 0.75, 0),
  ('oriente',  'especial',   7.00, 0.45, 0.75, 0),
  -- Zona Norte: 30% dto automático sobre tarifa nacional
  ('norte',    'principal',  2.10, 0.35, 0.50, 30),
  ('norte',    'secundaria', 2.80, 0.35, 0.50, 30),
  ('norte',    'especial',   3.50, 0.35, 0.50, 30)
ON CONFLICT (zone_name, city_tier) DO UPDATE SET
  base_price = EXCLUDED.base_price,
  extra_kg_price_min = EXCLUDED.extra_kg_price_min,
  extra_kg_price_max = EXCLUDED.extra_kg_price_max,
  discount_pct = EXCLUDED.discount_pct,
  updated_at = now();

-- ─────────────────────────────────────────────────────────────────
-- 008 — SEED: cities (cobertura completa desde Excel real)
-- Zona asignada: IMBABURA/CARCHI/norte de Pichincha = 'norte'
--                NAPO/PASTAZA/SUCUMBÍOS/ORELLANA/MORONA/ZAMORA = 'oriente'
--                Resto = 'nacional'
-- ─────────────────────────────────────────────────────────────────
INSERT INTO cities (name, province, zone_name, city_tier, delivery_time) VALUES

-- AZUAY
('Cuenca',        'Azuay', 'nacional', 'principal',  '24 horas'),
('Capulispamba',  'Azuay', 'nacional', 'secundaria', '48 horas'),
('Baños (Azuay)', 'Azuay', 'nacional', 'secundaria', '48 horas'),
('Ricaurte',      'Azuay', 'nacional', 'secundaria', '48 horas'),
('San Joaquín',   'Azuay', 'nacional', 'secundaria', '48 horas'),
('Sayausi',       'Azuay', 'nacional', 'secundaria', '48 horas'),
('Turi',          'Azuay', 'nacional', 'secundaria', '48 horas'),
('Santa Ana',     'Azuay', 'nacional', 'especial',   '48-72 horas'),
('Tarqui (Azuay)','Azuay', 'nacional', 'especial',   '48-72 horas'),
('Valle',         'Azuay', 'nacional', 'especial',   '48-72 horas'),
('Girón',         'Azuay', 'nacional', 'especial',   '48-72 horas'),
('Gualaceo',      'Azuay', 'nacional', 'especial',   '48-72 horas'),

-- CARCHI (Zona Norte)
('Tulcán',        'Carchi', 'norte', 'secundaria', '24 horas'),
('Bolívar (Carchi)','Carchi','norte','especial',   '24 horas'),
('Huaca',         'Carchi', 'norte', 'especial',   '24-48 horas'),
('San Gabriel',   'Carchi', 'norte', 'especial',   '24-48 horas'),
('Julio Andrade', 'Carchi', 'norte', 'especial',   '24-48 horas'),
('Mira',          'Carchi', 'norte', 'especial',   '24-48 horas'),

-- CAÑAR
('Azogues',       'Cañar', 'nacional', 'especial', '48 horas'),
('Cañar',         'Cañar', 'nacional', 'especial', '48 horas'),
('El Tambo',      'Cañar', 'nacional', 'especial', '72 horas'),
('Biblián',       'Cañar', 'nacional', 'especial', '72 horas'),

-- COTOPAXI
('Latacunga',     'Cotopaxi', 'nacional', 'principal',  '24 horas'),
('Salcedo',       'Cotopaxi', 'nacional', 'especial',   '72 horas'),
('Pujilí',        'Cotopaxi', 'nacional', 'especial',   'Martes'),
('Saquisilí',     'Cotopaxi', 'nacional', 'especial',   'Lunes'),
('Mulalό (Lasso)','Cotopaxi', 'nacional', 'especial',   'Lunes'),

-- CHIMBORAZO
('Riobamba',      'Chimborazo', 'nacional', 'principal', '24 horas'),

-- GUAYAS
('Guayaquil',     'Guayas', 'nacional', 'principal',  '24 horas'),
('Durán',         'Guayas', 'nacional', 'secundaria', '48-72 horas'),
('Samborondón',   'Guayas', 'nacional', 'secundaria', '48 horas'),
('Milagro',       'Guayas', 'nacional', 'especial',   'Martes, Jueves, Sábado'),

-- IMBABURA (Zona Norte)
('Ibarra',        'Imbabura', 'norte', 'principal',  '24 horas'),
('Atuntaqui',     'Imbabura', 'norte', 'principal',  '24 horas'),
('Otavalo',       'Imbabura', 'norte', 'principal',  '24 horas'),
('San Antonio (Ibarra)', 'Imbabura', 'norte', 'secundaria', '24 horas'),
('Cotacachi',     'Imbabura', 'norte', 'especial',   'Martes y Jueves'),
('Antonio Ante',  'Imbabura', 'norte', 'especial',   '48 horas'),

-- LOS RÍOS
('Quevedo',       'Los Ríos', 'nacional', 'principal',  '24 horas'),
('Buena Fe',      'Los Ríos', 'nacional', 'secundaria', '24 horas'),
('La Maná',       'Los Ríos', 'nacional', 'secundaria', '24 horas'),
('Babahoyo',      'Los Ríos', 'nacional', 'especial',   'Martes, Jueves, Sábado'),
('Ventanas',      'Los Ríos', 'nacional', 'especial',   'Martes, Jueves, Sábado'),
('El Empalme',    'Los Ríos', 'nacional', 'especial',   'Martes, Jueves, Sábado'),

-- MANABÍ
('Manta',         'Manabí', 'nacional', 'principal',  '24 horas (después 13h)'),
('Portoviejo',    'Manabí', 'nacional', 'principal',  '24 horas'),
('Chone',         'Manabí', 'nacional', 'principal',  '24 horas'),
('El Carmen (Manabí)','Manabí','nacional','principal', '24 horas'),
('Montecristi',   'Manabí', 'nacional', 'principal',  '24 horas'),
('Bahía de Caráquez','Manabí','nacional','especial',  'Viernes'),
('Calceta',       'Manabí', 'nacional', 'especial',   'Miércoles, Sábado'),

-- PICHINCHA
('Quito',         'Pichincha', 'nacional', 'principal',  '24 horas'),
('Conocoto',      'Pichincha', 'nacional', 'secundaria', '24 horas'),
('Cumbayá',       'Pichincha', 'nacional', 'secundaria', '24 horas'),
('Tumbaco',       'Pichincha', 'nacional', 'secundaria', '24 horas'),
('Sangolquí',     'Pichincha', 'nacional', 'secundaria', '24 horas'),
('San Rafael',    'Pichincha', 'nacional', 'secundaria', '24 horas'),
('Pomasqui',      'Pichincha', 'nacional', 'secundaria', '24 horas'),
('Calderón ',     'Pichincha', 'nacional', 'principal',  '24 horas'),
('Cayambe',       'Pichincha', 'norte',    'principal',  '24 horas'),
('Tabacundo',     'Pichincha', 'norte',    'secundaria', '24 horas'),
('Amaguaña',      'Pichincha', 'nacional', 'especial',   '24-48 horas'),
('Machachi',      'Pichincha', 'nacional', 'especial',   '48 horas'),
('Guayllabamba',  'Pichincha', 'nacional', 'especial',   '48 horas'),
('Pintag',        'Pichincha', 'nacional', 'especial',   '48 horas'),
('El Quinche',    'Pichincha', 'nacional', 'especial',   '48 horas'),
('Pifo',          'Pichincha', 'nacional', 'especial',   '48 horas'),

-- SANTO DOMINGO
('Santo Domingo', 'Santo Domingo', 'nacional', 'principal',  '24 horas'),
('El Carmen (SD)','Santo Domingo', 'nacional', 'secundaria', '24-48 horas'),
('La Concordia',  'Santo Domingo', 'nacional', 'secundaria', '24-48 horas'),
('Quinindé',      'Santo Domingo', 'nacional', 'secundaria', '24-48 horas'),
('Pedro Vicente Maldonado','Santo Domingo','nacional','especial','72 horas'),
('Puerto Quito',  'Santo Domingo', 'nacional', 'especial',   '72 horas'),

-- ESMERALDAS
('Esmeraldas',    'Esmeraldas', 'nacional', 'principal',  '24 horas'),
('Atacames',      'Esmeraldas', 'nacional', 'secundaria', '24 horas'),
('Pedernales',    'Esmeraldas', 'nacional', 'especial',   'Miércoles, Sábado'),

-- TUNGURAHUA
('Ambato',        'Tungurahua', 'nacional', 'principal',  '24 horas'),
('Baños de Agua Santa','Tungurahua','nacional','secundaria','24-48 horas'),
('Pelileo',       'Tungurahua', 'nacional', 'secundaria', '24-48 horas'),
('Pillaro',       'Tungurahua', 'nacional', 'secundaria', '24-48 horas'),
('Patate',        'Tungurahua', 'nacional', 'secundaria', '24-48 horas'),
('Cevallos',      'Tungurahua', 'nacional', 'secundaria', '24-48 horas'),

-- EL ORO (no en Excel pero mencionado en guía)
('Machala',       'El Oro', 'nacional', 'secundaria', '24-48 horas'),

-- LOJA
('Loja',          'Loja', 'nacional', 'secundaria', '48 horas'),

-- ZONA ORIENTE – SUCUMBÍOS
('Lago Agrio',    'Sucumbíos', 'oriente', 'principal',  '24 horas'),
('Shushufindi',   'Sucumbíos', 'oriente', 'secundaria', '24 horas'),
('Cascales',      'Sucumbíos', 'oriente', 'especial',   '24-48 horas'),
('Lumbaquí',      'Sucumbíos', 'oriente', 'especial',   '24-48 horas'),

-- ZONA ORIENTE – FRANCISCO DE ORELLANA
('El Coca',       'Francisco de Orellana', 'oriente', 'principal',  '24 horas'),
('Joya de los Sachas','Francisco de Orellana','oriente','secundaria','24 horas'),
('Dayuma',        'Francisco de Orellana', 'oriente', 'especial',   '24-48 horas'),
('Loreto',        'Francisco de Orellana', 'oriente', 'especial',   '24-48 horas'),

-- ZONA ORIENTE – NAPO
('Tena',          'Napo', 'oriente', 'principal',  'Martes y Jueves'),
('Baeza',         'Napo', 'oriente', 'secundaria', 'Martes y Jueves'),
('El Chaco',      'Napo', 'oriente', 'especial',   'Martes y Jueves'),
('Archidona',     'Napo', 'oriente', 'especial',   'Martes y Jueves'),

-- ZONA ORIENTE – PASTAZA
('Puyo',          'Pastaza', 'oriente', 'principal',  'Martes y Jueves'),
('Mera',          'Pastaza', 'oriente', 'secundaria', 'Martes y Jueves'),
('Shell',         'Pastaza', 'oriente', 'secundaria', 'Martes y Jueves'),
('Santa Clara',   'Pastaza', 'oriente', 'secundaria', 'Martes y Jueves')

ON CONFLICT (name, province) DO UPDATE SET
  zone_name    = EXCLUDED.zone_name,
  city_tier    = EXCLUDED.city_tier,
  delivery_time = EXCLUDED.delivery_time,
  is_active    = true;

-- ─────────────────────────────────────────────────────────────────
-- 009 — Verificación final
-- ─────────────────────────────────────────────────────────────────
SELECT 'shipping_rates' as tabla, COUNT(*) as registros FROM shipping_rates
UNION ALL
SELECT 'cities', COUNT(*) FROM cities
UNION ALL
SELECT 'leads cols', COUNT(*) FROM information_schema.columns WHERE table_name = 'leads'
UNION ALL
SELECT 'chat_history cols', COUNT(*) FROM information_schema.columns WHERE table_name = 'chat_history';