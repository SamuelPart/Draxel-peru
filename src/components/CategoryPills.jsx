import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { categories } from '../data/storeConfig.js';

/**
 * CategoryPills — Filtro de categorías con icono de filtro (sin emojis).
 * En móvil: una sola fila con desplazamiento horizontal (scroll).
 * En desktop: se envuelve centrado. Indicador animado (layoutId).
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
      className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
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
            className={`relative flex-shrink-0 rounded-full border px-4 py-2.5 text-[13px] font-semibold sm:px-5 sm:text-sm ${
              isActive ? 'border-transparent' : 'border-white/10 bg-white/[0.06]'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeCategoryPill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-brand-orange shadow-glow-orange"
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 whitespace-nowrap transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-white/65 hover:text-white'
              }`}
            >
              <Filter
                className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-white/85' : 'text-brand-orange/85'}`}
                strokeWidth={2.4}
              />
              {pill.name}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-white/50'
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
