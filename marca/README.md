# Marca · Con Estilo

Hoja de identidad visual: [identidad.html](identidad.html). Abrila en el navegador para ver el logo, la paleta, las tipografías y los botones.

## Logo

Archivos en `logo/`. El texto está convertido a trazos, así que no dependen de ninguna fuente instalada.

| Archivo | Uso |
|---|---|
| `logo-vertical.svg` | Principal: portada, redes, cartelería |
| `logo-horizontal.svg` | Espacios apaisados: footer, firma de mail |
| `logotipo.svg` | Solo el nombre: header del sitio |
| `isotipo.svg` | Solo la corona: favicon, avatar |

Cada uno tiene su versión `-negativo.svg` (color Papel) para usar sobre fondo Tinta.

### Regenerar

Cualquier cambio de forma o de proporción se hace en `generador/build_logo.py`, no a mano en los SVG.

```bash
cd marca/generador
python -m venv venv && ./venv/Scripts/pip install -r requirements.txt
mkdir fonts
curl -L -o fonts/BodoniModa.ttf "https://github.com/google/fonts/raw/main/ofl/bodonimoda/BodoniModa%5Bopsz,wght%5D.ttf"
curl -L -o fonts/HankenGrotesk.ttf "https://github.com/google/fonts/raw/main/ofl/hankengrotesk/HankenGrotesk%5Bwght%5D.ttf"
./venv/Scripts/python build_logo.py ../logo
cd ../logo && for f in isotipo logotipo logo-vertical logo-horizontal; do sed 's/fill="#151413"/fill="#F5F3EF"/' $f.svg > $f-negativo.svg; done
```

## Paleta

| Token | HEX | Uso |
|---|---|---|
| Tinta | `#151413` | Texto principal, botones, fondos oscuros |
| Grafito | `#2A2826` | Texto de párrafo, superficies oscuras secundarias |
| Piedra | `#6B665F` | Texto secundario sobre claro (5,1:1) |
| Ceniza | `#A39D94` | Texto secundario sobre oscuro (6,8:1). Sobre claro, solo decorativo |
| Bruma | `#DDD8D0` | Filetes, bordes, divisores |
| Papel | `#F5F3EF` | Fondo general |
| Blanco | `#FFFFFF` | Tarjetas |

## Tipografías

- **Bodoni Moda** (variable, peso 400 a 600, eje óptico 6 a 96): títulos, nombre y citas.
- **Hanken Grotesk** (variable, peso 400 a 600): texto, navegación, botones y etiquetas.

En el sitio se autoalojan con el subset latino. No se suma una tercera familia.
