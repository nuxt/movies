import type { Video } from '~/types'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createApp, defineComponent, h } from 'vue'
import { mockMedia } from '~/tests/unit/mocks'
import { getTrailer, getVideoLink, provideIframeModal, provideImageModal, useIframeModal, useImageModal } from './item'
import { useSingleton } from './utils'

describe('getTrailer', () => {
  it('should return the trailer video link if a trailer is found', () => {
    const media = mockMedia({
      videos: {
        results: [
          { type: 'Teaser', key: 'teaserKey', iso_639_1: 'en', iso_3166_1: 'US', name: 'Teaser', site: 'YouTube', size: 1080, official: true, published_at: '2023-01-01T00:00:00Z', id: 'teaserId' } as Video,
          { type: 'Trailer', key: 'trailerKey', iso_639_1: 'en', iso_3166_1: 'US', name: 'Trailer', site: 'YouTube', size: 1080, official: true, published_at: '2023-01-01T00:00:00Z', id: 'trailerId' } as Video,
        ],
      },
    })
    const trailerLink = getTrailer(media)
    expect(trailerLink).toBe('https://www.youtube.com/embed/trailerKey?rel=0&showinfo=0&autoplay=0')
  })

  it('should return null if no trailer is found', () => {
    const media = mockMedia({
      videos: {
        results: [
          { type: 'Teaser', key: 'teaserKey', iso_639_1: 'en', iso_3166_1: 'US', name: 'Teaser', site: 'YouTube', size: 1080, official: true, published_at: '2023-01-01T00:00:00Z', id: 'teaserId' } as Video,
        ],
      },
    })
    const trailerLink = getTrailer(media)
    expect(trailerLink).toBeNull()
  })

  it('should return null if there are no videos', () => {
    const media = mockMedia({
      videos: {
        results: [],
      },
    })
    const trailerLink = getTrailer(media)
    expect(trailerLink).toBeNull()
  })
})

describe('getVideoLink', () => {
  it('should return the correct YouTube embed link if key is provided', () => {
    const video: Video = { key: 'testKey', iso_639_1: 'en', iso_3166_1: 'US', name: 'Test Video', site: 'YouTube', size: 1080, type: 'Trailer', official: true, published_at: '2023-01-01T00:00:00Z', id: 'testId' }
    const videoLink = getVideoLink(video)
    expect(videoLink).toBe('https://www.youtube.com/embed/testKey?rel=0&showinfo=0&autoplay=0')
  })

  it('should return null if no key is provided', () => {
    const video: Video = { key: '', iso_639_1: 'en', iso_3166_1: 'US', name: 'Test Video', site: 'YouTube', size: 1080, type: 'Trailer', official: true, published_at: '2023-01-01T00:00:00Z', id: 'testId' }
    const videoLink = getVideoLink(video)
    expect(videoLink).toBeNull()
  })

  it('should return null if item is undefined', () => {
    const videoLink = getVideoLink(undefined)
    expect(videoLink).toBeNull()
  })
})

describe('useSingleton', () => {
  let app: ReturnType<typeof createApp>

  beforeEach(() => {
    app = createApp({
      render: () => h('div'),
    })
  })

  it('should provide and use singleton without issues', () => {
    const [provideFn, useFn] = useSingleton<() => void>()

    const mockFn = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        provideFn(mockFn)
        const usedFn = useFn()
        expect(usedFn).toBe(mockFn)
        return () => h('div', 'TestComponent')
      },
    })

    app.component('TestComponent', TestComponent)
    app.mount(document.createElement('div'))
  })

  it('should throw an error if use is called before provide', () => {
    const [, useFn] = useSingleton<() => void>()

    const TestComponent = defineComponent({
      setup() {
        expect(() => useFn()).toThrow('Singleton not provided')
        return () => h('div', 'TestComponent')
      },
    })

    app.component('TestComponent', TestComponent)
    app.mount(document.createElement('div'))
  })
})

describe('provideIframeModal and useIframeModal', () => {
  let app: ReturnType<typeof createApp>

  beforeEach(() => {
    app = createApp({
      render: () => h('div'),
    })
  })

  it('should provide and use iframe modal without issues', () => {
    const mockFn = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        provideIframeModal(mockFn)
        const usedFn = useIframeModal()
        expect(usedFn).toBe(mockFn)
        return () => h('div', 'TestComponent')
      },
    })

    app.component('TestComponent', TestComponent)
    app.mount(document.createElement('div'))
  })

  it('should throw an error if useIframeModal is called before provideIframeModal', () => {
    const TestComponent = defineComponent({
      setup() {
        expect(() => useIframeModal()).toThrow('Singleton not provided')
        return () => h('div', 'TestComponent')
      },
    })

    app.component('TestComponent', TestComponent)
    app.mount(document.createElement('div'))
  })
})

describe('provideImageModal and useImageModal', () => {
  let app: ReturnType<typeof createApp>

  beforeEach(() => {
    app = createApp({
      render: () => h('div'),
    })
  })

  it('should provide and use image modal without issues', () => {
    const mockFn = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        provideImageModal(mockFn)
        const usedFn = useImageModal()
        expect(usedFn).toBe(mockFn)
        return () => h('div', 'TestComponent')
      },
    })

    app.component('TestComponent', TestComponent)
    app.mount(document.createElement('div'))
  })

  it('should throw an error if useImageModal is called before provideImageModal', () => {
    const TestComponent = defineComponent({
      setup() {
        expect(() => useImageModal()).toThrow('Singleton not provided')
        return () => h('div', 'TestComponent')
      },
    })

    app.component('TestComponent', TestComponent)
    app.mount(document.createElement('div'))
  })
})
