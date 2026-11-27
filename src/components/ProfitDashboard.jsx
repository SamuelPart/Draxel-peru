import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BadgeDollarSign,
  Clock,
  PackageCheck,
  Percent,
  TrendingUp,
  Truck,
  X,
} from 'lucide-react';
import {
  formatPEN,
  getProductEconomics,
  getCatalogProfitSummary,
  storeConfig,
} from '../data/storeConfig.js';

/**
 * =====================================================================
 * ProfitDashboard — Panel de Ganancias (vista administrativa)
 * =====================================================================
 * Visible solo con #ganancias o ?admin=1. Muestra la rentabilidad real
 * del modelo DROP/COD: costo proveedor (Lady Import) + delivery ISI FAST,
 * ganancia por producto, escenarios de envío y reglas operativas.
 * =====================================================================
 */

export default function ProfitDashboard({ onClose }) {
  const summary = getCatalogProfitSummary();
  const { zones } = storeConfig.shipping;
  const remoteCost =
    zones.nacional.price + (zones.nacional.remoteSupplement || 0);

  return (
    <motion.section
      id="panel-ganancias"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-brand-pearl py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-4xl bg-brand-obsidian px-8 py-10">
          <div className="bg-grid-dark absolute inset-0 opacity-60" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-orange/25 blur-[110px]" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                <BadgeDollarSign className="h-4 w-4" />
                Panel interno · Modelo DROP / COD
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tightest text-white sm:text-4xl">
                Panel de Ganancias — DRAXEL
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
                Proveedor <strong className="text-white">Lady Import</strong> ·
                Logística <strong className="text-white">ISI FAST</strong> (30
                ciudades, sede Trujillo) · Liquidación en 24h. Los costos son
                estimados editables en <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">storeConfig.js</code>{' '}
                (campo <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">cost</code>).
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-shrink-0 items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.15]"
            >
              <X className="h-4 w-4" />
              Cerrar panel
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: TrendingUp,
              label: 'Ganancia promedio por venta',
              value: formatPEN(summary.avgGross),
              note: 'Antes de delivery (el envío se cobra aparte)',
            },
            {
              icon: Percent,
              label: 'Margen bruto promedio',
              value: `${summary.avgMargin}%`,
              note: 'Sobre precio de venta del catálogo',
            },
            {
              icon: PackageCheck,
              label: 'Ganancia mín. garantizada',
              value: formatPEN(summary.minWorst),
              note: 'Peor caso: envío gratis + punto lejano (S/ 18)',
            },
            {
              icon: Truck,
              label: 'Cobertura ISI FAST',
              value: `${storeConfig.logistics.coverageCities} ciudades`,
              note: 'Contra-entrega nacional · sede en Trujillo',
            },
          ].map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_16px_45px_-22px_rgba(9,10,15,0.18)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange">
                <kpi.icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {kpi.label}
              </p>
              <p className="mt-1.5 font-display text-2xl font-extrabold text-brand-obsidian">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-slate-400">{kpi.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Economía por zona */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-100 bg-white p-6">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-brand-obsidian">
              <Truck className="h-[18px] w-[18px] text-brand-orange" />
              Trujillo Metropolitano
            </h3>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Cobro al cliente</dt><dd className="font-bold text-brand-obsidian">{formatPEN(zones.trujillo.price)}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Costo delivery local</dt><dd className="font-semibold text-slate-600">{formatPEN(zones.trujillo.cost)}</dd></div>
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-2.5"><dt className="font-semibold text-brand-obsidian">Ganancia en envío</dt><dd className="font-display font-extrabold text-brand-whatsapp">+{formatPEN(zones.trujillo.price - zones.trujillo.cost)}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-slate-400">Tu ventaja: operas desde Trujillo con delivery local express.</p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-brand-obsidian">
              <Truck className="h-[18px] w-[18px] text-brand-orange" />
              Nacional (ISI FAST / Shalom / Olva)
            </h3>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Tarifa plana provincia</dt><dd className="font-bold text-brand-obsidian">{formatPEN(zones.nacional.price)}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Puntos lejanos (+{formatPEN(zones.nacional.remoteSupplement)})</dt><dd className="font-semibold text-slate-600">{formatPEN(remoteCost)}</dd></div>
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-2.5"><dt className="font-semibold text-brand-obsidian">Ganancia en envío</dt><dd className="font-display font-extrabold text-slate-500">{formatPEN(0)} (pass-through)</dd></div>
            </dl>
            <p className="mt-3 text-xs text-slate-400">La ganancia nacional viene del margen del producto (≈ {summary.avgMargin}% promedio).</p>
          </div>

          <div className="rounded-3xl border border-brand-orange/20 bg-brand-orange/[0.06] p-6">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-brand-obsidian">
              <BadgeDollarSign className="h-[18px] w-[18px] text-brand-orange" />
              Envío GRATIS desde S/ 120
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Con margen bruto del <strong>{summary.avgMargin}%</strong>, un pedido
              de S/ 120 genera <strong>{formatPEN(summary.avgGross * 1.55)}</strong>{' '}
              de margen aprox. — absorber el courier ({formatPEN(remoteCost)} máx.)
              sigue dejando ganancia sólida. Umbral seguro. ✅
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Recomendación: mantener el umbral en S/ 120 y empujar combos para
              superarlo.
            </p>
          </div>
        </div>

        {/* Tabla de rentabilidad */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-100 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h3 className="font-display text-lg font-extrabold text-brand-obsidian">
              Rentabilidad por producto
            </h3>
            <span className="rounded-full bg-brand-whatsapp/15 px-3 py-1.5 text-xs font-bold text-brand-whatsapp">
              {summary.rows.length} / {summary.rows.length} con ganancia ✅
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3.5 font-semibold">Producto</th>
                  <th className="px-4 py-3.5 font-semibold">Precio</th>
                  <th className="px-4 py-3.5 font-semibold">Costo</th>
                  <th className="px-4 py-3.5 font-semibold">Ganancia</th>
                  <th className="px-4 py-3.5 font-semibold">Margen</th>
                  <th className="px-4 py-3.5 font-semibold">Mín. con envío gratis</th>
                </tr>
              </thead>
              <tbody>
                {summary.rows.map((row) => (
                  <tr
                    key={row.product.id}
                    className="border-b border-slate-50 transition-colors last:border-0 hover:bg-brand-pearl/60"
                  >
                    <td className="max-w-[260px] px-6 py-3.5">
                      <p className="line-clamp-1 font-semibold text-brand-obsidian">
                        {row.product.name}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 font-semibold tabular-nums text-brand-obsidian">
                      {formatPEN(row.price)}
                    </td>
                    <td className="px-4 py-3.5 tabular-nums text-slate-500">
                      {formatPEN(row.cost)}
                    </td>
                    <td className="px-4 py-3.5 font-display font-extrabold tabular-nums text-brand-whatsapp">
                      +{formatPEN(row.gross)}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="rounded-full bg-brand-orange/15 px-2.5 py-1 text-xs font-bold text-brand-orange">
                        {row.marginPercent}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ${
                          row.worstCase > 0
                            ? 'bg-brand-whatsapp/15 text-brand-whatsapp'
                            : 'bg-red-50 text-red-500'
                        }`}
                      >
                        +{formatPEN(row.worstCase)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reglas operativas ISI FAST */}
        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="flex items-center gap-2 font-display text-base font-bold text-amber-900">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Reglas operativas ISI FAST (protegen tu ganancia)
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {storeConfig.logistics.notes.map((note) => (
              <p key={note} className="flex items-start gap-2 text-sm text-amber-900/85">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                {note}
              </p>
            ))}
          </div>
          <p className="mt-4 rounded-2xl bg-amber-100/70 px-4 py-3 text-sm font-semibold text-amber-900">
            ⚠️ {storeConfig.logistics.rejectionPolicy}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
