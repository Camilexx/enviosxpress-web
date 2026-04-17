import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface PageHeroProps {
    badge: string
    title: string
    highlight: string
    subtitle?: string
    backLabel?: string
    backTo?: string
}

export function PageHero({
    badge,
    title,
    highlight,
    subtitle,
    backLabel = 'Inicio',
    backTo = '/',
}: PageHeroProps) {
    return (
        <section
            className="relative bg-black text-white overflow-hidden border-b border-white/10"
            aria-label="Encabezado de sección"
        >
            {/* Grid overlay — same as ComoFunciona & CoberturaBanner */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
                aria-hidden="true"
            />
            {/* Radial brand glow */}
            <div
                className="absolute inset-0 z-0 opacity-25 pointer-events-none"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 15% 60%, #722F37 0%, transparent 55%)',
                }}
                aria-hidden="true"
            />
            {/* Right ambient light */}
            <div
                className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
            />

            <div className="container-swiss relative z-10 pt-32 pb-16 lg:pb-20">
                {/* Back navigation */}
                <Link
                    to={backTo}
                    className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.25em] text-gray-500 hover:text-brand transition-colors duration-200 mb-8 group"
                    aria-label={`Volver a ${backLabel}`}
                >
                    <ArrowLeft
                        size={13}
                        className="group-hover:-translate-x-1 transition-transform duration-200"
                        aria-hidden="true"
                    />
                    {backLabel}
                </Link>

                <div className="animate-in is-revealed">
                    {/* Badge */}
                    <div className="inline-block border border-brand/40 bg-brand/10 text-brand font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 mb-6 rounded-full shadow-[0_0_15px_rgba(114,47,55,0.3)]">
                        {badge}
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl lg:text-5xl font-black italic tracking-tighter uppercase mb-6 leading-[0.95] drop-shadow-lg">
                        {title}{' '}
                        <span className="text-metallic-brand">{highlight}</span>
                    </h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-gray-400 font-medium leading-relaxed text-base md:text-lg max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Decorative accent */}
                <div className="mt-10 flex items-center gap-3 animate-in is-revealed animate-delay-2">
                    <div className="h-[2px] w-16 bg-brand" />
                    <div className="h-[2px] w-8 bg-brand/40" />
                    <div className="h-1.5 w-1.5 bg-brand rounded-full" />
                </div>
            </div>
        </section>
    )
}
