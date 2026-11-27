# DRAXEL — Tienda Virtual E-Commerce 🛒⚡

**Novedades · Gadgets · Hogar · Regalos en Perú** — Tienda online ejecutiva de dropshipping (sin alimentos) con identidad de marca completa, efectos 3D interactivos y checkout de alta conversión por WhatsApp.

## 🚀 Stack Tecnológico

| Capa | Tecnología |
| --- | --- |
| Framework | React 18 + Vite 5 |
| Animaciones / 3D | Framer Motion (`useMotionValue`, `useSpring`, `useTransform`) + CSS 3D (`perspective: 1000px`, `preserve-3d`) |
| Estilos | Tailwind CSS 3 + variables CSS de identidad |
| Iconografía | lucide-react |
| Tipografía | Plus Jakarta Sans (600/700/800) + Inter (400/500/600) |
| Deploy | Vercel (configuración incluida) |

## 🎨 Identidad de Marca

- **Primario / Acción:** Naranja Vibrante `#FF5500` (hover `#E04800`) — botones, badges de oferta, elementos activos.
- **Contraste Premium:** Negro Obsidiana `#090A0F` · Gris Grafito `#14161F` — Hero, barra superior, botones secundarios.
- **Superficie Limpia:** Blanco `#FFFFFF` · Gris Perla `#F8FAFC` — catálogo y precios.
- **Cierre de Venta:** Verde WhatsApp `#16A34A` — exclusivo para el botón de checkout.
- **Logo:** Isotipo vectorial SVG ultraminimalista ("D" geométrica + flecha de velocidad naranja) en `src/components/BrandLogo.jsx`.

## 📦 Estructura

```
├── index.html                      # Google Fonts + meta SEO
├── tailwind.config.js              # Tokens de marca (colores, fuentes, sombras, keyframes)
├── postcss.config.js
├── vite.config.js
├── vercel.json                     # Deploy Vercel
├── public/
│   ├── favicon.svg                 # Isotipo DRAXEL
│   └── products/                   # 16 imágenes de producto optimizadas (web)
└── src/
    ├── main.jsx
    ├── index.css                   # Variables de marca, utilidades 3D, glassmorphism, scrollbar
    ├── App.jsx                     # Estado central: catálogo, carrito persistente, overlays
    ├── data/
    │   └── storeConfig.js          # Marca, WhatsApp, envíos, campañas y 16 productos
    └── components/
        ├── BrandLogo.jsx           # Isotipo SVG + logotipo
        ├── AnnouncementBar.jsx     # Barra de anuncios rotativos
        ├── Navbar.jsx              # Navegación glassmorphism + carrito
        ├── Hero3DShowcase.jsx      # Hero con tarjeta 3D + contador regresivo en vivo
        ├── CategoryPills.jsx       # Filtros con indicador layoutId animado
        ├── ProductCard3D.jsx       # Tarjetas con 3D tilt + entrada escalonada
        ├── ProductQuickViewModal.jsx
        ├── CartDrawer.jsx          # Carrito + checkout Perú + pedido WhatsApp
        └── TrustAndFooter.jsx      # Confianza + footer completo
```

## 🛍️ Catálogo

16 productos virales de alta demanda en 5 categorías (Regalos, Tecnología & Gadgets, Hogar Inteligente, Belleza, Moda & Accesorios), con variantes, badges de descuento y descripciones de venta.

## 💳 Logística Perú (ISI FAST · Shalom · Olva)

| Destino | Envío (al cliente) | Costo courier | Métodos de pago |
| --- | --- | --- | --- |
| Trujillo Metropolitano (Delivery Express) | S/ 8 | S/ 5 (delivery local) | Contraentrega · Yape / Plin |
| Envío Nacional (30 ciudades) | S/ 15 · Lejanos S/ 18 | S/ 15 · Lejanos S/ 18 | Contraentrega · Yape / Plin · Transferencia BCP / Interbank |

El carrito calcula el envío automáticamente, muestra la barra de progreso hacia el **ENVÍO GRATIS** (S/ 120) y arma el pedido formateado para WhatsApp (`wa.me/51999999999`).

## 💰 Modelo de negocio DROP / COD (Lady Import + ISI FAST)

Basado en el brochure operativo de **Lady Import / ISI FAST (Nov 2026)**:

- **Vendes sin invertir** (modelo Dropshipping DROP o Cash on Delivery COD).
- **ISI FAST entrega y cobra contra-entrega**; dentro de las 24h te liquida descontando costo de producto + delivery → la diferencia es tu ganancia.
- **Tarifas COD**: Lima S/ 12 (lejanos S/ 18) · Provincia S/ 15 (lejanos S/ 18).
- **Cobertura**: 30 ciudades con sede en **Trujillo**.
- **Reglas clave**: pedidos hasta 7:00 AM · reparto 9:00 AM–5:00 PM · pedidos rechazados se cobran en su totalidad (confirmar siempre por WhatsApp antes de despachar).

### Panel de Ganancias (interno)

Abre `#ganancias` o `?admin=1` en la tienda (o el link del footer) para ver:

- Ganancia promedio por venta y margen bruto del catálogo (~55%).
- Rentabilidad por producto: precio, costo proveedor, ganancia, margen y ganancia mínima garantizada (peor caso: envío gratis + punto lejano S/ 18).
- Economía por zona de envío y reglas operativas ISI FAST.

Los costos por producto son editables en `src/data/storeConfig.js` (campo `cost`).

## ▶️ Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de producción en /dist
npm run preview    # previsualizar el build
```

## 🌐 Deploy

El proyecto está listo para **Vercel**: importa el repo y despliega sin configuración adicional (`vercel.json` incluido).

---

© 2026 DRAXEL · Hecho con ❤️ en Trujillo, Perú
