// Lista todo lo que falta confirmar o redactar la clienta.
// Uso: npm run pendientes
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../', import.meta.url));
const src = join(raiz, 'src');

async function* archivos(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* archivos(p);
    else if (/\.(ts|astro|mjs)$/.test(e.name)) yield p;
  }
}

const patrones = [
  /pendiente\w*\s*[:=]\s*\n?\s*['"`]([^'"`]+)['"`]/g, // pendiente: '...'  /  pendienteX = '...'
  /<Pendiente[^>]*nota="([^"]+)"/g, // <Pendiente nota="...">
  /falta="([^"]+)"/g, // <Foto falta="...">
  /PENDIENTE:\s*(.+)/g, // comentarios
];

const hallados = [];
for await (const f of archivos(src)) {
  const texto = await readFile(f, 'utf8');
  for (const re of patrones) {
    for (const m of texto.matchAll(re)) {
      const linea = texto.slice(0, m.index).split('\n').length;
      hallados.push({ donde: `${relative(raiz, f).replaceAll('\\', '/')}:${linea}`, que: m[1].trim() });
    }
  }
}
const config = await readFile(join(raiz, 'astro.config.mjs'), 'utf8');
for (const m of config.matchAll(/PENDIENTE:\s*(.+)/g)) hallados.push({ donde: 'astro.config.mjs', que: m[1].trim() });

console.log(`\n${hallados.length} pendientes\n`);
for (const h of hallados) console.log(`· ${h.que}\n  ${h.donde}\n`);
