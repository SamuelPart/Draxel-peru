import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

/**
 * =====================================================================
 * HeroTunnel — Túnel curvo 3D de cuadrículas por categoría
 * =====================================================================
 * Reemplaza todo el hero de texto: un muro curvo de cuadrículas
 * (como un vórtice de galería) que gira en curva sin parar.
 * - 3 anillos concéntricos a distintas profundidades = PARALLAX POR
 *   CAPAS: el anillo lejano gira más rápido, el cercano en contra,
 *   el medio es el protagonista
 * - Al pasar el cursor: la rotación se suaviza y la ficha se acerca
 * - Al elegir una cuadrícula: se abre el catálogo de su categoría
 * - El scroll impulsa capas a distintas velocidades + tilt con el mouse
 * =====================================================================
 */

const TILES = [
  { label: 'Tecnología', img: '/tunnel/cat-tecnologia.webp', categoryId: 'tecnologia' },
  { label: 'Cocina', img: '/tunnel/cat-cocina.webp', categoryId: 'hogar' },
  { label: 'Moda', img: '/tunnel/cat-moda.webp', categoryId: 'moda' },
  { label: 'Belleza', img: '/tunnel/cat-belleza.webp', categoryId: 'belleza' },
  { label: 'Hogar', img: '/tunnel/cat-hogar.webp', categoryId: 'hogar' },
  { label: 'Regalos', img: '/tunnel/cat-regalos.webp', categoryId: 'regalos' },
  { label: 'Electrodomésticos', img: '/tunnel/cat-electro.webp', categoryId: 'hogar' },
  { label: 'Gadgets', img: '/tunnel/cat-gadgets.webp', categoryId: 'tecnologia' },
];

const NEAR_INDICES = [0, 2, 4, 5, 7];

/* Configuración de los 3 anillos (capas de profundidad) */
const RINGS = {
  far: { count: 8, radius: 700, z: -560, w: 210, h: 262, speed: 4.0, opacity: 0.5 },
  mid: { count: 8, radius: 720, z: 0, w: 268, h: 335, speed: 3.0, opacity: 1 },
  near: { count: 5, radius: 560, z: 260, w: 330, h: 412, speed: -2.1, opacity: 0.72 },
};

function Ring({ config, rotation, tiles, onCategorySelect, dim }) {
  const step = 360 / config.count;
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        rotateY: rotation,
        z: config.z,
        opacity: config.opacity,
        transformStyle: 'preserve-3d',
      }}
    >
      {Array.from({ length: config.count }).map((_, i) => {
        const tile = tiles[i % tiles.length];
        return (
          <div
            key={`${config.z}-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              width: config.w,
              height: config.h,
              marginLeft: -config.w / 2,
              marginTop: -config.h / 2,
              transform: `rotateY(${i * step}deg) translateZ(${config.radius}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <button
              type="button"
              onClick={() => onCategorySelect(tile.categoryId)}
              aria-label={`Ver catálogo de ${tile.label}`}
              className={`group relative block h-full w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] shadow-[0_30px_70px_rgba(0,0,0,0.55)] outline-none transition-transform duration-300 hover:scale-[1.06] focus-visible:ring-2 focus-visible:ring-brand-orange ${
                dim ? 'blur-[1px]' : ''
              }`}
            >
              <img
                src={tile.img}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                draggable="false"
              />
              {/* Brillo al hover */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-obsidian/85 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
              <span className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 shadow-[inset_0_0_35px_rgba(249,115,22,0.45)] transition-opacity duration-300 group-hover:opacity-100" />
              {/* Etiqueta de categoría */}
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 px-3 pb-3.5 pt-8">
                <span className="rounded-full border border-white/12 bg-white/[0.10] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors duration-300 group-hover:border-brand-orange/50 group-hover:text-brand-orange">
                  {tile.label}
                </span>
              </span>
            </button>
          </div>
        );
      })}
    </motion.div>
  );
}

export default function HeroTunnel({ onCategorySelect }) {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  /* ===== Rotación perpetua (distinta por capa = parallax de profundidad) ===== */
  const rotFar = useMotionValue(0);
  const rotMid = useMotionValue(0);
  const rotNear = useMotionValue(0);
  const slowRef = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const k = slowRef.current ? 0.22 : 1;
    const dt = delta / 1000;
    rotFar.set(rotFar.get() + RINGS.far.speed * k * dt);
    rotMid.set(rotMid.get() + RINGS.mid.speed * k * dt);
    rotNear.set(rotNear.get() + RINGS.near.speed * k * dt);
  });

  /* ===== Tilt con el mouse (profundidad interactiva) ===== */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltXRaw = useTransform(my, [-1, 1], [5, -5]);
  const tiltYRaw = useTransform(mx, [-1, 1], [-7, 7]);
  const tiltX = useSpring(tiltXRaw, { stiffness: 55, damping: 18 });
  const tiltY = useSpring(tiltYRaw, { stiffness: 55, damping: 18 });

  const handleMouseMove = (e) => {
    const r = sectionRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  /* ===== Parallax de scroll por capas ===== */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.32]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const bokehY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const overlayDark = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        slowRef.current = true;
      }}
      onMouseLeave={() => {
        slowRef.current = false;
        mx.set(0);
        my.set(0);
      }}
      className="relative min-h-[94vh] overflow-hidden bg-brand-obsidian"
    >
      {/* ================= L0 · FONDO ESPACIAL ================= */}
      <motion.img
        src="/tunnel/bg-space.jpg"
        alt=""
        aria-hidden="true"
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(249,115,22,0.16)_0%,rgba(11,9,20,0.62)_62%,rgba(11,9,20,0.94)_100%)]" />
      <motion.div style={{ opacity: overlayDark }} className="absolute inset-0 bg-brand-obsidian" />

      {/* Núcleo de luz del túnel */}
      <motion.div
        style={{ y: glowY }}
        aria-hidden="true"
        className="pointer-events-none absolute left-[58%] top-1/2 h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/25 blur-[130px]"
      />

      {/* ================= CAPAS 3D · ANILLOS DE CUADRÍCULAS ================= */}
      <div
        className="absolute inset-0"
        style={{ perspective: '1300px', perspectiveOrigin: '54% 48%' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            y: sceneY,
            scale: sceneScale,
            transformStyle: 'preserve-3d',
          }}
        >
          <Ring
            config={RINGS.far}
            rotation={rotFar}
            tiles={TILES}
            onCategorySelect={onCategorySelect}
            dim
          />
          <Ring
            config={RINGS.mid}
            rotation={rotMid}
            tiles={TILES}
            onCategorySelect={onCategorySelect}
          />
          <Ring
            config={RINGS.near}
            rotation={rotNear}
            tiles={NEAR_INDICES.map((i) => TILES[i])}
            onCategorySelect={onCategorySelect}
            dim
          />
        </motion.div>
      </div>

      {/* ================= L9 · PRIMER PLANO (bokeh, el más rápido) ================= */}
      <motion.img
        src="/showcase/bokeh.png"
        alt=""
        aria-hidden="true"
        style={{ y: bokehY }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-screen"
      />

      {/* Viñeta cinematográfica */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_240px_130px_rgba(11,9,20,0.62)]" />
    </section>
  );
}
