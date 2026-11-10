# Botica Frescora

App instalable (PWA) para diseñar e imprimir las etiquetas Frescora:
ambientadores 50 × 80 mm y perfumes 50 × 50 / 25 × 25 mm, para la impresora térmica Phomemo M221.

- **Instalar:** abre la dirección de la app en Chrome para Android → menú ⋮ → *Instalar app* (o el botón *Instalar app* dentro de la Botica).
- **Catálogo en la nube:** Supabase. Configura `config.js` con la *Project URL* y la clave *anon public*.
  La estructura de la base de datos está en `supabase-setup.sql`.
- **Sin nube:** si `config.js` queda vacío, el catálogo se guarda solo en el celular.
- **Imprimir:** por Bluetooth directo (beta, Chrome para Android), compartiendo a la app de Phomemo, o con PNG/PDF a 600 ppp.

Archivos:
- `index.html` — la app
- `sw.js`, `manifest.webmanifest`, `icons/` — instalación y uso sin internet
- `catalogo.json` — catálogo inicial (519 perfumes, 33 ambientadores)
- `vendor/` — Supabase JS 2.45.4 y jsPDF 2.5.1
- `fonts/` — Cinzel, Archivo, EB Garamond, Tinos (SIL OFL)
