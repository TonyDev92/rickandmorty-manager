// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  css: [
    '~/assets/scss/_reset.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Esto permite usar $green-rick en cualquier <style> de tus .vue
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    }
  },
  modules: [
    '@nuxt/devtools',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api'
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
