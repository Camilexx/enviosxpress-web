/**
 * Script para seedear la base de datos de EnviosXpress
 * Uso: node seed_database.js
 * 
 * Requiere variables de entorno:
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY (para tener permisos de escritura)
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Faltan variables de entorno SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ═══════════════════════════════════════════════════════════════════════════
//  DATOS: Ciudades (basado en ENVIOSXPRESS_Guia_v3.1)
// ═══════════════════════════════════════════════════════════════════════════

const cities = [
    // PICHINCHA
    { name: 'Quito', province: 'Pichincha', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Calderón (Carapungo)', province: 'Pichincha', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Cumbayá', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Tumbaco', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Sangolquí', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Conocoto', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'San Rafael', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Pomasqui', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'San Antonio de Quito', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Cayambe', province: 'Pichincha', zone_name: 'norte', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Tabacundo', province: 'Pichincha', zone_name: 'norte', city_tier: 'secundaria', delivery_time: '24 horas' },

    // GUAYAS
    { name: 'Guayaquil', province: 'Guayas', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Durán', province: 'Guayas', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48-72 horas' },
    { name: 'Samborondón', province: 'Guayas', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
    { name: 'Milagro', province: 'Guayas', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Martes, Jueves, Sábado' },
    { name: 'Pascuales', province: 'Guayas', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },
    { name: 'La Puntilla', province: 'Guayas', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },

    // IMBABURA (Zona Norte)
    { name: 'Ibarra', province: 'Imbabura', zone_name: 'norte', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Atuntaqui', province: 'Imbabura', zone_name: 'norte', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Otavalo', province: 'Imbabura', zone_name: 'norte', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'San Antonio de Ibarra', province: 'Imbabura', zone_name: 'norte', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Cotacachi', province: 'Imbabura', zone_name: 'norte', city_tier: 'especial', delivery_time: 'Martes y Jueves' },
    { name: 'Antonio Ante', province: 'Imbabura', zone_name: 'norte', city_tier: 'especial', delivery_time: '48 horas' },

    // CARCHI (Zona Norte)
    { name: 'Tulcán', province: 'Carchi', zone_name: 'norte', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'González Suárez', province: 'Carchi', zone_name: 'norte', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Bolívar', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24 horas' },
    { name: 'Huaca', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24-48 horas' },
    { name: 'San Gabriel', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24-48 horas' },
    { name: 'Julio Andrade', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24-48 horas' },
    { name: 'Mira', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24-48 horas' },

    // AZUAY
    { name: 'Cuenca', province: 'Azuay', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Baños (Azuay)', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
    { name: 'Ricaurte', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
    { name: 'San Joaquín', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
    { name: 'Santa Ana', province: 'Azuay', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },
    { name: 'Gualaceo', province: 'Azuay', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },

    // COTOPAXI
    { name: 'Latacunga', province: 'Cotopaxi', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Salcedo', province: 'Cotopaxi', zone_name: 'nacional', city_tier: 'especial', delivery_time: '72 horas' },
    { name: 'Saquisilí', province: 'Cotopaxi', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Lunes' },

    // CHIMBORAZO
    { name: 'Riobamba', province: 'Chimborazo', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },

    // TUNGURAHUA
    { name: 'Ambato', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Baños de Agua Santa', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
    { name: 'Pelileo', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },

    // MANABÍ
    { name: 'Manta', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas (después 13h)' },
    { name: 'Portoviejo', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Chone', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'El Carmen', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Montecristi', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },

    // LOS RÍOS
    { name: 'Quevedo', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Buena Fe', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Valencia', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'La Maná', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Babahoyo', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Martes, Jueves, Sábado' },

    // ESMERALDAS
    { name: 'Esmeraldas', province: 'Esmeraldas', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Tonsupa', province: 'Esmeraldas', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Atacames', province: 'Esmeraldas', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },

    // EL ORO
    { name: 'Machala', province: 'El Oro', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },

    // LOJA
    { name: 'Loja', province: 'Loja', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },

    // SANTO DOMINGO
    { name: 'Santo Domingo', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'El Carmen (SD)', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
    { name: 'La Concordia', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },

    // ORIENTE - SUCUMBÍOS
    { name: 'Lago Agrio', province: 'Sucumbíos', zone_name: 'oriente', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Shushufindi', province: 'Sucumbíos', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: '24 horas' },
    { name: 'Cascales', province: 'Sucumbíos', zone_name: 'oriente', city_tier: 'especial', delivery_time: '24-48 horas' },

    // ORIENTE - FRANCISCO DE ORELLANA
    { name: 'El Coca', province: 'Francisco de Orellana', zone_name: 'oriente', city_tier: 'principal', delivery_time: '24 horas' },
    { name: 'Joya de los Sachas', province: 'Francisco de Orellana', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: '24 horas' },

    // ORIENTE - NAPO
    { name: 'Tena', province: 'Napo', zone_name: 'oriente', city_tier: 'principal', delivery_time: 'Martes y Jueves' },
    { name: 'Baeza', province: 'Napo', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: 'Martes y Jueves' },
    { name: 'Archidona', province: 'Napo', zone_name: 'oriente', city_tier: 'especial', delivery_time: 'Martes y Jueves' },

    // ORIENTE - PASTAZA
    { name: 'Puyo', province: 'Pastaza', zone_name: 'oriente', city_tier: 'principal', delivery_time: 'Martes y Jueves' },
    { name: 'Shell', province: 'Pastaza', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: 'Martes y Jueves' },

    // CAÑAR
    { name: 'Azogues', province: 'Cañar', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
    { name: 'Cañar', province: 'Cañar', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' }
];

// ═══════════════════════════════════════════════════════════════════════════
//  DATOS: Tarifas
// ═══════════════════════════════════════════════════════════════════════════

const shippingRates = [
    // NACIONAL
    { zone_name: 'nacional', shipment_type: 'documento', city_tier: 'principal', base_price: 3.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.50 },
    { zone_name: 'nacional', shipment_type: 'documento', city_tier: 'secundaria', base_price: 4.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.50 },
    { zone_name: 'nacional', shipment_type: 'documento', city_tier: 'especial', base_price: 5.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.50 },
    { zone_name: 'nacional', shipment_type: 'carga', city_tier: 'principal', base_price: 4.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.75 },
    { zone_name: 'nacional', shipment_type: 'carga', city_tier: 'secundaria', base_price: 5.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.75 },
    { zone_name: 'nacional', shipment_type: 'carga', city_tier: 'especial', base_price: 6.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.75 },
    
    // NORTE (30% dto aplicado automáticamente)
    { zone_name: 'norte', shipment_type: 'documento', city_tier: 'principal', base_price: 3.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.50 },
    { zone_name: 'norte', shipment_type: 'documento', city_tier: 'secundaria', base_price: 4.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.50 },
    { zone_name: 'norte', shipment_type: 'documento', city_tier: 'especial', base_price: 5.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.50 },
    { zone_name: 'norte', shipment_type: 'carga', city_tier: 'principal', base_price: 4.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.75 },
    { zone_name: 'norte', shipment_type: 'carga', city_tier: 'secundaria', base_price: 5.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.75 },
    { zone_name: 'norte', shipment_type: 'carga', city_tier: 'especial', base_price: 6.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.75 },
    
    // ORIENTE
    { zone_name: 'oriente', shipment_type: 'documento', city_tier: 'principal', base_price: 5.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.50 },
    { zone_name: 'oriente', shipment_type: 'documento', city_tier: 'secundaria', base_price: 6.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.50 },
    { zone_name: 'oriente', shipment_type: 'documento', city_tier: 'especial', base_price: 7.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.50 },
    { zone_name: 'oriente', shipment_type: 'carga', city_tier: 'principal', base_price: 6.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.75 },
    { zone_name: 'oriente', shipment_type: 'carga', city_tier: 'secundaria', base_price: 7.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.75 },
    { zone_name: 'oriente', shipment_type: 'carga', city_tier: 'especial', base_price: 8.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.75 }
];

// ═══════════════════════════════════════════════════════════════════════════
//  DATOS: Planes de Suscripción
// ═══════════════════════════════════════════════════════════════════════════

const subscriptionPlans = [
    { code: 'emprendedor', name: 'Plan Emprendedor', description: 'Para pequeños emprendedores', discount_pct: 15, min_monthly_shipments: 10, max_monthly_shipments: 49, includes_pickup: true, has_dedicated_agent: false },
    { code: 'empresarial_50', name: 'Plan Empresarial 50+', description: 'Para empresas medianas', discount_pct: 10, min_monthly_shipments: 50, max_monthly_shipments: 99, includes_pickup: true, has_dedicated_agent: false },
    { code: 'empresarial_100', name: 'Plan Empresarial 100+', description: 'Para empresas grandes', discount_pct: 15, min_monthly_shipments: 100, max_monthly_shipments: 199, includes_pickup: true, has_dedicated_agent: true },
    { code: 'empresarial_200', name: 'Plan Empresarial 200+', description: 'Para empresas grandes', discount_pct: 20, min_monthly_shipments: 200, max_monthly_shipments: 499, includes_pickup: true, has_dedicated_agent: true },
    { code: 'empresarial_500', name: 'Plan Empresarial 500+', description: 'Para empresas corporativas', discount_pct: 25, min_monthly_shipments: 500, max_monthly_shipments: 800, includes_pickup: true, has_dedicated_agent: true },
    { code: 'empresarial_801', name: 'Plan Corporativo', description: 'Para grandes volúmenes', discount_pct: 30, min_monthly_shipments: 801, max_monthly_shipments: null, includes_pickup: true, has_dedicated_agent: true }
];

// ═══════════════════════════════════════════════════════════════════════════
//  FUNCIONES DE SEED
// ═══════════════════════════════════════════════════════════════════════════

async function seedZones() {
    console.log('\n📍 Insertando zonas...');
    
    const zones = [
        { name: 'nacional', display_name: 'Nacional', discount_pct: 0, description: 'Todo Ecuador excepto Zona Norte y Oriente' },
        { name: 'norte', display_name: 'Zona Norte', discount_pct: 30, description: 'Ibarra, Otavalo, Cotacachi, Atuntaqui, Cayambe, Tabacundo, Tulcán' },
        { name: 'oriente', display_name: 'Oriente', discount_pct: 0, description: 'Tena, Lago Agrio, Puyo, El Coca, Macas, Zamora' }
    ];

    for (const zone of zones) {
        const { error } = await supabase.from('zones').upsert(zone, { onConflict: 'name' });
        if (error) {
            console.error(`  ❌ Error insertando ${zone.name}: ${error.message}`);
        } else {
            console.log(`  ✅ ${zone.display_name}`);
        }
    }
}

async function seedCities() {
    console.log('\n🏙️ Insertando ciudades...');
    
    const chunkSize = 20;
    let inserted = 0;
    
    for (let i = 0; i < cities.length; i += chunkSize) {
        const chunk = cities.slice(i, i + chunkSize);
        const { error } = await supabase.from('cities').upsert(chunk, { onConflict: 'name,province' });
        
        if (error) {
            console.error(`  ❌ Error en lote ${Math.floor(i/chunkSize)+1}: ${error.message}`);
        } else {
            inserted += chunk.length;
            console.log(`  ✅ Lote ${Math.floor(i/chunkSize)+1}: ${chunk.length} ciudades`);
        }
    }

    console.log(`  📊 Total: ${inserted} ciudades insertadas`);
}

async function seedRates() {
    console.log('\n💰 Insertando tarifas...');
    
    for (const rate of shippingRates) {
        const { error } = await supabase.from('shipping_rates').upsert(rate, { onConflict: 'zone_name,shipment_type,city_tier' });
        if (error) {
            console.error(`  ❌ Error insertando ${rate.zone_name}/${rate.shipment_type}/${rate.city_tier}: ${error.message}`);
        }
    }
    console.log(`  ✅ ${shippingRates.length} tarifas insertadas`);
}

async function seedPlans() {
    console.log('\n📋 Insertando planes de suscripción...');
    
    for (const plan of subscriptionPlans) {
        const { error } = await supabase.from('subscription_plans').upsert(plan, { onConflict: 'code' });
        if (error) {
            console.error(`  ❌ Error insertando ${plan.code}: ${error.message}`);
        }
    }
    console.log(`  ✅ ${subscriptionPlans.length} planes insertados`);
}

async function verifyData() {
    console.log('\n🔍 Verificando datos...');
    
    const [zonesRes, citiesRes, ratesRes, plansRes] = await Promise.all([
        supabase.from('zones').select('name', { count: 'exact' }),
        supabase.from('cities').select('name', { count: 'exact' }),
        supabase.from('shipping_rates').select('id', { count: 'exact' }),
        supabase.from('subscription_plans').select('code', { count: 'exact' })
    ]);

    console.log(`  📍 Zonas: ${zonesRes.count}`);
    console.log(`  🏙️ Ciudades: ${citiesRes.count}`);
    console.log(`  💰 Tarifas: ${ratesRes.count}`);
    console.log(`  📋 Planes: ${plansRes.count}`);
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
    console.log('\n' + '═'.repeat(50));
    console.log('  🚀 ENVIOSXPRESS - SEED DE BASE DE DATOS');
    console.log('═'.repeat(50));

    try {
        await seedZones();
        await seedCities();
        await seedRates();
        await seedPlans();
        await verifyData();

        console.log('\n' + '═'.repeat(50));
        console.log('  ✅ SEED COMPLETADO EXITOSAMENTE');
        console.log('═'.repeat(50) + '\n');
        
    } catch (error) {
        console.error('\n❌ Error fatal:', error.message);
        process.exit(1);
    }
}

main();
