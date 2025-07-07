import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Request notification permission on load
if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission()
}

registerSW({
  onNeedRefresh() {
    // You can show a custom UI prompt here
    if (window.confirm('A new version is available. Refresh now?')) {
      window.location.reload()
    }
  },
  onOfflineReady() {
    // You can show a custom UI prompt here
    alert('App is ready to work offline!')
  },
})
