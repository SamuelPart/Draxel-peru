import React from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Gem,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';
import { storeConfig, categories, buildWhatsAppLink } from '../data/storeConfig.js';

/**
 * =====================================================================
 * TrustAndFooter — Sección de confianza + Footer completo DRAXEL
 * =====================================================================
 */

function WhatsAppGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .59.05.87.13V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.09z" />
    </svg>
  );
}

const trustItems = [
  {
    icon: Truck,
    title: 'Envíos Rápidos a Todo el Perú',
    text: 'Delivery Express el mismo día en Trujillo y envíos nacionales vía ISI FAST / Shalom / Olva en 24-48h a 30 ciudades.',
  },
  {
    icon: ShieldCheck,
    title: 'Compra 100% Segura',
    text: 'Contra-entrega en efectivo en todo el Perú, o paga con Yape, Plin y transferencia bancaria. Cero riesgos.',
  },
  {
    icon: Gem,
    title: 'Garantía de Calidad 30 Días',
    text: 'Todos nuestros productos pasan control de calidad. Si llega con falla, lo cambiamos.',
  },
  {
    icon: Headphones,
    title: 'Atención Personalizada',
    text: 'Asesores reales por WhatsApp listos para resolver tus dudas antes y después de tu compra.',
  },
];

const paymentChips = ['Yape', 'Plin', 'BCP', 'Interbank', 'Contraentrega'];

export default function TrustAndFooter() {
  const supportLink = buildWhatsAppLink(
    '¡Hola DRAXEL! 👋 Tengo una duda antes de comprar y me gustaría hablar con un asesor.'
  );

  return (
    <>
      {/* ================== Confianza ================== */}
      <section className="bg-brand-pearl py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              ¿Por qué DRAXEL?
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tightest text-brand-obsidian sm:text-4xl">
              Una tienda diseñada para comprar con total confianza
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              Seleccionamos productos virales de alta demanda y respaldamos cada
              pedido con logística rápida, pagos seguros y atención humana real.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white bg-white p-7 shadow-[0_16px_45px_-22px_rgba(9,10,15,0.18)] transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange">
                  <item.icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 font-display text-[17px] font-bold text-brand-obsidian">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Banda CTA WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-4xl bg-gradient-to-r from-brand-whatsapp to-emerald-600 px-8 py-9 sm:px-11 lg:flex-row"
          >
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl font-extrabold text-white sm:text-[28px]">
                ¿Tienes dudas antes de comprar?
              </h3>
              <p className="mt-2 text-sm text-white/85 sm:text-base">
                Nuestros asesores están en línea ahora mismo. Escríbenos y recibe
                atención inmediata.
              </p>
            </div>
            <a
              href={supportLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-shrink-0 items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-brand-whatsapp transition-transform duration-200 hover:scale-[1.04]"
            >
              <WhatsAppGlyph className="h-5 w-5" />
              Hablar con un Asesor
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================== Footer ================== */}
      <footer id="contacto" className="bg-brand-obsidian pt-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 pb-14 sm:gap-x-12 lg:gap-x-20">
            {/* Marca */}
            <div>
              <BrandLogo variant="light" size={36} />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
                {storeConfig.brand.description}
              </p>
              <div className="mt-6 flex items-center gap-3">
                {[
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: TikTokGlyph, label: 'TikTok' },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#inicio"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Categorías */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
                Categorías
              </h4>
              <ul className="mt-5 space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a
                      href="#productos"
                      className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-brand-orange"
                    >
                      <span aria-hidden="true">{category.emoji}</span>
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ayuda */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
                Ayuda
              </h4>
              <ul className="mt-5 space-y-3">
                {[
                  'Rastrea tu pedido',
                  'Política de devoluciones',
                  'Garantía de calidad',
                  'Preguntas frecuentes',
                  'Mayoreo y distribución',
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={supportLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/55 transition-colors hover:text-brand-orange"
                    >
                      {link}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#ganancias"
                    className="text-sm text-white/55 transition-colors hover:text-brand-orange"
                  >
                    Panel de Ganancias (interno)
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
                Contacto
              </h4>
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href={supportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-white/55 transition-colors hover:text-brand-orange"
                  >
                    <WhatsAppGlyph className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-whatsapp" />
                    <span>
                      {storeConfig.whatsapp.display}
                      <span className="block text-xs text-white/35">WhatsApp · Atención inmediata</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${storeConfig.email}`}
                    className="flex items-start gap-3 text-sm text-white/55 transition-colors hover:text-brand-orange"
                  >
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" />
                    {storeConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/55">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" />
                  {storeConfig.brand.location}
                </li>
                <li className="flex items-start gap-3 text-sm text-white/55">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" />
                  {storeConfig.schedule}
                </li>
              </ul>

              {/* Métodos de pago */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                  Métodos de pago
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {paymentChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/70"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Barra inferior */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs text-white/40 sm:flex-row">
            <p>© {new Date().getFullYear()} DRAXEL. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1.5">
              Hecho con <span className="text-brand-orange">❤</span> en Trujillo, Perú ·
              Novedades que llegan antes que nadie
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
