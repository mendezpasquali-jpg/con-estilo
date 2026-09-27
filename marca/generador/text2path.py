"""Convierte texto a un path SVG con HarfBuzz (kerning y ejes variables incluidos).

Uso: text2path(font, texto, size, variaciones, tracking_em) -> (d, ancho, ascender, descender)
Coordenadas: origen en la linea de base, y hacia abajo (convencion SVG).
"""
import sys, json
import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


def text2path(font_path, text, size, variations, tracking_em=0.0):
    blob = hb.Blob.from_file_path(font_path)
    face = hb.Face(blob)
    font = hb.Font(face)
    font.set_variations(variations)
    upem = face.upem
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})

    # Instancia estatica para dibujar contornos con fontTools
    tt = TTFont(font_path)
    inst = instantiateVariableFont(tt, variations, inplace=False)
    gs = inst.getGlyphSet()
    order = inst.getGlyphOrder()

    scale = size / upem
    track = tracking_em * upem
    x = 0.0
    parts = []
    bounds = None
    n = len(buf.glyph_infos)
    for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        name = order[info.codepoint]
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
        # escala, invierte Y y desplaza
        tp = TransformPen(pen, (scale, 0, 0, -scale, (x + pos.x_offset) * scale, -pos.y_offset * scale))
        gs[name].draw(tp)
        bp = BoundsPen(gs)
        gs[name].draw(TransformPen(bp, (scale, 0, 0, -scale, (x + pos.x_offset) * scale, -pos.y_offset * scale)))
        if bp.bounds:
            b = bp.bounds
            bounds = b if bounds is None else (min(bounds[0], b[0]), min(bounds[1], b[1]), max(bounds[2], b[2]), max(bounds[3], b[3]))
        d = pen.getCommands()
        if d:
            parts.append(d)
        x += pos.x_advance + (track if i < n - 1 else 0)
    hhea = inst["hhea"]
    os2 = inst["OS/2"]
    return {
        "d": " ".join(parts),
        "width": x * scale,
        "bbox": bounds,  # (xMin, yMin, xMax, yMax) en coordenadas SVG

        "capHeight": getattr(os2, "sCapHeight", 0) * scale,
        "xHeight": getattr(os2, "sxHeight", 0) * scale,
        "ascender": hhea.ascent * scale,
        "descender": hhea.descent * scale,
    }


if __name__ == "__main__":
    spec = json.loads(sys.argv[1])
    print(json.dumps(text2path(**spec)))
