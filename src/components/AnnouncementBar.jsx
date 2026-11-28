import React from 'react';

/**
 * =====================================================================
 * AnnouncementBar — Marquesina premium (ticker infinito)
 * =====================================================================
 * Franja fina en mayúsculas con datos reales del modelo de dropshipping
 * (Brochure Lady Import / ISI FAST): DROP/COD, liquidación 24h, 30
 * ciudades, contraentrega nacional. Bucle continuo estilo editorial.
 * =====================================================================
 */

const TICKER_ITEMS = [
  'Dropshipping DROP / COD',
  'Contraentrega en todo el Perú',
  'Liquidación en 24 horas',
  '30 ciudades · Sede Trujillo',
  'Envío gratis desde S/ 120',
  'Confirmación por WhatsApp antes de despachar',
  'Lady Import · ISI FAST',
];

function TickerRow() {
  return (
    <div className="flex shrink-0 items-center gap-0" aria-hidden="true">
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap">
          <span className="label-micro px-6 text-white/80">{item}</span>
          <span className="text-[8px] text-brand-orange/80">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="relative z-50 overflow-hidden border-b border-white/[0.07] bg-[#0a0908]">
      <div className="flex h-9 items-center">
        <div className="marquee-track flex w-max items-center">
          <TickerRow />
          <TickerRow />
          <TickerRow />
          <TickerRow />
        </div>
      </div>
    </div>
  );
}
