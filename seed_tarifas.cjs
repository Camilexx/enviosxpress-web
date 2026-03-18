const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Faltan variables de entorno');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Ciudades del Excel COBERTURA - ENVIOS EXPRESS (246 ciudades)
const cities = [
    { name: 'CUENCA', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'BELLAVISTA', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CAÑARIBAMBA', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'EL BATÁN', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'EL SAGRARIO', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'EL VECINO', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'GIL RAMÍREZ DÁVALOS', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'HUAYNACÁPAC', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'MACHÁNGARA', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'MONAY', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN BLAS', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN SEBASTIÁN', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SUCRE', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'TOTORACOCHA', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'YANUNCAY', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'HERMANO MIGUEL', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CAPULISPAMBA', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'BAÑOS', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'RICAURTE', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'SAN JOAQUIN', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'SAYAUSI', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'TURI', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'SININCAY (RACAR)', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'LUIS CORDERO', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'SANTA ANA', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'TARQUI', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'VALLE', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'GIRON', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'GUALACEO', province: 'AZUAY', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'TULCÁN', province: 'CARCHI', zone_name: 'NORTE', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'GONZÁLEZ SUÁREZ', province: 'CARCHI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'BOLIVAR', province: 'CARCHI', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'HUACA', province: 'CARCHI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'SAN GABRIEL', province: 'CARCHI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'JULIO ANDRADE', province: 'CARCHI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'MIRA', province: 'CARCHI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'AZOGUES', province: 'CAÑAR', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: '48 HORAS', is_active: true },
    { name: 'CAÑAR', province: 'CAÑAR', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'EL TAMBO', province: 'CAÑAR', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '72 HORAS', is_active: true },
    { name: 'BIBLIAN', province: 'CAÑAR', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '72 HORAS', is_active: true },
    { name: 'LATACUNGA', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'ELOY ALFARO (SAN FELIPE)', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'IGNACIO FLORES (PARQUE FLORES)', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'JUAN MONTALVO (SAN SEBASTIÁN)', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA MATRIZ', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN BUENAVENTURA', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'MULALO (LASSO)', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: 'LUNES', is_active: true },
    { name: 'SALCEDO', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '72 HORAS', is_active: true },
    { name: 'PUJILI', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MARTES', is_active: true },
    { name: 'SAQUISILI', province: 'COTOPAXI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'LUNES', is_active: true },
    { name: 'RIOBAMBA', province: 'CHIMBORAZO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'LIZARZABURU', province: 'CHIMBORAZO', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'MALDONADO', province: 'CHIMBORAZO', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'VELASCO', province: 'CHIMBORAZO', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'VELOZ', province: 'CHIMBORAZO', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'YARUQUÍES', province: 'CHIMBORAZO', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'GUANO RETIRO DE OFICINA RIOBAMBA', province: 'CHIMBORAZO', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'RETIRO OFICINA RIOBAMBA', is_active: true },
    { name: 'GUAYAQUIL', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'AYACUCHO', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'BOLÍVAR (SAGRARIO)', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CARBO (CONCEPCIÓN)', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'FEBRES CORDERO', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'GARCÍA MORENO', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LETAMENDI', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'NUEVE DE OCTUBRE', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'OLMEDO (SAN ALEJO)', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'ROCA', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'ROCAFUERTE', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SUCRE', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'TARQUI', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'URDANETA', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'XIMENA', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'DURAN', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'EL RECREO', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'ELOY ALFARO (DURÁN)', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'PASCUALES', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'LA PUNTILLA (SATÉLITE)', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 A 72 HORAS', is_active: true },
    { name: 'SAMBORONDÓN', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'LA AURORA (SATÉLITE)', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MIERCOLES', is_active: true },
    { name: 'LAUREL', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MIERCOLES', is_active: true },
    { name: 'LIMONAL', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MIERCOLES', is_active: true },
    { name: 'SAN CARLOS', province: 'GUAYAS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '72 HORAS', is_active: true },
    { name: 'IBARRA', province: 'IMBABURA', zone_name: 'NORTE', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'ATUNTAQUI', province: 'IMBABURA', zone_name: 'NORTE', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'OTAVALO', province: 'IMBABURA', zone_name: 'NORTE', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'COTACACHI', province: 'IMBABURA', zone_name: 'NORTE', city_tier: 'ESPECIAL', delivery_time: 'MARTES Y JUEVES', is_active: true },
    { name: 'SAN ANTONIO', province: 'IMBABURA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'ANTONIO ANTE', province: 'IMBABURA', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: '48 HORAS', is_active: true },
    { name: 'ANDRADE MARÍN (LOURDES)', province: 'IMBABURA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'SAN JOSE DE CHALTURA', province: 'IMBABURA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'QUEVEDO', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'BUENA FE', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN CAMILO', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'VALENCIA', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA MANA', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'EL EMPALME', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: 'MARTES - JUEVES - SABADO', is_active: true },
    { name: 'SAN JUAN', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MARTES - JUEVES - SABADO', is_active: true },
    { name: 'TRES POSTES', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MARTES - JUEVES - SABADO', is_active: true },
    { name: 'BABAHOYO', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MARTES - JUEVES - SABADO', is_active: true },
    { name: 'VENTANAS', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MARTES - JUEVES - SABADO', is_active: true },
    { name: 'JUJAN', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MARTES - JUEVES - SABADO', is_active: true },
    { name: 'MILAGRO', province: 'LOS RIOS', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MARTES - JUEVES - SABADO', is_active: true },
    { name: 'MANTA', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS - DESPUES DE 13:00 PM', is_active: true },
    { name: 'PORTOVIEJO', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'TOSAGUA', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'FLAVIO ALFARO', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'ROCAFUERTE', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'PICOAZA', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'MONTECRISTI', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CHONE', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'EL CARMEN', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'BAHIA', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: 'VIERNES', is_active: true },
    { name: 'CALCETA', province: 'MANABI', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: 'MIERCOLES - SABADO', is_active: true },
    { name: 'QUITO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'BELISARIO QUEVEDO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CARCELÉN', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CENTRO HISTÓRICO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CHILIBULO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CHILLOGALLO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CHIMBACALLE', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'COCHAPAMBA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'COMITÉ DEL PUEBLO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'COTOCOLLAO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'EL CONDADO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'IÑAQUITO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'ITCHIMBIA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'JIPIJAPA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'KENNEDY', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA ARGELIA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA CONCEPCIÓN', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA FERROVIARIA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA LIBERTAD', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA MAGDALENA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA MENA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA MERCED (CENTRO HISTORICO)', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'MARISCAL SUCRE', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'PONCEANO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'QUITUMBE', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'RUMIPAMBA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN BARTOLO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN ISIDRO DEL INCA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SOLANDA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'TURUBAMBA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN JUAN', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CALDERON (CARAPUNGO)', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CONOCOTO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CUMBAYA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'GUAMANÍ', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA ECUATORIANA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LLANO CHICO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'POMASQUI', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN ANTONIO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'TUMBACO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'ZAMBIZA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'COTOGCHOA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN RAFAEL', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SANGOLQUÍ', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'AMAGUAÑA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'TAMBILLO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'UYUMBICHO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'TABABELA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'CAYAMBE', province: 'PICHINCHA', zone_name: 'NORTE', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'TABACUNDO', province: 'PICHINCHA', zone_name: 'NORTE', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'ASCAZUBI', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: '48 HORAS', is_active: true },
    { name: 'SANTA ROSA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'MACHACHI', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'ALOAG', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'ALOASÍ', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'CUTUGLAHUA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'CHECA (CHILPA)', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'EL QUINCHE', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'GUANGOPOLO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'GUAYLLABAMBA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'PIFO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'PINTAG', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'PUEMBO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'PUENGASI', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'YARUQUI', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'FAJARDO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'SAN PEDRO DE TABOADA', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'NAYON', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA MERCED', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'ILALO', province: 'PICHINCHA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SANTO DOMINGO', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'ABRAHAM CALAZACÓN', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'RÍO TOACHI', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'RÍO VERDE', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'ZARACAY', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'EL CARMEN', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: 'DE 24 A 48 HORAS', is_active: true },
    { name: 'LA CONCORDIA', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: 'DE 24 A 48 HORAS', is_active: true },
    { name: 'LA UNION', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: 'DE 24 A 48 HORAS', is_active: true },
    { name: 'QUININDE', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: 'DE 24 A 48 HORAS', is_active: true },
    { name: 'PATRICIA PILAR', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: 'DE 24 A 48 HORAS', is_active: true },
    { name: 'SAN MIGUEL DE LOS BANCOS', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '72 HORAS', is_active: true },
    { name: 'PEDRO VICENTE MALDONADO', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '72 HORAS', is_active: true },
    { name: 'PUERTO QUITO', province: 'SANTO DOMINGO', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '72 HORAS', is_active: true },
    { name: 'ESMERALDAS', province: 'ESMERALDAS', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'TONSUPA', province: 'ESMERALDAS', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'ATACAMES', province: 'ESMERALDAS', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'MUISNE', province: 'ESMERALDAS', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '48 HORAS', is_active: true },
    { name: 'PEDERNALES', province: 'ESMERALDAS', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: 'MIERCOLES - SABADO', is_active: true },
    { name: 'AMBATO', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'ATOCHA - FICOA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CELIANO MONGE', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'HUACHI LORETO', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA MERCED', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'LA PENÍNSULA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'MATRIZ', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN FRANCISCO', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'SAN BARTOLOME DE PINLLO', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'ATAHUALPA (CHISALATA)', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'AUGUSTO N. MARTINEZ (MUNDUGLEO)', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'HUACHI GRANDE', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'PICAIGUA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'SANTA ROSA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'TOTORAS', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'PISHILATA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'ESPECIAL', delivery_time: '48 HORAS', is_active: true },
    { name: 'HUACHI CHICO', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '48 HORAS', is_active: true },
    { name: 'CEVALLOS', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'MOCHA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'IZAMBA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'PATATE', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'BAÑOS DE AGUA SANTA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'PELILEO', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'QUERO', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'PELILEO GRANDE', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'SALASACA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'CIUDAD NUEVA', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'PILLARO', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'TISALEO', province: 'TUNGURAHUA', zone_name: 'NACIONAL', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'LAGO AGRIO', province: 'SUCUMBIOS', zone_name: 'ORIENTE', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'SHUSHUFINDI', province: 'SUCUMBIOS', zone_name: 'ORIENTE', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'CASCALES', province: 'SUCUMBIOS', zone_name: 'ORIENTE', city_tier: 'ESPECIAL', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'LUMBAQUI', province: 'SUCUMBIOS', zone_name: 'ORIENTE', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'EL ENO', province: 'SUCUMBIOS', zone_name: 'ORIENTE', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'PROYECTO', province: 'SUCUMBIOS', zone_name: 'ORIENTE', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'EL COCA', province: 'FRANCISCO DE ORELLANA', zone_name: 'ORIENTE', city_tier: 'PRINCIPAL', delivery_time: '24 HORAS', is_active: true },
    { name: 'JOYA DE LOS SACHAS', province: 'FRANCISCO DE ORELLANA', zone_name: 'ORIENTE', city_tier: 'SECUNDARIO', delivery_time: '24 HORAS', is_active: true },
    { name: 'DAYUMA', province: 'FRANCISCO DE ORELLANA', zone_name: 'ORIENTE', city_tier: 'ESPECIAL', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'LORETO', province: 'FRANCISCO DE ORELLANA', zone_name: 'ORIENTE', city_tier: 'SECUNDARIO', delivery_time: '24 A 48 HORAS', is_active: true },
    { name: 'TENA', province: 'NAPO', zone_name: 'ORIENTE', city_tier: 'PRINCIPAL', delivery_time: 'MARTES - JUEVES', is_active: true },
    { name: 'BAEZA', province: 'NAPO', zone_name: 'ORIENTE', city_tier: 'SECUNDARIO', delivery_time: 'MARTES - JUEVES', is_active: true },
    { name: 'EL CHACO', province: 'NAPO', zone_name: 'ORIENTE', city_tier: 'ESPECIAL', delivery_time: 'MARTES - JUEVES', is_active: true },
    { name: 'ARCHIDONA', province: 'NAPO', zone_name: 'ORIENTE', city_tier: 'SECUNDARIO', delivery_time: 'MARTES - JUEVES', is_active: true },
    { name: 'PUYO', province: 'PASTAZA', zone_name: 'ORIENTE', city_tier: 'PRINCIPAL', delivery_time: 'MARTES - JUEVES', is_active: true },
    { name: 'SANTA CLARA', province: 'PASTAZA', zone_name: 'ORIENTE', city_tier: 'SECUNDARIO', delivery_time: 'MARTES - JUEVES', is_active: true }
];

// Tarifas actualizadas según ENVIOSXPRESS_Guia_v3.1
const shippingRates = [
    // NACIONAL - Ciudad a Ciudad
    { zone_name: 'nacional', shipment_type: 'documento', city_tier: 'ciudad', base_price: 3.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.25, is_active: true },
    { zone_name: 'nacional', shipment_type: 'carga', city_tier: 'ciudad', base_price: 3.00, extra_kg_price_min: 0.25, extra_kg_price_max: 0.25, is_active: true },
    // NACIONAL - Principal
    { zone_name: 'nacional', shipment_type: 'documento', city_tier: 'principal', base_price: 3.50, extra_kg_price_min: 0.35, extra_kg_price_max: 0.35, is_active: true },
    { zone_name: 'nacional', shipment_type: 'carga', city_tier: 'principal', base_price: 3.50, extra_kg_price_min: 0.35, extra_kg_price_max: 0.35, is_active: true },
    // NACIONAL - Secundario
    { zone_name: 'nacional', shipment_type: 'documento', city_tier: 'secundario', base_price: 4.00, extra_kg_price_min: 0.45, extra_kg_price_max: 0.45, is_active: true },
    { zone_name: 'nacional', shipment_type: 'carga', city_tier: 'secundario', base_price: 4.00, extra_kg_price_min: 0.45, extra_kg_price_max: 0.45, is_active: true },
    // NACIONAL - Especial
    { zone_name: 'nacional', shipment_type: 'documento', city_tier: 'especial', base_price: 5.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.50, is_active: true },
    { zone_name: 'nacional', shipment_type: 'carga', city_tier: 'especial', base_price: 5.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.50, is_active: true },
    // NORTE (30% dto ya aplicado)
    { zone_name: 'norte', shipment_type: 'documento', city_tier: 'ciudad', base_price: 2.10, extra_kg_price_min: 0.25, extra_kg_price_max: 0.25, is_active: true },
    { zone_name: 'norte', shipment_type: 'carga', city_tier: 'ciudad', base_price: 2.10, extra_kg_price_min: 0.25, extra_kg_price_max: 0.25, is_active: true },
    { zone_name: 'norte', shipment_type: 'documento', city_tier: 'principal', base_price: 2.45, extra_kg_price_min: 0.35, extra_kg_price_max: 0.35, is_active: true },
    { zone_name: 'norte', shipment_type: 'carga', city_tier: 'principal', base_price: 2.45, extra_kg_price_min: 0.35, extra_kg_price_max: 0.35, is_active: true },
    { zone_name: 'norte', shipment_type: 'documento', city_tier: 'secundario', base_price: 2.80, extra_kg_price_min: 0.45, extra_kg_price_max: 0.45, is_active: true },
    { zone_name: 'norte', shipment_type: 'carga', city_tier: 'secundario', base_price: 2.80, extra_kg_price_min: 0.45, extra_kg_price_max: 0.45, is_active: true },
    { zone_name: 'norte', shipment_type: 'documento', city_tier: 'especial', base_price: 3.50, extra_kg_price_min: 0.50, extra_kg_price_max: 0.50, is_active: true },
    { zone_name: 'norte', shipment_type: 'carga', city_tier: 'especial', base_price: 3.50, extra_kg_price_min: 0.50, extra_kg_price_max: 0.50, is_active: true },
    // ORIENTE
    { zone_name: 'oriente', shipment_type: 'documento', city_tier: 'principal', base_price: 5.00, extra_kg_price_min: 0.45, extra_kg_price_max: 0.45, is_active: true },
    { zone_name: 'oriente', shipment_type: 'carga', city_tier: 'principal', base_price: 5.00, extra_kg_price_min: 0.45, extra_kg_price_max: 0.45, is_active: true },
    { zone_name: 'oriente', shipment_type: 'documento', city_tier: 'secundario', base_price: 6.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.50, is_active: true },
    { zone_name: 'oriente', shipment_type: 'carga', city_tier: 'secundario', base_price: 6.00, extra_kg_price_min: 0.50, extra_kg_price_max: 0.50, is_active: true },
    { zone_name: 'oriente', shipment_type: 'documento', city_tier: 'especial', base_price: 7.00, extra_kg_price_min: 0.75, extra_kg_price_max: 0.75, is_active: true },
    { zone_name: 'oriente', shipment_type: 'carga', city_tier: 'especial', base_price: 7.00, extra_kg_price_min: 0.75, extra_kg_price_max: 0.75, is_active: true },
    { zone_name: 'oriente', shipment_type: 'documento', city_tier: 'ciudad', base_price: 5.00, extra_kg_price_min: 0.45, extra_kg_price_max: 0.45, is_active: true },
    { zone_name: 'oriente', shipment_type: 'carga', city_tier: 'ciudad', base_price: 5.00, extra_kg_price_min: 0.45, extra_kg_price_max: 0.45, is_active: true }
];

const zones = [
    { name: 'nacional', display_name: 'Nacional', discount_pct: 0, description: 'Todo Ecuador excepto Zona Norte y Oriente' },
    { name: 'norte', display_name: 'Zona Norte', discount_pct: 30, description: 'Ibarra, Otavalo, Cotacachi, Atuntaqui, Cayambe, Tabacundo, Tulcán' },
    { name: 'oriente', display_name: 'Oriente', discount_pct: 0, description: 'Tena, Lago Agrio, Puyo, El Coca' }
];

async function seed() {
    console.log('\n🚀 Actualizando tarifas y ciudades en Supabase...\n');

    // 1. Insertar zonas
    console.log('📍 Insertando zonas...');
    for (const zone of zones) {
        const { error } = await supabase.from('zones').upsert(zone, { onConflict: 'name' });
        if (error) console.error(`  ❌ ${zone.name}: ${error.message}`);
        else console.log(`  ✅ ${zone.display_name}`);
    }

    // 2. Insertar tarifas
    console.log('\n💰 Insertando tarifas...');
    for (const rate of shippingRates) {
        const { error } = await supabase.from('shipping_rates').upsert(rate, { onConflict: 'zone_name,shipment_type,city_tier' });
        if (error) console.error(`  ❌ ${rate.zone_name}/${rate.shipment_type}/${rate.city_tier}: ${error.message}`);
    }
    console.log(`  ✅ ${shippingRates.length} tarifas actualizadas`);

    // 3. Insertar ciudades (en lotes)
    console.log('\n🏙️ Insertando ciudades...');
    const chunkSize = 50;
    for (let i = 0; i < cities.length; i += chunkSize) {
        const chunk = cities.slice(i, i + chunkSize);
        const { error } = await supabase.from('cities').upsert(chunk, { onConflict: 'name,province' });
        if (error) {
            console.error(`  ❌ Error lote ${Math.floor(i/chunkSize)+1}: ${error.message}`);
        } else {
            console.log(`  ✅ Lote ${Math.floor(i/chunkSize)+1}: ${chunk.length} ciudades`);
        }
    }

    // 4. Verificar
    console.log('\n🔍 Verificando datos...');
    const [citiesRes, ratesRes, zonesRes] = await Promise.all([
        supabase.from('cities').select('*', { count: 'exact', head: true }),
        supabase.from('shipping_rates').select('*', { count: 'exact', head: true }),
        supabase.from('zones').select('*', { count: 'exact', head: true })
    ]);

    console.log(`  📊 Ciudades: ${citiesRes.count}`);
    console.log(`  📊 Tarifas: ${ratesRes.count}`);
    console.log(`  📊 Zonas: ${zonesRes.count}`);

    console.log('\n✅ ACTUALIZACIÓN COMPLETADA\n');
}

seed().catch(console.error);
