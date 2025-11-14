// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  /**
   * GitHub Pages / static deployment
   * - app.baseURL ensures assets resolve correctly under /personal-blog/
   * - nitro preset `github-pages` outputs static files to .output/public
   */
  app: {
    baseURL: '/personal-blog/',
  },

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

  nitro: {
    preset: 'github-pages',
  },
})
