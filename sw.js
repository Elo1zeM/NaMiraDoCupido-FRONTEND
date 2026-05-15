const CACHE_NAME = 'cupido-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './pagamento.html',
    './pagamento-final.html',
    './pedidos.html',
    './pedido-feito.html',
    './index.html',
    './manifest.json',
    './assets/img/logo.png',
    './assets/img/whatsapp.png',
    './assets/img/logopwa.png',
    './assets/img/logopwa512.png',
    './assets/img/buque.png',
    './assets/img/urso.png',
    './assets/img/bombom.png',
    './assets/img/ingresso.png',
    './assets/img/perfil.png',
    './assets/img/dec.png',
    './assets/img/carta.png',
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