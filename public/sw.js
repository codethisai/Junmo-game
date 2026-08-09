// 강준모의 소개팅 — 최소 서비스워커 (PWA 설치 요건 + 런타임 캐시)
const CACHE = 'junmo-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// network-first + 실패 시 캐시 폴백 (앱은 항상 최신, 오프라인 시 마지막 캐시)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
