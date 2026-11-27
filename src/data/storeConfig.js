/**
 * =====================================================================
 * DRAXEL — Configuración Central de la Tienda
 * =====================================================================
 * Marca, contacto, logística de envíos Perú, campañas y catálogo
 * completo de 16 productos de dropshipping (sin alimentos).
 * =====================================================================
 */

export const storeConfig = {
  brand: {
    name: 'DRAXEL',
    tagline: 'Novedades Virales · Gadgets · Hogar · Regalos',
    description:
      'Tienda online de novedades, gadgets, hogar y regalos en Perú. Productos virales de alta demanda con despacho inmediato desde Trujillo y envíos a todo el país.',
    location: 'Trujillo, La Libertad · Perú',
  },
  whatsapp: {
    number: '51999999999',
    display: '+51 999 999 999',
  },
  email: 'hola@draxel.pe',
  schedule: 'Lun a Sáb · 9:00 am – 8:00 pm',
  shipping: {
    freeFrom: 120,
    currency: 'S/ (PEN)',
    zones: {
      trujillo: {
        id: 'trujillo',
        label: 'Trujillo Metropolitano (Delivery Express)',
        shortLabel: 'Trujillo Metropolitano',
        price: 8,
        cost: 5,
        eta: 'Entrega el mismo día o el siguiente día hábil',
        paymentMethods: ['Contraentrega Efectivo', 'Yape / Plin'],
      },
      nacional: {
        id: 'nacional',
        label: 'Envío Nacional ISI FAST / Shalom / Olva (30 ciudades)',
        shortLabel: 'Envío Nacional ISI FAST',
        price: 15,
        cost: 15,
        remoteSupplement: 3,
        eta: 'Entrega en 24 a 48 horas vía ISI FAST · Shalom / Olva',
        paymentMethods: ['Contraentrega Efectivo', 'Yape / Plin', 'Transferencia BCP / Interbank'],
      },
    },
  },
  paymentMethods: {
    'Contraentrega Efectivo': 'Contraentrega Efectivo',
    'Yape / Plin': 'Yape / Plin',
    'Transferencia BCP / Interbank': 'Transferencia BCP / Interbank',
  },
  /**
   * Logística real — fuente: BROCHURE Lady Import / ISI FAST (Nov 2026)
   * Modelo DROP / COD: vendes sin invertir; ISI FAST entrega, cobra contra
   * entrega y liquida en 24h descontando costo de producto + delivery.
   */
  logistics: {
    partners: 'Lady Import (importador) · ISI FAST (courier)',
    model: 'Dropshipping DROP / Cash on Delivery (COD contra-entrega)',
    codRates: {
      lima: 12,
      limaRemote: 18,
      provincia: 15,
      provinciaRemote: 18,
    },
    coverageCities: 30,
    trujilloSede: true,
    liquidationHours: 24,
    orderCutoff: '7:00 AM',
    deliveryWindow: '9:00 AM – 5:00 PM',
    rejectionPolicy:
      'Los pedidos rechazados por el cliente se cobran en su totalidad — confirmar siempre por WhatsApp antes de despachar.',
    notes: [
      'Pedidos se recepcionan máximo 7:00 AM (fuera de horario entran como EXPRESS).',
      'Reparto de 9:00 AM a 5:00 PM.',
      'Liquidación y pagos dentro de las 24 horas de la entrega.',
      'Agencias Shalom / Olva: recepción de pedidos máximo 7:00 AM y pago de productos hasta 2:00 PM.',
    ],
  },
};

/* =====================================================================
 * Campañas activas (contador regresivo en vivo)
 * ===================================================================== */

export const campaigns = [
  {
    id: 'navidad',
    label: 'Ofertas de Navidad',
    emoji: '🎄',
    deadline: '2026-12-24T23:59:59',
  },
  {
    id: 'anio-nuevo',
    label: 'Especial Año Nuevo',
    emoji: '🎆',
    deadline: '2027-01-01T23:59:59',
  },
];

export function getActiveCampaign(now = new Date()) {
  const upcoming = campaigns.find((c) => new Date(c.deadline).getTime() > now.getTime());
  if (upcoming) return upcoming;
  return {
    id: 'flash',
    label: 'Ofertas Flash',
    emoji: '⚡',
    deadline: new Date(now.getTime() + 72 * 60 * 60 * 1000).toISOString(),
  };
}

/* =====================================================================
 * Categorías
 * ===================================================================== */

export const categories = [
  { id: 'regalos', name: 'Regalos Navidad & Año Nuevo', emoji: '🎁' },
  { id: 'tecnologia', name: 'Tecnología & Gadgets', emoji: '⚡' },
  { id: 'hogar', name: 'Hogar Inteligente', emoji: '🏠' },
  { id: 'belleza', name: 'Belleza & Cuidado Personal', emoji: '✨' },
  { id: 'moda', name: 'Moda & Accesorios', emoji: '🕶️' },
];

export function getCategoryName(id) {
  const found = categories.find((c) => c.id === id);
  return found ? found.name : '';
}

/* =====================================================================
 * Catálogo — 16 productos virales de alta demanda (NO alimenticios)
 * ===================================================================== */

export const products = [
  {
    id: 'proyector-galaxia-astronauta',
    name: 'Proyector Galaxia Astronauta 360° con Control Remoto',
    categoryId: 'regalos',
    price: 79.0,
    oldPrice: 115.0,
    cost: 35,
    image: '/products/proyector-galaxia-astronauta.jpg',
    variants: ['Blanco Espacial', 'Dorado Edición Limitada'],
    badge: 'Más Vendido',
    rating: 4.9,
    reviews: 312,
    description:
      'Convierte cualquier habitación en una galaxia privada. Su diseño de astronauta rota 360° y proyecta nebulosas, estrellas y planetas sobre techos y paredes con 8 modos de luz espectaculares.',
    features: [
      '8 modos de proyección galáctica de alta definición',
      'Rotación 360° con control remoto incluido',
      'Timer de apagado automático programable',
      'Regalo viral perfecto para todas las edades',
    ],
  },
  {
    id: 'lampara-luna-tactil-3d',
    name: 'Lámpara Luna Táctil 3D RGB 16 Colores con Base Madera',
    categoryId: 'regalos',
    price: 55.0,
    oldPrice: 80.0,
    cost: 25,
    image: '/products/lampara-luna-tactil-3d.jpg',
    variants: ['15cm', '18cm'],
    badge: 'Top Regalo',
    rating: 4.8,
    reviews: 208,
    description:
      'Una luna realista impresa en 3D que ilumina con 16 colores RGB controlados con un simple toque. Su base de madera natural la convierte en el detalle decorativo más viral del año.',
    features: [
      '16 colores RGB con control táctil inteligente',
      'Impresión 3D con textura lunar ultra realista',
      'Base de madera natural incluida',
      'Recargable por USB · hasta 12 horas de luz',
    ],
  },
  {
    id: 'mini-proyector-portatil-full-hd',
    name: 'Mini Proyector Portátil Full HD WiFi Cine en Casa',
    categoryId: 'tecnologia',
    price: 219.0,
    oldPrice: 299.0,
    cost: 98,
    image: '/products/mini-proyector-portatil-full-hd.jpg',
    variants: ['Blanco', 'Negro'],
    badge: 'Premium',
    rating: 4.7,
    reviews: 96,
    description:
      'Tu sala de cine cabe en la palma de tu mano. Resolución Full HD nativa, WiFi de doble banda y compatibilidad total para disfrutar pantallas gigantes de hasta 130 pulgadas donde quieras.',
    features: [
      'Full HD 1080p nativo · pantallas hasta 130"',
      'WiFi dual band + Bluetooth integrado',
      'Compatible con Netflix, YouTube, HDMI y USB',
      'Autoenfoque y corrección keystone automática',
    ],
  },
  {
    id: 'set-smartwatch-ultra-audifonos',
    name: 'Set Regalo Smartwatch Ultra + Audífonos Inalámbricos Pro',
    categoryId: 'regalos',
    price: 95.0,
    oldPrice: 140.0,
    cost: 43,
    image: '/products/set-smartwatch-ultra-audifonos.jpg',
    variants: ['Negro', 'Naranja', 'Plata'],
    badge: 'Edición Limitada',
    rating: 4.8,
    reviews: 254,
    description:
      'El set de regalo más pedido del año: smartwatch Ultra con pantalla AMOLED, llamadas Bluetooth y monitoreo de salud, más audífonos Pro con estuche de carga. Todo en una sola caja premium.',
    features: [
      'Smartwatch Ultra con pantalla AMOLED',
      'Llamadas Bluetooth y notificaciones inteligentes',
      'Audífonos Pro con estuche de carga incluido',
      'Empaque premium listo para regalar',
    ],
  },
  {
    id: 'audifonos-inalambricos-anc-led',
    name: 'Audífonos Inalámbricos Cancelación de Ruido Pantalla LED',
    categoryId: 'tecnologia',
    price: 59.0,
    oldPrice: 85.0,
    cost: 27,
    image: '/products/audifonos-inalambricos-anc-led.jpg',
    variants: ['Negro Mate', 'Blanco'],
    badge: 'Oferta Flash',
    rating: 4.7,
    reviews: 331,
    description:
      'Silencio total con cancelación activa de ruido y un estuche inteligente con pantalla LED que muestra la batería en tiempo real. Sonido potente con graves profundos para todo el día.',
    features: [
      'Cancelación activa de ruido (ANC) profesional',
      'Estuche inteligente con pantalla LED de batería',
      'Hasta 30 horas de autonomía total',
      'Bluetooth 5.3 · conexión multipunto estable',
    ],
  },
  {
    id: 'aro-de-luz-led-12-tripode',
    name: 'Aro de Luz LED Profesional 12" con Trípode 2.10m',
    categoryId: 'tecnologia',
    price: 65.0,
    oldPrice: 90.0,
    cost: 29,
    image: '/products/aro-de-luz-led-12-tripode.jpg',
    variants: ['Luz Fría', 'Luz Cálida', 'Neutra'],
    badge: 'Favorito Creadores',
    rating: 4.8,
    reviews: 187,
    description:
      'El aliado de creadores, tatuadores y maquilladoras. Aro de luz de 12 pulgadas con trípode extensible de 2.10 metros, 3 temperaturas de luz y control remoto para fotos y videos perfectos.',
    features: [
      'Aro de 12" con 160 LEDs de alta potencia',
      'Trípode extensible regulable hasta 2.10m',
      '3 temperaturas: fría, cálida y neutra',
      'Control remoto y soporte ajustable para celular',
    ],
  },
  {
    id: 'parlante-bluetooth-rgb-ipx7',
    name: 'Parlante Bluetooth Portátil Resistente al Agua RGB',
    categoryId: 'tecnologia',
    price: 75.0,
    oldPrice: 110.0,
    cost: 34,
    image: '/products/parlante-bluetooth-rgb-ipx7.jpg',
    variants: ['Negro', 'Azul', 'Rojo'],
    badge: null,
    rating: 4.7,
    reviews: 142,
    description:
      'Potencia de sonido 360° con luces RGB que sincronizan con tu música. Resistente al agua IPX7 para acompañarte en la playa, la piscina o la fiesta sin preocuparte por nada.',
    features: [
      'Sonido 360° con graves potentes y cristalinos',
      'Resistencia al agua certificada IPX7',
      'Luces RGB sincronizadas al ritmo de la música',
      'Hasta 20 horas de batería · modo estéreo TWS',
    ],
  },
  {
    id: 'cargador-inalambrico-3en1',
    name: 'Cargador Inalámbrico Magnético 3 en 1 Estación Rápida',
    categoryId: 'tecnologia',
    price: 89.0,
    oldPrice: 125.0,
    cost: 40,
    image: '/products/cargador-inalambrico-3en1.jpg',
    variants: ['Blanco', 'Negro'],
    badge: 'Nuevo',
    rating: 4.8,
    reviews: 121,
    description:
      'Carga tu celular, smartwatch y audífonos al mismo tiempo en una estación magnética plegable de carga rápida. Diseño minimalista perfecto para tu escritorio o para viajes.',
    features: [
      'Carga 3 dispositivos simultáneamente',
      'Carga magnética rápida compatible MagSafe',
      'Diseño plegable premium ideal para viajes',
      'Protección inteligente contra sobrecalentamiento',
    ],
  },
  {
    id: 'humidificador-efecto-llama',
    name: 'Humidificador Difusor de Aromas Efecto Llama Fuego LED',
    categoryId: 'hogar',
    price: 69.0,
    oldPrice: 95.0,
    cost: 31,
    image: '/products/humidificador-efecto-llama.jpg',
    variants: ['Negro', 'Blanco'],
    badge: 'Viral TikTok',
    rating: 4.9,
    reviews: 276,
    description:
      'El humidificador más viral del momento: proyecta una llama de fuego LED ultra realista mientras aromatiza y humidifica tu ambiente. Un espectáculo visual que relaja y enamora.',
    features: [
      'Efecto llama de fuego LED ultra realista',
      'Aromatiza y humidifica cualquier ambiente',
      'Depósito de 270ml · hasta 8 horas continuas',
      'Apagado automático seguro sin agua',
    ],
  },
  {
    id: 'tira-led-inteligente-rgb-5m',
    name: 'Tira LED Inteligente RGB 5 Metros Control App y Música',
    categoryId: 'hogar',
    price: 45.0,
    oldPrice: 65.0,
    cost: 20,
    image: '/products/tira-led-inteligente-rgb-5m.jpg',
    variants: ['Kit 5m', 'Kit 10m'],
    badge: null,
    rating: 4.6,
    reviews: 318,
    description:
      'Transforma tu cuarto en un espacio gamer o cine en segundos. 5 metros de luces RGB inteligentes con control por app, modo música y 16 millones de colores para cada mood.',
    features: [
      'Control por app y asistentes de voz',
      'Modo música con micrófono integrado',
      '16 millones de colores y escenas predefinidas',
      'Instalación fácil con adhesivo 3M reforzado',
    ],
  },
  {
    id: 'mini-licuadora-portatil-usb',
    name: 'Mini Licuadora Portátil Recargable USB 6 Cuchillas',
    categoryId: 'hogar',
    price: 49.0,
    oldPrice: 70.0,
    cost: 22,
    image: '/products/mini-licuadora-portatil-usb.jpg',
    variants: ['Celeste', 'Rosa', 'Blanco'],
    badge: null,
    rating: 4.6,
    reviews: 164,
    description:
      'Batidos, jugos y smoothies donde estés. Con 6 cuchillas de acero inoxidable y batería recargable por USB, tu licuadora personal te acompaña al gym, la oficina o el viaje.',
    features: [
      '6 cuchillas de acero inoxidable de alta rotación',
      'Recargable por USB · uso totalmente inalámbrico',
      'Material libre de BPA, seguro para alimentos',
      'Fácil de lavar · tapa de viaje con seguro',
    ],
  },
  {
    id: 'organizador-giratorio-360',
    name: 'Organizador Giratorio 360° Multifunción Acrílico Premium',
    categoryId: 'belleza',
    price: 42.0,
    oldPrice: 60.0,
    cost: 19,
    image: '/products/organizador-giratorio-360.jpg',
    variants: ['Transparente', 'Dorado'],
    badge: null,
    rating: 4.8,
    reviews: 143,
    description:
      'Ordena todos tus cosméticos, perfumes y cuidado personal en un organizador giratorio de 360° con acabado acrílico premium. Estantes ajustables y capacidad extra grande.',
    features: [
      'Giro 360° silencioso, suave y estable',
      'Estantes ajustables en altura según tu colección',
      'Acrílico premium cristalino anti-amarillamiento',
      'Capacidad XL · hasta 60 productos organizados',
    ],
  },
  {
    id: 'cepillo-secador-alisador-3en1',
    name: 'Cepillo Secador Alisador Voluminizador 3 en 1 Salón',
    categoryId: 'belleza',
    price: 68.0,
    oldPrice: 99.0,
    cost: 30,
    image: '/products/cepillo-secador-alisador-3en1.jpg',
    variants: ['Negro/Naranja'],
    badge: 'Más Vendido',
    rating: 4.7,
    reviews: 198,
    description:
      'Seca, alisa y voluminiza en un solo paso como en el salón. Su tecnología de aire caliente con iones negativos reduce el frizz y deja tu cabello suave, sedoso y brillante.',
    features: [
      '3 funciones en 1: seca, alisa y voluminiza',
      'Tecnología iónica anti-frizz profesional',
      '3 temperaturas y 2 velocidades de aire',
      'Cerdas antideslizantes que protegen tu cabello',
    ],
  },
  {
    id: 'masajeador-facial-lifting-led',
    name: 'Masajeador Facial y Cuello Lifting LED Anti-Edad',
    categoryId: 'belleza',
    price: 58.0,
    oldPrice: 85.0,
    cost: 26,
    image: '/products/masajeador-facial-lifting-led.jpg',
    variants: ['Blanco Perla', 'Rosa'],
    badge: 'Nuevo',
    rating: 4.7,
    reviews: 87,
    description:
      'Lifting facial desde casa. Este masajeador combina terapia LED, microcorrientes y vibración para reafirmar la piel, reducir líneas de expresión y potenciar la absorción de tus cremas.',
    features: [
      'Terapia LED + microcorrientes EMS lifting',
      'Modo reafirmante para rostro y cuello',
      'Mejora la absorción de cremas y sueros',
      'Recargable · uso inalámbrico y portátil',
    ],
  },
  {
    id: 'mochila-antirrobo-usb',
    name: 'Mochila Antirrobo Impermeable con Puerto de Carga USB',
    categoryId: 'moda',
    price: 79.0,
    oldPrice: 115.0,
    cost: 35,
    image: '/products/mochila-antirrobo-usb.jpg',
    variants: ['Gris Oxford', 'Negro'],
    badge: null,
    rating: 4.8,
    reviews: 221,
    description:
      'Diseño ejecutivo antirrobo con cierres ocultos, material impermeable y puerto USB externo para cargar tu celular en movimiento. Compartimento acolchado para laptop de hasta 15.6 pulgadas.',
    features: [
      'Diseño antirrobo con cierres ocultos estratégicos',
      'Material impermeable de alta resistencia',
      'Puerto USB externo para cargar en movimiento',
      'Compartimento acolchado para laptop de 15.6"',
    ],
  },
  {
    id: 'lentes-sol-polarizados-uv400',
    name: 'Lentes de Sol Polarizados UV400 Estilo Ejecutivo',
    categoryId: 'moda',
    price: 49.0,
    oldPrice: 75.0,
    cost: 22,
    image: '/products/lentes-sol-polarizados-uv400.jpg',
    variants: ['Negro Clásico', 'Carey'],
    badge: null,
    rating: 4.7,
    reviews: 132,
    description:
      'Protección UV400 total con lentes polarizados que eliminan el deslumbramiento. Montura ligera de estilo ejecutivo que eleva cualquier outfit, del trabajo al weekend.',
    features: [
      'Lentes polarizados con tratamiento anti-reflejo',
      'Protección UV400 certificada total',
      'Montura ligera, flexible y resistente',
      'Estuche rígido + paño de microfibra incluidos',
    ],
  },
];

/* =====================================================================
 * Helpers — Precios, envíos y armado del pedido de WhatsApp
 * ===================================================================== */

export function formatPEN(value) {
  return `S/ ${Number(value).toFixed(2)}`;
}

export function discountPercent(product) {
  if (!product.oldPrice || product.oldPrice <= product.price) return 0;
  return Math.round((1 - product.price / product.oldPrice) * 100);
}

export function getShippingCost(zoneId, subtotal) {
  const zone = storeConfig.shipping.zones[zoneId];
  if (!zone) return 0;
  return subtotal >= storeConfig.shipping.freeFrom ? 0 : zone.price;
}

export function getRemainingForFreeShipping(subtotal) {
  return Math.max(0, storeConfig.shipping.freeFrom - subtotal);
}

/**
 * Construye el mensaje de pedido formateado para WhatsApp (DRAXEL).
 * Incluye logística ISI FAST y aviso de confirmación previa (política COD).
 */
export function buildOrderMessage({ items, subtotal, shippingCost, zoneId, customer }) {
  const zone = storeConfig.shipping.zones[zoneId] || storeConfig.shipping.zones.trujillo;
  const total = subtotal + shippingCost;
  const lines = [
    '*🛒 NUEVO PEDIDO — DRAXEL*',
    '━━━━━━━━━━━━━━━━━━',
    '*📦 Productos:*',
    ...items.map(
      (item, i) =>
        `${i + 1}️⃣ *${item.name}*\n    • Variante: ${item.variant}\n    • Cantidad: ${item.qty} x ${formatPEN(item.price)} = ${formatPEN(item.price * item.qty)}`
    ),
    '━━━━━━━━━━━━━━━━━━',
    `*💰 Subtotal:* ${formatPEN(subtotal)}`,
    `*🚚 Envío (${zone.shortLabel}):* ${shippingCost === 0 ? '🎁 GRATIS' : formatPEN(shippingCost)}`,
    `*🧾 TOTAL A PAGAR: ${formatPEN(total)}*`,
    '━━━━━━━━━━━━━━━━━━',
    '*👤 Datos del cliente:*',
    `• Nombre: ${customer.name}`,
    `• Celular: ${customer.phone}`,
    `• Dirección: ${customer.address}`,
  ];
  if (zoneId === 'nacional') {
    lines.push(`• Ciudad / Departamento: ${customer.city}`);
    lines.push(`• Agencia / Courier: ${customer.agency}`);
  }
  lines.push(`• Método de pago: ${customer.payment}`);
  lines.push('━━━━━━━━━━━━━━━━━━');
  lines.push('*🚚 Logística:* Entrega vía ISI FAST / Shalom / Olva · Contra-entrega disponible');
  lines.push('⚠️ Pedido sujeto a confirmación por WhatsApp antes del despacho.');
  lines.push('¡Gracias por tu compra! 🚀');
  lines.push('*DRAXEL* — Novedades que llegan antes que nadie.');
  return lines.join('\n');
}

/* =====================================================================
 * Rentabilidad — Modelo DROP/COD (Lady Import + ISI FAST)
 * =====================================================================
 * Ganancia = Precio venta + Envío cobrado − Costo proveedor − Costo delivery
 * El costo por producto es editable en cada producto (campo `cost`).
 */

export function getProductEconomics(product, { shippingCharge = 0, shippingCost = 0 } = {}) {
  const gross = product.price - product.cost;
  const net = product.price + shippingCharge - product.cost - shippingCost;
  return {
    price: product.price,
    cost: product.cost,
    gross,
    net,
    marginPercent: Math.round((gross / product.price) * 100),
    netMarginPercent: Math.round((net / product.price) * 100),
  };
}

/** Escenario peor caso: envío gratis (absorbido) + punto lejano ISI FAST (S/ 18). */
export function getWorstCaseProfit(product) {
  return getProductEconomics(product, {
    shippingCharge: 0,
    shippingCost: storeConfig.shipping.zones.nacional.price + (storeConfig.shipping.zones.nacional.remoteSupplement || 0),
  }).net;
}

export function getCatalogProfitSummary() {
  const rows = products.map((p) => {
    const eco = getProductEconomics(p);
    return { product: p, ...eco, worstCase: getWorstCaseProfit(p) };
  });
  const avgMargin = Math.round(rows.reduce((s, r) => s + r.marginPercent, 0) / rows.length);
  const avgGross = rows.reduce((s, r) => s + r.gross, 0) / rows.length;
  const minWorst = Math.min(...rows.map((r) => r.worstCase));
  return { rows, avgMargin, avgGross, minWorst };
}

export function buildWhatsAppLink(message) {
  return `https://wa.me/${storeConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
