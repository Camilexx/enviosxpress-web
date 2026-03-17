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
    { phone: '593987654321@c.us', source: 'meta_ads', status: 'en_conversacion' },
    { phone: '593991234567@c.us', source: 'organic', status: 'agendado' },
    { phone: '593963456789@c.us', source: 'meta_ads', status: 'descartado' },
    { phone: '593984567890@c.us', source: 'organic', status: 'en_conversacion' },
    { phone: '593998765432@c.us', source: 'meta_ads', status: 'agendado' }
];

const chatHistories = [
    {
        lead_phone: '593987654321@c.us',
        message_in: 'Hola, vi su anuncio en Instagram. Necesito enviar unas cajas pequeñas a Guayaquil.',
        response_out: '¡Hola! Qué gusto saludarte. Te cuento que justamente esta semana tenemos un gran volumen de envíos a Guayaquil por lo que nuestros camiones salen a diario. ¿Aproximadamente cuántas cajitas serían y de qué peso? 😊'
    },
    {
        lead_phone: '593991234567@c.us',
        message_in: 'Buenas tardes. ¿Cuál es el costo de un envío exprés a Cuenca de 5kg?',
        response_out: '¡Buenas tardes! La mayoría de couriers cobran entre $8 y $12 por ese peso... nosotros arrancamos desde $6.50 con seguro incluido. 😉 Un tip: si su paquete va bien sellado en caja dura, llega en perfectas condiciones al día siguiente. Le contactará nuestro equipo para coordinar la recogida.'
    },
    {
        lead_phone: '593963456789@c.us',
        message_in: 'Está muy caro, en la competencia me cobran 2 dólares menos.',
        response_out: 'Entiendo perfectamente, cada centavo cuenta en un emprendimiento. A diferencia de otros, nosotros incluimos el cobro contra entrega sin costo extra y recogida en domicilio, lo que le ahorra tiempo y taxis. De todas formas, ¡le deseo mucho éxito en sus ventas! Quedamos a las órdenes.'
    },
    {
        lead_phone: '593984567890@c.us',
        message_in: 'Hola, tengo un ecommerce de zapatos y hago unos 20 envíos a la semana. ¿Qué tarifas manejan?',
        response_out: '¡Qué excelente noticia! Para emprendedores fuertes como tú que superan los 10 envíos semanales armamos planes corporativos especiales con tarifas congeladas. Le agendaré un contacto con nuestro Jefe Operativo en unos minutos para que le pase la tabla de precios exclusiva. ¿Usted se ubica en Quito o en los valles?'
    },
    {
        lead_phone: '593998765432@c.us',
        message_in: 'Necesito que recojan un documento urgente en el norte de Quito para llevarlo al sur. Es solo papeles.',
        response_out: '¡Perfecto! Los documentos son nuestro fuerte. Tenemos una ruta ejecutiva en el norte que está por cerrar en 30 minutos. El envío local le saldría en $3.50. Nuestra Jefa Administrativa le escribirá enseguida para tomar los datos exactos. ¡No se preocupe que llega seguro!'
    }
];

async function seed() {
    console.log("Seeding leads...");
    for (const lead of leads) {
        const { error: errorLead } = await supabase.from('leads').upsert({
            phone: lead.phone,
            status: lead.status,
            last_interaction: new Date().toISOString()
            // Note: 'source' might not exist in table based on previous logs, we try passing it or ignoring it
        }, { onConflict: 'phone' });

        if (errorLead) {
            console.error("Error upserting lead:", lead.phone, errorLead.message);
        } else {
            console.log(`Lead ${lead.phone} upserted successfully.`);
        }
    }

    console.log("Seeding chat history...");
    for (const chat of chatHistories) {
        const { error: errorChat } = await supabase.from('chat_history').insert({
            lead_phone: chat.lead_phone,
            message_in: chat.message_in,
            response_out: chat.response_out
        });

        if (errorChat) {
            console.error("Error inserting chat:", chat.lead_phone, errorChat.message);
        } else {
            console.log(`Chat for ${chat.lead_phone} inserted successfully.`);
        }
    }
    console.log("Done!");
}

seed();
