import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'
import './index.css'
import { startAutoSync } from './lib/sync'

registerSW({ immediate: true })
startAutoSync()

// Ask the browser not to evict our IndexedDB under storage pressure (important on iOS).
navigator.storage?.persist?.()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
