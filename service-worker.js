const CACHE_NAME = 'metabolic-health-guide-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icon-192x192.png'
  // 여기에 캐싱할 다른 주요 리소스(예: 512x512 아이콘)를 추가할 수 있습니다.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // 캐시에서 찾으면 바로 반환
        }
        return fetch(event.request); // 캐시에 없으면 네트워크에서 가져옴
      }
    )
  );
});
