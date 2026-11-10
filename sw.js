// Botica Frescora: funciona sin internet guardando la app en el celular.
const VERSION = "frescora-v3";
const ARCHIVOS = [
  "./", "index.html", "manifest.webmanifest", "config.js", "catalogo.json",
  "vendor/supabase.js", "vendor/jspdf.umd.min.js", "fonts/fonts.css",
  "fonts/cinzel-latin-600-normal.woff2", "fonts/cinzel-latin-700-normal.woff2",
  "fonts/archivo-latin-400-normal.woff2", "fonts/archivo-latin-500-normal.woff2", "fonts/archivo-latin-600-normal.woff2",
  "fonts/archivo-latin-700-normal.woff2", "fonts/archivo-latin-800-normal.woff2",
  "fonts/eb-garamond-latin-700-italic.woff2", "fonts/tinos-latin-700-normal.woff2",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // la nube (Supabase) siempre va por internet
  const fresco = req.mode === "navigate" || url.pathname.endsWith("config.js") || url.pathname.endsWith("index.html");
  if (fresco) {
    e.respondWith(fetch(req).then((r) => { const copia = r.clone(); caches.open(VERSION).then((c) => c.put(req, copia)); return r; })
      .catch(() => caches.match(req).then((r) => r || caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then((r) => r || fetch(req).then((resp) => {
    if (resp.ok) { const copia = resp.clone(); caches.open(VERSION).then((c) => c.put(req, copia)); }
    return resp;
  })));
});
