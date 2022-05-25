import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    'nuxt-server-fn',
  ],
  experimental: {
    reactivityTransform: true,
  },
  build: {
    transpile: [
      'nuxt-server-fn/client',
    ],
  },
})
