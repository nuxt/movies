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
  image: {
    provider: 'proxy',
    providers: {
      proxy: {
        provider: 'ipx',
        options: {
          // baseURL: 'http://localhost:3001/ipx',
          baseURL: 'https://movies-proxy.vercel.app/ipx',
        },
      },
    },
  },
})
