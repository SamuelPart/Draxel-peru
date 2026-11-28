import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Navbar from './components/Navbar.jsx';
import HeroNowhere from './components/HeroNowhere.jsx';
import CategoryPills from './components/CategoryPills.jsx';
import ProductCard3D from './components/ProductCard3D.jsx';
import ProductQuickViewModal from './components/ProductQuickViewModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import TrustAndFooter from './components/TrustAndFooter.jsx';
import ProfitDashboard from './components/ProfitDashboard.jsx';
import HowToBuy from './components/HowToBuy.jsx';
import PageBackdrop from './components/PageBackdrop.jsx';
import { products, categories, buildWhatsAppLink } from './data/storeConfig.js';

/**
 * =====================================================================
 * App — DRAXEL | Tienda Online de Novedades, Gadgets, Hogar y Regalos
 * =====================================================================
 * Estado central: catálogo filtrable, carrito persistente (localStorage),
 * vista rápida y cierre de venta por WhatsApp.
 * =====================================================================
 */

const CART_STORAGE_KEY = 'draxel-cart-v1';

function WhatsAppGlyph({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function loadCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [cartItems, setCartItems] = useState(loadCart);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [showProfitPanel, setShowProfitPanel] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.location.hash === '#ganancias' ||
        new URLSearchParams(window.location.search).has('admin'))
  );

  /* Panel de ganancias (#ganancias o ?admin=1) */
  useEffect(() => {
    const syncPanel = () => {
      const active =
        window.location.hash === '#ganancias' ||
        new URLSearchParams(window.location.search).has('admin');
      setShowProfitPanel(active);
    };
    window.addEventListener('hashchange', syncPanel);
    return () => window.removeEventListener('hashchange', syncPanel);
  }, []);

  /* Persistencia del carrito */
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [cartItems]);

  /* Conteos por categoría */
  const counts = useMemo(() => {
    const base = { todos: products.length };
    categories.forEach((category) => {
      base[category.id] = products.filter((p) => p.categoryId === category.id).length;
    });
    return base;
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todos') return products;
    return products.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  /* ===================== Acciones del carrito ===================== */
  const addToCart = (product, variant, qty) => {
    const key = `${product.id}__${variant}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: Math.min(10, item.qty + qty) } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          variant,
          qty,
          price: product.price,
          image: product.image,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleQtyChange = (key, qty) => {
    setCartItems((prev) => prev.map((item) => (item.key === key ? { ...item, qty } : item)));
  };

  const handleRemove = (key) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const fabLink = buildWhatsAppLink(
    '¡Hola DRAXEL! 👋 Quiero hacer un pedido / tengo una consulta sobre sus productos.'
  );

  return (
    <div className="relative min-h-screen">
      <PageBackdrop />
      {/* Grano editorial sutil (textura premium) */}
      <div
        aria-hidden="true"
        className="grain-overlay pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-overlay"
      />
      <AnnouncementBar />
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <main>
        {/* NOWHERE® — lookbook autocontenido (public/nowhere/index.html) */}
        <section id="inicio" className="relative px-3 pb-12 pt-6 sm:px-5 sm:pb-16 sm:pt-8">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="hairline-gold h-px w-16 sm:w-28" />
            <p className="label-micro text-white/70">Lookbook · Vol. 01</p>
            <span className="hairline-gold h-px w-16 sm:w-28" />
          </div>
          {/* Glow difuminado detrás del hero */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-8 bottom-6 rounded-[48px]"
            style={{
              background:
                'radial-gradient(55% 55% at 50% 50%, rgba(255,85,0,0.28) 0%, rgba(255,120,40,0.14) 55%, transparent 75%)',
              filter: 'blur(48px)',
            }}
          />
          <div className="relative overflow-hidden rounded-[22px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-brand-orange/25">
            <HeroNowhere />
          </div>
          {/* Difuminado: el hero se funde con el fondo oscuro */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0b0d15]"
          />
        </section>

        {/* =================== Catálogo =================== */}
        <section id="productos" className="relative py-20">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  01 — Colección
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 font-display text-3xl leading-[1.06] text-white sm:text-5xl"
                >
                  Descubre lo más{' '}
                  <span className="text-gradient-brand italic">viral</span> del momento
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg"
                >
                  16 productos seleccionados por tendencia, calidad y demanda real.
                  Precios directos de fábrica con la garantía DRAXEL.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
                className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-6 lg:text-right"
              >
                <p className="label-micro text-white/45">Selección actual</p>
                <p className="mt-2 font-display text-3xl text-white">
                  16 <span className="text-lg text-white/50">productos</span>
                </p>
                <p className="mt-1 text-sm text-white/50">5 categorías · Envío gratis desde S/ 120</p>
              </motion.div>
            </div>

            {/* Píldoras de categoría */}
            <div className="mt-10">
              <CategoryPills
                activeId={activeCategory}
                onChange={setActiveCategory}
                counts={counts}
              />
            </div>

            {/* Grid de productos */}
            <motion.div
              layout
              className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard3D
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={addToCart}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </motion.div>

            {/* Nota de envío */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 flex flex-col items-center justify-between gap-5 border-y border-brand-orange/30 bg-gradient-to-r from-[#170f08] via-[#151220] to-[#170f08] px-6 py-8 sm:flex-row sm:px-12"
            >
              <div>
                <p className="label-micro text-brand-orange">Envíos &amp; Cobertura · Datos reales</p>
                <h3 className="mt-2 font-display text-xl text-white sm:text-2xl">
                  Envío GRATIS en todo el Perú desde S/ 120
                </h3>
                <p className="mt-1.5 text-sm text-white/60">
                  Trujillo Metropolitano S/ 8 (mismo día) · Lima S/ 12 (S/ 18 zonas lejanas) ·
                  Provincia S/ 15 (S/ 18 zonas lejanas) · Contraentrega en todo el país.
                </p>
              </div>
              <a
                href="#envios"
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-brand-orange/50 px-7 py-3.5 text-sm font-semibold text-brand-orange transition-colors duration-200 hover:bg-brand-orange hover:text-white"
              >
                Ver cobertura
              </a>
            </motion.div>
          </div>
        </section>

        {/* Cómo comprar en 3 pasos (reemplaza el producto estrella) */}
        <HowToBuy />

        {/* Panel interno de ganancias (visible con #ganancias o ?admin=1) */}
        {showProfitPanel && (
          <ProfitDashboard
            onClose={() => {
              window.location.hash = '';
              setShowProfitPanel(false);
            }}
          />
        )}

        <TrustAndFooter />
      </main>

      {/* Botón flotante WhatsApp */}
      <a
        href={fabLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-glow-green transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-brand-whatsapp animate-pulse-ring" />
        <WhatsAppGlyph className="relative h-7 w-7" />
      </a>

      {/* Overlays */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onQtyChange={handleQtyChange}
        onRemove={handleRemove}
      />
    </div>
  );
}
