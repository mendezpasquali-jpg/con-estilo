// Datos estructurados (schema.org) generados desde src/data. No se marca
// AggregateRating ni Review: Google no admite reseñas propias de un negocio
// local en su propio sitio y puede penalizarlo.
import { sitio } from '../data/sitio';
import { categorias } from '../data/servicios';
import { preguntas } from '../data/contenido';

const dias = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function schemaNegocio(base: URL) {
  const id = new URL('/#peluqueria', base).href;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HairSalon',
        '@id': id,
        name: sitio.nombre,
        alternateName: `${sitio.nombre} ${sitio.bajada}`,
        description:
          'Peluquería unisex en Parque Horizonte, Córdoba. Corte, color, balayage, tratamientos capilares y peinados para eventos. Turnos por WhatsApp.',
        url: new URL('/', base).href,
        logo: new URL('/logo.png', base).href,
        image: new URL('/og.png', base).href,
        telephone: sitio.telefono.internacional,
        address: {
          '@type': 'PostalAddress',
          streetAddress: sitio.direccion.calle,
          addressLocality: sitio.direccion.ciudad,
          addressRegion: sitio.direccion.provincia,
          postalCode: sitio.direccion.codigoPostal,
          addressCountry: sitio.direccion.pais,
        },
        geo: { '@type': 'GeoCoordinates', latitude: sitio.geo.lat, longitude: sitio.geo.lng },
        hasMap: sitio.google.ficha,
        areaServed: [
          { '@type': 'Place', name: `${sitio.direccion.barrio}, ${sitio.direccion.ciudad}` },
          { '@type': 'City', name: sitio.direccion.ciudad },
        ],
        openingHoursSpecification: sitio.horarios.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${dias[h.dia]}`,
          opens: h.abre,
          closes: h.cierra,
        })),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'reservations',
          telephone: sitio.telefono.internacional,
          url: `https://wa.me/${sitio.whatsapp.numero}`,
          availableLanguage: 'es',
        },
        sameAs: [sitio.google.ficha],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de peluquería',
          itemListElement: categorias.map((c) => ({
            '@type': 'OfferCatalog',
            name: c.nombre,
            itemListElement: c.servicios.map((s) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: s.nombre, description: s.detalle },
            })),
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': new URL('/#sitio', base).href,
        url: new URL('/', base).href,
        name: sitio.nombre,
        inLanguage: 'es-AR',
        publisher: { '@id': id },
      },
      {
        '@type': 'FAQPage',
        '@id': new URL('/#preguntas', base).href,
        mainEntity: preguntas.map((p) => ({
          '@type': 'Question',
          name: p.pregunta,
          acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
        })),
      },
    ],
  };
}
