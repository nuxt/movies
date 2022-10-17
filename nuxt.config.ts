export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
  ],
  experimental: {
    reactivityTransform: true,
  },
})
