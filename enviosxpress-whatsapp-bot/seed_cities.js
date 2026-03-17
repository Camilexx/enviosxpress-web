require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ─── Datos de cobertura reales del Excel "COBERTURA - ENVIOS EXPRESS.xlsx" ───
const cities = [
  // AZUAY
  { name: 'Cuenca', province: 'Azuay', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Capulispamba', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
  { name: 'Baños (Azuay)', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
  { name: 'Ricaurte', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
  { name: 'San Joaquín', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
  { name: 'Sayausi', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
  { name: 'Turi', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
  { name: 'Sinincay (Racar)', province: 'Azuay', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
  { name: 'Santa Ana', province: 'Azuay', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },
  { name: 'Tarqui', province: 'Azuay', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },
  { name: 'Valle', province: 'Azuay', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },
  { name: 'Girón', province: 'Azuay', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },
  { name: 'Gualaceo', province: 'Azuay', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },

  // CARCHI (Zona Norte - 30% dto)
  { name: 'Tulcán', province: 'Carchi', zone_name: 'norte', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'González Suárez', province: 'Carchi', zone_name: 'norte', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Bolívar', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24 horas' },
  { name: 'Huaca', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24-48 horas' },
  { name: 'San Gabriel', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24-48 horas' },
  { name: 'Julio Andrade', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24-48 horas' },
  { name: 'Mira', province: 'Carchi', zone_name: 'norte', city_tier: 'especial', delivery_time: '24-48 horas' },

  // CAÑAR
  { name: 'Azogues', province: 'Cañar', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
  { name: 'Cañar', province: 'Cañar', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
  { name: 'El Tambo', province: 'Cañar', zone_name: 'nacional', city_tier: 'especial', delivery_time: '72 horas' },
  { name: 'Biblián', province: 'Cañar', zone_name: 'nacional', city_tier: 'especial', delivery_time: '72 horas' },

  // COTOPAXI
  { name: 'Latacunga', province: 'Cotopaxi', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Salcedo', province: 'Cotopaxi', zone_name: 'nacional', city_tier: 'especial', delivery_time: '72 horas' },
  { name: 'Pujilí', province: 'Cotopaxi', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Martes' },
  { name: 'Saquisilí', province: 'Cotopaxi', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Lunes' },
  { name: 'Mulalό (Lasso)', province: 'Cotopaxi', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Lunes' },

  // CHIMBORAZO
  { name: 'Riobamba', province: 'Chimborazo', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },

  // GUAYAS
  { name: 'Guayaquil', province: 'Guayas', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Durán', province: 'Guayas', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48-72 horas' },
  { name: 'Samborondón', province: 'Guayas', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },
  { name: 'Milagro', province: 'Guayas', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Martes, Jueves, Sábado' },
  { name: 'Pascuales', province: 'Guayas', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },
  { name: 'La Puntilla', province: 'Guayas', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48-72 horas' },

  // IMBABURA (Zona Norte - 30% dto)
  { name: 'Ibarra', province: 'Imbabura', zone_name: 'norte', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Atuntaqui', province: 'Imbabura', zone_name: 'norte', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Otavalo', province: 'Imbabura', zone_name: 'norte', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'San Antonio de Ibarra', province: 'Imbabura', zone_name: 'norte', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Cotacachi', province: 'Imbabura', zone_name: 'norte', city_tier: 'especial', delivery_time: 'Martes y Jueves' },
  { name: 'Antonio Ante', province: 'Imbabura', zone_name: 'norte', city_tier: 'especial', delivery_time: '48 horas' },

  // LOS RÍOS
  { name: 'Quevedo', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Buena Fe', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Valencia', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'La Maná', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Babahoyo', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Martes, Jueves, Sábado' },
  { name: 'Ventanas', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Martes, Jueves, Sábado' },
  { name: 'El Empalme', province: 'Los Ríos', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Martes, Jueves, Sábado' },

  // MANABÍ
  { name: 'Manta', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas (después 13h)' },
  { name: 'Portoviejo', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Chone', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'El Carmen', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Montecristi', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Tosagua', province: 'Manabí', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Bahía de Caráquez', province: 'Manabí', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Viernes' },
  { name: 'Calceta', province: 'Manabí', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Miércoles, Sábado' },

  // PICHINCHA
  { name: 'Quito', province: 'Pichincha', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Calderón (Carapungo)', province: 'Pichincha', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Conocoto', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Cumbayá', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Tumbaco', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Sangolquí', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'San Rafael', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Pomasqui', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'San Antonio de Quito', province: 'Pichincha', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Amaguaña', province: 'Pichincha', zone_name: 'nacional', city_tier: 'especial', delivery_time: '24-48 horas' },
  { name: 'Tambillo', province: 'Pichincha', zone_name: 'nacional', city_tier: 'especial', delivery_time: '24-48 horas' },
  { name: 'Machachi', province: 'Pichincha', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
  { name: 'Guayllabamba', province: 'Pichincha', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
  { name: 'Pintag', province: 'Pichincha', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
  { name: 'El Quinche', province: 'Pichincha', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
  { name: 'Pifo', province: 'Pichincha', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
  { name: 'Puembo', province: 'Pichincha', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
  { name: 'Cayambe', province: 'Pichincha', zone_name: 'norte', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Tabacundo', province: 'Pichincha', zone_name: 'norte', city_tier: 'secundaria', delivery_time: '24 horas' },

  // SANTO DOMINGO
  { name: 'Santo Domingo', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'El Carmen (SD)', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
  { name: 'La Concordia', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
  { name: 'Quinindé', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
  { name: 'La Unión', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
  { name: 'Pedro Vicente Maldonado', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'especial', delivery_time: '72 horas' },
  { name: 'Puerto Quito', province: 'Santo Domingo', zone_name: 'nacional', city_tier: 'especial', delivery_time: '72 horas' },

  // ESMERALDAS
  { name: 'Esmeraldas', province: 'Esmeraldas', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Tonsupa', province: 'Esmeraldas', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Atacames', province: 'Esmeraldas', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Muisne', province: 'Esmeraldas', zone_name: 'nacional', city_tier: 'especial', delivery_time: '48 horas' },
  { name: 'Pedernales', province: 'Esmeraldas', zone_name: 'nacional', city_tier: 'especial', delivery_time: 'Miércoles, Sábado' },

  // TUNGURAHUA
  { name: 'Ambato', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Baños de Agua Santa', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
  { name: 'Pelileo', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
  { name: 'Patate', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
  { name: 'Cevallos', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
  { name: 'Pillaro', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },
  { name: 'Tisaleo', province: 'Tungurahua', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },

  // EL ORO
  { name: 'Machala', province: 'El Oro', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '24-48 horas' },

  // LOJA
  { name: 'Loja', province: 'Loja', zone_name: 'nacional', city_tier: 'secundaria', delivery_time: '48 horas' },

  // ORIENTE — SUCUMBÍOS
  { name: 'Lago Agrio', province: 'Sucumbíos', zone_name: 'oriente', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Shushufindi', province: 'Sucumbíos', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Cascales', province: 'Sucumbíos', zone_name: 'oriente', city_tier: 'especial', delivery_time: '24-48 horas' },
  { name: 'Lumbaquí', province: 'Sucumbíos', zone_name: 'oriente', city_tier: 'especial', delivery_time: '24-48 horas' },

  // ORIENTE — FRANCISCO DE ORELLANA
  { name: 'El Coca', province: 'Francisco de Orellana', zone_name: 'oriente', city_tier: 'principal', delivery_time: '24 horas' },
  { name: 'Joya de los Sachas', province: 'Francisco de Orellana', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: '24 horas' },
  { name: 'Dayuma', province: 'Francisco de Orellana', zone_name: 'oriente', city_tier: 'especial', delivery_time: '24-48 horas' },
  { name: 'Loreto', province: 'Francisco de Orellana', zone_name: 'oriente', city_tier: 'especial', delivery_time: '24-48 horas' },

  // ORIENTE — NAPO
  { name: 'Tena', province: 'Napo', zone_name: 'oriente', city_tier: 'principal', delivery_time: 'Martes y Jueves' },
  { name: 'Baeza', province: 'Napo', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: 'Martes y Jueves' },
  { name: 'El Chaco', province: 'Napo', zone_name: 'oriente', city_tier: 'especial', delivery_time: 'Martes y Jueves' },
  { name: 'Archidona', province: 'Napo', zone_name: 'oriente', city_tier: 'especial', delivery_time: 'Martes y Jueves' },

  // ORIENTE — PASTAZA
  { name: 'Puyo', province: 'Pastaza', zone_name: 'oriente', city_tier: 'principal', delivery_time: 'Martes y Jueves' },
  { name: 'Mera', province: 'Pastaza', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: 'Martes y Jueves' },
  { name: 'Shell', province: 'Pastaza', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: 'Martes y Jueves' },
  { name: 'Santa Clara', province: 'Pastaza', zone_name: 'oriente', city_tier: 'secundaria', delivery_time: 'Martes y Jueves' }
];

async function seedCities() {
  console.log(`\nInsertando ${cities.length} ciudades...`);
  
  // Insertar en lotes de 20 para evitar límites
  const chunkSize = 20;
  let inserted = 0;
  for (let i = 0; i < cities.length; i += chunkSize) {
    const chunk = cities.slice(i, i + chunkSize);
    const { error } = await supabase.from('cities').upsert(chunk, { onConflict: 'name,province' });
    if (error) {
      console.error(`Error en lote ${i}: ${error.message}`);
    } else {
      inserted += chunk.length;
      process.stdout.write(`  ✅ Lote ${Math.floor(i/chunkSize)+1}: ${chunk.length} ciudades\n`);
    }
  }

  // Verificar
  const { data, error } = await supabase.from('cities').select('zone_name, city_tier', { count: 'exact' });
  if (!error) {
    const zoneSummary = {};
    data.forEach(c => {
      const key = `${c.zone_name}/${c.city_tier}`;
      zoneSummary[key] = (zoneSummary[key] || 0) + 1;
    });
    console.log('\n=== Resumen por zona/tier ===');
    Object.entries(zoneSummary).sort().forEach(([k,v]) => console.log(`  ${k}: ${v} ciudades`));
    console.log(`\nTotal: ${data.length} ciudades insertadas ✅`);
  }
}

seedCities().catch(console.error);
