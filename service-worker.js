const CACHE_NAME = 'portalmediotec-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/inicio.html',
    '/register.html',
    '/getTurma.html',
    '/getProfs.html',
    '/getDisciplina.html',
    '/getCoord.html',
    '/getAlunos.html',
    '/comunicados.html',
    '/cadastroCoord.html',
    '/register.css',
    '/inicio.css',
    '/getProfs.css',
    '/comunicados.css',
    '/cadastroCoord.css',
    '/js/*.js',
    '/manifest.json',
    '/imgs/*.webp',
    '/imgs/*.png',
    '/icons/*.png',
    '/pwa_icons/appstore.png',
    '/pwa_icons/playstore.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
