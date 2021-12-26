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

  if (request.method === 'GET') {
    if (url.origin === this.location.origin) {
      event.respondWith(cacheFirst(url));
    } else {
      event.respondWith(networkFirst(url));
    }
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

this.addEventListener('notificationclick', async event => {
  const { notification, action } = event;

  if (action === 'confirm') {
    notification.close();
  } else {
    notification.close();
  }
});

this.addEventListener('notificationclose', async event => {
  console.log('Notification was close');
});

this.addEventListener('push', async event => {
  console.log('Push notification', event);
  let data = { title: 'From browser', content: 'Something exiting!' };

  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  console.log('data', data);
  const options = {
    body: data.content,
    icon: '/icon-192x192.png',
    image: '/icon-192x192.png',
    dir: 'rtl',
    lang: 'en-US',
    badge: '/icon-192x192.png',
    // tag: 'confirmation-tag',
    vibrate: [200, 100, 200],
    actions: [
      { action: 'confirm', title: 'Okay', icon: '/icon-192x192.png' },
      { action: 'cancel', title: 'Deny', icon: '/icon-192x192.png' },
    ],
  };

  event.waitUntil(this.registration.showNotification(data.title, options));
});
