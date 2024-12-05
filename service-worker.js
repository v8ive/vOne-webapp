// service-worker.js
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('vone-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',

                '/script.js',
                '/style.css',
                // ... other important files
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);

        })
    );
});