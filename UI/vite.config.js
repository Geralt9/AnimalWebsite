import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Vite rejects requests whose Host header it doesn't recognize (DNS-rebinding
    // protection). Tunnels (localtunnel, ngrok, devtunnels, ...) put a public
    // hostname in that header, so it must be explicitly allowed here.
    // Each entry allows any subdomain of that tunnel provider (the actual
    // subdomain changes every time a tunnel restarts).
    allowedHosts: ['.loca.lt', '.trycloudflare.com'],
  },
})
