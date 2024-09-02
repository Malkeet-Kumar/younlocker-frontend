const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/offline.html'
];

// Cache all specified URLs during installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Clean up old caches during activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle fetch requests
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          console.log("Serving from cache");
          notifyClients('cache', request.url);
          return response;
        }

        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          notifyClients('network', request.url);
          return response;
        }).catch(() => caches.match("/offline.html"));
      }).catch(() => caches.match("/offline.html"))
    );
  } else {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          notifyClients('cache', request.url);
          return response;
        }

        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            notifyClients('offline', request.url);
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          notifyClients('network', request.url);
          return response;
        }).catch((err) => {
          notifyClients('offline', request.url, err);
          console.log("Fetch error:", err);
        });
      }).catch((err) => {
        notifyClients('offline', request.url, err);
        console.log("Cache match error:", err);
      })
    );
  }
});

function notifyClients(source, url, err) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage({ source, url, err }));
  });
}
