const isDev = process.env.NODE_ENV === 'development'

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = 'https://movies-proxy.vercel.app'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@nuxtjs/i18n',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
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
  i18n: {
    detectBrowserLanguage: {
      useCookie: false,
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      
    ],
    vueI18n: {
      fallbackLocale: 'en'
    },
    lazy: true,
    langDir: 'internationalization',
    defaultLocale: 'en'
  },
})
