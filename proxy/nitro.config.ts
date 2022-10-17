import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  routes: {
    '/**': { cors: true },
    '/tmdb/**': { swr: 3600 },
  },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || '',
    },
  },
})
