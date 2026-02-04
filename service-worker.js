/**
 * Service Worker for Portfolio Site
 * Provides offline support and caching for improved performance
 */

const CACHE_NAME = "portfolio-v2";
const RUNTIME_CACHE = "portfolio-runtime-v2";

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/portfolio/",
  "/portfolio/index.html",
  "/portfolio/about.html",
  "/portfolio/work.html",
  "/portfolio/services.html",
  "/portfolio/contact.html",
  "/portfolio/rates.html",
  "/portfolio/styles/style.css",
  "/portfolio/styles/index.css",
  "/portfolio/styles/header.css",
  "/portfolio/styles/footer.css",
  "/portfolio/styles/variables.css",
  "/portfolio/styles/client-work.css",
  "/portfolio/styles/work.css",
  "/portfolio/styles/about.css",
  "/portfolio/scripts/scripts.js",
  "/portfolio/images/logos/logo-white-small.jpg",
  "/portfolio/images/profile-picture.jpeg"
];

// Install event - cache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((error) => {
        console.warn("Failed to cache some assets:", error);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first for HTML (always fresh), cache-first for assets
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Navigation requests (HTML pages) - network first, fallback to cache
  // This ensures users always get fresh content when refreshing
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/portfolio/index.html")))
    );
    return;
  }

  // Assets (CSS, JS, images) - cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
