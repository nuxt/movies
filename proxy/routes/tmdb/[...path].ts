import { parseQuery } from 'ufo'

const TMDB_API_URL = 'https://api.themoviedb.org/3'
const TMDB_PATH = /^[\w-]+(?:\/[\w-]+)*$/

export default defineCachedEventHandler(async (event) => {
  const path = event.context.params!.path
  if (!TMDB_PATH.test(path)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid TMDB path' })
  }
  const query = parseQuery(getRequestURL(event).search)
  // eslint-disable-next-line no-console
  console.log(
    'Fetching TMDB API',
    {
      url: getRequestURL(event).href,
      query,
      params: event.context.params,
    },
  )
  const config = useRuntimeConfig()
  if (!config.tmdb.apiKey)
    throw new Error('TMDB API key is not set')
  try {
    return await $fetch(path, {
      baseURL: TMDB_API_URL,
      params: {
        api_key: config.tmdb.apiKey,
        language: 'en-US',
        ...query,
      },
      headers: {
        Accept: 'application/json',
      },
    })
  }
  catch (e: any) {
    const status = e?.response?.status || 500
    setResponseStatus(event, status)
    return {
      error: String(e).replaceAll(config.tmdb.apiKey, '***'),
    }
  }
}, {
  maxAge: 3600,
  swr: true,
})
