// Fuente única de los datos del negocio. Ningún componente escribe a mano
// teléfono, dirección, horarios ni enlaces: todo sale de acá.
//
// Convención de pendientes: cualquier dato que falte confirmar o redactar la
// clienta lleva un campo `pendiente` con la explicación. `npm run pendientes`
// los lista todos, y en `npm run dev` se marcan en pantalla.

export const sitio = {
  nombre: 'Con Estilo',
  bajada: 'Peluquería Unisex',
  profesional: 'Carla',

  telefono: {
    visible: '0351 387-4033',
    enlace: 'tel:+543513874033',
    internacional: '+54 351 387-4033',
  },

  whatsapp: {
    // Formato de celular argentino en WhatsApp: 54 + 9 + característica + número.
    numero: '5493513874033',
    mensaje: 'Hola Carla, quería pedir un turno.',
    pendiente:
      'Probar que wa.me/5493513874033 abre el chat de la peluquería. Si el número es un fijo con WhatsApp Business, el formato correcto es 543513874033.',
  },

  direccion: {
    calle: 'El Tirol 625',
    barrio: 'Parque Horizonte',
    ciudad: 'Córdoba',
    provincia: 'Córdoba',
    codigoPostal: 'X5016CWM',
    pais: 'AR',
  },

  geo: { lat: -31.4557631, lng: -64.207936 },

  google: {
    // Ficha de Google Business (enlace por CID, estable aunque cambie el nombre).
    ficha: 'https://www.google.com/maps?cid=1072988053326808638',
    comoLlegar: 'https://www.google.com/maps/dir/?api=1&destination=Con+Estilo%2C+El+Tirol+625%2C+C%C3%B3rdoba',
    mapaEmbebido:
      'https://maps.google.com/maps?q=Con%20Estilo%2C%20El%20Tirol%20625%2C%20C%C3%B3rdoba&z=16&hl=es&output=embed',
    // Puntaje copiado de la ficha. No se actualiza solo: revisarlo de vez en cuando.
    puntaje: 4.7,
    opiniones: 29,
    relevado: '2026-09-27',
  },

  // Días: 0 domingo … 6 sábado. Horario confirmado por la clienta (el de Google).
  horarios: [
    { dia: 2, abre: '10:00', cierra: '18:00' },
    { dia: 3, abre: '10:00', cierra: '18:00' },
    { dia: 4, abre: '10:00', cierra: '18:00' },
    { dia: 5, abre: '10:00', cierra: '18:00' },
    { dia: 6, abre: '09:00', cierra: '17:00' },
  ],
} as const;

export const zonaHoraria = 'America/Argentina/Cordoba';

export const direccionCompleta = `${sitio.direccion.calle}, ${sitio.direccion.barrio}, ${sitio.direccion.ciudad}`;

export function enlaceWhatsApp(mensaje: string = sitio.whatsapp.mensaje) {
  return `https://wa.me/${sitio.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}

export function consultaServicio(servicio: string) {
  return enlaceWhatsApp(`Hola Carla, quería consultar por ${servicio.toLowerCase()}.`);
}

const nombresDias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/** "10:00" -> "10", "09:30" -> "9:30" */
export function hora(h: string) {
  const [hh, mm] = h.split(':');
  return mm === '00' ? String(Number(hh)) : `${Number(hh)}:${mm}`;
}

/** Filas agrupadas para mostrar: días consecutivos con el mismo horario van juntos. */
export function horarioAgrupado() {
  const porDia = new Map<number, string>(sitio.horarios.map((h) => [h.dia, `${hora(h.abre)} a ${hora(h.cierra)} h`]));
  const orden = [1, 2, 3, 4, 5, 6, 0];
  const grupos: { desde: number; hasta: number; texto: string }[] = [];
  for (const d of orden) {
    const texto = porDia.get(d) ?? 'Cerrado';
    const ultimo = grupos.at(-1);
    if (ultimo && ultimo.texto === texto) ultimo.hasta = d;
    else grupos.push({ desde: d, hasta: d, texto });
  }
  const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
  return grupos
    .filter((g) => g.texto !== 'Cerrado')
    .map((g) => ({
      dias: g.desde === g.hasta ? cap(nombresDias[g.desde]) : `${cap(nombresDias[g.desde])} a ${nombresDias[g.hasta]}`,
      horas: g.texto,
    }));
}

/** Tabla completa de lunes a domingo, para la sección Visitanos. */
export function horarioSemanal() {
  const orden = [1, 2, 3, 4, 5, 6, 0];
  return orden.map((d) => {
    const h = sitio.horarios.find((x) => x.dia === d);
    return {
      dia: d,
      nombre: nombresDias[d][0].toUpperCase() + nombresDias[d].slice(1),
      horas: h ? `${hora(h.abre)} a ${hora(h.cierra)} h` : 'Cerrado',
    };
  });
}
