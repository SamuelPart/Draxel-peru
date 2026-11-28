import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, MessageCircle, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { buildWhatsAppLink, storeConfig } from '../data/storeConfig.js';

/**
 * =====================================================================
 * HowToBuy — "Cómo comprar en 3 pasos" (reemplaza el producto estrella)
 * =====================================================================
 * Franja de conversión para la tienda: elige → confirma por WhatsApp →
 * recibe en casa. Sobre el fondo global (PageBackdrop) flotan 3 formas
 * decorativas con parallax en capas (velocidades distintas al scroll).
 * =====================================================================
 */

function WhatsAppGlyph({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const steps = [
  {
    n: '01',
    icon: ShoppingBag,
    title: 'Elige tus productos',
    text: 'Recorre el catálogo viral, escoge tu talla o color y agrega todo lo que quieras al carrito.',
  },
  {
    n: '02',
    icon: MessageCircle,
    title: 'Confirma por WhatsApp',
    text: 'Un asesor real recibe tu pedido al instante y resuelve tus dudas. Pagas con Yape, Plin, transferencia o contraentrega.',
  },
  {
    n: '03',
    icon: Truck,
    title: 'Recíbelo en tu casa',
    text: 'Delivery el mismo día en Trujillo o envío nacional en 24-48h vía Shalom / Olva a todo el Perú.',
  },
];

export default function HowToBuy() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  /* Parallax en capas: cada forma flotante viaja a su velocidad */
  const y1 = useTransform(scrollYProgress, [0, 1], [110, -110]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const orderLink = buildWhatsAppLink(
    '¡Hola DRAXEL! 🛍️ Quiero hacer un pedido. Acabo de ver el catálogo.'
  );

  return (
    <section ref={sectionRef} id="como-comprar" className="relative overflow-hidden py-24">
      {/* ===== Formas decorativas con parallax (capas) ===== */}
      <motion.div
        aria-hidden="true"
        style={{ y: y1 }}
        className="pointer-events-none absolute -left-16 top-10 h-72 w-72 rounded-full sm:h-96 sm:w-96"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(124,92,255,0.34), rgba(124,92,255,0) 70%)',
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ y: y2 }}
        className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full border-2 border-dashed border-brand-orange/30 sm:h-[28rem] sm:w-[28rem]"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: y3 }}
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full sm:h-80 sm:w-80"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(255,176,32,0.36), rgba(255,176,32,0) 70%)',
          }}
        />
      </motion.div>

      {/* ===== Contenido ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="label-micro inline-flex items-center gap-2.5 border-y border-brand-gold/30 px-5 py-2 text-brand-gold-light"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Compra fácil y 100% segura
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-4xl text-white sm:text-5xl"
          >
            Cómo comprar en DRAXEL
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-base italic leading-relaxed text-white/60 sm:text-lg"
          >
            Tres pasos, cero complicaciones. Atención humana real de principio a fin.
          </motion.p>
        </div>

        {/* Conector punteado entre pasos (desktop) */}
        <div
          aria-hidden="true"
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute left-[16%] right-[16%] top-[64px] hidden border-t-2 border-dashed border-brand-orange/30 lg:block" />
          <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-4xl border border-white/10 bg-white/[0.05] p-8 text-center shadow-card backdrop-blur-sm sm:p-9"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold-light">
                  <step.icon className="h-7 w-7" strokeWidth={2.2} />
                </div>
                <p className="mt-5 font-display text-5xl italic text-gradient-brand">
                  {step.n}
                </p>
                <h3 className="mt-2 font-display text-2xl text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center justify-center gap-5 text-center"
        >
          <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-brand-whatsapp px-9 py-4 text-[15px] font-bold text-white shadow-glow-green transition-transform duration-200 hover:scale-[1.04]"
          >
            <WhatsAppGlyph className="h-5 w-5" />
            Empezar mi pedido
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="flex items-center gap-2 text-sm text-white/60">
            <ShieldCheck className="h-4 w-4 text-brand-whatsapp" />
            Atención inmediata · {storeConfig.schedule}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
