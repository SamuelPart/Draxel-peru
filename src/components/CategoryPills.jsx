import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { categories } from '../data/storeConfig.js';

/**
 * CategoryPills — Pestañas filtrables con indicador animado
 * (layoutId="activeCategoryPill") y contador de productos por categoría.
 */
export default function CategoryPills({ activeId, onChange, counts }) {
  const pills = [
    { id: 'todos', name: 'Todos', emoji: '🔥' },
    ...categories,
  ];

  return (
    <div
      id="categorias"
      role="group"
      aria-label="Filtrar por categoría"
      className="no-scrollbar flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-2.5"
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
            className="relative rounded-full px-4 py-2.5 text-[13px] font-semibold sm:px-5 sm:text-sm"
          >
            {isActive && (
              <motion.span
                layoutId="activeCategoryPill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-brand-obsidian shadow-card"
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 whitespace-nowrap transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-slate-500 hover:text-brand-obsidian'
              }`}
            >
              <Filter
                className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-white/75' : 'text-brand-orange/70'}`}
                strokeWidth={2.4}
              />
              <span aria-hidden="true">{pill.emoji}</span>
              {pill.name}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                  isActive ? 'bg-white/15 text-white/85' : 'bg-slate-100 text-slate-400'
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
