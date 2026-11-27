import React from 'react';

/**
 * =====================================================================
 * BrandLogo — Isotipo vectorial ultraminimalista de DRAXEL
 * =====================================================================
 * Concepto: "D" geométrica de trazo sólido (confianza, estructura)
 * con una flecha/chevron naranja hacia adelante integrada en su
 * contrapunto (velocidad de entrega, novedades virales).
 *
 * Props:
 *  - variant: "dark" (para fondos claros) | "light" (para fondos oscuros)
 *  - showWordmark: muestra el logotipo "DRAXEL" junto al isotipo
 *  - size: tamaño del isotipo en px (el wordmark escala proporcionalmente)
 *  - className: clases extra para el contenedor
 */
export default function BrandLogo({
  variant = 'dark',
  showWordmark = true,
  size = 38,
  className = '',
}) {
  const isLight = variant === 'light';
  const markColor = isLight ? '#FFFFFF' : '#090A0F';
  const accentColor = '#FF5500';
  const wordColor = isLight ? '#FFFFFF' : '#090A0F';

  return (
    <span
      className={`inline-flex select-none items-center gap-2.5 ${className}`}
      aria-label="DRAXEL"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        role="img"
        aria-hidden="true"
        style={{ display: 'block', flexShrink: 0 }}
      >
        {/* Isotipo "D" geométrica */}
        <path
          d="M9 4h11c8.837 0 16 7.163 16 16s-7.163 16-16 16H9a5 5 0 0 1-5-5V9a5 5 0 0 1 5-5z"
          fill={markColor}
        />
        {/* Flecha / chevron de velocidad */}
        <path
          d="M15 12.3 24.5 20 15 27.7v-4.1L18.6 20 15 16.4z"
          fill={accentColor}
        />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            fontSize: size * 0.62,
            color: wordColor,
            lineHeight: 1,
          }}
        >
          DRAXEL
        </span>
      )}
    </span>
  );
}
