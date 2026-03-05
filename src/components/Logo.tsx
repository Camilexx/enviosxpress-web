interface LogoProps {
    className?: string
    height?: number
    white?: boolean
}

export default function Logo({ className = '', height = 48, white = false }: LogoProps) {
    const textColor = white ? '#FFFFFF' : '#000000'
    const brandColor = '#722F37'
    const swooshColor = white ? '#FFFFFF' : '#000000'

    return (
        <svg
            viewBox="0 0 500 120"
            height={height}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="EnviosXpress Logo"
        >
            {/* Mascot Group - Shifted for breathing room */}
            <g transform="translate(255, 0)">
                {/* Mascot: Head */}
                <circle cx="0" cy="25" r="12" fill={brandColor} />

                {/* Mascot: Body (Arched shape) */}
                <path
                    d="M-30 60 C -25 30, 25 30, 30 60"
                    fill="none"
                    stroke={swooshColor}
                    strokeWidth="14"
                    strokeLinecap="round"
                />

                {/* Mascot: Arms carrying the box */}
                <path
                    d="M-20 55 Q -35 80, 0 85 L 0 60"
                    fill={swooshColor}
                />

                {/* The Box */}
                <g transform="translate(-17, 55)">
                    <rect x="0" y="0" width="30" height="25" fill="white" stroke={swooshColor} strokeWidth="2" />
                    <line x1="0" y1="8" x2="30" y2="8" stroke={swooshColor} strokeWidth="1.5" />
                    <line x1="15" y1="8" x2="15" y2="25" stroke={swooshColor} strokeWidth="1.5" />
                </g>

                {/* Dynamic Swoosh below the human shape */}
                <path
                    d="M-45 90 Q 0 110, 45 85"
                    fill="none"
                    stroke={brandColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                />
            </g>

            {/* "Envios" Text */}
            <text
                x="5"
                y="85"
                fontFamily="Montserrat, sans-serif"
                fontWeight="900"
                fontStyle="italic"
                fontSize="68"
                fill={textColor}
                letterSpacing="-3"
            >
                Envios
            </text>

            {/* "Xpress" Text - Shifted right */}
            <text
                x="335"
                y="85"
                fontFamily="Montserrat, sans-serif"
                fontWeight="900"
                fontStyle="italic"
                fontSize="68"
                fill={textColor}
                letterSpacing="-3"
            >
                Xpress
            </text>

            {/* Slogan */}
            <text
                x="150"
                y="112"
                fontFamily="Montserrat, sans-serif"
                fontWeight="800"
                fontStyle="italic"
                fontSize="18"
                fill={textColor}
                letterSpacing="0.5"
                opacity="0.9"
            >
                Soluciones rápidas, entregas seguras.
            </text>
        </svg>
    )
}
