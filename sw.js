const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/settings.html',
  '/giftlist.html',
  '/mywishlist.html',
  '/js/firebase.js',
  '/js/jquery-3.6.0.js',
  '/js/app.js',
  '/js/auth.js',
  '/js/people.js',
  '/js/main.js',
  '/assets/js/ui.js',
  '/css/style.css',
  '/css/animation.css',
  '/images/icons/logo.svg',
  '/images/icons/user-icon.svg',
  '/images/icons/settings-icon.svg',
  '/images/wishlist-icon.svg',
  '/images/wishlist-icon_active.svg',
  '/images/people-icon.svg',
  '/images/people-icon_active.svg',
  'https://use.typekit.net/ral6jgm.css',
];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});