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
        <section className="bg-white border-b border-gray-100 py-16 overflow-hidden relative" aria-label="Líderes de la industria que confían en nosotros">
            {/* Edge fading mask for premium feel */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="container-swiss">
                <div className="flex flex-col items-center mb-12 animate-in gpu-accel">
                    <div className="w-12 h-[2px] bg-brand mb-6" />
                    <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">
                        TRUSTED BY INDUSTRY LEADERS & GLOBAL CORPORATIONS
                    </p>
                </div>

                <div className="relative flex overflow-x-hidden mask-fade-x">
                    <div className="flex animate-marquee whitespace-nowrap items-center py-6">
                        {[...empresas, ...empresas, ...empresas].map((emp, i) => (
                            <div key={i} className="flex items-center gap-4 px-16 group cursor-default transition-all duration-500 hover:scale-105">
                                <div className="p-4 rounded-xl bg-gray-50 border border-transparent group-hover:bg-brand/5 group-hover:border-brand/10 transition-colors">
                                    <emp.icon size={28} className="text-gray-400 group-hover:text-brand transition-colors duration-500" strokeWidth={1.5} />
                                </div>
                                <span className="font-black text-xs lg:text-sm tracking-tighter text-gray-500 group-hover:text-black transition-colors">
                                    {emp.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
