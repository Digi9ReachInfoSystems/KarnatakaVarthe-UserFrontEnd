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
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' blob: https:; connect-src 'self' https: ws: wss:; frame-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self';",
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
    }
  }
})
