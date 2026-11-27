import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Flame, ShieldCheck, Truck, Zap } from 'lucide-react';
import {
  getActiveCampaign,
  buildWhatsAppLink,
  formatPEN,
} from '../data/storeConfig.js';

/**
 * =====================================================================
 * HeroVideo — Hero principal con VIDEO en loop + animación de scroll
 * =====================================================================
 * - <video> H.264 autoplay/muted/loop con motion graphics de marca
 * - Parallax de capas al hacer scroll: el video hace zoom lento, el
 *   contenido sube a distinta velocidad y el overlay se oscurece
 * - Contador regresivo de campaña, CTAs y confianza con entrada escalonada
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
  const units = [
    [Math.floor(diff / 86400000), 'DÍAS'],
    [Math.floor((diff % 86400000) / 3600000), 'HORAS'],
    [Math.floor((diff % 3600000) / 60000), 'MIN'],
    [Math.floor((diff % 60000) / 1000), 'SEG'],
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map(([value, label]) => (
        <div
          key={label}
          className="min-w-[56px] rounded-2xl border border-white/10 bg-white/[0.07] px-2.5 py-2 text-center backdrop-blur-md"
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

  /* ================= AnIMACIÓN DE SCROLL ================= */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  /* Capa video: zoom lento + parallax descendente */
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  /* Overlay que se oscurece al bajar (legibilidad + dramatismo) */
  const overlayDark = useTransform(scrollYProgress, [0, 1], [0, 0.5]);

  /* Capas de contenido a distintas velocidades (profundidad) */
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const badgesY = useTransform(scrollYProgress, [0, 1], [0, -215]);
  const countdownY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const glowX = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const heroHello = buildWhatsAppLink(
    '¡Hola DRAXEL! 🔥 Vi su tienda y quiero aprovechar las ofertas de temporada. ¿Me dan más información?'
  );

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-brand-obsidian py-24"
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

      {/* Scrims para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian/95 via-brand-obsidian/75 to-brand-obsidian/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-transparent to-brand-obsidian/45" />
      <motion.div style={{ opacity: overlayDark }} className="absolute inset-0 bg-brand-obsidian" />
      <motion.div
        style={{ x: glowX }}
        className="absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-brand-orange/25 blur-[150px]"
      />

      {/* ============ CONTENIDO ============ */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-2 backdrop-blur-md"
          >
            <Flame className="h-4 w-4 text-brand-orange" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">
              Ofertas de temporada · Hasta 40% OFF
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-[clamp(2.5rem,6.2vw,4.6rem)] font-extrabold leading-[1.03] tracking-tightest text-white"
          >
            Novedades <span className="text-gradient-brand">virales</span> que
            llegan antes que nadie
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            Gadgets, hogar inteligente, belleza y los regalos más deseados del
            año — con precios directos de fábrica y despacho inmediato desde
            Trujillo a todo el Perú.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
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
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-8 py-4 text-[15px] font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.15]"
            >
              <WhatsAppGlyph className="h-5 w-5 text-brand-whatsapp" />
              Pedir por WhatsApp
            </a>
          </motion.div>

          {/* Contador regresivo */}
          <motion.div
            style={{ y: countdownY }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="mt-9 inline-flex flex-wrap items-center gap-4 rounded-4xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-xl"
          >
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                <Flame className="h-3.5 w-3.5" />
                {campaign.emoji} {campaign.label}
              </p>
              <p className="mt-1 text-xs text-white/55">Precios especiales terminan en:</p>
            </div>
            <Countdown deadline={campaign.deadline} />
          </motion.div>
        </motion.div>

        {/* Confianza (parallax más rápido → sensación de profundidad) */}
        <motion.div
          style={{ y: badgesY }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/60"
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

      {/* Indicador de scroll animado */}
      <motion.a
        href="#productos"
        style={{ opacity: hintOpacity }}
        aria-label="Desplázate para ver los productos"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/55 transition-colors hover:text-white"
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
