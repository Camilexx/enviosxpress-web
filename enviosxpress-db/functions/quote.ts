import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  origen?: string;
  destino: string;
  tipo: "documento" | "carga";
  peso?: number;
  con_seguro?: boolean;
  valor_declarado?: number;
  plan_code?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { origen: reqOrigen, destino, tipo, peso, con_seguro, valor_declarado, plan_code }: QuoteRequest =
      await req.json();

    const origen = reqOrigen || 'Quito';  // Default origen

    if (!destino || !tipo) {
      return new Response(
        JSON.stringify({ success: false, error: "Faltan parámetros requeridos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.rpc("calculate_shipping_price", {
      p_origen: origen,
      p_destino: destino,
      p_tipo: tipo,
      p_peso: peso || 0,
      p_con_seguro: con_seguro || false,
      p_valor_declarado: valor_declarado || 0,
      p_plan_code: plan_code || null,
    });

    if (error) {
      console.error("RPC Error:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "No se encontró cotización para los parámetros dados" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const quote = data[0];

    if (!quote.success) {
      return new Response(
        JSON.stringify({ success: false, error: quote.error_message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        quote: {
          origen: quote.origen,
          destino: quote.destino,
          zone_name: quote.zone_name,
          city_tier: quote.city_tier,
          shipment_type: quote.shipment_type,
          peso_kg: quote.peso_kg,
          tarifa_base: quote.tarifa_base,
          recargo_peso: quote.recargo_peso,
          descuento_zona: {
            pct: quote.descuento_zona_pct,
            amount: quote.descuento_zona_amount,
          },
          descuento_plan: {
            pct: quote.descuento_plan_pct,
            amount: quote.descuento_plan_amount,
            plan: quote.plan_aplicado,
          },
          seguro: quote.seguro,
          precio_total: quote.precio_total,
          tiempo_entrega: quote.tiempo_entrega,
          aplica_zona_norte: quote.aplica_zona_norte,
          precio_sin_descuentos: quote.precio_sin_descuentos,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Function Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
