import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Minus, Plus, ShoppingBag, Star, Truck, X, Zap } from 'lucide-react';
import {
  formatPEN,
  discountPercent,
  getCategoryName,
  storeConfig,
  buildOrderMessage,
  buildWhatsAppLink,
} from '../data/storeConfig.js';

/**
 * =====================================================================
 * ProductQuickViewModal — Vista rápida de producto
 * =====================================================================
 * Modal premium con imagen, variantes, cantidad, características y
 * doble CTA: carrito (obsidiana) + compra directa por WhatsApp (verde).
 * =====================================================================
 */

function WhatsAppGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductQuickViewModal({ product, onClose, onAddToCart }) {
  const [variant, setVariant] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setVariant(product.variants[0]);
      setQty(1);
    }
  }, [product]);

  /* Cerrar con tecla Esc + bloquear scroll del body */
  useEffect(() => {
    if (!product) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  const discount = product ? discountPercent(product) : 0;
  const savings = product ? product.oldPrice - product.price : 0;

  const handleBuyNow = () => {
    const message = buildOrderMessage({
      items: [{ name: product.name, variant, qty, price: product.price }],
      subtotal: product.price * qty,
      shippingCost: 0,
      zoneId: 'trujillo',
      customer: {
        name: '(A confirmar)',
        phone: '(A confirmar)',
        address: '(A confirmar)',
        payment: '(A elegir en el chat)',
      },
    });
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Cerrar vista rápida"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-obsidian/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="scrollbar-elegant relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-4xl bg-white shadow-2xl sm:rounded-4xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-obsidian shadow-card backdrop-blur transition-transform hover:scale-105 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid sm:grid-cols-2">
              {/* ============ Imagen ============ */}
              <div className="relative bg-gradient-to-br from-brand-pearl via-white to-slate-100 p-6 sm:p-8">
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="glare-gradient pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
                </div>
                {discount > 0 && (
                  <div className="absolute left-8 top-9 rounded-full bg-brand-orange px-3 py-1.5 text-xs font-bold text-white shadow-glow-orange">
                    −{discount}% OFF
                  </div>
                )}
                {product.badge && (
                  <div className="absolute bottom-9 left-9 rounded-full bg-brand-obsidian/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* ============ Detalles ============ */}
              <div className="flex flex-col p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  {getCategoryName(product.categoryId)}
                </p>
                <h2 className="mt-2 pr-8 font-display text-2xl font-extrabold leading-tight tracking-tightest text-brand-obsidian">
                  {product.name}
                </h2>

                <div className="mt-2.5 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
                  <span className="text-sm text-slate-400">· {product.reviews} reseñas</span>
                </div>

                {/* Precio */}
                <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                  <span className="font-display text-3xl font-extrabold text-brand-obsidian">
                    {formatPEN(product.price)}
                  </span>
                  <span className="text-lg font-medium text-slate-400 line-through">
                    {formatPEN(product.oldPrice)}
                  </span>
                  <span className="rounded-full bg-brand-orange/15 px-2.5 py-1 text-xs font-bold text-brand-orange">
                    Ahorras {formatPEN(savings)}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {product.description}
                </p>

                {/* Características */}
                <ul className="mt-4 space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Variantes */}
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Variante
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.map((option) => (
                      <motion.button
                        key={option}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setVariant(option)}
                        className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                          variant === option
                            ? 'border-brand-obsidian bg-brand-obsidian text-white'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Cantidad */}
                <div className="mt-5 flex items-center gap-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Cantidad
                  </p>
                  <div className="flex items-center gap-1 rounded-full border border-slate-200 p-1">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Disminuir cantidad"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <span className="w-8 text-center font-display text-sm font-bold tabular-nums text-brand-obsidian">
                      {qty}
                    </span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQty((q) => Math.min(10, q + 1))}
                      aria-label="Aumentar cantidad"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Nota de envío */}
                <div className="mt-5 flex items-start gap-2 rounded-2xl bg-brand-pearl px-4 py-3 text-xs text-slate-600">
                  <Truck className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" />
                  <span>
                    Despacho en 24h desde Trujillo · Envío gratis en compras desde{' '}
                    <strong>{formatPEN(storeConfig.shipping.freeFrom)}</strong> a todo el Perú.
                  </span>
                </div>

                {/* CTAs */}
                <div className="mt-5 space-y-2.5">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                    onClick={() => {
                      onAddToCart(product, variant, qty);
                      onClose();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-obsidian py-4 text-[15px] font-bold text-white transition-colors hover:bg-brand-graphite"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Agregar al Carrito — {formatPEN(product.price * qty)}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                    onClick={handleBuyNow}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-whatsapp py-4 text-[15px] font-bold text-white shadow-glow-green transition-colors hover:bg-brand-whatsapp-hover"
                  >
                    <WhatsAppGlyph className="h-5 w-5" />
                    Comprar Ahora por WhatsApp
                  </motion.button>
                  <p className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-400">
                    <Zap className="h-3.5 w-3.5 text-brand-orange" />
                    Atención inmediata · Respondemos en minutos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
