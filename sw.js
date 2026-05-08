const CACHE_NAME = 'cupido-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './frontend/assets/img/logo.png',
    './frontend/assets/img/whatsapp.png',
    './frontend/assets/img/logopwa.png',
    './frontend/assets/img/logopwa512.png',
    './frontend/assets/img/buque.png',
    './frontend/assets/img/urso.png',
    './frontend/assets/img/bombom.png',
    './frontend/assets/img/ingresso.png',
    './frontend/assets/img/perfil.png',
    './frontend/assets/img/dec.png',
];

// Instala o Service Worker e armazena os arquivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cupido: Arquivos em cache com sucesso! 💗');
            return cache.addAll(ASSETS);
        })
    );
});

// Responde a partir do cache ou busca na rede
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Limpa caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});