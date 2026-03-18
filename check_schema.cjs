require('dotenv').config({ path: '.env.temp' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    const { data: rates } = await supabase.from('shipping_rates').select('*').limit(3);
    console.log('=== SHIPPING_RATES ===');
    console.log(JSON.stringify(rates, null, 2));
    
    const { data: cities } = await supabase.from('cities').select('*').limit(3);
    console.log('=== CITIES ===');
    console.log(JSON.stringify(cities, null, 2));
    
    const { data: zones } = await supabase.from('zones').select('*').limit(3);
    console.log('=== ZONES ===');
    console.log(JSON.stringify(zones, null, 2));
})();
