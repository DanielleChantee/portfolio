/**
 * Service Worker for Portfolio Site
 * Provides offline support and caching for improved performance
 */

const CACHE_NAME = "portfolio-v1";
const RUNTIME_CACHE = "portfolio-runtime-v1";

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/portfolio/",
  "/portfolio/index.html",
  "/portfolio/about.html",
  "/portfolio/work.html",
  "/portfolio/contact.html",
  "/portfolio/rates.html",
  "/portfolio/styles/style.css",
  "/portfolio/styles/header.css",
  "/portfolio/styles/footer.css",
  "/portfolio/styles/variables.css",
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

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the response
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/portfolio/index.html");
          }
        });
    })
  );
});
