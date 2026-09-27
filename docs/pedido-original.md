# Pedido original (2026-09-27)

Copia del pedido tal como llegó. Donde contradice a `BRIEF.md`, manda lo confirmado en `BRIEF.md`.

---

## Contexto y rol
Desarrollador Full-Stack Lead, UI/UX Designer Senior y especialista en SEO local/GEO. Construir desde cero la
presencia digital institucional de Carla Pasquali, estilista profesional independiente en Córdoba, Argentina.
Resultado con terminación de producción a medida: estética pulida, performance excepcional, microinteracciones
fluidas y cero clichés de diseño genérico.

## 1. Recursos
- Referencia 1 (estructura y calidez): https://serenityhairblaxland.com.au/
- Referencia 2 (minimalismo y elegancia): https://www.marcelagalli.com/
- Ficha Google Business: https://share.google/XG3vvBSFH6wvVYHiU

## 2. Branding
- Marca: Carla Pasquali Hair Studio (a confirmar, ver `BRIEF.md`).
- Logo: imagotipo SVG limpio y escalable a partir de la foto del cartel.
- Paleta: orgánica, sobria, de alto contraste, sin saturaciones agresivas.
- Reglas:
  - Máximo 2 familias tipográficas. Nada de Playfair Display + Montserrat. Nada de itálicas decorativas en otro color dentro de títulos.
  - Botones sin gradientes, sin redondeo por defecto sin motivo, sin glow. Estados `:hover` y `:active` cuidados, área de toque mínima de 48 px.
  - Sin em-dashes innecesarios ni frases hiperbólicas ("Eleva tu experiencia", "Descubre la magia"). Tono profesional y cercano, español argentino.

## 3. Servicios
1. Corte y estilo: corte femenino, brushing, modelado, peinados para eventos.
2. Colorimetría: balayage, babylights, illumination, tintura y cobertura de canas, decoloración y matiz.
3. Tratamientos: nutrición profunda, cauterizado, alisados y botox capilar, reconstrucción de fibra.
4. Asesoramiento: diagnóstico capilar personalizado.

## 4. Estructura
1. Hero: propuesta de valor, foto principal, CTA "Reservar por WhatsApp" o "Consultar turnos".
2. Sobre Carla: trayectoria, filosofía, foco en la salud del cabello.
3. Servicios: por categorías, descripciones breves.
4. Galería: grilla interactiva (antes y después, color).
5. Ubicación y reservas: Google Maps, horarios, dirección, WhatsApp Business.
6. Footer: legales, Instagram, contacto, copyright.

## 5. Técnico
- Stack: Next.js, React + Vite o Astro, con Tailwind.
- Animaciones: Framer Motion o GSAP. Apariciones progresivas y hover sutiles.
- SEO y GEO: JSON-LD `HairSalon`/`LocalBusiness`, OpenGraph, metas para búsqueda local ("Peluquería en Córdoba",
  "Balayage Córdoba"), HTML semántico, Core Web Vitals óptimos, imágenes WebP/AVIF.

## Pasos de trabajo
1. Paleta (HEX), tipografías y SVG del logo.
2. Arquitectura de componentes y configuración inicial.
3. Hero y header con animaciones.
4. Servicios, Sobre mí y Galería.
5. Contacto y ubicación (con JSON-LD) y footer.
6. Revisión de performance, responsive y reglas de estilo.
