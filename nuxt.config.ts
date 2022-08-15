import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-server-fn',
  ],
  experimental: {
    reactivityTransform: true,
    viteNode: true,
  },
  build: {
    transpile: [
      'nuxt-server-fn/client',
    ],
  },
})
