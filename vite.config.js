import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Local owner-login testing: run `php -S localhost:8000 -t public` in another terminal,
// then start Vite with OWNER_API_PROXY=http://localhost:8000 npm run dev
const ownerApi = process.env.OWNER_API_PROXY

export default defineConfig({
  plugins: [react()],
  server: ownerApi ? { proxy: { '/api': { target: ownerApi, changeOrigin: false } } } : undefined,
})
