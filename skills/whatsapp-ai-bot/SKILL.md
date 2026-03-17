---
name: "WhatsApp AI Bot (Gratis & Profesional)"
description: "Implementación de un bot de WhatsApp Inteligente usando whatsapp-web.js y Gemini AI para atender leads web y de Meta Ads (sin costo por mensaje)."
version: "1.0"
---

# 🤖 WhatsApp AI Bot — Free & Pro Implementation

Los bots oficiales (Cloud API) cobran por conversación. Para startups y emprendedores, la mejor forma de empezar GRATIS y de forma hiper-profesional es usar la librería `whatsapp-web.js` combinada con la capa gratuita espectacular de Google Gemini AI.

## 🎯 Objetivo
Habilitar un "Agente de Ventas AI" 24/7 en un número de WhatsApp que atienda instantáneamente a prospectos que vienen de Ads o la web, precalificándolos y guardando los datos (o cerrando las ventas).

---

## 🏗️ 1. Arquitectura del Bot Libre

- **Core / Conexión:** `whatsapp-web.js` (Simula y automatiza una sesión web de WhatsApp. Cero costos de API).
- **Inteligencia:** `@google/genai` (Modelo Gemini 2.0 Flash — Tiene un generoso free tier, ultra rápido).
- **Auth:** `qrcode-terminal` (Para escanear el QR la primera vez).
- **Backend:** Node.js puro.

---

## 🚀 2. Implementación Paso a Paso

### Paso 1: Inicializar Proyecto Node.js
Crea una carpeta nueva para tu bot:

```bash
mkdir whatsapp-ai-bot
cd whatsapp-ai-bot
npm init -y
npm install whatsapp-web.js qrcode-terminal @google/genai dotenv
```

### Paso 2: Crear el Archivo `.env`
Necesitas una API Key gratuita de Google Studio (https://aistudio.google.com/).

```env
GEMINI_API_KEY=tu_api_key_gratuita_aqui
```

### Paso 3: Código Core del Bot (`index.js`)
Crea un archivo `index.js` y pega esta estructura robusta:

```javascript
require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

// Prompt Maestro del Bot
const SYSTEM_INSTRUCTION = `
Eres 'Sophia', agente de ventas élite de EnviosXpress.
Tu objetivo es atender a clientes que llegan desde la Web y Meta Ads.
Reglas:
1. Sé increíblemente profesional, persuasiva y concisa (mensajes cortos).
2. Usa viñetas o emojis moderados para estructurar la info.
3. Si alguien quiere cotizar, pregúntale: ciudad de origen, destino, y dimensiones.
4. NUNCA inventes precios. Di que derivarás con un asesor humano para tarifas exactas si es complejo.
`;

// Memoria simple de conversaciones (En prod usar Redis/DB)
const conversationHistory = {};

client.on('qr', (qr) => {
    console.log('📱 Escanea este QR con el WhatsApp de la Empresa:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot de WhatsApp Inteligente conectado y listo.');
});

client.on('message', async msg => {
    // Ignorar mensajes de grupos, estados, etc.
    if(msg.from === 'status@broadcast' || msg.from.includes('-')) return;

    try {
        const contactId = msg.from;
        
        // Inicializar historial
        if (!conversationHistory[contactId]) {
            conversationHistory[contactId] = [];
        }

        // Simular que el bot está escribiendo (UX profesional)
        const chat = await msg.getChat();
        await chat.sendStateTyping();

        // 1. Añadir el mensaje del usuario al historial
        conversationHistory[contactId].push(\`Usuario: \${msg.body}\`);

        // 2. Construir el contexto para Gemini
        const promptContext = \`
\${SYSTEM_INSTRUCTION}
---
Historial de Chat:
\${conversationHistory[contactId].join('\\n')}
---
Siguiente respuesta de Sophia:\`;

        // 3. Consultar a Gemini AI
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptContext,
        });

        const replyData = response.text;

        // 4. Guardar respuesta y enviar
        conversationHistory[contactId].push(\`Sophia: \${replyData}\`);
        
        // Mantener el historial corto (sólo últimos 10 turnos para ahorrar tokens)
        if(conversationHistory[contactId].length > 20) {
            conversationHistory[contactId] = conversationHistory[contactId].slice(-20);
        }

        await msg.reply(replyData);

    } catch (error) {
        console.error('❌ Error en el chatbot:', error);
    }
});

client.initialize();
```

---

## 💻 3. Despliegue (Gratis/Low Cost)

Para que el bot corra 24/7 sin que tu PC esté encendida:

1. **Opción A (100% Gratis - PC Local):** Puedes dejarlo corriendo en una máquina antigua o Raspberry Pi. Usar `pm2` para mantenerlo vivo:
   `npm i -g pm2` y luego `pm2 start index.js --name whatsapp-bot`
2. **Opción B (Recomendada - VPS Barato):**
   Usa un Droplet básico de **DigitalOcean ($4/mes)** o **Hetzner (3€/mes)**.
   - Instala Node.js.
   - Clona tu código.
   - Instala dependencias de Puppeteer: `sudo apt install chromium-browser`
   - Ejecuta con `pm2`.
   - *Nota:* Heroku, Render, o Vercel **NO SON BUENOS** para este bot porque matan los procesos de fondo si no hay tráfico HTTP constante, deslogueando tu WhatsApp. Se requiere un pequeño VPS dedicado.

---

## 🎯 4. Estrategia de Recepción de Meta Ads

Cuando haces campañas de "Mensajes a WhatsApp" en Meta Ads, puedes preconfigurar la primera palabra.

En el anuncio de Facebook:
> Mensaje predeterminado: *"Hola, vengo de Facebook, quiero una cotización."*

En tu Bot (`index.js`), puedes capturar esta intención específica:
```javascript
if (msg.body.toLowerCase().includes('vengo de facebook')) {
   // Flujo específico de Ads: enviar promo especial
}
```

## ✅ Checklist de Implementación
- [ ] Inicializar proyecto Node.js e instalar `whatsapp-web.js`.
- [ ] Obtener API Key y colocar en `.env`.
- [ ] Ejecutar `node index.js` y escanear el QR.
- [ ] Enviar un mensaje "Hola" desde otro celular para testear a la AI.
- [ ] Afinar el `SYSTEM_INSTRUCTION` exclusivo para tu marca (Paso CRÍTICO).
- [ ] Subir el código a GitHub y prepararlo para producción con `pm2`.
