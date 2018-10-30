const cacheName = 'v1';
const cacheAssets = [
  'index.html',
  '/css/style.css',
  '/js/main.js'
]

// install 
self.addEventListener('install', (e) => {
  console.log('SW installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('SW chaching files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
})

// active
self.addEventListener('activate', (e) => {
  console.log('SW activated')
  // remove old caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName) {
            console.log('SW clearing old cache');
            return caches.delete(cache)
          }
        })
      )
    })
  );
});

// fetch
self.addEventListener('fetch', e => {
  console.log('SW fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});