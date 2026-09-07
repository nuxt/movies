import type { H3Event } from 'h3'
import { describe, expect, it } from 'vitest'
import { getRequestQuery } from '../../proxy/utils/request-query'

describe('getRequestQuery', () => {
  it('reads query parameters from the original request URL', () => {
    const event = {
      path: '/movie/550',
      node: {
        req: {
          originalUrl: '/tmdb/movie/550?append_to_response=videos%2Cimages&language=fr-FR&page=2',
          url: '/movie/550',
        },
      },
    } as H3Event

    expect(getRequestQuery(event)).toEqual({
      append_to_response: 'videos,images',
      language: 'fr-FR',
      page: '2',
    })
  })
})
