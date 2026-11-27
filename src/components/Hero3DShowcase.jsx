import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Flame, ShieldCheck, Sparkles, Star, Truck, Zap } from 'lucide-react';
import {
  products,
  formatPEN,
  discountPercent,
  getActiveCampaign,
  buildWhatsAppLink,
  storeConfig,
} from '../data/storeConfig.js';

/**
 * =====================================================================
 * Hero3DShowcase — Banner principal con tarjeta 3D interactiva
 * =====================================================================
 * - Tarjeta 3D que sigue el cursor/toque (CSS perspective + springs)
 * - Contador regresivo en vivo de la campaña activa
 * - Destellos, orbes flotantes y glow que sigue el puntero
 * =====================================================================
 */

function WhatsAppGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Countdown({ deadline }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = Math.max(0, new Date(deadline).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const units = [
    [days, 'DÍAS'],
    [hours, 'HORAS'],
    [minutes, 'MIN'],
    [seconds, 'SEG'],
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      {units.map(([value, label]) => (
        <div
          key={label}
          className="min-w-[58px] rounded-2xl border border-white/10 bg-white/[0.06] px-2.5 py-2 text-center sm:min-w-[68px]"
        >
          <motion.div
            key={value}
            initial={{ scale: 1.14, opacity: 0.55 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-display text-xl font-extrabold tabular-nums text-white sm:text-2xl"
          >
            {String(value).padStart(2, '0')}
          </motion.div>
          <div className="text-[9px] font-semibold tracking-[0.18em] text-white/45 sm:text-[10px]">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hero3DShowcase({ onAddToCart }) {
  const featured = products[0];
  const campaign = getActiveCampaign();
  const discount = discountPercent(featured);
  const savings = featured.oldPrice - featured.price;

  /* ---- Tilt 3D de la tarjeta (sigue cursor / toque) ---- */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [11, -11]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-13, 13]), {
    stiffness: 160,
    damping: 18,
  });
  const glareOpacity = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [0.35, 0.7]),
    { stiffness: 120, damping: 20 }
  );

  /* ---- Glow del fondo que sigue el puntero ---- */
  const glowX = useSpring(useMotionValue(0), { stiffness: 55, damping: 18 });
  const glowY = useSpring(useMotionValue(0), { stiffness: 55, damping: 18 });

  const handleSectionMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(e.clientX - rect.left - rect.width / 2);
    glowY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleCardLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const heroHello = buildWhatsAppLink(
    '¡Hola DRAXEL! 🔥 Vi su Oferta de Temporada y quiero aprovecharla. ¿Me dan más información?'
  );

  return (
    <section
      id="inicio"
      onMouseMove={handleSectionMove}
      className="relative overflow-hidden bg-brand-obsidian pb-20 pt-14 lg:pb-28 lg:pt-20"
    >
      {/* Fondos premium */}
      <div className="bg-grid-dark absolute inset-0 opacity-70" />
      <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-brand-orange/20 blur-[140px]" />
      <div className="absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-indigo-600/20 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      <motion.div
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/[0.12] blur-[110px]"
      />

      {/* Orbes flotantes */}
      <motion.div
        animate={{ y: [-12, 14, -12], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[8%] top-[12%] h-3 w-3 rounded-full bg-brand-orange/70 shadow-glow-orange"
      />
      <motion.div
        animate={{ y: [10, -16, 10], rotate: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[10%] bottom-[16%] h-2.5 w-2.5 rounded-full bg-indigo-400/70"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ============ Columna izquierda: Mensaje ============ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-2"
            >
              <Flame className="h-4 w-4 text-brand-orange" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">
                Ofertas de temporada · Hasta 40% OFF
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.03] tracking-tightest text-white"
            >
              Novedades{' '}
              <span className="text-gradient-brand">virales</span> que llegan
              antes que nadie
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
            >
              Gadgets, hogar inteligente, belleza y los regalos más deseados del
              año — seleccionados para ti, con precios directos de fábrica y
              despacho inmediato desde Trujillo a todo el Perú.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#productos"
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand-orange px-8 py-4 text-[15px] font-bold text-white shadow-glow-orange transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-orange-hover"
              >
                Explorar Ofertas
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={heroHello}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                <WhatsAppGlyph className="h-5 w-5 text-brand-whatsapp" />
                Pedir por WhatsApp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/55"
            >
              <span className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-brand-orange" />
                Envíos a todo el Perú
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-orange" />
                Compra 100% segura
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-brand-orange" />
                Despacho en 24 horas
              </span>
            </motion.div>
          </div>

          {/* ============ Columna derecha: Tarjeta 3D ============ */}
          <div className="perspective-1000 flex justify-center lg:justify-end">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-[460px]"
            >
              <motion.div
                onPointerMove={handleCardMove}
                onPointerLeave={handleCardLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-xl sm:p-5"
              >
                {/* Badge de descuento flotante */}
                <motion.div
                  style={{ transform: 'translateZ(55px)' }}
                  className="absolute -left-3 top-8 z-20 rotate-[-6deg] rounded-2xl bg-brand-orange px-3.5 py-2 font-display text-sm font-extrabold text-white shadow-glow-orange"
                >
                  −{discount}% OFF
                </motion.div>

                {/* Chip de reseñas */}
                <motion.div
                  style={{ transform: 'translateZ(45px)' }}
                  className="absolute -right-2 top-6 z-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
                >
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {featured.rating} · {featured.reviews} reseñas
                </motion.div>

                {/* Imagen del producto estrella */}
                <div
                  style={{ transform: 'translateZ(28px)' }}
                  className="relative overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-indigo-500/25 via-purple-500/10 to-brand-orange/25"
                >
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="aspect-square w-full object-cover"
                    loading="eager"
                  />
                  {/* Destello / glare */}
                  <motion.div
                    style={{ opacity: glareOpacity }}
                    className="glare-gradient pointer-events-none absolute inset-0 mix-blend-overlay"
                  />
                  {/* Chip de envío */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-brand-obsidian/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
                    Envío gratis desde S/ 120
                  </div>
                </div>

                {/* Detalles */}
                <div style={{ transform: 'translateZ(38px)' }} className="px-1.5 pb-1 pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                    Producto estrella de temporada
                  </p>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug text-white">
                    {featured.name}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {featured.variants.map((variant) => (
                      <span
                        key={variant}
                        className="rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-[11px] font-medium text-white/70"
                      >
                        {variant}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-3xl font-extrabold text-white">
                      {formatPEN(featured.price)}
                    </span>
                    <span className="text-base font-medium text-white/40 line-through">
                      {formatPEN(featured.oldPrice)}
                    </span>
                    <span className="rounded-full bg-brand-orange/15 px-2.5 py-1 text-xs font-bold text-brand-orange">
                      Ahorras {formatPEN(savings)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(featured, featured.variants[0], 1)}
                    className="mt-5 w-full rounded-2xl bg-brand-orange py-3.5 text-[15px] font-bold text-white shadow-glow-orange transition-all duration-200 hover:bg-brand-orange-hover active:scale-[0.97]"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ============ Contador regresivo de campaña ============ */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center justify-between gap-6 rounded-4xl border border-white/10 bg-white/[0.05] px-6 py-7 backdrop-blur-xl sm:px-9 lg:flex-row"
        >
          <div className="text-center lg:text-left">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange lg:justify-start">
              <Flame className="h-4 w-4" />
              Campaña activa
            </p>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-[28px]">
              {campaign.emoji} {campaign.label} — Precios especiales por tiempo
              limitado
            </h3>
            <p className="mt-1.5 text-sm text-white/55">
              Stock limitado por producto. Cuando se agota, se acabó.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Countdown deadline={campaign.deadline} />
            <a
              href="#productos"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-obsidian transition-transform duration-200 hover:scale-[1.03]"
            >
              Ver Ofertas
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
