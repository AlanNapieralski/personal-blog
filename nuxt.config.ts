// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  vite: {
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
  },
})
