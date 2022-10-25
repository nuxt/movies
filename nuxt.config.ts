const isDev = process.env.NODE_ENV === 'development'

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = 'https://movies-proxy.vercel.app'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    ['./nuxt-cache-ssr',{
      enabled:true,
      LRU:{
        max:501,
        ttl:1000 * 60
      },
      pages:[
        '/movie',
        '/tv'
      ]
    }]
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, headersOnly: true } },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl,
    },
  },
  image: {
    provider: 'proxy',
    providers: {
      proxy: {
        provider: 'ipx',
        options: {
          baseURL: `${apiBaseUrl}/ipx`,
        },
      },
    },
  },
})
