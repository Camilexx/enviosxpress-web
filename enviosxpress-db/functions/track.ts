import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const trackingNumber = url.searchParams.get("tracking");

    if (!trackingNumber) {
      return new Response(
        JSON.stringify({ success: false, error: "Falta número de tracking" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Buscar shipment
    const { data: shipment, error: sError } = await supabase
      .from("shipments")
      .select("*")
      .eq("tracking_number", trackingNumber)
      .single();

    if (sError || !shipment) {
      return new Response(
        JSON.stringify({ success: false, error: "Envío no encontrado" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Obtener eventos de tracking
    const { data: events, error: eError } = await supabase
      .from("shipment_events")
      .select("*")
      .eq("shipment_id", shipment.id)
      .order("evento_timestamp", { ascending: true });

    return new Response(
      JSON.stringify({
        success: true,
        shipment: {
          tracking_number: shipment.tracking_number,
          estado: shipment.estado,
          origen: shipment.origen_city,
          destino: shipment.destino_city,
          tipo: shipment.shipment_type,
          peso_kg: shipment.peso_kg,
          precio_total: shipment.precio_total,
          fecha_creacion: shipment.created_at,
          fecha_entrega: shipment.fecha_entrega
        },
        events: events || []
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
