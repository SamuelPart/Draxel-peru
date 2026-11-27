import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  BadgeCheck,
  Check,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import {
  formatPEN,
  discountPercent,
  buildWhatsAppLink,
} from '../data/storeConfig.js';

/**
 * =====================================================================
 * ProductShowcase3D — Escena cinematográfica del producto más rentable
 * =====================================================================
 * Parallax multicapa "como si fuera video": el scroll actúa como
 * playhead que impulsa un dolly-in con zoom 3D —
 *   L0 fondo · L1 rayos de luz · L2 producto con perspectiva
 *   L3 bokeh de primer plano (el más cercano a cámara, más rápido)
 * Técnicas aplicadas de los skills instalados (motion-graphics-skills,
 * color-grading-skill, awesome-genmedia): capas que se mueven en
 * profundidad, springs en vez de tweens, grading de marca en los assets.
 * =====================================================================
 */

const CHIP_DECOR = [
  { label: 'Full HD 1080p nativo', x: '-6%', y: '12%', from: -60 },
  { label: 'Pantallas hasta 130"', x: '72%', y: '6%', from: -90 },
  { label: 'WiFi dual band + BT', x: '78%', y: '72%', from: -70 },
  { label: 'Autoenfoque keystone', x: '-2%', y: '78%', from: -100 },
];

const ease = [0.22, 1, 0.36, 1];

function FloatingChip({ chip, progress, index }) {
  const y = useTransform(progress, [0, 1], [chip.from, chip.from - 130]);
  return (
    <motion.div
      style={{ left: chip.x, top: chip.y, y }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay: 0.45 + index * 0.1, ease }}
      className="pointer-events-none absolute hidden rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-white/90 shadow-xl backdrop-blur-xl md:block"
    >
      {chip.label}
    </motion.div>
  );
}

export default function ProductShowcase3D({ product, onQuickView }) {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  /* ============ Scroll = playhead (dolly-in cinematográfico) ============ */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  /* Springs: movimiento suave "como si fuera video", nunca un tween seco */
  const p = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  /* Capa 0 — fondo: entra lento (más lejos de cámara) */
  const bgScale = useTransform(p, [0, 1], [1, 1.24]);
  const bgY = useTransform(p, [0, 1], ['0%', '-4%']);

  /* Capa 1 — rayos: velocidad media */
  const raysScale = useTransform(p, [0, 1], [1, 1.42]);
  const raysY = useTransform(p, [0, 1], ['2%', '-7%']);
  const raysOpacity = useTransform(p, [0, 0.35, 1], [0.5, 0.95, 0.65]);

  /* Capa 2 — producto: zoom + rotación 3D que se endereza */
  const productScale = useTransform(p, [0, 1], [0.78, 1.22]);
  const rotateX = useTransform(p, [0, 1], [16, -2]);
  const rotateY = useTransform(p, [0, 1], [-14, 9]);
  const productY = useTransform(p, [0, 1], ['8%', '-6%']);

  /* Capa 3 — bokeh primer plano: la más rápida (más cerca de cámara) */
  const bokehScale = useTransform(p, [0, 1], [1.15, 1.85]);
  const bokehY = useTransform(p, [0, 1], ['4%', '-12%']);

  /* Texto y precio */
  const copyY = useTransform(p, [0, 1], [70, -90]);
  const copyOpacity = useTransform(p, [0, 0.14, 0.85], [0, 1, 0.9]);
  const priceScale = useTransform(p, [0.12, 0.4], [0.92, 1]);

  const waLink = buildWhatsAppLink(
    `¡Hola DRAXEL! 🎬 Me interesa el ${product.name} (${formatPEN(product.price)}). ¿Me dan más información?`
  );
  const discount = discountPercent(product);

  return (
    <section
      id="destacado"
      ref={sectionRef}
      className="relative h-[240vh] bg-brand-obsidian"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* ================= L0 · FONDO CINEMATOGRÁFICO ================= */}
        <motion.img
          src="/showcase/bg-scene.jpg"
          alt=""
          aria-hidden="true"
          style={{ scale: bgScale, y: bgY }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* ================= L1 · RAYOS DE LUZ ================= */}
        <motion.img
          src="/showcase/rays.png"
          alt=""
          aria-hidden="true"
          style={{ scale: raysScale, y: raysY, opacity: raysOpacity }}
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
        />

        {/* Scrims de legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian/90 via-brand-obsidian/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/85 via-transparent to-brand-obsidian/30" />

        {/* ================= CONTENIDO ================= */}
        <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl items-center gap-8 px-4 pt-16 sm:px-6 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:px-8">
          {/* ---------- Copia de venta ---------- */}
          <motion.div
            style={{ y: copyY, opacity: copyOpacity }}
            className="order-2 max-w-xl lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-orange/35 bg-brand-orange/10 px-4 py-2 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-brand-orange" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                Producto estrella · {product.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.06] tracking-tightest text-white"
            >
              Tu sala de cine cabe en la{' '}
              <span className="text-gradient-brand">palma de tu mano</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.75, delay: 0.16, ease }}
              className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {product.description}
            </motion.p>

            {/* Features reales del producto */}
            <motion.ul
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.75, delay: 0.24, ease }}
              className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
            >
              {product.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm leading-snug text-white/80"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  {f}
                </li>
              ))}
            </motion.ul>

            {/* Precio + rating */}
            <motion.div
              style={{ scale: priceScale }}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.75, delay: 0.32, ease }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-extrabold text-white">
                  {formatPEN(product.price)}
                </span>
                <span className="text-lg text-white/40 line-through">
                  {formatPEN(product.oldPrice)}
                </span>
                <span className="rounded-full bg-brand-orange px-2.5 py-1 text-xs font-bold text-white">
                  -{discount}%
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/70">
                <Star className="h-4 w-4 fill-brand-amber text-brand-amber" />
                <span className="font-semibold text-white">{product.rating}</span>
                <span>({product.reviews} reseñas)</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.75, delay: 0.4, ease }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand-orange px-8 py-4 text-[15px] font-bold text-white shadow-glow-orange transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-orange-hover"
              >
                <ShoppingCart className="h-5 w-5" />
                Ver ficha y comprar
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-7 py-4 text-[15px] font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.15]"
              >
                <BadgeCheck className="h-5 w-5 text-brand-whatsapp" />
                Consultar ahora
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-5 inline-flex items-center gap-2 text-xs text-white/55"
            >
              <Truck className="h-4 w-4 text-brand-orange" />
              Envío a todo el Perú · Contra-entrega disponible · Despacho en 24h
            </motion.p>
          </motion.div>

          {/* ---------- Escena 3D del producto ---------- */}
          <div className="relative order-1 h-[42vh] lg:order-2 lg:h-[72vh]">
            {/* Glow pulsante detrás del producto */}
            <motion.div
              aria-hidden="true"
              animate={
                reduced
                  ? undefined
                  : { opacity: [0.45, 0.75, 0.45], scale: [1, 1.08, 1] }
              }
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/30 blur-[110px]"
            />

            {/* Producto con perspectiva 3D */}
            <div
              className="absolute inset-0"
              style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
            >
              <motion.img
                src="/showcase/product-cutout.webp"
                alt={product.name}
                style={{
                  scale: productScale,
                  rotateX,
                  rotateY,
                  y: productY,
                  transformStyle: 'preserve-3d',
                }}
                className="absolute inset-0 m-auto max-h-full max-w-full object-contain drop-shadow-[0_45px_80px_rgba(0,0,0,0.55)] will-change-transform"
              />
            </div>

            {/* Chips flotantes (parallax por profundidad) */}
            {CHIP_DECOR.map((chip, i) => (
              <FloatingChip
                key={chip.label}
                chip={chip}
                progress={p}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ================= L3 · BOKEH PRIMER PLANO ================= */}
        <motion.img
          src="/showcase/bokeh.png"
          alt=""
          aria-hidden="true"
          style={{ scale: bokehScale, y: bokehY }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-screen"
        />

        {/* Viñeta */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_120px_rgba(11,9,20,0.55)]" />
      </div>
    </section>
  );
}
