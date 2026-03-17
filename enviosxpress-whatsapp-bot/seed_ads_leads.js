require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const leads = [
    { phone: '593981112223@c.us', source: 'meta_ads', status: 'en_conversacion' },
    { phone: '593992223334@c.us', source: 'meta_ads', status: 'agendado' },
    { phone: '593963334445@c.us', source: 'meta_ads', status: 'descartado' },
    { phone: '593984445556@c.us', source: 'meta_ads', status: 'en_conversacion' },
    { phone: '593995556667@c.us', source: 'meta_ads', status: 'agendado' },
    { phone: '593966667778@c.us', source: 'meta_ads', status: 'en_conversacion' }
];

const chatHistories = [
    {
        lead_phone: '593981112223@c.us',
        message_in: 'Hola, vengo de Facebook, quiero saber precios para envíos a Manta.',
        response_out: '¡Hola! Perfecto, los envíos a la Costa están saliendo todos los días. La mayoría cobra $7, pero nosotros arrancamos desde $4.50. ¿Es un envío frecuente o de una sola vez?'
    },
    {
        lead_phone: '593992223334@c.us',
        message_in: 'Tengo una tienda de ropa y necesito envíos con pago contra entrega en Quito.',
        response_out: '¡Excelente! Nosotros no le cobramos recargos extra por usar contra entrega. Un Jefe Operativo le contactará enseguida para afinar los detalles de su recolección. ¡Es un servicio muy valorado por las tiendas locales!'
    },
    {
        lead_phone: '593963334445@c.us',
        message_in: '¿Aceptan enviar repuestos de motos a la Amazonía?',
        response_out: 'Dependiendo del peso exacto y si no contienen fluidos inflamables, sí los llevamos. Para esa ruta especial el valor ronda los $7.00. ¿De cuántos kilos hablamos?'
    },
    {
        lead_phone: '593984445556@c.us',
        message_in: 'Buen día, ¿pueden recolectar un paquete hoy mismo en Cumbayá?',
        response_out: '¡Buen día! La ruta de los valles suele cerrar al mediodía. Déjeme validar con logística si aún tenemos espacio para despacharlo hoy mismo. Un tip: si programa sus entregas de Cumbayá un día antes, su tarifa es mucho más baja.'
    },
    {
        lead_phone: '593995556667@c.us',
        message_in: 'Me interesa el servicio para mi e-commerce de maquillaje. Hago 15 envíos semanales.',
        response_out: '¡Increíble! Para ese volumen tenemos tarifas corporativas preferenciales y podemos integrarnos con su tienda. Nuestra Jefa Administrativa le registrará en este momento para abrir su cuenta de cliente VIP.'
    },
    {
        lead_phone: '593966667778@c.us',
        message_in: 'Cuánto se demora a Guayaquil un repuesto pequeño?',
        response_out: 'Si lo entregamos en nuestra matriz hoy hasta las 4 PM, mañana en la tarde su cliente en Guayaquil lo tiene en sus manos. ¡La ruta a la costa es exprés!'
    }
];

async function seed() {
    console.log("Seeding remaining 6 leads...");
    for (const lead of leads) {
        await supabase.from('leads').upsert({
            phone: lead.phone,
            status: lead.status,
            last_interaction: new Date().toISOString()
        }, { onConflict: 'phone' });
    }

    console.log("Seeding chat history...");
    for (const chat of chatHistories) {
        await supabase.from('chat_history').insert({
            lead_phone: chat.lead_phone,
            message_in: chat.message_in,
            response_out: chat.response_out
        });
    }
    console.log("Done seeding remaining leads!");
}

seed();
