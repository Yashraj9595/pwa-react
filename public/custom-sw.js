self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const title = data.title || 'New Notification';
  const options = {
    body: data.body || 'You have a new message.',
    icon: 'icons/icon-192x192.png',
    badge: 'icons/icon-192x192.png',
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Optional: Notification click handler
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
}); 