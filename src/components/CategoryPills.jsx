import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { categories } from '../data/storeConfig.js';

/**
 * CategoryPills — Filtro de categorías premium (icono de filtro, sin emojis).
 * Móvil: una sola fila con desplazamiento horizontal. Desktop: wrap centrado.
 * Píldora activa en oro champán con indicador animado (layoutId).
 */
export default function CategoryPills({ activeId, onChange, counts }) {
  const pills = [
    { id: 'todos', name: 'Todos' },
    ...categories,
  ];

  return (
    <div
      id="categorias"
      role="group"
      aria-label="Filtrar por categoría"
      className="no-scrollbar -mx-4 flex items-center gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
    >
      {pills.map((pill) => {
        const isActive = activeId === pill.id;
        return (
          <motion.button
            key={pill.id}
            type="button"
            onClick={() => onChange(pill.id)}
            whileTap={{ scale: 0.94 }}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            aria-pressed={isActive}
            className={`relative flex-shrink-0 rounded-full border px-4 py-2.5 ${
              isActive ? 'border-transparent' : 'border-white/10 bg-white/[0.04]'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeCategoryPill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold-deep shadow-glow-gold"
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                isActive ? 'text-[#14110a]' : 'text-white/60 hover:text-white'
              }`}
            >
              <Filter
                className={`h-3 w-3 flex-shrink-0 ${isActive ? 'text-[#14110a]/75' : 'text-brand-gold/80'}`}
                strokeWidth={2.4}
              />
              {pill.name}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums ${
                  isActive ? 'bg-black/15 text-[#14110a]/80' : 'bg-white/[0.08] text-white/45'
                }`}
              >
                {counts[pill.id] ?? 0}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
