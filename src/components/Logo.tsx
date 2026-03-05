interface LogoProps {
    className?: string
    height?: number
    white?: boolean
}

export default function Logo({ className = '', height = 48, white = false }: LogoProps) {
    return (
        <img
            src="/logo-envios.png"
            alt="EnviosXpress Logo"
            className={`object-contain transition-all duration-300 ${className} ${white ? 'brightness-0 invert' : ''}`}
            style={{
                height: `${height}px`,
                // In case the image has a background, we ensure it looks clean
                mixBlendMode: white ? 'screen' : 'multiply'
            }}
        />
    )
}
