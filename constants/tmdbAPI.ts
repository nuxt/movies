export const TMDB_API_URL = 'https://api.themoviedb.org/3'

export const TMDB_API_PARAMS = {
  api_key: process.env.API_KEY as string,
  language: process.env.API_LANG || 'en-US' as string,
}
