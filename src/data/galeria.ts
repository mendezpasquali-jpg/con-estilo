// Galería de trabajos. Mientras no haya fotos, cada ítem describe la foto que
// hace falta. Para cargar una foto real: guardarla en src/assets/trabajos/ e
// importarla en `imagen` (Astro genera AVIF y WebP en varios tamaños).
import type { ImageMetadata } from 'astro';

export type Filtro = 'color' | 'corte' | 'tratamientos' | 'peinados';

export type Trabajo = {
  titulo: string;
  filtro: Filtro;
  formato: 'vertical' | 'cuadrado' | 'horizontal';
  imagen?: ImageMetadata;
  alt?: string;
  pendiente: string;
};

export type AntesDespues = {
  titulo: string;
  detalle: string;
  antes?: ImageMetadata;
  despues?: ImageMetadata;
  pendiente: string;
};

export const filtros: { id: Filtro | 'todo'; nombre: string }[] = [
  { id: 'todo', nombre: 'Todo' },
  { id: 'color', nombre: 'Color' },
  { id: 'corte', nombre: 'Corte' },
  { id: 'tratamientos', nombre: 'Tratamientos' },
  { id: 'peinados', nombre: 'Peinados' },
];

export const trabajos: Trabajo[] = [
  { titulo: 'Balayage en castaño', filtro: 'color', formato: 'vertical', pendiente: 'Foto de balayage, de espalda, con luz natural' },
  { titulo: 'Corte bob', filtro: 'corte', formato: 'cuadrado', pendiente: 'Foto de un corte carré o bob, de perfil' },
  { titulo: 'Rubio con matiz', filtro: 'color', formato: 'cuadrado', pendiente: 'Foto de un rubio claro terminado con matiz' },
  { titulo: 'Nutrición', filtro: 'tratamientos', formato: 'vertical', pendiente: 'Foto de pelo largo con brillo después de un tratamiento' },
  { titulo: 'Recogido para evento', filtro: 'peinados', formato: 'vertical', pendiente: 'Foto de un recogido o semirrecogido' },
  { titulo: 'Corte de caballero', filtro: 'corte', formato: 'cuadrado', pendiente: 'Foto de un corte masculino' },
  { titulo: 'Babylights', filtro: 'color', formato: 'horizontal', pendiente: 'Foto de babylights, idealmente con el pelo suelto y en movimiento' },
  { titulo: 'Ondas', filtro: 'peinados', formato: 'cuadrado', pendiente: 'Foto de ondas o modelado' },
];

export const antesDespues: AntesDespues[] = [
  {
    titulo: 'Cobertura de canas',
    detalle: 'Color parejo de raíz a puntas.',
    pendiente: 'Par de fotos antes y después, mismo encuadre y misma luz',
  },
  {
    titulo: 'Reconstrucción',
    detalle: 'Pelo decolorado recuperado en varias sesiones.',
    pendiente: 'Par de fotos antes y después, mismo encuadre y misma luz',
  },
];

export const pendienteGaleria =
  'Fotos de trabajos reales, con permiso de cada clienta para publicarlas. Mínimo 1600 px del lado largo.';
