import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

// Plugin to ensure web.config is copied to dist
const copyWebConfigPlugin = () => {
  return {
    name: 'copy-web-config',
    closeBundle() {
      try {
        copyFileSync(
          join(process.cwd(), 'public', 'web.config'),
          join(process.cwd(), 'dist', 'web.config')
        )
        console.log('✓ web.config copied to dist/')
      } catch (error) {
        console.warn('⚠ Could not copy web.config:', error.message)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copyWebConfigPlugin()
  ],
  publicDir: 'public',
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self';  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://fonts.gstatic.com https://diprkarnataka.duckdns.org https://apis.google.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: http: blob:; media-src 'self' https: http: blob:; connect-src 'self' data: https://diprkarnataka.duckdns.org https://diprwebapp.gully2global.in https: http: ws: wss:; frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtu.be https://youtu.be https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), usb=(), payment=(), clipboard-read=(), clipboard-write=(), accelerometer=(), autoplay=(), encrypted-media=(), fullscreen=(self), gyroscope=(), magnetometer=(), midi=(), picture-in-picture=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'X-DNS-Prefetch-Control': 'off',
      'X-XSS-Protection': '1; mode=block'
    }
  }
})
