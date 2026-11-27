import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración Vite para DRAXEL — lista para Vercel y previews locales.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
});
