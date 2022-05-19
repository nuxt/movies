export type ItemType = 'movie' | 'tv'

export interface Item {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  name?: string
  video: boolean
  vote_average: number
  vote_count: number
  // details
  runtime?: number
  budget?: number
  revenue?: number
  status?: string
  genres?: Genre[]
  production_companies?: any[]
  videos?: {
    results: Video[]
  }
  credits?: {
    cast: Person[]
    crew: Person[]
  }
  external_ids?: ExternalIds
}

export interface Person {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  cast_id?: number
  job?: string
  character?: string
  credit_id: string
  order: number
}

export interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface ExternalIds {
  imdb_id?: string
  facebook_id?: string
  instagram_id?: string
  twitter_id?: string
  linkedin_id?: string
  github_id?: string
  email?: string
  homepage?: string
}

export interface PageResult<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export interface QueryItem {
  type: ItemType
  title: string
  query: string
}
