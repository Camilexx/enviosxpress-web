import { ShieldCheck } from 'lucide-react'

export default function TrustBanner() {
    return (
        <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-black" aria-label="Banner de confianza corporativa">
            {/* Background Parallax Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-60"
                style={{ backgroundImage: 'url(/trust_banner_bg.png)' }}
            />

            {/* Dramatic Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-black/80 flex items-center justify-center text-center px-6">
                <div className="max-w-5xl animate-in is-revealed relative z-20">
                    <div className="inline-flex items-center justify-center p-4 bg-brand/20 rounded-full mb-8 backdrop-blur-sm border border-brand/30">
                        <ShieldCheck size={48} className="text-brand" aria-hidden="true" />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase mb-6 leading-[0.9] drop-shadow-2xl">
                        Precisión <span className="text-brand">Calculada</span> <br />
                        Resultados Reales
                    </h2>
                    <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                        Sistema Logístico de Grado Corporativo
                    </p>
                    <div className="mt-12 w-24 h-1 bg-brand mx-auto shadow-[0_0_15px_rgba(114,47,55,0.6)]"></div>
                </div>
            </div>

            {/* Overlay Grid */}
            <div
                className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}
                aria-hidden="true"
            />
        </section>
    )
}
