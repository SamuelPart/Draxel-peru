import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, BadgeCheck, Gift, MessageCircle, Instagram, ArrowRight, Mail, MapPin, Clock } from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';
import { storeConfig, buildWhatsAppLink, formatPEN } from '../data/storeConfig.js';

/**
 * =====================================================================
 * TrustAndFooter — Envíos (tabla editorial), Confianza (lista) y Footer
 * =====================================================================
 * Nueva estructura:
 *  · #envios   → filas tipo tabla (Zona / Tarifa / Entrega / Pago) + tira de datos.
 *  · Confianza → split: título a la izquierda, lista con hairlines a la derecha.
 *  · Footer    → wordmark gigante primero + contenido en 2 columnas (móvil).
 * =====================================================================
 */

const shippingRows = [
  {
    zone: 'Trujillo Metropolitano',
    price: 'S/ 8',
    detail: 'Entrega el mismo día',
    pay: 'Pago contra entrega',
  },
  {
    zone: 'Nacional (30 ciudades)',
    price: 'S/ 15',
    detail: 'Entrega en 24-48 horas',
    pay: 'Pago contra entrega',
  },
  {
    zone: 'Lima (Lady Import · ISI FAST)',
    price: 'S/ 12',
    detail: 'Tarifa según zona de Lima',
    pay: 'Liquidación 24 horas',
  },
  {
    zone: 'Envío gratis',
    price: `Desde ${formatPEN(storeConfig.shipping.freeFrom)}`,
    detail: 'El envío corre por nuestra cuenta',
    pay: 'En compras seleccionadas',
  },
];

const opsFacts = [
  {
    icon: Clock,
    title: 'Corte 7:00 a. m.',
    text: 'Fuera de hora → servicio EXPRESS. Reparto de 9:00 a. m. a 5:00 p. m.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad primero',
    text: 'Confirmamos stock por WhatsApp ANTES de despachar.',
  },
  {
    icon: MessageCircle,
    title: 'Shalom / Olva',
    text: 'Recepción hasta 7:00 a. m., pago hasta 2:00 p. m.',
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Compra 100% Segura',
    text: 'Tu compra está protegida. Todos tus datos están seguros con nosotros.',
  },
  {
    icon: Truck,
    title: 'Envío Rápido y Confiáble',
    text: 'Recibe tus productos en tiempo récord y en perfectas condiciones.',
  },
  {
    icon: BadgeCheck,
    title: 'Productos de Calidad',
    text: 'Seleccionamos los mejores productos para garantizar tu total satisfacción.',
  },
  {
    icon: Gift,
    title: 'Ofertas Irresistibles',
    text: 'Disfruta de promociones exclusivas y descuentos que te encantarán.',
  },
];

function WhatsAppGlyph({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function TrustAndFooter() {
  const whatsappLink = buildWhatsAppLink(
    '¡Hola DRAXEL! 🛍️ Quiero hacer un pedido. ¿Me ayudan con los productos disponibles?'
  );

  return (
    <>
      {/* ==================== ENVÍOS — tabla editorial ==================== */}
      <section id="envios" className="relative overflow-hidden border-y border-white/10 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-brand-orange/[0.09] blur-[100px]" />
          <div className="absolute -right-32 top-1/4 h-[380px] w-[380px] rounded-full bg-violet-500/[0.08] blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Encabezado asimétrico */}
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="label-micro flex items-center gap-3 text-brand-orange"
              >
                <span className="h-px w-10 bg-brand-orange/60" />
                03 — Entrega a todo el Perú
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                className="mt-5 font-display text-4xl leading-[1.05] text-white sm:text-5xl"
              >
                Así llega tu pedido
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="max-w-md text-base leading-relaxed text-white/60"
            >
              Operamos con <span className="text-white/85">Lady Import</span> (importador) e{' '}
              <span className="text-white/85">ISI FAST</span> (courier) — cobertura en 30 ciudades
              con sede en Trujillo y liquidación en 24 horas.
            </motion.p>
          </div>

          {/* Tabla de tarifas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
          >
            <div className="hidden grid-cols-[1.35fr_0.75fr_1.1fr_1.1fr] gap-6 border-b border-white/10 bg-white/[0.045] px-8 py-4 md:grid">
              <span className="label-micro text-white/45">Zona</span>
              <span className="label-micro text-white/45">Tarifa</span>
              <span className="label-micro text-white/45">Entrega</span>
              <span className="label-micro text-white/45">Pago</span>
            </div>
            {shippingRows.map((row) => (
              <div
                key={row.zone}
                className="grid gap-2 border-b border-white/[0.07] px-6 py-6 last:border-0 md:grid-cols-[1.35fr_0.75fr_1.1fr_1.1fr] md:items-center md:gap-6 md:px-8"
              >
                <span className="font-display text-xl text-white sm:text-2xl">{row.zone}</span>
                <span className="font-display text-2xl italic text-gradient-brand sm:text-3xl">
                  {row.price}
                </span>
                <span className="text-sm text-white/60">{row.detail}</span>
                <span className="text-sm text-white/60">{row.pay}</span>
              </div>
            ))}
          </motion.div>

          {/* Tira de datos operativos */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
            {opsFacts.map((fact) => (
              <div key={fact.title} className="flex items-start gap-3">
                <fact.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" />
                <div>
                  <p className="label-micro text-white/75">{fact.title}</p>
                  <p className="mt-1 text-sm text-white/50">{fact.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm leading-relaxed text-white/50">
            Horario de reparto: 9:00 a. m. – 5:00 p. m. · Los rechazos se cobran al 100% — confirmamos
            tu compra por WhatsApp antes de despachar.
          </p>
        </div>
      </section>

      {/* ==================== CONFIANZA — lista con hairlines ==================== */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-24 top-0 h-[520px] w-[520px] rounded-full bg-brand-orange/[0.10] blur-[110px]" />
          <div className="absolute left-1/3 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-500/[0.08] blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            {/* Título */}
            <div>
              <motion.p
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="label-micro flex items-center gap-3 text-brand-orange"
              >
                <span className="h-px w-10 bg-brand-orange/60" />
                04 — ¿Por qué DRAXEL?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                className="mt-5 font-display text-4xl leading-[1.05] text-white sm:text-5xl"
              >
                Compra con{' '}
                <span className="text-gradient-brand italic">confianza</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-6 max-w-md text-base italic leading-relaxed text-white/60"
              >
                Somos tu aliado de confianza para conseguir productos increíbles. Tu satisfacción es
                nuestra máxima prioridad.
              </motion.p>
            </div>

            {/* Lista */}
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {trustItems.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-start gap-5 py-7 sm:gap-7"
                >
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-brand-orange/30 bg-brand-orange/12 text-brand-orange transition-colors duration-300 group-hover:bg-brand-orange group-hover:text-white"
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <h3 className="font-display text-xl text-white sm:text-2xl">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55 sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-brand-orange/[0.12] to-brand-violet/[0.12] p-8 text-center sm:p-14"
          >
            <p className="label-micro text-brand-orange">¿Listo para comprar?</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-white sm:text-5xl">
              Encuentra productos increíbles a precios que te encantarán
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg">
              Contáctanos por WhatsApp y recibe asesoría personalizada al instante.
            </p>
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-brand-whatsapp px-9 py-4 text-sm font-bold text-white shadow-glow-green transition-transform hover:scale-105"
            >
              <WhatsAppGlyph className="h-5 w-5" />
              Comprar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER — wordmark gigante ==================== */}
      <footer id="contacto" className="relative isolate overflow-hidden bg-[#08070a] pt-20 text-white">
        <div
          className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-brand-orange/[0.10] blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full bg-brand-violet/[0.12] blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Wordmark gigante */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="select-none font-display text-[clamp(3.6rem,12vw,11.5rem)] leading-[0.85] tracking-tight text-white/95"
          >
            DRAXEL<span className="text-brand-orange">.</span>
          </motion.p>

          <div className="mt-12 h-px w-full bg-gradient-to-r from-brand-orange/50 via-white/15 to-transparent" />

          {/* Contenido — 2 columnas en móvil (requisito) */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:gap-x-12 lg:gap-x-20">
            <div className="col-span-2 space-y-7 sm:col-span-1">
              <BrandLogo variant="light" size={54} />
              <p className="max-w-sm text-sm leading-relaxed text-white/65">
                Tu tienda de confianza para encontrar los productos más virales y de mayor calidad
                del mercado. Precios accesibles y la mejor atención para ti.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-white/55">
                  <Mail className="h-4 w-4 flex-shrink-0 text-brand-orange" />
                  <a href={`mailto:${storeConfig.email}`} className="transition-colors hover:text-white">
                    {storeConfig.email}
                  </a>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-white/55">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" />
                  <span>{storeConfig.location}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="label-micro text-white/85">Enlaces rápidos</p>
              <ul className="mt-5 space-y-3">
                {[
                  { label: 'Inicio', href: '#inicio' },
                  { label: 'Productos', href: '#productos' },
                  { label: 'Categorías', href: '#categorias' },
                  { label: 'Cómo comprar', href: '#como-comprar' },
                  { label: 'Contacto', href: '#contacto' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-brand-orange"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-micro text-white/85">Contacto</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-whatsapp/40 bg-brand-whatsapp/15 px-4 py-2 text-xs font-semibold text-emerald-400 transition-colors hover:bg-brand-whatsapp hover:text-white"
                  >
                    <WhatsAppGlyph className="h-3.5 w-3.5" />
                    {storeConfig.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={storeConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-brand-orange"
                  >
                    <Instagram className="h-4 w-4" />
                    {storeConfig.instagram}
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-white/55">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" />
                  <span>{storeConfig.schedule}</span>
                </li>
                <li className="pt-2">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-xs font-bold text-white shadow-glow-orange transition-colors hover:bg-brand-orange-hover"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Escribir ahora
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Barra inferior */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
            <p className="text-xs text-white/40">
              © 2026 <span className="font-semibold text-white/70">{storeConfig.name}</span>. Todos
              los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-xs text-white/40">
              <span>Términos y condiciones</span>
              <span>·</span>
              <span>Política de privacidad</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
