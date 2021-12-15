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

// sw.js
self.addEventListener("fetch", event => {
  console.log("You fetched " + event.url);
});

let cache_name = "Gavelisten"; // The string used to identify our cache
self.addEventListener("install", event => {
    console.log("installing...");
    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(assets);
            })
            .catch(err => console.log(err))
    );
});
self.addEventListener("fetch", event => {
  if (event.request.url === "https://www.hjorthex.com/") {
      // or whatever your app's URL is
      event.respondWith(
          fetch(event.request).catch(err =>
              self.cache.open(cache_name).then(cache => cache.match("/offline.html"))
          )
      );
  } else {
      event.respondWith(
          fetch(event.request).catch(err =>
              caches.match(event.request).then(response => response)
          )
      );
  }
});
