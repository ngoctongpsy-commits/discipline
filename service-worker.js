// Thích Kỷ Luật — Service Worker v2 (fix Safari iOS "Response has redirections")
const CACHE = 'tkl-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Helper: tạo Response mới không có redirect history (an toàn cho Safari)
async function cleanResponse(response) {
  if (!response.redirected) return response;
  const body = await response.blob();
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.all(ASSETS.map(url =>
        fetch(url, { cache: 'reload', redirect: 'follow' })
          .then(async resp => {
            if (resp.ok) {
              const clean = await cleanResponse(resp);
              await cache.put(url, clean);
            }
          })
          .catch(() => {})
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Bỏ qua request khác origin (analytics, CDN bên ngoài)
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  // HTML navigation: network-first (luôn lấy bản mới khi có mạng, fallback cache khi offline)
  if (e.request.mode === 'navigate' || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request, { redirect: 'follow' })
        .then(async resp => {
          if (resp.ok) {
            const clean = await cleanResponse(resp.clone());
            caches.open(CACHE).then(c => c.put('./index.html', clean));
            return resp.redirected ? cleanResponse(resp) : resp;
          }
          return resp;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Asset khác: cache-first, không cache redirect
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached ||
      fetch(e.request, { redirect: 'follow' })
        .then(async resp => {
          if (resp.ok && resp.status === 200) {
            const clean = await cleanResponse(resp.clone());
            caches.open(CACHE).then(c => c.put(e.request, clean));
            return resp.redirected ? cleanResponse(resp) : resp;
          }
          return resp;
        })
        .catch(() => undefined)
    )
  );
});
