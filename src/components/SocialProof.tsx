import { useEffect, useState, useRef } from 'react'

interface CounterProps {
    end: number
    suffix?: string
    prefix?: string
    duration?: number
    decimals?: number
}

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 1400, decimals = 0 }: CounterProps) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started) setStarted(true)
        }, { threshold: 0.3 })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [started])

    useEffect(() => {
        if (!started) return
        let startTime: number
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)

            const val = eased * end
            setCount(decimals ? parseFloat(val.toFixed(decimals)) : Math.floor(val))

            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [started, end, duration, decimals])

    return (
        <div ref={ref} className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter mb-4 tabular-nums drop-shadow-md">
            {prefix}{decimals ? count.toFixed(decimals) : count.toLocaleString()}<span className="text-brand text-2xl lg:text-4xl">{suffix}</span>
        </div>
    )
}

export default function SocialProof() {
    const metrics = [
        { end: 4.9, decimals: 1, suffix: '/5', label: 'Satisfacción Global' },
        { end: 24, label: 'Provincias Cubiertas' },
        { end: 99.8, suffix: '%', label: 'Efectividad Logística' },
        { end: 500, suffix: '+', label: 'Cuentas Premium' },
    ]

    return (
        <section className="relative bg-black border-y border-white/10 overflow-hidden" aria-label="Métricas de servicio">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #722F37 0%, transparent 60%)' }} />

            <div className="container-swiss relative z-10 py-20 lg:py-24">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {metrics.map((m, i) => (
                        <div
                            key={i}
                            className="animate-in is-revealed flex flex-col items-center lg:items-start group"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <AnimatedCounter end={m.end} suffix={m.suffix} decimals={m.decimals} />
                            <div className="h-0.5 w-12 bg-white/20 mb-4 group-hover:w-24 group-hover:bg-brand transition-all duration-300" />
                            <div className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                                {m.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
