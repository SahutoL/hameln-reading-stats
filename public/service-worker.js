const CACHE_NAME = "hameln-reading-stats-v3.7";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "https://cdn.tailwindcss.com",
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  "https://unpkg.com/recharts@2.12.7/umd/Recharts.min.js",
];

// Service Workerのインストール処理
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Activate new service worker immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      const cachePromises = urlsToCache.map((urlToCache) => {
        return cache.add(urlToCache).catch((err) => {
          console.warn(`Failed to cache ${urlToCache}:`, err);
        });
      });
      return Promise.all(cachePromises);
    })
  );
});

// リクエストへの応答処理
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // manifest や icons はネットワーク優先
  if (
    url.pathname.endsWith("/manifest.json") ||
    url.pathname.match(/^\/icon-.*\.png$/)
  ) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // API はネットワーク、その他はキャッシュファースト
  if (event.request.url.includes("/api/")) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then(
        (response) =>
          response ||
          fetch(event.request).then((networkResponse) => {
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              event.request.method !== "GET"
            ) {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
            return networkResponse;
          })
      )
      .catch((err) => console.error(err))
  );
});

// 古いキャッシュの削除処理 & 新しいSWでページを即時制御
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // Ensure new SW takes control immediately
  );
});
