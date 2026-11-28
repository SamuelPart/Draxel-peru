import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, MousePointerClick, Truck, MessageCircle, ArrowRight, Star } from 'lucide-react';
import { buildWhatsAppLink, storeConfig } from '../data/storeConfig.js';

/**
 * HowToBuy — Layout dividido: título + CTA a la izquierda,
 * pasos como filas numeradas (01/02/03) con separadores a la derecha.
 * Formas flotantes con parallax de fondo.
 */
const steps = [
  {
    number: '01',
    icon: ShoppingBag,
    title: 'Elige tu producto',
    text: 'Explora nuestra colección y selecciona el estilo que más te guste.',
  },
  {
    number: '02',
    icon: MousePointerClick,
    title: 'Agrega al carrito',
    text: 'Haz clic en "Agregar al carrito" y revisa tu selección cuando quieras.',
  },
  {
    number: '03',
    icon: Truck,
    title: 'Recibe en casa',
    text: 'Paga al recibir tu pedido en la puerta de tu domicilio.',
  },
];

export default function HowToBuy() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const shapeY1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const shapeY2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const shapeRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const whatsappLink = buildWhatsAppLink(
    '¡Hola DRAXEL! 🛒 Estoy listo para hacer mi pedido. ¿Me ayudan a confirmar la disponibilidad y el tiempo de entrega?'
  );

  return (
    <section id="como-comprar" ref={sectionRef} className="relative overflow-hidden py-20 sm:py-28">
      {/* Formas flotantes de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ y: shapeY1 }}
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-orange/[0.12] blur-3xl"
        />
        <motion.div
          style={{ y: shapeY2 }}
          className="absolute -right-16 bottom-24 h-80 w-80 rounded-full bg-violet-500/[0.10] blur-3xl"
        />
        <motion.div
          style={{ y: shapeY1, rotate: shapeRotate }}
          className="absolute right-[12%] top-[8%] h-24 w-24 rounded-[28px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
        />
        <motion.div
          style={{ y: shapeY2, rotate: shapeRotate }}
          className="absolute left-[8%] bottom-[10%] h-16 w-16 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          {/* ================== Columna izquierda: título + CTA ================== */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="label-micro flex items-center gap-3 text-brand-orange"
            >
              <span className="h-px w-10 bg-brand-orange/60" />
              02 — Comprar es fácil
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="mt-5 font-display text-4xl leading-[1.04] text-white sm:text-5xl lg:text-[3.4rem]"
            >
              Cómo comprar en{' '}
              <span className="text-gradient-brand italic">DRAXEL</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="mt-6 max-w-md text-base italic leading-relaxed text-white/60 sm:text-lg"
            >
              Tres pasos, cero complicaciones. Compra lo más viral desde la comodidad de tu hogar
              y paga al recibir.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
              className="mt-9"
            >
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-full bg-brand-orange px-8 py-4 text-sm font-bold text-white shadow-glow-orange transition-colors hover:bg-brand-orange-hover"
              >
                Empezar mi pedido
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <p className="mt-4 text-xs text-white/45">
                Horario de atención: {storeConfig.schedule}
              </p>
            </motion.div>
          </div>

          {/* ================== Columna derecha: filas numeradas ================== */}
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {steps.map((step, index) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex items-start gap-5 py-8 sm:gap-8 sm:py-10"
              >
                <span className="w-12 shrink-0 pt-1 font-display text-3xl italic text-gradient-brand sm:w-16 sm:text-4xl">
                  {step.number}
                </span>

                <motion.div
                  whileHover={{ scale: 1.06, rotate: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-brand-orange/30 bg-brand-orange/12 text-brand-orange transition-colors duration-300 group-hover:bg-brand-orange group-hover:text-white sm:h-14 sm:w-14"
                >
                  <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>

                <div>
                  <h3 className="font-display text-xl text-white sm:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
                    {step.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
