import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRouteParam } from './nuxt'

// Define mocks using vi.hoisted
const { mockUseRoute } = vi.hoisted(() => {
  return {
    mockUseRoute: vi.fn(() => {
      return { params: {} }
    }),
  }
})

// Mock the useRoute function
mockNuxtImport('useRoute', () => {
  return mockUseRoute
})

describe('useRouteParam', () => {
  beforeEach(() => {
    // Restore mocks before each test
    vi.resetAllMocks()
  })

  it('should return the route parameter value as a computed ref', () => {
    mockUseRoute.mockImplementation(() => {
      return { params: { id: '123' } }
    })

    const param = useRouteParam<string>('id')
    expect(param.value).toBe('123')
  })

  it('should return the initial value if the route parameter is not defined', () => {
    mockUseRoute.mockImplementation(() => {
      return { params: {} }
    })

    const param = useRouteParam<string>('id', 'default')
    expect(param.value).toBe('default')
  })

  it('should return undefined if the route parameter is not defined and no initial value is provided', () => {
    mockUseRoute.mockImplementation(() => {
      return { params: {} }
    })

    const param = useRouteParam<string>('id')
    expect(param.value).toBeUndefined()
  })
})
