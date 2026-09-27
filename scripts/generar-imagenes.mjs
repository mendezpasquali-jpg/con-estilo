// Genera favicons, íconos del manifest, logo.png y og.png desde marca/logo.
// Uso: npm run imagenes  (volver a correrlo si cambia el logo).
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const TINTA = '#151413';
const PAPEL = '#F5F3EF';
const raiz = new URL('../', import.meta.url);
const pub = (f) => new URL(`public/${f}`, raiz);

const leer = async (f) => readFile(new URL(`marca/logo/${f}`, raiz), 'utf8');
const vb = (svg) => svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
const cuerpo = (svg) => svg.replace(/^.*?<g /s, '<g ').replace(/<\/svg>\s*$/, '');

const isotipo = await leer('isotipo.svg');
const vertical = await leer('logo-vertical.svg');

/** Centra un SVG de logo dentro de un lienzo, ocupando `ancho` px de ancho. */
function componer(svg, lienzoW, lienzoH, ancho, fondo, color, dy = 0) {
  const [, , w, h] = vb(svg);
  const s = ancho / w;
  const x = (lienzoW - w * s) / 2;
  const y = (lienzoH - h * s) / 2 + dy;
  const g = cuerpo(svg).replace(/fill="#[0-9A-Fa-f]{6}"/, `fill="${color}"`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${lienzoW}" height="${lienzoH}" viewBox="0 0 ${lienzoW} ${lienzoH}">
  ${fondo ? `<rect width="100%" height="100%" fill="${fondo}"/>` : ''}
  <g transform="translate(${x} ${y}) scale(${s})">${g}</g></svg>`;
}

const png = (svg, archivo) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(fileURLToPath(archivo));

// favicon.svg: corona tinta sobre papel; en modo oscuro del sistema se invierte.
{
  const [, , w, h] = vb(isotipo);
  const s = 72 / w;
  const x = (100 - w * s) / 2;
  const y = (100 - h * s) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<style>.f{fill:${PAPEL}}.c{fill:${TINTA}}@media (prefers-color-scheme:dark){.f{fill:${TINTA}}.c{fill:${PAPEL}}}</style>
<rect class="f" width="100" height="100"/>
<g class="c" transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${s.toFixed(4)})">${cuerpo(isotipo).replace(/<g fill="[^"]+">/, '<g>')}</g></svg>
`;
  await writeFile(pub('favicon.svg'), svg);
}

// favicon.ico (32 px, PNG dentro de un contenedor ICO)
{
  const buf = await sharp(Buffer.from(componer(isotipo, 32, 32, 26, PAPEL, TINTA))).png().toBuffer();
  const cab = Buffer.alloc(22);
  cab.writeUInt16LE(0, 0);
  cab.writeUInt16LE(1, 2);
  cab.writeUInt16LE(1, 4);
  cab.writeUInt8(32, 6);
  cab.writeUInt8(32, 7);
  cab.writeUInt8(0, 8);
  cab.writeUInt8(0, 9);
  cab.writeUInt16LE(1, 10);
  cab.writeUInt16LE(32, 12);
  cab.writeUInt32LE(buf.length, 14);
  cab.writeUInt32LE(22, 18);
  await writeFile(pub('favicon.ico'), Buffer.concat([cab, buf]));
}

await png(componer(isotipo, 180, 180, 116, TINTA, PAPEL), pub('apple-touch-icon.png'));
await png(componer(isotipo, 192, 192, 120, TINTA, PAPEL), pub('icono-192.png'));
await png(componer(isotipo, 512, 512, 300, TINTA, PAPEL), pub('icono-512.png'));
await png(componer(vertical, 512, 512, 400, PAPEL, TINTA), pub('logo.png'));

// og.png 1200x630: logo vertical en papel sobre tinta, con un filete de marco.
{
  const base = componer(vertical, 1200, 630, 560, TINTA, PAPEL);
  const marco = `<rect x="32" y="32" width="1136" height="566" fill="none" stroke="${PAPEL}" stroke-opacity="0.18" stroke-width="1"/>`;
  await png(base.replace('</svg>', `${marco}</svg>`), pub('og.png'));
}

console.log('Imágenes generadas en public/');
