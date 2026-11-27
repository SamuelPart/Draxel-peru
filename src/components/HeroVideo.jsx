import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Flame, ShieldCheck, Truck, Zap } from 'lucide-react';
import {
  getActiveCampaign,
  buildWhatsAppLink,
} from '../data/storeConfig.js';

/**
 * =====================================================================
 * HeroVideo — Hero principal con VIDEO en loop + animación de scroll
 * =====================================================================
 * Composición CINEMATOGRÁFICA CENTRADA sobre video H.264 de marca:
 * - Barridos de luz y marquesina en movimiento continuo ("como video")
 * - Tipografía de gran escala con palabra en gradiente y palabra en contorno
 * - Parallax al hacer scroll: zoom del video, contenido a distintas
 *   velocidades, overlay progresivo e indicador de scroll
 * - Contador de campaña, CTAs y confianza con entrada escalonada
 * =====================================================================
 */

const MARQUEE_ITEMS = [
  'TECNOLOGÍA',
  'HOGAR INTELIGENTE',
  'BELLEZA',
  'REGALOS',
  'MODA',
  'OFERTAS -40%',
];

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
  const units = [
    [Math.floor(diff / 86400000), 'DÍAS'],
    [Math.floor((diff % 86400000) / 3600000), 'HORAS'],
    [Math.floor((diff % 3600000) / 60000), 'MIN'],
    [Math.floor((diff % 60000) / 1000), 'SEG'],
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {units.map(([value, label]) => (
        <div
          key={label}
          className="min-w-[58px] rounded-2xl border border-white/10 bg-white/[0.07] px-2.5 py-2 text-center backdrop-blur-md"
        >
          <motion.div
            key={value}
            initial={{ scale: 1.12, opacity: 0.55 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-display text-xl font-extrabold tabular-nums text-white"
          >
            {String(value).padStart(2, '0')}
          </motion.div>
          <div className="text-[9px] font-semibold tracking-[0.16em] text-white/45">{label}</div>
        </div>
      ))}
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1];

export default function HeroVideo() {
  const sectionRef = useRef(null);
  const campaign = getActiveCampaign();
  const reduced = useReducedMotion();

  /* ================= ANIMACIÓN DE SCROLL ================= */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  /* Capa video: zoom lento + parallax descendente */
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  /* Overlay que se oscurece al bajar (legibilidad + dramatismo) */
  const overlayDark = useTransform(scrollYProgress, [0, 1], [0, 0.5]);

  /* Capas de contenido a distintas velocidades (profundidad) */
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const badgesY = useTransform(scrollYProgress, [0, 1], [0, -225]);
  const marqueeY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const glowX = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const heroHello = buildWhatsAppLink(
    '¡Hola DRAXEL! 🔥 Vi su tienda y quiero aprovechar las ofertas de temporada. ¿Me dan más información?'
  );

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-brand-obsidian pb-28 pt-28"
    >
      {/* ============ VIDEO DE FONDO ============ */}
      <motion.video
        style={{ scale: videoScale, y: videoY }}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/hero/hero-draxel.mp4" type="video/mp4" />
      </motion.video>

      {/* Scrims: viñeta central para tipografía */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian/70 via-brand-obsidian/35 to-brand-obsidian/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,9,20,0.15)_0%,rgba(11,9,20,0.72)_78%)]" />
      <motion.div style={{ opacity: overlayDark }} className="absolute inset-0 bg-brand-obsidian" />
      <motion.div
        style={{ x: glowX }}
        className="absolute -left-40 top-10 h-[560px] w-[560px] rounded-full bg-brand-orange/25 blur-[150px]"
      />

      {/* ============ BARRIDO DE LUZ CONTINUO (movimiento perpetuo) ============ */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -inset-y-1/3 left-0 w-[38%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-2xl"
            animate={{ x: ['-70%', '330%'] }}
            transition={{ duration: 9, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -inset-y-1/3 left-0 w-[22%] rotate-[18deg] bg-gradient-to-r from-transparent via-brand-orange/[0.10] to-transparent blur-xl"
            animate={{ x: ['-70%', '330%'] }}
            transition={{ duration: 9, repeat: Infinity, repeatDelay: 2.5, delay: 1.2, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* ============ CONTENIDO CENTRADO ============ */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-2 backdrop-blur-md"
        >
          <Flame className="h-4 w-4 text-brand-orange" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">
            Ofertas de temporada · Hasta 40% OFF
          </span>
        </motion.div>

        {/* Título — tipografía de gran escala con palabras tratadas */}
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          className="mx-auto max-w-4xl font-display text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold leading-[1.02] tracking-tightest text-white"
        >
          Los productos{' '}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: '1.6px rgba(255,255,255,0.55)' }}
          >
            más deseados
          </span>{' '}
          del año,{' '}
          <span className="text-gradient-brand">antes que nadie</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Tecnología, hogar inteligente, belleza y los regalos que todos buscan —
          con precios directos de fábrica y despacho inmediato desde{' '}
          <span className="font-semibold text-white">Trujillo a todo el Perú</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
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
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-8 py-4 text-[15px] font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.15]"
          >
            <WhatsAppGlyph className="h-5 w-5 text-brand-whatsapp" />
            Pedir por WhatsApp
          </a>
        </motion.div>

        {/* Contador regresivo */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease }}
          className="mt-9 inline-flex flex-col items-center gap-3 rounded-4xl border border-white/10 bg-white/[0.06] px-6 py-4 backdrop-blur-xl sm:flex-row sm:gap-5"
        >
          <div className="text-center sm:text-left">
            <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange sm:justify-start">
              <Flame className="h-3.5 w-3.5" />
              {campaign.emoji} {campaign.label}
            </p>
            <p className="mt-1 text-xs text-white/55">Precios especiales terminan en:</p>
          </div>
          <Countdown deadline={campaign.deadline} />
        </motion.div>

        {/* Confianza */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52, ease }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/60"
        >
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4 text-brand-orange" />
            Envíos ISI FAST a 30 ciudades
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-orange" />
            Contra-entrega en todo el Perú
          </span>
          <span className="inline-flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand-orange" />
            Despacho en 24 horas
          </span>
        </motion.div>
      </div>

      {/* ============ MARQUESINA EN MOVIMIENTO (prueba de vida "video") ============ */}
      <motion.div
        style={{ y: marqueeY, opacity: marqueeOpacity }}
        className="absolute inset-x-0 bottom-16 z-10 overflow-hidden"
      >
        <div className="border-y border-white/[0.08] bg-white/[0.03] py-3 backdrop-blur-sm">
          <motion.div
            className="flex w-max items-center gap-10 whitespace-nowrap"
            animate={reduced ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
              (item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.32em] text-white/35"
                >
                  {item}
                  <span className="text-brand-orange/60">✦</span>
                </span>
              )
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de scroll animado */}
      <motion.a
        href="#productos"
        style={{ opacity: hintOpacity }}
        aria-label="Desplázate para ver los productos"
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/55 transition-colors hover:text-white"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
