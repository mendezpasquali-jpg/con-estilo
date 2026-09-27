// Textos de las secciones. Lo que es borrador lleva `pendiente`.
import { sitio, horarioAgrupado, direccionCompleta } from './sitio';

export const portada = {
  // El H1 lleva la búsqueda local; la frase grande es la propuesta.
  h1: `Peluquería unisex en ${sitio.direccion.barrio}, ${sitio.direccion.ciudad}`,
  frase: ['Lo que te queda bien,', 'con el pelo sano.'],
  bajada:
    'Te atiende Carla, con turno, de martes a sábado. Antes de cortar o teñir mira cómo está tu pelo y te dice con franqueza qué le conviene.',
  pendiente: 'Confirmar con Carla la frase principal y la bajada.',
};

export const proceso = {
  pendiente: 'Borrador. Confirmar con Carla que así trabaja, sobre todo lo de pedir foto antes del turno.',
  pasos: [
    { titulo: 'Escribís por WhatsApp', texto: 'Contás qué te querés hacer. Si es color o un tratamiento, sumá una foto de tu pelo con luz natural.' },
    { titulo: 'Diagnóstico', texto: 'En el sillón, Carla mira el estado del pelo y te dice qué conviene y qué no, antes de empezar.' },
    { titulo: 'El servicio', texto: 'Se trabaja con el tiempo que lleva hacerlo bien, sin apurar procesos de color.' },
    { titulo: 'Cuidado en casa', texto: 'Te llevás indicaciones concretas para que el resultado dure hasta el próximo turno.' },
  ],
};

export const sobreCarla = {
  titulo: 'Te atiende Carla',
  // Lo único que se afirma sale de las reseñas públicas de Google.
  destacado:
    'Quienes van hace años repiten lo mismo en sus reseñas: la atención, y que Carla te dice lo que te va a quedar bien y cómo está tu pelo.',
  bio: [
    'Trayectoria de Carla: cuántos años lleva en el oficio y cómo empezó.',
    'Formación: cursos, especializaciones en color o tratamientos, marcas con las que se capacitó.',
    'Forma de trabajar: qué cuida en cada servicio y qué productos usa.',
  ],
  pendiente: 'Bio de Carla: la redacta ella. Los tres párrafos de abajo son solo la guía de qué contar.',
};

export const preguntas = [
  {
    pregunta: '¿Cómo pido turno?',
    respuesta: `Por WhatsApp al ${sitio.telefono.visible}. Contá qué servicio buscás y qué días te quedan cómodos.`,
  },
  {
    pregunta: '¿Cuánto sale cada servicio?',
    respuesta:
      'Los precios se consultan por WhatsApp, porque dependen del largo, la cantidad de pelo y el servicio. En color y tratamientos ayuda mandar una foto.',
  },
  {
    pregunta: '¿Atienden hombres?',
    respuesta: 'Sí. Con Estilo es una peluquería unisex: atiende a mujeres, que son la mayoría de las clientas, y también a hombres.',
  },
  {
    pregunta: '¿Qué días y horarios atienden?',
    respuesta: `${horarioAgrupado()
      .map((h) => `${h.dias}, de ${h.horas}`)
      .join('. ')}. Domingos y lunes, cerrado.`,
  },
  {
    pregunta: '¿Dónde queda?',
    respuesta: `En ${direccionCompleta}.`,
  },
];
