import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

// ESM-compatible __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  },
  resolve: {
    alias: {
      '@home': path.resolve(__dirname, 'src/home'),
      '@auth': path.resolve(__dirname, 'src/auth'),
      '@lentera': path.resolve(__dirname, 'src/lentera-karya'),
      '@sabaquiz': path.resolve(__dirname, 'src/sabaquiz'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    }
  }
})
