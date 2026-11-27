import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, Plus, Star } from 'lucide-react';
import { formatPEN, discountPercent, getCategoryName } from '../data/storeConfig.js';

/**
 * =====================================================================
 * ProductCard3D — Tarjeta de producto con inclinación 3D interactiva
 * =====================================================================
 * - 3D Tilt siguiendo el cursor (CSS perspective + Framer springs)
 * - Entrada escalonada con whileInView
 * - Badge % OFF, microinteracción whileTap y vista rápida
 * =====================================================================
 */
export default function ProductCard3D({ product, index = 0, onAddToCart, onQuickView }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), {
    stiffness: 170,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 170,
    damping: 18,
  });
  const glareOpacity = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [0.18, 0.42]),
    { stiffness: 120, damping: 20 }
  );

  const discount = discountPercent(product);

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
    <motion.article
      layout
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
    >
      <div className="perspective-1000 h-full">
        <motion.div
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_16px_45px_-18px_rgba(9,10,15,0.18)] transition-shadow duration-300 hover:shadow-card-hover"
        >
          {/* ================= Imagen ================= */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 p-3">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
            {/* Glare sutil */}
            <div className="glare-gradient pointer-events-none absolute inset-0 rounded-2xl opacity-30 mix-blend-overlay" />

            {/* Badge % OFF */}
            {discount > 0 && (
              <div className="absolute left-4 top-4 z-10 rounded-full bg-brand-orange px-2.5 py-1 text-xs font-bold text-white shadow-glow-orange">
                −{discount}% OFF
              </div>
            )}

            {/* Badge de producto */}
            {product.badge && (
              <div className="absolute right-4 top-4 z-10 rounded-full bg-brand-obsidian/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                {product.badge}
              </div>
            )}

            {/* Vista rápida (hover) */}
            <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 opacity-0 translate-y-3 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/95 py-2.5 text-[13px] font-bold text-brand-obsidian shadow-card backdrop-blur transition-colors hover:bg-white"
              >
                <Eye className="h-4 w-4" />
                Vista rápida
              </button>
            </div>
          </div>

          {/* ================= Detalles ================= */}
          <div className="flex flex-1 flex-col p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              {getCategoryName(product.categoryId)}
            </p>
            <h3 className="mt-1.5 line-clamp-2 min-h-[42px] font-display text-[15px] font-bold leading-snug text-brand-obsidian">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviews} reseñas)</span>
            </div>

            {/* Variantes */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {product.variants.slice(0, 3).map((variant) => (
                <span
                  key={variant}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
                >
                  {variant}
                </span>
              ))}
            </div>

            {/* Precio */}
            <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="font-display text-xl font-extrabold text-brand-obsidian">
                {formatPEN(product.price)}
              </span>
              {product.oldPrice > product.price && (
                <span className="text-sm font-medium text-slate-400 line-through">
                  {formatPEN(product.oldPrice)}
                </span>
              )}
            </div>

            {/* CTA */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              onClick={() => onAddToCart(product, product.variants[0], 1)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-orange py-3 text-sm font-bold text-white shadow-glow-orange transition-colors duration-200 hover:bg-brand-orange-hover"
            >
              <Plus className="h-4 w-4" strokeWidth={2.8} />
              Agregar al Carrito
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
