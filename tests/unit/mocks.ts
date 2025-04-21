import type { Image, Media, Person, Video } from '~/types'

export function mockPerson(overrides: Partial<Person> = {}): Person {
  return {
    adult: false,
    gender: 0,
    id: 1,
    known_for_department: '',
    name: 'John Doe',
    profile_path: '/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg',
    original_name: '',
    popularity: 0,
    credit_id: '',
    character: 'Main Character',
    order: 0,
    images: {
      profiles: [{ aspect_ratio: 0.667, height: 900, iso_639_1: 'null', file_path: '/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg', vote_average: 5.326, vote_count: 7, width: 600 }],
    },
    ...overrides,
  }
}

export function mockImage(overrides: Partial<Image> = {}): Image {
  return {
    aspect_ratio: 1.5,
    height: 1000,
    iso_639_1: '',
    file_path: '/path/to/image.jpg',
    vote_average: 0,
    vote_count: 0,
    width: 1500,
    ...overrides,
  }
}

export function mockMedia(overrides: Partial<Media> = {}): Media {
  return {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: '1',
    original_language: 'en',
    original_title: 'Movie 1',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: undefined,
    video: false,
    vote_average: 0,
    vote_count: 0,
    ...overrides,
  }
}

export function mockVideo(overrides: Partial<Video> = {}): Video {
  return {
    key: 'sampleKey',
    name: 'Sample Video',
    type: 'Trailer',
    iso_639_1: 'en',
    iso_3166_1: 'US',
    site: 'YouTube',
    size: 1080,
    official: true,
    published_at: '2023-01-01T00:00:00Z',
    id: 'sampleId',
    ...overrides,
  }
}
