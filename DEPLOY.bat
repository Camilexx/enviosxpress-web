@echo off
REM ═══════════════════════════════════════════════════════════════════════════
REM  ENVIOSXPRESS - Script de Producción
REM ═══════════════════════════════════════════════════════════════════════════
REM 
REM  Este script facilita el despliegue a producción.
REM  Antes de ejecutar, asegúrate de:
REM  1. Crear un proyecto en https://supabase.com
REM  2. Crear un proyecto en https://vercel.com
REM  3. Tener una cuenta en WhatsApp Business
REM
REM ═══════════════════════════════════════════════════════════════════════════

echo.
echo ═════════════════════════════════════════════════════════════
echo  🚀 ENVIOSXPRESS - PASOS PARA PRODUCCIÓN
echo ═════════════════════════════════════════════════════════════
echo.

echo 📦 1. BASE DE DATOS (Supabase)
echo    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo    a) Ve a https://supabase.com y crea un nuevo proyecto
echo    b) En el SQL Editor, ejecuta el contenido de:
echo       enviosxpress-db\schema.sql
echo    c) Ejecuta el seed:
echo       cd enviosxpress-db
echo       npm install @supabase/supabase-js
echo       node seed_database.js
echo    d) Despliega Edge Functions:
echo       supabase functions deploy quote
echo       supabase functions deploy track
echo.
echo 🌐 2. WEB (Vercel)
echo    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo    a) Ve a https://vercel.com e importa este repositorio
echo    b) Configura las variables de entorno:
echo       VITE_SUPABASE_URL=tu-proyecto.supabase.co
echo       VITE_SUPABASE_ANON_KEY=tu-anon-key
echo    c) Despliega
echo.
echo 💬 3. WHATSAPP BOT
echo    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo    a) Obtén API Key de Google AI Studio:
echo       https://aistudio.google.com/app/apikey
echo    b) Configura variables en un archivo .env:
echo       SUPABASE_URL=tu-proyecto.supabase.co
echo       SUPABASE_KEY=tu-service-role-key
echo       GEMINI_API_KEY=tu-gemini-api-key
echo    c) Ejecuta:
echo       cd enviosxpress-whatsapp-bot
echo       npm install
echo       npm start
echo    d) Escanea el QR con tu WhatsApp
echo.
echo 📊 4. CRM DASHBOARD
echo    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo    a) El CRM ya está incluido en el repositorio
echo    b) Se conecta automáticamente a Supabase
echo.
echo ═════════════════════════════════════════════════════════════
echo  ✅ ¡Listo!
echo ═════════════════════════════════════════════════════════════
echo.

pause
