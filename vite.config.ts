import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/jsonapi/node/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/sites': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    },
  }, 
  plugins: [
    vue(),
    tailwindcss(),
  ],
})