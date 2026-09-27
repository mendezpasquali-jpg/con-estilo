"""Genera las piezas del logo de Con Estilo como SVG con el texto convertido a trazos.

Uso: python build_logo.py <carpeta_salida>
"""
import os, sys
from text2path import text2path

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1]
BODONI = os.path.join(HERE, "fonts", "BodoniModa.ttf")
HANKEN = os.path.join(HERE, "fonts", "HankenGrotesk.ttf")
INK = "#151413"

# Corona: cinco puntas, la central mas alta, valles concavos y una banda
# fina separada por una luz, que repite el contraste grueso/fino de la didona.
CROWN = {
    "d": "M2 64L2 30Q14 74 26 13Q38 74 50 0Q62 74 74 13Q86 74 98 30L98 64Z"
         "M2 70H98V73.5H2Z",
    "bbox": (2, 0, 98, 73.5),
}

WORD = text2path(BODONI, "Con Estilo", 100, {"opsz": 48, "wght": 500}, 0.0)
TAG = text2path(HANKEN, "PELUQUERÍA UNISEX", 22, {"wght": 500}, 0.32)


def fmt(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def size(el, s=1.0):
    x0, y0, x1, y1 = el["bbox"]
    return (x1 - x0) * s, (y1 - y0) * s


def place(el, left, top, s=1.0):
    """Ubica el elemento de modo que la esquina superior izquierda de su tinta quede en (left, top)."""
    x0, y0, _, _ = el["bbox"]
    tx, ty = left - x0 * s, top - y0 * s
    return f'<path transform="translate({fmt(tx)} {fmt(ty)}) scale({fmt(s)})" d="{el["d"]}"/>'


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(w)} {fmt(h)}" role="img">'
        f'<title>{title}</title><g fill="{INK}">{body}</g></svg>\n'
    )


ww, wh = size(WORD)
tw, th = size(TAG)
cap = WORD["capHeight"]

pieces = {}

# Isotipo
cw, ch = size(CROWN)
pieces["isotipo.svg"] = svg(cw, ch, place(CROWN, 0, 0), "Con Estilo")

# Logotipo (solo nombre): para el header
pieces["logotipo.svg"] = svg(ww, wh, place(WORD, 0, 0), "Con Estilo")

# Vertical: corona / nombre / bajada, centrados
cs = (ww * 0.19) / cw
ccw, cch = size(CROWN, cs)
g1, g2 = cap * 0.34, cap * 0.5
W = max(ww, tw)
y = 0
body = place(CROWN, (W - ccw) / 2, y, cs)
y += cch + g1
body += place(WORD, (W - ww) / 2, y)
y += wh + g2
body += place(TAG, (W - tw) / 2, y)
y += th
pieces["logo-vertical.svg"] = svg(W, y, body, "Con Estilo · Peluquería Unisex")

# Horizontal: corona a la izquierda del bloque nombre + bajada
g2h = cap * 0.34
block_h = wh + g2h + th
cs2 = block_h * 0.78 / ch
ccw2, cch2 = size(CROWN, cs2)
gx = cap * 0.42
left = ccw2 + gx
body = place(CROWN, 0, (block_h - cch2) / 2, cs2)
body += place(WORD, left, 0)
body += place(TAG, left + (ww - tw) / 2 if tw < ww else left, wh + g2h)
pieces["logo-horizontal.svg"] = svg(left + max(ww, tw), block_h, body, "Con Estilo · Peluquería Unisex")

os.makedirs(OUT, exist_ok=True)
for name, content in pieces.items():
    with open(os.path.join(OUT, name), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print(f"{name}: {len(content)} bytes")
