import process from 'node:process'
import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  compatibilityDate: '2024-11-22',
  routeRules: {
    '/**': { cors: true, swr: 3600 },
    '/tmdb/**': { cors: true, cache: false },
    '/ipx/**': { cache: false },
  },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || '',
    },
  },
})
