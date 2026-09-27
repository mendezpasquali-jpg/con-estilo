# Con Estilo · guardarraíles

Proyecto personal (no es de Agencia Veredicto). Repo privado `mendezpasquali-jpg/con-estilo`: los commits y el push usan
la cuenta personal, ya configurada en `.git/config` del repo. Nunca usar la cuenta ni la carpeta de la agencia.

Leer primero [BRIEF.md](BRIEF.md) (datos confirmados y pendientes) y [marca/README.md](marca/README.md).

## Datos y contenido
- Todo dato del negocio sale de `src/data/`. Nunca escribir teléfono, dirección, horarios o enlaces a mano en un componente.
- **No inventar** datos, cifras, trayectoria ni reseñas. Lo que no confirmó la clienta lleva `pendiente` o `<Pendiente>`.
- Las reseñas se citan textuales, con su ortografía original.
- No marcar AggregateRating ni Review en el JSON-LD (reseñas propias de un negocio local: Google no las admite).

## Marca
- Solo los 7 colores y las 2 familias de `src/styles/global.css` (`@theme` resetea el resto). Nada de colores nuevos.
- Radio de borde cero. Filetes de 1 px en vez de sombras. Sin degradés ni brillos.
- Texto visible: sin rayas largas (em-dash), sin emojis, sin frases infladas, sin itálicas decorativas en títulos. Voseo.
- El logo se cambia en `marca/generador/build_logo.py`, nunca a mano en los SVG. Después: `npm run imagenes`.

## CSS
- Los `<style>` de componente no van en capa y **le ganan a las utilidades de Tailwind**. Si un componente fija
  `display` en su CSS, el `lg:hidden` de Tailwind no aplica: resolverlo en el CSS del componente.
- Los estilos de componente no alcanzan a elementos creados por JS ni a hijos de otro componente: usar `:global()`.
- Cada `:hover` escrito a mano va dentro de `@media (hover: hover) and (pointer: fine)`, con su `:active` para táctil.

## Movimiento
- Las apariciones por scroll (`data-aparece`) mueven solo `transform`. Nunca arrancar desde `opacity: 0`.
- Curvas y duraciones desde los tokens (`--ease-out`, `--dur-*`). Todo respeta `prefers-reduced-motion`.

## Verificar antes de dar algo por terminado
- `npm run build` sin errores y `grep -ci pendiente dist/index.html` en 0.
- Revisar a 1440 px y a 390 px (sin scroll horizontal).
