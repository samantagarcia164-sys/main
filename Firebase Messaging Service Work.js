// ── Firebase Messaging Service Worker ─────────────────────────────────────────
// IMPORTANTE: Este arquivo DEVE ficar na raiz do seu site (/)
// Substitua os valores abaixo pelos do seu firebaseConfig

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDxQThqrjNEXmmpreEQwRBaihTAIpoZaAM",
    authDomain: "voleigrupo-b8a5a.firebaseapp.com",
    projectId: "voleigrupo-b8a5a",
    storageBucket: "voleigrupo-b8a5a.appspot.com",
    messagingSenderId: "619450859287",
    appId: "1:619450859287:web:bf9138713eb65b3c514152"
});

const messaging = firebase.messaging();

// Notificação recebida com app em background/fechado
messaging.onBackgroundMessage(payload => {
    const { title, body, icon } = payload.notification || {};
    self.registration.showNotification(title || 'Vôlei de Cria', {
        body: body || '',
        icon: icon || '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [200, 100, 200],
        data: payload.data || {},
        actions: [
            { action: 'abrir', title: '🏐 Abrir App' }
        ]
    });
});

// Clique na notificação abre o app
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
            for (const client of list) {
                if (client.url.includes('voleidecria') && 'focus' in client) return client.focus();
            }
            return clients.openWindow('https://www.voleidecria.online');
        })
    );
});
