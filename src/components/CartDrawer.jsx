import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  CreditCard,
  Home,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  User,
  X,
} from 'lucide-react';
import {
  formatPEN,
  getShippingCost,
  getRemainingForFreeShipping,
  buildOrderMessage,
  buildWhatsAppLink,
  storeConfig,
} from '../data/storeConfig.js';

/**
 * =====================================================================
 * CartDrawer — Carrito lateral + Checkout de alta conversión (Perú)
 * =====================================================================
 * - Barra de progreso animada hacia ENVÍO GRATIS (S/ 120)
 * - Selector de destino: Trujillo (S/ 8) o Nacional Shalom/Olva (S/ 15)
 * - Métodos de pago por destino + formulario validado
 * - Botón "Pedir por WhatsApp" con resumen completo del pedido
 * =====================================================================
 */

function WhatsAppGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const inputClass = (hasError) =>
  `w-full rounded-xl border px-4 py-3 text-sm text-brand-obsidian placeholder:text-slate-400 outline-none transition-all duration-200 focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
      : 'border-slate-200 focus:border-brand-orange focus:ring-brand-orange/15'
  }`;

export default function CartDrawer({ open, items, onClose, onQtyChange, onRemove }) {
  const [zoneId, setZoneId] = useState('trujillo');
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    agency: '',
    payment: storeConfig.shipping.zones.trujillo.paymentMethods[0],
  });
  const [errors, setErrors] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, [open]);

  /* Bloquear scroll del body cuando el carrito está abierto */
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const zone = storeConfig.shipping.zones[zoneId];
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );
  const shippingCost = getShippingCost(zoneId, subtotal);
  const total = subtotal + shippingCost;
  const remaining = getRemainingForFreeShipping(subtotal);
  const progress = Math.min(100, (subtotal / storeConfig.shipping.freeFrom) * 100);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  const handleZoneChange = (nextZone) => {
    setZoneId(nextZone);
    setCustomer((prev) => ({
      ...prev,
      payment: storeConfig.shipping.zones[nextZone].paymentMethods[0],
    }));
    setErrors((prev) => ({ ...prev, payment: undefined, city: undefined, agency: undefined }));
  };

  const handleField = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (customer.name.trim().length < 3) next.name = 'Ingresa tu nombre completo.';
    if (!/^\d{9}$/.test(customer.phone.trim())) next.phone = 'Ingresa un celular válido de 9 dígitos.';
    if (customer.address.trim().length < 6) next.address = 'Ingresa tu dirección de entrega.';
    if (zoneId === 'nacional') {
      if (customer.city.trim().length < 3) next.city = 'Ingresa tu ciudad o departamento.';
      if (customer.agency.trim().length < 3) next.agency = 'Indica la agencia Shalom / Olva.';
    }
    if (!customer.payment) next.payment = 'Elige un método de pago.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleOrder = () => {
    if (items.length === 0) return;
    if (!validate()) return;
    const message = buildOrderMessage({
      items,
      subtotal,
      shippingCost,
      zoneId,
      customer,
    });
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Carrito de compras"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Cerrar carrito"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-obsidian/55 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 290, damping: 32 }}
            className="relative z-10 flex h-full w-full flex-col bg-white shadow-2xl sm:max-w-[460px]"
          >
            {/* ============ Header ============ */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-obsidian text-white">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-extrabold tracking-tightest text-brand-obsidian">
                    Tu Carrito
                  </h2>
                  <p className="text-xs text-slate-400">
                    {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar carrito"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:scale-105 hover:text-brand-obsidian active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              /* ============ Estado vacío ============ */
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-4xl bg-brand-pearl">
                  <ShoppingBag className="h-9 w-9 text-slate-300" />
                </div>
                <h3 className="mt-6 font-display text-xl font-extrabold text-brand-obsidian">
                  Tu carrito está vacío
                </h3>
                <p className="mt-2 max-w-[280px] text-sm text-slate-500">
                  Explora nuestros productos virales y agrega tus favoritos. Envío
                  gratis desde S/ 120.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 rounded-2xl bg-brand-orange px-8 py-3.5 text-sm font-bold text-white shadow-glow-orange transition-transform hover:scale-[1.03] active:scale-95"
                >
                  Explorar Productos
                </button>
              </div>
            ) : (
              <>
                {/* ============ Progreso envío gratis ============ */}
                <div className="border-b border-slate-100 px-6 py-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-semibold text-brand-obsidian">
                      <Truck className="h-4 w-4 text-brand-orange" />
                      {remaining > 0 ? (
                        <>
                          Te falta{' '}
                          <strong className="text-brand-orange">{formatPEN(remaining)}</strong>{' '}
                          para el ENVÍO GRATIS
                        </>
                      ) : (
                        <span className="text-brand-whatsapp">
                          🎉 ¡Ya tienes ENVÍO GRATIS en tu pedido!
                        </span>
                      )}
                    </span>
                    <span className="font-bold tabular-nums text-slate-400">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                      className="relative h-full rounded-full bg-gradient-to-r from-brand-orange to-amber-400"
                    >
                      {progress < 100 && (
                        <div className="shimmer-bar absolute inset-0 rounded-full opacity-40" />
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* ============ Lista de productos ============ */}
                <div className="scrollbar-elegant flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.28 }}
                        className="flex gap-3.5 rounded-2xl border border-slate-100 bg-white p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-[76px] w-[76px] flex-shrink-0 rounded-xl object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="line-clamp-2 text-[13px] font-semibold leading-snug text-brand-obsidian">
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemove(item.key)}
                              aria-label={`Eliminar ${item.name}`}
                              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="mt-1 w-fit rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                            {item.variant}
                          </span>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1 rounded-full border border-slate-200 p-0.5">
                              <button
                                type="button"
                                onClick={() => onQtyChange(item.key, Math.max(1, item.qty - 1))}
                                aria-label="Disminuir cantidad"
                                className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold tabular-nums text-brand-obsidian">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => onQtyChange(item.key, Math.min(10, item.qty + 1))}
                                aria-label="Aumentar cantidad"
                                className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="font-display text-sm font-extrabold text-brand-obsidian">
                              {formatPEN(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* ============ Checkout ============ */}
                <div className="scrollbar-elegant max-h-[52vh] overflow-y-auto border-t border-slate-100 bg-brand-pearl px-6 pb-6 pt-5">
                  {/* Selector de destino */}
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-brand-orange" />
                    Destino de envío
                  </h3>
                  <div className="mt-3 space-y-2">
                    {Object.values(storeConfig.shipping.zones).map((zoneOption) => {
                      const isSelected = zoneId === zoneOption.id;
                      const zoneCost = getShippingCost(zoneOption.id, subtotal);
                      return (
                        <motion.button
                          key={zoneOption.id}
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleZoneChange(zoneOption.id)}
                          className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                            isSelected
                              ? 'border-brand-orange bg-white ring-2 ring-brand-orange/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                              isSelected ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            <Truck className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-bold leading-tight text-brand-obsidian">
                              {zoneOption.label}
                            </p>
                            <p className="mt-0.5 text-[11px] text-slate-400">{zoneOption.eta}</p>
                          </div>
                          <span
                            className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                              zoneCost === 0
                                ? 'bg-brand-whatsapp/15 text-brand-whatsapp'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {zoneCost === 0 ? 'GRATIS' : formatPEN(zoneCost)}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Formulario */}
                  <div className="mt-5 space-y-3">
                    <div>
                      <label
                        htmlFor="cart-name"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600"
                      >
                        <User className="h-3.5 w-3.5 text-brand-orange" />
                        Nombre completo
                      </label>
                      <input
                        id="cart-name"
                        type="text"
                        value={customer.name}
                        onChange={(e) => handleField('name', e.target.value)}
                        placeholder="Ej: Ana Torres"
                        className={inputClass(Boolean(errors.name))}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="cart-phone"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600"
                      >
                        <CreditCard className="h-3.5 w-3.5 text-brand-orange" />
                        Celular (WhatsApp)
                      </label>
                      <input
                        id="cart-phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={9}
                        value={customer.phone}
                        onChange={(e) => handleField('phone', e.target.value.replace(/\D/g, ''))}
                        placeholder="999 888 777"
                        className={inputClass(Boolean(errors.phone))}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="cart-address"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600"
                      >
                        <Home className="h-3.5 w-3.5 text-brand-orange" />
                        {zoneId === 'trujillo'
                          ? 'Dirección de entrega completa'
                          : 'Dirección de referencia'}
                      </label>
                      <input
                        id="cart-address"
                        type="text"
                        value={customer.address}
                        onChange={(e) => handleField('address', e.target.value)}
                        placeholder={
                          zoneId === 'trujillo'
                            ? 'Av. España 1234, Urb. California'
                            : 'Jr. Independencia 456, referencias...'
                        }
                        className={inputClass(Boolean(errors.address))}
                      />
                      {errors.address && (
                        <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                      )}
                    </div>

                    {zoneId === 'nacional' && (
                      <>
                        <div>
                          <label
                            htmlFor="cart-city"
                            className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600"
                          >
                            <MapPin className="h-3.5 w-3.5 text-brand-orange" />
                            Ciudad / Departamento
                          </label>
                          <input
                            id="cart-city"
                            type="text"
                            value={customer.city}
                            onChange={(e) => handleField('city', e.target.value)}
                            placeholder="Ej: Arequipa, Arequipa"
                            className={inputClass(Boolean(errors.city))}
                          />
                          {errors.city && (
                            <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="cart-agency"
                            className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600"
                          >
                            <Building2 className="h-3.5 w-3.5 text-brand-orange" />
                            Agencia / Courier de entrega (ISI FAST, Shalom, Olva)
                          </label>
                          <input
                            id="cart-agency"
                            type="text"
                            value={customer.agency}
                            onChange={(e) => handleField('agency', e.target.value)}
                            placeholder="Ej: ISI FAST - Av. Ejército 789, Cajamarca"
                            className={inputClass(Boolean(errors.agency))}
                          />
                          {errors.agency && (
                            <p className="mt-1 text-xs text-red-500">{errors.agency}</p>
                          )}
                        </div>
                      </>
                    )}

                    {/* Método de pago */}
                    <div>
                      <p className="mb-1.5 text-xs font-semibold text-slate-600">
                        Método de pago
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {zone.paymentMethods.map((method) => (
                          <motion.button
                            key={method}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleField('payment', method)}
                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                              customer.payment === method
                                ? 'border-brand-obsidian bg-brand-obsidian text-white'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                            }`}
                          >
                            {method}
                          </motion.button>
                        ))}
                      </div>
                      {errors.payment && (
                        <p className="mt-1 text-xs text-red-500">{errors.payment}</p>
                      )}
                    </div>
                  </div>

                  {/* Resumen */}
                  <div className="mt-5 space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-semibold text-brand-obsidian">
                        {formatPEN(subtotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>
                        Envío · <span className="text-xs">{zone.shortLabel}</span>
                      </span>
                      {shippingCost === 0 ? (
                        <span className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 line-through">
                            {formatPEN(zone.price)}
                          </span>
                          <span className="font-bold text-brand-whatsapp">GRATIS</span>
                        </span>
                      ) : (
                        <span className="font-semibold text-brand-obsidian">
                          {formatPEN(shippingCost)}
                        </span>
                      )}
                    </div>
                    <div className="border-t border-dashed border-slate-200 pt-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-base font-extrabold text-brand-obsidian">
                          TOTAL
                        </span>
                        <motion.span
                          key={total}
                          initial={{ scale: 1.08, opacity: 0.6 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.25 }}
                          className="font-display text-xl font-extrabold text-brand-obsidian"
                        >
                          {formatPEN(total)}
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* CTA WhatsApp */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                    onClick={handleOrder}
                    className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-whatsapp py-4 text-[15px] font-bold text-white shadow-glow-green transition-colors hover:bg-brand-whatsapp-hover"
                  >
                    <WhatsAppGlyph className="h-5 w-5" />
                    Pedir por WhatsApp
                  </motion.button>

                  <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400">
                    🔒 Compra 100% segura · ⚡ Respondemos en minutos ·
                    🚚 Entrega vía ISI FAST / Shalom / Olva con contra-entrega disponible.
                  </p>
                  <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-center text-[11px] font-medium leading-relaxed text-amber-800">
                    ⚠️ Confirmamos tu pedido por WhatsApp antes de despachar para
                    evitar rechazos (los pedidos rechazados generan costo de
                    retorno según política del courier).
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
