import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { categories } from '../data/storeConfig.js';

/**
 * CategoryPills — Barra segmentada de filtro (icono de filtro, sin emojis).
 * Contenedor tipo "pill bar" con desplazamiento horizontal en móvil.
 * Indicador activo naranja animado (layoutId).
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
      className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      <div className="flex w-max items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] p-1.5 backdrop-blur-sm sm:w-auto sm:flex-wrap sm:justify-center">
        {pills.map((pill) => {
          const isActive = activeId === pill.id;
          return (
            <motion.button
              key={pill.id}
              type="button"
              onClick={() => onChange(pill.id)}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              aria-pressed={isActive}
              className="relative flex-shrink-0 rounded-full px-4 py-2.5"
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategoryPill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-brand-orange shadow-glow-orange"
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <Filter
                  className={`h-3 w-3 flex-shrink-0 ${isActive ? 'text-white/85' : 'text-brand-orange/85'}`}
                  strokeWidth={2.4}
                />
                {pill.name}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-white/45'
                  }`}
                >
                  {counts[pill.id] ?? 0}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
