# Con Estilo · sitio web

Sitio de **Con Estilo, peluquería unisex** (El Tirol 625, Parque Horizonte, Córdoba). Astro 7 + Tailwind 4, estático, sin frameworks de JavaScript en el cliente (2,5 KB de JS en total).

- Brief, datos confirmados y pendientes de la clienta: [BRIEF.md](BRIEF.md)
- Identidad visual (logo, paleta, tipografías): [marca/](marca/README.md)

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias (Node 22.12 o superior) |
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321`. Muestra los pendientes recuadrados |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run preview` | Sirve `dist/` para revisar el build real |
| `npm run pendientes` | Lista todo lo que falta confirmar o redactar la clienta |
| `npm run imagenes` | Regenera favicons, íconos, `logo.png` y `og.png` desde `marca/logo/` |

## Estructura

```
src/
  data/          Fuente única de contenido y datos del negocio
    sitio.ts       Teléfono, WhatsApp, dirección, horarios, Google
    servicios.ts   Catálogo de servicios
    contenido.ts   Textos de portada, proceso, Carla y preguntas frecuentes
    resenas.ts     Reseñas citadas de Google
    galeria.ts     Trabajos y antes/después
  components/    Una sección por archivo (Hero, Servicios, SobreCarla, …)
  layouts/       Base.astro: SEO, Open Graph, JSON-LD, header y footer
  lib/schema.ts  Datos estructurados schema.org (HairSalon, WebSite, FAQPage)
  pages/         index, privacidad, 404, robots.txt y llms.txt (generados)
  styles/        global.css: tokens de marca y componentes base
public/          Fuentes (subset latino), íconos, og.png, _headers
marca/           Logo en SVG, hoja de identidad y generador del logo
scripts/         Generador de imágenes y listado de pendientes
```

## Pendientes y contenido

Todo lo que depende de la clienta está marcado en el código:

- En `src/data/*` con un campo `pendiente: '…'`.
- En los componentes con `<Pendiente nota="…">`, que en `npm run dev` recuadra el bloque y muestra la nota al pasar el mouse. El botón "Ver pendientes" las muestra todas. En el build de producción no queda ningún rastro.
- Las fotos que faltan se muestran como un bloque con la corona. En desarrollo dicen qué foto hace falta.

## Cargar fotos

1. Guardarlas en `src/assets/` (por ejemplo `src/assets/trabajos/balayage.jpg`), de al menos 1600 px del lado largo.
2. Importarlas en el dato correspondiente. Por ejemplo, en `src/data/galeria.ts`:
   ```ts
   import balayage from '../assets/trabajos/balayage.jpg';
   // …
   { titulo: 'Balayage en castaño', filtro: 'color', formato: 'vertical', imagen: balayage, alt: 'Balayage castaño con puntas claras, de espalda' },
   ```
   Para el hero y el retrato de Carla se pasa `imagen={…}` al componente `<Foto>` en `Hero.astro` y `SobreCarla.astro`.
3. Astro genera AVIF y WebP en varios tamaños. Borrar el `pendiente` del ítem cuando la foto esté cargada.

## Publicar

Publicado en **Cloudflare Pages** (proyecto `con-estilo`, cuenta personal): cada push a `main` compila y publica solo en https://con-estilo.pages.dev. Configuración del proyecto: build `npm run build`, salida `dist`; la versión de Node sale de `.node-version`. Las vistas previas de cada publicación (`*.con-estilo.pages.dev`) están protegidas con Cloudflare Access. `public/_headers` trae las cabeceras de seguridad y caché.

Mientras `site` en `astro.config.mjs` apunte a una URL `*.pages.dev`, el sitio sale con `noindex` y `robots.txt` bloquea el rastreo, para no competir con el dominio definitivo. Al tener dominio:

1. Cambiar `SITIO_URL` en `astro.config.mjs`.
2. `npm run build` y publicar.
3. Cargar la URL en la ficha de Google Business ("Agregar sitio web") y en Google Search Console.
