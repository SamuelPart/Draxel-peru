import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, Plus, Star } from 'lucide-react';
import { formatPEN, discountPercent, getCategoryName } from '../data/storeConfig.js';

/**
 * =====================================================================
 * ProductCard3D — Tarjeta editorial a sangre (información sobre imagen)
 * =====================================================================
 * Nueva estructura: la imagen ocupa toda la tarjeta, con scrim inferior
 * donde viven categoría, nombre, rating, variantes, precio y CTA.
 * Conserva el tilt 3D por cursor y la entrada escalonada whileInView.
 * =====================================================================
 */
export default function ProductCard3D({ product, index = 0, onAddToCart, onQuickView }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), {
    stiffness: 170,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 170,
    damping: 18,
  });

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
          className="relative h-full min-h-[430px] overflow-hidden rounded-3xl border border-white/10 bg-brand-graphite shadow-[0_16px_45px_-18px_rgba(9,10,15,0.5)] transition-colors duration-300 hover:border-brand-orange/50 sm:min-h-[500px]"
        >
          {/* ================= Imagen a sangre ================= */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          />
          {/* Scrim editorial */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-black/10" />

          {/* Badges */}
          {discount > 0 && (
            <div className="absolute left-4 top-4 z-10 rounded-full bg-brand-orange px-2.5 py-1 text-[10px] font-bold text-white shadow-glow-orange sm:text-xs">
              −{discount}% OFF
            </div>
          )}
          {product.badge && (
            <div className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur sm:text-[10px]">
              {product.badge}
            </div>
          )}

          {/* Vista rápida (hover) */}
          <div className="absolute right-4 top-14 z-10 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <button
              type="button"
              onClick={() => onQuickView(product)}
              aria-label="Vista rápida"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur transition-colors hover:bg-brand-orange"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* ================= Información sobre la imagen ================= */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className="label-micro line-clamp-1 text-brand-orange">
              {getCategoryName(product.categoryId)}
            </p>
            <h3 className="mt-2 line-clamp-2 font-display text-base leading-snug text-white sm:text-xl">
              {product.name}
            </h3>

            <div className="mt-2 flex items-center gap-1.5">
              <Star className="h-3 w-3 fill-brand-orange text-brand-orange sm:h-3.5 sm:w-3.5" />
              <span className="text-[10px] font-semibold text-white/90 sm:text-xs">{product.rating}</span>
              <span className="text-[10px] text-white/55 sm:text-xs">({product.reviews})</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.variants.slice(0, 3).map((variant) => (
                <span
                  key={variant}
                  className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[9px] text-white/75 sm:text-[10px]"
                >
                  {variant}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="font-display text-xl text-white sm:text-2xl">
                {formatPEN(product.price)}
              </span>
              {product.oldPrice > product.price && (
                <span className="text-sm text-white/50 line-through">
                  {formatPEN(product.oldPrice)}
                </span>
              )}
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              onClick={() => onAddToCart(product, product.variants[0], 1)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-brand-orange px-2 py-2.5 text-xs font-bold text-white shadow-glow-orange transition-colors duration-200 hover:bg-brand-orange-hover sm:gap-2 sm:py-3 sm:text-sm"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.8} />
              Agregar al Carrito
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
