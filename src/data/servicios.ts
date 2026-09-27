// Catálogo de servicios. Los precios no se publican: se consultan por WhatsApp.

export type Servicio = { nombre: string; detalle: string };
export type Categoria = { id: string; nombre: string; resumen: string; servicios: Servicio[] };

export const pendienteServicios =
  'Borrador armado con el pedido original. Carla tiene que confirmar qué servicios hace, cómo los llama y las descripciones.';

export const categorias: Categoria[] = [
  {
    id: 'corte',
    nombre: 'Corte y peinado',
    resumen: 'Cortes para mujer y hombre, y peinados para el día a día o para un evento.',
    servicios: [
      { nombre: 'Corte de dama', detalle: 'Pensado según tu tipo de pelo, la forma de tu cara y el tiempo que le dedicás a peinarte.' },
      { nombre: 'Corte de caballero', detalle: 'Clásico o actual, con terminación prolija en nuca y patillas.' },
      { nombre: 'Brushing', detalle: 'Secado con cepillo para un liso con movimiento o más volumen en las puntas.' },
      { nombre: 'Modelado', detalle: 'Ondas o rulos definidos con plancha, buclera o difusor.' },
      { nombre: 'Peinados para eventos', detalle: 'Recogidos, semirrecogidos y ondas para casamientos, cumpleaños y egresos. Conviene reservar con tiempo.' },
    ],
  },
  {
    id: 'color',
    nombre: 'Color',
    resumen: 'Desde cubrir canas hasta aclarados a mano alzada, siempre cuidando la fibra.',
    servicios: [
      { nombre: 'Balayage', detalle: 'Aclarado pintado a mano, con transición suave desde la raíz. Crece sin marcar línea.' },
      { nombre: 'Babylights', detalle: 'Mechas muy finas que imitan el aclarado natural del sol.' },
      { nombre: 'Iluminación', detalle: 'Reflejos sutiles que suman luz sin cambiar tu color de base.' },
      { nombre: 'Tintura y cobertura de canas', detalle: 'Color parejo de raíz a puntas, con cobertura completa de canas.' },
      { nombre: 'Decoloración y matiz', detalle: 'Para rubios claros. Se hace por etapas si el pelo lo pide, y se termina con matiz para neutralizar tonos amarillos o naranjas.' },
    ],
  },
  {
    id: 'tratamientos',
    nombre: 'Tratamientos',
    resumen: 'Para recuperar pelo seco, con frizz o castigado por el color y la plancha.',
    servicios: [
      { nombre: 'Nutrición profunda', detalle: 'Devuelve suavidad y brillo al pelo reseco por el sol, el color o el calor.' },
      { nombre: 'Cauterizado', detalle: 'Sella la cutícula y reduce el frizz y las puntas abiertas.' },
      { nombre: 'Alisado y botox capilar', detalle: 'Bajan el volumen y el frizz. En el diagnóstico vemos cuál le conviene a tu pelo.' },
      { nombre: 'Reconstrucción de la fibra', detalle: 'Para pelo quebradizo después de decoloraciones o alisados. Le devuelve resistencia y elasticidad.' },
    ],
  },
  {
    id: 'asesoramiento',
    nombre: 'Asesoramiento',
    resumen: 'Antes de un cambio grande, conviene saber cómo está tu pelo.',
    servicios: [
      { nombre: 'Diagnóstico capilar', detalle: 'Vemos el estado del pelo y el cuero cabelludo, y armamos un plan de color o de tratamiento que tu pelo pueda sostener.' },
    ],
  },
];
