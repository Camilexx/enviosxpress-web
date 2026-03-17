/**
 * EnviosXpress — Migración de Schema Supabase
 * Ejecutar una sola vez: node migrate.js
 * 
 * Requiere SUPABASE_SERVICE_KEY (rol service_role) para DDL.
 * Si solo tienes la anon key, el script reportará exactamente qué SQL
 * debes copiar al SQL Editor de Supabase.
 */
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
// Intentar con service key si existe, si no usar anon key
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// ─── SQL de Migraciones ─────────────────────────────────────────
const migrations = [

  {
    name: '001_extend_leads',
    sql: `
      ALTER TABLE leads 
        ADD COLUMN IF NOT EXISTS source text DEFAULT 'organic',
        ADD COLUMN IF NOT EXISTS origin_city text,
        ADD COLUMN IF NOT EXISTS destination_city text,
        ADD COLUMN IF NOT EXISTS estimated_weight text,
        ADD COLUMN IF NOT EXISTS shipment_frequency text,
        ADD COLUMN IF NOT EXISTS funnel_stage text DEFAULT 'apertura',
        ADD COLUMN IF NOT EXISTS quoted_price decimal,
        ADD COLUMN IF NOT EXISTS conversation_ended_at timestamptz;
    `
  },

  {
    name: '002_extend_chat_history',
    sql: `
      ALTER TABLE chat_history
        ADD COLUMN IF NOT EXISTS bias_triggered text[],
        ADD COLUMN IF NOT EXISTS funnel_stage_at_msg text,
        ADD COLUMN IF NOT EXISTS lead_replied_after boolean DEFAULT false,
        ADD COLUMN IF NOT EXISTS response_time_ms integer;
    `
  },

  {
    name: '003_create_shipping_rates',
    sql: `
      CREATE TABLE IF NOT EXISTS shipping_rates (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        zone_name text NOT NULL,
        city_tier text NOT NULL,
        max_weight_kg decimal DEFAULT 5,
        base_price decimal NOT NULL,
        extra_kg_price_min decimal,
        extra_kg_price_max decimal,
        discount_pct integer DEFAULT 0,
        is_active boolean DEFAULT true,
        updated_at timestamptz DEFAULT now()
      );
    `
  },

  {
    name: '004_create_cities',
    sql: `
      CREATE TABLE IF NOT EXISTS cities (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        province text NOT NULL,
        zone_name text NOT NULL,
        city_tier text NOT NULL,
        is_active boolean DEFAULT true
      );
    `
  },

  {
    name: '005_create_bot_events',
    sql: `
      CREATE TABLE IF NOT EXISTS bot_events (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        event_type text NOT NULL,
        reason text,
        metadata jsonb,
        created_at timestamptz DEFAULT now()
      );
    `
  },

  {
    name: '006_create_promotions',
    sql: `
      CREATE TABLE IF NOT EXISTS promotions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        code text UNIQUE,
        description text,
        discount_pct integer NOT NULL,
        applies_to text DEFAULT 'all',
        valid_from date NOT NULL,
        valid_until date NOT NULL,
        min_shipments integer DEFAULT 1,
        is_active boolean DEFAULT true
      );
    `
  },

  {
    name: '007_seed_shipping_rates',
    sql: `
      INSERT INTO shipping_rates (zone_name, city_tier, base_price, extra_kg_price_min, extra_kg_price_max, discount_pct)
      VALUES
        ('nacional', 'principal',  3.00, 0.35, 0.50, 0),
        ('nacional', 'secundaria', 4.00, 0.35, 0.50, 0),
        ('nacional', 'especial',   5.00, 0.35, 0.50, 0),
        ('oriente',  'principal',  5.00, 0.45, 0.75, 0),
        ('oriente',  'secundaria', 6.00, 0.45, 0.75, 0),
        ('oriente',  'especial',   7.00, 0.45, 0.75, 0),
        ('norte',    'principal',  3.00, 0.35, 0.50, 30),
        ('norte',    'secundaria', 4.00, 0.35, 0.50, 30),
        ('norte',    'especial',   5.00, 0.35, 0.50, 30)
      ON CONFLICT DO NOTHING;
    `
  },

  {
    name: '008_seed_cities',
    sql: `
      INSERT INTO cities (name, province, zone_name, city_tier)
      VALUES
        ('Quito',         'Pichincha',         'nacional', 'principal'),
        ('Guayaquil',     'Guayas',            'nacional', 'principal'),
        ('Cuenca',        'Azuay',             'nacional', 'principal'),
        ('Ambato',        'Tungurahua',        'nacional', 'principal'),
        ('Riobamba',      'Chimborazo',        'nacional', 'secundaria'),
        ('Manta',         'Manabí',            'nacional', 'secundaria'),
        ('Portoviejo',    'Manabí',            'nacional', 'secundaria'),
        ('Santo Domingo', 'Santo Domingo',     'nacional', 'secundaria'),
        ('Loja',          'Loja',              'nacional', 'secundaria'),
        ('Machala',       'El Oro',            'nacional', 'secundaria'),
        ('Esmeraldas',    'Esmeraldas',        'nacional', 'secundaria'),
        ('Latacunga',     'Cotopaxi',          'nacional', 'secundaria'),
        ('Babahoyo',      'Los Ríos',          'nacional', 'secundaria'),
        ('Quevedo',       'Los Ríos',          'nacional', 'secundaria'),
        ('Milagro',       'Guayas',            'nacional', 'secundaria'),
        ('Sangolquí',     'Pichincha',         'nacional', 'secundaria'),
        ('Cumbayá',       'Pichincha',         'nacional', 'secundaria'),
        ('Ibarra',        'Imbabura',          'norte',    'principal'),
        ('Otavalo',       'Imbabura',          'norte',    'secundaria'),
        ('Cotacachi',     'Imbabura',          'norte',    'secundaria'),
        ('Atuntaqui',     'Imbabura',          'norte',    'secundaria'),
        ('Tulcán',        'Carchi',            'norte',    'principal'),
        ('Cayambe',       'Pichincha',         'norte',    'secundaria'),
        ('Tabacundo',     'Pichincha',         'norte',    'especial'),
        ('Tena',          'Napo',              'oriente',  'principal'),
        ('Lago Agrio',    'Sucumbíos',         'oriente',  'principal'),
        ('Puyo',          'Pastaza',           'oriente',  'principal'),
        ('Macas',         'Morona Santiago',   'oriente',  'secundaria'),
        ('Zamora',        'Zamora Chinchipe',  'oriente',  'secundaria'),
        ('Orellana',      'Orellana',          'oriente',  'principal')
      ON CONFLICT DO NOTHING;
    `
  }
];

// ─── Ejecutor ──────────────────────────────────────────────────
async function runMigrations() {
  console.log('\n' + '═'.repeat(55));
  console.log('  📦 EnviosXpress — Migración de Schema Supabase');
  console.log('═'.repeat(55) + '\n');

  let allSql = '';
  let hasPermission = true;

  for (const migration of migrations) {
    process.stdout.write(`  Ejecutando ${migration.name}... `);
    
    let error;
    try {
      const result = await supabase.rpc('exec_sql', { query: migration.sql });
      error = result.error;
    } catch (e) {
      error = { message: 'rpc_not_available' };
    }

    if (error && error.message === 'rpc_not_available') {
      // La anon key no puede hacer DDL — recopilar SQL para ejecución manual
      hasPermission = false;
      process.stdout.write('⚠️  (requiere SQL Editor)\n');
      allSql += `\n-- ${migration.name}\n${migration.sql}\n`;
    } else if (error) {
      process.stdout.write(`❌ ${error.message}\n`);
      allSql += `\n-- ${migration.name}\n${migration.sql}\n`;
    } else {
      process.stdout.write('✅\n');
    }
  }

  if (!hasPermission || allSql.length > 0) {
    console.log('\n' + '─'.repeat(55));
    console.log('  ⚠️  ACCIÓN REQUERIDA: Ejecuta este SQL en Supabase');
    console.log('  🔗 https://supabase.com/dashboard/project/dmraxfxvjqnrbajonmat/sql');
    console.log('─'.repeat(55));
    console.log(allSql);

    // Guardar en archivo para conveniencia
    const fs = require('fs');
    fs.writeFileSync('./migration.sql', allSql.trim());
    console.log('\n  💾 También guardado en: ./migration.sql');
  } else {
    console.log('\n  ✅ Todas las migraciones ejecutadas correctamente.');
  }

  console.log('\n' + '═'.repeat(55) + '\n');
}

runMigrations().catch(console.error);
