import { $fetch } from 'ohmyfetch'
import type { Movie, PageResult } from '../../types'
import { TMDB_API_PARAMS, TMDB_API_URL } from '~/constants/tmdbAPI'
import LISTS from '~/constants/lists'

export function fetchTMD(url: string, params: Record<string, string | number | undefined> = {}) {
  return $fetch(url, {
    baseURL: TMDB_API_URL,
    params: {
      ...TMDB_API_PARAMS,
      ...params,
    },
  })
}

/**
 * Get list item
 */
export function getListItem(type: 'movie' | 'tv', query: string) {
  if (type === 'movie')
    return LISTS.MOVIE.find(list => list.QUERY === query)

  else if (type === 'tv')
    return LISTS.TV.find(list => list.QUERY === query)
}

/**
 * Get movies (listing)
 */
export function getMovies(query: string, page = 1): Promise<PageResult<Movie>> {
  return fetchTMD(`movie/${query}`, { page })
}

/**
 * Get movie (single)
 */
export function getMovie(id: string): Promise<Movie> {
  return fetchTMD(`movie/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,release_dates',
    include_image_language: 'en',
  })
}

/**
 * Get movie recommended (single)
 */

export function getMovieRecommended(id: string, page = 1) {
  return fetchTMD(`movie/${id}/recommendations`, { page })
}

/**
 * Get TV shows (listing)
 */
export function getTvShows(query: string, page = 1) {
  return fetchTMD(`tv/${query}`, { page })
}

/**
 * Get TV show (single)
 */

export function getTvShow(id: string) {
  return fetchTMD(`tv/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,content_ratings',
    include_image_language: 'en',
  })
}

/**
 * Get TV show recommended (single)
 */
export function getTvShowRecommended(id: string, page = 1) {
  return fetchTMD(`tv/${id}/recommendations`, { page })
}

/**
 * Get TV show episodes from season (single)
 */
export function getTvShowEpisodes(id: string, season: string) {
  return fetchTMD(`tv/${id}/season/${season}`)
}

/**
 * Get trending
 */
export function getTrending(media: string, page = 1) {
  return fetchTMD(`trending/${media}/week`, { page })
}

/**
 * Discover media by genre
 */
export function getMediaByGenre(media: string, genre: string, page = 1) {
  return fetchTMD(`discover/${media}`, {
    with_genres: genre,
    page,
  })
}

/**
* Get credits
*/
export function getCredits(id: string, type: string) {
  return fetchTMD(`person/${id}/${type}`)
}

/**
 * Get genre list
 */
export function getGenreList(media: string) {
  return fetchTMD(`genre/${media}/list`, { language: undefined }).then(res => res.genres)
}

/**
 * Get person (single)
 */

export function getPerson(id: string) {
  return fetchTMD(`person/${id}`, {
    append_to_response: 'images,combined_credits,external_ids',
    include_image_language: 'en',
  })
}

/**
 * Search (searches movies, tv and people)
 */

export function search(query: string, page = 1) {
  return fetchTMD('search/multi', { query, page })
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
