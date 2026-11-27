import React from 'react';

/**
 * =====================================================================
 * HeroNowhere — NOWHERE® · "Stay out of the loop" (circle lookbook)
 * =====================================================================
 * El lookbook es un archivo HTML autocontenido (public/nowhere/index.html):
 * CSS + JS inline, fuentes woff2 embebidas en base64, sin dependencias.
 * Se embebe a pantalla completa como primera pantalla del sitio.
 * =====================================================================
 */

export default function HeroNowhere() {
  return (
    <iframe
      src="/nowhere/index.html"
      title="NOWHERE — Stay out of the loop · circle lookbook"
      className="block h-[100svh] min-h-[560px] w-full border-0 bg-[#ececec]"
      loading="eager"
    />
  );
}
