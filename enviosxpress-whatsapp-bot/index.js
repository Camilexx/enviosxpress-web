require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenAI } = require('@google/genai');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'MISSING_API_KEY' });

const supabaseUrl = process.env.SUPABASE_URL || 'MISSING_URL';
const supabaseKey = process.env.SUPABASE_KEY || 'MISSING_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const log = {
    info:    (msg) => console.log(`[${new Date().toLocaleTimeString('es-EC')}] ℹ️  ${msg}`),
    lead:    (msg) => console.log(`[${new Date().toLocaleTimeString('es-EC')}] 💬 ${msg}`),
    bot:     (msg) => console.log(`[${new Date().toLocaleTimeString('es-EC')}] 🤖 ${msg}`),
    warn:    (msg) => console.warn(`[${new Date().toLocaleTimeString('es-EC')}] ⚠️  ${msg}`),
    error:   (msg) => console.error(`[${new Date().toLocaleTimeString('es-EC')}] ❌ ${msg}`),
    success: (msg) => console.log(`[${new Date().toLocaleTimeString('es-EC')}] ✅ ${msg}`),
};

// ═══════════════════════════════════════════════════════════════════════════
//  FLUJO ESTRUCTURADO:Máximo 3 Turnos
//  Turno 1: Origen → Destino
//  Turno 2: Tipo → Peso → (Opcional) Seguro
//  Turno 3: Cotización → Cierre
// ═══════════════════════════════════════════════════════════════════════════

const CONVERSATION_STATES = {
    START: 'start',
    AWAIT_DESTINO: 'await_destino',
    AWAIT_TIPO: 'await_tipo',
    AWAIT_PESO: 'await_peso',
    AWAIT_SEGURO: 'await_seguro',
    QUOTE_READY: 'quote_ready',
    COMPLETE: 'complete'
};

const conversationFlow = {};

function getOrCreateFlow(contactId) {
    if (!conversationFlow[contactId]) {
        conversationFlow[contactId] = {
            state: CONVERSATION_STATES.START,
            data: {
                nombre: null,
                origen: 'Quito',
                destino: null,
                tipo: null,
                peso: null,
                con_seguro: false,
                valor_declarado: null,
                plan: null
            },
            step: 0,
            startedAt: new Date().toISOString()
        };
    }
    return conversationFlow[contactId];
}

function resetFlow(contactId) {
    delete conversationFlow[contactId];
}

// ═══════════════════════════════════════════════════════════════════════════
//  EXTRACCIÓN INTELIGENTE DE DATOS (MEJORADA)
// ═══════════════════════════════════════════════════════════════════════════

const cityPatterns = [
    'quito', 'guayaquil', 'cuenca', 'manta', 'portoviejo', 'latacunga', 'riobamba', 'ambato',
    'ibarra', 'otavalo', 'cotacachi', 'atuntaqui', 'cayambe', 'tabacundo', 'tulcán', 'tulcan',
    'lago agrio', 'el coca', 'tena', 'puyo', 'milagro', 'quevedo', 'santo domingo', 'esmeraldas',
    'machala', 'loja', 'durán', 'samborondón', 'samborondon', 'calderón', 'calderon', 'cumbayá', 'cumbaya',
    'tumbaco', 'sangolquí', 'sangolqui', 'pomasqui', 'conocoto'
];

function extractCity(text) {
    const lower = text.toLowerCase();
    for (const city of cityPatterns) {
        if (lower.includes(city)) {
            return city.charAt(0).toUpperCase() + city.slice(1);
        }
    }
    return null;
}

function extractPeso(text) {
    const match = text.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilos)/i);
    if (match) return parseFloat(match[1]);
    
    const numbers = text.match(/\d+(?:\.\d+)?/g);
    if (numbers && numbers.length > 0) {
        const num = parseFloat(numbers[0]);
        if (num > 0 && num <= 1000) return num;
    }
    return null;
}

function extractTipo(text) {
    const lower = text.toLowerCase();
    if (lower.includes('documento') || lower.includes('sobre') || lower.includes('carta')) return 'documento';
    if (lower.includes('carga') || lower.includes('paquete') || lower.includes('producto') || lower.includes('mercancia')) return 'carga';
    return null;
}

function extractNombre(text) {
    const match = text.match(/(?:me llamo|soy|llamo|nombre|es)\s+([A-ZÁÉÍÓÚ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚ][a-záéíóúñ]+)?)/i);
    if (match) return match[1];
    return null;
}

function extractSiNo(text) {
    const lower = text.toLowerCase();
    if (lower.includes('si') || lower.includes('sí') || lower.includes('ok') || lower.includes('dale') || lower.includes('perfecto') || lower.includes('sí')) return true;
    if (lower.includes('no') || lower.includes('nah') || lower.includes('nada')) return false;
    return null;
}

function extractPlan(text) {
    const lower = text.toLowerCase();
    if (lower.includes('emprendedor') || lower.includes('empresa') || lower.includes('plan')) return 'emprendedor';
    return null;
}

// ═══════════════════════════════════════════════════════════════════════════
//  COTIZADOR UNIFICADO: Usa la misma función de Supabase
// ═══════════════════════════════════════════════════════════════════════════

async function getCotizacion(contactId) {
    const flow = getOrCreateFlow(contactId);
    const d = flow.data;

    try {
        const response = await fetch(`${supabaseUrl}/functions/v1/quote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseKey}`,
                'apikey': supabaseKey
            },
            body: JSON.stringify({
                destino: d.destino,
                tipo: d.tipo,
                peso: d.tipo === 'carga' ? d.peso : 0,
                con_seguro: d.con_seguro,
                valor_declarado: d.valor_declarado || 0,
                plan_code: d.plan || null
            })
        });

        const result = await response.json();
        return result;
    } catch (e) {
        log.error(`Error cotizando: ${e.message}`);
        return { success: false, error: e.message };
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  PROMPTS OPTIMIZADOS PARA FLUJO DE 3 TURNOS
// ═══════════════════════════════════════════════════════════════════════════

const TURN_PROMPTS = {
    [CONVERSATION_STATES.START]: `
Eres Sophia de EnviosXpress. Estás en el Turno 1 de 3.
Tu OBJETIVO: Capturar la ciudad de DESTINO del envío.

REGLAS:
- Saluda brevemente (1 línea máximo)
- Pregunta: "¿A qué ciudad va el envío?"
- NO hables de precios todavía
- Si el cliente menciona una ciudad, confirma y pasa al Turno 2

El origen siempre es Quito. Solo necesitas el destino ahora.
`,

    [CONVERSATION_STATES.AWAIT_DESTINO]: `
Eres Sophia de EnviosXpress. Estás en el Turno 2 de 3.
El cliente quiere enviar a: {{destino}}
Tu OBJETIVO: Capturar tipo de envío (documento o carga) y peso.

REGLAS:
- Confirma el destino brevemente
- Pregunta: "¿Es un documento o un paquete/carga?"
- Si dice paquete, pregunta el peso aproximado
- Una pregunta a la vez, máximo 2 líneas
`,

    [CONVERSATION_STATES.AWAIT_TIPO]: `
Eres Sophia de EnviosXpress. Estás en el Turno 2b de 3.
Tipo de envío: {{tipo}}
Peso: {{peso}}
Tu OBJETIVO: Ofrecer seguro opcional y aplicar descuento de plan si lo hay.

REGLAS:
- Da la cotización inmediata (has el cálculo mental o usa: $3-5 base + $0.25-0.75/kg)
- Menciona el seguro opcional (1% del valor)
- Pregunta: "¿Quieres asegurar el envío?"
- Una pregunta a la vez
`,

    [CONVERSATION_STATES.AWAIT_PESO]: `
Eres Sophia de EnviosXpress. Turno 3 - COTIZACIÓN.
Tipo: {{tipo}} | Destino: {{destino}}
Tu OBJETIVO: Dar la cotización exacta y cerrar.

REGLAS:
- Calcula y da el precio: Tarifa base + (kg extra × precio kg) - descuento zona (30% si norte)
- Ejemplo: "Tu envío a [destino] sale en $X.XX (incluye 5kg)"
- Da el tiempo de entrega
- Termina con: "¿Confirmamos este envío?"
- Máx 3 líneas
`,

    [CONVERSATION_STATES.QUOTE_READY]: `
Eres Sophia de EnviosXpress. Cierre.
Tu OBJETIVO: Confirmar el envío y derivar a agente humano.

REGLAS:
- Si confirma: "Perfecto, mi compañera Jefa Administrativa te contactará para coordinar el recojo. ¿En qué horario te queda mejor?"
- Si no: "Ningún problema, ¿qué información te falta?"
- Máx 2 líneas
`
};

// ═══════════════════════════════════════════════════════════════════════════
//  PROCESADOR DE MENSAJES CON FLUJO ESTRUCTURADO
// ═══════════════════════════════════════════════════════════════════════════

async function processMessage(contactId, incomingText) {
    const flow = getOrCreateFlow(contactId);
    const d = flow.data;

    // Extraer datos del mensaje actual
    const extractedCity = extractCity(incomingText);
    const extractedTipo = extractTipo(incomingText);
    const extractedPeso = extractPeso(incomingText);
    const extractedNombre = extractNombre(incomingText) || d.nombre;
    const extractedSiNo = extractSiNo(incomingText);

    // Actualizar datos
    if (extractedNombre) d.nombre = extractedNombre;

    log.info(`[${contactId}] Estado: ${flow.state} | Texto: ${incomingText.substring(0, 50)}`);

    // Máquina de estados
    switch (flow.state) {
        case CONVERSATION_STATES.START:
            // Turno 1: Capturar destino
            if (extractedCity) {
                d.destino = extractedCity;
                flow.state = CONVERSATION_STATES.AWAIT_TIPO;
                return await generateBotResponse(contactId, CONVERSATION_STATES.AWAIT_TIPO);
            } else {
                return await generateBotResponse(contactId, CONVERSATION_STATES.START);
            }

        case CONVERSATION_STATES.AWAIT_TIPO:
            // Turno 2: Capturar tipo y peso
            if (extractedTipo) {
                d.tipo = extractedTipo;
                if (extractedTipo === 'carga' && extractedPeso) {
                    d.peso = extractedPeso;
                    flow.state = CONVERSATION_STATES.QUOTE_READY;
                    return await generateBotResponse(contactId, CONVERSATION_STATES.QUOTE_READY, true);
                } else if (extractedTipo === 'carga') {
                    flow.state = CONVERSATION_STATES.AWAIT_PESO;
                    return await generateBotResponse(contactId, CONVERSATION_STATES.AWAIT_PESO);
                } else {
                    // Documento - ir directo a cotización
                    d.peso = 0;
                    flow.state = CONVERSATION_STATES.QUOTE_READY;
                    return await generateBotResponse(contactId, CONVERSATION_STATES.QUOTE_READY, true);
                }
            } else if (extractedPeso) {
                d.peso = extractedPeso;
                d.tipo = 'carga';
                flow.state = CONVERSATION_STATES.QUOTE_READY;
                return await generateBotResponse(contactId, CONVERSATION_STATES.QUOTE_READY, true);
            } else {
                return await generateBotResponse(contactId, CONVERSATION_STATES.AWAIT_TIPO);
            }

        case CONVERSATION_STATES.AWAIT_PESO:
            if (extractedPeso) {
                d.peso = extractedPeso;
                flow.state = CONVERSATION_STATES.QUOTE_READY;
                return await generateBotResponse(contactId, CONVERSATION_STATES.QUOTE_READY, true);
            }
            return "Para cotizar necesito saber el peso aproximado. ¿Cuánto pesa tu paquete?";

        case CONVERSATION_STATES.QUOTE_READY:
            if (extractedSiNo === true) {
                // Confirmó - derivar a agente
                flow.state = CONVERSATION_STATES.COMPLETE;
                saveLeadToCRM(contactId, d, 'cotizado');
                return "¡Perfecto! 🎉 Mi compañera Jefa Administrativa te contactará en breve para coordinar el recojo de tu paquete. ¿Tienes alguna preferencia de horario?";
            } else if (extractedSiNo === false) {
                resetFlow(contactId);
                return "¡Sin problema! Cuando necesites cotización aquí estaré. ¿Hay algo más en lo que te pueda ayudar?";
            }
            return "Para confirmar el envío, por favor responde SI. ¿Te gustaría proceder?";

        case CONVERSATION_STATES.COMPLETE:
            resetFlow(contactId);
            return await generateBotResponse(contactId, CONVERSATION_STATES.START);

        default:
            resetFlow(contactId);
            return await generateBotResponse(contactId, CONVERSATION_STATES.START);
    }
}

async function generateBotResponse(contactId, state, calculateQuote = false) {
    const flow = getOrCreateFlow(contactId);
    const d = flow.data;

    let quoteData = null;
    if (calculateQuote) {
        const quoteResult = await getCotizacion(contactId);
        if (quoteResult.success && quoteResult.quote) {
            quoteData = quoteResult.quote;
        }
    }

    let prompt = TURN_PROMPTS[state] || TURN_PROMPTS[CONVERSATION_STATES.START];

    // Reemplazar variables
    prompt = prompt
        .replace('{{destino}}', d.destino || '')
        .replace('{{tipo}}', d.tipo || '')
        .replace('{{peso}}', d.peso || '');

    // Si hay datos de cotización, agregarlos
    if (quoteData) {
        prompt += `\n\nDATOS DE COTIZACIÓN (calculados desde Supabase):
- Destino: ${quoteData.destino}
- Zona: ${quoteData.zone_name} ${quoteData.aplica_zona_norte ? '(30% dto)' : ''}
- Tipo: ${quoteData.shipment_type}
- Tarifa: $${quoteData.tarifa_base} (5kg)
${quoteData.recargo_peso > 0 ? `- Exceso: $${quoteData.recargo_peso}` : ''}
- Total: $${quoteData.precio_total}
- Entrega: ${quoteData.tiempo_entrega}`;
    }

    // Instrucciones adicionales
    prompt += `\n\nINSTRUCCIONES FINALES:
- Responde como Sophia, asesora real de EnviosXpress
- Máx 3 líneas
- Una pregunta a la vez
- Si es la primera vez, pregunta el nombre`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
        });

        let replyText = response.text || '';
        replyText = replyText
            .replace(/^(Sophia|Sofía|Bot|Asesora)\s*:\s*/i, '')
            .replace(/\*\*/g, '')
            .trim();

        if (!replyText || replyText.length < 2) {
            replyText = getFallbackResponse(state, d);
        }

        return replyText;
    } catch (e) {
        log.error(`Error generando respuesta: ${e.message}`);
        return getFallbackResponse(state, d);
    }
}

function getFallbackResponse(state, d) {
    switch (state) {
        case CONVERSATION_STATES.START:
            return "¡Hola! Soy Sophia de EnviosXpress 😊 ¿A qué ciudad necesitas enviar tu paquete?";
        case CONVERSATION_STATES.AWAIT_TIPO:
            return `Perfecto, envío a ${d.destino}. ¿Es documento o paquete/carga?`;
        case CONVERSATION_STATES.AWAIT_PESO:
            return "¿Cuánto pesa tu paquete aproximadamente?";
        case CONVERSATION_STATES.QUOTE_READY:
            return `Tu envío a ${d.destino} tiene una tarifa especial. ¿Confirmamos el envío?`;
        default:
            return "¡Perfecto! Te contactaremos pronto.";
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  CRM: Guardar lead
// ═══════════════════════════════════════════════════════════════════════════

async function saveLeadToCRM(phone, data, status) {
    if (supabaseUrl === 'MISSING_URL') return;

    try {
        await supabase.from('leads').upsert({
            phone: phone,
            name: data.nombre,
            city: data.destino,
            source: 'whatsapp_bot',
            status: status,
            last_interaction: new Date().toISOString()
        }, { onConflict: 'phone' });

        log.success(`Lead guardado: ${phone} - ${status}`);
    } catch (e) {
        log.error(`CRM save error: ${e.message}`);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  ANTI-SPAM Y SALUD DEL BOT
// ═══════════════════════════════════════════════════════════════════════════

const rateLimiter = {};

function isRateLimited(contactId) {
    const now = Date.now();
    if (!rateLimiter[contactId]) {
        rateLimiter[contactId] = { count: 1, firstMsg: now };
        return false;
    }
    const entry = rateLimiter[contactId];
    if (now - entry.firstMsg > 10000) {
        rateLimiter[contactId] = { count: 1, firstMsg: now };
        return false;
    }
    entry.count++;
    return entry.count > 5;
}

// ═══════════════════════════════════════════════════════════════════════════
//  INICIALIZACIÓN DEL CLIENTE WHATSAPP
// ═══════════════════════════════════════════════════════════════════════════

let client;
let healthCheckInterval;
let isReconnecting = false;

function startHealthCheck() {
    if (healthCheckInterval) clearInterval(healthCheckInterval);

    healthCheckInterval = setInterval(async () => {
        if (isReconnecting) return;
        try {
            const state = await Promise.race([
                client.getState(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 10000))
            ]);
            if (state !== 'CONNECTED') {
                log.warn(`Health check: estado ${state}. Reconectando...`);
                await triggerReconnect('HEALTH_CHECK');
            }
        } catch (e) {
            log.error(`Health check falló: ${e.message}`);
            await triggerReconnect('HEALTH_TIMEOUT');
        }
    }, 90000);
}

async function triggerReconnect(reason) {
    if (isReconnecting) return;
    isReconnecting = true;
    log.warn(`🔄 Reconexión: ${reason}`);

    try {
        if (healthCheckInterval) clearInterval(healthCheckInterval);
        if (client) await client.destroy();
    } catch (e) {
        log.error(`Error destroy: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 5000));

    try {
        createClient();
        await client.initialize();
        isReconnecting = false;
        log.success('Reconexión exitosa');
    } catch (err) {
        log.error(`Reconexión falló: ${err.message}`);
        process.exit(1);
    }
}

function createClient() {
    client = new Client({
        authStrategy: new LocalAuth({ clientId: 'sophia-v3' }),
        puppeteer: {
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
            timeout: 120000
        }
    });

    client.on('qr', (qr) => {
        console.log('\n' + '═'.repeat(50));
        console.log('  📱 ESCANEA EL QR CON WHATSAPP');
        console.log('═'.repeat(50) + '\n');
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('\n' + '═'.repeat(50));
        console.log('  ✅ SOPHIA v3.2 — FLUJO ESTRUCTURADO 3 TURNOS');
        console.log('  📦 Tarifas: Supabase Edge Function');
        console.log('  🔄 Health Check: Activo');
        console.log('═'.repeat(50) + '\n');
        log.success('Bot listo');
        startHealthCheck();
    });

    client.on('message', async msg => {
        if (msg.from === 'status@broadcast' || msg.from.includes('-') || msg.isStatus) return;
        if (!msg.body || msg.body.trim() === '') return;

        const contactId = msg.from;
        const incomingText = msg.body.trim();

        if (isRateLimited(contactId)) {
            log.warn(`Rate limited: ${contactId}`);
            return;
        }

        try {
            log.lead(`[${contactId}]: ${incomingText.substring(0, 50)}`);
            const chat = await msg.getChat();
            await chat.sendStateTyping();

            const responseText = await processMessage(contactId, incomingText);

            // Guardar en CRM
            const flow = getOrCreateFlow(contactId);
            saveLeadToCRM(contactId, flow.data, 'en_conversacion');

            // Delay humano
            const delay = 800 + Math.min(responseText.length * 15, 2500) + Math.random() * 500;

            setTimeout(async () => {
                try {
                    await msg.reply(responseText);
                    log.bot(`→ ${contactId}: ${responseText.substring(0, 40)}`);
                } catch (e) {
                    log.error(`Error enviando: ${e.message}`);
                }
            }, delay);

        } catch (e) {
            log.error(`Error: ${e.message}`);
            try {
                await msg.reply("¡Hola! Disculpa, ¿me puedes repetir eso? 😊");
            } catch {}
        }
    });

    client.on('disconnected', async (reason) => {
        log.warn(`Desconectado: ${reason}`);
        await triggerReconnect(reason);
    });

    return client;
}

// ═══════════════════════════════════════════════════════════════════════════
//  ARRANQUE
// ═══════════════════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(50));
console.log('  🧠 SOPHIA v3.2 — Flujo Estructurado 3 Turnos');
console.log('  ⚡ Powered by Gemini 1.5 Flash');
console.log('  📦 Tarifas: Supabase Edge Function');
console.log('═'.repeat(50) + '\n');

log.info('Inicializando...');
createClient();
client.initialize().catch(err => {
    log.error(`Error fatal: ${err.message}`);
    process.exit(1);
});

process.on('SIGINT', () => {
    log.warn('Cerrando...');
    if (client) client.destroy();
    process.exit(0);
});
