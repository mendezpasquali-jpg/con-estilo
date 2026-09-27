// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dirección pública del sitio. Alimenta las URL canónicas, el sitemap, el
// og:image y decide si el sitio se deja indexar: mientras sea una URL de
// prueba (*.pages.dev) se emite noindex, para que no compita con el dominio
// definitivo. PENDIENTE: reemplazar por el dominio real cuando exista.
const SITIO_URL = 'https://con-estilo.pages.dev';

export default defineConfig({
  site: SITIO_URL,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  server: { port: Number(process.env.PORT) || 4321 },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
  },
});
