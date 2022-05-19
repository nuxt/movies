import { $fetch } from 'ohmyfetch'
import LRU from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { ItemType, Movie, PageResult } from '../../types'
import { TMDB_API_PARAMS, TMDB_API_URL } from '~/constants/tmdbAPI'

const cache = new LRU({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
})

function _fetchTMDB(url: string, params: Record<string, string | number | undefined> = {}) {
  // eslint-disable-next-line no-console
  console.log('fetching', url, params)
  return $fetch(url, {
    baseURL: TMDB_API_URL,
    params: {
      ...TMDB_API_PARAMS,
      ...params,
    },
  })
}

export function fetchTMDB(url: string, params: Record<string, string | number | undefined> = {}): Promise<any> {
  const hash = ohash([url, params])
  if (!cache.has(hash)) {
    cache.set(
      hash,
      _fetchTMDB(url, params)
        .catch((e) => {
          cache.delete(hash)
          throw e
        }),
    )
  }
  return cache.get(hash)!
}

/**
 * Get items (listing)
 */
export function getItems(type: ItemType, query: string, page: number): Promise<PageResult<Movie>> {
  return fetchTMDB(`${type}/${query}`, { page })
}

/**
 * Get item
 */
export function getItem(type: ItemType, id: string): Promise<Movie> {
  return fetchTMDB(`${type}/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,release_dates',
    include_image_language: 'en',
  })
}

/**
 * Get movies (listing)
 */
export function getMovies(query: string, page: number): Promise<PageResult<Movie>> {
  return fetchTMDB(`movie/${query}`, { page })
}

/**
 * Get movie (single)
 */
export function getMovie(id: string): Promise<Movie> {
  return fetchTMDB(`movie/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,release_dates',
    include_image_language: 'en',
  })
}

/**
 * Get movie recommended (single)
 */

export function getMovieRecommended(id: string, page = 1) {
  return fetchTMDB(`movie/${id}/recommendations`, { page })
}

/**
 * Get TV shows (listing)
 */
export function getTvShows(query: string, page = 1) {
  return fetchTMDB(`tv/${query}`, { page })
}

/**
 * Get TV show (single)
 */

export function getTvShow(id: string) {
  return fetchTMDB(`tv/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,content_ratings',
    include_image_language: 'en',
  })
}

/**
 * Get TV show recommended (single)
 */
export function getTvShowRecommended(id: string, page = 1) {
  return fetchTMDB(`tv/${id}/recommendations`, { page })
}

/**
 * Get TV show episodes from season (single)
 */
export function getTvShowEpisodes(id: string, season: string) {
  return fetchTMDB(`tv/${id}/season/${season}`)
}

/**
 * Get trending
 */
export function getTrending(media: string, page = 1) {
  return fetchTMDB(`trending/${media}/week`, { page })
}

/**
 * Discover media by genre
 */
export function getMediaByGenre(media: string, genre: string, page = 1) {
  return fetchTMDB(`discover/${media}`, {
    with_genres: genre,
    page,
  })
}

/**
* Get credits
*/
export function getCredits(id: string, type: string) {
  return fetchTMDB(`person/${id}/${type}`)
}

/**
 * Get genre list
 */
export function getGenreList(media: string) {
  return fetchTMDB(`genre/${media}/list`, { language: undefined }).then(res => res.genres)
}

/**
 * Get person (single)
 */

export function getPerson(id: string) {
  return fetchTMDB(`person/${id}`, {
    append_to_response: 'images,combined_credits,external_ids',
    include_image_language: 'en',
  })
}

/**
 * Search (searches movies, tv and people)
 */

export function search(query: string, page = 1) {
  return fetchTMDB('search/multi', { query, page })
}

/**
 * Get YouTube video info
 */
export function getYouTubeVideo(id: string) {
  return $fetch('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      key: process.env.API_YOUTUBE_KEY,
      id,
      part: 'contentDetails',
    },
  })
}
