const staticCache = 'static-v2';
const dynamicCache = 'dynamic-v1';

const assets = [
  '/static/js/bundle.js',
  '/static/js/vendors~main.chunk.js',
  '/static/js/main.chunk.js',
  '/static/media/lato-regular.5b3bd11e.woff2',
  '/static/js/0.chunk.js',
  '/favicon.ico',
  '/manifest.json',
  'index.html',
];

this.addEventListener('install', async event => {
  const cache = await caches.open(staticCache);
  await cache.addAll(assets);
});

this.addEventListener('activate', async event => {
  const cacheKeys = await caches.keys();
  Promise.all(
    cacheKeys
      .filter(key => key !== staticCache)
      .filter(key => key !== dynamicCache)
      .map(key => caches.delete(key)),
  );
});

this.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin === this.location.origin) {
    event.respondWith(cacheFirst(url));
  } else {
    event.respondWith(networkFirst(url));
  }
});

async function cacheFirst(url) {
  const cached = await caches.match(url);
  return cached ?? (await fetch(url));
}

async function networkFirst(url) {
  const cache = await caches.open(dynamicCache);

  try {
    const response = await fetch(url);
    await cache.put(url, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(url);
    return cached;
  }
}
