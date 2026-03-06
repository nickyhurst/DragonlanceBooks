import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
      "/covers": "http://localhost:3001", // if serving covers from server/public/covers
      "/Dragonlance1eLogoFull.webp": "http://localhost:3001",
      "/favicon.ico": "http://localhost:3001",
      "/dl-og-image.jpg": "http://localhost:3001",
      "/apple-touch-icon.png": "http://localhost:3001",
    },
  },
})
