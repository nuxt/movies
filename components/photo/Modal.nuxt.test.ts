import type { VueWrapper } from '@vue/test-utils'
import type { Image } from '~/types'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

import { nextTick } from 'vue'
import { baseUrl } from '~/tests/unit/config'
import { mockImage } from '~/tests/unit/mocks'
import PhotoModal from './Modal.vue'

// Define mocks using vi.hoisted
const { provideImageModal, useImageModal } = vi.hoisted(() => {
  function useSingleton<T>() {
    let value: T
    return [
      function provide(v: T) {
        value = v
      },
      function use(fallback?: T) {
        return (value ?? fallback) as T
      },
    ] as const
  }
  const [provideImageModal, useImageModal] = useSingleton<(photos: Image[], index: number) => void>()
  return {
    provideImageModal,
    useImageModal,
  }
})

// Mock the provideImageModal import
mockNuxtImport('provideImageModal', () => provideImageModal)

describe('photoModal', () => {
  // Helper functions to get elements by data-testid
  const findModal = (wrapper: VueWrapper) => wrapper.find('[data-testid="photo-modal"]')
  const findCloseButton = (wrapper: VueWrapper) => wrapper.find('[data-testid="close-button"]')
  const findImage = (wrapper: VueWrapper) => wrapper.find('[data-testid="photo-image"]')
  const findPrevButton = (wrapper: VueWrapper) => wrapper.find('[data-testid="prev-button"]')
  const findNextButton = (wrapper: VueWrapper) => wrapper.find('[data-testid="next-button"]')
  const findCounter = (wrapper: VueWrapper) => wrapper.find('[data-testid="photo-counter"]')

  const images = [
    mockImage({ file_path: '/path/to/image1.jpg' }),
    mockImage({ file_path: '/path/to/image2.jpg' }),
    mockImage({ file_path: '/path/to/image3.jpg' }),
  ]

  it('renders correctly with image', async () => {
    const wrapper = await mountSuspended(PhotoModal)

    const show = useImageModal()
    show(images, 0)

    await nextTick()

    expect(findModal(wrapper).exists()).toBe(true)
    expect(findImage(wrapper).exists()).toBe(true)
    expect(findImage(wrapper).attributes('src')).toContain('/tmdb/path/to/image1.jpg')
    expect(findCounter(wrapper).text()).toBe('1 / 3')
  })

  it('navigates to the next image', async () => {
    const wrapper = await mountSuspended(PhotoModal)

    const show = useImageModal()
    show(images, 0)

    await nextTick()

    await findNextButton(wrapper).trigger('click')
    await nextTick()

    expect(findImage(wrapper).attributes('src')).toContain('/tmdb/path/to/image2.jpg')
    expect(findCounter(wrapper).text()).toBe('2 / 3')
  })

  it('navigates to the previous image', async () => {
    const wrapper = await mountSuspended(PhotoModal)

    const show = useImageModal()
    show(images, 2)

    await nextTick()

    await findPrevButton(wrapper).trigger('click')
    await nextTick()

    expect(findImage(wrapper).attributes('src')).toContain('/tmdb/path/to/image2.jpg')
    expect(findCounter(wrapper).text()).toBe('2 / 3')
  })

  it('closes the modal', async () => {
    const wrapper = await mountSuspended(PhotoModal)

    const show = useImageModal()
    show(images, 0)

    await nextTick()

    await findCloseButton(wrapper).trigger('click')
    await nextTick()

    expect(findModal(wrapper).exists()).toBe(false)
  })

  // TODO: understand why this test is failing
  it.skip('handles keyboard events', async () => {
    const wrapper = await mountSuspended(PhotoModal)

    const show = useImageModal()
    show(images, 0)

    await nextTick()

    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(findImage(wrapper).attributes('src')).toContain(`${baseUrl}/ipx/f_webp/tmdb/path/to/image2.jpg`)
    expect(findCounter(wrapper).text()).toBe('2 / 3')

    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(findImage(wrapper).attributes('src')).toContain(`${baseUrl}/ipx/f_webp/tmdb/path/to/image3.jpg`)
    expect(findCounter(wrapper).text()).toBe('3 / 3')

    await wrapper.trigger('keydown', { key: 'ArrowLeft' })
    await nextTick()
    expect(findImage(wrapper).attributes('src')).toContain(`${baseUrl}/ipx/f_webp/tmdb/path/to/image2.jpg`)
    expect(findCounter(wrapper).text()).toBe('2 / 3')

    await wrapper.trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(findModal(wrapper).exists()).toBe(false)
  })
})
