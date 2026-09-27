import type { APIRoute } from 'astro';

// Mientras el sitio viva en una URL de prueba (*.pages.dev) no se deja rastrear.
export const GET: APIRoute = ({ site }) => {
  const indexable = site && !site.hostname.endsWith('pages.dev');
  const cuerpo = indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
