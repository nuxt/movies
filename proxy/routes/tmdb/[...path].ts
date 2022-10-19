import { $fetch } from 'ohmyfetch'
import { getQuery } from 'ufo'

const TMDB_API_URL = 'https://api.themoviedb.org/3'

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line no-console
  console.log('Fetching TMDB API', event.req.url)
  const config = useRuntimeConfig()
  try {
    return await $fetch(event.context.params.path, {
      baseURL: TMDB_API_URL,
      params: {
        api_key: config.tmdb.apiKey,
        language: 'en-US',
        ...getQuery(event.req.url!),
      },
    })
  }
  catch (e: any) {
    const status = e?.response?.status || 500
    event.res.statusCode = status
    return e.message?.replace(/\?api_key=.*/, '')
  }
})
