import { Building2, Factory, Store, Briefcase, Globe2, Truck } from 'lucide-react'

const empresas = [
    { name: 'LOGÍSTICA ECUADOR', icon: Globe2 },
    { name: 'RETAIL GROUP', icon: Store },
    { name: 'INDUSTRIA NACIONAL', icon: Factory },
    { name: 'CORP. ADUANERA', icon: Briefcase },
    { name: 'IMPORTADORA QUITO', icon: Building2 },
    { name: 'SPEED DELIVERY', icon: Truck },
]

export default function LogosEmpresas() {
    return (
        <section className="bg-white border-b border-gray-100 py-12 overflow-hidden" aria-label="Empresas que confían en nosotros">
            <div className="container-swiss">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8 opacity-60">
                    Trusted by Industry Leaders
                </p>

                <div className="relative flex overflow-x-hidden">
                    <div className="flex animate-marquee whitespace-nowrap items-center hover:pause">
                        {[...empresas, ...empresas].map((emp, i) => (
                            <div key={i} className="flex items-center gap-3 px-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 group cursor-default">
                                <emp.icon size={24} className="group-hover:text-brand" />
                                <span className="font-black text-xs tracking-tighter text-black">{emp.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hover\\:pause:hover {
                    animation-play-state: paused !important;
                }
            `}} />
        </section>
    )
}
