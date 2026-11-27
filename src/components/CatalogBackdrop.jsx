import React, { useEffect, useRef } from 'react';

/**
 * =====================================================================
 * CatalogBackdrop — Fondo del catálogo en capas con parallax al scroll
 * =====================================================================
 * Combinación A+B:
 *  (A) Aurora: manchas de degradado (violeta / coral / dorado) que se
 *      desplazan a distintas velocidades al hacer scroll.
 *  (B) Grid editorial: retícula fina a otra profundidad, más lenta.
 * Cada capa viaja a su propia velocidad (translate3d) para crear la
 * sensación de profundidad en parallax. Respeta prefers-reduced-motion
 * (en ese caso las capas quedan estáticas).
 * =====================================================================
 */

const LAYERS = [
  {
    key: 'grid',
    speed: 0.12,
    style: {
      top: '-14%',
      bottom: '-14%',
      left: '-8%',
      right: '-8%',
      backgroundImage:
        'linear-gradient(rgba(9,10,15,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(9,10,15,0.055) 1px, transparent 1px)',
      backgroundSize: '56px 56px',
    },
  },
  {
    key: 'aurora-violet',
    speed: 0.26,
    style: {
      top: '-16%',
      left: '-10%',
      width: '58vw',
      height: '58vw',
      maxWidth: '880px',
      maxHeight: '880px',
      background:
        'radial-gradient(circle at 50% 50%, rgba(124,92,255,0.30) 0%, rgba(124,92,255,0) 68%)',
    },
  },
  {
    key: 'aurora-gold',
    speed: 0.4,
    style: {
      bottom: '-24%',
      left: '14%',
      width: '62vw',
      height: '62vw',
      maxWidth: '980px',
      maxHeight: '980px',
      background:
        'radial-gradient(circle at 50% 50%, rgba(255,176,32,0.30) 0%, rgba(255,176,32,0) 68%)',
    },
  },
  {
    key: 'aurora-coral',
    speed: 0.55,
    style: {
      top: '4%',
      right: '-18%',
      width: '54vw',
      height: '54vw',
      maxWidth: '820px',
      maxHeight: '820px',
      background:
        'radial-gradient(circle at 50% 50%, rgba(255,85,0,0.22) 0%, rgba(255,85,0,0) 68%)',
    },
  },
];

export default function CatalogBackdrop() {
  const rootRef = useRef(null);
  const layerRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const p = progress - 0.5;
      for (let i = 0; i < LAYERS.length; i += 1) {
        const el = layerRefs.current[i];
        if (!el) continue;
        const y = -p * LAYERS[i].speed * 560;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
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
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      {/* Lavado base: crema → lavanda suave → crema cálido */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #f6efe7 0%, #f0e9f4 42%, #f7eee4 100%)',
        }}
      />
      {/* Capas con parallax */}
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
    </div>
  );
}
