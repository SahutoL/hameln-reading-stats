const CACHE_NAME = 'hameln-reading-stats-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // 注意: 実際のアプリケーションでは、ビルド後のJS/CSSファイル名を指定する必要があります
  // '/static/js/bundle.js', 
  // '/static/css/main.css',
  '/logo.svg',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/recharts@2.12.7/umd/Recharts.min.js'
];

// Service Workerのインストール処理
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // 必須ではないリソースのエラーは無視する
        const cachePromises = urlsToCache.map(urlToCache => {
            return cache.add(urlToCache).catch(err => {
                console.warn(`Failed to cache ${urlToCache}:`, err);
            });
        });
        return Promise.all(cachePromises);
      })
  );
});

// リクエストへの応答処理
self.addEventListener('fetch', event => {
  // APIリクエストは常にネットワークから取得する
  if (event.request.url.includes('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュにヒットすればそれを返す
        if (response) {
          return response;
        }
        // キャッシュになければネットワークから取得
        return fetch(event.request).then(
          networkResponse => {
            // オプショナル: ネットワークから取得したリソースをキャッシュに追加
            // if(networkResponse.status === 200) {
            //   const responseToCache = networkResponse.clone();
            //   caches.open(CACHE_NAME).then(cache => {
            //     cache.put(event.request, responseToCache);
            //   });
            // }
            return networkResponse;
          }
        );
      }
    ).catch(error => {
        // ネットワークもキャッシュも利用できない場合のフォールバック
        console.error('Fetch failed; returning offline page instead.', error);
        // return caches.match('/offline.html'); // 必要であればオフライン専用ページを返す
    })
  );
});

// 古いキャッシュの削除処理
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});