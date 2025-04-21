import process from 'node:process'

const isDev = process.env.NODE_ENV === 'development'

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = 'https://movies-proxy.vercel.app'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/html-validator', '@nuxt/test-utils/module'],

  experimental: {
    // inlineSSRStyles: false,
    viewTransition: true,
    renderJsonPayloads: true,
  },

  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl,
    },
  },

  devtools: {
    enabled: true,
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

  nitro: {
    routeRules: {
      '/**': { isr: false },
    },
  },

  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en',
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'fa-IR',
        name: 'فارسی',
        file: 'fa-IR.json',
      },
      {
        code: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.json',
      },
      {
        code: 'es-ES',
        name: 'Español',
        file: 'es-ES.json',
      },
      {
        code: 'it',
        name: 'Italiano',
        file: 'it.json',
      },
      {
        code: 'ja',
        name: '日本語',
        file: 'ja.json',
      },
      {
        code: 'zh-CN',
        name: '简体中文',
        file: 'zh-CN.json',
      },
      {
        code: 'pt-PT',
        name: 'Português',
        file: 'pt-PT.json',
      },
      {
        code: 'pt-BR',
        name: 'Português do Brasil',
        file: 'pt-BR.json',
      },
      {
        code: 'ru-RU',
        name: 'Русский',
        file: 'ru-RU.json',
      },
      {
        code: 'fr-FR',
        name: 'Français',
        file: 'fr-FR.json',
      },
      {
        code: 'uk-UA',
        name: 'Українська',
        file: 'uk-UA.json',
      },
      {
        code: 'vi',
        name: 'Tiếng Việt',
        file: 'vi.json',
      },
    ],
    lazy: true,
    langDir: 'internationalization',
    defaultLocale: 'en',
  },

  htmlValidator: {
    usePrettier: false,
    logLevel: 'verbose',
    failOnError: false,
    /** A list of routes to ignore (that is, not check validity for). */
    ignore: [/\.(xml|rss|json)$/],
    options: {
      extends: ['html-validate:document', 'html-validate:recommended', 'html-validate:standard'],
      rules: {
        'svg-focusable': 'off',
        'no-unknown-elements': 'error',
        // Conflicts or not needed as we use prettier formatting
        'void-style': 'off',
        'no-trailing-whitespace': 'off',
        // Conflict with Nuxt defaults
        'require-sri': 'off',
        'attribute-boolean-style': 'off',
        'doctype-style': 'off',
        // Unreasonable rule
        'no-inline-style': 'off',
      },
    },
  },

  compatibilityDate: '2024-11-22',
})
