import type { VueWrapper } from '@vue/test-utils'
import type { Image } from '~/types'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import { describe, expect, it } from 'vitest'
import { baseUrl } from '~/tests/unit/config'
import { mockImage } from '~/tests/unit/mocks'
import PhotoCard from './Card.vue'

function initComponent(props: { item: Image }) {
  return mountSuspended(PhotoCard, {
    props,
  })
}

describe('photoCard', () => {
  // Helper functions to get elements by data-testid
  const findButton = (wrapper: VueWrapper) => wrapper.find('[data-testid="photo-button"]')
  const findImage = (wrapper: VueWrapper) => wrapper.find('[data-testid="photo-image"]')

  it('renders correctly with image', async () => {
    const image = mockImage({ file_path: '/path/to/image.jpg' })

    const wrapper = await initComponent({ item: image })

    expect(findButton(wrapper).exists()).toBe(true)
    expect(findImage(wrapper).exists()).toBe(true)

    expect(findImage(wrapper).attributes('src')).toBe(`${baseUrl}/ipx/f_webp&s_400x600/tmdb${image.file_path}`)
    expect(findImage(wrapper).attributes('alt')).toBe('Photo')
  })

  it('has correct button title', async () => {
    const image = mockImage()

    const wrapper = await initComponent({ item: image })

    expect(findButton(wrapper).attributes('title')).toBe('View photo')
  })
})
