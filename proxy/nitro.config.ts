import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  routes: {
    '/tmdb**': { swr: 3000 },
  },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || '',
    },
  },
})
