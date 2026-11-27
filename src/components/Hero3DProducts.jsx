import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Hand, MousePointer2, Move3D, Sparkles } from 'lucide-react';
import { products, formatPEN, discountPercent } from '../data/storeConfig.js';

/**
 * =====================================================================
 * Hero3DProducts — Segundo Hero 3D interactivo con productos flotantes
 * =====================================================================
 * - Productos generados sin fondo (PNG transparente) flotando en 3D
 * - Animación al hacer SCROLL: el escenario rota y los productos entran
 *   desde la profundidad (useScroll + useTransform)
 * - INTERACTIVO: el escenario gira siguiendo el cursor, cada producto
 *   flota en idle, crece al hover y abre la vista rápida al tocarlo
 * =====================================================================
 */

const SHOWCASE = [
  { id: 'proyector-galaxia-astronauta', img: '/products/3d/proyector-galaxia.png' },
  { id: 'lampara-luna-tactil-3d', img: '/products/3d/lampara-luna.png' },
  { id: 'humidificador-efecto-llama', img: '/products/3d/humidificador-llama.png' },
  { id: 'set-smartwatch-ultra-audifonos', img: '/products/3d/set-smartwatch.png' },
  { id: 'audifonos-inalambricos-anc-led', img: '/products/3d/audifonos-led.png' },
  { id: 'parlante-bluetooth-rgb-ipx7', img: '/products/3d/parlante-rgb.png' },
];

/* Formación 3D (px relativos al centro del escenario) */
const FORMATION = [
  { x: 0, y: 30, z: 120, scale: 1.0 },
  { x: -330, y: -55, z: 35, scale: 0.84 },
  { x: 330, y: -45, z: 35, scale: 0.84 },
  { x: -600, y: 70, z: -80, scale: 0.68 },
  { x: 600, y: 75, z: -80, scale: 0.68 },
  { x: 0, y: -215, z: -140, scale: 0.72 },
];

function FloatingProduct({ item, form, index, scrollT, onQuickView, reduced }) {
  const product = products.find((p) => p.id === item.id);
  const discount = discountPercent(product);

  /* Entrada + deriva con el scroll */
  const x = useTransform(scrollT, (v) => form.x * (1 + (1 - v) * 1.35));
  const y = useTransform(scrollT, (v) => form.y + (1 - v) * 260);
  const z = useTransform(scrollT, (v) => -460 + v * (form.z + 460));
  const opacity = useTransform(scrollT, [0.12, 0.72], [0, 1]);
  const spin = useTransform(scrollT, (v) => (1 - v) * 70 * (index % 2 === 0 ? -1 : 1));

  return (
    <div className="preserve-3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        style={{ x, y, z, rotateY: spin, opacity, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Flotación idle + hover */}
        <motion.div
          animate={reduced ? undefined : { y: [0, -16, 0] }}
          transition={{
            duration: 5 + index * 0.45,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
          whileHover={{ scale: 1.1, rotateY: 8 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onQuickView(product)}
          role="button"
          tabIndex={0}
          aria-label={`Ver ${product.name}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onQuickView(product);
          }}
          className="group relative cursor-pointer outline-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Halo de luz detrás del producto */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/25 blur-[60px]"
            style={{ transform: 'translate(-50%, -50%) translateZ(-30px)' }}
          />

          <img
            src={item.img}
            alt={product.name}
            draggable={false}
            className="select-none object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)]"
            style={{
              height: `${185 * form.scale}px`,
              width: 'auto',
              transform: 'translateZ(20px)',
            }}
          />

          {/* Chip de precio flotante */}
          <motion.div
            style={{ transform: 'translateZ(65px)' }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <div className="glass-dark flex items-center gap-2 rounded-full px-3.5 py-1.5 shadow-2xl">
              <span className="font-display text-sm font-extrabold text-white">
                {formatPEN(product.price)}
              </span>
              {discount > 0 && (
                <span className="rounded-full bg-brand-orange px-1.5 py-0.5 text-[10px] font-bold text-white">
                  −{discount}%
                </span>
              )}
            </div>
          </motion.div>

          {/* Badge de nombre (hover) */}
          <motion.div
            style={{ transform: 'translateZ(80px)' }}
            className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <div className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-brand-obsidian shadow-card">
              {product.name.length > 34 ? `${product.name.slice(0, 34)}…` : product.name}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Hero3DProducts({ onQuickView }) {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  /* ---- Scroll: entrada de productos + rotación del escenario ---- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'start 0.15'],
  });

  /* ---- Interacción con el puntero ---- */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rawRotateY = useTransform(
    [pointerX, scrollYProgress],
    ([px, sp]) => px * 20 + (0.5 - sp) * 28
  );
  const rawRotateX = useTransform(
    [pointerY, scrollYProgress],
    ([py, sp]) => -py * 13 + (sp - 0.5) * 16
  );
  const rotateY = useSpring(rawRotateY, { stiffness: 80, damping: 17 });
  const rotateX = useSpring(rawRotateX, { stiffness: 80, damping: 17 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="showcase3d"
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative overflow-hidden bg-brand-graphite py-20 sm:py-24"
    >
      {/* Fondos premium */}
      <div className="bg-grid-dark absolute inset-0 opacity-50" />
      <div className="absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-brand-orange/15 blur-[130px]" />
      <div className="absolute -right-24 bottom-0 h-[440px] w-[440px] rounded-full bg-indigo-500/15 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============ Encabezado ============ */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Colección interactiva · Experiencia 3D
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-3xl font-extrabold tracking-tightest text-white sm:text-5xl"
          >
            Toca, gira y explora la colección{' '}
            <span className="text-gradient-brand">en 3D</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Mueve el cursor para rotar el escenario, haz scroll para traer los
            productos desde la profundidad y toca cualquiera para ver sus
            detalles.
          </motion.p>

          {/* Píldoras de interacción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
          >
            {[
              { icon: MousePointer2, text: 'Mueve el cursor' },
              { icon: Move3D, text: 'Scroll animado' },
              { icon: Hand, text: 'Toca un producto' },
            ].map((hint) => (
              <span
                key={hint.text}
                className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/75"
              >
                <hint.icon className="h-3.5 w-3.5 text-brand-orange" />
                {hint.text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ============ Escenario 3D ============ */}
        <div
          className="relative mt-6 h-[360px] sm:mt-4 sm:h-[520px] lg:h-[620px]"
          style={{ perspective: '1300px' }}
        >
          {/* Piso de luz */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[100%] bg-brand-orange/15 blur-[70px]"
          />

          <div className="absolute inset-0 scale-[0.52] sm:scale-[0.78] lg:scale-100">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="absolute inset-0"
            >
              {SHOWCASE.map((item, index) => (
                <FloatingProduct
                  key={item.id}
                  item={item}
                  form={FORMATION[index]}
                  index={index}
                  scrollT={scrollYProgress}
                  onQuickView={onQuickView}
                  reduced={reduced}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
