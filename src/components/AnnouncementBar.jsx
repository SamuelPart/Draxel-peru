import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Truck, Zap, CreditCard, Gift } from 'lucide-react';

/**
 * AnnouncementBar — Barra superior de anuncios rotativos
 * Mensajes de conversión que rotan con animación fluida.
 */
const announcements = [
  { icon: Truck, text: 'Envío GRATIS en compras desde S/ 120 a todo el Perú' },
  { icon: Zap, text: 'Envíos ISI FAST a 30 ciudades · Contra-entrega disponible' },
  { icon: CreditCard, text: 'Paga al recibir: Contra-entrega, Yape, Plin o Transferencia' },
  { icon: Gift, text: 'Ofertas de Navidad: hasta 40% OFF por tiempo limitado' },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[index];
  const Icon = current.icon;

  return (
    <div className="relative z-50 overflow-hidden bg-brand-obsidian text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-center gap-2 text-xs font-medium tracking-wide sm:text-[13px]"
          >
            <Icon className="h-3.5 w-3.5 text-brand-orange" strokeWidth={2.5} />
            <span className="text-white/90">{current.text}</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
