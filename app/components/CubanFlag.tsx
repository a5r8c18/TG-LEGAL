interface CubanFlagProps {
  className?: string
}

/** Bandera de Cuba dibujada en SVG (sin dependencias). Relación 2:1. */
export function CubanFlag({ className }: CubanFlagProps) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      role="img"
      aria-label="Bandera de Cuba"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Franjas: azul y blanco */}
      <rect width="60" height="30" fill="#002A8F" />
      <rect y="6" width="60" height="6" fill="#FFFFFF" />
      <rect y="18" width="60" height="6" fill="#FFFFFF" />
      {/* Triángulo rojo */}
      <path d="M0 0 L25.98 15 L0 30 Z" fill="#CF142B" />
      {/* Estrella blanca de cinco puntas */}
      <path
        d="M8.5 10 L9.676 13.382 L13.255 13.455 L10.402 15.618 L11.44 19.045 L8.5 17 L5.56 19.045 L6.598 15.618 L3.745 13.455 L7.324 13.382 Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}
