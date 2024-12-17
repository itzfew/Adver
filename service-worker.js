// service-worker.js

const CACHE_NAME = 'chat-simulation-cache-v1';
const urlsToCache = [
    '/',
    '/indexx.html',
    '/styles.css', // Add your CSS file path here
    '/script.js',  // Add your JS file path here
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    'https://bigsoundbank.com/UPLOAD/wav-en/1313.wav', // Add your audio files if required
    'https://via.placeholder.com/192x192',  // Add other static assets like icons
    'https://via.placeholder.com/512x512'
];

// Install event: caching necessary assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching assets');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: intercept network requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse; // Return the cached asset if available
                }
                return fetch(event.request); // Otherwise, fetch from the network
            })
    );
});

// Activate event: cleanup old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!cacheWhitelist.includes(cacheName)) {
                            return caches.delete(cacheName); // Delete old caches
                        }
                    })
                );
            })
    );
});
