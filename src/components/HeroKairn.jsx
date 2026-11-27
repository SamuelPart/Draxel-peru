import React, { useEffect, useState } from 'react';
import '../styles/hero-kairn.css';

/**
 * =====================================================================
 * HeroKairn — KAIRN · Alpine 26
 * =====================================================================
 * Hero de una pantalla según spec: foto 16:10 + video loop 5s con las
 * mismas reglas de cover, sombra lateral navy para legibilidad, canvas
 * medido 1546×1017 escalado por --k = min(vw/1546, vh/1017),
 * entrada única de ~2.2s, hover del botón a #6FE3FF y
 * prefers-reduced-motion (sin entrada y sin video).
 * =====================================================================
 */

function IconAccount() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 19.5c1.7-3.2 4.1-4.8 7-4.8s5.3 1.6 7 4.8" strokeLinecap="round" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.9 3H21l-6.8 7.8L22.2 21h-6.3l-4.9-6.4L5.4 21H2.3l7.3-8.3L1.9 3h6.4l4.4 5.9L17.9 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.3 14.5z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.2-.1-2.3-.1-2.4 0-4 1.5-4 4.2v1.8H8v3h2.7V21h3.2v-9.5h2.6l.4-3H14z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function HeroKairn() {
  const [k, setK] = useState(1);
  const [videoReady, setVideoReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Canvas medido 1546×1017 escalado por --k = min(vw/1546, vh/1017) */
  useEffect(() => {
    const update = () =>
      setK(Math.min(window.innerWidth / 1546, window.innerHeight / 1017));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section id="inicio" className="kn-hero" aria-label="KAIRN Alpine 26">
      {/* ============ Escena: plate + video loop + shade ============ */}
      <div className="kn-scene">
        <img className="kn-media kn-plate" src="/kairn/plate.jpg" alt="" aria-hidden="true" />
        <video
          className={`kn-media kn-video${videoReady ? ' is-ready' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          aria-hidden="true"
        >
          <source src="/kairn/kairn-loop.mp4" type="video/mp4" />
        </video>
        <div className="kn-shade" />
      </div>

      {/* ============ Canvas de UI (1546×1017 · --k) ============ */}
      <div className="kn-canvas" style={{ '--k': k }}>
        {/* --- Top --- */}
        <header className="kn-top">
          <div className="kn-logo">
            <span>KA</span>IRN
          </div>
          <nav className="kn-nav" aria-label="Principal">
            <a href="#productos">COLLECTION</a>
            <span className="kn-slash">/</span>
            <a href="#destacado">OUR WORLD</a>
          </nav>
          <div className="kn-topright">
            <span className="kn-account" aria-label="Cuenta">
              <IconAccount />
            </span>
            <span className="kn-bag">BAG</span>
            <span className="kn-count">0</span>
            <button
              type="button"
              className="kn-burger"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <i />
              <i />
            </button>
          </div>
        </header>

        {menuOpen && (
          <nav className="kn-menu" aria-label="Menú móvil">
            <a href="#productos" onClick={() => setMenuOpen(false)}>COLLECTION</a>
            <a href="#destacado" onClick={() => setMenuOpen(false)}>OUR WORLD</a>
          </nav>
        )}

        {/* --- Medio izquierda: dots · eyebrow · titular --- */}
        <div className="kn-left">
          <div className="kn-dots" aria-hidden="true">
            <i className="on" />
            <i />
            <i />
          </div>
          <p className="kn-eyebrow">BUILT FOR THE WHITEST DAYS</p>
          <h1 className="kn-head">
            <span className="kn-line">
              <span>FORM.</span>
            </span>
            <span className="kn-line">
              <span>FUNCTION.</span>
            </span>
            <span className="kn-line kn-outline">
              <span>VISION</span>
            </span>
          </h1>
        </div>

        {/* --- Medio derecha: clúster 2×2 --- */}
        <div className="kn-cluster">
          {/* Lens card */}
          <div className="kn-tile kn-lens">
            <span className="kn-tile-tag">01 / LENS EDITION</span>
            <strong className="kn-tile-title">
              BLUE
              <br />
              FROST
            </strong>
            <span className="kn-tile-sub">A cooler perspective</span>
          </div>

          {/* ALPINE 26 */}
          <div className="kn-tile kn-alpine" aria-hidden="true">
            <span>ALPINE</span>
            <span>26</span>
          </div>

          {/* Glass circle con progress ring */}
          <div className="kn-tile kn-glass">
            <svg className="kn-ring" viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <circle cx="100" cy="100" r="92" stroke="rgba(255,255,255,0.28)" strokeWidth="3" />
              <circle
                cx="100"
                cy="100"
                r="92"
                stroke="#44DAFD"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="162 415"
                transform="rotate(-90 100 100)"
              />
            </svg>
            <span className="kn-arrow" aria-hidden="true">↗</span>
            <span className="kn-progress">01 / 04</span>
          </div>

          {/* Product card */}
          <div className="kn-tile kn-product">
            <img src="/kairn/goggles.webp" alt="Gafas KAIRN Model 03 con lente espejado azul hielo" />
            <div className="kn-product-meta">
              <div className="kn-product-title">MODEL 03</div>
              <a className="kn-product-cta" href="#productos">EXPLORE THE FRAME</a>
            </div>
          </div>
        </div>

        {/* --- Story card --- */}
        <aside className="kn-story">
          <img src="/kairn/skier.webp" alt="" aria-hidden="true" />
          <div>
            <p className="kn-story-tag">GLACIER COLLECTION</p>
            <p className="kn-story-body">
              Crafted for the summits.
              <br />
              KAIRN goggles sharpen every
              <br />
              view. <a href="#productos">Read more</a>
            </p>
          </div>
        </aside>

        {/* --- Regla + CTA + social --- */}
        <div className="kn-rule" aria-hidden="true" />
        <a className="kn-cta" href="#productos">EXPLORE COLLECTION</a>
        <div className="kn-social">
          <span className="kn-follow">FOLLOW US</span>
          <a className="kn-ico on" href="#inicio" aria-label="X">
            <IconX />
          </a>
          <a className="kn-ico" href="#inicio" aria-label="Facebook">
            <IconFacebook />
          </a>
          <a className="kn-ico" href="#inicio" aria-label="Instagram">
            <IconInstagram />
          </a>
        </div>
      </div>
    </section>
  );
}
