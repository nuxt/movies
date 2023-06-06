import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  routeRules: {
    '/**': { cors: true },
    // '/tmdb/**': { },
  },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || '',
    },
  },
})
