import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
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
  colorMode: {
    classSuffix: '',
  },
})
