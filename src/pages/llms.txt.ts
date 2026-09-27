import type { APIRoute } from 'astro';
import { sitio, direccionCompleta, horarioAgrupado } from '../data/sitio';
import { categorias } from '../data/servicios';
import { preguntas } from '../data/contenido';

// Resumen en texto plano para asistentes de IA (ChatGPT, Perplexity, Gemini).
// Se genera desde los mismos datos que el sitio, así nunca queda desactualizado.
export const GET: APIRoute = ({ site }) => {
  const url = site ? new URL('/', site).href : '/';
  const lineas = [
    `# ${sitio.nombre} · ${sitio.bajada}`,
    '',
    `> Peluquería unisex en ${direccionCompleta}, Argentina. Atiende ${sitio.profesional}, con turno por WhatsApp. Corte, color (balayage, babylights, cobertura de canas), tratamientos capilares y peinados para eventos.`,
    '',
    '## Datos',
    `- Dirección: ${direccionCompleta} (${sitio.direccion.codigoPostal})`,
    `- Teléfono y WhatsApp: ${sitio.telefono.visible}`,
    `- Turnos: por WhatsApp, https://wa.me/${sitio.whatsapp.numero}`,
    `- Horario: ${horarioAgrupado().map((h) => `${h.dias}, ${h.horas}`).join('; ')}. Domingo y lunes, cerrado.`,
    '- Precios: se consultan por WhatsApp.',
    `- Google: ${sitio.google.puntaje} de 5 (${sitio.google.opiniones} opiniones), ${sitio.google.ficha}`,
    `- Sitio: ${url}`,
    '',
    '## Servicios',
    ...categorias.flatMap((c) => [`### ${c.nombre}`, ...c.servicios.map((s) => `- ${s.nombre}: ${s.detalle}`), '']),
    '## Preguntas frecuentes',
    ...preguntas.flatMap((p) => [`### ${p.pregunta}`, p.respuesta, '']),
  ];
  return new Response(lineas.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
