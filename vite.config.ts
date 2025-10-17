import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
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
    }
  }
})
