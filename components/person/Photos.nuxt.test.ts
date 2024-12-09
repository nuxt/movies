import type { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import { mockImage, mockPerson } from '~/tests/unit/mocks'
import PersonPhotos from './Photos.vue'

describe('personPhotos', () => {
  // Helper functions to get elements by data-testid
  const getContainer = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-photos-container"]')
  const getTitle = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-photos-title"]')
  const getNumberOfImages = (wrapper: VueWrapper) => wrapper.find('[data-testid="number-of-images"]')
  const getPhotosGrid = (wrapper: VueWrapper) => wrapper.find('[data-testid="photos-grid"]')
  const getPhotoCards = (wrapper: VueWrapper) => wrapper.findAll('[data-testid="photo-card"]')

  it('renders the container', async () => {
    const item = mockPerson()

    const wrapper = await mountSuspended(PersonPhotos, {
      props: { item },
    })

    expect(getContainer(wrapper).exists()).toBe(true)
  })

  it('renders the title and number of images', async () => {
    const item = mockPerson({
      images: {
        profiles: [mockImage(), mockImage()],
      },
    })

    const wrapper = await mountSuspended(PersonPhotos, {
      props: { item },
    })

    expect(getTitle(wrapper).text()).toBe('Photos')
    expect(getNumberOfImages(wrapper).text()).toBe('2 Images')
  })

  it('renders the photos grid', async () => {
    const item = mockPerson({
      images: {
        profiles: [mockImage(), mockImage()],
      },
    })

    const wrapper = await mountSuspended(PersonPhotos, {
      props: { item },
    })

    expect(getPhotosGrid(wrapper).exists()).toBe(true)
  })

  it('renders photo cards correctly', async () => {
    const item = mockPerson({
      images: {
        profiles: [
          mockImage({ file_path: '/path/to/image1.jpg' }),
          mockImage({ file_path: '/path/to/image2.jpg' }),
        ],
      },
    })

    const wrapper = await mountSuspended(PersonPhotos, {
      props: { item },
    })

    const photoCards = getPhotoCards(wrapper)

    expect(photoCards.length).toBe(2)
    expect(photoCards[0].attributes('data-testid')).toBe('photo-card')
    expect(photoCards[1].attributes('data-testid')).toBe('photo-card')
  })
})
