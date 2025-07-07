import React from 'react';

const PushDemoButton: React.FC = () => {
  const sendTestNotification = async () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported in this browser.');
      return;
    }

    let permission = Notification.permission;
    if (permission !== 'granted') {
      permission = await Notification.requestPermission();
    }

    if (permission !== 'granted') {
      alert('Notification permission not granted.');
      return;
    }

    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification('Test Notification', {
        body: 'This is a test notification from your PWA!',
        icon: 'icons/icon-192x192.png',
        badge: 'icons/icon-192x192.png',
      });
    } else {
      alert('Service Worker not supported!');
    }
  };

  return (
    <button onClick={sendTestNotification} style={{ position: 'fixed', bottom: 60, right: 20, zIndex: 1000 }}>
      Show Test Notification
    </button>
  );
};

export default PushDemoButton; 