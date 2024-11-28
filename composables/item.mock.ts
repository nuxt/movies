// mockMedia.ts
import type { ExternalIds, Genre, Image, Media, Person, Video } from '~/types'

export function mockMedia(overrides: Partial<Media> = {}): Media {
  const defaultVideos: Video[] = [
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Default Video',
      key: 'defaultKey',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
      official: true,
      published_at: '2023-01-01T00:00:00Z',
      id: 'defaultId',
    },
  ]

  const defaultImages: Image[] = [
    {
      aspect_ratio: 1.78,
      height: 1080,
      iso_639_1: 'en',
      file_path: '/default.jpg',
      vote_average: 0,
      vote_count: 0,
      width: 1920,
    },
  ]

  const defaultGenres: Genre[] = [
    {
      id: 1,
      name: 'Default Genre',
    },
  ]

  const defaultPeople: Person[] = [
    {
      adult: false,
      gender: 1,
      id: 1,
      known_for_department: 'Acting',
      name: 'Default Person',
      original_name: 'Default Person',
      profile_path: '/default.jpg',
      popularity: 0,
      credit_id: 'defaultCreditId',
      order: 0,
    },
  ]

  const defaultExternalIds: ExternalIds = {
    imdb_id: 'tt1234567',
    facebook_id: 'defaultFB',
    instagram_id: 'defaultIG',
    twitter_id: 'defaultTW',
  }

  const defaultMedia: Media = {
    adult: false,
    backdrop_path: '/defaultBackdrop.jpg',
    genre_ids: [1],
    id: '1',
    original_language: 'en',
    original_title: 'Default Title',
    overview: 'Default overview',
    popularity: 10,
    poster_path: '/defaultPoster.jpg',
    release_date: '2023-01-01',
    title: 'Default Title',
    video: false,
    vote_average: 7.5,
    vote_count: 100,
    videos: {
      results: defaultVideos,
    },
    genres: defaultGenres,
    images: {
      backdrops: defaultImages,
      posters: defaultImages,
    },
    credits: {
      cast: defaultPeople,
      crew: defaultPeople,
    },
    external_ids: defaultExternalIds,
  }

  return { ...defaultMedia, ...overrides }
}
