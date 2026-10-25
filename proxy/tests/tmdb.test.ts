import { beforeEach, describe, expect, it, vi } from 'vitest'

const $fetch = vi.fn()

vi.stubGlobal('$fetch', $fetch)
vi.stubGlobal('useRuntimeConfig', () => ({ tmdb: { apiKey: 'TEST_KEY' } }))
vi.stubGlobal('defineCachedEventHandler', (handler: any) => handler)
vi.stubGlobal('getRequestURL', () => new URL('http://localhost:3001/tmdb/trending/movie/week'))
vi.stubGlobal('setResponseStatus', vi.fn())
vi.stubGlobal('createError', (opts: any) => Object.assign(new Error(opts.statusMessage), opts))

const handler = (await import('../routes/tmdb/[...path]')).default

const event = (path: string) => ({ context: { params: { path } } }) as any

beforeEach(() => {
  $fetch.mockReset()
  $fetch.mockResolvedValue({ ok: true })
})

describe('tmdb proxy route', () => {
  it.each([
    'trending/movie/week',
    'movie/123',
    'tv/1/season/2',
    'search/multi',
    'person/12/combined_credits',
    'genre/movie/list',
    'discover/movie',
  ])('passes relative path %s to the TMDB upstream', async (path) => {
    await handler(event(path))

    expect($fetch).toHaveBeenCalledWith(path, expect.objectContaining({
      baseURL: 'https://api.themoviedb.org/3',
      params: expect.objectContaining({ api_key: 'TEST_KEY' }),
    }))
  })

  it.each([
    'http://127.0.0.1:4567/direct',
    'http:/127.0.0.1:9/single-slash',
    'http:/\\/127.0.0.1:4567/mixed-slashes',
    'http:\\\\127.0.0.1:4567\\double-backslash',
    'http:\\127.0.0.1:9/backslash-then-slash',
    '//127.0.0.1:4567/protocol-relative',
    'http:%2F%2F127.0.0.1:4567%2Fencoded',
    '../tmdb/escape',
    'movie/../../other',
    '',
  ])('rejects path %s without fetching it', async (path) => {
    await expect(handler(event(path))).rejects.toMatchObject({ statusCode: 400 })
    expect($fetch).not.toHaveBeenCalled()
  })

  it('masks every occurrence of the API key in upstream errors', async () => {
    $fetch.mockRejectedValue(new Error('[GET] "https://api.themoviedb.org/3/movie/1?api_key=TEST_KEY": TEST_KEY'))

    const result = await handler(event('movie/1'))

    expect(JSON.stringify(result)).not.toContain('TEST_KEY')
  })
})
