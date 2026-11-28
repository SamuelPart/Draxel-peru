import React, { useEffect, useRef } from 'react';

/**
 * =====================================================================
 * PageBackdrop — Fondo global OSCURO de la web con parallax en capas
 * =====================================================================
 * DISEÑO EN CAPAS (sin cuadrículas):
 *  · Lavado base oscuro (tinta → violeta profundo → ciruela → verde noche).
 *  · 4 auroras gigantes de color (violeta / coral / dorado / menta) con
 *    desenfoque suave (difuminado) que se mueven a velocidades distintas.
 *  · 3 anillos gigantes (sólido, punteado, fino) como "diseños".
 *  · Viñeta oscura estática que funde los bordes con el centro.
 * Capa fija (fixed) + translate3d proporcional al scroll = parallax
 * real entre capas (0.05× … 0.21× de la velocidad del contenido).
 * Cajas sobredimensionadas (200-280vmax) para que jamás se vea un
 * borde. Respeta prefers-reduced-motion (capas estáticas).
 * =====================================================================
 */

const LAYERS = [
  {
    key: 'aurora-violet',
    factor: 0.05,
    style: {
      top: '-90%',
      left: '-70%',
      width: '240vmax',
      height: '240vmax',
      background:
        'radial-gradient(circle at 50% 50%, rgba(124,92,255,0.40) 0%, rgba(124,92,255,0) 62%)',
    },
  },
  {
    key: 'ring-solid',
    factor: 0.07,
    style: {
      top: '-110%',
      right: '-120%',
      width: '220vmax',
      height: '220vmax',
      borderRadius: '50%',
      border: '1.5px solid rgba(255,85,0,0.28)',
    },
  },
  {
    key: 'aurora-coral',
    factor: 0.1,
    style: {
      top: '-80%',
      right: '-90%',
      width: '230vmax',
      height: '230vmax',
      background:
        'radial-gradient(circle at 50% 50%, rgba(255,85,0,0.40) 0%, rgba(255,85,0,0) 62%)',
    },
  },
  {
    key: 'ring-dashed',
    factor: 0.12,
    style: {
      bottom: '-130%',
      left: '-110%',
      width: '200vmax',
      height: '200vmax',
      borderRadius: '50%',
      border: '1.5px dashed rgba(255,176,32,0.22)',
    },
  },
  {
    key: 'aurora-gold',
    factor: 0.15,
    style: {
      bottom: '-110%',
      left: '-80%',
      width: '250vmax',
      height: '250vmax',
      background:
        'radial-gradient(circle at 50% 50%, rgba(255,176,32,0.42) 0%, rgba(255,176,32,0) 62%)',
    },
  },
  {
    key: 'aurora-mint',
    factor: 0.18,
    style: {
      top: '10%',
      right: '-100%',
      width: '220vmax',
      height: '220vmax',
      background:
        'radial-gradient(circle at 50% 50%, rgba(233,90,140,0.26) 0%, rgba(233,90,140,0) 62%)',
    },
  },
  {
    key: 'ring-thin',
    factor: 0.21,
    style: {
      bottom: '-150%',
      right: '-140%',
      width: '280vmax',
      height: '280vmax',
      borderRadius: '50%',
      border: '1.5px solid rgba(255,85,0,0.22)',
    },
  },
];

export default function PageBackdrop() {
  const layerRefs = useRef([]);

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY || window.pageYOffset || 0;
      for (let i = 0; i < LAYERS.length; i += 1) {
        const el = layerRefs.current[i];
        if (!el) continue;
        const layer = LAYERS[i];
        const dy = -y * layer.factor;
        const dx = y * layer.factor * 0.14 * (i % 2 === 0 ? 1 : -1);
        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
    >
      {/* Lavado base oscuro */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(165deg, #0c0b09 0%, #14101c 38%, #1a1218 64%, #0d0c0a 100%)',
        }}
      />
      {/* Capas con parallax (auroras difuminadas + anillos) */}
      {LAYERS.map((layer, i) => (
        <div
          key={layer.key}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className="absolute"
          style={{ ...layer.style, willChange: 'transform' }}
        />
      ))}
      {/* Viñeta oscura: difuminado de bordes hacia el centro */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 100% at 50% 35%, transparent 45%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
}
