// ─────────────────────────────────────────────────────────
// Prospector — Service Worker v1
// Estrategia: Cache First para navegación y assets,
// Network First con fallback a caché para datos dinámicos.
// ─────────────────────────────────────────────────────────

const CACHE = {
  SHELL: "prospector-shell-v1",
  STATIC: "prospector-static-v1",
  DATA: "prospector-data-v1",
  RSC: "prospector-rsc-v1",
};

const SW_VERSION = "1.0.0";

// ─── INSTALL: Pre-cache el app shell ─────────────────────
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE.SHELL).then((cache) => {
      // Páginas clave para funcionar offline
      return cache.addAll([
        "/",
        "/login",
        "/offline",
      ]).catch(() => {
        // Si alguna falla (ej. /offline no existe aún), no bloquear
        console.warn("[SW] Pre-cache parcial completado");
      });
    })
  );
});

// ─── ACTIVATE: Limpiar caches viejas ──────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((k) => k.startsWith("prospector-") && !Object.values(CACHE).includes(k))
          .map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// ─── FETCH: Estrategia por tipo de request ────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo interceptar requests del mismo origen
  if (url.origin !== self.location.origin) return;

  // POST (server actions/formularios) → SOLO red
  if (request.method === "POST") {
    // Intentar red, si falla notificar al usuario
    event.respondWith(networkOnly(request));
    return;
  }

  // Static assets (_next/static) → Cache First
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, CACHE.STATIC));
    return;
  }

  // RSC data payloads (_next/data) → Cache First
  if (url.pathname.startsWith("/_next/data/")) {
    event.respondWith(cacheFirst(request, CACHE.RSC));
    return;
  }

  // Service Worker itself → siempre red, nunca cache
  if (url.pathname === "/sw.js") {
    event.respondWith(fetch(request));
    return;
  }

  // Navegación (HTML pages) → Cache First
  if (request.mode === "navigate") {
    event.respondWith(navigationHandler(request));
    return;
  }

  // Manifest → Cache First
  if (url.pathname === "/manifest.json") {
    event.respondWith(cacheFirst(request, CACHE.SHELL));
    return;
  }

  // API calls → Network First con fallback a caché
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstWithCache(request, CACHE.DATA));
    return;
  }

  // Assets estáticos (favicon, icons, fonts) → Cache First
  if (url.pathname.match(/\.(svg|png|jpg|ico|woff2?|css)$/)) {
    event.respondWith(cacheFirst(request, CACHE.STATIC));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirstWithCache(request, CACHE.SHELL));
});

// ─── HANDLERS ────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    // Si no hay cached y no hay red, devolver offline fallback
    if (request.mode === "navigate") {
      const fallback = await caches.match("/offline");
      if (fallback) return fallback;
    }
    return new Response("Sin conexión", { status: 503 });
  }
}

async function navigationHandler(request) {
  // 1. Intentar red primero (así siempre tenemos contenido fresco)
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE.SHELL);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    // 2. Si falla la red, servir desde caché
    const cached = await caches.match(request);
    if (cached) return cached;

    // 3. Si no hay cached de esta URL exacta, buscar el root
    const rootCached = await caches.match("/");
    if (rootCached) return rootCached;

    // 4. Último recurso: offline page
    const offline = await caches.match("/offline");
    if (offline) return offline;

    return new Response("Sin conexión", { status: 503 });
  }
}

async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: "offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch (e) {
    // Para POST, devolver error estructurado
    return new Response(JSON.stringify({ error: "offline", message: "No hay conexión. Los datos se guardarán cuando vuelvas a estar online." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}
