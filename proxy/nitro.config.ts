import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  routes: {
    '/**': { cors: true, swr: 3600 },
  },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || '',
    },
  },
})
