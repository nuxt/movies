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
  },
  build: {
    transpile: [
      'nuxt-server-fn/client',
    ],
  },
})
